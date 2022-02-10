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
											{{message}}
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
				<v-container class="confirm-area">
						<v-alert
							v-if="confirm"
							class="mx-auto"
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
											cols="12"
										>
											{{confirmMes}}
										</v-col>
										<v-col
											class="auto"
											cols="6"
										>
												<v-btn
													class="px-0"
													color="light-blue"
													@click="OKConfirm"
												>OK</v-btn>
										</v-col>
										<v-col
											class="mx-auto"
											cols="6"
										>
												<v-btn
													class="px-0"
													color="blue lighten-5"
													light
													@click="closeConfirm"
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
                          @keyup.enter="checkPrompt"
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
											@click="checkUpdateData"
										>{{ $t('bookingInfo.update') }}</v-btn>
								</v-col>
						</v-row>
						<v-row
              class="user-container mt-5 mx-auto"
            >
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
                                            {{info.goingTo.trainNo}}
                                        </span>
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
                                            {{info.goingBack.trainNo}}
                                        </span>
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
													@click="checkGoingCancel"
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
																<div
																	v-else-if="bookingData.goingTo.carType === '1' "
																	class="carType"
																>
																		{{ $t('bookingInfo.business') }}
																</div>
														</td>
												</tr>
												<tr>
														<th>{{ $t('bookingInfo.ticket') }}</th>
														<td v-show="showInfo">
                                <div
                                  v-for="(count, index) in bookingData.goingTo.ticketCount"
                                  :key="`going${index}`"
                                  class="ticketCount"
                                >
                                    <div
                                      v-if="count.value !== 0 "
                                    >
                                        {{$t(count.name)}}
                                        {{count.value}}
                                        {{ $t('bookingInfo.pic') }}
                                    </div>
                                </div>
														</td>
														<td v-show="updateInfo">
                                <div
                                  v-for="(count, index) in bookingData.goingTo.ticketCount"
                                  :key="`updateGoing${index}`"
                                  class="seats-info"
                                >
                                    <div
                                      v-if="count.value !== 0 "
                                    >
                                        <v-select
                                          v-model="count.value"
                                          :items="ticketCountNums"
                                          item-text="num"
                                          item-value="value"
                                          :label="$t(count.name)"
                                          class="ticks"
                                        ></v-select>
                                    </div>
                                </div>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.seatInfo') }}</th>
														<td>
																{{ $t('bookingInfo.adult') }}
																<span
																	v-for=" goAdult in showGoSeats.adult"
																	:key="goAdult"
																	class="mx-1"
																>
																		{{goAdult}}
																</span>
																<br>
																{{ $t('bookingInfo.kid') }}
																<span
																	v-for=" goKid in showGoSeats.kid"
																	:key="goKid"
																	class="mx-1"
																>
																		{{goKid}}
																</span>
																<br>
																{{ $t('bookingInfo.love') }}
																<span
																	v-for=" goLove in showGoSeats.love"
																	:key="goLove"
																	class="mx-1"
																>
																		{{goLove}}
																</span>
																<br>
																{{ $t('bookingInfo.older') }}
																<span
																	v-for=" goOlder in showGoSeats.older"
																	:key="goOlder"
																	class="mx-1"
																>
																		{{goOlder}}
																</span>
																<br>
																{{ $t('bookingInfo.student') }}
																<span
																	v-for=" goStudent in showGoSeats.student"
																	:key="goStudent"
																	class="mx-1"
																>
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
													:disabled="cantBeChange"
													class="change"
													color="error"
													@click="checkBackCancel"
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
																{{bookingData.goingBack.departTime}}
																~
																{{bookingData.goingBack.arrivalTime}}
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.carType') }}</th>
														<td>
																<div v-if="bookingData.goingBack.carType === '0' " class="carType">
																		{{ $t('bookingInfo.standard') }}
																</div>
																<div
																	v-else-if="bookingData.goingBack.carType === '1' "
																	class="carType"
																>
																		{{ $t('bookingInfo.business') }}
																</div>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.ticket') }}</th>
														<td v-show="showInfo">
                                <div
                                  v-for="(count, index) in bookingData.goingBack.ticketCount"
                                  :key="`back${index}`"
                                  class="ticketCount"
                                >
                                    <div
                                      v-if="count.value !== 0 "
                                    >
                                        {{$t(count.name)}}
                                        {{count.value}}
                                        {{ $t('bookingInfo.pic') }}
                                    </div>
                                </div>
														</td>
														<td v-show="updateInfo">
                                <div
                                  v-for="(count, index) in bookingData.goingBack.ticketCount"
                                  :key="`updateBack${index}`"
                                  class="seats-info"
                                >
                                    <div
                                      v-if="count.value !== 0 "
                                    >
                                        <v-select
                                          v-model="count.value"
                                          :items="ticketCountNums"
                                          item-text="num"
                                          item-value="value"
                                          :label="$t(count.name)"
                                          class="ticks"
                                        ></v-select>
                                    </div>
                                </div>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('bookingInfo.seatInfo') }}</th>
														<td>
																{{ $t('bookingInfo.adult') }}
																<span
																	v-for=" backAdult in showBackSeats.adult"
																	:key="backAdult"
																	class="mx-1"
																>
																		{{backAdult}}
																</span>
																<br>
																{{ $t('bookingInfo.kid') }}
																<span
																	v-for=" backKid in showBackSeats.kid"
																	:key="backKid"
																	class="mx-1"
																>
																		{{backKid}}
																</span>
																<br>
																{{ $t('bookingInfo.love') }}
																<span
																	v-for=" backLove in showBackSeats.love"
																	:key="backLove"
																	class="mx-1"
																>
																		{{backLove}}
																</span>
																<br>
																{{ $t('bookingInfo.older') }}
																<span
																	v-for=" backOlder in showBackSeats.older"
																	:key="backOlder"
																	class="mx-1"
																>
																		{{backOlder}}
																</span>
																<br>
																{{ $t('bookingInfo.student') }}
																<span
																	v-for=" backStudent in showBackSeats.student"
																	:key="backStudent"
																	class="mx-1"
																>
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
// import axios from 'axios';
import moment from 'moment';
import {
  getDatabase, ref, child, get, remove, update, set,
} from 'firebase/database';
// import { GetAuthorizationHeader } from '~/assets/Authorization.js';
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';

