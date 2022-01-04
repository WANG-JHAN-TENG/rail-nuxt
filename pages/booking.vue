<template>
		<v-app>
				<v-container class="bookingPanel">
						<div class="noInfo" v-if="selectedTrain == '' ">
								<h1>請選擇車次</h1>
						</div>
						<div class="bookingForm" v-if="selectedTrain != ''">
								<v-simple-table>
								<tbody>
										<tr>
												<th>訂票人ID</th>
												<td>
														<v-text-field class="personal" v-model="userId" :rules="userIdRule" success></v-text-field>
														<span></span>
												</td>
										</tr>
										<tr>
												<th>手機號碼</th>
												<td>
														<v-text-field class="personal" v-model="phoneNum" :rules="phoneNumRule" success></v-text-field>
														<span></span>
												</td>
										</tr>
										<tr>
												<th>起訖站</th>
												<td>
														<v-select class="input d-inline-block mr-3" label="起程站" :items="stops" item-text="name" item-value="value" v-model="searchInfo.departure" return-object background-color="white" disabled>
														</v-select>
														<v-select class="input d-inline-block" label="到達站" :items="stops" item-text="name" item-value="value" v-model="searchInfo.arrival" return-object background-color="white" disabled>
														</v-select>
												</td>
										</tr>
										<tr>
												<th>車廂種類</th>
												<td>
														<v-radio-group v-model="carType">
																<v-radio label="標準車廂" value="0" :disabled="isStandardDisabled"></v-radio>
																<v-radio label="商務車廂" value="1" :disabled="isBusinessDisabled"></v-radio>
														</v-radio-group>
												</td>
												</tr>
												<tr>
												<th>時間</th>
												<td>
														<v-text-field class="input d-inline-block mr-3" label="去程日期" type="date" v-model="searchInfo.departDate" background-color="white" disabled>
														</v-text-field>
														<v-text-field class="input d-inline-block" label="車次號碼" v-model="selectedTrain.DailyTrainInfo.TrainNo" disabled></v-text-field>
														<br>
														<v-select class="input" :items="ways" item-text="name" item-value="value" v-model="searchInfo.oneWayOrNot" background-color="white" disabled>
														</v-select>
														<br>
														<div class="backtrip" v-if="searchInfo.oneWayOrNot === 'true'">
																<v-text-field class="input d-inline-block mr-3" label="回程日期" type="date" v-model="searchInfo.backDepartDate" background-color="white" disabled>
																</v-text-field>
																<v-text-field class="input d-inline-block" label="車次號碼" v-model="selectedBackTrain.DailyTrainInfo.TrainNo" disabled></v-text-field>
														</div>
												</td>
										</tr>
										<tr>
												<th>票數</th>
												<td>
														<v-select class="input d-inline-block mr-2" label="全票" :items="ticketCountNums" item-text="num" item-value="value" v-model="ticketCount.adult" background-color="white"></v-select>
														<v-select class="input d-inline-block mr-2" label="孩童票(6-11歲)" :items="ticketCountNums" item-text="num" item-value="value" v-model="ticketCount.kid" background-color="white"></v-select>
														<v-select class="input d-inline-block mr-2" label="愛心票" :items="ticketCountNums" item-text="num" item-value="value" v-model="ticketCount.love" background-color="white"></v-select>
														<v-select class="input d-inline-block mr-2" label="敬老票(65歲以上)" :items="ticketCountNums" item-text="num" item-value="value" v-model="ticketCount.older" background-color="white"></v-select>
														<v-select class="input d-inline-block" label="大學生優惠票" :items="ticketCountNums" item-text="num" item-value="value" v-model="ticketCount.student" background-color="white"></v-select>
												</td>
										</tr>
										<tr>
												<th>總價</th>
												<td>${{totalPrice}}</td>
										</tr>
								</tbody>
								</v-simple-table>
						</div>
						<div class="seatTable" v-if="totalSeat > 0 && carType != '' ">
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
								<v-row justify="center" class="my-5">
										<!-- <v-btn @click="adultFinish" v-if="ticketCount.adult === selectedSeats.length && ticketCount.adult > 0"
										>確認全票座位</v-btn>
										<v-btn @click="kidFinish" v-if="ticketCount.adult+ticketCount.kid === selectedSeats.length && ticketCount.kid > 0"
										>確認孩童票座位</v-btn>
										<v-btn @click="loveFinish" v-if="ticketCount.adult+ticketCount.kid+ticketCount.love === selectedSeats.length && ticketCount.love > 0"
										>確認愛心票座位</v-btn>
										<v-btn @click="olderFinish" v-if="ticketCount.adult+ticketCount.kid+ticketCount.love+ticketCount.older === selectedSeats.length && ticketCount.older > 0"
										>確認敬老票座位</v-btn>
										<v-btn @click="studentFinish" v-if="ticketCount.adult+ticketCount.kid+ticketCount.love+ticketCount.older+ticketCount.student === selectedSeats.length && ticketCount.student > 0"
										>確認學生票座位</v-btn> -->
										<v-btn @click="allFinish" v-if="ticketCount.adult+ticketCount.kid+ticketCount.love+ticketCount.older+ticketCount.student === selectedSeats.length"
										>確認座位</v-btn>
										<v-btn @click="clearSelectedSeats">重選</v-btn>
								</v-row>
								<v-row class="text-center" justify="center" v-if="searchInfo.oneWayOrNot === 'true' ">
										<div v-show="goingSeatTable" ><h3>去程座位</h3></div>
										<div v-show="backSeatTable" ><h3>回程座位</h3></div>
										<div class="switch mx-3" v-if="searchInfo.oneWayOrNot === 'true' ">
												<v-btn elevation="2" small color="warning" v-show="goingSeatTable" @click="switchBack">選擇回程座位</v-btn>
												<v-btn elevation="2" small color="warning" v-show="backSeatTable" @click="switchGoing">選擇去程座位</v-btn>
										</div>
								</v-row>
								<v-row justify="center" class="my-5 ticketType">
										<v-col class="ma-0" v-if="ticketCount.adult > 0">
												<v-row justify="center">
														成人票:
														<div class="selectedSeat" v-for="oneAdult in showSeats.adult" :key="oneAdult.index">
																{{oneAdult}}
														</div>
												</v-row>
										</v-col>
										<v-col class="ma-0" v-if="ticketCount.kid > 0">
												<v-row justify="center">
														孩童票:
														<div class="selectedSeat" v-for="oneKid in showSeats.kid" :key="oneKid.index">
																{{oneKid}}
														</div>
												</v-row>
										</v-col>
										<v-col class="ma-0" v-if="ticketCount.love > 0">
												<v-row justify="center">
														愛心票:
														<div class="selectedSeat" v-for="oneLove in showSeats.love" :key="oneLove.index">
																{{oneLove}}
														</div>
												</v-row>
										</v-col>
										<v-col class="ma-0" v-if="ticketCount.older > 0">
												<v-row justify="center">
														敬老票:
														<div class="selectedSeat" v-for="oneOlder in showSeats.older" :key="oneOlder.index">
																{{oneOlder}}
														</div>
												</v-row>
										</v-col>
										<v-col class="ma-0" v-if="ticketCount.student > 0">
												<v-row justify="center">
														學生票:
														<div class="selectedSeat" v-for="oneStudent in showSeats.student" :key="oneStudent.index">
																{{oneStudent}}
														</div>
												</v-row>
										</v-col>
								</v-row>
						</div>
						<v-row justify="center" class="ma-1">
								<v-btn color="success" @click="goBook">訂票</v-btn>
						</v-row>
						<v-row justify="center" class="mb-2">
								<v-btn class="mr-5" color="secondary" nuxt to="/">查詢其他時段</v-btn>
								<v-btn color="secondary" nuxt to="/trainInfo">選擇其他列車</v-btn>
						</v-row>
						<v-row justify="center">
								<v-btn color="primary" nuxt to="/bookingInfo">訂票查詢</v-btn>
						</v-row>
				</v-container>
		</v-app>
