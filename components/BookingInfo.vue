<template>
    <div class="container">
        <div class="searchBar row">
            <div class="IDsearch col">
                <label for="IDsearch">請輸入訂票人ID</label>
                <input  name="IDsearch" id="IDsearch" v-model="userId" @keyup.enter="findBookingInfo">
                <div class="btn btn-outline-info" @click="findBookingInfo">查詢</div>
            </div>
            <div class="col-3"></div>
            <div class="backButton col-3">
                <NuxtLink to="/">
                    <div class="btn btn-outline-secondary">
                        查詢列車時刻
                    </div>
                </NuxtLink>
            </div>
        </div>
        <div class="bookingInfo" v-if="bookingData.goingTo">
            <h2>去程資料</h2>
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
                    <td>
                        <div class="adult" v-if="bookingData.goingTo.ticketCount.adult">全票 {{bookingData.goingTo.ticketCount.adult}} 張</div>
                        <div class="adult" v-if="bookingData.goingTo.ticketCount.kid">孩童票 {{bookingData.goingTo.ticketCount.kid}} 張</div>
                        <div class="adult" v-if="bookingData.goingTo.ticketCount.love">愛心票 {{bookingData.goingTo.ticketCount.love}} 張</div>
                        <div class="adult" v-if="bookingData.goingTo.ticketCount.older">敬老票 {{bookingData.goingTo.ticketCount.older}} 張</div>
                        <div class="adult" v-if="bookingData.goingTo.ticketCount.student">大學生優惠票 {{bookingData.goingTo.ticketCount.student}} 張</div>
                    </td>
                    </tr>
                    <tr v-if="! bookingData.goingBack">
                    <th scope="row">總價</th>
                    <td>$ {{bookingData.goingTo.totalPrice}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="bookingInfo" v-if="bookingData.goingBack">
            <h2>回程資料</h2>
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
                    <td>
                        <div class="adult" v-if="bookingData.goingBack.ticketCount.adult">全票 {{bookingData.goingBack.ticketCount.adult}} 張</div>
                        <div class="adult" v-if="bookingData.goingBack.ticketCount.kid">孩童票 {{bookingData.goingBack.ticketCount.kid}} 張</div>
                        <div class="adult" v-if="bookingData.goingBack.ticketCount.love">愛心票 {{bookingData.goingBack.ticketCount.love}} 張</div>
                        <div class="adult" v-if="bookingData.goingBack.ticketCount.older">敬老票 {{bookingData.goingBack.ticketCount.older}} 張</div>
                        <div class="adult" v-if="bookingData.goingBack.ticketCount.student">大學生優惠票 {{bookingData.goingBack.ticketCount.student}} 張</div>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">總價</th>
                    <td>$ {{bookingData.goingBack.totalPrice}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';
import { getDatabase, ref, child, get } from "firebase/database";

export default {
    data(){
        return{
            userId:"",
            bookingData:[],
        }
    },
    methods:{
        findBookingInfo(){
            const dbRef = ref(getDatabase(GetfirebaseConfig()));
            let userId = this.userId;
            get(child(dbRef, `users/${userId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    this.bookingData = snapshot.val();
                    console.log(snapshot.val());
                } else {
                    alert("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        },
    },
}
</script>

<style>

</style>