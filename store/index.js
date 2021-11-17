import axios from 'axios'
import jsSHA from "jssha";

export const state = () => ({
    departure:"",
    arrival:"",
    departdate:"",
    trainInfo:[],
  })
  
export const mutations = {
    setDeparture(state, message){
        state.departure = message;
    },
    setArrival(state, message){
        state.arrival = message;
    },
    setDepartdate(state, message){
        state.departdate = message;
    },
    sendMes(state, response){
        state.trainInfo = response.data;
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
            let date = state.departdate;
            let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
            
            axios.get(
                url,
                {headers: GetAuthorizationHeader(),
            }).then((response) =>{
                console.log(response)
                commit('sendMes',response)
                resolve()
              })
        })
    }
}