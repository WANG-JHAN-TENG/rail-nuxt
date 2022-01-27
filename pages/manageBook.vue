<template>
    <v-app>
        <v-container class="alert-area">
            <v-alert
              v-if="alert"
              class="mx-auto"
              color="orange lighten-1"
              max-width="400"
              elevation="4"
              type="info"
              transition="scale-transition"
            >
                <v-row
                  class="text-center"
                  justify="center"
                >
                    <v-col
                      cols="10"
                    >
                      {{alertMessage}}
                    </v-col>
                    <v-col>
                        <v-btn
                          color="amber darken-4"
                          @click="closeAlert"
                        >X</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </v-container>
        <v-container class="prompt-area">
            <v-alert
              v-if="prompt"
              class="mx-auto"
              color="white"
              max-width="400"
              elevation="4"
              transition="scale-transition"
            >
                <v-row
                  class="text-center"
                  justify="center"
                >
                    <v-col>
                        <v-text-field
                          v-model="promptInput"
                          :label="promptMes"
                          class="prompt-input mx-auto"
                          height="30"
                          outlined
                          autofocus
                          @keyup.enter="checkPrompt"
                          @keyup.esc="closePrompt"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                          color="black"
                          dark
                          @click="checkPrompt"
                        >OK</v-btn>
                        <v-btn
                          color="grey lighten-3"
                          light
                          @click="closePrompt"
                        >X</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </v-container>
        <v-container
          class="searching-panel"
        >
            <v-container>
                <v-row align="center">
                    <v-col cols="12" sm="6">
                        <h1>{{ $t('checkoutCars.title') }}</h1>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-row justify="space-around">
                           <div>
                                <v-btn
                                  nuxt
                                  :to="localePath('manage')"
                                  color="teal"
                                  outlined
                                  max-width="110"
                                >{{ $t('checkoutCars.manage') }}</v-btn>
                            </div>
                            <div>
                                <v-btn
                                  nuxt
                                  :to="localePath('checkoutCars')"
                                  color="secondary"
                                  outlined
                                  max-width="110"
                                >{{ $t('manage.leftSeats') }}</v-btn>
                            </div>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-container class="selection">
                <v-row justify="space-around" class="trip">
                    <v-col cols="6" sm="3">
                        <v-select
                          v-model="searchInfo.departure"
                          :label="$t('index.departure')"
                          :items="stops" item-text="name"
                          item-value="value"
                          class="station mx-auto"
                          return-object
                          background-color="white"
                        ></v-select>
                    </v-col>
                    <v-col cols="6" sm="3">
                        <v-select
                          v-model="searchInfo.arrival"
                          :label="$t('index.arrival')"
                          :items="stops"
                          item-text="name"
                          item-value="value"
                          class="station mx-auto"
                          return-object
                          background-color="white"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" sm="3">
                        <v-select
                          v-model="searchInfo.oneWayOrNot"
                          :items="ways"
                          item-text="name"
                          item-value="value"
                          class="station mx-auto"
                          background-color="white"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row justify="space-around" class="dateTime">
                    <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="searchInfo.departDate"
                          :label="$t('index.goDate')"
                          class="time-picker mx-auto"
                          type="date"
                          background-color="white"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="searchInfo.departTime"
                          :label="$t('index.goTime')"
                          class="time-picker mx-auto"
                          type="time"
                          background-color="white"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="space-around" class="backDateTime"
                v-if="searchInfo.oneWayOrNot === true ">
                    <v-col>
                        <v-text-field
                          v-model="searchInfo.backDepartDate"
                          :label="$t('index.backDate')"
                          class="time-picker mx-auto"
                          type="date"
                          background-color="white"
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                          v-model="searchInfo.backDepartTime"
                          :label="$t('index.backTime')"
                          class="time-picker mx-auto"
                          type="time"
                          background-color="white"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <v-btn color="warning" @click="checkStation">{{ $t('index.search') }}</v-btn>
                </v-row>
            </v-container>
            <v-container
              v-if="trainInfo.length > 0 && Object.keys(ticketInfo).length !== 0 "
              class="trainInfo">
                <div class="trainItem mt-5" v-if="trainInfo.length > 0 ">
                    <div>
                        <h2>{{ $t('trainInfo.title') }}</h2>
                    </div>
                    <h4>
                      {{searchInfo.departure.name}}
                      ~
                      {{searchInfo.arrival.name}}
                    </h4>
                    <v-data-table
                      v-model="selectedTrain"
                      :headers="headers"
                      :items="trainInfo"
                      :items-per-page="5"
                      item-key="trainNo"
                      single-select
                      show-select
                      class="elevation-1"
                      disable-sort
                      hide-default-footer
                    ></v-data-table>
                    <hr>
                </div>
                <div class="trainItem mt-5" v-if="backTrainInfo.length > 0 ">
                    <h4>
                      {{searchInfo.arrival.name}}
                      ~
                      {{searchInfo.departure.name}}
                    </h4>
                    <v-data-table
                      v-model="selectedBackTrain"
                      :headers="headers"
                      :items="backTrainInfo"
                      :items-per-page="5"
                      item-key="trainNo"
                      single-select
                      show-select
                      class="elevation-1"
                      disable-sort
                      hide-default-footer
                    ></v-data-table>
                    <hr>
                </div>
                <div class="ticketPrice my-3">
                    <TicketPrice :parentInfo="ticketInfo"></TicketPrice>
                </div>
                <v-row justify="center" class="booking ma-2">
                    <v-btn
                      :disabled="isBtnDisabled"
                      nuxt :to="localePath('manageBooking')"
                      color="warning"
                    >
                        {{ $t('trainInfo.book') }}
                    </v-btn>
                </v-row>
            </v-container>
        </v-container>
    </v-app>
