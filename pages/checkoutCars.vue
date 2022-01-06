<template>
  <v-app>
    <v-container>
      <h1>{{ $t('checkoutCars.title') }}</h1>
    </v-container>
    <v-container>
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row align="center" justify="center">
          <v-col md="3" cols="6">
            <v-text-field
              type="date"
              v-model="dateSearch"
              label="日期"
              required
            ></v-text-field>
          </v-col>
          <v-col md="3" cols="6">
            <v-text-field
              type="number"
              v-model="trainNo"
              label="列車編號"
              required
              @keydown.enter.prevent="getSeatsInfo"
            ></v-text-field>
          </v-col>
          <v-col md="2" cols="12">
            <v-btn
              color="success"
              class="mr-4"
							@click="getSeatsInfo"
            >
              {{ $t('checkoutCars.search') }}
            </v-btn>
          </v-col>
          <v-col md="2" cols="6">
            	<v-btn nuxt :to="localePath('/manage')" class="mr-4">
								  {{ $t('checkoutCars.manage') }}
							</v-btn>
          </v-col>
          <v-col md="2" cols="6">
							<v-btn :to="localePath('/')" class="mr-4" color="primary">
								  {{ $t('checkoutCars.index') }}
							</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    <v-container @keyup.esc="closeTable">
      <v-row>
        <v-col>
          <div class="seatChoice">
            <v-layout
              justify-center
            >
              <h1>{{ $t('checkoutCars.table') }}</h1>
            </v-layout>
            <v-layout
              justify-center
            >
              <div class="ready">
                  {{ $t('checkoutCars.free') }} <div class="canBeChoose">可</div>
                  {{ $t('checkoutCars.select') }} <div class="cantBeChoose">否</div>
                  {{ $t('checkoutCars.token') }} <div class="BeChoosed">選</div>
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
                      <span class="round button booked">
                        {{seatNum.No}}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <v-row justify="center" class="carNo m-0 px-3">
                <v-col class="px-1" v-for="(carNo, index) in carNos" :key="carNo.index" @click="keyInCarNo(index)">
                  <v-card class="singleCar" hover>
                    {{carNo}}
                  </v-card>
                </v-col>
            </v-row>
            <v-container class="selectedCar">
              {{ $t('checkoutCars.carriageNo') }} : {{showSelectedCar}}
            </v-container>
          </div>
        </v-col>
        <v-col class="infoTable pa-0" v-if="showInfos.seatsNo" @mouseup="closeTable">
          <v-simple-table>
              <tbody>
                <tr>
                  <th></th>
                  <td class="text-right"><span @click="closeTable">X</span></td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.seatNo') }}</th>
                  <td>{{showInfos.seatsNo}}</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station1') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[0].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station2') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[1].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station3') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[2].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station4') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[3].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station5') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[4].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station6') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[5].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station7') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[6].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station8') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[7].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station9') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[8].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station10') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[9].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr class="light-blue lighten-4">
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station11') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[10].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
                </tr>
                <tr>
                  <th class="text-md-body-1" scope="row">{{ $t('checkoutCars.station12') }}</th>
                  <td class="text-md-button" v-if="showInfos.tookOrNot[11].took === false">{{ $t('checkoutCars.free') }}</td>
                  <td class="text-md-button booked" v-else>{{ $t('checkoutCars.token') }}</td>
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
    closeTable() {
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
    },
	},
}
</script>

<style scoped>
	.canBeChoose{
		display: inline-block;
		background: #8ecbcf;
		color: #8ecbcf;
	}
	.cantBeChoose{
		display: inline-block;
		background: #5e7380;
		color: #5e7380;
	}
	.BeChoosed{
		display: inline-block;
		background: #d86c6c;
		color: #d86c6c;
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
    width: 100%;
  }
	.singleCar{
		width: 50%;
	}
  .singleCar:hover{
    color: rgb(224, 228, 235);
    background: rgb(122, 173, 231);
  }
  .infoTable{
    position: absolute;
    top: 25%;
    right: 30%;
    width: 30%;
    z-index: 3;
    border: 2px solid black;
  }
  tr{
    padding: 0 !important;
  }
  td{
    position: relative;
    border: none !important;
    padding: 0 !important;
    text-align: center;
  }
  th{
    border: none !important;
    padding: 0 !important;
    text-align: center !important;
  }
  tr span{
    position: absolute;
    padding: 2%;
    top: 0;
    right: 0;
  }
  tr span:hover{
    background: rgb(255, 40, 76);
    color: white;
    cursor: pointer;
  }
  tr:hover {
    background-color: transparent !important;
  }
  .booked{
    color: tomato;
  }
	@media (max-width: 1000px) {
		.seatChoice{
			width: 95%;
		}
    .infoTable{
      width: 70%;
      right: 10%;
      top: 20%;
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
    .infoTable{
      width: 80%;
      right: 5%;
      top: 20%;
    }
	}
</style>