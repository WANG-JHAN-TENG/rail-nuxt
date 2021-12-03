import axios from 'axios';
import { GetAuthorizationHeader } from '~/assets/Authorization.js';
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';
import { getDatabase, ref, set, child, get } from "firebase/database";

export const state = () => ({
    userId: "",
    departure:"",
    arrival:"",
    oneWayOrNot:"false",
    departDate:"",
    departTime:"",
    backDepartDate:"",
    backDepartTime:"",
    trainInfo:[],
    backTrainInfo:[],
    ticketInfo:[],
    selectedTrain:[],
    selectedBackTrain:[],
    carType: "",
    ticketCount : {
        adult : 0,
        kid : 0,
        love : 0,
        older : 0,
        student : 0,
    },
    totalPrice:"",
  })
  
export const mutations = {
    setUserId(state, message){
        state.userId = message;
    },
    setDeparture(state, message){
        state.departure = message;
    },
    setArrival(state, message){
        state.arrival = message;
    },
    setOneWayOrNot(state, message){
        state.oneWayOrNot = message;
    },
    setDepartDate(state, message){
        state.departDate = message;
    },
    setDepartTime(state, message){
        state.departTime = message;
    },
    setBackDepartDate(state, message){
        state.backDepartDate = message;
    },
    setBackDepartTime(state, message){
        state.backDepartTime = message;
    },
    setCarType(state, message){
        state.carType = message;
    },
    setAdultCount(state, message){
        state.ticketCount.adult = message;
    },
    setKidCount(state, message){
        state.ticketCount.kid = message;
    },
    setLoveCount(state, message){
        state.ticketCount.love = message;
    },
    setOlderCount(state, message){
        state.ticketCount.older = message;
    },
    setStudentCount(state, message){
        state.ticketCount.student = message;
    },
    setSelectedTrain(state, message){
        state.selectedTrain = message;
    },
    setSelectedBackTrain(state, message){
        state.selectedBackTrain = message;
    },
    sendMes(state, response){
        state.trainInfo = response.data;
    },
    infoFilter(state){
        if(state.departTime != ""){
            let input = state.departTime
            let value = state.trainInfo
            let result = [];
            let selectedTime = input.split(":");
            for (let i = 0; i < value.length; i++) {
                let item = value[i];
                let time = item.OriginStopTime.DepartureTime;
                let startTime = time.split(":");
                if( Number(startTime[0]) >= Number(selectedTime[0])){
                    result.push(item);
                }
            }
            if(result.length > 5){
                result.length = 5;
            }
            state.trainInfo = result;
        }
    },
    timeFilter(state){
        let info = state.trainInfo;
        for(let i = 0; i <info.length; i++){
            let item = info[i]
            let trainDate = item.TrainDate
            let date = trainDate.split("-");
            let depart = item.OriginStopTime.DepartureTime;
            let departTime = depart.split(":");
            let arrival = item.DestinationStopTime.ArrivalTime;
            let arrivalTime = arrival.split(":");
            let time1 = new Date(date[0], date[1], date[2], departTime[0], departTime[1], 0);
            let time2 = new Date(date[0], date[1], date[2], arrivalTime[0], arrivalTime[1], 0);
            let time = time2 - time1;
            let countHr = time * 0.000000278;
            let hr = "";
            let min = "";
            if(countHr >= 1){
              hr = Math.floor(countHr);
              let countMin = (countHr - hr) * 60
              if(countMin >= 1){
                min = Math.round(countMin);
              }else{
                min = "0";
              }
            }else{
              hr = "0";
              let countMin = countHr * 60;
              min = Math.round(countMin);
            }
            let timming = `${hr}小時:${min}分`;
            let obj = state.trainInfo[i]
            let add = {movingTime : timming}
            state.trainInfo[i] = Object.assign({},obj,add)
          }
    },
    getSeatMes(state, response){
        let standardSeat = response.data.AvailableSeats[0].StandardSeatStatus
        let businessSeat = response.data.AvailableSeats[0].BusinessSeatStatus
        for(let i = 0; i < state.trainInfo.length; i++){
            if(state.trainInfo[i].DailyTrainInfo.TrainNo === response.data.AvailableSeats[0].TrainNo){
                let obj = state.trainInfo[i];
                let add = {BusinessSeatStatus : businessSeat};
                let add2 = {StandardSeatStatus : standardSeat};
                state.trainInfo[i] = Object.assign({},obj,add,add2)
            }
        }
    },
    sendBackMes(state, response){
        state.backTrainInfo = response.data;
    },
    backInfoFilter(state){
        if(state.backDepartTime != ""){
            let input = state.backDepartTime
            let value = state.backTrainInfo
            let result = [];
            let selectedTime = input.split(":");
            for (let i = 0; i < value.length; i++) {
                let item = value[i];
                let time = item.OriginStopTime.DepartureTime;
                let startTime = time.split(":");
                if( Number(startTime[0]) >= Number(selectedTime[0])){
                    result.push(item);
                }
            }
            if(result.length > 5){
                result.length = 5;
            }
            state.backTrainInfo = result;
        }
    },
    backTimeFilter(state){
        let info = state.backTrainInfo;
        for(let i = 0; i <info.length; i++){
            let item = info[i]
            let trainDate = item.TrainDate
            let date = trainDate.split("-");
            let depart = item.OriginStopTime.DepartureTime;
            let departTime = depart.split(":");
            let arrival = item.DestinationStopTime.ArrivalTime;
            let arrivalTime = arrival.split(":");
            let time1 = new Date(date[0], date[1], date[2], departTime[0], departTime[1], 0);
            let time2 = new Date(date[0], date[1], date[2], arrivalTime[0], arrivalTime[1], 0);
            let time = time2 - time1;
            let countHr = time * 0.000000278;
            let hr = "";
            let min = "";
            if(countHr >= 1){
              hr = Math.floor(countHr);
              let countMin = (countHr - hr) * 60
              if(countMin >= 1){
                min = Math.round(countMin);
              }else{
                min = "0";
              }
            }else{
              hr = "0";
              let countMin = countHr * 60;
              min = Math.round(countMin);
            }
            let timming = `${hr}小時:${min}分`;
            let obj = state.backTrainInfo[i]
            let add = {movingTime : timming}
            state.backTrainInfo[i] = Object.assign({},obj,add)
          }
    },
    getBackSeatMes(state, response){
        let standardSeat = response.data.AvailableSeats[0].StandardSeatStatus
        let businessSeat = response.data.AvailableSeats[0].BusinessSeatStatus
        for(let i = 0; i < state.backTrainInfo.length; i++){
            if(state.backTrainInfo[i].DailyTrainInfo.TrainNo === response.data.AvailableSeats[0].TrainNo){
                let obj = state.backTrainInfo[i];
                let add = {BusinessSeatStatus : businessSeat};
                let add2 = {StandardSeatStatus : standardSeat};
                state.backTrainInfo[i] = Object.assign({},obj,add,add2)
            }
        }
    },
    getTicketInfo(state, response){
        state.ticketInfo = response.data[0];
    },
    countPrice(state){
        if(state.oneWayOrNot === "false"){
            let ticketInfo = state.ticketInfo;
            if(state.carType === "0"){
                let total = 
                ticketInfo.Fares[2].Price * state.ticketCount.adult +
                ticketInfo.Fares[0].Price * state.ticketCount.kid +
                ticketInfo.Fares[0].Price * state.ticketCount.love +
                ticketInfo.Fares[0].Price * state.ticketCount.older +
                ticketInfo.Fares[6].Price * state.ticketCount.student;
                state.totalPrice = total;
            }else if(state.carType === "1"){
                let total =
                ticketInfo.Fares[3].Price * state.ticketCount.adult +
                ticketInfo.Fares[5].Price * state.ticketCount.kid +
                ticketInfo.Fares[5].Price * state.ticketCount.love +
                ticketInfo.Fares[5].Price * state.ticketCount.older +
                ticketInfo.Fares[7].Price * state.ticketCount.student;
                state.totalPrice = total;
            }
        }else if(state.oneWayOrNot === "true"){
            let ticketInfo = state.ticketInfo;
            if(state.carType === "0"){
                let total = 
                ticketInfo.Fares[2].Price * state.ticketCount.adult +
                ticketInfo.Fares[0].Price * state.ticketCount.kid +
                ticketInfo.Fares[0].Price * state.ticketCount.love +
                ticketInfo.Fares[0].Price * state.ticketCount.older +
                ticketInfo.Fares[6].Price * state.ticketCount.student;
                state.totalPrice = total*2;
            }else if(state.carType === "1"){
                let total =
                ticketInfo.Fares[3].Price * state.ticketCount.adult +
                ticketInfo.Fares[5].Price * state.ticketCount.kid +
                ticketInfo.Fares[5].Price * state.ticketCount.love +
                ticketInfo.Fares[5].Price * state.ticketCount.older +
                ticketInfo.Fares[7].Price * state.ticketCount.student;
                state.totalPrice = total*2;
            }
        }
    },
    goBook(state){
        state.selectedTrain = [];
    }
}