</template>

<script>
// import axios from 'axios';
import {
  getDatabase, ref, get, child,
} from 'firebase/database';
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';
// import { GetAuthorizationHeader } from '~/assets/Authorization.js';

export default {
  data() {
    return {
      alert: false,
      alertMessage: '',
      prompt: false,
      promptMes: '',
      promptInput: '',
      promptValue: false,
      stops: [
        { name: this.$t( 'data.station0' ), value: '' },
        { name: this.$t( 'data.station1' ), value: '0990' },
        { name: this.$t( 'data.station2' ), value: '1000' },
        { name: this.$t( 'data.station3' ), value: '1010' },
        { name: this.$t( 'data.station4' ), value: '1020' },
        { name: this.$t( 'data.station5' ), value: '1030' },
        { name: this.$t( 'data.station6' ), value: '1035' },
        { name: this.$t( 'data.station7' ), value: '1040' },
        { name: this.$t( 'data.station8' ), value: '1043' },
        { name: this.$t( 'data.station9' ), value: '1047' },
        { name: this.$t( 'data.station10' ), value: '1050' },
        { name: this.$t( 'data.station11' ), value: '1060' },
        { name: this.$t( 'data.station12' ), value: '1070' },
      ],
      ways: [
        { name: this.$t( 'data.oneWay' ), value: false },
        { name: this.$t( 'data.roundTrip' ), value: true },
      ],
      searchInfo: {
        departure: { name: '', value: '' },
        arrival: { name: '', value: '' },
        oneWayOrNot: false,
        departDate: '',
        departTime: '',
        backDepartDate: '',
        backDepartTime: '',
      },
      headers: [
        {
          text: this.$t( 'trainInfo.trainNo' ),
          align: 'center',
          sortable: false,
          value: 'trainNo',
        },
        { text: this.$t( 'trainInfo.departTime' ), align: 'center', value: 'departTime' },
        { text: this.$t( 'trainInfo.arriveTime' ), align: 'center', value: 'arriveTime' },
        { text: this.$t( 'trainInfo.movingTime' ), align: 'center', value: 'movingTime' },
      ],
      selectedTrain: [],
      selectedBackTrain: [],
      ticketInfo: {},
      trainInfo: [],
      backup1: [],
      backTrainInfo: [],
      backup2: [],
      isBtnDisabled: true,
    };
  },
  beforeMount() {
    this.searchInfo.departure.name = this.$store.getters.departureName;
    this.searchInfo.departure.value = this.$store.getters.departureValue;
    this.searchInfo.arrival.name = this.$store.getters.arrivalName;
    this.searchInfo.arrival.value = this.$store.getters.arrivalValue;
    this.searchInfo.oneWayOrNot = this.$store.getters.oneWayOrNot;
    this.searchInfo.departDate = this.$store.getters.departDate;
    this.searchInfo.departTime = this.$store.getters.departTime;
    this.searchInfo.backDepartDate = this.$store.getters.backDepartDate;
    this.searchInfo.backDepartTime = this.$store.getters.backDepartTime;
    this.ticketInfo = this.$store.getters.ticketInfo;
    this.trainInfo = this.$store.getters.trainInfo;
    this.backTrainInfo = this.$store.getters.backTrainInfo;
  },
  watch: {
    selectedTrain( ) {
      this.checkSelect();
      // this.checkTrainStatus();
    },
    selectedBackTrain( ) {
      this.checkSelect();
      // this.checkTrainStatus();
    },
    backup1: {
      handler() {
        this.trainInfo = this.backup1;
      },
      deep: true,
    },
    backup2: {
      handler() {
        this.backTrainInfo = this.backup2;
      },
      deep: true,
    },
  },
  methods: {
    customAlert( mes ) {
      this.alert = true;
      this.alertMessage = mes;
    },
    closeAlert() {
      this.alert = false;
    },
    customPrompt( mes ) {
      this.prompt = true;
      this.promptMes = mes;
    },
    closePrompt() {
      this.promptInput = '';
      this.prompt = false;
    },
    checkPrompt() {
      if ( this.promptInput === '0000' ) {
        this.promptValue = true;
        this.promptInput = '';
        window.location.assign( '/rail-nuxt/manage' );
      } else if ( this.promptInput === '' ) {
        this.prompt = false;
        this.promptInput = '';
      } else {
        this.customAlert( this.$t( 'data.passwordErr' ) );
        this.prompt = false;
        this.promptInput = '';
      }
    },
    checkStation() {
      const departure = this.searchInfo.departure.value;
      const arrival = this.searchInfo.arrival.value;
      if ( departure !== '' && arrival !== '' && departure !== arrival ) {
        this.backup1 = [];
        this.backup2 = [];
        this.trainInfo = [];
        this.backTrainInfo = [];
        const selectedDay = this.searchInfo.departDate.split( '-' );
        const selectedTime = this.searchInfo.departTime.split( ':' );
        const selectedBackDay = this.searchInfo.backDepartDate.split( '-' );
        const selectedBackTime = this.searchInfo.backDepartTime.split( '-' );
        if ( this.searchInfo.oneWayOrNot ) {
          const condition1 = this.checkTime( selectedDay, selectedTime );
          const condition2 = this.checkTime( selectedBackDay, selectedBackTime );
          if ( condition1 && condition2 ) {
            this.searching();
            this.$store.commit( 'insertData', this.searchInfo );
          }
        } else {
          const condition3 = this.checkTime( selectedDay, selectedTime );
          if ( condition3 ) {
            this.oneWaySearching();
            this.$store.commit( 'insertData', this.searchInfo );
          }
        }
      } else {
        this.customAlert( this.$t( 'index.correctStation' ) );
      }
    },
    checkTime( selectedDay, selectedTime ) {
      const fullDate = new Date();
      const yyyy = fullDate.getFullYear();
      const MM = ( fullDate.getMonth() + 1 ) >= 10 ? ( fullDate.getMonth() + 1 ) : ( `0${fullDate.getMonth() + 1}` );
      const dd = fullDate.getDate() < 10 ? ( `0${fullDate.getDate()}` ) : fullDate.getDate();
      const hour = fullDate.getHours() < 10 ? ( `0${fullDate.getHours()}` ) : fullDate.getHours();
      let result = false;
      if ( parseInt( selectedDay[0], 10 ) === parseInt( yyyy, 10 )
      && parseInt( selectedDay[1], 10 ) === parseInt( MM, 10 ) ) {
        if ( parseInt( selectedDay[2], 10 ) < parseInt( dd, 10 ) ) {
          this.customAlert( this.$t( 'index.correctTime' ) );
        } else if ( parseInt( selectedDay[2], 10 ) === parseInt( dd, 10 )
        && parseInt( selectedTime[0], 10 ) < parseInt( hour, 10 ) ) {
          this.customAlert( this.$t( 'index.correctTime' ) );
        } else if ( parseInt( selectedDay[2], 10 ) > parseInt( dd, 10 )
        && parseInt( selectedDay[2], 10 ) - parseInt( dd, 10 ) > 25 ) {
          this.customAlert( this.$t( 'index.correctTime' ) );
        } else {
          result = true;
        }
      } else if ( parseInt( selectedDay[1], 10 ) > parseInt( MM, 10 ) ) {
        const factor1 = 30 - parseInt( dd, 10 );
        if ( factor1 + parseInt( selectedDay[2], 10 ) > 25 ) {
          this.customAlert( this.$t( 'index.correctTime' ) );
        } else {
          result = true;
        }
      } else {
        this.customAlert( this.$t( 'index.correctTime' ) );
      }
      return result;
    },
    // async sendMes( ) {
    //   const startStation = this.searchInfo.departure.value;
    //   const endStation = this.searchInfo.arrival.value;
    //   const date = this.searchInfo.departDate;
    //   const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
    //   await axios.get(
    //     url,
    //     { headers: GetAuthorizationHeader() },
    //   )
    //     .then( ( response ) => {
    //       const { departTime } = this.searchInfo;
    //       const infoFilter = this.infoFilter( this.rebuildTrainInfo( response ), departTime );
    //       this.backup1 = this.timeFilter( infoFilter );
    //     } );
    // },
    async sendMes( ) {
      const startStation = this.searchInfo.departure.value;
      const endStation = this.searchInfo.arrival.value;
      const date = this.searchInfo.departDate;
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      get( child( dbRef, `trainInfo/${date}/info/start${startStation}/end${endStation}` ) )
        .then( ( snapshot ) => {
          const { departTime } = this.searchInfo;
          const infoFilter = this.infoFilter( this.rebuildTrainInfo( snapshot.val() ), departTime );
          this.backup1 = this.timeFilter( infoFilter );
        } );
    },
    rebuildTrainInfo( response ) {
      const info = response;
      let oneTrain = {};
      const result = [];
      for ( let i = 0; i < info.length; i++ ) {
        oneTrain = {
          trainNo: info[i].DailyTrainInfo.TrainNo,
          departStation: this.searchInfo.departure.name,
          departTime: info[i].OriginStopTime.DepartureTime,
          arriveStation: this.searchInfo.arrival.name,
          arriveTime: info[i].DestinationStopTime.ArrivalTime,
          date: info[i].TrainDate,
        };
        result.push( oneTrain );
      }
      return result;
    },
    infoFilter( trainInfo, departTime ) {
      const selectedTime = departTime.split( ':' );
      const info = trainInfo;
      const result = [];
      let item = {};
      let time = '';
      let startTime = [];
      for ( let i = 0; i < info.length; i++ ) {
        item = info[i];
        time = item.departTime;
        startTime = time.split( ':' );
        if ( Number( startTime[0] ) >= Number( selectedTime[0] ) ) {
          result.push( item );
        }
      }
      if ( result.length > 5 ) {
        result.length = 5;
      }
      return result;
    },
    timeFilter( trainInfo ) {
      const info = trainInfo;
      let date = [];
      let departTime = [];
      let arrivalTime = [];
      let time1 = null;
      let time2 = null;
      let time = null;
      let hr = 0;
      let min = 0;
      let add = {};
      for ( let i = 0; i < info.length; i++ ) {
        date = info[i].date.split( '-' );
        departTime = info[i].departTime.split( ':' );
        arrivalTime = info[i].arriveTime.split( ':' );
        time1 = new Date( date[0], date[1], date[2], departTime[0], departTime[1], 0 );
        time2 = new Date( date[0], date[1], date[2], arrivalTime[0], arrivalTime[1], 0 );
        time = time2 - time1;
        hr = time / 1000 / 60 / 60;
        min = Math.round( time / 1000 / 60 );
        if ( min < 10 ) {
          min = `0${min}`;
        } else {
          toString( min );
        }
        if ( hr < 1 ) {
          hr = '0';
        } else {
          hr = toString( Math.floor( hr ) );
        }
        add = { movingTime: `${hr}:${min}` };
        info[i] = { ...trainInfo[i], ...add };
      }
      return info;
    },
    // async getTicketInfo( ) {
    //   const startStation = this.searchInfo.departure.value;
    //   const endStation = this.searchInfo.arrival.value;
    //   const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
    //   await axios.get(
    //     url,
    //     { headers: GetAuthorizationHeader() },
    //   )
    //     .then( ( response ) => {
    //       this.dealTicketInfo( response.data[0] );
    //     } );
    // },
    async getTicketInfo( ) {
      const startStation = this.searchInfo.departure.value;
      const endStation = this.searchInfo.arrival.value;
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      get( child( dbRef, `fares/fare/start${startStation}/end${endStation}` ) )
        .then( ( snapshot ) => {
          this.dealTicketInfo( snapshot.val() );
        } );
    },
    dealTicketInfo( response ) {
      const infos = [];
      let info = {};
      for ( let i = 0; i < response.Fares.length; i++ ) {
        info = response.Fares[i].Price;
        infos.push( info );
      }

      infos.sort( ( a, b ) => a - b );
      this.ticketInfo = {
        freeKid: infos[0],
        standardKid: infos[1],
        standardGroup: infos[2],
        freeAdult: infos[3],
        standardAdult: infos[4],
        bussinessKid: infos[5],
        bussinessGroup: infos[6],
        bussinessAdult: infos[7],
      };
      this.originFares = JSON.parse( JSON.stringify( this.ticketInfo ) );
    },
    // async sendBackMes( ) {
    //   const startStation = this.searchInfo.arrival.value;
    //   const endStation = this.searchInfo.departure.value;
    //   const date = this.searchInfo.backDepartDate;
    //   const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
    //   await axios.get(
    //     url,
    //     { headers: GetAuthorizationHeader() },
    //   )
    //     .then( ( response ) => {
    //       const { backDepartTime } = this.searchInfo;
    //      const infoFilter = this.infoFilter( this.rebuildTrainInfo( response ), backDepartTime );
    //       this.backup2 = this.timeFilter( infoFilter );
    //     } );
    // },
    async sendBackMes( ) {
      const startStation = this.searchInfo.arrival.value;
      const endStation = this.searchInfo.departure.value;
      const date = this.searchInfo.backDepartDate;
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      get( child( dbRef, `trainInfo/${date}/info/start${startStation}/end${endStation}` ) )
        .then( ( snapshot ) => {
          const res = snapshot.val();
          const { backDepartTime } = this.searchInfo;
          const infoFilter = this.infoFilter( this.rebuildTrainInfo( res ), backDepartTime );
          this.backup2 = this.timeFilter( infoFilter );
        } );
    },
    async oneWaySearching( ) {
      try {
        this.backTrainInfo = [];
        const sendMes = this.sendMes();
        const getTicketInfo = this.getTicketInfo();
        await Promise.all( [sendMes, getTicketInfo] );
      } catch ( err ) {
        console.error( 'catch', err );
      }
    },
    async searching( ) {
      try {
        const sendMes = this.sendMes();
        const getTicketInfo = this.getTicketInfo();
        const sendBackMes = this.sendBackMes();
        await Promise.all( [sendMes, sendBackMes, getTicketInfo] );
      } catch ( err ) {
        console.error( 'catch', err );
      }
    },
    goManage() {
      this.customPrompt( this.$t( 'data.password' ), '' );
    },
    chooseTrain() {
      this.$store.commit( 'chooseTrain', this.selectedTrain[0] );
      this.$store.commit( 'insertTrainInfo', this.trainInfo );
      this.$store.commit( 'insertTicketInfo', this.ticketInfo );
    },
    chooseBackTrain() {
      this.$store.commit( 'chooseBackTrain', this.selectedBackTrain[0] );
      this.$store.commit( 'insertBackTrainInfo', this.backTrainInfo );
    },
    checkSelect() {
      if ( this.backTrainInfo.length === 0 ) {
        if ( this.selectedTrain.length === 0 ) {
          this.isBtnDisabled = true;
        } else {
          this.isBtnDisabled = false;
          this.chooseTrain();
        }
      } else if ( this.selectedTrain.length === 0 || this.selectedBackTrain.length === 0 ) {
        this.isBtnDisabled = true;
      } else {
        this.isBtnDisabled = false;
        this.chooseTrain();
        this.chooseBackTrain();
      }
    },
    checkTrainStatus() {
      if ( this.searchInfo.oneWayOrNot === false ) {
        if ( this.selectedTrain.length > 0 ) {
          if ( this.selectedTrain[0].SeatStatus ) {
            this.chooseTrain();
          } else {
            this.customAlert( this.$t( 'data.full' ) );
            this.selectedTrain = [];
          }
        }
      } else if ( this.selectedTrain.length > 0 && this.selectedBackTrain.length > 0 ) {
        if ( this.selectedTrain[0].SeatStatus && this.selectedBackTrain[0].SeatStatus ) {
          this.chooseTrain();
          this.chooseBackTrain();
        } else if ( this.selectedTrain[0].SeatStatus === false ) {
          this.customAlert( this.$t( 'data.full' ) );
          this.selectedTrain = [];
        } else if ( this.selectedBackTrain[0].SeatStatus === false ) {
          this.customAlert( this.$t( 'data.full' ) );
          this.selectedBackTrain = [];
        }
      }
    },
  },
};
</script>

<style scoped>
  .alert-area{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    justify-items: center;
    z-index: 10;
  }
  .alert-area .v-btn:not(.v-btn--round).v-size--default{
    min-width: 20px;
  }
  .prompt-area{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    justify-items: center;
    z-index: 9;
  }
  .prompt-input{
    z-index: 10;
    max-width: 250px;
  }
	.main-content{
		position: relative;
		margin: 30px auto;
	}
	.station{
		max-width: 200px;
	}
	.title ::after{
		content: '';
		display: block;
		position: absolute;
		width: 90px;
		height: 3px;
		left: 50%;
		bottom: 0;
		background-color: #ca4f0f;
		margin-left: -45px;
	}
	.selection{
		background: rgb(235, 233, 233);
    max-width: 1200px;
	}
	.search{
		font-size: 1.rem;
	}
	.time-picker{
		max-width: 200px;
	}
	.ticket-table .table td{
		vertical-align: middle;
	}
	.ticket-table span{
		color: red;
		font-size: 1rem;
	}
	.num{
		width: 70px;
		justify-content: center;
	}
	@media (max-width:370px) {
			.selection{
					font-size: 14px;
			}
			.selecton input{
					width: 50px;
			}
			.btn{
					font-size: 14px;
			}
	}
</style>
