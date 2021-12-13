<template>
    <div class="container">
        <div class="searchBar row">
            <div class="IDsearch col">
                <label for="IDsearch">請輸入訂票人ID</label>
                <input  name="IDsearch" id="IDsearch" v-model="userId" @keyup.enter="findBookingInfo">
                <div class="btn btn-outline-info" @click="findBookingInfo">查詢</div>
            </div>
            <div class="col-3">
                <div class="btn btn-primary" v-show="readyToChange" @click="updateData">確認變更</div>
            </div>
            <div class="backButton col-3">
                <NuxtLink to="/">
                    <div class="btn btn-outline-secondary">
                        查詢列車時刻
                    </div>
                </NuxtLink>
            </div>
        </div>
        <div class="bookingInfo" v-if="bookingData.goingTo.trainNo">
            <div class="bookingTitle row">
                <h2 class="col-10">去程資料</h2>
                <div class="btn btn-outline-warning col" v-show="showInfo" @click="changeTicket">變更票數</div>
                <div class="btn btn-outline-warning col" v-show="updateInfo" @click="cancelUpdateData">取消變更</div>
                <div class="btn btn-danger col" @click="cancelGoingTo">取消訂票</div>
            </div>
            <table class="table">
                <tbody>
                    <tr>
                    <th scope="row">日期</th>
                    <td>{{bookingData.goingTo.date}}</td>
                    </tr>
                    <tr>
                    <th scope="row">列車編號</th>
                    <td>{{bookingData.goingTo.trainNo}}</td>
                    </tr>
                    <tr>
                    <th scope="row">起站</th>
                    <td>{{bookingData.goingTo.startStation.name}}</td>
                    </tr>
                    <tr>
                    <th scope="row">訖站</th>
                    <td>{{bookingData.goingTo.endStation.name}}</td>
                    </tr>
                    <tr>
                    <th scope="row">行駛時間</th>
                    <td>
                        {{bookingData.goingTo.departTime}}~{{bookingData.goingTo.arrivalTime}}
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">車廂種類</th>
                    <td>
                        <div class="carType" v-if="bookingData.goingTo.carType === '0' ">標準車廂</div>
                        <div class="carType" v-else-if="bookingData.goingTo.carType === '1' ">商務車廂</div>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">票數</th>
                    <td v-show="showInfo">
                        <div class="ticketCount" v-if="bookingData.goingTo.ticketCount.adult != 0">全票 {{bookingData.goingTo.ticketCount.adult}} 張</div>
                        <div class="ticketCount" v-if="bookingData.goingTo.ticketCount.kid != 0">孩童票 {{bookingData.goingTo.ticketCount.kid}} 張</div>
                        <div class="ticketCount" v-if="bookingData.goingTo.ticketCount.love != 0">愛心票 {{bookingData.goingTo.ticketCount.love}} 張</div>
                        <div class="ticketCount" v-if="bookingData.goingTo.ticketCount.older != 0">敬老票 {{bookingData.goingTo.ticketCount.older}} 張</div>
                        <div class="ticketCount" v-if="bookingData.goingTo.ticketCount.student != 0">大學生優惠票 {{bookingData.goingTo.ticketCount.student}} 張</div>
                    </td>
                    <td v-show="updateInfo">
                        <label for="adult">全票</label>
                        <select name="adult" id="adult" v-model="bookingData.goingTo.ticketCount.adult">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="kid">孩童票(6-11歲)</label>
                        <select name="kid" id="kid" v-model="bookingData.goingTo.ticketCount.kid">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="love">愛心票</label>
                        <select name="love" id="love" v-model="bookingData.goingTo.ticketCount.love">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="adult">敬老票(65歲以上)</label>
                        <select name="older" id="older" v-model="bookingData.goingTo.ticketCount.older">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="student">大學生優惠票</label>
                        <select name="student" id="student" v-model="bookingData.goingTo.ticketCount.student">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">座位資訊</th>
                    <td>
                        <div class="seatsInfo" v-for="seat in bookingData.goingTo.seatsNo" :key="seat.index">{{seat}}</div>
                    </td>
                    </tr>
                    <tr v-if="! bookingData.goingBack.trainNo">
                    <th scope="row">總價</th>
                    <td>$ {{totalPrice}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bookingInfo" v-if="bookingData.goingBack.trainNo">
            <div class="bookingTitle row">
                    <h2 class="col-11">回程資料</h2>
                    <div class="btn btn-danger col" @click="cancelGoingBack">取消訂票</div>
            </div>
            <table class="table">
                <tbody>
                    <tr>
                    <th scope="row">日期</th>
                    <td>{{bookingData.goingBack.date}}</td>
                    </tr>
                    <tr>
                    <th scope="row">列車編號</th>
                    <td>{{bookingData.goingBack.trainNo}}</td>
                    </tr>
                    <tr>
                    <th scope="row">起站</th>
                    <td>{{bookingData.goingBack.startStation.name}}</td>
                    </tr>
                    <tr>
                    <th scope="row">訖站</th>
                    <td>{{bookingData.goingBack.endStation.name}}</td>
                    </tr>
                    <tr>
                    <th scope="row">行駛時間</th>
                    <td>
                        {{bookingData.goingBack.departTime}}~{{bookingData.goingBack.arrivalTime}}
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">車廂種類</th>
                    <td>
                        <div class="carType" v-if="bookingData.goingBack.carType === '0' ">標準車廂</div>
                        <div class="carType" v-else-if="bookingData.goingBack.carType === '1' ">商務車廂</div>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">票數</th>
                    <td v-show="showInfo">
                        <div class="ticketCount" v-if="bookingData.goingBack.ticketCount.adult != 0">全票 {{bookingData.goingBack.ticketCount.adult}} 張</div>
                        <div class="ticketCount" v-if="bookingData.goingBack.ticketCount.kid != 0">孩童票 {{bookingData.goingBack.ticketCount.kid}} 張</div>
                        <div class="ticketCount" v-if="bookingData.goingBack.ticketCount.love != 0">愛心票 {{bookingData.goingBack.ticketCount.love}} 張</div>
                        <div class="ticketCount" v-if="bookingData.goingBack.ticketCount.older != 0">敬老票 {{bookingData.goingBack.ticketCount.older}} 張</div>
                        <div class="ticketCount" v-if="bookingData.goingBack.ticketCount.student != 0">大學生優惠票 {{bookingData.goingBack.ticketCount.student}} 張</div>
                    </td>
                    <td v-show="updateInfo">
                        <label for="adult">全票</label>
                        <select name="adult" id="adult" v-model="bookingData.goingBack.ticketCount.adult">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="kid">孩童票(6-11歲)</label>
                        <select name="kid" id="kid" v-model="bookingData.goingBack.ticketCount.kid">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="love">愛心票</label>
                        <select name="love" id="love" v-model="bookingData.goingBack.ticketCount.love">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="adult">敬老票(65歲以上)</label>
                        <select name="older" id="older" v-model="bookingData.goingBack.ticketCount.older">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="student">大學生優惠票</label>
                        <select name="student" id="student" v-model="bookingData.goingBack.ticketCount.student">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">座位資訊</th>
                    <td>
                        <div class="seatsInfo" v-for="seat in bookingData.goingBack.seatsNo" :key="seat.index">{{seat}}</div>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">總價</th>
                    <td>$ {{totalPrice}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { GetAuthorizationHeader } from '~/assets/Authorization.js';
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';
import { getDatabase, ref, child, get, remove, update, set} from "firebase/database";

export default {
    data() {
        return {
            userId:"",
            bookingData:{
                goingTo: {
                    startStation: { name: "", value: "" },
                    endStation: { name: "" , value: "" },
                    carType: "",
                    date: "",
                    trainNo: "",
                    departTime: "",
                    arrivalTime: "",
                    ticketCount : {
                        adult : 0,
                        kid : 0,
                        love : 0,
                        older : 0,
                        student : 0,
                    },
                    seatsNo: ["",],
                    price: 0,
                },
                goingBack: {
                    startStation: { name: "" , value: "" },
                    endStation: { name: "" , value: "" },
                    carType: "",
                    date: "",
                    trainNo: "",
                    departTime: "",
                    arrivalTime: "",
                    ticketCount : {
                        adult : 0,
                        kid : 0,
                        love : 0,
                        older : 0,
                        student : 0,
                    },
                    seatsNo: ["",],
                    price: 0,
                },
            },
            showInfo: true,
            updateInfo: false,
            readyToChange: false,
            fares: {},
            ticketCountNums: [
                { num: "0" , value: "0" },
                { num: "1" , value: "1" },
                { num: "2" , value: "2" },
                { num: "3" , value: "3" },
                { num: "4" , value: "4" },
                { num: "5" , value: "5" },
                { num: "6" , value: "6" },
                { num: "7" , value: "7" },
                { num: "8" , value: "8" },
                { num: "9" , value: "9" },
                { num: "10" , value: "10" }
            ],
            totalPrice: null,
        };
    },
    updated() {
        if ( this.fares.standardAdult ) {
            let ticketInfo = this.fares;
            if ( this.bookingData.goingTo.carType === "0" ) {
                let total = 
                ticketInfo.standardAdult * this.bookingData.goingTo.ticketCount.adult +
                ticketInfo.standardKid * this.bookingData.goingTo.ticketCount.kid +
                ticketInfo.standardKid * this.bookingData.goingTo.ticketCount.love +
                ticketInfo.standardKid * this.bookingData.goingTo.ticketCount.older +
                ticketInfo.standardGroup * this.bookingData.goingTo.ticketCount.student;
                this.bookingData.goingTo.price = total;
                if ( this.bookingData.goingBack ) {
                    let total = 
                    ticketInfo.standardAdult * this.bookingData.goingBack.ticketCount.adult +
                    ticketInfo.standardKid * this.bookingData.goingBack.ticketCount.kid +
                    ticketInfo.standardKid * this.bookingData.goingBack.ticketCount.love +
                    ticketInfo.standardKid * this.bookingData.goingBack.ticketCount.older +
                    ticketInfo.standardGroup * this.bookingData.goingBack.ticketCount.student;
                    this.bookingData.goingBack.price = total;
                }
            } else if ( this.bookingData.goingTo.carType === "1" ) {
                let total =
                ticketInfo.bussinessAdult * this.bookingData.goingTo.ticketCount.adult +
                ticketInfo.bussinessKid * this.bookingData.goingTo.ticketCount.kid +
                ticketInfo.bussinessKid * this.bookingData.goingTo.ticketCount.love +
                ticketInfo.bussinessKid * this.bookingData.goingTo.ticketCount.older +
                ticketInfo.bussinessGroup * this.bookingData.goingTo.ticketCount.student;
                this.bookingData.goingTo.price = total;
                if ( this.bookingData.goingBack ) {
                    let total = 
                    ticketInfo.bussinessAdult * this.bookingData.goingBack.ticketCount.adult +
                    ticketInfo.bussinessKid * this.bookingData.goingBack.ticketCount.kid +
                    ticketInfo.bussinessKid * this.bookingData.goingBack.ticketCount.love +
                    ticketInfo.bussinessKid * this.bookingData.goingBack.ticketCount.older +
                    ticketInfo.bussinessGroup * this.bookingData.goingBack.ticketCount.student;
                    this.bookingData.goingBack.price = total;
                }
            }
            this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
        }
    },
    methods: {
        findBookingInfo() {
            this.updateInfo = false;
            this.showInfo = true;
            this.readyToChange = false;
            this.fares = {};      
            return new Promise( ( resolve , reject ) => {
                const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
                let userId = this.userId;
                get( child( dbRef, `users/${userId}` ) ).then( ( snapshot ) => {
                    if ( snapshot.exists() ) {
                        this.bookingData.goingTo = snapshot.val().goingTo;
                        if ( snapshot.val().goingBack ) {
                            this.bookingData.goingBack = snapshot.val().goingBack;
                        }
                        this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
                        resolve();
                    } else {
                        alert("查無資訊");
                        resolve();
                    }
                }).catch( (error) => {
                    console.error(error);
                    reject();
                });
            })
        },
        changeTicket() {
            this.showInfo = false;
            this.updateInfo = true;
            this.readyToChange = true;
            return new Promise( ( resolve )=>{
                let startStation = this.bookingData.goingTo.startStation.value;
                let endStation = this.bookingData.goingTo.endStation.value;
                let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
                if ( startStation != "" && endStation != "" ) {
                    axios.get(
                        url,
                        { headers: GetAuthorizationHeader() }
                    ).then( ( response ) => {
                        let infos = [];
                        for ( let i = 0 ; i < response.data[0].Fares.length ; i++ ) {
                            let info = response.data[0].Fares[i].Price;
                            infos.push(info);
                        }
                        infos.sort(function( a , b ) {
                            return a - b;
                        });
                        this.fares.freeKid = infos[0];
                        this.fares.standardKid = infos[1];
                        this.fares.standardGroup = infos[2];
                        this.fares.freeAdult = infos[3];
                        this.fares.standardAdult = infos[4];
                        this.fares.bussinessKid = infos[5];
                        this.fares.bussinessGroup = infos[6];
                        this.fares.bussinessAdult = infos[7];
                        resolve();
                    })         
                }
            })
        },
        cancelUpdateData() {
            this.findBookingInfo();   
        },
        cancelGoingTo() {
            let cancelOrNot = confirm("確定取消去程訂票?");

            return new Promise( ( resolve ) => {
                if ( cancelOrNot ) {
                    let userId = prompt("再次輸入訂票人ID",'');
                    const db = getDatabase( GetfirebaseConfig() );
                    if ( userId === this.userId ) {
                        remove( ref( db, 'users/' + userId + "/goingTo" ) , {} );
                        set( ref( db, 'users/' + this.userId ) , {
                            goingTo: this.bookingData.goingBack
                        })
                        .then( () => {
                            resolve();
                            alert("已取消去程訂票");
                            window.location.reload();
                        })
                    } else {
                        alert("訂票人ID不符")
                    }
                }
            })
        },
        cancelGoingBack() {
            let cancelOrNot = confirm("確定取消回程訂票?");

            return new Promise( ( resolve ) => {
                if ( cancelOrNot ) {
                    let userId = prompt("再次輸入訂票人ID",'');
                    const db = getDatabase(GetfirebaseConfig());
                    if ( userId === this.userId ) {
                        remove( ref( db, 'users/' + userId + "/goingBack" ) , {} )
                        .then( () => {
                            resolve();
                            alert("已取消回程訂票");
                            window.location.reload();
                        })
                    } else {
                        alert("訂票人ID不符")
                    }
                }
            })
        },
        updateData() {
            let changeOrNot = confirm("確定變更?");

            return new Promise( ( resolve ) => {
                if ( changeOrNot ) {
                    let userId = prompt("請再次輸入訂票人ID","");
                    const db = getDatabase( GetfirebaseConfig() );
                    if ( userId === this.userId ) {
                        let count = this.bookingData.goingTo.ticketCount;
                        let SeatsNo = this.bookingData.goingTo.seatsNo;
                        let ticketTotal =  parseInt(count.adult) + parseInt(count.kid) + parseInt(count.love) + parseInt(count.older) + parseInt(count.student);
                        if ( SeatsNo.length < ticketTotal ) {
                            let diff = parseInt(ticketTotal) - parseInt(SeatsNo.length);
                            for (let i = 0 ; i < diff ; i++ ) {
                                SeatsNo.push("待系統補位")
                            }
                        } else if ( SeatsNo.length > ticketTotal ) {
                            SeatsNo.length = ticketTotal;
                        }
                        update( ref( db, 'users/' + userId + "/goingTo" ) , {
                            ticketCount : this.bookingData.goingTo.ticketCount,
                            price : this.bookingData.goingTo.price,
                            seatsNo : SeatsNo
                        });
                        if ( this.bookingData.goingBack ) {
                            let count = this.bookingData.goingBack.ticketCount;
                            let SeatsNo = this.bookingData.goingBack.seatsNo;
                            let ticketTotal =  parseInt(count.adult) + parseInt(count.kid) + parseInt(count.love) + parseInt(count.older) + parseInt(count.student);
                            if ( SeatsNo.length < ticketTotal ) {
                                let diff = parseInt(ticketTotal) - parseInt(SeatsNo.length);
                                for (let i = 0 ; i < diff ; i++ ) {
                                    SeatsNo.push("待系統補位")
                                }
                            } else if ( SeatsNo.length > ticketTotal ) {
                                SeatsNo.length = ticketTotal;
                            }
                            update( ref( db, 'users/' + userId + "/goingBack" ) , {
                                ticketCount : this.bookingData.goingBack.ticketCount,
                                price : this.bookingData.goingBack.price,
                                seatsNo : SeatsNo
                            });
                        }
                        resolve();
                        alert("變更成功")
                        this.findBookingInfo();
                    } else {
                        alert("訂票人ID不符")
                    }
                }
            })
        }
    },
}
</script>

<style>
    .seatsInfo{
        display: inline-block;
        margin:0 1%;
    }
</style>