export default {
  data() {
    return {
      alert: false,
      message: '',
      confirm: false,
      confirmSymbol: '',
      confirmMes: '',
      confirmGoing: false,
      confirmBack: false,
      confirmUpdate: false,
      prompt: false,
      promptMes: '',
      promptInput: '',
      promptGoing: false,
      promptBack: false,
      promptUpdate: false,
      userId: '',
      phoneNum: '',
      userBookingDates: [
        {
          '0000-00-00': {
            '00:00': {
              goingTo: {
                startStation: { name: '', value: '' },
                endStation: { name: '', value: '' },
                carType: '',
                date: '',
                trainNo: '',
                departTime: '',
                arrivalTime: '',
                ticketCount: [
                  { key: '', name: '', value: 0 },
                  { key: '', name: '', value: 0 },
                  { key: '', name: '', value: 0 },
                  { key: '', name: '', value: 0 },
                  { key: '', name: '', value: 0 },
                ],
                seatsNo: [''],
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
                ticketCount: [
                  { key: '', name: '', value: 0 },
                  { key: '', name: '', value: 0 },
                  { key: '', name: '', value: 0 },
                  { key: '', name: '', value: 0 },
                  { key: '', name: '', value: 0 },
                ],
                seatsNo: [''],
                price: 0,
              },
            },
          },
        },
      ],
      bookingData: {
        goingTo: {
          startStation: { name: '', value: '' },
          endStation: { name: '', value: '' },
          carType: '',
          date: '',
          trainNo: '',
          departTime: '',
          arrivalTime: '',
          ticketCount: [
            { key: '', name: '', value: 0 },
            { key: '', name: '', value: 0 },
            { key: '', name: '', value: 0 },
            { key: '', name: '', value: 0 },
            { key: '', name: '', value: 0 },
          ],
          seatsNo: [''],
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
          ticketCount: [
            { key: '', name: '', value: 0 },
            { key: '', name: '', value: 0 },
            { key: '', name: '', value: 0 },
            { key: '', name: '', value: 0 },
            { key: '', name: '', value: 0 },
          ],
          seatsNo: [''],
          price: 0,
        },
      },
      backupBookingData: {},
      showGoSeats: {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      },
      showBackSeats: {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      },
      openList: true,
      cantBeChange: false,
      showInfo: true,
      updateInfo: false,
      readyToChange: false,
      fares: {
        freeKid: 0,
        standardKid: 0,
        standardGroup: 0,
        freeAdult: 0,
        standardAdult: 0,
        bussinessKid: 0,
        bussinessGroup: 0,
        bussinessAdult: 0,
      },
      inputSeatData: [
        {
          seatsNo: '',
          tookOrNot: [],
        },
      ],
      inputBackSeatData: [
        {
          seatsNo: '',
          tookOrNot: [],
        },
      ],
      ticketCountNums: [
        { num: 0, value: 0 },
      ],
      backTicketCountNums: [
        { num: 0, value: 0 },
      ],
      totalPrice: 0,
      date: '',
      time: '',
      backupSeatsNo: [],
    };
  },
  mounted() {
    this.backupBookingData = JSON.parse( JSON.stringify( this.bookingData ) );
  },
  watch: {
    'bookingData.goingTo.ticketCount': {
      handler() {
        this.countFare();
        this.$nextTick( () => {
          this.watchTicketNum( this.bookingData.goingTo.ticketCount, this.showGoSeats );
        } );
      },
      deep: true,
    },
    'bookingData.goingBack.ticketCount': {
      handler() {
        this.countFare();
        this.$nextTick( () => {
          this.watchTicketNum( this.bookingData.goingBack.ticketCount, this.showBackSeats );
        } );
      },
      deep: true,
    },
    confirmGoing: {
      handler() {
        this.checkGoingCancel();
      },
    },
    confirmBack: {
      handler() {
        this.checkBackCancel();
      },
    },
    confirmUpdate: {
      handler() {
        this.checkUpdateData();
      },
    },
    promptGoing: {
      handler() {
        this.cancelGoingTo();
      },
    },
    promptBack: {
      handler() {
        this.cancelGoingBack();
      },
    },
    promptUpdate: {
      handler() {
        this.updateData();
      },
    },
  },
  methods: {
    customAlert( mes ) {
      this.alert = true;
      this.message = mes;
    },
    closeAlert() {
      this.alert = false;
    },
    customConfirm( mes ) {
      this.confirm = true;
      this.confirmMes = mes;
    },
    closeConfirm() {
      this.confirmGoing = false;
      this.confirmBack = false;
      this.confirmUpdate = false;
      this.confirm = false;
      this.confirmSymbol = '';
    },
    OKConfirm() {
      if ( this.confirmSymbol === 'going' ) {
        this.confirmGoing = true;
      } else if ( this.confirmSymbol === 'back' ) {
        this.confirmBack = true;
      } else if ( this.confirmSymbol === 'update' ) {
        this.confirmUpdate = true;
      }
      this.$nextTick( () => {
        this.confirm = false;
      } );
    },
    customPrompt( mes ) {
      this.prompt = true;
      this.promptMes = mes;
    },
    closePrompt() {
      this.promptInput = '';
      this.prompt = false;
      this.confirmGoing = false;
      this.confirmBack = false;
      this.confirmUpdate = false;
      this.$nextTick( () => {
        this.confirm = false;
      } );
    },
    checkPrompt() {
      const allClaer = () => {
        this.prompt = false;
        this.promptInput = '';
        this.confirmSymbol = '';
        this.confirmGoing = false;
        this.confirmBack = false;
        this.confirmUpdate = false;
        this.$nextTick( () => {
          this.confirm = false;
        } );
      };
      if ( this.promptInput === this.userId ) {
        this.prompt = false;
        this.promptInput = '';
        if ( this.confirmSymbol === 'going' ) {
          this.promptGoing = true;
          this.confirmGoing = false;
        } else if ( this.confirmSymbol === 'back' ) {
          this.promptBack = true;
          this.confirmBack = false;
        } else if ( this.confirmSymbol === 'update' ) {
          this.promptUpdate = true;
          this.confirmUpdate = false;
        }
        this.$nextTick( () => {
          this.confirm = false;
          this.confirmSymbol = '';
        } );
      } else if ( this.promptInput === '' ) {
        allClaer();
      } else {
        this.customAlert( this.$t( 'data.alertIDErr' ) );
        allClaer();
      }
    },
    justFindUser() {
      if ( this.userId === '' || this.phoneNum === '' ) {
        this.customAlert( this.$t( 'data.alertInsert' ) );
        this.userBookingDates = [];
      } else {
        this.bookingData = JSON.parse( JSON.stringify( this.backupBookingData ) );
        this.userBookingDates = [];
        this.updateInfo = false;
        this.cantBeChange = true;
        this.openList = true;
        const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
        get( child( dbRef, `users/${this.userId}/${this.phoneNum}` ) )
          .then( ( snapshot ) => {
            if ( snapshot.exists() ) {
              this.userBookingDates = snapshot.val();
              this.rebuildInfoStation();
            } else {
              this.userBookingDates = [];
              this.customAlert( this.$t( 'data.alertNoMes' ) );
            }
          } )
          .catch( ( error ) => {
            console.error( error );
            this.userBookingDates = [];
            this.customAlert( this.$t( 'data.alertNoMes' ) );
          } );
      }
    },
    rebuildInfoStation() {
      const dates = Object.keys( this.userBookingDates );
      let date = '';
      let times = [];
      for ( let i = 0; i < dates.length; i++ ) {
        date = dates[i];
        times = Object.keys( this.userBookingDates[date] );
        for ( let j = 0; j < times.length; j++ ) {
          if ( this.userBookingDates[date][times[j]].goingTo ) {
            this.rebuildStation( this.userBookingDates[date][times[j]].goingTo );
          } else if ( this.userBookingDates[date][times[j]].goingBack ) {
            this.rebuildStation( this.userBookingDates[date][times[j]].goingBack );
          }
        }
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
        this.customAlert( this.$t( 'data.alertInsert' ) );
        this.userBookingDates = [];
      } else {
        this.bookingData = JSON.parse( JSON.stringify( this.backupBookingData ) );
        this.updateInfo = false;
        this.cantBeChange = false;
        this.openList = true;
        const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
        get( child( dbRef, `users/${this.userId}/${this.phoneNum}` ) )
          .then( ( snapshot ) => {
            if ( snapshot.exists() ) {
              this.userBookingDates = snapshot.val();
              this.userFilter();
              this.rebuildInfoStation();
            } else {
              this.userBookingDates = [];
              this.customAlert( this.$t( 'data.alertNoMes' ) );
            }
          } )
          .catch( ( error ) => {
            console.error( error );
            this.userBookingDates = [];
            this.customAlert( this.$t( 'data.alertNoMes' ) );
          } );
      }
    },
    userFilter() {
      const dateArr = Object.keys( this.userBookingDates );
      let info = {};
      let timeArr = [];
      let date = '';
      let backDate = [];
      for ( let i = 0; i < dateArr.length; i++ ) {
        info = this.userBookingDates[`${dateArr[i]}`];
        timeArr = Object.keys( info );
        for ( let j = 0; j < timeArr.length; j++ ) {
          if ( info[`${timeArr[j]}`].goingBack ) {
            date = info[`${timeArr[j]}`].goingTo.date;
            backDate = info[`${timeArr[j]}`].goingBack.date;
            if ( moment( date ).isBefore( moment().format( 'YYYY-MM-DD' ) )
            || moment( date ).isSame( moment().format( 'YYYY-MM-DD' ) ) ) {
              delete info[`${timeArr[j]}`].goingTo;
            } else if ( moment( backDate ).isBefore( moment().format( 'YYYY-MM-DD' ) )
            || moment( backDate ).isSame( moment().format( 'YYYY-MM-DD' ) ) ) {
              delete info[`${timeArr[j]}`];
            }
          } else {
            date = info[`${timeArr[j]}`].goingTo.date;
            if ( moment( date ).isBefore( moment().format( 'YYYY-MM-DD' ) )
            || moment( date ).isSame( moment().format( 'YYYY-MM-DD' ) ) ) {
              delete info[`${timeArr[j]}`];
            }
          }
        }
        if ( Object.keys( info ).length === 0 ) {
          delete this.userBookingDates[`${dateArr[i]}`];
        }
      }
      if ( Object.keys( this.userBookingDates ).length === 0 ) {
        this.customAlert( this.$t( 'bookingInfo.cantChange' ) );
      }
    },
    findBookingInfo( dateKey, timeKey ) {
      this.openList = false;
      this.updateInfo = false;
      this.showInfo = true;
      this.readyToChange = false;
      this.promptGoing = false;
      this.promptBack = false;
      this.promptUpdate = false;
      this.bookingData = JSON.parse( JSON.stringify( this.backupBookingData ) );
      Object.keys( this.fares ).forEach( ( item ) => { this.fares[item] = 0; } );
      const arr = ['adult', 'kid', 'love', 'older', 'student'];
      arr.forEach( ( type ) => {
        this.showGoSeats[type] = [];
        this.showBackSeats[type] = [];
      } );
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      const { userId } = this;
      const { phoneNum } = this;
      if ( dateKey && timeKey ) {
        this.date = dateKey;
        this.time = timeKey;
      }
      get( child( dbRef, `users/${userId}/${phoneNum}/${this.date}/${this.time}` ) ).then( ( snapshot ) => {
        if ( snapshot.exists() ) {
          const going = this.rebuildStation( snapshot.val().goingTo );
          this.bookingData.goingTo = going;
          if ( snapshot.val().goingBack ) {
            const back = this.rebuildStation( snapshot.val().goingBack );
            this.bookingData.goingBack = back;
          }
          this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
          this.createTicketSelector();
          this.getSeatsInfo();
          this.createTicketType();
        } else {
          this.customAlert( this.$t( 'data.alertNoMes' ) );
        }
      } ).catch( ( error ) => {
        this.customAlert( this.$t( 'data.alertNoMes' ) );
        console.error( error );
      } );
    },
    rebuildStation( info ) {
      const data = info;
      const startEnd = ['startStation', 'endStation'];
      const stations = [
        '0990', '1000', '1010', '1020', '1030', '1035',
        '1040', '1043', '1047', '1050', '1060', '1070',
      ];
      startEnd.forEach( ( item ) => {
        stations.forEach( ( station ) => {
          if ( data[item].value === station ) {
            data[item].name = this.$t( `checkoutCars.station${station}` );
          }
        } );
      } );
      return data;
    },
    createTicketType() {
      if ( this.bookingData.goingBack.trainNo ) {
        this.createType( this.showBackSeats, this.bookingData.goingBack );
        this.createType( this.showGoSeats, this.bookingData.goingTo );
      } else {
        this.createType( this.showGoSeats, this.bookingData.goingTo );
      }
    },
    createType( show, data ) {
      const seat = show;
      if ( data.ticketCount[0].value > 0 ) {
        seat.adult = data.seatsNo.slice( 0, data.ticketCount[0].value );
      }
      const start = data.ticketCount[0].value + data.ticketCount[1].value;
      if ( data.ticketCount[1].value > 0 ) {
        seat.kid = data.seatsNo.slice( data.ticketCount[0].value, start );
      }
      if ( data.ticketCount[2].value > 0 ) {
        seat.love = data.seatsNo.slice( start, start + data.ticketCount[2].value );
      }
      const start1 = start + data.ticketCount[2].value;
      if ( data.ticketCount[3].value > 0 ) {
        seat.older = data.seatsNo.slice( start1, start1 + data.ticketCount[3].value );
      }
      const start2 = start1 + data.ticketCount[3].value;
      if ( data.ticketCount[4].value > 0 ) {
        seat.student = data.seatsNo.slice( start2, start2 + data.ticketCount[4].value );
      }
    },
    createTicketSelector() {
      this.ticketCountNums = [];
      this.backTicketCountNums = [];
      let item = {};
      let item2 = {};
      for ( let i = 0; i <= 10; i++ ) {
        item = { num: i, value: i };
        this.ticketCountNums.push( item );
      }
      if ( this.bookingData.goingBack ) {
        for ( let j = 0; j <= 10; j++ ) {
          item2 = { num: j, value: j };
          this.backTicketCountNums.push( item2 );
        }
      }
    },
    watchTicketNum( count, showMes ) {
      const ticketCount = count;
      const show = JSON.parse( JSON.stringify( showMes ) );
      if ( ticketCount[0].value > show.adult.length
			&& ticketCount[0].value !== 0 ) {
        ticketCount[0].value = show.adult.length;
        this.customAlert( this.$t( 'data.goBook' ) );
      }
      if ( ticketCount[1].value > show.kid.length
			&& ticketCount[1].value !== 0 ) {
        ticketCount[1].value = show.kid.length;
        this.customAlert( this.$t( 'data.goBook' ) );
      }
      if ( ticketCount[2].value > show.love.length
			&& ticketCount[2].value !== 0 ) {
        ticketCount[2].value = show.love.length;
        this.customAlert( this.$t( 'data.goBook' ) );
      }
      if ( ticketCount[3].value > show.older.length
			&& ticketCount[3].value !== 0 ) {
        ticketCount[3].value = show.older.length;
        this.customAlert( this.$t( 'data.goBook' ) );
      }
      if ( ticketCount[4].value > show.student.length
			&& ticketCount[4].value !== 0 ) {
        ticketCount[4].value = show.student.length;
        this.customAlert( this.$t( 'data.goBook' ) );
      }
    },
    // changeTicket() {
    //   this.showInfo = false;
    //   this.updateInfo = true;
    //   this.readyToChange = true;
    //   const startStation = this.bookingData.goingTo.startStation.value;
    //   const endStation = this.bookingData.goingTo.endStation.value;
    //   const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
    //   if ( startStation !== '' && endStation !== '' ) {
    //     axios.get(
    //       url,
    //       { headers: GetAuthorizationHeader() },
    //     ).then( ( response ) => {
    //       const infos = [];
    //       let info = {};
    //       for ( let i = 0; i < response.data[0].Fares.length; i++ ) {
    //         info = response.data[0].Fares[i].Price;
    //         infos.push( info );
    //       }
    //       infos.sort( ( a, b ) => a - b );
    //       this.fares = {
    //         freeKid: infos[0],
    //         standardKid: infos[1],
    //         standardGroup: infos[2],
    //         freeAdult: infos[3],
    //         standardAdult: infos[4],
    //         bussinessKid: infos[5],
    //         bussinessGroup: infos[6],
    //         bussinessAdult: infos[7],
    //       };
    //     } );
    //   }
    // },
    changeTicket() {
      this.showInfo = false;
      this.updateInfo = true;
      this.readyToChange = true;
      const startStation = this.bookingData.goingTo.startStation.value;
      const endStation = this.bookingData.goingTo.endStation.value;
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      if ( startStation !== '' && endStation !== '' ) {
        get( child( dbRef, `fares/fare/start${startStation}/end${endStation}` ) )
          .then( ( snapshot ) => {
            const infos = [];
            let info = {};
            for ( let i = 0; i < snapshot.val().Fares.length; i++ ) {
              info = snapshot.val().Fares[i].Price;
              infos.push( info );
            }
            infos.sort( ( a, b ) => a - b );
            this.fares = {
              freeKid: infos[0],
              standardKid: infos[1],
              standardGroup: infos[2],
              freeAdult: infos[3],
              standardAdult: infos[4],
              bussinessKid: infos[5],
              bussinessGroup: infos[6],
              bussinessAdult: infos[7],
            };
          } );
      }
    },
    getSeatsInfo() {
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      const goingDate = this.bookingData.goingTo.date;
      const goingTrainNo = this.bookingData.goingTo.trainNo;
      get( child( dbRef, `bookedSeats/${goingDate}/${goingTrainNo}` ) ).then( ( snapshot ) => {
        if ( snapshot.exists() ) {
          const response = snapshot.val();
          this.inputSeatData = response.seatsData;
        }
      } ).catch( ( error ) => {
        console.error( error );
      } );

      const backDate = this.bookingData.goingBack.date;
      const backTrainNo = this.bookingData.goingBack.trainNo;
      get( child( dbRef, `bookedSeats/${backDate}/${backTrainNo}` ) ).then( ( snapshot ) => {
        if ( snapshot.exists() ) {
          const response = snapshot.val();
          this.inputBackSeatData = response.seatsData;
        }
      } ).catch( ( error ) => {
        console.error( error );
      } );
    },
    countFare() {
      const condition = Object.keys( this.fares ).filter( ( item ) => this.fares[item] > 0 );
      if ( condition.length !== 0 ) {
        if ( this.bookingData.goingTo.carType === '0' ) {
          const total = this.fareCounterS( this.bookingData.goingTo );
          this.bookingData.goingTo.price = total;
          const total2 = this.fareCounterS( this.bookingData.goingBack );
          this.bookingData.goingBack.price = total2;
        } else if ( this.bookingData.goingTo.carType === '1' ) {
          const total =	this.fareCounterB( this.bookingData.goingTo );
          this.bookingData.goingTo.price = total;
          const total2 = this.fareCounterB( this.bookingData.goingBack );
          this.bookingData.goingBack.price = total2;
        }
        this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
      }
    },
    fareCounterS( info ) {
      const result = this.fares.standardAdult * info.ticketCount[0].value
      + this.fares.standardKid * info.ticketCount[1].value
      + this.fares.standardKid * info.ticketCount[2].value
      + this.fares.standardKid * info.ticketCount[3].value
      + this.fares.standardGroup * info.ticketCount[4].value;
      return result;
    },
    fareCounterB( info ) {
      const result = this.fares.bussinessAdult * info.ticketCount[0].value
      + this.fares.bussinessKid * info.ticketCount[1].value
      + this.fares.bussinessKid * info.ticketCount[2].value
      + this.fares.bussinessKid * info.ticketCount[3].value
      + this.fares.bussinessGroup * info.ticketCount[4].value;
      return result;
    },
    cancelUpdateData() {
      this.findBookingInfo();
    },
    checkGoingCancel() {
      this.confirmSymbol = 'going';
      this.customConfirm( this.$t( 'data.confirmCancel' ) );

      if ( this.confirmGoing ) {
        this.customPrompt( this.$t( 'data.alertAgain' ), '' );
      }
    },
    cancelGoingTo() {
      const db = getDatabase( GetfirebaseConfig() );
      if ( this.promptGoing ) {
        const userBookedSeats = this.bookingData.goingTo.seatsNo;
        for ( let i = 0; i < userBookedSeats.length; i++ ) {
          for ( let j = 0; j < this.inputSeatData.length; j++ ) {
            if ( userBookedSeats[i] === this.inputSeatData[j].seatsNo ) {
              this.inputSeatData.splice( j, 1 );
            }
          }
        }
        if ( this.bookingData.goingBack.trainNo ) {
          update( ref( db, `bookedSeats/${this.bookingData.goingTo.date}/${this.bookingData.goingTo.trainNo}` ), {
            seatsData: this.inputSeatData,
          } );
          remove( ref( db, `users/${this.userId}/${this.phoneNum}/${this.date}/${this.time}/goingTo` ), {} );
          set( ref( db, `users/${this.userId}/${this.phoneNum}/${this.date}/${this.time}` ), {
            goingTo: this.bookingData.goingBack,
          } )
            .then( () => {
              this.customAlert( this.$t( 'data.alertGoCancel' ) );
              window.location.reload();
            } );
        } else {
          update( ref( db, `bookedSeats/${this.bookingData.goingTo.date}/${this.bookingData.goingTo.trainNo}` ), {
            seatsData: this.inputSeatData,
          } );
          remove( ref( db, `users/${this.userId}/${this.phoneNum}/${this.date}/${this.time}` ), {} )
            .then( () => {
              this.customAlert( this.$t( 'data.alertGoCancel' ) );
              window.location.reload();
            } );
        }
      }
    },
    checkBackCancel() {
      this.confirmSymbol = 'back';
      this.customConfirm( this.$t( 'data.confirmBackCancel' ) );

      if ( this.confirmBack ) {
        this.customPrompt( this.$t( 'data.alertAgain' ) );
      }
    },
    cancelGoingBack() {
      const db = getDatabase( GetfirebaseConfig() );
      if ( this.promptBack ) {
        const userBookedSeats = this.bookingData.goingBack.seatsNo;
        for ( let i = 0; i < userBookedSeats.length; i++ ) {
          for ( let j = 0; j < this.inputBackSeatData.length; j++ ) {
            if ( userBookedSeats[i] === this.inputBackSeatData[j].seatsNo ) {
              this.inputBackSeatData.splice( j, 1 );
            }
          }
        }
        update( ref( db, `bookedSeats/${this.bookingData.goingBack.date}/${this.bookingData.goingBack.trainNo}` ), {
          seatsData: this.inputBackSeatData,
        } );
        remove( ref( db, `users/${this.userId}/${this.phoneNum}/${this.date}/${this.time}/goingBack` ), {} )
          .then( () => {
            this.customAlert( this.$t( 'data.alertBackCancel' ) );
            window.location.reload();
          } );
      }
    },
    newSeatsNo( data ) {
      const count = data.ticketCount;
      const { seatsNo } = data;
      const { showGoSeats } = this;
      this.backupSeatsNo = JSON.stringify( data.seatsNo );
      const ticketTotal = parseInt( count[0].value, 10 )
			+ parseInt( count[1].value, 10 )
			+ parseInt( count[2].value, 10 )
			+ parseInt( count[3].value, 10 )
			+ parseInt( count[4].value, 10 );
      if ( seatsNo.length > ticketTotal ) {
        if ( showGoSeats.adult.length > count[0].value ) {
          const diff = showGoSeats.adult.length - count[0].value;
          seatsNo.splice( count[0].value, diff );
        }
        if ( showGoSeats.kid.length > count[1].value ) {
          const diff1 = showGoSeats.kid.length - count[1].value;
          seatsNo.splice( count[0].value + count[1].value, diff1 );
        }
        if ( showGoSeats.love.length > count[2].value ) {
          const diff2 = showGoSeats.love.length - count[2].value;
          seatsNo.splice( count[0].value + count[1].value
          + count[2].value, diff2 );
        }
        if ( showGoSeats.older.length > count[3].value ) {
          const diff3 = showGoSeats.older.length - count[3].value;
          seatsNo.splice( count[0].value + count[1].value
					+ count[2].value + count[3].value, diff3 );
        }
        if ( showGoSeats.student.length > count[4].value ) {
          const diff4 = showGoSeats.student.length - count[4].value;
          seatsNo.splice( count[0].value + count[1].value + count[2].value
					+ count[3].value + count[4].value, diff4 );
        }
      }
    },
    updateSeatsInfo() {
      const lostSeats = JSON.parse( this.backupSeatsNo );
      const userBookedSeats = this.bookingData.goingTo.seatsNo;
      for ( let i = 0; i < userBookedSeats.length; i++ ) {
        for ( let j = 0; j < lostSeats.length; j++ ) {
          if ( userBookedSeats[i] === lostSeats[j] ) {
            lostSeats.splice( j, 1 );
          }
        }
      }
      for ( let k = 0; k < lostSeats.length; k++ ) {
        for ( let l = 0; l < this.inputSeatData.length; l++ ) {
          if ( lostSeats[k] === this.inputSeatData[l].seatsNo ) {
            this.inputSeatData.splice( l, 1 );
          }
        }
      }
    },
    updateBackSeatsInfo() {
      const lostSeats = JSON.parse( this.backupSeatsNo );
      const userBookedSeats = this.bookingData.goingBack.seatsNo;
      if ( lostSeats.length > userBookedSeats.length ) {
        for ( let i = 0; i < userBookedSeats.length; i++ ) {
          for ( let j = 0; j < lostSeats.length; j++ ) {
            if ( userBookedSeats[i] === lostSeats[j] ) {
              lostSeats.splice( j, 1 );
            }
          }
        }
        for ( let k = 0; k < lostSeats.length; k++ ) {
          for ( let l = 0; l < this.inputBackSeatData.length; l++ ) {
            if ( lostSeats[k] === this.inputBackSeatData[l].seatsNo ) {
              this.inputBackSeatData.splice( l, 1 );
            }
          }
        }
      }
    },
    checkUpdateData() {
      this.confirmSymbol = 'update';
      this.customConfirm( this.$t( 'data.confirmChange' ) );

      if ( this.confirmUpdate ) {
        this.customPrompt( this.$t( 'data.alertAgain' ) );
      }
    },
    updateData() {
      const db = getDatabase( GetfirebaseConfig() );
      if ( this.promptUpdate ) {
        this.newSeatsNo( this.bookingData.goingTo );
        this.updateSeatsInfo();
        update( ref( db, `users/${this.userId}/${this.phoneNum}/${this.date}/${this.time}/goingTo` ), {
          ticketCount: this.bookingData.goingTo.ticketCount,
          price: this.bookingData.goingTo.price,
          seatsNo: this.bookingData.goingTo.seatsNo,
        } );
        update( ref( db, `bookedSeats/${this.bookingData.goingTo.date}/${this.bookingData.goingTo.trainNo}` ), {
          seatsData: this.inputSeatData,
        } );

        if ( this.bookingData.goingBack.trainNo ) {
          this.newSeatsNo( this.bookingData.goingBack );
          this.updateBackSeatsInfo();
          update( ref( db, `users/${this.userId}/${this.phoneNum}/${this.date}/${this.time}/goingBack` ), {
            ticketCount: this.bookingData.goingBack.ticketCount,
            price: this.bookingData.goingBack.price,
            seatsNo: this.bookingData.goingBack.seatsNo,
          } );
          update( ref( db, `bookedSeats/${this.bookingData.goingBack.date}/${this.bookingData.goingBack.trainNo}` ), {
            seatsData: this.inputBackSeatData,
          } );
        }
        this.customAlert( this.$t( 'data.success' ) );
        this.findBookingInfo();
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
  .confirm-area{
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
