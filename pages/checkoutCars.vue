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
          <v-container v-if="inputSeatData.length > 0">
              <div class="my-2">
                  <v-btn
                    color="indigo lighten-4"
                    small
                    @click="openSeatsList"
                  >
                      {{ $t('checkoutCars.seatList') }}
                  </v-btn>
              </div>
              <v-row v-show="seatsList" justify="start">
                  <v-col
                    v-for="seat in bookedSeats"
                    :key="`booked${seat}`"
                  >
                      <v-card
                        class="text-center"
                        width="30"
                      >
                          {{seat}}
                      </v-card>
                  </v-col>
              </v-row>
          </v-container>
          <v-container @keyup.esc="closeTable" v-if="inputSeatData.length > 0">
              <div
                v-if="goBookSys"
                class="text-center"
              >
                  <h2>{{ $t('checkoutCars.system') }}</h2>
                  <h3>{{ $t('checkoutCars.seatFirst') }}</h3>
                  <h3>{{ $t('checkoutCars.warnMes') }}</h3>
              </div>
              <v-row
                class="my-2"
                justify="end"
              >
                  <v-btn
                    v-if="selectedSeats.length > 0"
                    color="primary"
                    @click="openBookPanel"
                  >
                      {{ $t('checkoutCars.seatOK') }}
                  </v-btn>
                  <v-btn
                    v-if="goBookSys"
                    @click="cancelBook"
                  >
                      {{ $t('checkoutCars.closeSys') }}
                  </v-btn>
                  <v-btn
                    v-else
                    @click="readyBook"
                  >
                      {{ $t('checkoutCars.openSys') }}
                  </v-btn>
              </v-row>
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
                                            v-if="seatNum.booked === '0' && goBookSys"
                                          >
                                              <input
                                                v-model="selectedSeats"
                                                type="checkbox"
                                                name="label"
                                                :value="seatNum.No"
                                              >
                                                  <span class="round button">
                                                    {{seatNum.No}}
                                                  </span>
                                          </label>
                                          <label
                                            v-else-if="seatNum.booked === '0'"
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
                                            v-else-if="seatNum.booked === '1' && goBookSys "
                                            @click="openBookedPanel(seatNum.No)"
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
                                  <th>
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
                                  <th>
                                    {{ tooks.station }}
                                  </th>
                                  <td
                                    v-if="tooks.took"
                                    class="booked"
                                  >
                                      {{ $t('checkoutCars.token') }}
                                  </td>
                                  <td v-else>
                                      {{ $t('checkoutCars.free') }}
                                  </td>
                                  <td>
                                      {{ $t('checkoutCars.ID') }}:{{tooks.ID}}
                                      <br>
                                      {{ $t('checkoutCars.type') }}:{{tooks.type}}
                                  </td>
                              </tr>
                          </tbody>
                      </v-simple-table>
                  </v-col>
                  <v-col class="booking-form pa-0" v-show="bookPanel">
                      <v-simple-table>
                      <tbody>
                          <tr>
                              <th>{{ $t('booking.id') }}</th>
                              <td>
                                  <v-text-field
                                    v-model="userId"
                                    :rules="userIdRule"
                                    class="personal"
                                    success
                                  ></v-text-field>
                              </td>
                          </tr>
                          <tr>
                              <th>{{ $t('booking.phone') }}</th>
                              <td>
                                  <v-text-field
                                    v-model="phoneNum"
                                    :rules="phoneNumRule"
                                    class="personal"
                                    success
                                  ></v-text-field>
                              </td>
                          </tr>
                          <tr>
                              <th>{{ $t('booking.station') }}</th>
                              <td>
                                  <v-select
                                    v-model="searchInfo.departure"
                                    :items="stops"
                                    item-text="name"
                                    item-value="value"
                                    return-object
                                    :label="$t('booking.departure')"
                                    class="input d-inline-block mr-3"
                                    background-color="white"
                                  ></v-select>
                                  <v-select
                                    v-model="searchInfo.arrival"
                                    :items="stops"
                                    item-text="name"
                                    item-value="value"
                                    return-object
                                    :label="$t('booking.arrival')"
                                    class="input d-inline-block"
                                    background-color="white"
                                  ></v-select>
                              </td>
                          </tr>
                          <tr>
                              <th>{{ $t('booking.carType') }}</th>
                              <td>
                                  <v-radio-group v-model="carType">
                                      <v-radio
                                        :label="$t('booking.standard')"
                                        value="0"
                                      ></v-radio>
                                      <v-radio
                                        :label="$t('booking.business')"
                                        value="1"
                                      ></v-radio>
                                  </v-radio-group>
                              </td>
                              </tr>
                              <tr>
                              <th>{{ $t('booking.time') }}</th>
                              <td>
                                  <v-text-field
                                    v-model="dateSearch"
                                    type="date"
                                    :label="$t('booking.goDate')"
                                    class="input d-inline-block mr-3"
                                    background-color="white"
                                    disabled
                                  ></v-text-field>
                                  <v-text-field
                                    v-model="trainNo"
                                    :label="$t('booking.trainNo')"
                                    class="input d-inline-block"
                                    disabled
                                  ></v-text-field>
                                  <br>
                              </td>
                          </tr>
                          <tr>
                              <th>
                                  {{ $t('booking.ticket') }}
                                  ( {{totalSeat}} )
                              </th>
                              <td>
                                  <v-select
                                    v-model="ticketCount.adult"
                                    :items="ticketCountNums"
                                    item-text="num"
                                    item-value="value"
                                    :label="$t('booking.adultTick')"
                                    class="input d-inline-block mr-2"
                                    background-color="white"
                                  ></v-select>
                                  <v-select
                                    v-model="ticketCount.kid"
                                    :items="ticketCountNums"
                                    item-text="num"
                                    item-value="value"
                                    :label="$t('booking.kidTickL')"
                                    class="input d-inline-block mr-2"
                                    background-color="white"
                                  ></v-select>
                                  <v-select
                                    v-model="ticketCount.love"
                                    :items="ticketCountNums"
                                    item-text="num"
                                    item-value="value"
                                    :label="$t('booking.loveTick')"
                                    class="input d-inline-block mr-2"
                                    background-color="white"
                                  ></v-select>
                                  <v-select
                                    v-model="ticketCount.older"
                                    :items="ticketCountNums"
                                    item-text="num"
                                    item-value="value"
                                    :label="$t('booking.olderTickL')"
                                    class="input d-inline-block mr-2"
                                    background-color="white"
                                  ></v-select>
                                  <v-select
                                    v-model="ticketCount.student"
                                    :items="ticketCountNums"
                                    item-text="num"
                                    item-value="value"
                                    :label="$t('booking.studentTickL')"
                                    class="input d-inline-block"
                                    background-color="white"
                                  ></v-select>
                              </td>
                          </tr>
                          <tr>
                              <th>
                                  {{ $t('checkoutCars.seatNo') }}
                                  ( {{selectedSeats.length}} )
                                  <v-btn
                                    small
                                    @click="dealShowSeats"
                                  >
                                      {{ $t('checkoutCars.update') }}
                                  </v-btn>
                              </th>
                              <td>
                                  <div>
                                      <div v-if="ticketCount.adult > 0">
                                          <div>
                                              {{ $t('booking.adultTick') }}:
                                          </div>
                                          <span
                                            v-for="oneAdult in showType.adult"
                                            :key="oneAdult.index"
                                            class="mr-1"
                                          >
                                              {{oneAdult}}
                                          </span>
                                      </div>
                                      <div v-if="ticketCount.kid > 0">
                                          <div>
                                              {{ $t('booking.kidTick') }}:
                                          </div>
                                          <span
                                            v-for="kid in showType.kid"
                                            :key="kid.index"
                                            class="mr-1"
                                          >
                                              {{kid}}
                                          </span>
                                      </div>
                                      <div v-if="ticketCount.love > 0">
                                          <div>
                                              {{ $t('booking.loveTick') }}:
                                          </div>
                                          <span
                                            v-for="love in showType.love"
                                            :key="love.index"
                                            class="mr-1"
                                          >
                                              {{love}}
                                          </span>
                                      </div>
                                      <div v-if="ticketCount.older > 0">
                                          <div>
                                              {{ $t('booking.olderTick') }}:
                                          </div>
                                          <span
                                            v-for="older in showType.older"
                                            :key="older.index"
                                            class="mr-1"
                                          >
                                              {{older}}
                                          </span>
                                      </div>
                                      <div v-if="ticketCount.student > 0">
                                          <div>
                                              {{ $t('booking.studentTick') }}:
                                          </div>
                                          <span
                                            v-for="student in showType.student"
                                            :key="student.index"
                                            class="mr-1"
                                          >
                                              {{student}}
                                          </span>
                                      </div>
                                  </div>
                              </td>
                          </tr>
                          <tr>
                              <th>{{ $t('booking.price') }}</th>
                              <td>${{totalPrice}}</td>
                          </tr>
                      </tbody>
                      </v-simple-table>
                      <v-row class="foot-bar my-3" justify="space-around">
                          <v-btn
                            color="success"
                            @click="goBook"
                          >
                              {{ $t('booking.book') }}
                          </v-btn>
                          <v-btn
                            color="error"
                            @click="closePanel"
                          >
                              {{ $t('checkoutCars.closePanel') }}
                          </v-btn>
                      </v-row>
                  </v-col>
              </v-row>
          </v-container>
      </v-container>
    </v-app>