export const actions = {
    sendMes({state, commit}){
        return new Promise( (resolve)=> {
            let startStation = state.departure;
            let endStation = state.arrival;
            let date = state.departDate;
            let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
            if(startStation != "" && endStation != "" && date != ""){
                axios.get(
                    url,
                    {headers: GetAuthorizationHeader()}
                    ).then((response) =>{
                    commit('sendMes',response)
                    commit('infoFilter')
                    commit('timeFilter')
                    resolve()
                })
            }
        })
    },
    getSeatMes({state, commit}){
        return new Promise( (resolve, reject)=> {
            let startStation = state.departure;
            let endStation = state.arrival;
            let date = state.departDate;
            for(let i = 0; i < state.trainInfo.length; i++){
                let trainNo = state.trainInfo[i].DailyTrainInfo.TrainNo;
                let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/AvailableSeatStatus/Train/OD/${startStation}/to/${endStation}/TrainDate/${date}/TrainNo/${trainNo}?$top=30&$format=JSON`;
                axios.get(
                    url,
                    {headers: GetAuthorizationHeader()}
                ).then((response) =>{
                    commit('getSeatMes', response)
                })
                .catch(() =>{
                    reject("查無此區間資料")
                })
            }
            resolve()
        })
    },
    getTicketInfo({state, commit}){
        return new Promise( (resolve)=>{
            let startStation = state.departure;
            let endStation = state.arrival;
            let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
            if(startStation != "" && endStation != ""){
                axios.get(
                    url,
                    {headers: GetAuthorizationHeader()}
                ).then((response) =>{
                    commit('getTicketInfo', response);
                    resolve();
                })         
            }
        })
    },
    sendBackMes({state, commit}){
        return new Promise( (resolve)=> {
            let startStation = state.arrival;
            let endStation = state.departure;
            let date = state.backDepartDate;
            let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
            if(startStation != "" && endStation != "" && date != ""){
                axios.get(
                    url,
                    {headers: GetAuthorizationHeader()}
                    ).then((response) =>{
                    commit('sendBackMes',response)
                    commit('backInfoFilter')
                    commit('backTimeFilter')
                    resolve()
                })
            }
        })
    },
    getBackSeatMes({state, commit}){
        return new Promise( (resolve, reject)=> {
            let startStation = state.arrival;
            let endStation = state.departure;
            let date = state.backDepartDate;
            for(let i = 0; i < state.backTrainInfo.length; i++){
                let trainNo = state.backTrainInfo[i].DailyTrainInfo.TrainNo;
                let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/AvailableSeatStatus/Train/OD/${startStation}/to/${endStation}/TrainDate/${date}/TrainNo/${trainNo}?$top=30&$format=JSON`;
                axios.get(
                    url,
                    {headers: GetAuthorizationHeader()}
                ).then((response) =>{
                    commit('getBackSeatMes', response)
                })
                .catch(() =>{
                    reject("查無此區間資料")
                })
            }
            resolve()
        })
    },
    searching({dispatch}){
        return dispatch('sendMes')
        .then(() =>{
            return dispatch('getSeatMes')
        }).then(() =>{
            return dispatch('getTicketInfo')
        }).then(() =>{
            return dispatch('sendBackMes')
        }).then(() =>{
            return dispatch('getBackSeatMes')
        })
    },
    goBook({state, commit}){
        return new Promise( (resolve, reject)=> {
            if(state.oneWayOrNot === "false"){
                const db = getDatabase(GetfirebaseConfig());
                set(ref(db, 'users/' + state.userId + "/onbord"), {
                  startStation: state.departure,
                  endStation: state.arrival,
                  carType : state.carType,
                  date : state.departDate,
                  trainNo : state.selectedTrain.DailyTrainInfo.TrainNo,
                  departTime : state.selectedTrain.OriginStopTime.DepartureTime,
                  arrivalTime : state.selectedTrain.DestinationStopTime.ArrivalTime,
                  ticketCount : state.ticketCount,
                  totalPrice : state.totalPrice,
                }).then(()=>{
                    alert("訂票成功");
                    commit("goBook");
                    resolve();
                })
                .catch(() =>{
                    alert("訂票失敗，請重新操作")
                    reject()
                })
            }else if(state.oneWayOrNot === "true"){
                const db = getDatabase(GetfirebaseConfig());
                set(ref(db, 'users/' + state.userId + "/onbord"), {
                  startStation: state.departure,
                  endStation: state.arrival,
                  carType : state.carType,
                  date : state.departDate,
                  trainNo : state.selectedTrain.DailyTrainInfo.TrainNo,
                  departTime : state.selectedTrain.OriginStopTime.DepartureTime,
                  arrivalTime : state.selectedTrain.DestinationStopTime.ArrivalTime,
                  ticketCount : state.ticketCount,
                  totalPrice : state.totalPrice,
                })
                set(ref(db, 'users/' + state.userId + "/back"), {
                  startStation: state.arrival,
                  endStation: state.departure,
                  carType : state.carType,
                  date : state.backDepartDate,
                  trainNo : state.selectedBackTrain.DailyTrainInfo.TrainNo,
                  departTime : state.selectedBackTrain.OriginStopTime.DepartureTime,
                  arrivalTime : state.selectedBackTrain.DestinationStopTime.ArrivalTime,
                  ticketCount : state.ticketCount,
                  totalPrice : state.totalPrice,
                }).then(()=>{
                    alert("訂票成功");
                    commit("goBook");
                    resolve();
                })
                .catch(() =>{
                    alert("訂票失敗，請重新操作")
                    reject()
                })
            }
        })
    },
}