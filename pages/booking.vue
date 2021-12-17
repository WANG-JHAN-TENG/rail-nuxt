<template>
    <div class="container bookingPanel">
        <div class="noInfo" v-if="selectedTrain == '' ">
            <h1>請選擇車次</h1>
        </div>
        <div class="bookingForm" v-if="selectedTrain != ''">
            <table class="table">
            <tbody>
                <tr>
                    <th scope="row">手機號碼</th>
                    <td>
                        <input name="phoneNum" id="phoneNum" v-model="phoneNum">
                    </td>
                </tr>
                <tr>
                    <th scope="row">訂票人ID</th>
                    <td>
                        <input type="password" name="userId" id="userId" v-model="userId">
                    </td>
                </tr>
                <tr>
                    <th scope="row">起訖站</th>
                    <td>
                        <label for="departure">起程站</label>
                        <select name="departure" id="departure" v-model="searchInfo.departure" disabled>
                            <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                        </select>
                        <label for="arrival">到達站</label>
                        <select name="arrival" id="arrival" v-model="searchInfo.arrival" disabled>
                            <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row">車廂種類</th>
                    <td>
                        <input type="radio" name="color" value="0" v-model="carType" :disabled="isStandardDisabled"> 標準車廂
                        <input type="radio" name="color" value="1" v-model="carType" :disabled="isBusinessDisabled"> 商務車廂
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">時間</th>
                    <td colspan="2">
                            <label for="departDate">去程</label>
                            <input type="date" name="departDate" id="departDate" v-model="searchInfo.departDate" disabled>
                            <label for="trainNo">車次號碼</label>
                            <input name="trainNo" id="trainNo" v-model="selectedTrain.DailyTrainInfo.TrainNo" disabled>
                            <select name="oneWayOrNot" v-model="searchInfo.oneWayOrNot" disabled>
                                <option value="false">單程</option>
                                <option value="true">去回程</option>
                            </select>
                            <br>
                            <div class="backtrip" v-if="searchInfo.oneWayOrNot === 'true'">
                                <label for="departDate">回程</label>
                                <input type="date" name="departDate" id="departDate" v-model="searchInfo.backDepartDate" disabled>
                                <label for="backTrainNo">車次號碼</label>
                                <input name="backTrainNo" id="backTrainNo" v-model="selectedBackTrain.DailyTrainInfo.TrainNo" disabled>
                            </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">票數</th>
                    <td colspan="2">
                        <label for="adult">全票</label>
                        <select name="adult" id="adult" v-model="ticketCount.adult">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="kid">孩童票(6-11歲)</label>
                        <select name="kid" id="kid" v-model="ticketCount.kid">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="love">愛心票</label>
                        <select name="love" id="love" v-model="ticketCount.love">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="adult">敬老票(65歲以上)</label>
                        <select name="older" id="older" v-model="ticketCount.older">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="student">大學生優惠票</label>
                        <select name="student" id="student" v-model="ticketCount.student">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>總價</th>
                    <td>${{totalPrice}}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="seatTable" v-if="totalSeat > 0 && carType != '' ">
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
						<div class="carDirect" v-if="searchInfo.oneWayOrNot === 'true' ">
								<div v-show="goingSeatTable" ><h3>去程座位</h3></div>
								<div v-show="backSeatTable" ><h3>回程座位</h3></div>
						</div>
            <div class="selectedSeats">
                您選擇 
                <div class="selectedSeat" v-for="selectedSeat in selectedSeats" :key="selectedSeat.index">
                    {{selectedSeat}}
                </div>
                號座位
                <div class="switch" v-if="searchInfo.oneWayOrNot === 'true' ">
                    <div class="going btn btn-warning btn-sm" v-show="goingSeatTable" @click="switchBack">選擇回程座位</div>
                    <div class="back btn btn-warning btn-sm" v-show="backSeatTable" @click="switchGoing">選擇去程座位</div>
                </div>
            </div>
        </div>
        <div class="bookingButton row justify-content-center">
            <div class="btn btn-outline-success" @click="checkIdExist">
                訂票
            </div>
        </div>
        <div class="button row justify-content-center">
            <div class="col-3 search">
                <NuxtLink to="/">
                    <div class="btn btn-outline-secondary">
                        查詢其他時段
                    </div>
                </NuxtLink>
            </div>
            <div class="col-3 info">
                <NuxtLink to="/trainInfo">
                    <div class="btn btn-outline-secondary">
                        選擇其他列車
                    </div>
                </NuxtLink>
            </div>
            <div class="col-3 info">
                <NuxtLink to="/bookingInfo">
                    <div class="btn btn btn-primary">
                        訂票查詢
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';
import { getDatabase, ref, set , get , child } from "firebase/database";

