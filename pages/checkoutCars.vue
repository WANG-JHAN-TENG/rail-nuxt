<template>
  <v-app>
    <v-container>
      <h1>後台管理系統</h1>
    </v-container>
    <v-container>
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row align="center">
          <v-col>
            <v-text-field
              type="date"
              v-model="dateSearch"
              label="日期"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="trainNo"
              label="列車編號"
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-btn
              color="success"
              class="mr-4"
							@click="getSeatsInfo"
            >
              查詢
            </v-btn>
          </v-col>
          <v-col>
						<NuxtLink to="/manage">
            	<v-btn class="mr-4">
								訂位管理
							</v-btn>
						</NuxtLink>
          </v-col>
          <v-col>
						<NuxtLink to="/">
							<v-btn class="mr-4">
								查詢列車時刻
							</v-btn>
						</NuxtLink>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-container>
      <v-row>
        <v-col>
          <div class="seatChoice">
            <v-layout
              justify-center
            >
              <h1>剩餘座位數</h1>
            </v-layout>
            <v-layout
              justify-center
            >
              <div class="ready">
                未預定
                <span class="canBeChoose">可</span>
                已預定
                <span class="cantBeChoose">否</span>
              </div>
            </v-layout>
            <div class="oneTrain">
              <div class="seat" v-for="(seat, index) in seats" :key="seat.index">
                <div class="selectCar" v-if="selectedCar == index">
                  <div class="seatNum" v-for="seatNum in seat" :key="seatNum.index">
                    <label  v-if="seatNum.booked === '0' " @click="checkInfo(seatNum.No)"><input type="checkbox" name="label" :value="seatNum.No" disabled>
                      <span class="round button">
                        {{seatNum.No}}
                      </span>
                    </label>
                    <label v-else @click="checkInfo(seatNum.No)"><input type="checkbox" name="label" checked disabled>
                      <span class="round button">
                        {{seatNum.No}}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <v-row class="carNo">
                <v-col v-for="(carNo, index) in carNos" :key="carNo.index" @click="keyInCarNo(index)">
                  <v-card class="singleCar ma-1" hover>
                    {{carNo}}
                  </v-card>
                </v-col>
            </v-row>
            <v-container class="selectedCar">
              車廂 : {{showSelectedCar}}
            </v-container>
          </div>
        </v-col>
        <v-col class="col-2" v-if="showInfos.seatsNo">
          <v-simple-table>
              <tbody>
                <tr>
                  <th class="text-md-body-1" scope="row">座位</th>
                  <td>{{showInfos.seatsNo}}</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">南港</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[0].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">台北</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[1].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">板橋</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[2].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">桃園</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[3].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">新竹</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[4].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">苗栗</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[5].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">台中</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[6].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">彰化</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[7].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">雲林</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[8].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">嘉義</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[9].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">台南</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[10].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">左營</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[11].took === false">尚未被預訂</td>
                  <td class="text-md-button" v-else>已預訂</td>
                </tr>
              </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';
import { getDatabase, ref, child, get } from "firebase/database";

export default {
	data() {
		return {
			trainNo:"",
			dateSearch:"",
			seats: [
				[] , [] , [] , [] , [] , [] , [] , [] , [] , [] ,
			],
			carNos: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
			selectedCar: "0",
			showSelectedCar: "A",
			inputSeatData: [],
			leftSeats: 0,
			showInfos: {
				seatsNo : "",
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
			},
		};
	},
	created() {
		this.createSeats();
	},
	updated() {
		this.countLeftSeats();
		this.showSelectedCar = this.carNos[this.selectedCar];
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
		countLeftSeats() {
			if ( this.inputSeatData.length > 0 ) {
				let result = 80 - this.inputSeatData.length;
				this.leftSeats = result;
			} else {
				this.leftSeats = 80;
			}
		},
		getSeatsInfo() {
			this.inputSeatData = [];
			const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
			const date = this.dateSearch;
			const trainNo = this.trainNo;
			get( child( dbRef, `bookedSeats/${date}` + `/${trainNo}` ) ).then( ( snapshot ) => {
				if ( snapshot.exists() ) {
					let response = snapshot.val();
					this.inputSeatData = response.seatsData;
					this.createSeats();
					this.initSeatTable();
				} else {
					this.createSeats();
				}
			}).catch( (error) => {
				console.log(error);
			});
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
									if ( input.tookOrNot[l].took === true ) {
										seat[k].booked = "1";
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
		checkInfo(value) {
			this.showInfos = {
				seatsNo : "",
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
			};
			if ( this.inputSeatData.length > 0 ){
				for ( let i = 0 ; i < this.inputSeatData.length ; i++ ) {
					if( value === this.inputSeatData[i].seatsNo ) {
						this.showInfos = this.inputSeatData[i];
					} else {
						this.showInfos.seatsNo = value;
					}
				}
			} else {
				this.showInfos.seatsNo = value;
			}

		},
	},
}
</script>

<style scoped>
  .canBeChoose{
    background: #8ecbcf;
    color: #8ecbcf;
  }
  .cantBeChoose{
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
	.singleCar{
		width: 50%;
	}
  .singleCar:hover{
    color: rgb(224, 228, 235);
    background: rgb(122, 173, 231);
  }
</style>