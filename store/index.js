import axios from 'axios';
import { GetAuthorizationHeader } from '~/assets/Authorization.js';

export const state = () => ({
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
  })
  
export const mutations = {
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
}