</template>

<script>
import axios from 'axios';
import {
  getDatabase, ref, child, get, set,
} from 'firebase/database';
import { GetAuthorizationHeader } from '~/assets/Authorization.js';
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';

export default {
  data() {
    return {
      trainNo: '',
      dateSearch: '',
      seats: [
        [], [], [], [], [], [], [], [], [], [],
      ],
      carNos: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      selectedCar: 0,
      showSelectedCar: 'A',
      inputSeatData: [],
      showInfos: {
        seatsNo: '',
        tookOrNot: [
          { station: '0990', took: false },
          { station: '1000', took: false },
          { station: '1010', took: false },
          { station: '1020', took: false },
          { station: '1030', took: false },
          { station: '1035', took: false },
          { station: '1040', took: false },
          { station: '1043', took: false },
          { station: '1047', took: false },
          { station: '1050', took: false },
          { station: '1060', took: false },
          { station: '1070', took: false },
        ],
      },
      bookedSeats: [],
      seatsList: false,
      goBookSys: false,
      selectedSeats: [],
      bookPanel: false,
      todayDate: '',
      todayTime: '',
      userId: '',
      phoneNum: '',
      phoneNumRule: [
        ( v ) => !!v || this.$t( 'booking.phoneRule0' ),
        ( v ) => ( v.length === 10 ) || this.$t( 'booking.phoneRule1' ),
      ],
      userIdRule: [
        ( v ) => !!v || this.$t( 'booking.idRule0' ),
        ( v ) => ( v.length === 10 ) || this.$t( 'booking.idRule1' ),
        ( v ) => /(?=.*[A-Z])/.test( v ) || this.$t( 'booking.idRule2' ),
      ],
      searchInfo: {
        departure: { name: this.$t( 'data.station0' ), value: '' },
        arrival: { name: this.$t( 'data.station0' ), value: '' },
      },
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
      carType: '',
      ticketCount: {
        adult: 0,
        kid: 0,
        love: 0,
        older: 0,
        student: 0,
      },
      ticketCountNums: [
        { num: 0, value: 0 },
        { num: 1, value: 1 },
        { num: 2, value: 2 },
        { num: 3, value: 3 },
        { num: 4, value: 4 },
        { num: 5, value: 5 },
        { num: 6, value: 6 },
        { num: 7, value: 7 },
        { num: 8, value: 8 },
        { num: 9, value: 9 },
        { num: 10, value: 10 },
      ],
      tookOrNot: [
        { station: '0990', took: false },
        { station: '1000', took: false },
        { station: '1010', took: false },
        { station: '1020', took: false },
        { station: '1030', took: false },
        { station: '1035', took: false },
        { station: '1040', took: false },
        { station: '1043', took: false },
        { station: '1047', took: false },
        { station: '1050', took: false },
        { station: '1060', took: false },
        { station: '1070', took: false },
      ],
      totalSeat: 0,
      totalPrice: 0,
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
      showType: {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      },
      trainTime: { departure: '', arrival: '' },
    };
  },
  created() {
    this.createSeats();
  },
  mounted() {
  },
  updated() {
    this.showSelectedCar = this.carNos[this.selectedCar];
  },
  watch: {
    ticketCount: {
      handler() {
        this.dealTicket();
      },
      deep: true,
    },
    searchInfo: {
      handler() {
        if ( this.searchInfo.departure.value !== '' && this.searchInfo.arrival.value !== '' ) {
          this.getPrice();
          if ( this.selectedSeats.length === 1 ) {
            this.watchStopCross();
          }
        }
      },
      deep: true,
    },
    carType: {
      handler() {
        if ( this.totalSeat > 0 ) {
          this.dealTicket();
        }
      },
    },
  },
  methods: {
    resetData() {
      this.inputSeatData = [];
      this.selectedSeats = [];
      this.selectedCar = 0;
      this.goBookSys = false;
      this.seatsList = false;
      this.bookPanel = false;
      this.userId = '';
      this.phoneNum = '';
      this.searchInfo.departure.value = '';
      this.searchInfo.arrival.value = '';
      this.carType = '';
      this.ticketCount = {
        adult: 0,
        kid: 0,
        love: 0,
        older: 0,
        student: 0,
      };
      this.tookOrNot = [
        { station: '0990', took: false },
        { station: '1000', took: false },
        { station: '1010', took: false },
        { station: '1020', took: false },
        { station: '1030', took: false },
        { station: '1035', took: false },
        { station: '1040', took: false },
        { station: '1043', took: false },
        { station: '1047', took: false },
        { station: '1050', took: false },
        { station: '1060', took: false },
        { station: '1070', took: false },
      ];
      this.totalSeat = 0;
      this.totalPrice = 0;
      this.fares = {
        freeKid: 0,
        standardKid: 0,
        standardGroup: 0,
        freeAdult: 0,
        standardAdult: 0,
        bussinessKid: 0,
        bussinessGroup: 0,
        bussinessAdult: 0,
      };
      this.showType = {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      };
      this.trainTime = { departure: '', arrival: '' };
    },
    createSeats() {
      this.seats = [
        [], [], [], [], [], [], [], [], [], [],
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
      for ( let i = 1; i < 21; i++ ) {
        item = { No: `A${i}`, booked: '0' };
        this.seats[0].push( item );
        item1 = { No: `B${i}`, booked: '0' };
        this.seats[1].push( item1 );
        item2 = { No: `C${i}`, booked: '0' };
        this.seats[2].push( item2 );
        item3 = { No: `D${i}`, booked: '0' };
        this.seats[3].push( item3 );
        item4 = { No: `E${i}`, booked: '0' };
        this.seats[4].push( item4 );
        item5 = { No: `F${i}`, booked: '0' };
        this.seats[5].push( item5 );
        item6 = { No: `G${i}`, booked: '0' };
        this.seats[6].push( item6 );
        item7 = { No: `H${i}`, booked: '0' };
        this.seats[7].push( item7 );
        item8 = { No: `I${i}`, booked: '0' };
        this.seats[8].push( item8 );
        item9 = { No: `J${i}`, booked: '0' };
        this.seats[9].push( item9 );
      }
    },
    getSeatsInfo() {
      if ( this.dateSearch === '' || this.trainNo === '' ) {
        alert( this.$t( 'data.alertWholeMes' ) );
        this.resetData();
        this.createSeats();
      } else {
        this.resetData();
        const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
        const date = this.dateSearch;
        const { trainNo } = this;
        get( child( dbRef, `bookedSeats/${date}/${trainNo}` ) ).then( ( snapshot ) => {
          if ( snapshot.exists() ) {
            const response = snapshot.val();
            this.inputSeatData = response.seatsData;
            this.createSeats();
            this.initSeatTable();
            this.buildSeatsList();
          } else {
            this.resetData();
            this.createSeats();
            this.trainNo = '';
            alert( this.$t( 'data.alertNoCarMes' ) );
          }
        } ).catch( ( error ) => {
          console.log( error );
        } );
      }
    },
    buildSeatsList() {
      let arr = [];
      const seats = [];
      let num = [];
      let str = '';
      for ( let i = 0; i < this.carNos.length; i++ ) {
        for ( let j = 0; j < this.inputSeatData.length; j++ ) {
          num = this.inputSeatData[j].seatsNo.split( '' );
          if ( num[0] === this.carNos[i] ) {
            if ( num[2] ) {
              str = `${num[1]}${num[2]}`;
              arr.push( str );
            } else {
              str = `${num[1]}`;
              arr.push( str );
            }
          }
        }
        arr.sort( ( a, b ) => a - b );
        for ( let k = 0; k < arr.length; k++ ) {
          arr[k] = `${this.carNos[i]}${arr[k]}`;
          seats.push( arr[k] );
        }
        arr = [];
      }
      this.bookedSeats = seats;
    },
    openSeatsList() {
      if ( this.seatsList ) {
        this.seatsList = false;
      } else {
        this.seatsList = true;
      }
    },
    initSeatTable() {
      if ( this.inputSeatData.length > 0 ) {
        const inputs = this.inputSeatData;
        const { seats } = this;
        let seat = {};
        let input = {};
        for ( let i = 0; i < inputs.length; i++ ) {
          for ( let j = 0; j < seats.length; j++ ) {
            seat = seats[j];
            for ( let k = 0; k < seat.length; k++ ) {
              if ( seat[k].No === inputs[i].seatsNo ) {
                input = inputs[i];
                for ( let l = 0; l < input.tookOrNot.length; l++ ) {
                  if ( input.tookOrNot[l].took === true ) {
                    seat[k].booked = '1';
                  }
                }
              }
            }
          }
        }
      }
    },
    readyBook() {
      this.goBookSys = true;
    },
    cancelBook() {
      this.getSeatsInfo();
    },
    openBookPanel() {
      if ( this.selectedSeats.length > 0 ) {
        this.bookPanel = true;
        this.createTime();
      } else {
        alert( this.$t( 'checkoutCars.alertSeat' ) );
      }
    },
    openBookedPanel( seatNo ) {
      if ( this.selectedSeats.length > 0 ) {
        this.selectedSeats = [];
        this.selectedSeats.push( seatNo );
        this.bookPanel = true;
        this.createTime();
        this.copyTookOrNot();
      } else {
        this.selectedSeats.push( seatNo );
        this.bookPanel = true;
        this.createTime();
        this.copyTookOrNot();
      }
    },
    watchStopCross() {
      const depart = parseInt( this.searchInfo.departure.value, 10 );
      const arrive = parseInt( this.searchInfo.arrival.value, 10 );
      const input = this.inputSeatData;
      let tooks = [];
      let station = null;
      for ( let i = 0; i < input.length; i++ ) {
        if ( this.selectedSeats[0] === input[i].seatsNo ) {
          for ( let j = 0; j < input[i].tookOrNot.length; j++ ) {
            tooks = input[i].tookOrNot[j];
            station = parseInt( tooks.station, 10 );
            if ( tooks.took ) {
              if ( depart < station && station <= arrive ) {
                this.searchInfo = {
                  departure: { name: this.$t( 'data.station0' ), value: '' },
                  arrival: { name: this.$t( 'data.station0' ), value: '' },
                };
                alert( this.$t( 'checkoutCars.include' ) );
                break;
              }
              if ( arrive < station && station <= depart ) {
                this.searchInfo = {
                  departure: { name: this.$t( 'data.station0' ), value: '' },
                  arrival: { name: this.$t( 'data.station0' ), value: '' },
                };
                alert( this.$t( 'checkoutCars.include' ) );
                break;
              }
            }
          }
        }
      }
    },
    copyTookOrNot() {
      for ( let i = 0; i < this.inputSeatData.length; i++ ) {
        if ( this.selectedSeats[0] === this.inputSeatData[i].seatsNo ) {
          this.tookOrNot = this.inputSeatData[i].tookOrNot;
        }
      }
    },
    closePanel() {
      this.bookPanel = false;
      this.stops = [
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
      ];
      this.ticketCount = {
        adult: 0,
        kid: 0,
        love: 0,
        older: 0,
        student: 0,
      };
      this.showType = {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      };
      this.totalPrice = 0;
      this.userId = '';
      this.phoneNum = '';
      this.searchInfo = {
        departure: { name: this.$t( 'data.station0' ), value: '' },
        arrival: { name: this.$t( 'data.station0' ), value: '' },
      };
    },
    createTime() {
      const fullDate = new Date();
      const yyyy = fullDate.getFullYear();
      const MM = ( fullDate.getMonth() + 1 ) >= 10 ? ( fullDate.getMonth() + 1 ) : ( `0${fullDate.getMonth() + 1}` );
      const dd = fullDate.getDate() < 10 ? ( `0${fullDate.getDate()}` ) : fullDate.getDate();
      const today = `${yyyy}-${MM}-${dd}`;
      this.todayDate = today;
      const hour = fullDate.getHours() < 10 ? ( `0${fullDate.getHours()}` ) : fullDate.getHours();
      const min = fullDate.getMinutes() < 10 ? ( `0${fullDate.getMinutes()}` ) : fullDate.getMinutes();
      const now = `${hour}:${min}`;
      this.todayTime = now;
    },
    getPrice() {
      const startStation = this.searchInfo.departure.value;
      const endStation = this.searchInfo.arrival.value;
      const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/ODFare/${startStation}/to/${endStation}?$top=30&$format=JSON`;
      if ( startStation !== '' && endStation !== '' ) {
        axios.get(
          url,
          { headers: GetAuthorizationHeader() },
        ).then( ( response ) => {
          const infos = [];
          let info = {};
          for ( let i = 0; i < response.data[0].Fares.length; i++ ) {
            info = response.data[0].Fares[i].Price;
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
    dealShowSeats( ) {
      const count = this.ticketCount;
      if ( count.adult > 0 ) {
        this.showType.adult = this.selectedSeats.slice( 0, count.adult );
      }
      if ( count.kid > 0 ) {
        this.showType.kid = this.selectedSeats.slice( count.adult, count.adult + count.kid );
      }
      const start = count.adult + count.kid;
      if ( count.love > 0 ) {
        this.showType.love = this.selectedSeats.slice( start, start + count.love );
      }
      const start1 = start + count.love;
      if ( count.older > 0 ) {
        this.showType.older = this.selectedSeats.slice( start1, start1 + count.older );
      }
      const start2 = start1 + count.older;
      if ( count.student > 0 ) {
        this.showType.student = this.selectedSeats.slice( start2, start2 + count.student );
      }
    },
    dealTicket() {
      this.countPrice();
      const count = this.ticketCount;
      const total = count.adult + count.kid + count.love + count.older + count.student;
      this.totalSeat = parseInt( total, 10 );
    },
    countPrice() {
      if ( this.carType === '0' ) {
        const total = 				this.fares.standardAdult * this.ticketCount.adult
				+ this.fares.standardKid * this.ticketCount.kid
				+ this.fares.standardKid * this.ticketCount.love
				+ this.fares.standardKid * this.ticketCount.older
				+ this.fares.standardGroup * this.ticketCount.student;
        this.totalPrice = total;
      } else if ( this.carType === '1' ) {
        const total2 =				this.fares.bussinessAdult * this.ticketCount.adult
				+ this.fares.bussinessKid * this.ticketCount.kid
				+ this.fares.bussinessKid * this.ticketCount.love
				+ this.fares.bussinessKid * this.ticketCount.older
				+ this.fares.bussinessGroup * this.ticketCount.student;
        this.totalPrice = total2;
      }
    },
    goBook() {
      if ( this.userId !== '' && this.phoneNum !== '' && this.carType !== '' && this.searchInfo.departure.value !== '' && this.searchInfo.arrival.value !== '' ) {
        this.checkTickets();
      } else {
        alert( this.$t( 'checkoutCars.needData' ) );
      }
    },
    checkTickets() {
      if ( this.totalSeat === this.selectedSeats.length && this.totalSeat > 0 ) {
        this.dealShowSeats();
        this.setTookOrNot();
        this.getTrainTime();
      } else {
        alert( this.$t( 'checkoutCars.tickErr' ) );
      }
    },
    setTookOrNot() {
      const depart = parseInt( this.searchInfo.departure.value, 10 );
      const arrive = parseInt( this.searchInfo.arrival.value, 10 );
      let station = null;
      if ( depart < arrive ) {
        for ( let i = 0; i < this.tookOrNot.length; i++ ) {
          station = parseInt( this.tookOrNot[i].station, 10 );
          if ( depart <= station && station < arrive ) {
            this.tookOrNot[i].took = true;
          }
        }
      } else {
        for ( let j = 0; j < this.tookOrNot.length; j++ ) {
          station = parseInt( this.tookOrNot[j].station, 10 );
          if ( depart >= station && station > arrive ) {
            this.tookOrNot[j].took = true;
          }
        }
      }
    },
    setSeatsData( ) {
      const seatsData = [];
      if ( this.inputSeatData.length > 0 ) {
        for ( let g = 0; g < this.inputSeatData.length; g++ ) {
          if ( this.inputSeatData[g].seatsNo !== this.selectedSeats[0] ) {
            seatsData.push( this.inputSeatData[g] );
          }
        }
      }
      return this.setSeatsType( seatsData );
    },
    setSeatsType( seatsData ) {
      let item = {};
      const info = JSON.stringify( this.tookOrNot );
      let took = {};
      for ( let a = 0; a < this.showType.adult.length; a++ ) {
        took = JSON.parse( info );
        for ( let b = 0; b < took.length; b++ ) {
          if ( took[b].took && !took[b].type ) {
            took[b].type = 'adult';
            took[b].ID = this.userId;
            item = { 	seatsNo: this.showType.adult[a],	tookOrNot: took };
          }
        }
        seatsData.push( item );
      }
      for ( let a = 0; a < this.showType.kid.length; a++ ) {
        took = JSON.parse( info );
        for ( let b = 0; b < took.length; b++ ) {
          if ( took[b].took && !took[b].type ) {
            took[b].type = 'kid';
            took[b].ID = this.userId;
            item = { 	seatsNo: this.showType.kid[a],	tookOrNot: took };
          }
        }
        seatsData.push( item );
      }
      for ( let a = 0; a < this.showType.love.length; a++ ) {
        took = JSON.parse( info );
        for ( let b = 0; b < took.length; b++ ) {
          if ( took[b].took && !took[b].type ) {
            took[b].type = 'love';
            took[b].ID = this.userId;
            item = { 	seatsNo: this.showType.love[a],	tookOrNot: took };
          }
        }
        seatsData.push( item );
      }
      for ( let a = 0; a < this.showType.older.length; a++ ) {
        took = JSON.parse( info );
        for ( let b = 0; b < took.length; b++ ) {
          if ( took[b].took && !took[b].type ) {
            took[b].type = 'elder';
            took[b].ID = this.userId;
            item = { 	seatsNo: this.showType.older[a],	tookOrNot: took };
          }
        }
        seatsData.push( item );
      }
      for ( let a = 0; a < this.showType.student.length; a++ ) {
        took = JSON.parse( info );
        for ( let b = 0; b < took.length; b++ ) {
          if ( took[b].took && !took[b].type ) {
            took[b].type = 'student';
            took[b].ID = this.userId;
            item = { 	seatsNo: this.showType.student[a],	tookOrNot: took };
          }
        }
        seatsData.push( item );
      }
      return seatsData;
    },
    getTrainTime() {
      const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/GeneralTimetable/TrainNo/${this.trainNo}?%24top=30&%24format=JSON`;
      axios.get(
        url,
        { headers: GetAuthorizationHeader() },
      ).then( ( response ) => {
        if ( response.data.length > 0 ) {
          const data = response.data[0].GeneralTimetable.StopTimes;
          for ( let i = 0; i < data.length; i++ ) {
            if ( data[i].StationID === this.searchInfo.departure.value ) {
              this.trainTime.departure = data[i].DepartureTime;
            } else if ( data[i].StationID === this.searchInfo.arrival.value ) {
              this.trainTime.arrival = data[i].ArrivalTime;
            }
          }
          const direction = response.data[0].GeneralTimetable.GeneralTrainInfo.Direction;
          const depart = parseInt( this.searchInfo.departure.value, 10 );
          const arrive = parseInt( this.searchInfo.arrival.value, 10 );
          if ( direction === 0 && depart < arrive ) {
            this.oneWayBook();
          } else if ( direction === 1 && depart > arrive ) {
            this.oneWayBook();
          } else {
            alert( this.$t( 'checkoutCars.directERR' ) );
          }
        } else {
          alert( this.$t( 'checkoutCars.noStop' ) );
        }
      } )
        .catch( ( error ) => {
          console.log( error );
        } );
    },
    oneWayBook() {
      const sureToBook = confirm( this.$t( 'checkoutCars.sure' ) );
      if ( sureToBook ) {
        const db = getDatabase( GetfirebaseConfig() );
        set( ref( db, `users/${this.userId}/${this.phoneNum}/${this.todayDate}/${this.todayTime}/goingTo` ), {
          startStation: this.searchInfo.departure,
          endStation: this.searchInfo.arrival,
          carType: this.carType,
          date: this.dateSearch,
          trainNo: this.trainNo,
          departTime: this.trainTime.departure,
          arrivalTime: this.trainTime.arrival,
          ticketCount: this.ticketCount,
          seatsNo: this.selectedSeats,
          price: this.totalPrice,
        } );
        const seatsData = this.setSeatsData();
        set( ref( db, `bookedSeats/${this.dateSearch}/${this.trainNo}` ), {
          seatsData,
        } )
          .then( () => {
            alert( this.$t( 'data.bookSuccess' ) );
            this.getSeatsInfo();
          } )
          .catch( () => {
            alert( this.$t( 'data.bookAgain' ) );
          } );
      }
    },
    keyInCarNo( index ) {
      this.selectedCar = index;
    },
    checkInfo( value ) {
      this.showInfos = {
        seatsNo: '',
        tookOrNot: [
          { station: '0990', took: false },
          { station: '1000', took: false },
          { station: '1010', took: false },
          { station: '1020', took: false },
          { station: '1030', took: false },
          { station: '1035', took: false },
          { station: '1040', took: false },
          { station: '1043', took: false },
          { station: '1047', took: false },
          { station: '1050', took: false },
          { station: '1060', took: false },
          { station: '1070', took: false },
        ],
      };
      this.rebuildInfo( this.showInfos );
      if ( this.inputSeatData.length > 0 ) {
        for ( let i = 0; i < this.inputSeatData.length; i++ ) {
          if ( value === this.inputSeatData[i].seatsNo ) {
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
      const inputData = info;
      for ( let i = 0; i < info.tookOrNot.length; i++ ) {
        if ( info.tookOrNot[i].station === '0990' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station1' );
        } else if ( info.tookOrNot[i].station === '1000' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station2' );
        } else if ( info.tookOrNot[i].station === '1010' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station3' );
        } else if ( info.tookOrNot[i].station === '1020' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station4' );
        } else if ( info.tookOrNot[i].station === '1030' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station5' );
        } else if ( info.tookOrNot[i].station === '1035' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station6' );
        } else if ( info.tookOrNot[i].station === '1040' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station7' );
        } else if ( info.tookOrNot[i].station === '1043' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station8' );
        } else if ( info.tookOrNot[i].station === '1047' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station9' );
        } else if ( info.tookOrNot[i].station === '1050' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station10' );
        } else if ( info.tookOrNot[i].station === '1060' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station11' );
        } else if ( info.tookOrNot[i].station === '1070' ) {
          inputData.tookOrNot[i].station = this.$t( 'checkoutCars.station12' );
        }
      }
    },
    closeTable() {
      this.showInfos = {
        seatsNo: '',
        tookOrNot: [
          { station: '0990', took: false },
          { station: '1000', took: false },
          { station: '1010', took: false },
          { station: '1020', took: false },
          { station: '1030', took: false },
          { station: '1035', took: false },
          { station: '1040', took: false },
          { station: '1043', took: false },
          { station: '1047', took: false },
          { station: '1050', took: false },
          { station: '1060', took: false },
          { station: '1070', took: false },
        ],
      };
    },
  },
};
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
    right: 25%;
    width: 50%;
    z-index: 3;
    border: 2px solid black;
  }
  .no-hover{
    background-color: transparent !important;
  }
  .info-table td{
    position: relative;
    border: none !important;
    padding: 0 !important;
    text-align: center;
  }
  .info-table th{
    border: none !important;
    padding: 0 !important;
    text-align: center !important;
  }
  .info-table tr span{
    position: absolute;
    padding: 2%;
    top: 0;
    right: 0;
  }
  .info-table tr span:hover{
    background: rgb(255, 40, 76);
    color: white;
    cursor: pointer;
  }
  .booked{
    color: tomato;
  }
  .booking-form{
    background: white;
    position: absolute;
    top: 25%;
    right: 25%;
    width: 50%;
    z-index: 3;
    border: 2px solid black;
  }
  .booking-form td{
    border: none !important;
    padding: 0 !important;
  }
  .booking-form th{
    border: none !important;
    padding: 0 !important;
  }
	.booking-form .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
	.booking-form .v-data-table > .v-data-table__wrapper > table > thead > tr > th{
		text-align: center !important;
		font-size: 1rem;
	}
	.booking-form .v-data-table > .v-data-table__wrapper > table > tbody > tr > td{
		font-size: 16px;
	}
  .w-100{
    width: 100%;
  }
	.input{
		width: 100px;
	}
  .personal{
    width: 150px;
  }
	@media (max-width: 1000px) {
		.seat-choice{
			width: 95%;
		}
    .info-table{
      width: 70%;
      right: 10%;
      top: 30%;
    }
    .booking-form{
      width: 70%;
      right: 10%;
      top: 30%;
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
      right: 8%;
      top: 30%;
    }
    .booking-form{
      width: 80%;
      right: 8%;
      top: 30%;
    }
	}
</style>
