<template>
		<v-app>
				<v-container>
						<h2>訂票查詢系統</h2>
						<v-row align="center" class="searchBar">
								<v-col cols="9" sm="5" md="3" class="IDsearch">
										<v-text-field label="請輸入訂票人ID" v-model="userId" @keyup.enter="findUser" background-color="white"></v-text-field>
								</v-col>
								<v-col cols="9" sm="5" md="3" class="IDsearch">
										<v-text-field label="請輸入訂票人電話" v-model="phoneNum" @keyup.enter="findUser" background-color="white"></v-text-field>
								</v-col>
								<v-col cols="8" sm="4" md="3" class="IDsearch d-flex">
										<v-btn class="mx-1" color="primary" outlined @click="findUser">查詢</v-btn>
										<v-btn class="mx-1" color="primary" outlined @click="justFindUser">查詢所有紀錄</v-btn>
								</v-col>
								<v-col md="3" class="backButton">
										<v-btn color="secondary" outlined nuxt to="/">查詢列車時刻</v-btn>
								</v-col>
								<v-col>
										<v-btn color="primary" v-show="readyToChange" @click="updateData">確認變更</v-btn>
								</v-col>
						</v-row>
						<v-row class="userContainer mt-5 mx-auto" v-if="userBookingDates">
								<v-col class="mb-0 pb-0" cols="12">
										<v-card class="text-center" elevation="2" @click="openLists">顯示列表</v-card>
								</v-col>
								<v-col cols="12" class="users mt-0" v-for="(userBookingDate, key) in userBookingDates" :key="userBookingDate.index" v-show="openList">
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
						<v-container class="bookingInfo" v-if="bookingData.goingTo.trainNo">
								<v-row class="bookingTitle">
										<v-col class="pa-0" cols="3" sm="7" md="8">
												<h2>去程資料</h2>
										</v-col>
										<v-col class="pa-0" v-show="showInfo">
												<v-btn class="change" color="warning" outlined @click="changeTicket" :disabled="cantBeChange">變更票數</v-btn>
										</v-col>
										<v-col class="pa-0" v-show="updateInfo">
												<v-btn class="change" color="warning" outlined @click="cancelUpdateData" :disabled="cantBeChange">取消變更</v-btn>
										</v-col>
										<v-col class="pa-0">
												<v-btn class="change" color="error" @click="cancelGoingTo" :disabled="cantBeChange">取消訂票</v-btn>
										</v-col>
								</v-row>
								<v-simple-table class="table">
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
																<div class="seatsInfo" v-if="bookingData.goingTo.ticketCount.adult != 0">
																		<label for="adult">全票</label>
																		<select name="adult" id="adult" v-model="bookingData.goingTo.ticketCount.adult">
																				<option v-for="(ticketCountNum, idx) in ticketCountNums" :key="`ticketCountNum-${idx}`" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
																		</select>
																		<v-select
																			v-model="bookingData.goingTo.ticketCount.adult"
																			:items="ticketCountNums"
																			class="ticks"
																			label="全票" 
																			item-text="num"
																			item-value="value"
																		/>
																</div>
																<div class="seatsInfo" v-if="bookingData.goingTo.ticketCount.kid != 0">
																		<v-select
																		 v-model="bookingData.goingTo.ticketCount.kid"
																		 :items="ticketCountNums" 
																		 class="ticks" 
																		 label="孩童票(6-11歲)" 
																		 item-text="num" 
																		 item-value="value" 
																		 />
																</div>
																<div class="seatsInfo" v-if="bookingData.goingTo.ticketCount.love != 0">
																		<v-select
																		v-model="bookingData.goingTo.ticketCount.love"
																		:items="ticketCountNums" 
																		class="ticks" 
																		label="愛心票" 
																		item-text="num" 
																		item-value="value" 
																		/>
																</div>
																<div class="seatsInfo" v-if="bookingData.goingTo.ticketCount.older != 0">
																		<v-select
																		v-model="bookingData.goingTo.ticketCount.older"
																		:items="ticketCountNums" 
																		class="ticks" 
																		label="敬老票(65歲以上)" 
																		item-text="num" 
																		item-value="value" 
																		/>
																</div>
																<div class="seatsInfo" v-if="bookingData.goingTo.ticketCount.student != 0">
																		<v-select
																		v-model="bookingData.goingTo.ticketCount.student"
																		:items="ticketCountNums" 
																		class="ticks" 
																		label="大學生優惠票" 
																		item-text="num" 
																		item-value="value" 
																		/>
																</div>
														</td>
												</tr>
												<tr>
														<th scope="row">座位資訊</th>
														<td>
																<div class="seatsInfo" v-for="(seat, idx) in bookingData.goingTo.seatsNo" :key="`go-${idx}`">{{seat}}</div>
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
								<v-row class="bookingTitle row">
										<v-col cols="6" sm="9" md="10">
												<h2>回程資料</h2>
										</v-col>
										<v-col>
												<v-btn class="change" color="error" @click="cancelGoingBack" :disabled="cantBeChange">取消訂票</v-btn>
										</v-col>
								</v-row>
								<v-simple-table class="table">
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
																<div class="seatsInfo" v-if="bookingData.goingBack.ticketCount.adult != 0">
																		<v-select class="ticks" label="全票" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.adult"></v-select>
																</div>
																<div class="seatsInfo" v-if="bookingData.goingBack.ticketCount.kid != 0">
																		<v-select class="ticks" label="孩童票(6-11歲)" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.kid"></v-select>
																</div>
																<div class="seatsInfo" v-if="bookingData.goingBack.ticketCount.love != 0">
																		<v-select class="ticks" label="愛心票" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.love"></v-select>
																</div>
																<div class="seatsInfo" v-if="bookingData.goingBack.ticketCount.older != 0">
																		<v-select class="ticks" label="敬老票(65歲以上)" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.older"></v-select>
																</div>
																<div class="seatsInfo" v-if="bookingData.goingBack.ticketCount.student != 0">
																		<v-select class="ticks" label="大學生優惠票" :items="ticketCountNums" item-text="num" item-value="value" v-model="bookingData.goingBack.ticketCount.student"></v-select>
																</div>
														</td>
												</tr>
												<tr>
														<th scope="row">座位資訊</th>
														<td>
																<div class="seatsInfo" v-for="(seat , idx) in bookingData.goingBack.seatsNo" :key="`back-${idx}`">{{seat}}</div>
														</td>
												</tr>
												<tr>
														<th scope="row">總價</th>
														<td>$ {{totalPrice}}</td>
												</tr>
										</tbody>
								</v-simple-table>
						</v-container>
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
			userBookingDates: null,
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
			openList: true,
			cantBeChange: false,
			showInfo: true,
			updateInfo: false,
			readyToChange: false,
			fares: {},
			inputSeatData: [],
			inputBackSeatData: [],
			ticketCountNums: [],
			backTicketCountNums: [],
			totalPrice: null,
		};
	},
	updated() {
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
	methods: {
		justFindUser() {
			if ( this.userId === "" || this.phoneNum === "" ) {
				alert("請輸入ID及電話")
			} else {
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
				this.userBookingDates = null;
				this.updateInfo = false;
				this.cantBeChange = true;
				this.openList = true;
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
		openLists() {
			if ( this.openList === false ) {
				this.openList = true;
			} else {
				this.openList = false;
			}
		},
		findUser() {
			if ( this.userId === "" || this.phoneNum === "" ) {
				alert("請輸入ID及電話")
			} else {
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
				const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
				get( child( dbRef, `users/${this.userId}/${this.phoneNum}` ) )
				.then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						this.userBookingDates = snapshot.val();
						this.userFilter();
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
		userFilter() {
			const dateArr = Object.keys(this.userBookingDates);
      const fullDate = new Date();
      const nowY = fullDate.getFullYear();
      const nowM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
      const nowD = fullDate.getDate() < 10 ? ("0"+fullDate.getDate()) : fullDate.getDate();
			let info = {};
			let timeArr = [];
			let date = [];
			for (let i = 0 ; i < dateArr.length ; i++ ) {
				info = this.userBookingDates[`${dateArr[i]}`];
				timeArr = Object.keys( info );
				for ( let j = 0 ; j < timeArr.length ; j++ ){
					if ( info[`${timeArr[j]}`].goingBack ) {
						date = info[`${timeArr[j]}`].goingBack.date.split('-');
						if ( date[0] < nowY ) {
							delete this.userBookingDates[`${dateArr[i]}`];
							continue;
						} else {
							if ( date[1] < nowM ) {
								delete this.userBookingDates[`${dateArr[i]}`];
								continue;
							} else {
								if ( date[2] < nowD ) {
									delete this.userBookingDates[`${dateArr[i]}`];
									continue;
								}
							}
						}
					} else {
						date = info[`${timeArr[j]}`].goingTo.date.split('-');
						if ( date[0] < nowY ) {
							delete this.userBookingDates[`${dateArr[i]}`];
							continue;
						} else {
							if ( date[1] < nowM ) {
								delete this.userBookingDates[`${dateArr[i]}`];
								continue;
							} else {
								if ( date[2] < nowD ) {
									delete this.userBookingDates[`${dateArr[i]}`];
									continue;
								}
							}
						}
					}
				}
			}
		},
		findBookingInfo(key , key1) {
			this.openList = false;
			this.updateInfo = false;
			this.showInfo = true;
			this.readyToChange = false;
			this.fares = {};      
			const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
			const userId = this.userId;
			const phoneNum = this.phoneNum;
			const date = key;
			const time = key1;
			get( child( dbRef, `users/${userId}/${phoneNum}/${date}/${time}` ) ).then( ( snapshot ) => {
				if ( snapshot.exists() ) {
					this.bookingData.goingTo = snapshot.val().goingTo;
					if ( snapshot.val().goingBack ) {
							this.bookingData.goingBack = snapshot.val().goingBack;
					}
					this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
					this.createTicketSelector();
					this.getSeatsInfo();
				} else {
					alert("查無資訊");
				}
			}).catch( (error) => {
				alert("查無資訊");
				console.log(error);
			});
		},
		createTicketSelector() {
			this.ticketCountNums = [];
			this.backTicketCountNums = [];
			const goingTicketCount = parseInt(this.bookingData.goingTo.ticketCount.adult) + parseInt(this.bookingData.goingTo.ticketCount.kid) + parseInt(this.bookingData.goingTo.ticketCount.love) + parseInt(this.bookingData.goingTo.ticketCount.older) + parseInt(this.bookingData.goingTo.ticketCount.student);
			for ( let i = 1 ; i <= goingTicketCount ; i++ ) {
				let item = { num: i , value: i };
				this.ticketCountNums.push(item);
			}
			if ( this.bookingData.goingBack ) {
				const backTicketCount = parseInt(this.bookingData.goingBack.ticketCount.adult) + parseInt(this.bookingData.goingBack.ticketCount.kid) + parseInt(this.bookingData.goingBack.ticketCount.love) + parseInt(this.bookingData.goingBack.ticketCount.older) + parseInt(this.bookingData.goingBack.ticketCount.student);
				for ( let j = 1 ; j <= backTicketCount ; j++ ) {
						let item2 = { num: j , value: j };
						this.backTicketCountNums.push(item2);
				}
			}
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
		getSeatsInfo() {
				const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
				const goingDate = this.bookingData.goingTo.date;
				const goingTrainNo = this.bookingData.goingTo.trainNo;
				get( child( dbRef, `bookedSeats/${goingDate}` + `/${goingTrainNo}` ) ).then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						let response = snapshot.val();
						this.inputSeatData = response.seatsData;
					}
				}).catch( (error) => {
					console.log(error);
				});

				const backDate = this.bookingData.goingBack.date;
				const backTrainNo = this.bookingData.goingBack.trainNo;
				get( child( dbRef, `bookedSeats/${backDate}` + `/${backTrainNo}` ) ).then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						let response = snapshot.val();
						this.inputBackSeatData = response.seatsData;
					}
				}).catch( (error) => {
					console.log(error);
				});
		},
		cancelUpdateData() {
			this.findBookingInfo();   
		},
		cancelGoingTo() {
			let goingCancelOrNot = confirm("確定取消去程訂票?");

			if ( goingCancelOrNot ) {
				let goingUserId = prompt("再次輸入訂票人ID",'');
				const db = getDatabase( GetfirebaseConfig() );
				if ( goingUserId === this.userId ) {
					const userBookedSeats = this.bookingData.goingTo.seatsNo;
					for ( let i = 0 ; i < userBookedSeats.length ; i++ ) {
						for ( let j = 0 ; j < this.inputSeatData.length ; j++ ) {
							if ( userBookedSeats[i] == this.inputSeatData[j].seatsNo ) {
								this.inputSeatData.splice( j, 1);
							}
						}
					}
					if ( this.bookingData.goingBack.trainNo ){
						update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
							seatsData : this.inputSeatData
						});
						remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingTo" ) , {} );
						set( ref( db, 'users/' + this.userId + `/${this.phoneNum}`  ) , {
							goingTo: this.bookingData.goingBack
						})
						.then( () => {
							alert("已取消去程訂票");
							window.location.reload();
						})
					} else {
						update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
							seatsData
						});
						remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingTo" ) , {} )
						.then( () => {
							alert("已取消去程訂票");
							window.location.reload();
						})
					}
				} else {
					alert("訂票人ID不符")
				}
			}
		},
		cancelGoingBack() {
			let backCancelOrNot = confirm("確定取消回程訂票?");

			if ( backCancelOrNot ) {
				let backUserId = prompt("再次輸入訂票人ID",'');
				const db = getDatabase(GetfirebaseConfig());
				if ( backUserId === this.userId ) {
					const userBookedSeats = this.bookingData.goingBack.seatsNo;
					for ( let i = 0 ; i < userBookedSeats.length ; i++ ) {
						for ( let j = 0 ; j < this.inputBackSeatData.length ; j++ ) {
							if ( userBookedSeats[i] == this.inputBackSeatData[j].seatsNo ) {
								this.inputBackSeatData.splice( j, 1);
							}
						}
					}
					update( ref( db, 'bookedSeats/' + this.bookingData.goingBack.date + `/${this.bookingData.goingBack.trainNo}` ) , {
						seatsData : this.inputBackSeatData
					});
					remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingBack" ) , {} )
					.then( () => {
						alert("已取消回程訂票");
						window.location.reload();
					})
				} else {
					alert("訂票人ID不符")
				}
			}
		},
		updateSeatsInfo() {
			const userBookedSeats = this.bookingData.goingTo.seatsNo;
			const ticketTotal =  parseInt(this.bookingData.goingTo.ticketCount.adult) + parseInt(this.bookingData.goingTo.ticketCount.kid) + parseInt(this.bookingData.goingTo.ticketCount.love) + parseInt(this.bookingData.goingTo.ticketCount.older) + parseInt(this.bookingData.goingTo.ticketCount.student);
			if ( userBookedSeats.length > ticketTotal ) {
				const goingDiff = parseInt(userBookedSeats.length) - parseInt(ticketTotal);
				for ( let i = goingDiff ; i < userBookedSeats.length ; i++ ) {
					for ( let j = 0 ; j < this.inputSeatData.length ; j++ ) {
						if ( userBookedSeats[i] == this.inputSeatData[j].seatsNo ) {
							this.inputSeatData.splice( j, 1);
						}
					}
				}
			}
			if ( this.bookingData.goingBack.trainNo ) {
				const userBackBookedSeats = this.bookingData.goingBack.seatsNo;
				const backTicketTotal =  parseInt(this.bookingData.goingBack.ticketCount.adult) + parseInt(this.bookingData.goingBack.ticketCount.kid) + parseInt(this.bookingData.goingBack.ticketCount.love) + parseInt(this.bookingData.goingBack.ticketCount.older) + parseInt(this.bookingData.goingBack.ticketCount.student);
				if ( userBackBookedSeats.length > backTicketTotal ) {
					const backDiff = parseInt(userBackBookedSeats.length) - parseInt(backTicketTotal);
					for ( let i = backDiff ; i < userBackBookedSeats.length ; i++ ) {
						for ( let j = 0 ; j < this.inputBackSeatData.length ; j++ ) {
							if ( userBackBookedSeats[i] == this.inputBackSeatData[j].seatsNo ) {
								this.inputBackSeatData.splice( j, 1);
							}
						}
					}
				}
			}
		},
		updateData() {
			let changeOrNot = confirm("確定變更?");

			if ( changeOrNot ) {
				let userId = prompt("請再次輸入訂票人ID","");
				const db = getDatabase( GetfirebaseConfig() );
				if ( userId === this.userId ) {
					this.updateSeatsInfo();
					const goingCount = this.bookingData.goingTo.ticketCount;
					const goingSeatsNo = this.bookingData.goingTo.seatsNo;
					const ticketTotal =  parseInt(goingCount.adult) + parseInt(goingCount.kid) + parseInt(goingCount.love) + parseInt(goingCount.older) + parseInt(goingCount.student);
					if ( goingSeatsNo.length > ticketTotal ) {
						goingSeatsNo.length = ticketTotal;
					}
					update( ref( db, 'users/' + userId + `/${this.phoneNum}` + "/goingTo" ) , {
						ticketCount : this.bookingData.goingTo.ticketCount,
						price : this.bookingData.goingTo.price,
						seatsNo : goingSeatsNo
					});
					update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
						seatsData : this.inputSeatData
					});
					
					if ( this.bookingData.goingBack.trainNo ) {
						const backCount = this.bookingData.goingBack.ticketCount;
						const backSeatsNo = this.bookingData.goingBack.seatsNo;
						const backTicketTotal =  parseInt(backCount.adult) + parseInt(backCount.kid) + parseInt(backCount.love) + parseInt(backCount.older) + parseInt(backCount.student);
						if ( backSeatsNo.length > backTicketTotal ) {
								backSeatsNo.length = backTicketTotal;
						}
						update( ref( db, 'users/' + userId + `/${this.phoneNum}` + "/goingBack" ) , {
								ticketCount : this.bookingData.goingBack.ticketCount,
								price : this.bookingData.goingBack.price,
								seatsNo : backSeatsNo
						});
						update( ref( db, 'bookedSeats/' + this.bookingData.goingBack.date + `/${this.bookingData.goingBack.trainNo}` ) , {
								seatsData : this.inputBackSeatData
						});
					}
					alert("變更成功")
					this.findBookingInfo();
				} else {
					alert("訂票人ID不符")
				}
			}
		}
	},
}
</script>

<style scoped>
	.container{
		max-width: 1200px;
	}
  .userContainer{
    margin: 15px;
		max-width: 720px;
  }
  .users{
    margin: 0;
    margin-left: -1px;
		margin-top: -1px;
    padding: 0;
    text-align: center;
  }
	.seatsInfo{
		display: inline-block;
		margin:0 2%;
	}
	.change{
		margin:auto 5px;
	}
	.ticks{
		width: 50px;
	}
	.row{
		margin: 0;
	}
	@media (max-width: 705px) {
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
</style>