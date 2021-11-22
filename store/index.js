import axios from 'axios'
import jsSHA from "jssha";

export const state = () => ({
    departure:"",
    arrival:"",
    departDate:"",
    departTime:"",
    trainInfo:[],
    moveTime:[],
    ticketInfo:[],
  })
  
export const mutations = {
    setDeparture(state, message){
        state.departure = message;
    },
    setArrival(state, message){
        state.arrival = message;
    },
    setDepartDate(state, message){
        state.departDate = message;
    },
    setDepartTime(state, message){
        state.departTime = message
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
                if( Number(startTime[0]) == Number(selectedTime[0]) && Number(selectedTime[1]) < 40){
                    result.push(item);
                }else if(Number(selectedTime[1]) >= 40){
                    if(Number(startTime[0]) == Number(selectedTime[0])+1 || Number(startTime[0]) == Number(selectedTime[0]) && Number(startTime[1]) > 30){
                        result.push(item)
                    }
                }
            }
            state.trainInfo = result;
            console.log(result);
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
    getTicketInfo(state, response){
        state.ticketInfo = response.data[0];
    },
}

export const actions = {
    sendMes({state, commit}){
        function GetAuthorizationHeader() {
            var AppID = 'bd83b99ad326452a97b670ff9c5aebba';
            var AppKey = 'oPs2MCCXebrQ1LN0n0g6M8kY81Q';
        
            var GMTString = new Date().toGMTString();
            var ShaObj = new jsSHA('SHA-1', 'TEXT');
            ShaObj.setHMACKey(AppKey, 'TEXT');
            ShaObj.update('x-date: ' + GMTString);
            var HMAC = ShaObj.getHMAC('B64');
            var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
        
            return { 'Authorization': Authorization, 'X-Date': GMTString ,/*'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
        }
        return new Promise( (resolve)=> {
            let startStation = state.departure;
            let endStation = state.arrival;
            let date = state.departDate;
            let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
            axios.get(
                url,
                {headers: GetAuthorizationHeader()}
                ).then((response) =>{
                console.log(response)
                commit('sendMes',response)
                commit('infoFilter')
                commit('timeFilter')
                resolve()
            })
        })
    },
    getTicketInfo({state, commit}){
        function GetAuthorizationHeader() {
            var AppID = 'bd83b99ad326452a97b670ff9c5aebba';
            var AppKey = 'oPs2MCCXebrQ1LN0n0g6M8kY81Q';
        
            var GMTString = new Date().toGMTString();
            var ShaObj = new jsSHA('SHA-1', 'TEXT');
            ShaObj.setHMACKey(AppKey, 'TEXT');
            ShaObj.update('x-date: ' + GMTString);
            var HMAC = ShaObj.getHMAC('B64');
            var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
        
            return { 'Authorization': Authorization, 'X-Date': GMTString ,/*'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
        }
        return new Promise( (resolve)=>{
            let startStation = state.departure;
            let endStation = state.arrival;
            let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
            axios.get(
                url,
                {headers: GetAuthorizationHeader()}
            ).then((response) =>{
                console.log(response.data[0]);
                commit('getTicketInfo', response);
                resolve();
            })
        })
    },
}