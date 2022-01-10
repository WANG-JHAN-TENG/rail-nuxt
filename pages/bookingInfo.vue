<template>
		<v-app>
				<v-container>
						<h2>{{ $t('bookingInfo.title') }}</h2>
						<v-row align="center" class="searchBar">
								<v-col cols="9" sm="5" md="3" class="IDsearch">
										<v-text-field
											v-model="userId"
											:label="$t('bookingInfo.userId')"
											@keyup.enter="findUser"
											background-color="white"
										></v-text-field>
								</v-col>
								<v-col cols="9" sm="5" md="3" class="IDsearch">
										<v-text-field
											v-model="phoneNum"
											:label="$t('bookingInfo.phone')"
											@keyup.enter="findUser"
											background-color="white"
										></v-text-field>
								</v-col>
								<v-col cols="8" sm="4" md="3" class="IDsearch d-flex">
										<v-btn
											class="mx-1"
											color="primary"
											outlined
											@click="findUser"
										>{{ $t('bookingInfo.search') }}</v-btn>
										<v-btn
											class="mx-1"
											color="primary"
											outlined
											@click="justFindUser"
										>{{ $t('bookingInfo.searchAll') }}</v-btn>
								</v-col>
								<v-col md="3" class="backButton">
										<v-btn
											nuxt :to="localePath('/')"
											color="secondary"
											outlined
										>{{ $t('bookingInfo.index') }}</v-btn>
								</v-col>
								<v-col class="ml-auto" cols="3">
										<v-btn
											v-show="readyToChange"
											color="primary"
											@click="updateData"
										>{{ $t('bookingInfo.update') }}</v-btn>
								</v-col>
						</v-row>
						<v-row class="user-container mt-5 mx-auto" v-if="userBookingDates">
								<v-col class="mb-0 pb-0" cols="12">
										<v-card
											class="text-center"
											elevation="2"
											@click="openLists"
										>{{ $t('bookingInfo.showList') }}</v-card>
								</v-col>
								<v-col
									v-for="(userBookingDate, key) in userBookingDates"
									:key="userBookingDate.index"
									v-show="openList"
									cols="12"
									class="users mt-0"
								>
										<v-row
											v-for=" (info , key1 ) in userBookingDate"
											:key="info.index"
											justify="center"
											@click="findBookingInfo(key , key1)"
										>
												<v-col class="time" cols="12" v-if="info.goingTo">
														<v-card outlined shaped hover color="teal lighten-4" elevation="2">
																<v-row class="ma-0">
																		<v-col class="py-0" cols="12" sm="3">
																				{{ $t('bookingInfo.trainInfo') }}
																		</v-col>
																		<v-col class="py-0" cols="12" sm="7">
																				<span>
																						{{info.goingTo.date}}
																						{{info.goingTo.departTime}}
																				</span>
																				<span>
																						{{info.goingTo.startStation.name}}
																						 ~ 
																						{{info.goingTo.endStation.name}}
																				</span>
																		</v-col>
																		<v-col class="py-0">
																				<span>
																						{{ $t('bookingInfo.price') }}
																						{{info.goingTo.price}}$
																				</span>
																		</v-col>
																</v-row>
														</v-card>
												</v-col>
												<v-col class="time" cols="12" v-if="info.goingBack">
														<v-card outlined shaped hover color="teal lighten-4" elevation="2">
																<v-row class="ma-0">
																		<v-col class="py-0" cols="12" sm="3">
																				{{ $t('bookingInfo.trainInfo') }}
																		</v-col>
																		<v-col class="py-0" cols="12" sm="7">
																				<span>
																						{{info.goingBack.date}}
																						{{info.goingBack.departTime}}
																				</span>
																				<span>
																						{{info.goingBack.startStation.name}}
																						~
																						{{info.goingBack.endStation.name}}
																				</span>
																		</v-col>
																		<v-col class="py-0">
																				<span>
																						{{ $t('bookingInfo.price') }}
																						{{info.goingBack.price}}$
																				</span>
																		</v-col>
																</v-row>
														</v-card>
												</v-col>
										</v-row>
								</v-col>
						</v-row>
						<v-container class="bookingInfo" v-if="bookingData.goingTo.trainNo">
								<v-row class="bookingTitle">
										<v-col class="pa-0" cols="11" sm="7" md="8">
												<h2>{{ $t('bookingInfo.goInfo') }}</h2>
										</v-col>
										<v-col class="pa-0" v-show="showInfo">
												<v-btn
													class="change"
													color="warning"
													outlined
													@click="changeTicket"
													:disabled="cantBeChange"
												>{{ $t('bookingInfo.change') }}</v-btn>
										</v-col>
										<v-col class="pa-0" v-show="updateInfo">
												<v-btn
													class="change"
													color="warning"
													outlined
													@click="cancelUpdateData"
													:disabled="cantBeChange"
												>{{ $t('bookingInfo.cancel') }}</v-btn>
										</v-col>
										<v-col class="pa-0">
												<v-btn
													class="change"
													color="error"
													@click="cancelGoingTo"
													:disabled="cantBeChange"
												>{{ $t('bookingInfo.quit') }}</v-btn>
										</v-col>
								</v-row>
								<v-simple-table class="table">
										<tbody>
												<tr>
														<th>{{ $t('bookingInfo.date') }}</th>
														<td>{{bookingData.goingTo.date}}</td>
												</tr>
												<tr>
														<th>{{ $t('bookingInfo.trainNo') }}</th>
														<td>{{bookingData.goingTo.trainNo}}</td>
												</tr>
												<tr>
														<th>{{ $t('bookingInfo.departure') }}</th>
														<td>{{bookingData.goingTo.startStation.name}}</td>
												</tr>
												<tr>
														<th>{{ $t('bookingInfo.arrival') }}</th>
														<td>{{bookingData.goingTo.endStation.name}}</td>
												</tr>
												<tr>
														<th>{{ $t('bookingInfo.drivingTime') }}</th>
														<td>
																{{bookingData.goingTo.departTime}}
																~
																{{bookingData.goingTo.arrivalTime}}
														</td>
												</tr>
												<tr>
														<th>{{ $t('bookingInfo.carType') }}</th>
														<td>
																<div v-if="bookingData.goingTo.carType === '0' " class="carType">
																		{{ $t('bookingInfo.standard') }}
																</div>
																<div v-else-if="bookingData.goingTo.carType === '1' " class="carType">
																		{{ $t('bookingInfo.business') }}
																</div>
														</td>
												</tr>
												<tr>
														<th>{{ $t('bookingInfo.ticket') }}</th>
														<td v-show="showInfo">
																<div 
																	v-if="bookingData.goingTo.ticketCount.adult != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.adultTick') }}
																		{{bookingData.goingTo.ticketCount.adult}}
																		{{ $t('bookingInfo.pic') }}
																</div>
																<div
																	v-if="bookingData.goingTo.ticketCount.kid != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.kidTick') }}
																		{{bookingData.goingTo.ticketCount.kid}}
																		{{ $t('bookingInfo.pic') }}
																</div>
																<div
																	v-if="bookingData.goingTo.ticketCount.love != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.loveTick') }}
																		{{bookingData.goingTo.ticketCount.love}}
																		{{ $t('bookingInfo.pic') }}
																</div>
																<div
																	v-if="bookingData.goingTo.ticketCount.older != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.olderTick') }}
																		{{bookingData.goingTo.ticketCount.older}}
																		{{ $t('bookingInfo.pic') }}
																</div>
																<div
																	v-if="bookingData.goingTo.ticketCount.student != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.studentTick') }}
																		{{bookingData.goingTo.ticketCount.student}}
																		{{ $t('bookingInfo.pic') }}
																</div>
														</td>
														<td v-show="updateInfo">
																<div v-if="bookingData.goingTo.ticketCount.adult != 0" class="seats-info">
																		<v-select
																			v-model="bookingData.goingTo.ticketCount.adult"
																			:items="ticketCountNums"
																			class="ticks"
																			:label="$t('bookingInfo.adultTick')" 
																			item-text="num"
																			item-value="value"
																		/>
																</div>
																<div v-if="bookingData.goingTo.ticketCount.kid != 0" class="seats-info">
																		<v-select
																		 v-model="bookingData.goingTo.ticketCount.kid"
																		 :items="ticketCountNums" 
																		 class="ticks" 
																		 :label="$t('bookingInfo.kidTickL')" 
																		 item-text="num" 
																		 item-value="value" 
																		 />
																</div>
																<div v-if="bookingData.goingTo.ticketCount.love != 0" class="seats-info">
																		<v-select
																		v-model="bookingData.goingTo.ticketCount.love"
																		:items="ticketCountNums" 
																		class="ticks" 
																		:label="$t('bookingInfo.loveTick')" 
																		item-text="num" 
																		item-value="value" 
																		/>
																</div>
																<div v-if="bookingData.goingTo.ticketCount.older != 0" class="seats-info">
																		<v-select
																		v-model="bookingData.goingTo.ticketCount.older"
																		:items="ticketCountNums" 
																		class="ticks" 
																		:label="$t('bookingInfo.olderTickL')" 
																		item-text="num" 
																		item-value="value" 
																		/>
																</div>
																<div v-if="bookingData.goingTo.ticketCount.student != 0" class="seats-info">
																		<v-select
																		v-model="bookingData.goingTo.ticketCount.student"
																		:items="ticketCountNums" 
																		class="ticks" 
																		:label="$t('bookingInfo.studentTick')" 
																		item-text="num" 
																		item-value="value" 
																		/>
																</div>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.seatInfo') }}</th>
														<td>
																{{ $t('bookingInfo.adult') }}
																<span v-for=" goAdult in showGoSeats.adult" :key="goAdult" class="mx-1">
																		{{goAdult}}
																</span>
																<br>
																{{ $t('bookingInfo.kid') }} 
																<span v-for=" goKid in showGoSeats.kid" :key="goKid" class="mx-1">
																		{{goKid}}
																</span>
																<br>
																{{ $t('bookingInfo.love') }}
																<span v-for=" goLove in showGoSeats.love" :key="goLove" class="mx-1">
																		{{goLove}}
																</span>
																<br>
																{{ $t('bookingInfo.older') }}
																<span v-for=" goOlder in showGoSeats.older" :key="goOlder" class="mx-1">
																		{{goOlder}}
																</span>
																<br>
																{{ $t('bookingInfo.student') }}
																<span v-for=" goStudent in showGoSeats.student" :key="goStudent" class="mx-1">
																		{{goStudent}}
																</span>
														</td>
												</tr>
												<tr v-if="! bookingData.goingBack.trainNo">
														<th scope="row">{{ $t('bookingInfo.total') }}</th>
														<td>$ {{totalPrice}}</td>
												</tr>
										</tbody>
								</v-simple-table>
						</v-container>
						<v-container class="bookingInfo" v-if="bookingData.goingBack.trainNo">
								<v-row class="bookingTitle row">
										<v-col cols="6" sm="9" md="10">
												<h2>{{ $t('bookingInfo.backInfo') }}</h2>
										</v-col>
										<v-col>
												<v-btn
													class="change"
													color="error"
													@click="cancelGoingBack"
													:disabled="cantBeChange"
												>{{ $t('bookingInfo.quit') }}</v-btn>
										</v-col>
								</v-row>
								<v-simple-table class="table">
										<tbody>
												<tr>
														<th scope="row">{{ $t('bookingInfo.date') }}</th>
														<td>{{bookingData.goingBack.date}}</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.trainNo') }}</th>
														<td>{{bookingData.goingBack.trainNo}}</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.departure') }}</th>
														<td>{{bookingData.goingBack.startStation.name}}</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.arrival') }}</th>
														<td>{{bookingData.goingBack.endStation.name}}</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.drivingTime') }}</th>
														<td>
																{{bookingData.goingBack.departTime}}~{{bookingData.goingBack.arrivalTime}}
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.carType') }}</th>
														<td>
																<div v-if="bookingData.goingBack.carType === '0' " class="carType">
																		{{ $t('bookingInfo.standard') }}
																</div>
																<div v-else-if="bookingData.goingBack.carType === '1' " class="carType">
																		{{ $t('bookingInfo.business') }}
																</div>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.ticket') }}</th>
														<td v-show="showInfo">
																<div
																	v-if="bookingData.goingBack.ticketCount.adult != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.adultTick') }}
																		{{bookingData.goingBack.ticketCount.adult}}
																		{{ $t('bookingInfo.pic') }}
																</div>
																<div
																	v-if="bookingData.goingBack.ticketCount.kid != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.kidTick') }}
																		{{bookingData.goingBack.ticketCount.kid}}
																		{{ $t('bookingInfo.pic') }}
																</div>
																<div
																	v-if="bookingData.goingBack.ticketCount.love != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.loveTick') }}
																		{{bookingData.goingBack.ticketCount.love}}
																		{{ $t('bookingInfo.pic') }}
																</div>
																<div
																	v-if="bookingData.goingBack.ticketCount.older != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.olderTick') }}
																		{{bookingData.goingBack.ticketCount.older}}
																		{{ $t('bookingInfo.pic') }}
																</div>
																<div
																	v-if="bookingData.goingBack.ticketCount.student != 0"
																	class="ticketCount"
																>
																		{{ $t('bookingInfo.studentTick') }}
																		{{bookingData.goingBack.ticketCount.student}}
																		{{ $t('bookingInfo.pic') }}
																</div>
														</td>
														<td v-show="updateInfo">
																<div v-if="bookingData.goingBack.ticketCount.adult != 0" class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.adult"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('bookingInfo.adultTick')"
																		></v-select>
																</div>
																<div v-if="bookingData.goingBack.ticketCount.kid != 0" class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.kid"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('bookingInfo.kidTickL')"
																			></v-select>
																</div>
																<div v-if="bookingData.goingBack.ticketCount.love != 0" class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.love"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('bookingInfo.loveTick')"
																			></v-select>
																</div>
																<div v-if="bookingData.goingBack.ticketCount.older != 0" class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.older"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('bookingInfo.olderTickL')"
																		></v-select>
																</div>
																<div v-if="bookingData.goingBack.ticketCount.student != 0" class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.student"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('bookingInfo.studentTick')"
																		></v-select>
																</div>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.seatInfo') }}</th>
														<td>
																{{ $t('bookingInfo.adult') }}
																<span v-for=" backAdult in showBackSeats.adult" :key="backAdult" class="mx-1">
																		{{backAdult}}
																</span>
																<br>
																{{ $t('bookingInfo.kid') }}
																<span v-for=" backKid in showBackSeats.kid" :key="backKid" class="mx-1">
																		{{backKid}}
																</span>
																<br>
																{{ $t('bookingInfo.love') }}
																<span v-for=" backLove in showBackSeats.love" :key="backLove" class="mx-1">
																		{{backLove}}
																</span>
																<br>
																{{ $t('bookingInfo.older') }}
																<span v-for=" backOlder in showBackSeats.older" :key="backOlder" class="mx-1">
																		{{backOlder}}
																</span>
																<br>
																{{ $t('bookingInfo.student') }}
																<span v-for=" backStudent in showBackSeats.student" :key="backStudent" class="mx-1">
																		{{backStudent}}
																</span>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.total') }}</th>
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
			userId:'',
			phoneNum:'',
			userBookingDates: null,
			bookingData:{
				goingTo: {
					startStation: { name: '', value: '' },
					endStation: { name: '' , value: '' },
					carType: '',
					date: '',
					trainNo: '',
					departTime: '',
					arrivalTime: '',
					ticketCount : {
							adult : 0,
							kid : 0,
							love : 0,
							older : 0,
							student : 0,
					},
					seatsNo: ['',],
					price: 0,
				},
				goingBack: {
					startStation: { name: '', value: '' },
					endStation: { name: '', value: '' },
					carType: '',
					date: '',
					trainNo: '',
					departTime: '',
					arrivalTime: '',
					ticketCount : {
							adult : 0,
							kid : 0,
							love : 0,
							older : 0,
							student : 0,
					},
					seatsNo: ['',],
					price: 0,
				},
			},
			showGoSeats: {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			},
			showBackSeats: {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
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
			date: '',
			time: '',
			backupGoSeatsNo: [],
			backupBackSeatsNo: [],
		};
	},
	created() {

	},
	updated() {

	},
	watch: {
		'bookingData.goingTo.ticketCount': {
			handler: function() {
				this.countFare();
				this.watchTicketNum();
			},
			deep: true,
		},
		'bookingData.goingBack.ticketCount': {
			handler: function() {
				this.countFare();
				this.watchBackTicketNum();
			},
			deep: true,
		},
	},
	methods: {
		justFindUser() {
			if ( this.userId === '' || this.phoneNum === '' ) {
				alert(this.$t('data.alertInsert'))
			} else {
				this.bookingData = {
					goingTo: {
						startStation: { name: '', value: '' },
						endStation: { name: '' , value: '' },
						carType: '',
						date: '',
						trainNo: '',
						departTime: '',
						arrivalTime: '',
						ticketCount : {
							adult : 0,
							kid : 0,
							love : 0,
							older : 0,
							student : 0,
						},
						seatsNo: ['',],
						price: 0,
					},
					goingBack: {
						startStation: { name: '', value: '' },
						endStation: { name: '', value: '' },
						carType: '',
						date: '',
						trainNo: '',
						departTime: '',
						arrivalTime: '',
						ticketCount : {
							adult : 0,
							kid : 0,
							love : 0,
							older : 0,
							student : 0,
						},
						seatsNo: ['',],
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
						alert(this.$t('data.alertNoMes'));
					}
				})
				.catch( (error) => {
					console.log(error);
					alert(this.$t('data.alertNoMes'));
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
			if ( this.userId === '' || this.phoneNum === '' ) {
				alert(this.$t('data.alertInsert'))
			} else {
				this.bookingData = {
					goingTo: {
						startStation: { name: '', value: '' },
						endStation: { name: '', value: '' },
						carType: '',
						date: '',
						trainNo: '',
						departTime: '',
						arrivalTime: '',
						ticketCount : {
							adult : 0,
							kid : 0,
							love : 0,
							older : 0,
							student : 0,
						},
						seatsNo: ['',],
						price: 0,
					},
					goingBack: {
						startStation: { name: '', value: '' },
						endStation: { name: '', value: '' },
						carType: '',
						date: '',
						trainNo: '',
						departTime: '',
						arrivalTime: '',
						ticketCount : {
							adult : 0,
							kid : 0,
							love : 0,
							older : 0,
							student : 0,
						},
						seatsNo: ['',],
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
						alert(this.$t('data.alertNoMes'));
					}
				})
				.catch( (error) => {
					console.log(error);
					alert(this.$t('data.alertNoMes'));
				});
			}
		},
		userFilter() {
			const dateArr = Object.keys(this.userBookingDates);
      const fullDate = new Date();
      const nowY = fullDate.getFullYear();
      const nowM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ('0' + (fullDate.getMonth() + 1));
      const nowD = fullDate.getDate() < 10 ? ('0' + fullDate.getDate()) : fullDate.getDate();
			let info = {};
			let timeArr = [];
			let date = [];
			let backDate = [];
			for (let i = 0 ; i < dateArr.length ; i++ ) {
				info = this.userBookingDates[`${dateArr[i]}`];
				timeArr = Object.keys( info );
				for ( let j = 0 ; j < timeArr.length ; j++ ){
					if ( info[`${timeArr[j]}`].goingBack ) {
						date = info[`${timeArr[j]}`].goingTo.date.split('-');
						backDate = info[`${timeArr[j]}`].goingBack.date.split('-');
						if ( date[0] < nowY ) {
							delete info[`${timeArr[j]}`].goingTo;
							continue;
						} else {
							if ( date[1] < nowM ) {
								delete info[`${timeArr[j]}`].goingTo;
								continue;
							} else {
								if ( date[2] <= nowD ) {
									delete info[`${timeArr[j]}`].goingTo;
									if ( backDate[0] < nowY ) {
										delete info[`${timeArr[j]}`];
										continue;
									} else {
										if ( backDate[1] < nowM ) {
											delete info[`${timeArr[j]}`];
											continue;
										} else {
											if ( backDate[2] <= nowD ) {
												delete info[`${timeArr[j]}`];
												continue;
											}
										}
									}
									continue;
								}
							}
						}
					} else {
						date = info[`${timeArr[j]}`].goingTo.date.split('-');
						if ( date[0] < nowY ) {
							delete info[`${timeArr[j]}`];
							continue;
						} else {
							if ( date[1] < nowM ) {
								delete info[`${timeArr[j]}`];
								continue;
							} else {
								if ( date[2] <= nowD ) {
									delete info[`${timeArr[j]}`];
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
			this.bookingData = {
				goingTo: {
					startStation: { name: '', value: '' },
					endStation: { name: '', value: '' },
					carType: '',
					date: '',
					trainNo: '',
					departTime: '',
					arrivalTime: '',
					ticketCount : {
						adult : 0,
						kid : 0,
						love : 0,
						older : 0,
						student : 0,
					},
					seatsNo: ['',],
					price: 0,
				},
				goingBack: {
					startStation: { name: '', value: '' },
					endStation: { name: '', value: '' },
					carType: '',
					date: '',
					trainNo: '',
					departTime: '',
					arrivalTime: '',
					ticketCount : {
						adult : 0,
						kid : 0,
						love : 0,
						older : 0,
						student : 0,
					},
					seatsNo: ['',],
					price: 0,
				},
			};
			this.fares = {};
			this.showGoSeats = {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			};  
			this.showBackSeats = {
				adult : [] ,
				kid : [] ,
				love : [] ,
				older : [] ,
				student : [] ,
			};  
			const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
			const userId = this.userId;
			const phoneNum = this.phoneNum;
			if ( key , key1 ) {
				this.date = key;
				this.time = key1;
			}
			get( child( dbRef, `users/${userId}/${phoneNum}/${this.date}/${this.time}` ) ).then( ( snapshot ) => {
				if ( snapshot.exists() ) {
					this.bookingData.goingTo = snapshot.val().goingTo;
					if ( snapshot.val().goingBack ) {
							this.bookingData.goingBack = snapshot.val().goingBack;
					}
					this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
					this.createTicketSelector();
					this.getSeatsInfo();
					this.createTicketType();
				} else {
					alert(this.$t('data.alertNoMes'));
				}
			}).catch( (error) => {
				alert(this.$t('data.alertNoMes'));
				console.log(error);
			});
		},
		createTicketType() {
			if ( this.bookingData.goingBack.trainNo ) {
				this.createBackTicketType();
				this.createGoingTicketType();
			} else {
				this.createGoingTicketType();
			}
		},
		createGoingTicketType() {
			if ( this.bookingData.goingTo.ticketCount.adult > 0 ) {
				this.showGoSeats.adult = this.bookingData.goingTo.seatsNo.slice( 0 , this.bookingData.goingTo.ticketCount.adult );
			}
			if ( this.bookingData.goingTo.ticketCount.kid > 0 ) {
				this.showGoSeats.kid = this.bookingData.goingTo.seatsNo.slice( this.bookingData.goingTo.ticketCount.adult , this.bookingData.goingTo.ticketCount.adult + this.bookingData.goingTo.ticketCount.kid );
			}
			let start = this.bookingData.goingTo.ticketCount.adult + this.bookingData.goingTo.ticketCount.kid;
			if ( this.bookingData.goingTo.ticketCount.love > 0 ) {
				this.showGoSeats.love = this.bookingData.goingTo.seatsNo.slice( start , start + this.bookingData.goingTo.ticketCount.love );
			}
			let start1 = start + this.bookingData.goingTo.ticketCount.love;
			if ( this.bookingData.goingTo.ticketCount.older > 0 ) {
				this.showGoSeats.older = this.bookingData.goingTo.seatsNo.slice( start1 , start1 + this.bookingData.goingTo.ticketCount.older );
			}
			let start2 = start1 + this.bookingData.goingTo.ticketCount.older;
			if ( this.bookingData.goingTo.ticketCount.student > 0 ) {
				this.showGoSeats.student = this.bookingData.goingTo.seatsNo.slice( start2 , start2 + this.bookingData.goingTo.ticketCount.student );
			}
		},
		createBackTicketType() {
			if ( this.bookingData.goingBack.ticketCount.adult > 0 ) {
				this.showBackSeats.adult = this.bookingData.goingBack.seatsNo.slice( 0 , this.bookingData.goingBack.ticketCount.adult );
			}
			if ( this.bookingData.goingBack.ticketCount.kid > 0 ) {
				this.showBackSeats.kid = this.bookingData.goingBack.seatsNo.slice( this.bookingData.goingBack.ticketCount.adult , this.bookingData.goingBack.ticketCount.adult + this.bookingData.goingBack.ticketCount.kid );
			}
			let start = this.bookingData.goingBack.ticketCount.adult + this.bookingData.goingBack.ticketCount.kid;
			if ( this.bookingData.goingBack.ticketCount.love > 0 ) {
				this.showBackSeats.love = this.bookingData.goingBack.seatsNo.slice( start , start + this.bookingData.goingBack.ticketCount.love );
			}
			let start1 = start + this.bookingData.goingBack.ticketCount.love;
			if ( this.bookingData.goingBack.ticketCount.older > 0 ) {
				this.showBackSeats.older = this.bookingData.goingBack.seatsNo.slice( start1 , start1 + this.bookingData.goingBack.ticketCount.older );
			}
			let start2 = start1 + this.bookingData.goingBack.ticketCount.older;
			if ( this.bookingData.goingBack.ticketCount.student > 0 ) {
				this.showBackSeats.student = this.bookingData.goingBack.seatsNo.slice( start2 , start2 + this.bookingData.goingBack.ticketCount.student );
			}
		},
		createTicketSelector() {
			this.ticketCountNums = [];
			this.backTicketCountNums = [];
			for ( let i = 0 ; i <= 10 ; i++ ) {
				let item = { num: i , value: i };
				this.ticketCountNums.push(item);
			}
			if ( this.bookingData.goingBack ) {
				for ( let j = 0 ; j <= 10 ; j++ ) {
						let item2 = { num: j , value: j };
						this.backTicketCountNums.push(item2);
				}
			}
		},
		watchTicketNum() {
			if ( this.bookingData.goingTo.ticketCount.adult > this.showGoSeats.adult.length && this.bookingData.goingTo.ticketCount.adult !== 0 ) {
				this.bookingData.goingTo.ticketCount.adult = this.showGoSeats.adult.length;
				alert(this.$t('data.goBook'));
			}
			if ( this.bookingData.goingTo.ticketCount.kid > this.showGoSeats.kid.length && this.bookingData.goingTo.ticketCount.kid !== 0 ) {
				this.bookingData.goingTo.ticketCount.kid = this.showGoSeats.kid.length;
				alert(this.$t('data.goBook'));
			}
			if ( this.bookingData.goingTo.ticketCount.love > this.showGoSeats.love.length && this.bookingData.goingTo.ticketCount.love !== 0 ) {
				this.bookingData.goingTo.ticketCount.love = this.showGoSeats.love.length;
				alert(this.$t('data.goBook'));
			}
			if ( this.bookingData.goingTo.ticketCount.older > this.showGoSeats.older.length && this.bookingData.goingTo.ticketCount.older !== 0 ) {
				this.bookingData.goingTo.ticketCount.older = this.showGoSeats.older.length;
				alert(this.$t('data.goBook'));
			}
			if ( this.bookingData.goingTo.ticketCount.student > this.showGoSeats.student.length && this.bookingData.goingTo.ticketCount.student !== 0 ) {
				this.bookingData.goingTo.ticketCount.student = this.showGoSeats.student.length;
				alert(this.$t('data.goBook'));
			}
		},
		watchBackTicketNum() {
			if ( this.bookingData.goingBack.ticketCount.adult > this.showBackSeats.adult.length && this.bookingData.goingBack.ticketCount.adult !== 0 ) {
				this.bookingData.goingBack.ticketCount.adult = this.showBackSeats.adult.length;
				alert(this.$t('data.goBook'));
			}
			if ( this.bookingData.goingBack.ticketCount.kid > this.showBackSeats.kid.length && this.bookingData.goingBack.ticketCount.adult !== 0 ) {
				this.bookingData.goingBack.ticketCount.kid = this.showBackSeats.kid.length;
				alert(this.$t('data.goBook'));
			}
			if ( this.bookingData.goingBack.ticketCount.love > this.showBackSeats.love.length && this.bookingData.goingBack.ticketCount.adult !== 0 ) {
				this.bookingData.goingBack.ticketCount.love = this.showBackSeats.love.length;
				alert(this.$t('data.goBook'));
			}
			if ( this.bookingData.goingBack.ticketCount.older > this.showBackSeats.older.length && this.bookingData.goingBack.ticketCount.adult !== 0 ) {
				this.bookingData.goingBack.ticketCount.older = this.showBackSeats.older.length;
				alert(this.$t('data.goBook'));
			}
			if ( this.bookingData.goingBack.ticketCount.student > this.showBackSeats.student.length && this.bookingData.goingBack.ticketCount.adult !== 0 ) {
				this.bookingData.goingBack.ticketCount.student = this.showBackSeats.student.length;
				alert(this.$t('data.goBook'));
			}
		},
		changeTicket() {
			this.showInfo = false;
			this.updateInfo = true;
			this.readyToChange = true;
			const startStation = this.bookingData.goingTo.startStation.value;
			const endStation = this.bookingData.goingTo.endStation.value;
			let url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
			if ( startStation !== '' && endStation !== '' ) {
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
		countFare() {
			if ( this.fares.standardAdult ) {
				const ticketInfo = this.fares;
				if ( this.bookingData.goingTo.carType === '0' ) {
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
				} else if ( this.bookingData.goingTo.carType === '1' ) {
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
		cancelUpdateData() {
			this.findBookingInfo();   
		},
		cancelGoingTo() {
			let goingCancelOrNot = confirm(this.$t('data.confirmCancel'));

			if ( goingCancelOrNot ) {
				let goingUserId = prompt(this.$t('data.alertAgain'),'');
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
					if ( this.bookingData.goingBack.trainNo ) {
						update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
							seatsData : this.inputSeatData
						});
						remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + `/${this.date}` + `/${this.time}` + '/goingTo' ) , {} );
						set( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + `/${this.date}` + `/${this.time}` ) , {
							goingTo: this.bookingData.goingBack
						})
						.then( () => {
							alert(this.$t('data.alertGoCancel'));
							window.location.reload();
						})
					} else {
						update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
							seatsData : this.inputSeatData
						});
						remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + `/${this.date}` + `/${this.time}` ) , {} )
						.then( () => {
							alert(this.$t('data.alertGoCancel'));
							window.location.reload();
						})
					}
				} else {
					alert(this.$t('data.alertIDErr'))
				}
			}
		},
		cancelGoingBack() {
			let backCancelOrNot = confirm(this.$t('data.confirmBackCancel'));

			if ( backCancelOrNot ) {
				let backUserId = prompt(this.$t('data.alertAgain'),'');
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
					remove( ref( db, 'users/' + this.userId + `/${this.phoneNum}` + `/${this.date}` + `/${this.time}` + '/goingBack' ) , {} )
					.then( () => {
						alert(this.$t('data.alertBackCancel'));
						window.location.reload();
					})
				} else {
					alert(this.$t('data.alertIDErr'))
				}
			}
		},
		updateSeatsInfo() {
			let lostSeats = JSON.parse(this.backupGoSeatsNo);
			const userBookedSeats = this.bookingData.goingTo.seatsNo;
			for ( let i = 0 ; i < userBookedSeats.length ; i++ ) {
				for ( let j = 0 ; j < lostSeats.length ; j++ ) {
					if (userBookedSeats[i] === lostSeats[j] ) {
						lostSeats.splice( j , 1 );
					}
				}
			}
			for ( let k = 0 ; k < lostSeats.length ; k ++ ) {
				for ( let l = 0 ; l < this.inputSeatData.length ; l ++ ) {
					if ( lostSeats[k] === this.inputSeatData[l].seatsNo ) {
						this.inputSeatData.splice( l , 1 );
					}
				}
			}
		},
		updateBackSeatsInfo() {
			let lostSeats = JSON.parse(this.backupBackSeatsNo);
			const userBookedSeats = this.bookingData.goingBack.seatsNo;
			if ( lostSeats.length > userBookedSeats.length ) {
				for ( let i = 0 ; i < userBookedSeats.length ; i++ ) {
					for ( let j = 0 ; j < lostSeats.length ; j++ ) {
						if (userBookedSeats[i] === lostSeats[j] ) {
							lostSeats.splice( j , 1 );
						}
					}
				}
				for ( let k = 0 ; k < lostSeats.length ; k ++ ) {
					for ( let l = 0 ; l < this.inputBackSeatData.length ; l ++ ) {
						if ( lostSeats[k] === this.inputBackSeatData[l].seatsNo ) {
							this.inputBackSeatData.splice( l , 1 );
						}
					}
				}
			}
		},
		newGoingSeatsNo() {
			const goingCount = this.bookingData.goingTo.ticketCount;
			let goingSeatsNo = this.bookingData.goingTo.seatsNo;
			this.backupGoSeatsNo = JSON.stringify(this.bookingData.goingTo.seatsNo);
			const showGoSeats = this.showGoSeats;
			const ticketTotal =  parseInt(goingCount.adult) + parseInt(goingCount.kid) + parseInt(goingCount.love) + parseInt(goingCount.older) + parseInt(goingCount.student);
			if ( goingSeatsNo.length > ticketTotal ) {
				if ( showGoSeats.adult.length > goingCount.adult ) {
					let diff = showGoSeats.adult.length - goingCount.adult;
					goingSeatsNo.splice( goingCount.adult , diff );
				}
				if ( showGoSeats.kid.length > goingCount.kid ) {
					let diff1 = showGoSeats.kid.length - goingCount.kid;
					goingSeatsNo.splice( goingCount.adult + goingCount.kid , diff1 );
				}
				if( showGoSeats.love.length > goingCount.love ) {
					let diff2 = showGoSeats.love.length - goingCount.love;
					goingSeatsNo.splice( goingCount.adult + goingCount.kid + goingCount.love , diff2 );
				}
				if ( showGoSeats.older.length > goingCount.older ) {
					let diff3 = showGoSeats.older.length - goingCount.older;
					goingSeatsNo.splice(  goingCount.adult + goingCount.kid + goingCount.love + goingCount.older , diff3 );
				}
				if (showGoSeats.student.length > goingCount.student ) {
					let diff4 = showGoSeats.student.length - goingCount.student;
					goingSeatsNo.splice( goingCount.adult + goingCount.kid + goingCount.love + goingCount.older + goingCount.student , diff4 );
				}
			}
		},
		newBackSeatsNo() {
			const backCount = this.bookingData.goingBack.ticketCount;
			let backSeatsNo = this.bookingData.goingBack.seatsNo;
			this.backupBackSeatsNo = JSON.stringify(this.bookingData.goingBack.seatsNo);
			const showBackSeats = this.showBackSeats;
			const ticketTotal =  parseInt(backCount.adult) + parseInt(backCount.kid) + parseInt(backCount.love) + parseInt(backCount.older) + parseInt(backCount.student);
			if ( backSeatsNo.length > ticketTotal ) {
				if ( showBackSeats.adult.length > backCount.adult ) {
					let diff = showBackSeats.adult.length - backCount.adult;
					backSeatsNo.splice( backCount.adult , diff );
				}
				if ( showBackSeats.kid.length > backCount.kid ) {
					let diff1 = showBackSeats.kid.length - backCount.kid;
					backSeatsNo.splice( backCount.adult + backCount.kid , diff1 );
				}
				if( showBackSeats.love.length > backCount.love ) {
					let diff2 = showBackSeats.love.length - backCount.love;
					backSeatsNo.splice( backCount.adult + backCount.kid + backCount.love , diff2 );
				}
				if ( showBackSeats.older.length > backCount.older ) {
					let diff3 = showBackSeats.older.length - backCount.older;
					backSeatsNo.splice(  backCount.adult + backCount.kid + backCount.love + backCount.older , diff3 );
				}
				if ( showBackSeats.student.length > backCount.student ) {
					let diff4 = showBackSeats.student.length - backCount.student;
					backSeatsNo.splice( backCount.adult + backCount.kid + backCount.love + backCount.older + backCount.student , diff4 );
				}
			}
		},
		updateData() {
			let changeOrNot = confirm(this.$t('data.confirmChange'));

			if ( changeOrNot ) {
				let userId = prompt(this.$t('data.alertAgain'), '');
				const db = getDatabase( GetfirebaseConfig() );
				if ( userId === this.userId ) {
					this.newGoingSeatsNo();
					this.updateSeatsInfo();
					update( ref( db, 'users/' + userId + `/${this.phoneNum}` + `/${this.date}` + `/${this.time}` + '/goingTo' ) , {
						ticketCount : this.bookingData.goingTo.ticketCount,
						price : this.bookingData.goingTo.price,
						seatsNo : this.bookingData.goingTo.seatsNo
					});
					update( ref( db, 'bookedSeats/' + this.bookingData.goingTo.date + `/${this.bookingData.goingTo.trainNo}` ) , {
						seatsData : this.inputSeatData
					});
					
					if ( this.bookingData.goingBack.trainNo ) {
						this.newBackSeatsNo();
						this.updateBackSeatsInfo();
						update( ref( db, 'users/' + userId + `/${this.phoneNum}` + `/${this.date}` + `/${this.time}` + '/goingBack' ) , {
								ticketCount : this.bookingData.goingBack.ticketCount,
								price : this.bookingData.goingBack.price,
								seatsNo : this.bookingData.goingBack.seatsNo
						});
						update( ref( db, 'bookedSeats/' + this.bookingData.goingBack.date + `/${this.bookingData.goingBack.trainNo}` ) , {
								seatsData : this.inputBackSeatData
						});
					}
					alert(this.$t('data.success'))
					this.findBookingInfo();
				} else {
					alert(this.$t('data.alertIDErr'))
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
  .user-container{
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
	.seats-info{
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