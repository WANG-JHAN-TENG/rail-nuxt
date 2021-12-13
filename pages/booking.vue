<template>
    <div class="container bookingPanel">
        <div class="noInfo" v-if="selectedTrain == '' ">
            <h1>請選擇車次</h1>
        </div>
        <div class="bookingForm" v-if="selectedTrain != ''">
            <table class="table">
            <tbody>
                <tr>
                    <th scope="row">訂票人ID</th>
                    <td>
                        <input name="userId" id="userId" v-model="userId">
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
        <div class="seatTable" v-if="totalSeat > 0">
            <div class="seatTitle">
                <h2>請選擇座位</h2>
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
            <div class="btn btn-outline-success" @click="goBook">
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
import { getDatabase, ref, set } from "firebase/database";

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
        inputData: [],
        seats: [
          [
            { No: "A01" , booked: "0" } , { No: "A02" , booked: "0" } , { No: "A03" , booked: "0" } , { No: "A04" , booked: "0" } , { No: "A05" , booked: "0" } ,
            { No: "A06" , booked: "0" } , { No: "A07" , booked: "0" } , { No: "A08" , booked: "0" } , { No: "A09" , booked: "0" } , { No: "A10" , booked: "0" } ,
            { No: "A11" , booked: "0" } , { No: "A12" , booked: "0" } , { No: "A13" , booked: "0" } , { No: "A15" , booked: "0" } , { No: "A15" , booked: "0" } ,
            { No: "A16" , booked: "0" } , { No: "A17" , booked: "0" } , { No: "A18" , booked: "0" } , { No: "A19" , booked: "0" } , { No: "A20" , booked: "0" } , 
          ],
          [
            { No: "B01" , booked: "0" } , { No: "B02" , booked: "0" } , { No: "B03" , booked: "0" } , { No: "B04" , booked: "0" } , { No: "B05" , booked: "0" } ,
            { No: "B06" , booked: "0" } , { No: "B07" , booked: "0" } , { No: "B08" , booked: "0" } , { No: "B09" , booked: "0" } , { No: "B10" , booked: "0" } ,
            { No: "B11" , booked: "0" } , { No: "B12" , booked: "0" } , { No: "B13" , booked: "0" } , { No: "B15" , booked: "0" } , { No: "B15" , booked: "0" } ,
            { No: "B16" , booked: "0" } , { No: "B17" , booked: "0" } , { No: "B18" , booked: "0" } , { No: "B19" , booked: "0" } , { No: "B20" , booked: "0" } , 
          ],
          [
            { No: "C01" , booked: "0" } , { No: "C02" , booked: "0" } , { No: "C03" , booked: "0" } , { No: "C04" , booked: "0" } , { No: "C05" , booked: "0" } ,
            { No: "C06" , booked: "0" } , { No: "C07" , booked: "0" } , { No: "C08" , booked: "0" } , { No: "C09" , booked: "0" } , { No: "C10" , booked: "0" } ,
            { No: "C11" , booked: "0" } , { No: "C12" , booked: "0" } , { No: "C13" , booked: "0" } , { No: "C15" , booked: "0" } , { No: "C15" , booked: "0" } ,
            { No: "C16" , booked: "0" } , { No: "C17" , booked: "0" } , { No: "C18" , booked: "0" } , { No: "C19" , booked: "0" } , { No: "C20" , booked: "0" } , 
          ],
          [
            { No: "D01" , booked: "0" } , { No: "D02" , booked: "0" } , { No: "D03" , booked: "0" } , { No: "D04" , booked: "0" } , { No: "D05" , booked: "0" } ,
            { No: "D06" , booked: "0" } , { No: "D07" , booked: "0" } , { No: "D08" , booked: "0" } , { No: "D09" , booked: "0" } , { No: "D10" , booked: "0" } ,
            { No: "D11" , booked: "0" } , { No: "D12" , booked: "0" } , { No: "D13" , booked: "0" } , { No: "D15" , booked: "0" } , { No: "D15" , booked: "0" } ,
            { No: "D16" , booked: "0" } , { No: "D17" , booked: "0" } , { No: "D18" , booked: "0" } , { No: "D19" , booked: "0" } , { No: "D20" , booked: "0" } , 
          ],
          [
            { No: "E01" , booked: "0" } , { No: "E02" , booked: "0" } , { No: "E03" , booked: "0" } , { No: "E04" , booked: "0" } , { No: "E05" , booked: "0" } ,
            { No: "E06" , booked: "0" } , { No: "E07" , booked: "0" } , { No: "E08" , booked: "0" } , { No: "E09" , booked: "0" } , { No: "E10" , booked: "0" } ,
            { No: "E11" , booked: "0" } , { No: "E12" , booked: "0" } , { No: "E13" , booked: "0" } , { No: "E15" , booked: "0" } , { No: "E15" , booked: "0" } ,
            { No: "E16" , booked: "0" } , { No: "E17" , booked: "0" } , { No: "E18" , booked: "0" } , { No: "E19" , booked: "0" } , { No: "E20" , booked: "0" } , 
          ],
          [
            { No: "F01" , booked: "0" } , { No: "F02" , booked: "0" } , { No: "F03" , booked: "0" } , { No: "F04" , booked: "0" } , { No: "F05" , booked: "0" } ,
            { No: "F06" , booked: "0" } , { No: "F07" , booked: "0" } , { No: "F08" , booked: "0" } , { No: "F09" , booked: "0" } , { No: "F10" , booked: "0" } ,
            { No: "F11" , booked: "0" } , { No: "F12" , booked: "0" } , { No: "F13" , booked: "0" } , { No: "F15" , booked: "0" } , { No: "F15" , booked: "0" } ,
            { No: "F16" , booked: "0" } , { No: "F17" , booked: "0" } , { No: "F18" , booked: "0" } , { No: "F19" , booked: "0" } , { No: "F20" , booked: "0" } , 
          ],
          [
            { No: "G01" , booked: "0" } , { No: "G02" , booked: "0" } , { No: "G03" , booked: "0" } , { No: "G04" , booked: "0" } , { No: "G05" , booked: "0" } ,
            { No: "G06" , booked: "0" } , { No: "G07" , booked: "0" } , { No: "G08" , booked: "0" } , { No: "G09" , booked: "0" } , { No: "G10" , booked: "0" } ,
            { No: "G11" , booked: "0" } , { No: "G12" , booked: "0" } , { No: "G13" , booked: "0" } , { No: "G15" , booked: "0" } , { No: "G15" , booked: "0" } ,
            { No: "G16" , booked: "0" } , { No: "G17" , booked: "0" } , { No: "G18" , booked: "0" } , { No: "G19" , booked: "0" } , { No: "G20" , booked: "0" } , 
          ],
          [
            { No: "H01" , booked: "0" } , { No: "H02" , booked: "0" } , { No: "H03" , booked: "0" } , { No: "H04" , booked: "0" } , { No: "H05" , booked: "0" } ,
            { No: "H06" , booked: "0" } , { No: "H07" , booked: "0" } , { No: "H08" , booked: "0" } , { No: "H09" , booked: "0" } , { No: "H10" , booked: "0" } ,
            { No: "H11" , booked: "0" } , { No: "H12" , booked: "0" } , { No: "H13" , booked: "0" } , { No: "H15" , booked: "0" } , { No: "H15" , booked: "0" } ,
            { No: "H16" , booked: "0" } , { No: "H17" , booked: "0" } , { No: "H18" , booked: "0" } , { No: "H19" , booked: "0" } , { No: "H20" , booked: "0" } , 
          ],
          [
            { No: "I01" , booked: "0" } , { No: "I02" , booked: "0" } , { No: "I03" , booked: "0" } , { No: "I04" , booked: "0" } , { No: "I05" , booked: "0" } ,
            { No: "I06" , booked: "0" } , { No: "I07" , booked: "0" } , { No: "I08" , booked: "0" } , { No: "I09" , booked: "0" } , { No: "I10" , booked: "0" } ,
            { No: "I11" , booked: "0" } , { No: "I12" , booked: "0" } , { No: "I13" , booked: "0" } , { No: "I15" , booked: "0" } , { No: "I15" , booked: "0" } ,
            { No: "I16" , booked: "0" } , { No: "I17" , booked: "0" } , { No: "I18" , booked: "0" } , { No: "I19" , booked: "0" } , { No: "I20" , booked: "0" } , 
          ],
          [
            { No: "J01" , booked: "0" } , { No: "J02" , booked: "0" } , { No: "J03" , booked: "0" } , { No: "J04" , booked: "0" } , { No: "J05" , booked: "0" } ,
            { No: "J06" , booked: "0" } , { No: "J07" , booked: "0" } , { No: "J08" , booked: "0" } , { No: "J09" , booked: "0" } , { No: "J10" , booked: "0" } ,
            { No: "J11" , booked: "0" } , { No: "J12" , booked: "0" } , { No: "J13" , booked: "0" } , { No: "J15" , booked: "0" } , { No: "J15" , booked: "0" } ,
            { No: "J16" , booked: "0" } , { No: "J17" , booked: "0" } , { No: "J18" , booked: "0" } , { No: "J19" , booked: "0" } , { No: "J20" , booked: "0" } , 
          ],
        ],
        carNos: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        selectedCar: "0",
        showSelectedCar: "A",
        goingSeatTable: true,
        backSeatTable: false,
        selectedSeats: [],
        goingSeats: [],
        backSeats: [],
    };
  },
  computed: {

  },
  created() {
    this.refreshTable();
    this.searchInfo.departure.name = this.$store.state.departureName;
    this.searchInfo.departure.value = this.$store.state.departureValue;
    this.searchInfo.arrival.name = this.$store.state.arrivalName;
    this.searchInfo.arrival.value = this.$store.state.arrivalValue;
    this.searchInfo.oneWayOrNot = this.$store.state.oneWayOrNot;
    this.searchInfo.departDate = this.$store.state.departDate;
    this.searchInfo.backDepartDate = this.$store.state.backDepartDate;
    this.selectedTrain = this.$store.state.selectedTrain;
    this.selectedBackTrain = this.$store.state.selectedBackTrain;
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
    refreshTable() {
      if ( this.inputData.length > 0){
        const input = this.inputData;
        const seats = this.seats;
        for (let i = 0 ; i < input.length ; i++ ){
          for (let j = 0 ; j < seats.length ; j++ ){
            let seat = seats[j];
            for ( let k = 0 ; k < seat.length ; k++){
              if ( seat[k].No === input[i] ) {
                seat[k].booked = "1";
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
        if ( this.goingSeats.length < 1 ) {
            this.backSeats = this.selectedSeats;
            this.selectedSeats = [];
        } else {
            this.backSeats = this.selectedSeats;
            this.selectedSeats = this.goingSeats;
        }
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
                            set(ref( db, 'users/' + this.userId + "/goingTo" ), {
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
                                set(ref( db, 'users/' + this.userId + "/goingTo" ), {
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
                                set(ref( db, 'users/' + this.userId + "/goingBack" ), {
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
        transform: translateX(-33%);
        background: #8ecbcf;
        padding: 100% 120%; 
        color: #333; 
        cursor: pointer;
    }
    .oneTrain .button:hover {
        background: #8ecbcf7c; 
    }
    .oneTrain .round {
        border-radius: 5px; 
    }
    #selected{
        color: rgb(68, 105, 224);
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