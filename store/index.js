import axios from 'axios'
import jsSHA from "jssha";

export const state = () => ({
    departure:"",
    arrival:"",
    departDate:"",
    departTime:"",
    trainInfo:[],
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
    filterInfo(state){
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
                {headers: GetAuthorizationHeader(),
            }).then((response) =>{
                console.log(response)
                commit('sendMes',response)
                commit('filterInfo')
                resolve()
              })
        })
    }
}