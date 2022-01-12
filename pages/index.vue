<template>
		<v-app>
        <v-container class="main-content">
            <v-row justify="center" class="title">
                <h2 class="text-h5 text-sm-h4">{{ $t('index.title') }}</h2>
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
								<v-btn color="warning" @click="searchTrainInfo">{{ $t('index.search') }}</v-btn>
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
									nuxt :to="localePath('booking')"
									color="warning"
								>
										{{ $t('trainInfo.book') }}
								</v-btn>
						</v-row>
				</v-container>
        <v-container class="footer my-3">
            <v-row justify="space-around">
								<v-btn nuxt :to="localePath('bookingInfo')" color="primary" max-width="100">
									{{ $t('index.bookSearch') }}
								</v-btn>
								<v-btn @click="goManage" color="grey darken-4" dark>
									{{ $t('index.manage') }}
								</v-btn>
            </v-row>
        </v-container>
		</v-app>
</template>

<script>
import axios from 'axios';
import { GetAuthorizationHeader } from '~/assets/Authorization.js';
export default {
  data() {
    return {
			stops: [
				{ name: this.$t('data.station0'), value: '' },
				{ name: this.$t('data.station1'), value: '0990' },
				{ name: this.$t('data.station2'), value: '1000' },
				{ name: this.$t('data.station3'), value: '1010' },
				{ name: this.$t('data.station4'), value: '1020' },
				{ name: this.$t('data.station5'), value: '1030' },
				{ name: this.$t('data.station6'), value: '1035' },
				{ name: this.$t('data.station7'), value: '1040' },
				{ name: this.$t('data.station8'), value: '1043' },
				{ name: this.$t('data.station9'), value: '1047' },
				{ name: this.$t('data.station10'), value: '1050' },
				{ name: this.$t('data.station11'), value: '1060' },
				{ name: this.$t('data.station12'), value: '1070' }
			],
			ways: [
					{ name : this.$t('data.oneWay'), value: false },
					{ name : this.$t('data.roundTrip'), value: true },
			],
			searchInfo: {
				departure: { name: '' , value: '' },
				arrival: { name: '' , value: '' },
				oneWayOrNot: false,
				departDate: '',
				departTime: '',
				backDepartDate: '',
				backDepartTime: ''
			},
			headers: [
				{
					text: this.$t('trainInfo.trainNo'),
					align: 'center',
					sortable: false,
					value: 'trainNo',
				},
				{ text: this.$t('trainInfo.departTime'), align: 'center', value: 'departTime' },
				{ text: this.$t('trainInfo.arriveTime'), align: 'center', value: 'arriveTime' },
				{ text: this.$t('trainInfo.movingTime'), align: 'center', value: 'movingTime' },
			],
			selectedTrain: [],
			selectedBackTrain: [],
			ticketInfo: {},
			trainInfo: [],
			backTrainInfo: [],
			isBtnDisabled: true,
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
		this.searchInfo.departTime = this.$store.state.departTime;
		this.searchInfo.backDepartDate = this.$store.state.backDepartDate;
		this.searchInfo.backDepartTime = this.$store.state.backDepartTime;
		this.ticketInfo = this.$store.state.ticketInfo;
		this.trainInfo = this.$store.state.trainInfo;
		this.backTrainInfo = this.$store.state.backTrainInfo;
  },
	updated() {
	},
	watch: {
		selectedTrain: function( ){
			this.checkSelect();
			this.checkTrainStatus();
		},
		selectedBackTrain: function( ){
			this.checkSelect();
			this.checkTrainStatus();
		},
	},
  methods:{
		searchTrainInfo() {
			if ( this.searchInfo.oneWayOrNot ) {
				this.searching();
				this.$store.commit( 'insertData' , this.searchInfo );
			} else {
				this.oneWaySearching();
				this.$store.commit( 'insertData' , this.searchInfo );
			}
		},
		async sendMes ( ) {
			const startStation = this.searchInfo.departure.value;
			const endStation = this.searchInfo.arrival.value;
			const date = this.searchInfo.departDate;
			let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
			await axios.get(
				url,
				{ headers: GetAuthorizationHeader () }
				)
				.then( ( response ) => {
					const departTime = this.searchInfo.departTime;
					this.trainInfo = this.timeFilter( this.infoFilter( this.rebuildTrainInfo( response ) , departTime) );
					this.$store.commit( 'insertTrainInfo' , this.trainInfo );
					this.$store.commit( 'insertTicketInfo' , this.ticketInfo );
			})
		},
		rebuildTrainInfo( response ) {
			let info = response.data;
			let oneTrain = {};
			for ( let i = 0 ; i < info.length ; i++ ) {
				oneTrain.trainNo =  info[i].DailyTrainInfo.TrainNo;
				oneTrain.departStation = this.searchInfo.departure.name;
				oneTrain.departTime = info[i].OriginStopTime.DepartureTime;
				oneTrain.arriveStation = this.searchInfo.arrival.name;
				oneTrain.arriveTime = info[i].DestinationStopTime.ArrivalTime;
				oneTrain.date = info[i].TrainDate;
				info[i] = Object.assign( {} , oneTrain )
			}
			return info;
		},
		infoFilter ( trainInfo , departTime ) {
			let selectedTime = departTime.split(':');
			const info = trainInfo;
			let result = [];
			let item = {};
			let time = '';
			let startTime = [];
			for ( let i = 0 ; i < info.length ; i++ ) {
				item = info[i];
				time = item.departTime;
				startTime = time.split(':');
				if ( Number( startTime[0] ) >= Number( selectedTime[0] ) ) {
						result.push(item);
				}
			}
			if ( result.length > 5 ) {
				result.length = 5;
			}
			return result;
		},
		timeFilter ( trainInfo ) {
			const info = trainInfo;
			let item = {};
			let date = [];
			let departTime = [];
			let arrivalTime = [];
			let time1 = null;
			let time2 = null;
			let time = null;
			let countHr = null;
			let hr = '';
			let min = '';
			let countMin = null;
			let timming = '';
			let add = {};
			for ( let i = 0 ; i < info.length ; i++ ) {
				item = info[i];
				date = item.date.split( '-' );
				departTime = item.departTime.split( ':' );
				arrivalTime = item.arriveTime.split( ':' );
				time1 = new Date(date[0], date[1], date[2], departTime[0], departTime[1], 0);
				time2 = new Date(date[0], date[1], date[2], arrivalTime[0], arrivalTime[1], 0);
				time = time2 - time1;
				countHr = time * 0.000000278;
				if ( countHr >= 1 ) {
					hr = Math.floor(countHr);
					countMin = (countHr - hr) * 60
					if ( countMin >= 1 ) {
						if ( Math.round(countMin) < 10 ){
							min = `0${Math.round(countMin)}`;
						} else {
							min = Math.round(countMin);
						}
					} else {
						min = '00';
					}
				} else {
					hr = '0';
					countMin = countHr * 60;
					if ( Math.round(countMin) < 10 ){
						min = `0${Math.round(countMin)}`;
					} else {
						min = Math.round(countMin);
					}
					
				}
				timming = `${hr}:${min}`;
				add = { movingTime : timming };
				info[i] = Object.assign( {} , item , add );
			}
			return info;
		},
		async getSeatMes ( ) {
			const startStation = this.searchInfo.departure.value;
			const endStation = this.searchInfo.arrival.value;
			const date = this.searchInfo.departDate;
			let trainNo = '';
			let url = '';
			for (let i = 0 ; i < this.trainInfo.length ; i++ ) {
				trainNo = this.trainInfo[i].trainNo;
				url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/AvailableSeatStatus/Train/OD/${startStation}/to/${endStation}/TrainDate/${date}/TrainNo/${trainNo}?$top=30&$format=JSON`;
				await axios.get(
					url,
					{ headers: GetAuthorizationHeader () }
				)
				.then((response) =>{
					const info = this.trainInfo;
					this.dealSeatMes( response , info );
				})
				.catch( (error) => {
					console.log(error);
				})
			}
		},
		dealSeatMes ( response , info ) {
			const standardSeat = response.data.AvailableSeats[0].StandardSeatStatus;
			const businessSeat = response.data.AvailableSeats[0].BusinessSeatStatus;
			let obj = {};
			let add = {};
			let add2 = {};
			let add3 = {};
			for ( let i = 0 ; i < info.length ; i++ ) {
				if ( info[i].trainNo === response.data.AvailableSeats[0].TrainNo ) {
					obj = info[i];
					add = { BusinessSeatStatus : businessSeat };
					add2 = { StandardSeatStatus : standardSeat };
					if ( standardSeat === 'X' || businessSeat === 'X' ) {
						add3 = { SeatStatus : false };
					} else {
						add3 = { SeatStatus : true };
					}	
					info[i] = Object.assign( {} , obj , add ,add2 , add3 )
				}
			}
		},
		async getTicketInfo ( ) {
			const startStation = this.searchInfo.departure.value;
			const endStation = this.searchInfo.arrival.value;
			let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
			await axios.get(
				url,
				{ headers: GetAuthorizationHeader() }
			)
			.then( ( response ) =>{
				this.dealTicketInfo( response );
			})         
		},
		dealTicketInfo ( response ) {
			let infos = [];
			let info = {};
			for ( let i = 0 ; i < response.data[0].Fares.length ; i++ ) {
				info = response.data[0].Fares[i].Price;
				infos.push(info);
			}

			infos.sort( function( a, b) {
				return a - b;
			});
			this.ticketInfo.freeKid = infos[0];
			this.ticketInfo.standardKid = infos[1];
			this.ticketInfo.standardGroup = infos[2];
			this.ticketInfo.freeAdult = infos[3];
			this.ticketInfo.standardAdult = infos[4];
			this.ticketInfo.bussinessKid = infos[5];
			this.ticketInfo.bussinessGroup = infos[6];
			this.ticketInfo.bussinessAdult = infos[7];
		},
		async sendBackMes ( ) {
			const startStation = this.searchInfo.arrival.value;
			const endStation = this.searchInfo.departure.value;
			const date = this.searchInfo.backDepartDate;
			let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/DailyTimetable/OD/${startStation}/to/${endStation}/${date}?$format=JSON`;
			await axios.get(
				url,
				{ headers: GetAuthorizationHeader () }
				)
				.then( ( response ) => {
					const departTime = this.searchInfo.backDepartTime;
					this.backTrainInfo = this.timeFilter( this.infoFilter( this.rebuildTrainInfo( response ) , departTime) );
					this.$store.commit( 'insertBackTrainInfo' , this.backTrainInfo );
			})
		},
		async getBackSeatMes ( ) {
			const startStation = this.searchInfo.arrival.value;
			const endStation = this.searchInfo.departure.value;
			const date = this.searchInfo.backDepartDate;
			let trainNo = '';
			let url = '';
			for ( let i = 0 ; i < this.backTrainInfo.length ; i++ ) {
				trainNo = this.backTrainInfo[i].trainNo;
				url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/AvailableSeatStatus/Train/OD/${startStation}/to/${endStation}/TrainDate/${date}/TrainNo/${trainNo}?$top=30&$format=JSON`;
				await axios.get(
					url,
					{ headers: GetAuthorizationHeader () }
				)
				.then( ( response ) =>{
					const info = this.backTrainInfo;
					this.dealSeatMes( response , info );
				})
				.catch( ( error ) =>{
					console.log( error );
				})
			}
		},
		async oneWaySearching ( ) {
			try {
				this.backTrainInfo = [];
				let sendMes = await this.sendMes();
				let getSeatMes = await this.getSeatMes();
				let getTicketInfo = await this.getTicketInfo();
				await Promise.all( [sendMes, getSeatMes, getTicketInfo] );
				this.$forceUpdate();
			}
			catch (err) {
				console.log( 'catch' , err );
			}
		},
		async searching ( ) {
			try {
				let sendMes = await this.sendMes();
				let getSeatMes = await this.getSeatMes();
				let getTicketInfo = await this.getTicketInfo();
				let sendBackMes = await this.sendBackMes();
				let getBackSeatMes = await this.getBackSeatMes();
				await Promise.all( [ sendMes ,getSeatMes ,sendBackMes, getTicketInfo, getBackSeatMes ] );
				this.$forceUpdate();
			}
			catch (err) {
				console.log( 'catch' , err );
			}
		},
		goManage() {
			let getIn = prompt( this.$t('data.password') , '' );
			if ( getIn === '0000' ){
					window.location.assign('/rail-nuxt/manage');
			} else {
					alert(this.$t('data.passwordErr'))
			}
		},
		chooseTrain() {
			this.$store.commit( 'chooseTrain', this.selectedTrain[0] );
		},
		chooseBackTrain() {
			this.$store.commit( 'chooseBackTrain', this.selectedBackTrain[0] );
		},
		checkSelect() {
			if ( this.backTrainInfo.length === 0 ) {
				if ( this.selectedTrain.length === 0 ) {
					this.isBtnDisabled = true;
				} else {
					this.isBtnDisabled = false;
				}
			} else {
				if ( this.selectedTrain.length === 0  || this.selectedBackTrain.length === 0 ) {
					this.isBtnDisabled = true;
				} else {
					this.isBtnDisabled = false;
				}
			}
		},
		checkTrainStatus() {
			if ( this.searchInfo.oneWayOrNot === false ) {
				if (this.selectedTrain.length > 0 ) {
					if ( this.selectedTrain[0].SeatStatus ) {
						this.chooseTrain();
					} else {
						alert(this.$t('data.full'));
						this.chooseTrain();
					}
				}
			} else {
				if (this.selectedTrain.length > 0 && this.selectedBackTrain.length > 0 ) {
					if ( this.selectedTrain[0].SeatStatus || this.selectedBackTrain[0].SeatStatus ) {
							this.chooseTrain();
							this.chooseBackTrain();
					} else {
						alert(this.$t('data.full'));
						this.chooseTrain();
						this.chooseBackTrain();
					}
				}
			}
		},
  },
}
</script>

<style scoped>
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
	.footer{
			max-width: 1200px;
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