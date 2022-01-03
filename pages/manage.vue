<template>
		<v-app>
				<v-container class="container">
						<h1>後台管理系統</h1>
						<v-row align="center" class="searchBar">
								<v-col cols="9" sm="5" md="3" class="IDsearch">
										<v-text-field label="請輸入訂票人ID" v-model="userId" @keyup.enter="findBookingDate"></v-text-field>
								</v-col>
								<v-col cols="9" sm="5" md="3" class="IDsearch">
										<v-text-field label="請輸入訂票人電話" v-model="phoneNum" @keyup.enter="findBookingDate"></v-text-field>
								</v-col>
								<v-col class="mb-3" sm="1">
										<v-btn color="cyan" outlined @click="findBookingDate">查詢</v-btn>
								</v-col>
								<v-row class="mb-3" justify="space-around">
										<div>
												<v-btn color="grey darken-3" dark @click="findUsers">所有訂票人</v-btn>
										</div>
										<div>
												<v-btn color="secondary" outlined nuxt to="/checkoutCars">查列車餘位</v-btn>
										</div>
										<div>
												<v-btn color="primary" nuxt to="/">查詢時刻表</v-btn>
										</div>
								</v-row>
						</v-row>
						<v-row class="userContainer mt-5" v-if="usersIds">
								<v-col cols="4" sm="3" md="2" class="users" v-for="(usersId, key) in usersIds" :key="usersId.index">
										<div class="user" v-for=" (info , key1 ) in usersId" :key="info.index" @click="findBookingDate( key , key1 )">
												ID<span> {{key}}</span>
												<div class="phone">
														電話<span> {{key1}}</span>
												</div>
										</div>
								</v-col>
						</v-row>
						<v-row class="dataContainer mt-5 mx-auto" v-if="userBookingDates">
								<v-col class="mb-0 pb-0" cols="12">
										<v-card class="text-center" elevation="2" @click="openLists">顯示列表</v-card>
								</v-col>
								<v-col cols="12" class="users mt-6" v-for="(userBookingDate, key) in userBookingDates" :key="userBookingDate.index" v-show="openList">
										<v-row justify="center" v-for=" (info , key1 ) in userBookingDate" :key="info.index" @click="findBookingInfo(key , key1)">
												<v-col class="time" cols="12">
														<v-card outlined shaped hover color="teal lighten-4" elevation="2">
																<v-row>
																		<v-col cols="12" >
																				乘車資訊
																		</v-col>
																		<v-col cols="12">
																				<span> {{info.goingTo.date}} {{info.goingTo.departTime}} </span>
																				<span> {{info.goingTo.startStation.name}} ~ {{info.goingTo.endStation.name}} </span>
																		</v-col>
																		<v-col>
																				<span>票價 {{info.goingTo.price}}$</span>
																		</v-col>
																</v-row>
														</v-card>
												</v-col>
												<v-col class="time" cols="12" v-if="info.goingBack">
														<v-card outlined shaped hover color="teal lighten-4" elevation="2">
																<v-row>
																		<v-col cols="12">
																				乘車資訊
																		</v-col>
																		<v-col cols="12">
																				<span>乘車資訊 {{info.goingBack.date}} {{info.goingBack.departTime}} </span>
																				<span> {{info.goingBack.startStation.name}} ~ {{info.goingBack.endStation.name}} </span>
																		</v-col>
																		<v-col>
																				<span>票價 {{info.goingBack.price}}$</span>
																		</v-col>
																</v-row>
														</v-card>
												</v-col>
										</v-row>
								</v-col>
						</v-row>
						<div class="priceInfo" v-show="updateInfo">
								<div class="ticketTable text-center">
										<h3>票價表</h3>
										<span>票價需介於0 ~ 2500</span>
										<v-simple-table>
												<tbody>
														<tr>
																<th></th>
																<th>全票</th>
																<th>孩童票/敬老票/愛心票</th>
																<th>團體票</th>
														</tr>
														<tr>
																<td>標準車廂</td>
																<td>
																		<v-text-field class="num mx-auto" type="number" max="2500" min="0" v-model="fares.standardAdult"></v-text-field>
																</td>
																<td>
																		<v-text-field class="num mx-auto" type="number" max="2500" min="0" v-model="fares.standardKid"></v-text-field>
																</td>
																<td>
																		<v-text-field class="num mx-auto" type="number" max="2500" min="0" v-model="fares.standardGroup"></v-text-field>
																</td>
														</tr>
														<tr>
																<td>商務車廂</td>
																<td>
																		<v-text-field class="num mx-auto" type="number" max="2500" min="0" v-model="fares.bussinessAdult"></v-text-field>
																</td>
																<td>
																		<v-text-field class="num mx-auto" type="number" max="2500" min="0" v-model="fares.bussinessKid"></v-text-field>
																</td>
																<td>
																		<v-text-field class="num mx-auto" type="number" max="2500" min="0" v-model="fares.bussinessGroup"></v-text-field>
																</td>
														</tr>
														<tr>
																<td>自由座車廂</td>
																<td>
																		<v-text-field class="num mx-auto" type="number" max="2500" min="0" v-model="fares.freeAdult"></v-text-field>
																</td>
																<td>
																		<v-text-field class="num mx-auto" type="number" max="2500" min="0" v-model="fares.freeKid"></v-text-field>
																</td>
																<td>-</td>
														</tr>
												</tbody>
										</v-simple-table>
										<v-btn color="primary" outlined @click="changeTicket">重設</v-btn>
								</div>
						</div>
						<v-container class="bookingInfo" v-if="bookingData.goingTo.trainNo">
								<v-row align="center" class="bookingTitle my-3">
										<v-col class="pa-0" cols="2" sm="6" md="8">
												<h2>去程資料</h2>
										</v-col>
										<v-col cols="3" sm="2" md="1" class="change pa-0 mr-2" v-show="showInfo">
												<v-btn color="warning" outlined @click="changeTicket" :disabled="cantBeChange">變更票數</v-btn>
										</v-col>
										<v-col cols="3" sm="2" md="1" class="change pa-0 mr-2" v-show="updateInfo">
												<v-btn color="warning" outlined @click="cancelUpdateData">取消變更</v-btn>
										</v-col>
										<v-col cols="3" sm="2" md="1" class="change pa-0 mr-2" v-show="readyToChange">
												<v-btn color="primary" :disabled="isBtnDisabled" @click="checkAndUpdate">確認變更</v-btn>
										</v-col>
										<v-col cols="3"	sm="2" md="1" class="change pa-0 mr-2">
												<v-btn color="error" @click="cancelGoingTo" :disabled="cantBeChange">取消訂票</v-btn>
										</v-col>
								</v-row>
								<v-simple-table>
										<tbody>
												<tr>
														<th>日期</th>
														<td>{{bookingData.goingTo.date}}</td>
												</tr>
												<tr>
														<th>列車編號</th>
														<td>{{bookingData.goingTo.trainNo}}</td>
												</tr>
												<tr>
														<th>起站</th>
														<td>{{bookingData.goingTo.startStation.name}}</td>
												</tr>
												<tr>
														<th>訖站</th>
														<td>{{bookingData.goingTo.endStation.name}}</td>
												</tr>
												<tr>
														<th>行駛時間</th>
														<td>
																{{bookingData.goingTo.departTime}}~{{bookingData.goingTo.arrivalTime}}
														</td>
												</tr>
												<tr>
														<th>車廂種類</th>
														<td>
																<div class="carType" v-if="bookingData.goingTo.carType === '0' ">標準車廂</div>
																<div class="carType" v-else-if="bookingData.goingTo.carType === '1' ">商務車廂</div>
														</td>
												</tr>
												<tr>
														<th>票數</th>
														<td v-show="showInfo">
																<div class="ticketCount" v-if="bookingData.goingTo.ticketCount.adult != 0">全票 {{bookingData.goingTo.ticketCount.adult}} 張</div>
																<div class="ticketCount" v-if="bookingData.goingTo.ticketCount.kid != 0">孩童票 {{bookingData.goingTo.ticketCount.kid}} 張</div>
																<div class="ticketCount" v-if="bookingData.goingTo.ticketCount.love != 0">愛心票 {{bookingData.goingTo.ticketCount.love}} 張</div>
																<div class="ticketCount" v-if="bookingData.goingTo.ticketCount.older != 0">敬老票 {{bookingData.goingTo.ticketCount.older}} 張</div>
																<div class="ticketCount" v-if="bookingData.goingTo.ticketCount.student != 0">大學生優惠票 {{bookingData.goingTo.ticketCount.student}} 張</div>
														</td>
														<td v-show="updateInfo">
																<div class="seatsInfo">
																		<v-select class="ticks" label="全票" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingTo.ticketCount.adult"></v-select>
																</div>
																<div class="seatsInfo">
																		<v-select class="ticks" label="孩童票(6-11歲)" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingTo.ticketCount.kid"></v-select>
																</div>
																<div class="seatsInfo">
																		<v-select class="ticks" label="愛心票" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingTo.ticketCount.love"></v-select>
																</div>
																<div class="seatsInfo">
																		<v-select class="ticks" label="敬老票(65歲以上)" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingTo.ticketCount.older"></v-select>
																</div>
																<div class="seatsInfo">
																		<v-select class="ticks" label="大學生優惠票" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingTo.ticketCount.student"></v-select>
																</div>
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
								</v-simple-table>
						</v-container>
						<v-container class="bookingInfo" v-if="bookingData.goingBack.trainNo">
								<v-row align="center" class="bookingTitle my-3">
										<v-col cols="8" sm="10">
												<h2>回程資料</h2>
										</v-col>
										<v-col>
												<v-btn color="error" @click="cancelGoingBack" :disabled="cantBeChange">取消訂票</v-btn>
										</v-col>
								</v-row>
								<v-simple-table>
										<tbody>
												<tr>
														<th>日期</th>
														<td>{{bookingData.goingBack.date}}</td>
												</tr>
												<tr>
														<th>列車編號</th>
														<td>{{bookingData.goingBack.trainNo}}</td>
												</tr>
												<tr>
														<th>起站</th>
														<td>{{bookingData.goingBack.startStation.name}}</td>
												</tr>
												<tr>
														<th>訖站</th>
														<td>{{bookingData.goingBack.endStation.name}}</td>
												</tr>
												<tr>
														<th>行駛時間</th>
														<td>
																{{bookingData.goingBack.departTime}}~{{bookingData.goingBack.arrivalTime}}
														</td>
												</tr>
												<tr>
														<th>車廂種類</th>
														<td>
																<div class="carType" v-if="bookingData.goingBack.carType === '0' ">標準車廂</div>
																<div class="carType" v-else-if="bookingData.goingBack.carType === '1' ">商務車廂</div>
														</td>
												</tr>
												<tr>
														<th>票數</th>
														<td v-show="showInfo">
																<div class="ticketCount" v-if="bookingData.goingBack.ticketCount.adult != 0">全票 {{bookingData.goingBack.ticketCount.adult}} 張</div>
																<div class="ticketCount" v-if="bookingData.goingBack.ticketCount.kid != 0">孩童票 {{bookingData.goingBack.ticketCount.kid}} 張</div>
																<div class="ticketCount" v-if="bookingData.goingBack.ticketCount.love != 0">愛心票 {{bookingData.goingBack.ticketCount.love}} 張</div>
																<div class="ticketCount" v-if="bookingData.goingBack.ticketCount.older != 0">敬老票 {{bookingData.goingBack.ticketCount.older}} 張</div>
																<div class="ticketCount" v-if="bookingData.goingBack.ticketCount.student != 0">大學生優惠票 {{bookingData.goingBack.ticketCount.student}} 張</div>
														</td>
														<td v-show="updateInfo">
																<div class="seatsInfo">
																		<v-select class="ticks" label="全票" :items="backTicketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.adult"></v-select>
																</div>
																<div class="seatsInfo">
																		<v-select class="ticks" label="孩童票(6-11歲)" :items="backTicketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.kid"></v-select>
																</div>
																<div class="seatsInfo">
																		<v-select class="ticks" label="愛心票" :items="backTicketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.love"></v-select>
																</div>
																<div class="seatsInfo">
																		<v-select class="ticks" label="敬老票(65歲以上)" :items="backTicketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.older"></v-select>
																</div>
																<div class="seatsInfo">
																		<v-select class="ticks" label="大學生優惠票" :items="backTicketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.student"></v-select>
																</div>
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
								</v-simple-table>
						</v-container>
						<div class="seatTable" v-if="updateInfo" >
								<div class="seatTitle">
										<h2>請選擇座位</h2>
										<div class="showStatus">
										<div class="ready">
												可選擇 <div class="canBeChoose">可</div>
												已選擇 <div class="cantBeChoose">否</div>
												已預定 <div class="BeChoosed">選</div>
										</div>
										</div>
								</div>
								<div class="seatChoice">
										<h3>列車車頭</h3>
										<div class="oneTrain">
												<div class="seat" v-for="(seat, index) in seats" :key="seat.index">
															<div class="selectCar" v-if="selectedCar == index">
																	<div class="seatNum" v-for="seatNum in seat" :key="seatNum.index">
																			<label  v-if="seatNum.booked === '0' "><input type="checkbox" name="label" :value="seatNum.No" v-model="selectedSeats">
																					<span class="round button">
																						{{seatNum.No}}
																					</span>
																			</label>
																			<label v-else><input type="checkbox" name="label" checked disabled>
																					<span class="round button booked">
																						{{seatNum.No}}
																					</span>
																			</label>
																	</div>
															</div>
												</div>
										</div>
										<div class="carNo">
												<div class="singleCar" v-for="(carNo, index) in carNos" :key="carNo.index" @click="keyInCarNo(index)">
														{{carNo}}
												</div>
										</div>
										<div class="selectedCar">
												車廂 : {{showSelectedCar}}
										</div>
								</div>
								<div class="carDirect" v-if=" this.bookingData.goingBack.trainNo ">
										<div v-show="goingSeatTable" ><h3>去程座位</h3></div>
										<div v-show="backSeatTable" ><h3>回程座位</h3></div>
								</div>
								<div class="selectedSeats">
										更新後座位
										<div class="selectedSeat" v-for="selectedSeat in selectedSeats" :key="selectedSeat.index">
												{{selectedSeat}}
										</div>
										<div class="switch" v-if=" this.bookingData.goingBack.trainNo ">
												<v-btn color="warning" small class="going" v-show="goingSeatTable" @click="switchBack">選擇回程座位</v-btn>
												<v-btn	color="warning" small class="back" v-show="backSeatTable" @click="switchGoing">選擇去程座位</v-btn>
										</div>
								</div>
						</div>
				</v-container>
		</v-app>
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
			phoneNum:"",
			selectedDate: "",
			selectedTime: "",
			usersIds: [],
			userBookingDates: null,
			isBtnDisabled: false,
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
			ticketTotal: 0,
			backTicketTotal: 0,
			openList: true,
			showInfo: true,
			updateInfo: false,
			readyToChange: false,
			cantBeChange: false,
			seats: [
				[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			],
			carNos: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
			selectedCar: "0",
			showSelectedCar: "A",
			selectedSeats: [],
			goingSeatTable: true,
			backSeatTable: false,
			goingSeats: [],
			backSeats: [],
			fares: {
				freeKid : 0,
				standardKid : 0,
				standardGroup : 0,
				freeAdult : 0,
				standardAdult : 0,
				bussinessKid : 0,
				bussinessGroup : 0,
				bussinessAdult : 0
			},
			inputSeatData: [],
			inputBackSeatData: [],
			tookOrNot: [
				{ station : "0990" , took : false } ,
				{ station : "1000" , took : false } ,
				{ station : "1010" , took : false } ,
				{ station : "1020" , took : false } ,
				{ station : "1030" , took : false } ,
				{ station : "1035" , took : false } ,
				{ station : "1040" , took : false } ,
				{ station : "1043" , took : false } ,
				{ station : "1047" , took : false } ,
				{ station : "1050" , took : false } ,
				{ station : "1060" , took : false } ,
				{ station : "1070" , took : false }
			],
			backTookOrNot: [
				{ station : "0990" , took : false } ,
				{ station : "1000" , took : false } ,
				{ station : "1010" , took : false } ,
				{ station : "1020" , took : false } ,
				{ station : "1030" , took : false } ,
				{ station : "1035" , took : false } ,
				{ station : "1040" , took : false } ,
				{ station : "1043" , took : false } ,
				{ station : "1047" , took : false } ,
				{ station : "1050" , took : false } ,
				{ station : "1060" , took : false } ,
				{ station : "1070" , took : false }
			],
			ticketCountNums: [],
			backTicketCountNums: [],
			totalPrice: null,
		};
	},
	created() {
		this.createSeats();
		this.createTicketSelector();
	},
	updated() {
		this.countTotalPrice();
		this.showSelectedCar = this.carNos[this.selectedCar];
		this.watchSeatsChoice();
		this.checkPrice();
		this.watchDateOver();
	},
	methods: {
		createSeats() {
			this.seats = [
				[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			];
			let item = {};
			let item1 = {};
			let item2 = {};
			let item3 = {};
			let item4 = {};
			let item5 = {};
			let item6 = {};
			let item7 = {};
			let item8 = {};
			let item9 = {};
			for ( let i = 1 ; i < 21 ; i++ ) {
				item = { No: `A${i}` , booked: "0" };
				this.seats[0].push(item);
				item1 = { No: `B${i}` , booked: "0" };
				this.seats[1].push(item1);
				item2 = { No: `C${i}` , booked: "0" };
				this.seats[2].push(item2);
				item3 = { No: `D${i}` , booked: "0" };
				this.seats[3].push(item3);
				item4 = { No: `E${i}` , booked: "0" };
				this.seats[4].push(item4);
				item5 = { No: `F${i}` , booked: "0" };
				this.seats[5].push(item5);
				item6 = { No: `G${i}` , booked: "0" };
				this.seats[6].push(item6);
				item7 = { No: `H${i}` , booked: "0" };
				this.seats[7].push(item7);
				item8 = { No: `I${i}` , booked: "0" };
				this.seats[8].push(item8);
				item9 = { No: `J${i}` , booked: "0" };
				this.seats[9].push(item9);
			}
		},
		createTicketSelector() {
			this.ticketCountNums = [];
			this.backTicketCountNums = [];
			for ( let i = 1 ; i <= 10 ; i++ ) {
				let item = { num: i , value: i };
				this.ticketCountNums.push(item);
			}
			if ( this.bookingData.goingBack ) {
				for ( let j = 1 ; j <= 10 ; j++ ) {
					let item2 = { num: j , value: j };
					this.backTicketCountNums.push(item2);
				}
			}
		},
		watchSeatsChoice() {
			this.ticketTotal = parseInt(this.bookingData.goingTo.ticketCount.adult) + parseInt(this.bookingData.goingTo.ticketCount.kid) + parseInt(this.bookingData.goingTo.ticketCount.love) + parseInt(this.bookingData.goingTo.ticketCount.older) + parseInt(this.bookingData.goingTo.ticketCount.student);
			this.backTicketTotal =  parseInt(this.bookingData.goingBack.ticketCount.adult) + parseInt(this.bookingData.goingBack.ticketCount.kid) + parseInt(this.bookingData.goingBack.ticketCount.love) + parseInt(this.bookingData.goingBack.ticketCount.older) + parseInt(this.bookingData.goingBack.ticketCount.student);
			
			if ( this.backSeatTable === false ){
				if ( this.selectedSeats.length > this.ticketTotal ) {
					this.selectedSeats.pop();
					alert("請先取消選取已選取座位");
				}
			}else{
				if ( this.selectedSeats.length > this.backTicketTotal ) {
					this.selectedSeats.pop();
					alert("請先取消選取已選取座位");
				}
			}
		},
		watchDateOver() {
      const fullDate = new Date();
      const nowY = fullDate.getFullYear();
      const nowM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
      const nowD = fullDate.getDate() < 10 ? ("0"+fullDate.getDate()) : fullDate.getDate();
			let date = this.bookingData.goingTo.date.split("-");
			if ( date[0] < nowY ) {
				this.cantBeChange = true;
			} else {
				if ( date[1] < nowM ) {
					this.cantBeChange = true;
				} else {
					if ( date[2] < nowD ) {
						this.cantBeChange = true;
					} else {
						this.cantBeChange = false;
					}
				}
			}
		},
		checkPrice() {
			if (
				0 > this.fares.freeKid ||
				0 > this.fares.standardKid ||
				0 > this.fares.standardGroup ||
				0 > this.fares.freeAdult ||
				0 > this.fares.standardAdult ||
				0 > this.fares.bussinessKid ||
				0 > this.fares.bussinessGroup ||
				0 > this.fares.bussinessAdult 
				) {
					this.isBtnDisabled = true;
				} else if ( 
						this.fares.freeKid > 2500 ||
						this.fares.standardKid > 2500 ||
						this.fares.standardGroup > 2500 ||
						this.fares.freeAdult > 2500 ||
						this.fares.standardAdult > 2500 ||
						this.fares.bussinessKid > 2500 ||
						this.fares.bussinessGroup > 2500 ||
						this.fares.bussinessAdult > 2500
				) {
						this.isBtnDisabled = true;
				} else {
					this.isBtnDisabled = false;
				}
		},
		findUsers() {
			this.bookingData = {
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
			};
			this.selectedSeats = [];
			this.updateInfo = false;
			const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
			get( child( dbRef, `users/` ) )
			.then( ( snapshot ) => {
				if ( snapshot.exists() ) {
          this.usersIds = snapshot.val();
				} else {
					alert("查無資訊");
				}
			})
			.catch( (error) => {
				console.log(error);
				alert("查無資訊");
			});
		},
		openLists() {
			if ( this.openList === false ) {
				this.openList = true;
			} else {
				this.openList = false;
			}
		},
		findBookingDate( key , key1 ) {
			this.bookingData = {
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
			};
			this.updateInfo = false;
			this.cantBeChange = false;
			this.openList = true;
			this.usersIds = [];
			if ( key && key1 ) {
				this.userId = key;
				this.phoneNum = key1;
			}
			if ( this.userId ==="" || this.phoneNum === "" ) {
				alert("請輸入ID與電話")
			} else {
				const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
				get( child( dbRef, `users/${this.userId}/${this.phoneNum}` ) )
				.then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						this.userBookingDates = snapshot.val();
					} else {
						alert("查無資訊");
					}
				})
				.catch( (error) => {
					console.log(error);
					alert("查無資訊");
				});
			}
		},
		findBookingInfo(key , key1) {
			this.updateInfo = false;
			this.showInfo = true;
			this.readyToChange = false;
			this.selectedSeats = [];
			this.goingSeats = [];
			this.backSeats = [];
			this.inputSeatData = [];
			this.inputBackSeatData = [];
			this.goingSeatTable = true;
			this.backSeatTable = false;
			this.openList = false;
			this.bookingData = {
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
			};
			this.createSeats();
			const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
			if ( key && key1 ) {
				this.selectedDate = key;
				this.selectedTime = key1;
			}
			get( child( dbRef, `users/${this.userId}/${this.phoneNum}/${this.selectedDate}/${this.selectedTime}` ) )
			.then( ( snapshot ) => {
				if ( snapshot.exists() ) {
					this.bookingData.goingTo = snapshot.val().goingTo;
					if ( snapshot.val().goingBack ) {
							this.bookingData.goingBack = snapshot.val().goingBack;
					}
					this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
					this.getSeatsInfo();
					this.setTookOrNot();
				} else {
					alert("查無資訊");
				}
			})
			.catch( (error) => {
				console.log(error);
				alert("查無資訊");
			});
		},
		changeTicket() {
			this.showInfo = false;
			this.updateInfo = true;
			this.readyToChange = true;
			const startStation = this.bookingData.goingTo.startStation.value;
			const endStation = this.bookingData.goingTo.endStation.value;
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
				})         
			}
		},
		countTotalPrice() {
			if ( this.fares.standardAdult ) {
				const ticketInfo = this.fares;
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
		getSeatsInfo() {
				const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
				const goingDate = this.bookingData.goingTo.date;
				const goingTrainNo = this.bookingData.goingTo.trainNo;
				get( child( dbRef, `bookedSeats/${goingDate}` + `/${goingTrainNo}` ) )
				.then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						let response = snapshot.val();
						this.inputSeatData = response.seatsData;
						this.refreshInputSeats();
						this.initSeatTable();
					}
				}).catch( (error) => {
					console.log(error);
				});

				const backDate = this.bookingData.goingBack.date;
				const backTrainNo = this.bookingData.goingBack.trainNo;
				get( child( dbRef, `bookedSeats/${backDate}` + `/${backTrainNo}` ) )
				.then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						let response = snapshot.val();
						this.inputBackSeatData = response.seatsData;
						this.refreshInputSeats();
					}
				}).catch( (error) => {
					console.log(error);
				});
		},
		setTookOrNot (){
			if ( this.bookingData.goingTo.startStation.value < this.bookingData.goingTo.endStation.value ) {
				for ( let i = 0 ; i < this.tookOrNot.length ; i++ ) {
					if ( this.bookingData.goingTo.startStation.value <= this.tookOrNot[i].station && this.tookOrNot[i].station < this.bookingData.goingTo.endStation.value ) {
						this.tookOrNot[i].took = true;
					}
				}
			} else {
				for ( let j = 0 ; j < this.tookOrNot.length ; j++ ) {
					if ( this.bookingData.goingTo.startStation.value >= this.tookOrNot[j].station && this.tookOrNot[j].station > this.bookingData.goingTo.endStation.value ) {
						this.tookOrNot[j].took = true;
					}
				}
			}
			if ( this.bookingData.goingBack.trainNo ) {
				if ( this.bookingData.goingBack.startStation.value > this.bookingData.goingBack.endStation.value ) {
					for ( let k = 0 ; k < this.backTookOrNot.length ; k++ ) {
						if ( this.bookingData.goingBack.endStation.value < this.backTookOrNot[k].station && this.backTookOrNot[k].station <= this.bookingData.goingBack.startStation.value ) {
							this.backTookOrNot[k].took = true;
						}
					}
				} else {
					for ( let l = 0 ; l < this.backTookOrNot.length ; l++ ) {
						if ( this.bookingData.goingBack.endStation.value > this.backTookOrNot[l].station && this.backTookOrNot[l].station >= this.bookingData.goingBack.startStation.value ) {
							this.backTookOrNot[l].took = true;
						}
					}
				}
			}
		},
		refreshInputSeats() {
			if ( this.inputSeatData ) {
				const input = this.inputSeatData;
				const userBookedSeats = this.bookingData.goingTo.seatsNo;
				for ( let g = 0 ; g < userBookedSeats.length ; g++ ) {
					for ( let h = 0 ; h < input.length ; h++ ) {
						if ( userBookedSeats[g] === input[h].seatsNo ) {
							input.splice(h, 1);
						}
					}
				}
				this.selectedSeats = userBookedSeats;
			}
			if ( this.inputBackSeatData ) {
				const backInput = this.inputBackSeatData;
				const userBookedBackSeats = this.bookingData.goingBack.seatsNo;
				for ( let i = 0 ; i < userBookedBackSeats.length ; i++ ) {
					for ( let j = 0 ; j < backInput.length ; j++ ) {
						if ( userBookedBackSeats[i] === backInput[j].seatsNo ) {
							backInput.splice(j, 1);
						}
					}
				}
				this.backSeats = userBookedBackSeats;
			}
		},
		initSeatTable() {
			if ( this.inputSeatData.length > 0 ) {
				const inputs = this.inputSeatData;
				const seats = this.seats;
				for (let i = 0 ; i < inputs.length ; i++ ){
					for (let j = 0 ; j < seats.length ; j++ ){
						let seat = seats[j];
						for ( let k = 0 ; k < seat.length ; k++){
							if ( seat[k].No === inputs[i].seatsNo ) {
								let input = inputs[i];
								for (let l = 0 ; l < input.tookOrNot.length ; l++ ) {
									if ( this.bookingData.goingTo.endStation.value > this.bookingData.goingTo.startStation.value ) {
										if ( this.bookingData.goingTo.startStation.value <= input.tookOrNot[l].station && input.tookOrNot[l].station < this.bookingData.goingTo.endStation.value ) {
											if ( input.tookOrNot[l].took === true ) {
												seat[k].booked = "1";
												break;
											}
										}
									} else {
										if ( this.bookingData.goingTo.endStation.value < input.tookOrNot[l].station && input.tookOrNot[l].station <= this.bookingData.goingTo.startStation.value ) {
											if ( input.tookOrNot[l].took === true ) {
												seat[k].booked = "1";
												break;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		initBackSeatTable() {
			if ( this.inputBackSeatData.length > 0 ) {
				const inputs = this.inputBackSeatData;
				const seats = this.seats;
				for (let i = 0 ; i < inputs.length ; i++ ) {
					for (let j = 0 ; j < seats.length ; j++ ) {
						let seat = seats[j];
						for ( let k = 0 ; k < seat.length ; k++) {
							if ( seat[k].No === inputs[i].seatsNo ) {
								let input = inputs[i];
								for (let l = 0 ; l < input.tookOrNot.length ; l++ ) {
									if ( this.bookingData.goingBack.endStation.value > this.bookingData.goingBack.startStation.value ) {
										if ( this.bookingData.goingBack.startStation.value <= input.tookOrNot[l].station && input.tookOrNot[l].station < this.bookingData.goingBack.endStation.value ) {
											if ( input.tookOrNot[l].took === true ) {
												seat[k].booked = "1";
												break;
											}
										}
									} else {
										if ( this.bookingData.goingBack.endStation.value < input.tookOrNot[l].station && input.tookOrNot[l].station <= this.bookingData.goingBack.startStation.value ) {
											if ( input.tookOrNot[l].took === true ) {
												seat[k].booked = "1";
												break;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		},
		keyInCarNo(index) {
			this.selectedCar = index;
		},
		switchBack() {
			this.goingSeatTable = false;
			this.backSeatTable = true;
			this.seats = [
				[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			];
			this.$nextTick( () => {
				this.createSeats();
				this.initBackSeatTable();
			});
			if ( this.backSeats.length > 0 ) {
				this.goingSeats = this.selectedSeats;
				this.selectedSeats = this.backSeats;
			} else {
				this.goingSeats = this.selectedSeats;
				this.selectedSeats = [];
			}
		},
		switchGoing() {
			this.goingSeatTable = true;
			this.backSeatTable = false;
			this.seats = [
				[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			];
			this.$nextTick( () => {
				this.createSeats();
				this.initSeatTable();
			});
			if ( this.goingSeats.length > 0 ) {
				this.backSeats = this.selectedSeats;
				this.selectedSeats = this.goingSeats;
			} else {
				this.backSeats = this.selectedSeats;
				this.selectedSeats = [];
			}
		},
		cancelUpdateData() {
			this.findBookingInfo();   
		},
		cancelGoingTo() {
			let goingCancelOrNot = confirm("確定取消去程訂票?");

			if ( goingCancelOrNot ) {
				const db = getDatabase( GetfirebaseConfig() );
				if ( this.bookingData.goingBack.trainNo ){
					update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
						seatsData : this.inputSeatData
					});
					remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingTo" ) , {} );
					set( ref( db, 'users/' + this.userId + `/${this.phoneNum}` ) , {
						goingTo: this.bookingData.goingBack
					})
					.then( () => {
						alert("已取消去程訂票");
						window.location.reload();
					})
				} else {
					update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
						seatsData : this.inputSeatData
					});
					remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingTo" ) , {} )
					.then( () => {
						alert("已取消去程訂票");
						window.location.reload();
					})
				}
			}
		},
		cancelGoingBack() {
			let backCancelOrNot = confirm("確定取消回程訂票?");

			if ( backCancelOrNot ) {
				const db = getDatabase(GetfirebaseConfig());
				update( ref( db, 'bookedSeats/' + this.bookingData.goingBack.date + `/${this.bookingData.goingBack.trainNo}` ) , {
					seatsData : this.inputBackSeatData
				});
				remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingBack" ) , {} )
				.then( () => {
					alert("已取消回程訂票");
					window.location.reload();
				})
			}
		},
		updateSeatsInfo() {
			for ( let i = 0 ; i < this.goingSeats.length ; i++ ) {
				let key = this.goingSeats[i];
				let	item = { 	seatsNo : key ,	tookOrNot : this.tookOrNot }
				this.inputSeatData.push(item);
			}
			if ( this.bookingData.goingBack.trainNo ) {
				for ( let j = 0 ; j < this.backSeats.length ; j++ ) {
					let backKey = this.backSeats[j];
					let backItem = { seatsNo : backKey , tookOrNot : this.backTookOrNot }
					this.inputBackSeatData.push(backItem);
				}
			}
		},
		getSelectedSeats() {
			if ( this.goingSeatTable ) {
				this.goingSeats = this.selectedSeats;
			} else {
				this.backSeats = this.selectedSeats;
			}
		},
		checkAndUpdate() {
			this.getSelectedSeats();
			if (this.bookingData.goingBack.trainNo === "") {
				if ( this.goingSeats.length === this.ticketTotal ) {
					this.updateData();
				} else {
					alert("總票數與所選座位數量不符");
				}
			} else {
				if ( this.goingSeats.length === this.ticketTotal && this.backSeats.length === this.backTicketTotal ) {
					this.updateData();
				} else {
					alert("總票數與所選座位數量不符");
				}
			}
		},
		updateData() {
			let changeOrNot = confirm("確定變更?");

			if ( changeOrNot ) {
				const db = getDatabase( GetfirebaseConfig() );
				this.updateSeatsInfo();
				update( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingTo" ) , {
					ticketCount : this.bookingData.goingTo.ticketCount,
					price : this.bookingData.goingTo.price,
					seatsNo : this.goingSeats
				});
				update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
					seatsData : this.inputSeatData
				});
				if ( this.bookingData.goingBack.trainNo ) {
					update( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingBack" ) , {
						ticketCount : this.bookingData.goingBack.ticketCount,
						price : this.bookingData.goingBack.price,
						seatsNo : this.backSeats
					});
					update( ref( db, 'bookedSeats/' + this.bookingData.goingBack.date + `/${this.bookingData.goingBack.trainNo}` ) , {
						seatsData : this.inputBackSeatData
					});
				}
				alert("變更成功")
				this.findBookingInfo();
			}
		}
	},
}
</script>

<style scoped>
	.ticketTable .table td{
		vertical-align: middle;
	}
	.bookingInfo .table td{
		vertical-align: middle;
	}
	.container{
		max-width: 1200px;
	}
  .userContainer{
    margin: 15px;
  }
  .users{
    text-align: center;
    margin: 0;
    margin-left: -1px;
		margin-top: -1px;
    padding: 0;
  }
  .user{
    cursor: pointer;
    border: 1px solid black;
  }
	.user:hover{
		background: rgb(245, 245, 245);
	}
  .dataContainer{
    margin: 15px;
		max-width: 720px;
  }
	.ticketTable span{
		color: red;
		font-size: 1rem;
	}
	.num{
		width: 70px;
		justify-content: center;
	}
	.seatsInfo{
		display: inline-block;
		margin:0 2%;
	}
	.ticks{
		width: 150px;
	}
	.seatTitle{
		text-align: center;
	}
	.seatTitle .canBeChoose{
		display: inline-block;
		background: #8ecbcf;
		color: #8ecbcf;
	}
	.seatTitle .BeChoosed{
		display: inline-block;
		background: #d86c6c;
		color: #d86c6c;
	}
	.seatTitle .cantBeChoose{
		display: inline-block;
		background: #5e7380;
		color: #5e7380;
	}
	.seatChoice{
		margin: 5% auto;
		width: 70%;
		border: 2px solid #ccc;
		text-align: center;
	}
	.seatChoice h3{
		display: inline-block;
		margin: 2% 0 0 0;
	}
	.oneTrain{
		margin: 3% auto;
	}
	.selectCar{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.seatNum{
		margin: 3% 2%;
		height: 6vh;
		width: 15%;
	}
	.selectCar :nth-child(2){
		margin-right: 12%;
	}
	.selectCar :nth-child(6){
		margin-right: 12%;
	}
	.selectCar :nth-child(10){
		margin-right: 12%;
	}
	.selectCar :nth-child(14){
		margin-right: 12%;
	}
	.selectCar :nth-child(18){
		margin-right: 12%;
	}
	.oneTrain input[type="checkbox"] {
		display: none; 
	}
	.oneTrain input:checked + .button {
		background: #5e7380; 
		color: #fff;
	}
	.oneTrain input:checked + .booked {
		background: #d86c6c; 
		color: #fff;
	}
	.oneTrain .button {
		display: inline-block;
		background: #8ecbcf;
		height: 8vh;
		width: 8vh; 
		color: #333; 
		cursor: pointer;
		line-height: 8vh;
	}
	.oneTrain .button:hover {
		background: #8ecbcf7c; 
	}
	.oneTrain .round {
		border-radius: 5px; 
	}
	.carNo{
		margin: 2% 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.singleCar{
		margin: 0 2%;
		height: 100%;
		width: 4%;
		font-size: normal;
		cursor: pointer;
		color: rgb(0, 0, 0);
		transition: 0.2s ease all;
	}
	.singleCar:hover{
		color: rgb(224, 228, 235);
		background: rgb(122, 173, 231);
		border-radius: 25%;
	}
	.carDirect{
		text-align: center;
	}
	.selectedSeats{
		margin: 2% 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	.selectedSeat{
		margin: 0 1%;
	}
	@media (max-width: 1000px) {
		.seatChoice{
			width: 95%;
		}
	}
	@media (max-width: 705px) {
		.bookingPanel{
			width: 100%;
		}
		.oneTrain .button{
			width: 6vh;
			height: 6vh;
		}
		.singleCar{
			margin: 0 3%;
		}
		.change{
			padding: 6px;
		}
		h2{
			font-size: 24px;
		}
		.v-btn:not(.v-btn--round).v-size--default{
			font-size: 12px;
			padding: 0 5px;
		}
	}
	@media (max-width: 450px) {
		.oneTrain .button{
			width: 4vh;
			height: 6vh;
		}
		.userContainer{
			font-size: 12px;
		}
		.v-btn:not(.v-btn--round).v-size--default{
			font-size: 12px;
			padding: 0 3px;
		}
	}
</style>