</template>

<script>
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';
import { getDatabase, ref, set , get , child } from "firebase/database";

export default {
  data() {
    return{
			phoneNumRule: [
				(v) => !!v || "請輸入電話" ,
				(v) => ( v.length == 10 ) || "格式不正確" ,
			],
			userIdRule: [
				(v) => !!v || "請輸入ID" ,
				(v) => ( v.length == 10 ) || "格式不正確" ,
				(v) => /(?=.*[A-Z])/.test(v) || "格式不正確" ,
			],
			stops: [
				{ name: "請選擇" , value: "" },
				{ name: "南港" , value: "0990" },
				{ name: "台北" , value: "1000" },
				{ name: "板橋" , value: "1010" },
				{ name: "桃園" , value: "1020" },
				{ name: "新竹" , value: "1030" },
				{ name: "苗栗" , value: "1035" },
				{ name: "台中" , value: "1040" },
				{ name: "彰化" , value: "1043" },
				{ name: "雲林" , value: "1047" },
				{ name: "嘉義" , value: "1050" },
				{ name: "台南" , value: "1060" },
				{ name: "左營" , value: "1070" }
			],
			ways: [
					{name : "單程" , value: "false"},
					{name : "去回程" , value: "true"},
			],
			ticketCountNums: [
				{ num: 0 , value: 0 },
				{ num: 1 , value: 1 },
				{ num: 2 , value: 2 },
				{ num: 3 , value: 3 },
				{ num: 4 , value: 4 },
				{ num: 5 , value: 5 },
				{ num: 6 , value: 6 },
				{ num: 7 , value: 7 },
				{ num: 8 , value: 8 },
				{ num: 9 , value: 9 },
				{ num: 10 , value: 10 }
			],
			isBusinessDisabled: false,
			isStandardDisabled: false,
			searchInfo: {
				departure: { name: "請選擇" ,value: "" },
				arrival: { name: "請選擇" , value: "" },
				oneWayOrNot: "false",
				departDate: "",
				backDepartDate: ""
			},
			selectedTrain: [],
			selectedBackTrain: [],
			userId: "",
			phoneNum: "",
			carType: "",
			ticketCount : {
				adult : 0,
				kid : 0,
				love : 0,
				older : 0,
				student : 0,
			},
			goingToPrice: "",
			goingBackPrice: "",
			totalPrice: "",
			totalSeat: 0,
			inputSeatData: [],
			inputBackSeatData: [],
			seats: [
					[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			],
			carNos: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
			selectedCar: "0",
			showSelectedCar: "A",
			goingSeatTable: true,
			backSeatTable: false,
			selectedSeats: [],
			goingSeats: [],
			backSeats: [],
			showSeats: {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			},
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
			todayDate: "",
			todayTime: "",
    };
  },
  computed: {

  },
  created() {
    this.searchInfo.departure.name = this.$store.state.departureName;
    this.searchInfo.departure.value = this.$store.state.departureValue;
    this.searchInfo.arrival.name = this.$store.state.arrivalName;
    this.searchInfo.arrival.value = this.$store.state.arrivalValue;
    this.searchInfo.oneWayOrNot = this.$store.state.oneWayOrNot;
    this.searchInfo.departDate = this.$store.state.departDate;
    this.searchInfo.backDepartDate = this.$store.state.backDepartDate;
    this.selectedTrain = this.$store.state.selectedTrain;
    this.selectedBackTrain = this.$store.state.selectedBackTrain;
    this.createSeats();
  },
  mounted()  {
    if ( this.searchInfo.oneWayOrNot === "false" ) {
			if ( this.selectedTrain.BusinessSeatStatus == 'X' ) {
				this.isBusinessDisabled = true;
				if ( this.selectedTrain.StandardSeatStatus == 'X' ) {
					this.isStandardDisabled = true;
				}
			} else if ( this.selectedTrain.StandardSeatStatus == 'X' || this.selectedBackTrain.StandardSeatStatus == 'X' ) {
				this.isStandardDisabled = true;
			}
    } else if ( this.searchInfo.oneWayOrNot === "true" ) {
			if ( this.selectedTrain.BusinessSeatStatus == 'X' || this.selectedBackTrain.BusinessSeatStatus == 'X' ) {
				this.isBusinessDisabled = true;
				if ( this.selectedTrain.StandardSeatStatus == 'X' || this.selectedBackTrain.StandardSeatStatus == 'X' ) {
						this.isStandardDisabled = true;
				}
			} else if ( this.selectedTrain.StandardSeatStatus == 'X' || this.selectedBackTrain.StandardSeatStatus == 'X' ) {
				this.isStandardDisabled = true;
			}
    }

		if ( this.selectedTrain.DailyTrainInfo ) {
			this.setTookOrNot();
			this.getSeatsInfo();
		}
  },
  updated() {
    this.countPrice();

    this.totalSeat = parseInt(this.ticketCount.adult) + parseInt(this.ticketCount.kid) + parseInt(this.ticketCount.love) + parseInt(this.ticketCount.older) + parseInt(this.ticketCount.student);

    if ( this.selectedSeats.length > this.totalSeat ) {
      this.selectedSeats.pop();
      alert("請先取消選取已選取座位");
    }

    this.showSelectedCar = this.carNos[this.selectedCar];
  },
  methods: {
		allFinish() {
			this.adultFinish();
			this.kidFinish();
			this.loveFinish();
			this.olderFinish();
			this.studentFinish();
		},
		adultFinish() {
			if ( this.ticketCount.adult > 0 ) {
				this.showSeats.adult = this.selectedSeats.slice( 0 , this.ticketCount.adult );
			}
		},
		kidFinish() {
			if ( this.ticketCount.kid > 0 ) {
				this.showSeats.kid = this.selectedSeats.slice( this.ticketCount.adult , this.ticketCount.kid );
			}
		},
		loveFinish() {
			let start = this.ticketCount.adult + this.ticketCount.kid;
			if ( this.ticketCount.love > 0 ) {
				this.showSeats.love = this.selectedSeats.slice( start , start+this.ticketCount.love );
			}
		},
		olderFinish() {
			let start = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love;
			if ( this.ticketCount.older > 0 ) {
				this.showSeats.older = this.selectedSeats.slice( start , start + this.ticketCount.older );
			}
		},
		studentFinish() {
			let start = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love + this.ticketCount.older;
			if ( this.ticketCount.student > 0 ) {
				this.showSeats.student = this.selectedSeats.slice( start , start + this.ticketCount.student );
			}
		},
		clearSelectedSeats() {
			this.selectedSeats = [];
			this.showSeats = {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			};
		},
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
		setTookOrNot (){
			if ( this.searchInfo.departure.value < this.searchInfo.arrival.value ) {
				for ( let i = 0 ; i < this.tookOrNot.length ; i++ ) {
					if ( this.searchInfo.departure.value <= this.tookOrNot[i].station && this.tookOrNot[i].station < this.searchInfo.arrival.value ) {
						this.tookOrNot[i].took = true;
					}
				}
			} else {
				for ( let j = 0 ; j < this.tookOrNot.length ; j++ ) {
					if ( this.searchInfo.departure.value >= this.tookOrNot[j].station && this.tookOrNot[j].station > this.searchInfo.arrival.value ) {
						this.tookOrNot[j].took = true;
					}
				}
			}
			if ( this.selectedBackTrain.DailyTrainInfo ) {
				if ( this.searchInfo.departure.value < this.searchInfo.arrival.value ) {
					for ( let k = 0 ; k < this.backTookOrNot.length ; k++ ) {
						if ( this.searchInfo.arrival.value >= this.backTookOrNot[k].station && this.backTookOrNot[k].station > this.searchInfo.departure.value ) {
							this.backTookOrNot[k].took = true;
						}
					}
				} else {
					for ( let l = 0 ; l < this.backTookOrNot.length ; l++ ) {
						if ( this.searchInfo.arrival.value <= this.backTookOrNot[l].station && this.backTookOrNot[l].station < this.searchInfo.departure.value ) {
							this.backTookOrNot[l].took = true;
						}
					}
				}
			}
		},
    getSeatsInfo() {
			const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
			const goingDate = this.searchInfo.departDate;
			const goingTrainNo = this.selectedTrain.DailyTrainInfo.TrainNo;
			get( child( dbRef, `bookedSeats/${goingDate}` + `/${goingTrainNo}` ) )
			.then( ( snapshot ) => {
				if ( snapshot.exists() ) {
						let response = snapshot.val();
						this.inputSeatData = response.seatsData;
						this.initSeatTable();
				}
			})
			.catch( (error) => {
				console.log(error);
			});

			if ( this.selectedBackTrain.DailyTrainInfo ) {
				const backDate = this.searchInfo.backDepartDate;
				const backTrainNo = this.selectedBackTrain.DailyTrainInfo.TrainNo;
				get( child( dbRef, `bookedSeats/${backDate}` + `/${backTrainNo}` ) )
				.then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						let response = snapshot.val();
						this.inputBackSeatData = response.seatsData;
					}
				})
				.catch( (error) => {
					console.log(error);
				});
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
									if ( this.searchInfo.arrival.value > this.searchInfo.departure.value) {
										if ( this.searchInfo.departure.value <= input.tookOrNot[l].station && input.tookOrNot[l].station < this.searchInfo.arrival.value ) {
											if ( input.tookOrNot[l].took === true ) {
												seat[k].booked = "1";
												break;
											}
										}
									} else {
										if ( this.searchInfo.arrival.value < input.tookOrNot[l].station && input.tookOrNot[l].station <= this.searchInfo.departure.value ) {
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
									if ( this.searchInfo.arrival.value > this.searchInfo.departure.value) {
										if ( this.searchInfo.departure.value < input.tookOrNot[l].station && input.tookOrNot[l].station <= this.searchInfo.arrival.value ) {
											if ( input.tookOrNot[l].took === true ) {
												seat[k].booked = "1";
												break;
											}
										}
									} else {
										if ( this.searchInfo.arrival.value <= input.tookOrNot[l].station && input.tookOrNot[l].station < this.searchInfo.departure.value ) {
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
    countPrice(){
      if ( this.carType === "0" ) {
				let total = 
				this.$store.state.ticketInfo.standardAdult * this.ticketCount.adult +
				this.$store.state.ticketInfo.standardKid * this.ticketCount.kid +
				this.$store.state.ticketInfo.standardKid * this.ticketCount.love +
				this.$store.state.ticketInfo.standardKid * this.ticketCount.older +
				this.$store.state.ticketInfo.standardGroup * this.ticketCount.student;
				this.goingToPrice = total;
				if ( this.searchInfo.oneWayOrNot === "true" ) {
						this.goingBackPrice = total;
				}
      } else if ( this.carType === "1" ) {
				let total =
				this.$store.state.ticketInfo.bussinessAdult * this.ticketCount.adult +
				this.$store.state.ticketInfo.bussinessKid * this.ticketCount.kid +
				this.$store.state.ticketInfo.bussinessKid * this.ticketCount.love +
				this.$store.state.ticketInfo.bussinessKid * this.ticketCount.older +
				this.$store.state.ticketInfo.bussinessGroup * this.ticketCount.student;
				this.goingToPrice = total;
				if ( this.searchInfo.oneWayOrNot === "true" ) {
						this.goingBackPrice = total;
				}
      }
      this.totalPrice = this.goingToPrice + this.goingBackPrice;
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
			this.showSeats = {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			};
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
				if ( this.ticketCount.adult > 0 ) {
					this.showSeats.adult = this.backSeats.slice( 0 , this.ticketCount.adult );
				}
				if ( this.ticketCount.kid > 0 ) {
					this.showSeats.kid = this.backSeats.slice( this.ticketCount.adult , this.ticketCount.kid );
				}
				let start = this.ticketCount.adult + this.ticketCount.kid;
				if ( this.ticketCount.love > 0 ) {
					this.showSeats.love = this.backSeats.slice( start , start+this.ticketCount.love );
				}
				let start1 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love;
				if ( this.ticketCount.older > 0 ) {
					this.showSeats.older = this.backSeats.slice( start1 , start1 + this.ticketCount.older );
				}
				let start2 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love + this.ticketCount.older;
				if ( this.ticketCount.student > 0 ) {
					this.showSeats.student = this.backSeats.slice( start2 , start2 + this.ticketCount.student );
				}
			}
    },
    switchGoing() {
			this.goingSeatTable = true;
			this.backSeatTable = false;
			this.seats = [
				[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			];
			this.showSeats = {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			};
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
				if ( this.ticketCount.adult > 0 ) {
					this.showSeats.adult = this.goingSeats.slice( 0 , this.ticketCount.adult );
				}
				if ( this.ticketCount.kid > 0 ) {
					this.showSeats.kid = this.goingSeats.slice( this.ticketCount.adult , this.ticketCount.kid );
				}
				let start = this.ticketCount.adult + this.ticketCount.kid;
				if ( this.ticketCount.love > 0 ) {
					this.showSeats.love = this.goingSeats.slice( start , start+this.ticketCount.love );
				}
				let start1 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love;
				if ( this.ticketCount.older > 0 ) {
					this.showSeats.older = this.goingSeats.slice( start1 , start1 + this.ticketCount.older );
				}
				let start2 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love + this.ticketCount.older;
				if ( this.ticketCount.student > 0 ) {
					this.showSeats.student = this.goingSeats.slice( start2 , start2 + this.ticketCount.student );
				}
			}
    },
    goBook() {
			this.createTime();
    },
		createTime() {
      let fullDate = new Date();
      let yyyy = fullDate.getFullYear();
      let MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
      let dd = fullDate.getDate() < 10 ? ("0"+fullDate.getDate()) : fullDate.getDate();
      let today = `${yyyy}-${MM}-${dd}`;
			this.todayDate = today;
      let hour = fullDate.getHours() < 10 ? ( "0" + fullDate.getHours() ) : fullDate.getHours();
      let min = fullDate.getMinutes() < 10 ? ( "0" + fullDate.getMinutes() ) : fullDate.getMinutes();
      let now = `${hour}:${min}`;
			this.todayTime = now;

			this.getSelectedSeats();
		},
		getSelectedSeats() {
			if ( this.goingSeatTable == false ) {
				this.backSeats = this.selectedSeats;
				this.checkInputMiss();
			} else {
				this.goingSeats = this.selectedSeats;
				this.checkInputMiss();
			}
		},
		checkInputMiss() {
			if ( this.userId && this.searchInfo.departure && this.searchInfo.arrival && this.searchInfo.departDate && this.carType && this.selectedTrain.DailyTrainInfo.TrainNo ) {
				this.checkOneWay();
			}	else {
				alert("請輸入完整列車資訊");
			}
		},
		checkOneWay() {
			if ( this.searchInfo.oneWayOrNot === "false" ) {
				this.ticketAmount();
			} else {
				this.backTicketAmount();
			}
		},
		ticketAmount() {
			if ( this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0 ) {
				this.showOneWayInfo();
			} else {
				alert("請選擇票數")
			}
		},
		showOneWayInfo() {
			let carType = "";
			if (this.carType ==="0" ) {
				carType = "標準車廂";
			} else {
				carType = "商務車廂";
			}
			let ticketType = {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			}
			if ( this.ticketCount.adult > 0 ) {
				ticketType.adult = this.goingSeats.slice( 0 , this.ticketCount.adult );
			}
			if ( this.ticketCount.kid > 0 ) {
				ticketType.kid = this.goingSeats.slice( this.ticketCount.adult , this.ticketCount.kid );
			}
			let start = this.ticketCount.adult + this.ticketCount.kid;
			if ( this.ticketCount.love > 0 ) {
				ticketType.love = this.goingSeats.slice( start , start+this.ticketCount.love );
			}
			let start1 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love;
			if ( this.ticketCount.older > 0 ) {
				ticketType.older = this.goingSeats.slice( start1 , start1 + this.ticketCount.older );
			}
			let start2 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love + this.ticketCount.older;
			if ( this.ticketCount.student > 0 ) {
				ticketType.student = this.goingSeats.slice( start2 , start2 + this.ticketCount.student );
			}
			let bookOrNot = confirm(`
			請確認訂票資訊
			起站:${this.searchInfo.departure.name}
			訖站:${this.searchInfo.arrival.name}
			車廂種類:${carType}
			去程時間:${this.searchInfo.departDate}${this.selectedTrain.OriginStopTime.DepartureTime}
			全票:${this.ticketCount.adult}
			孩童票:${this.ticketCount.kid}
			愛心票:${this.ticketCount.love}
			敬老票:${this.ticketCount.older}
			學生票:${this.ticketCount.student}
			全票座位:${ticketType.adult}
			孩童票座位:${ticketType.kid}
			愛心票座位:${ticketType.love}
			敬老票座位:${ticketType.older}
			學生票座位:${ticketType.student}
			總價:${this.goingToPrice}
			`);
			if ( bookOrNot ) {
				this.oneWayBook();
			}
		},
		oneWayBook() {
			if ( this.goingSeats.length === this.totalSeat ) {
				const db = getDatabase( GetfirebaseConfig() );
				set(ref( db, 'users/' + this.userId + `/${this.phoneNum}` + `/${this.todayDate}` + `/${this.todayTime}` + "/goingTo" ), {
					startStation: this.searchInfo.departure,
					endStation: this.searchInfo.arrival,
					carType : this.carType,
					date : this.searchInfo.departDate,
					trainNo : this.selectedTrain.DailyTrainInfo.TrainNo,
					departTime : this.selectedTrain.OriginStopTime.DepartureTime,
					arrivalTime : this.selectedTrain.DestinationStopTime.ArrivalTime,
					ticketCount : this.ticketCount,
					seatsNo : this.goingSeats,
					price : this.goingToPrice,
				})
				let seatsData = [];
				if ( this.inputSeatData.length > 0 ) {
					for (let g = 0 ; g < this.inputSeatData.length ; g++ ) {
						seatsData.push(this.inputSeatData[g]);
					}
				}
				for ( let h = 0 ; h < this.goingSeats.length ; h++ ) {
					let key = this.goingSeats[h];
					let	item = { 	seatsNo : key,	tookOrNot : this.tookOrNot }
					seatsData.push(item);
				}
				set(ref( db, 'bookedSeats/' + this.searchInfo.departDate + `/${this.selectedTrain.DailyTrainInfo.TrainNo}` ), {
					seatsData
				})
				.then( () => {
					alert("訂票成功");
					window.location.reload();
				})
				.catch( () => {
					alert("訂票失敗，請重新操作")
				})
			} else {
				alert("請選擇座位")
			}
		},
		backTicketAmount() {
			if ( this.searchInfo.backDepartDate && this.selectedBackTrain.DailyTrainInfo.TrainNo ) {
				if ( this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0 ) {
					this.showTwoWayInfo();
				} else {
					alert("請選擇票數")
				}
			} else {
				alert("請輸入回程列車資訊");
			}
		},
		showTwoWayInfo() {
			let carType = "";
			if (this.carType ==="0" ) {
				carType = "標準車廂";
			} else {
				carType = "商務車廂";
			}
			let goTicketType = {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			}
			if ( this.ticketCount.adult > 0 ) {
				goTicketType.adult = this.goingSeats.slice( 0 , this.ticketCount.adult );
			}
			if ( this.ticketCount.kid > 0 ) {
				goTicketType.kid = this.goingSeats.slice( this.ticketCount.adult , this.ticketCount.kid );
			}
			let start = this.ticketCount.adult + this.ticketCount.kid;
			if ( this.ticketCount.love > 0 ) {
				goTicketType.love = this.goingSeats.slice( start , start+this.ticketCount.love );
			}
			let start1 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love;
			if ( this.ticketCount.older > 0 ) {
				goTicketType.older = this.goingSeats.slice( start1 , start1 + this.ticketCount.older );
			}
			let start2 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love + this.ticketCount.older;
			if ( this.ticketCount.student > 0 ) {
				goTicketType.student = this.goingSeats.slice( start2 , start2 + this.ticketCount.student );
			}
			let goBookOrNot = confirm(`
			請確認去程訂票資訊
			起站:${this.searchInfo.departure.name}
			訖站:${this.searchInfo.arrival.name}
			車廂種類:${carType}
			去程時間:${this.searchInfo.departDate}${this.selectedTrain.OriginStopTime.DepartureTime}
			全票:${this.ticketCount.adult}
			孩童票:${this.ticketCount.kid}
			愛心票:${this.ticketCount.love}
			敬老票:${this.ticketCount.older}
			學生票:${this.ticketCount.student}
			全票座位:${goTicketType.adult}
			孩童票座位:${goTicketType.kid}
			愛心票座位:${goTicketType.love}
			敬老票座位:${goTicketType.older}
			學生票座位:${goTicketType.student}
			總價:${this.goingToPrice}
			`);
			let backTicketType = {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			}
			if ( this.ticketCount.adult > 0 ) {
				backTicketType.adult = this.backSeats.slice( 0 , this.ticketCount.adult );
			}
			if ( this.ticketCount.kid > 0 ) {
				backTicketType.kid = this.backSeats.slice( this.ticketCount.adult , this.ticketCount.kid );
			}
			let start3 = this.ticketCount.adult + this.ticketCount.kid;
			if ( this.ticketCount.love > 0 ) {
				backTicketType.love = this.backSeats.slice( start3 , start3 + this.ticketCount.love );
			}
			let start4 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love;
			if ( this.ticketCount.older > 0 ) {
				backTicketType.older = this.backSeats.slice( start4 , start4 + this.ticketCount.older );
			}
			let start5 = this.ticketCount.adult + this.ticketCount.kid + this.ticketCount.love + this.ticketCount.older;
			if ( this.ticketCount.student > 0 ) {
				backTicketType.student = this.backSeats.slice( start5 , start5 + this.ticketCount.student );
			}
			let backBookOrNot = confirm(`
			請確認回程訂票資訊
			起站:${this.searchInfo.arrival.name}
			訖站:${this.searchInfo.departure.name}
			車廂種類:${carType}
			回程時間:${this.searchInfo.backDepartDate}${this.selectedBackTrain.OriginStopTime.DepartureTime}
			全票:${this.ticketCount.adult}
			孩童票:${this.ticketCount.kid}
			愛心票:${this.ticketCount.love}
			敬老票:${this.ticketCount.older}
			學生票:${this.ticketCount.student}
			全票座位:${backTicketType.adult}
			孩童票座位:${backTicketType.kid}
			愛心票座位:${backTicketType.love}
			敬老票座位:${backTicketType.older}
			學生票座位:${backTicketType.student}
			總價:${this.goingToPrice}
			`);
			if ( goBookOrNot && backBookOrNot ) {
				this.twoWayBook();
			}
		},
		twoWayBook() {
			if ( this.goingSeats.length === this.totalSeat && this.backSeats.length === this.totalSeat ) {
				const db = getDatabase( GetfirebaseConfig() );
				set(ref( db, 'users/' + this.userId + `/${this.phoneNum}` + `/${this.todayDate}` + `/${this.todayTime}` + "/goingTo" ), {
					startStation: this.searchInfo.departure,
					endStation: this.searchInfo.arrival,
					carType : this.carType,
					date : this.searchInfo.departDate,
					trainNo : this.selectedTrain.DailyTrainInfo.TrainNo,
					departTime : this.selectedTrain.OriginStopTime.DepartureTime,
					arrivalTime : this.selectedTrain.DestinationStopTime.ArrivalTime,
					ticketCount : this.ticketCount,
					seatsNo : this.goingSeats,
					price : this.goingBackPrice,
				})
				let seatsData = [];
				if ( this.inputSeatData.length > 0 ) {
					for (let g = 0 ; g < this.inputSeatData.length ; g++ ) {
						seatsData.push(this.inputSeatData[g]);
					}
				}
				for ( let h = 0 ; h < this.goingSeats.length ; h++ ) {
					let key = this.goingSeats[h];
					let	item = { 	seatsNo : key,	tookOrNot : this.tookOrNot }
					seatsData.push(item);
				}
				set(ref( db, 'bookedSeats/' + this.searchInfo.departDate + `/${this.selectedTrain.DailyTrainInfo.TrainNo}` ), {
					seatsData,
				})

				set(ref( db, 'users/' + this.userId + `/${this.phoneNum}` + `/${this.todayDate}` + `/${this.todayTime}` + "/goingBack" ), {
					startStation: this.searchInfo.arrival,
					endStation: this.searchInfo.departure,
					carType : this.carType,
					date : this.searchInfo.backDepartDate,
					trainNo : this.selectedBackTrain.DailyTrainInfo.TrainNo,
					departTime : this.selectedBackTrain.OriginStopTime.DepartureTime,
					arrivalTime : this.selectedBackTrain.DestinationStopTime.ArrivalTime,
					ticketCount : this.ticketCount,
					seatsNo : this.backSeats,
					price : this.goingBackPrice,
				})
				let backSeatsData = [];
				if (this.inputBackSeatData.length > 0) {
					for ( let i = 0 ; i < this.inputBackSeatData.length ; i++ ) {
						backSeatsData.push( this.inputBackSeatData[i] );
					}
				}
				for ( let j = 0 ; j < this.backSeats.length ; j++ ) {
					let key = this.backSeats[j];
					let	item = { 	seatsNo : key,	tookOrNot : this.backTookOrNot }
					backSeatsData.push(item);
				}
				set(ref( db, 'bookedSeats/' + this.searchInfo.backDepartDate + `/${this.selectedBackTrain.DailyTrainInfo.TrainNo}` ), {
					seatsData : backSeatsData,
				})
				.then( () => {
					alert("訂票成功");
					window.location.reload();
				})
				.catch( () => {
					alert("訂票失敗，請重新操作")
				})
			} else {
				alert("請選擇座位");
			}
		},
  },
}
</script>

<style scoped>
	.noInfo{
			text-align: center;
	}
	.bookingPanel{
		max-width: 960px;
		margin: 50px auto;
	}
	.bookingForm .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
	.bookingForm .v-data-table > .v-data-table__wrapper > table > thead > tr > th{
		text-align: center !important;
		font-size: 1rem;
	}
	.bookingForm .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
		font-size: 16px;
	}
	.personal{
		width: 150px;
	}
	.input{
		width: 120px;
	}
	.v-label.theme--light label{
		margin-bottom: 0 !important;
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
	.seatTitle .BeChoosed{
		display: inline-block;
		background: #d86c6c;
		color: #d86c6c;
	}
	.seatChoice{
		margin: 5% auto 2% auto;
		padding: 3% auto;
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
	.ticketType{
		max-width: 720px;
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
		.bookingForm .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
		.bookingForm .v-data-table > .v-data-table__wrapper > table > thead > tr > th{
			font-size: 14px;
		}
		.bookingForm .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
			font-size: 14px;
		}
		.oneTrain .button{
			width: 6vh;
			height: 6vh;
		}
		.singleCar{
			margin: 0 3%;
		}
	}
</style>