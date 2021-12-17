<template>
    <div class="container">
				<h1>後台管理系統</h1>
        <div class="searchBar row">
            <div class="IDsearch col">
                <label for="IDsearch">請輸入訂票人ID</label>
                <input type="password" name="IDsearch" id="IDsearch" v-model="userId" @keyup.enter="findBookingInfo">
            </div>
            <div class="IDsearch col">
                <label for="phoneSearch">請輸入訂票人電話</label>
                <input  name="phoneSearch" id="phoneSearch" v-model="phoneNum" @keyup.enter="findBookingInfo">
                <div class="btn btn-outline-info" @click="findBookingInfo">查詢</div>
            </div>
            <div class="col-3 align-self-center">
								<NuxtLink to="/checkoutCars">
										<div class="btn btn-outline-secondary">
												查看列車餘位
										</div>
								</NuxtLink>
            </div>
            <div class="backButton col-3 align-self-center">
                <NuxtLink to="/">
                    <div class="btn btn-outline-secondary">
                        查詢列車時刻
                    </div>
                </NuxtLink>
            </div>
        </div>
        <div class="bookingInfo" v-if="bookingData.goingTo.trainNo">
            <div class="bookingTitle row">
                <h2 class="col">去程資料</h2>
                <div class="change btn btn-outline-warning col-1" v-show="showInfo" @click="changeTicket">變更票數</div>
                <div class="change btn btn-outline-warning col-1" v-show="updateInfo" @click="cancelUpdateData">取消變更</div>
								<div class="change btn btn-primary col-1" v-show="readyToChange" @click="updateData">確認變更</div>
                <div class="change btn btn-danger col-1" @click="cancelGoingTo">取消訂票</div>
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
                        <div class="seatsInfo">
                            <label for="adult">全票</label>
                            <select name="adult" id="adult" v-model="bookingData.goingTo.ticketCount.adult">
                                <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                            </select>
                        </div>
                        <div class="seatsInfo">
                            <label for="kid">孩童票(6-11歲)</label>
                            <select name="kid" id="kid" v-model="bookingData.goingTo.ticketCount.kid">
                                <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                            </select>
                        </div>
                        <div class="seatsInfo">
                            <label for="love">愛心票</label>
                            <select name="love" id="love" v-model="bookingData.goingTo.ticketCount.love">
                                <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                            </select>
                        </div>
                        <div class="seatsInfo">
                            <label for="adult">敬老票(65歲以上)</label>
                            <select name="older" id="older" v-model="bookingData.goingTo.ticketCount.older">
                                <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                            </select>
                        </div>
                        <div class="seatsInfo">
                            <label for="student">大學生優惠票</label>
                            <select name="student" id="student" v-model="bookingData.goingTo.ticketCount.student">
                                <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                            </select>
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
            </table>
        </div>
        <div class="bookingInfo" v-if="bookingData.goingBack.trainNo">
            <div class="bookingTitle row">
                    <h2 class="col">回程資料</h2>
                    <div class="change btn btn-danger col-1" @click="cancelGoingBack">取消訂票</div>
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
                        <div class="seatsInfo">
                            <label for="adult">全票</label>
                            <select name="adult" id="adult" v-model="bookingData.goingBack.ticketCount.adult">
                                <option v-for="backTicketCountNum in backTicketCountNums" :key="backTicketCountNum.index" :value="backTicketCountNum.value">{{backTicketCountNum.num}}</option>
                            </select>
                        </div>
                        <div class="seatsInfo">
                            <label for="kid">孩童票(6-11歲)</label>
                            <select name="kid" id="kid" v-model="bookingData.goingBack.ticketCount.kid">
                                <option v-for="backTicketCountNum in backTicketCountNums" :key="backTicketCountNum.index" :value="backTicketCountNum.value">{{backTicketCountNum.num}}</option>
                            </select>
                        </div>
                        <div class="seatsInfo">
                            <label for="love">愛心票</label>
                            <select name="love" id="love" v-model="bookingData.goingBack.ticketCount.love">
                                <option v-for="backTicketCountNum in backTicketCountNums" :key="backTicketCountNum.index" :value="backTicketCountNum.value">{{backTicketCountNum.num}}</option>
                            </select>
                        </div>
                        <div class="seatsInfo">
                            <label for="adult">敬老票(65歲以上)</label>
                            <select name="older" id="older" v-model="bookingData.goingBack.ticketCount.older">
                                <option v-for="backTicketCountNum in backTicketCountNums" :key="backTicketCountNum.index" :value="backTicketCountNum.value">{{backTicketCountNum.num}}</option>
                            </select>
                        </div>
                        <div class="seatsInfo">
                            <label for="student">大學生優惠票</label>
                            <select name="student" id="student" v-model="bookingData.goingBack.ticketCount.student">
                                <option v-for="backTicketCountNum in backTicketCountNums" :key="backTicketCountNum.index" :value="backTicketCountNum.value">{{backTicketCountNum.num}}</option>
                            </select>
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
            </table>
        </div>
				<div class="seatTable" v-if="updateInfo" >
						<div class="seatTitle">
								<h2>請選擇座位</h2>
								<div class="showStatus">
								<div class="ready">
										可選擇 <div class="canBeChoose">可</div>
										已預定 <div class="cantBeChoose">否</div>
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
																			<span class="round button">
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
										<div class="going btn btn-warning btn-sm" v-show="goingSeatTable" @click="switchBack">選擇回程座位</div>
										<div class="back btn btn-warning btn-sm" v-show="backSeatTable" @click="switchGoing">選擇去程座位</div>
								</div>
						</div>
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
			phoneNum:"",
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
			ticketTotal: null,
			backTicketTotal: null,
			showInfo: true,
			updateInfo: false,
			readyToChange: false,
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
				bussinessAdult: null,
				bussinessGroup: null,
				bussinessKid: null,
				freeAdult: null,
				freeKid: null,
				standardAdult: null,
				standardGroup: null,
				standardKid: null
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
	},
	methods: {
		createSeats() {
			this.seats = [
				[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			];
			for ( let i = 1 ; i < 21 ; i++ ) {
				let item = { No: `A${i}` , booked: "0" };
				this.seats[0].push(item);
				let item1 = { No: `B${i}` , booked: "0" };
				this.seats[1].push(item1);
				let item2 = { No: `C${i}` , booked: "0" };
				this.seats[2].push(item2);
				let item3 = { No: `D${i}` , booked: "0" };
				this.seats[3].push(item3);
				let item4 = { No: `E${i}` , booked: "0" };
				this.seats[4].push(item4);
				let item5 = { No: `F${i}` , booked: "0" };
				this.seats[5].push(item5);
				let item6 = { No: `G${i}` , booked: "0" };
				this.seats[6].push(item6);
				let item7 = { No: `H${i}` , booked: "0" };
				this.seats[7].push(item7);
				let item8 = { No: `I${i}` , booked: "0" };
				this.seats[8].push(item8);
				let item9 = { No: `J${i}` , booked: "0" };
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
		findBookingInfo() {
			this.updateInfo = false;
			this.showInfo = true;
			this.readyToChange = false;
			this.fares = {
				bussinessAdult: null,
				bussinessGroup: null,
				bussinessKid: null,
				freeAdult: null,
				freeKid: null,
				standardAdult: null,
				standardGroup: null,
				standardKid: null
			};
			return new Promise( ( resolve , reject ) => {
				const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
				const userId = this.userId;
				const phoneNum = this.phoneNum;
				get( child( dbRef, `users/${userId}/${phoneNum}` ) )
				.then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						this.bookingData.goingTo = snapshot.val().goingTo;
						if ( snapshot.val().goingBack ) {
								this.bookingData.goingBack = snapshot.val().goingBack;
						}
						this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
						this.getSeatsInfo();
						this.setTookOrNot();
						resolve();
					} else {
						alert("查無資訊");
						resolve();
					}
				}).catch( (error) => {
					console.log(error);
					alert("查無資訊");
					reject();
				});
			})
		},
		changeTicket() {
			this.showInfo = false;
			this.updateInfo = true;
			this.readyToChange = true;
			return new Promise( ( resolve )=>{
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
						resolve();
					})         
				}
			})
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
			return new Promise( ( resolve , reject ) => {
				const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
				const goingDate = this.bookingData.goingTo.date;
				const goingTrainNo = this.bookingData.goingTo.trainNo;
				get( child( dbRef, `bookedSeats/${goingDate}` + `/${goingTrainNo}` ) ).then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						let response = snapshot.val();
						this.inputSeatData = response.seatsData;
						this.refreshInputSeats();
						this.initSeatTable();
						resolve();
					}
				}).catch( (error) => {
					console.log(error);
					reject();
				});
				const backDate = this.bookingData.goingBack.date;
				const backTrainNo = this.bookingData.goingBack.trainNo;
				get( child( dbRef, `bookedSeats/${backDate}` + `/${backTrainNo}` ) ).then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						let response = snapshot.val();
						this.inputBackSeatData = response.seatsData;
						this.refreshInputSeats();
						resolve();
					}
				}).catch( (error) => {
					console.log(error);
					reject();
				});
			})
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
			if ( this.inputSeatData.length > 0 ) {
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
			if ( this.inputBackSeatData.length > 0 ) {
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
									if( input.tookOrNot[l].station === this.searchInfo.departure.value ) {
										if ( input.tookOrNot[l].took === true ) {
											seat[k].booked = "1";
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
							if ( seat[k].No === inputs[i] ) {
								let input = inputs[i];
								for (let l = 0 ; l < input.tookOrNot.length ; l++ ) {
									if( input.tookOrNot[l].station === this.searchInfo.departure.value ) {
										if ( input.tookOrNot[l].took === true ) {
											seat[k].booked = "1";
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
			if ( this.backSeats.length < 1 ) {
				this.goingSeats = this.selectedSeats;
				this.selectedSeats = [];
			} else {
				this.goingSeats = this.selectedSeats;
				this.selectedSeats = this.backSeats;
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
			if ( this.goingSeats.length < 1 ) {
				this.backSeats = this.selectedSeats;
				this.selectedSeats = [];
			} else {
				this.backSeats = this.selectedSeats;
				this.selectedSeats = this.goingSeats;
			}
		},
		cancelUpdateData() {
			this.findBookingInfo();   
		},
		cancelGoingTo() {
			let goingCancelOrNot = confirm("確定取消去程訂票?");

			return new Promise( ( resolve ) => {
				if ( goingCancelOrNot ) {
					let goingUserId = prompt("再次輸入訂票人ID",'');
					const db = getDatabase( GetfirebaseConfig() );
					if ( goingUserId === this.userId ) {
						if ( this.bookingData.goingBack.trainNo ){
							update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
								seatsData : this.inputSeatData
							});
							remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingTo" ) , {} );
							set( ref( db, 'users/' + this.userId + `/${this.phoneNum}` ) , {
								goingTo: this.bookingData.goingBack
							})
							.then( () => {
								resolve();
								alert("已取消去程訂票");
								window.location.reload();
							})
						} else {
							update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
								seatsData : this.inputSeatData
							});
							remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingTo" ) , {} )
							.then( () => {
								resolve();
								alert("已取消去程訂票");
								window.location.reload();
							})
						}
					} else {
						alert("訂票人ID不符")
					}
				}
			})
		},
		cancelGoingBack() {
			let backCancelOrNot = confirm("確定取消回程訂票?");

			return new Promise( ( resolve ) => {
				if ( backCancelOrNot ) {
					let backUserId = prompt("再次輸入訂票人ID",'');
					const db = getDatabase(GetfirebaseConfig());
					if ( backUserId === this.userId ) {
						update( ref( db, 'bookedSeats/' + this.bookingData.goingBack.date + `/${this.bookingData.goingBack.trainNo}` ) , {
							seatsData : this.inputBackSeatData
						});
						remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingBack" ) , {} )
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
		updateSeatsInfo() {
			for ( let i = 0 ; i < this.goingSeats.length ; i++ ) {
				let key = this.goingSeats[i];
				let	item = { 	seatsNo : key ,	tookOrNot : this.tookOrNot }
				this.inputSeatData.push(item);
			}
			if ( this.backSeats.length > 0 ) {
				for ( let j = 0 ; j < this.backSeats.length ; j++ ) {
					let backKey = this.backSeats[j];
					let backItem = { seatsNo : backKey , tookOrNot : this.backTookOrNot }
					this.inputBackSeatData.push(backItem);
				}
			}
		},
		updateData() {
			if ( this.goingSeatTable ) {
				this.goingSeats = this.selectedSeats;
			} else {
				this.backSeats = this.selectedSeats;
			}
			if ( this.goingSeats.length === this.ticketTotal && this.backSeats.length === this.backTicketTotal ) {
				let changeOrNot = confirm("確定變更?");

				return new Promise( ( resolve ) => {
					if ( changeOrNot ) {
						let userId = prompt("請再次輸入訂票人ID","");
						const db = getDatabase( GetfirebaseConfig() );
						if ( userId === this.userId ) {
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
							resolve();
							alert("變更成功")
							this.findBookingInfo();
						} else {
							alert("訂票人ID不符")
						}
					}
				})
			} else {
				alert("總票數與所選座位數量不符");
			}
		}
	},
}
</script>

<style>
	.change{
		margin: 1%;
	}
	.seatsInfo{
		display: inline-block;
		margin:0 1%;
	}
	.seatTitle{
		text-align: center;
	}
	.seatTitle .canBeChoose{
		display: inline-block;
		background: #8ecbcf;
		color: #8ecbcf;
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
</style>