export default {
  data() {
    return{
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
			return new Promise( ( resolve , reject ) => {
				const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
				const goingDate = this.searchInfo.departDate;
				const goingTrainNo = this.selectedTrain.DailyTrainInfo.TrainNo;
				get( child( dbRef, `bookedSeats/${goingDate}` + `/${goingTrainNo}` ) ).then( ( snapshot ) => {
					if ( snapshot.exists() ) {
							let response = snapshot.val();
							this.inputSeatData = response.seatsData;
							this.initSeatTable();
							resolve();
					}
				}).catch( (error) => {
					console.log(error);
					reject();
				});

				if ( this.selectedBackTrain.DailyTrainInfo ) {
					const backDate = this.searchInfo.backDepartDate;
					const backTrainNo = this.selectedBackTrain.DailyTrainInfo.TrainNo;
					get( child( dbRef, `bookedSeats/${backDate}` + `/${backTrainNo}` ) ).then( ( snapshot ) => {
						if ( snapshot.exists() ) {
							let response = snapshot.val();
							this.inputBackSeatData = response.seatsData;
							resolve();
						}
					}).catch( (error) => {
						console.log(error);
						reject();
					});
				}
			})
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
		checkIdExist() {
			return new Promise( ( resolve , reject ) => {
				const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
				const userId = this.userId;
				get( child( dbRef, `users/${userId}` ) ).then( ( snapshot ) => {
					if ( snapshot.exists() ) {
						alert("此ID已完成訂票，請至訂票查詢確認");
						this.userId = "";
						resolve();
					} else {
						this.goBook();
						resolve();
					}
				}).catch( (error) => {
					console.error(error);
					reject();
				});
			})
		},
    goBook() {
			if ( this.goingSeatTable == false ) {
				this.backSeats = this.selectedSeats;
			} else {
				this.goingSeats = this.selectedSeats;
			}
			if ( this.userId && this.searchInfo.departure && this.searchInfo.arrival && this.searchInfo.departDate && this.carType && this.selectedTrain.DailyTrainInfo.TrainNo ) {
				if ( this.searchInfo.oneWayOrNot === "false" ) {
					if ( this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0 ) {
						if ( this.goingSeats.length === this.totalSeat ) {
								return new Promise(( resolve , reject ) => {
									const db = getDatabase( GetfirebaseConfig() );
									set(ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingTo" ), {
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
									}).then( () => {
										alert("訂票成功");
										resolve();
										window.location.reload();
									})
									.catch( () => {
										alert("訂票失敗，請重新操作")
										reject();
									})
								})
							} else {
								alert("請選擇座位")
							}
						} else {
							alert("請選擇票數")
						}
				} else if ( this.searchInfo.oneWayOrNot === "true" ) {
					if ( this.searchInfo.backDepartDate && this.selectedBackTrain.DailyTrainInfo.TrainNo ) {
						if ( this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0 ) {
							if ( this.goingSeats.length === this.totalSeat && this.backSeats.length === this.totalSeat ) {
								return new Promise(( resolve , reject ) => {
									const db = getDatabase( GetfirebaseConfig() );
									set(ref( db, 'users/' + this.userId + `/${this.phoneNum}` + "/goingTo" ), {
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
										seatsData,
									})
									set(ref( db, 'users/' + this.userId + `/${this.phoneNum}` +"/goingBack" ), {
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
									}).then( () => {
										alert("訂票成功");
										resolve();
										window.location.reload();
									})
									.catch( () => {
										alert("訂票失敗，請重新操作")
										reject();
									})
								})
							} else {
								alert("請選擇座位");
							}
						} else {
							alert("請選擇票數");
						}
					} else {
						alert("請輸入回程列車資訊");
					}
				}
			} else {
				alert("請輸入完整列車資訊");
			}
    }
  },
}
</script>

<style>
	.noInfo{
			text-align: center;
	}
	.bookingPanel{
			width: 65%;
			margin: 50px auto;
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