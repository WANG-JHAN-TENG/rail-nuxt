<template>
    <v-app>
      <v-container class="checkout-cars">
          <v-container>
              <h1>{{ $t('checkoutCars.title') }}</h1>
          </v-container>
          <v-container>
              <v-form
                ref="form"
                lazy-validation
              >
                  <v-row align="center" justify="center">
                      <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            type="date"
                            v-model="dateSearch"
                            :label="$t('checkoutCars.date')"
                            class="data-input mx-auto"
                            required
                          ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="3">
                          <v-text-field
                            v-model="trainNo"
                            :label="$t('checkoutCars.trainNo')"
                            required
                            class="data-input mx-auto"
                            @keydown.enter.prevent="getSeatsInfo"
                          ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="2" class="text-center">
                          <div>
                              <v-btn
                                color="success"
                                @click="getSeatsInfo"
                              >
                                  {{ $t('checkoutCars.search') }}
                              </v-btn>
                          </div>
                      </v-col>
                      <v-col cols="6" md="2" class="text-center">
                          <div>
                              <v-btn
                                nuxt
                                :to="localePath('/manage')"
                              >
                                  {{ $t('checkoutCars.manage') }}
                              </v-btn>
                          </div>
                      </v-col>
                      <v-col cols="6" md="2" class="text-center">
                          <div>
                              <v-btn 
                                nuxt
                                :to="localePath('/')"
                                color="primary"
                              >
                                  {{ $t('checkoutCars.index') }}
                              </v-btn>
                          </div>
                      </v-col>
                  </v-row>
              </v-form>
          </v-container>
          <v-container @keyup.esc="closeTable">
              <v-row>
                  <v-col>
                      <div class="seat-choice">
                          <v-layout
                            justify-center
                          >
                            <h1>{{ $t('checkoutCars.table') }}</h1>
                          </v-layout>
                          <v-layout
                            justify-center
                          >
                              <div class="ready">
                                  {{ $t('checkoutCars.free') }} 
                                  <div class="can-be-choose">可</div>
                                  {{ $t('checkoutCars.select') }} 
                                  <div class="cant-be-choose">否</div>
                                  {{ $t('checkoutCars.token') }} 
                                  <div class="be-choosed">選</div>
                              </div>
                          </v-layout>
                          <div class="one-train">
                              <div
                                v-for="(seat, index) in seats"
                                :key="seat.index"
                                class="seat"
                              >
                                  <div
                                    v-if="selectedCar === index"
                                    class="select-car"
                                  >
                                      <div
                                        v-for="seatNum in seat"
                                        :key="seatNum.index"
                                        class="seat-num"
                                      >
                                          <label 
                                            v-if="seatNum.booked === '0' "
                                            @click="checkInfo(seatNum.No)"
                                          >
                                              <input
                                                type="checkbox"
                                                name="label"
                                                :value="seatNum.No"
                                                disabled
                                              >
                                                  <span class="round button">
                                                    {{seatNum.No}}
                                                  </span>
                                          </label>
                                          <label
                                            v-else
                                            @click="checkInfo(seatNum.No)"
                                          >
                                              <input
                                                type="checkbox"
                                                name="label"
                                                checked
                                                disabled
                                              >
                                                  <span class="round button booked">
                                                    {{seatNum.No}}
                                                  </span>
                                          </label>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <v-row justify="center" class="car-no ma-0 px-3">
                                <v-col
                                  v-for="(carNo, index) in carNos"
                                  :key="carNo.index"
                                  class="px-1"
                                  @click="keyInCarNo(index)"
                                >
                                    <v-card color="lime lighten-4" hover>
                                        {{carNo}}
                                    </v-card>
                                </v-col>
                          </v-row>
                          <v-container class="selectedCar">
                              {{ $t('checkoutCars.carriageNo') }} : {{showSelectedCar}}
                          </v-container>
                      </div>
                  </v-col>
                  <v-col
                    v-if="showInfos.seatsNo"
                    class="info-table pa-0"
                    @mouseup="closeTable"
                  >
                      <v-simple-table>
                          <tbody>
                              <tr class="no-hover">
                                  <th></th>
                                  <td class="text-right"></td>
                                  <td class="text-right">
                                      <span @click="closeTable">X</span>
                                  </td>
                              </tr>
                              <tr>
                                  <th class="text-md-body-1">
                                    {{ $t('checkoutCars.seatNo') }}
                                  </th>
                                  <td></td>
                                  <td>
                                    {{showInfos.seatsNo}}
                                  </td>
                              </tr>
                              <tr
                                v-for="tooks in showInfos.tookOrNot"
                                :key="tooks.index"
                              >
                                  <th class="text-md-body-1">
                                    {{ tooks.station }}
                                  </th>
                                  <td
                                    v-if="tooks.took"
                                    class="text-md-button booked"
                                  >
                                      {{ $t('checkoutCars.token') }}
                                  </td>
                                  <td
                                    v-else
                                    class="text-md-button"
                                  >
                                      {{ $t('checkoutCars.free') }}
                                  </td>
                                  <td class="text-md-button">
                                      {{ $t('checkoutCars.ID') }}:{{tooks.ID}}
                                      <br>
                                      {{ $t('checkoutCars.type') }}:{{tooks.type}}
                                  </td>
                              </tr>
                          </tbody>
                      </v-simple-table>
                  </v-col>
              </v-row>
          </v-container>
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
			selectedCar: 0,
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
      if( this.dateSearch === '' || this.trainNo === '' ) {
        alert('請輸入列車資料');
      } else {
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
            this.trainNo = '';
            alert('尚無該車資訊');
          }
        }).catch( (error) => {
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
					{ station: "0990" , took: false } ,
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
      this.rebuildInfo( this.showInfos );
			if ( this.inputSeatData.length > 0 ){
				for ( let i = 0 ; i < this.inputSeatData.length ; i++ ) {
					if( value === this.inputSeatData[i].seatsNo ) {
            this.rebuildInfo( this.inputSeatData[i] );
						this.showInfos = this.inputSeatData[i];
					} else {
						this.showInfos.seatsNo = value;
					}
				}
			} else {
				this.showInfos.seatsNo = value;
			}

		},
    rebuildInfo( info ) {
      for (let i = 0 ; i < info.tookOrNot.length ; i++ ) {
        if ( info.tookOrNot[i].station === '0990' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station1');
        } else if ( info.tookOrNot[i].station === '1000' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station2');
        } else if ( info.tookOrNot[i].station === '1010' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station3');
        } else if ( info.tookOrNot[i].station === '1020' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station4');
        } else if ( info.tookOrNot[i].station === '1030' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station5');
        } else if ( info.tookOrNot[i].station === '1035' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station6');
        } else if ( info.tookOrNot[i].station === '1040' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station7');
        } else if ( info.tookOrNot[i].station === '1043' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station8');
        } else if ( info.tookOrNot[i].station === '1047' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station9');
        } else if ( info.tookOrNot[i].station === '1050' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station10');
        } else if ( info.tookOrNot[i].station === '1060' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station11');
        } else if ( info.tookOrNot[i].station === '1070' ) {
          info.tookOrNot[i].station = this.$t('checkoutCars.station12');
        }
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
  .data-input{
    max-width: 200px;
  }
  .checkout-cars{
    max-width: 1200px;
  }
	.can-be-choose{
		display: inline-block;
		background: #8ecbcf;
		color: #8ecbcf;
	}
	.cant-be-choose{
		display: inline-block;
		background: #5e7380;
		color: #5e7380;
	}
	.be-choosed{
		display: inline-block;
		background: #d86c6c;
		color: #d86c6c;
	}
  .seat-choice{
    margin: 5% auto;
    padding: 3% auto;
    width: 70%;
    border: 2px solid #ccc;
    text-align: center;
  }
  .one-train{
    margin: 3% auto;
  }
  .select-car{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .seat-num{
    margin: 3% 2%;
    height: 6vh;
    width: 15%;
  }
  .select-car :nth-child(2){
    margin-right: 12%;
  }
  .select-car :nth-child(6){
    margin-right: 12%;
  }
  .select-car :nth-child(10){
    margin-right: 12%;
  }
  .select-car :nth-child(14){
    margin-right: 12%;
  }
  .select-car :nth-child(18){
    margin-right: 12%;
  }
  .one-train input[type="checkbox"] {
    display: none; 
  }
  .one-train input:checked + .button {
    background: #5e7380; 
    color: #fff;
  }
	.one-train input:checked + .booked {
		background: #d86c6c; 
		color: #fff;
	}
  .one-train .button {
    display: inline-block;
    background: #8ecbcf;
    height: 8vh;
    width: 8vh; 
    color: #333; 
    cursor: pointer;
    line-height: 8vh;
  }
  .one-train .button:hover {
    background: #8ecbcf7c; 
  }
  .one-train .round {
    border-radius: 5px; 
  }
  .car-no{
    width: 100%;
  }
  .info-table{
    position: absolute;
    top: 25%;
    right: 30%;
    width: 30%;
    z-index: 3;
    border: 2px solid black;
  }
  .no-hover{
    background-color: transparent !important;
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
  .booked{
    color: tomato;
  }
	@media (max-width: 1000px) {
		.seat-choice{
			width: 95%;
		}
    .info-table{
      width: 70%;
      right: 10%;
      top: 20%;
    }
	}
	@media (max-width: 705px) {
		.bookingPanel{
			width: 100%;
		}
		.one-train .button{
			width: 6vh;
			height: 6vh;
		}
    .info-table{
      width: 80%;
      right: 5%;
      top: 20%;
    }
	}
</style>