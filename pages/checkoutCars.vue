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
        <v-container class="select-area">
            <v-alert
              v-if="select"
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
                        <v-select
                          v-model="selectedDelete"
                          :items="userList"
                          item-text="name"
                          item-value="value"
                          :label="selectMes"
                          class="mx-auto"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                          color="black"
                          dark
                          @click="checkSelect"
                        >OK</v-btn>
                        <v-btn
                          color="grey lighten-3"
                          light
                          @click="closeSelect"
                        >X</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </v-container>
        <v-container class="select-area">
            <v-alert
              v-if="select2"
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
                        <v-select
                          v-model="selectedDelete"
                          :items="userList"
                          item-text="name"
                          item-value="value"
                          :label="selectMes"
                          class="mx-auto"
                        >
                        </v-select>
                    </v-col>
                    <v-col>
                        <v-select
                          v-model="selectedType"
                          :items="tickType"
                          item-text="name"
                          item-value="value"
                          :label="$t('checkoutCars.selectType')"
                          class="mx-auto"
                        >
                        </v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                          color="black"
                          dark
                          @click="checkUpdate"
                        >OK</v-btn>
                        <v-btn
                          color="grey lighten-3"
                          light
                          @click="closeUpdate"
                        >X</v-btn>
                    </v-col>
                </v-row>
            </v-alert>
        </v-container>
        <v-container class="checkout-cars">
          <v-container>
              <v-row align="center">
                  <v-col cols="12" sm="5">
                      <h1>{{ $t('checkoutCars.title') }}</h1>
                  </v-col>
                  <v-col cols="12" sm="7" class="text-center">
                      <v-row justify="space-around">
                          <div class="my-1">
                              <v-btn
                                nuxt
                                :to="localePath('/manage')"
                                outlined
                              >
                                  {{ $t('checkoutCars.manage') }}
                              </v-btn>
                          </div>
                          <div class="my-1">
                              <v-btn
                                nuxt
                                :to="localePath('/manageBook')"
                                color="teal"
                                outlined
                              >
                                  {{ $t('manage.manageBook') }}
                              </v-btn>
                          </div>
                          <div class="my-1">
                              <v-btn
                                nuxt
                                :to="localePath('/')"
                                color="primary"
                              >
                                  {{ $t('checkoutCars.index') }}
                              </v-btn>
                          </div>
                      </v-row>
                  </v-col>
              </v-row>
          </v-container>
          <v-container>
              <v-form
                ref="form"
                lazy-validation
              >
                  <v-row align="center" justify="center">
                      <v-col cols="12" sm="4" md="2">
                          <v-select
                            :items="dateList"
                            v-model="dateSearch"
                            :label="$t('checkoutCars.date')"
                            class="data-input mx-auto"
                          ></v-select>
                      </v-col>
                      <v-col cols="12" sm="4" md="2">
                          <v-select
                            v-model="trainNo"
                            :items="trainList"
                            :label="$t('checkoutCars.trainNo')"
                            class="data-input mx-auto"
                          >
                          </v-select>
                      </v-col>
                      <v-col cols="12" sm="4" md="2">
                          <v-select
                            v-model="direction"
                            :items="sOrN"
                            item-text="name"
                            item-value="value"
                            :label="$t('checkoutCars.direction')"
                            class="data-input mx-auto"
                          >
                          </v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                          <v-select
                            v-model="searchInfo.departure"
                            :label="$t('index.departure')"
                            :items="stops"
                            item-text="name"
                            item-value="value"
                            class="data-input mx-auto"
                            return-object
                            background-color="white"
                          ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="2">
                          <v-select
                            v-model="searchInfo.arrival"
                            :label="$t('index.arrival')"
                            :items="stops"
                            item-text="name"
                            item-value="value"
                            class="data-input mx-auto"
                            return-object
                            background-color="white"
                          ></v-select>
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
                  </v-row>
              </v-form>
          </v-container>
          <v-container>
              <div class="my-2">
                  <v-btn
                    color="indigo lighten-4"
                    small
                    @click="openTrainLists"
                  >
                      {{ $t('checkoutCars.trainNoList') }}
                  </v-btn>
              </div>
              <div
                v-show="showTrainNos"
                v-for="trainNo in trainNoLists"
                :key="`No${trainNo.GeneralTrainInfo.TrainNo}`"
                class="ma-3"
              >
                  <div
                    class="train-no"
                    @click="selectTrain(trainNo.GeneralTrainInfo.TrainNo)"
                  >
                      <span>
                          {{ $t('checkoutCars.No') }}{{trainNo.GeneralTrainInfo.TrainNo}}
                      </span>
                      <br>
                      {{ $t('checkoutCars.stops') }}{{trainNo.StopTimes.length}}
                  </div>
                  <v-simple-table
                    v-if="selectedTrain === trainNo.GeneralTrainInfo.TrainNo"
                  >
                      <template v-slot:default>
                          <thead>
                              <tr>
                                  <th>
                                      {{ $t('checkoutCars.station') }}
                                  </th>
                                  <th>
                                      {{ $t('checkoutCars.arrivalTime') }}
                                  </th>
                                  <th>
                                      {{ $t('checkoutCars.departureTime') }}
                                  </th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr
                                v-for="stop in trainNo.StopTimes"
                                :key="`stop${stop.StationID}`"
                              >
                                  <td class="text-center">
                                      <span
                                        v-if="$i18n.locale === 'en' "
                                      >
                                          {{stop.StationName.En}}
                                      </span>
                                      <span
                                        v-if="$i18n.locale === 'tw' "
                                      >
                                          {{stop.StationName.Zh_tw}}
                                      </span>
                                  </td>
                                  <td class="text-center">
                                      {{stop.ArrivalTime}}
                                  </td>
                                  <td class="text-center">
                                      {{stop.DepartureTime}}
                                  </td>
                              </tr>
                          </tbody>
                      </template>
                  </v-simple-table>
              </div>
          </v-container>
          <v-container  v-show="showPanel">
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
          <v-container v-show="showPanel">
              <div
                v-if="goBookSys"
                class="text-center"
              >
                  <h2>{{ $t('checkoutCars.system') }}</h2>
                  <h3>{{ $t('checkoutCars.seatFirst') }}</h3>
                  <h3>{{ $t('checkoutCars.warnMes') }}</h3>
              </div>
              <v-row
                justify="end"
              >
                  {{ $t('checkoutCars.stationFirst') }}
              </v-row>
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
                    :disabled="readyBookDisable"
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
                                            v-else
                                            @click="checkInfo(seatNum.No, true)"
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
                    v-if="showInfos.seatsNo && inputSeatData.length > 0"
                    class="info-table pa-0"
                  >
                      <v-simple-table>
                          <tbody>
                              <tr class="no-hover">
                                  <th></th>
                                  <td class="text-right">
                                      <v-btn
                                        v-if="showDelete && readyBookDisable === false"
                                        color="error"
                                        small
                                        @click="deleteSeatInfo"
                                      >
                                          {{ $t('checkoutCars.deleteBTN') }}
                                      </v-btn>
                                  </td>
                                  <td>
                                      <v-btn
                                        v-if="showDelete && readyBookDisable === false"
                                        color="cyan"
                                        small
                                        class="mx-auto"
                                        @click="updateSeatInfo"
                                      >
                                          {{ $t('checkoutCars.updateBTN') }}
                                      </v-btn>
                                      <span @click="closeTable">X</span>
                                  </td>
                              </tr>
                              <tr @click="closeTable">
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
                                @click="closeTable"
                              >
                                  <th>
                                    {{ tooks.station }}
                                  </th>
                                  <td
                                    v-if="tooks.took"
                                    class="booked"
                                  >
                                      {{ $t('checkoutCars.token') }}
                                      <br>
                                      {{ $t('checkoutCars.type') }}:{{tooks.showType}}
                                  </td>
                                  <td v-else>
                                      {{ $t('checkoutCars.free') }}
                                  </td>
                                  <td>
                                      {{ $t('checkoutCars.ID') }}:{{tooks.ID}}
                                      <br>
                                      {{ $t('checkoutCars.phone') }}:{{tooks.phone}}
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
                                    disabled
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
                                    disabled
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
                                  <v-row>
                                      <v-col
                                        v-for="type in ticketCount"
                                        :key="type.index"
                                      >
                                          <v-select
                                            v-model="type.value"
                                            :items="ticketCountNums"
                                            item-text="num"
                                            item-value="value"
                                            :label="type.name"
                                            class="input d-inline-block"
                                            background-color="white"
                                          ></v-select>
                                      </v-col>
                                  </v-row>
                              </td>
                          </tr>
                          <tr>
                              <th>
                                  {{ $t('checkoutCars.seatNo') }}
                                  ( {{selectedSeats.length}} )
                              </th>
                              <td>
                                  <div>
                                      <div v-if="ticketCount.adult.value > 0">
                                          <span>
                                              {{ $t('booking.adultTick') }}:
                                          </span>
                                          <span
                                            v-for="oneAdult in showType.adult"
                                            :key="oneAdult.index"
                                            class="mr-1"
                                          >
                                              {{oneAdult}}
                                          </span>
                                      </div>
                                      <div v-if="ticketCount.kid.value > 0">
                                          <span>
                                              {{ $t('booking.kidTick') }}:
                                          </span>
                                          <span
                                            v-for="kid in showType.kid"
                                            :key="kid.index"
                                            class="mr-1"
                                          >
                                              {{kid}}
                                          </span>
                                      </div>
                                      <div v-if="ticketCount.love.value > 0">
                                          <span>
                                              {{ $t('booking.loveTick') }}:
                                          </span>
                                          <span
                                            v-for="love in showType.love"
                                            :key="love.index"
                                            class="mr-1"
                                          >
                                              {{love}}
                                          </span>
                                      </div>
                                      <div v-if="ticketCount.older.value > 0">
                                          <span>
                                              {{ $t('booking.olderTick') }}:
                                          </span>
                                          <span
                                            v-for="older in showType.older"
                                            :key="older.index"
                                            class="mr-1"
                                          >
                                              {{older}}
                                          </span>
                                      </div>
                                      <div v-if="ticketCount.student.value > 0">
                                          <span>
                                              {{ $t('booking.studentTick') }}:
                                          </span>
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
// import axios from 'axios';
import {
  getDatabase, ref, child, get, set, update,
} from 'firebase/database';
// import { GetAuthorizationHeader } from '~/assets/Authorization.js';
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';

export default {
  async asyncData() {
    const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
    const dateResult = await get( child( dbRef, 'bookedSeats/' ) )
      .then( ( snapshot ) => Object.keys( snapshot.val() ) );
    const searchList = [
      '0803', '0609', '0813', '0125', '0829', '0141', '0845', '0853', '0861', '0295',
    ];
    const result = [];
    for ( let j = 0; j < searchList.length; j++ ) {
      const dataResult = get( child( dbRef, `oneTrains/info/No${searchList[j]}` ) )
        .then( ( snapshot ) => snapshot.val() );
      result.push( dataResult );
    }
    return {
      trainNoLists: await Promise.all( result ),
      dateList: dateResult,
    };
  },
  data() {
    return {
      alert: false,
      message: '',
      confirm: false,
      confirmMes: '',
      confirmValue: false,
      select: false,
      select2: false,
      selectMes: '',
      showPanel: false,
      readyBookDisable: true,
      showDelete: false,
      dateList: [],
      trainList: [],
      showTrainNos: false,
      trainNoLists: [],
      selectedTrain: '',
      direction: 0,
      sOrN: [
        { name: this.$t( 'checkoutCars.toSouth' ), value: 0 },
        { name: this.$t( 'checkoutCars.toNorth' ), value: 1 },
      ],
      toSouth: [],
      toNorth: [],
      trainNo: '',
      dateSearch: '',
      trainData: {},
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
      tickType: [
        { name: this.$t( 'manage.adult' ), value: 'adult' },
        { name: this.$t( 'manage.kid' ), value: 'kid' },
        { name: this.$t( 'manage.love' ), value: 'love' },
        { name: this.$t( 'manage.older' ), value: 'elder' },
        { name: this.$t( 'manage.student' ), value: 'student' },
      ],
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
        adult: { name: `${this.$t( 'booking.adultTick' )}`, value: 0 },
        kid: { name: `${this.$t( 'booking.kidTickL' )}`, value: 0 },
        love: { name: `${this.$t( 'booking.loveTick' )}`, value: 0 },
        older: { name: `${this.$t( 'booking.olderTickL' )}`, value: 0 },
        student: { name: `${this.$t( 'booking.studentTick' )}`, value: 0 },
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
      userList: [],
      user: {},
      selectedDelete: '',
      callData: {},
      callType: '',
      direct: '',
      selectedType: '',
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
  watch: {
    dateSearch: {
      handler() {
        this.getTrainList();
      },
    },
    trainNo: {
      handler() {
        this.getTrainStops();
      },
    },
    direction: {
      handler() {
        this.madeTrainList();
        this.getAnotherList();
      },
    },
    ticketCount: {
      handler() {
        this.dealTicket();
        this.dealShowSeats();
      },
      deep: true,
    },
    searchInfo: {
      handler() {
        if ( this.searchInfo.departure.value !== '' && this.searchInfo.arrival.value !== '' ) {
          this.getPrice( this.searchInfo.departure.value, this.searchInfo.arrival.value );
          this.getTrainTime();
        }
      },
      deep: true,
    },
    carType: {
      handler() {
        this.dealTicket();
      },
    },
    selectedCar: {
      handler() {
        this.showSelectedCar = this.carNos[this.selectedCar];
      },
    },
    confirmValue: {
      handler() {
        if ( this.confirmValue && this.showDelete
        && this.selectedType !== '' ) {
          this.rebuildUserDataU( this.callData, this.callType );
        } else if ( this.confirmValue && this.showDelete ) {
          this.rebuildUserData( this.callData, this.callType );
        } else if ( this.confirmValue ) {
          this.oneWayBook();
        }
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
      this.confirmValue = false;
      this.confirm = false;
    },
    OKConfirm() {
      this.confirmValue = true;
      this.confirm = false;
    },
    selectTrain( value ) {
      if ( this.selectedTrain === value ) {
        this.selectedTrain = '';
      } else {
        this.selectedTrain = '';
        this.selectedTrain = value;
      }
    },
    async getAnotherList() {
      const searchList = [
        '0803', '0609', '0813', '0125', '0829', '0141', '0845', '0853', '0861', '0295',
      ];
      const searchList2 = [
        '0802', '0610', '0814', '0630', '0830', '0654', '0846', '0854', '0862', '0294',
      ];
      let result = [];
      let condition = [];
      if ( this.direction === 0 ) {
        condition = searchList;
      } else {
        condition = searchList2;
      }
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      for ( let j = 0; j < condition.length; j++ ) {
        const dataResult = get( child( dbRef, `oneTrains/info/No${condition[j]}` ) )
          .then( ( snapshot ) => snapshot.val() );
        result.push( dataResult );
      }
      result = await Promise.all( result );
      this.trainNoLists = result;
    },
    openTrainLists() {
      if ( this.showTrainNos === false ) {
        this.showTrainNos = true;
      } else {
        this.showTrainNos = false;
      }
    },
    resetData() {
      this.inputSeatData = [];
      this.selectedSeats = [];
      this.bookedSeats = [];
      this.selectedCar = 0;
      this.goBookSys = false;
      this.seatsList = false;
      this.bookPanel = false;
      this.confirmValue = false;
      this.showPanel = false;
      this.userId = '';
      this.phoneNum = '';
      this.carType = '';
      this.ticketCount = {
        adult: { name: `${this.$t( 'booking.adultTick' )}`, value: 0 },
        kid: { name: `${this.$t( 'booking.kidTickL' )}`, value: 0 },
        love: { name: `${this.$t( 'booking.loveTick' )}`, value: 0 },
        older: { name: `${this.$t( 'booking.olderTickL' )}`, value: 0 },
        student: { name: `${this.$t( 'booking.studentTick' )}`, value: 0 },
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
      this.showType = {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      };
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
    // getTrainList() {
    //   if ( this.dateSearch !== '' ) {
    //     const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
    //     get( child( dbRef, `bookedSeats/${this.dateSearch}` ) )
    //       .then( ( snapshot ) => {
    //         if ( snapshot.exists() ) {
    //           this.trainList = Object.keys( snapshot.val() );
    //         }
    //       } );
    //   }
    // },
    getTrainList() {
      if ( this.dateSearch !== '' ) {
        const searchList = [
          '0803', '0609', '0813', '0125', '0829', '0141', '0845', '0853', '0861', '0295',
          '0802', '0610', '0814', '0630', '0830', '0654', '0846', '0854', '0862', '0294',
        ];
        const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
        for ( let j = 0; j < searchList.length; j++ ) {
          get( child( dbRef, `oneTrains/info/No${searchList[j]}` ) )
            .then( ( snapshot ) => {
              if ( snapshot.exists() ) {
                if ( snapshot.val().GeneralTrainInfo.Direction === 0 ) {
                  this.toSouth.push( searchList[j] );
                } else if ( snapshot.val().GeneralTrainInfo.Direction === 1 ) {
                  this.toNorth.push( searchList[j] );
                }
                this.madeTrainList();
              }
            } );
        }
      }
    },
    madeTrainList() {
      if ( this.direction === 0 ) {
        this.trainList = JSON.parse( JSON.stringify( this.toSouth ) );
      } else if ( this.direction === 1 ) {
        this.trainList = JSON.parse( JSON.stringify( this.toNorth ) );
      }
    },
    // getTrainStops() {
    //   if ( this.trainNo !== '' ) {
    //     this.stops = [
    //       { name: this.$t( 'data.station0' ), value: '' },
    //       { name: this.$t( 'data.station1' ), value: '0990' },
    //       { name: this.$t( 'data.station2' ), value: '1000' },
    //       { name: this.$t( 'data.station3' ), value: '1010' },
    //       { name: this.$t( 'data.station4' ), value: '1020' },
    //       { name: this.$t( 'data.station5' ), value: '1030' },
    //       { name: this.$t( 'data.station6' ), value: '1035' },
    //       { name: this.$t( 'data.station7' ), value: '1040' },
    //       { name: this.$t( 'data.station8' ), value: '1043' },
    //       { name: this.$t( 'data.station9' ), value: '1047' },
    //       { name: this.$t( 'data.station10' ), value: '1050' },
    //       { name: this.$t( 'data.station11' ), value: '1060' },
    //       { name: this.$t( 'data.station12' ), value: '1070' },
    //     ];
    //     this.searchInfo = {
    //       departure: { name: this.$t( 'data.station0' ), value: '' },
    //       arrival: { name: this.$t( 'data.station0' ), value: '' },
    //     };
    //     const url = `https://ptx.transportdata.tw/MOTC/v2/Rail/THSR/GeneralTimetable/TrainNo/${this.trainNo}?%24top=30&%24format=JSON`;
    //     axios.get(
    //       url,
    //       { headers: GetAuthorizationHeader() },
    //     ).then( ( response ) => {
    //       if ( response.data.length > 0 ) {
    //         this.trainData = response.data[0].GeneralTimetable;
    //         const res = response.data[0].GeneralTimetable.StopTimes;
    //         const exactStops = [];
    //         for ( let i = 0; i < res.length; i++ ) {
    //           exactStops.push( res[i].StationID );
    //         }
    //         exactStops.sort();
    //         const newStops = [];
    //         for ( let j = 0; j < exactStops.length; j++ ) {
    //           for ( let k = 0; k < this.stops.length; k++ ) {
    //             if ( exactStops[j] === this.stops[k].value ) {
    //               newStops.push( this.stops[k] );
    //             }
    //           }
    //         }
    //         this.stops = newStops;
    //       } else {
    //         this.customAlert( this.$t( 'checkoutCars.noStop' ) );
    //       }
    //     } );
    //   }
    // },
    getTrainStops() {
      if ( this.trainNo !== '' ) {
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
        this.searchInfo = {
          departure: { name: this.$t( 'data.station0' ), value: '' },
          arrival: { name: this.$t( 'data.station0' ), value: '' },
        };
        const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
        get( child( dbRef, `oneTrains/info/No${this.trainNo}` ) )
          .then( ( snapshot ) => {
            if ( Object.keys( snapshot.val() ).length > 0 ) {
              this.trainData = snapshot.val();
              const res = snapshot.val().StopTimes;
              const exactStops = [];
              for ( let i = 0; i < res.length; i++ ) {
                exactStops.push( res[i].StationID );
              }
              exactStops.sort();
              const newStops = [];
              for ( let j = 0; j < exactStops.length; j++ ) {
                for ( let k = 0; k < this.stops.length; k++ ) {
                  if ( exactStops[j] === this.stops[k].value ) {
                    newStops.push( this.stops[k] );
                  }
                }
              }
              this.stops = newStops;
            } else {
              this.customAlert( this.$t( 'checkoutCars.f' ) );
            }
          } );
      }
    },
    getSeatsInfo() {
      if ( this.dateSearch === '' || this.trainNo === '' ) {
        this.customAlert( this.$t( 'data.alertWholeMes' ) );
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
            if ( this.searchInfo.departure.value === ''
            || this.searchInfo.arrival.value === '' ) {
              this.initSeatTable();
              this.buildSeatsList();
              this.showPanel = true;
              this.readyBookDisable = true;
            } else {
              this.initSeatTableS();
              this.buildSeatsList();
              this.showPanel = true;
              this.readyBookDisable = false;
            }
          } else if ( this.searchInfo.departure.value === ''
            || this.searchInfo.arrival.value === '' ) {
            this.resetData();
            this.createSeats();
            this.showPanel = true;
            this.readyBookDisable = true;
          } else {
            this.resetData();
            this.createSeats();
            this.showPanel = true;
            this.readyBookDisable = false;
          }
        } ).catch( ( error ) => {
          console.error( error );
        } );
      }
    },
    buildSeatsList() {
      let arr = [];
      const seats = [];
      let num = [];
      let str = '';
      let seat = [];
      const seatArr = [];
      for ( let a = 0; a < this.seats.length; a++ ) {
        seat = this.seats[a];
        for ( let b = 0; b < seat.length; b++ ) {
          if ( seat[b].booked === '1' ) {
            seatArr.push( seat[b].No );
          }
        }
      }
      for ( let i = 0; i < this.carNos.length; i++ ) {
        for ( let j = 0; j < seatArr.length; j++ ) {
          num = seatArr[j].split( '' );
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
    initSeatTableS() {
      if ( this.inputSeatData.length > 0 ) {
        const inputs = this.inputSeatData;
        const { seats } = this;
        let input = {};
        let seat = [];
        for ( let i = 0; i < inputs.length; i++ ) {
          for ( let j = 0; j < seats.length; j++ ) {
            seat = seats[j];
            for ( let k = 0; k < seat.length; k++ ) {
              if ( seat[k].No === inputs[i].seatsNo ) {
                input = inputs[i];
                for ( let l = 0; l < input.tookOrNot.length; l++ ) {
                  if ( this.searchInfo.arrival.value > this.searchInfo.departure.value ) {
                    if ( this.searchInfo.departure.value <= input.tookOrNot[l].station
										&& input.tookOrNot[l].station < this.searchInfo.arrival.value ) {
                      if ( input.tookOrNot[l].took === true ) {
                        seat[k].booked = '1';
                        break;
                      }
                    }
                  } else if ( this.searchInfo.arrival.value < input.tookOrNot[l].station
									&& input.tookOrNot[l].station <= this.searchInfo.departure.value ) {
                    if ( input.tookOrNot[l].took === true ) {
                      seat[k].booked = '1';
                      break;
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    keyInCarNo( index ) {
      this.selectedCar = index;
    },
    checkInfo( value, status ) {
      if ( status ) {
        this.showDelete = status;
      }
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
            const result = this.rebuildInfo( this.inputSeatData[i] );
            this.showInfos = this.rebuildType( result );
          }
        }
      } else {
        this.showInfos.seatsNo = value;
      }
    },
    rebuildInfo( info ) {
      const copy = JSON.stringify( info );
      const inputData = JSON.parse( copy );
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
      return inputData;
    },
    rebuildType( inputData ) {
      const data = inputData;
      for ( let i = 0; i < data.tookOrNot.length; i++ ) {
        if ( data.tookOrNot[i].type === 'adult' ) {
          data.tookOrNot[i].showType = this.$t( 'manage.adult' );
        } else if ( data.tookOrNot[i].type === 'kid' ) {
          data.tookOrNot[i].showType = this.$t( 'manage.kid' );
        } else if ( data.tookOrNot[i].type === 'love' ) {
          data.tookOrNot[i].showType = this.$t( 'manage.love' );
        } else if ( data.tookOrNot[i].type === 'older' ) {
          data.tookOrNot[i].showType = this.$t( 'manage.older' );
        } else if ( data.tookOrNot[i].type === 'student' ) {
          data.tookOrNot[i].showType = this.$t( 'manage.student' );
        }
      }
      return data;
    },
    closeTable() {
      this.showDelete = false;
      this.confirmValue = false;
      this.selectedDelete = '';
      this.selectedType = '';
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
    deleteSeatInfo() {
      const userList = [];
      let item = '';
      for ( let i = 0; i < this.showInfos.tookOrNot.length; i++ ) {
        if ( this.showInfos.tookOrNot[i].ID ) {
          item = {
            name: `${this.showInfos.tookOrNot[i].ID} ${this.showInfos.tookOrNot[i].showType}`,
            value: `${this.showInfos.tookOrNot[i].ID} ${this.showInfos.tookOrNot[i].type}`,
          };
          userList.push( item );
        }
      }
      const result = userList.filter( ( element, index, arr ) => arr.indexOf( element ) === index );
      this.userList = result;
      this.chooseDelete( this.$t( 'checkoutCars.selectUser' ) );
    },
    chooseDelete( mes ) {
      this.select = true;
      this.selectMes = mes;
    },
    closeSelect() {
      this.select = false;
      this.selectedDelete = '';
    },
    checkSelect() {
      if ( this.selectedDelete !== '' ) {
        let item = {};
        let selected = [];
        let user = {};
        for ( let j = 0; j < this.inputSeatData.length; j++ ) {
          if ( this.inputSeatData[j].seatsNo === this.showInfos.seatsNo ) {
            for ( let i = 0; i < this.showInfos.tookOrNot.length; i++ ) {
              item = this.inputSeatData[j].tookOrNot[i];
              selected = this.selectedDelete.split( ' ' );
              if ( item.ID === selected[0] && item.type === selected[1] ) {
                user = {
                  ID: item.ID,
                  date: item.date,
                  phone: item.phone,
                  time: item.time,
                  type: item.type,
                };
                delete item.ID;
                delete item.date;
                delete item.phone;
                delete item.time;
                delete item.type;
                item.took = false;
              }
            }
            const allFalse = ( tookOrNot ) => tookOrNot.took === false;
            const result = this.inputSeatData[j].tookOrNot.every( allFalse );
            if ( result ) {
              this.inputSeatData.splice( j, 1 );
            }
            this.user = user;
            this.getUserData( user );
          }
        }
      }
    },
    updateSeatInfo() {
      const userList = [];
      let item = '';
      for ( let i = 0; i < this.showInfos.tookOrNot.length; i++ ) {
        if ( this.showInfos.tookOrNot[i].ID ) {
          item = {
            name: `${this.showInfos.tookOrNot[i].ID} ${this.showInfos.tookOrNot[i].showType}`,
            value: `${this.showInfos.tookOrNot[i].ID} ${this.showInfos.tookOrNot[i].type}`,
          };
          userList.push( item );
        }
      }
      const result = userList.filter( ( element, index, arr ) => arr.indexOf( element ) === index );
      this.userList = result;
      this.chooseUpdate( this.$t( 'checkoutCars.selectUser' ) );
    },
    chooseUpdate( mes ) {
      this.select2 = true;
      this.selectMes = mes;
    },
    closeUpdate() {
      this.select2 = false;
      this.selectedDelete = '';
      this.selectedType = '';
    },
    checkUpdate() {
      if ( this.selectedDelete !== '' && this.selectedType !== '' ) {
        let item = {};
        let selected = [];
        let user = {};
        for ( let j = 0; j < this.inputSeatData.length; j++ ) {
          if ( this.inputSeatData[j].seatsNo === this.showInfos.seatsNo ) {
            for ( let i = 0; i < this.showInfos.tookOrNot.length; i++ ) {
              item = this.inputSeatData[j].tookOrNot[i];
              selected = this.selectedDelete.split( ' ' );
              if ( item.ID === selected[0] && item.type === selected[1] ) {
                user = {
                  ID: item.ID,
                  date: item.date,
                  phone: item.phone,
                  time: item.time,
                  type: item.type,
                };
                item.type = this.selectedType;
              }
            }
            this.user = user;
            this.getUserData( user );
          }
        }
      }
    },
    setSeatData() {
      const db = getDatabase( GetfirebaseConfig() );
      update( ref( db, `bookedSeats/${this.dateSearch}/${this.trainNo}` ), {
        seatsData: this.inputSeatData,
      } );
    },
    getUserData( user ) {
      let userData = {};
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      get( child( dbRef, `users/${user.ID}/${user.phone}/${user.date}/${user.time}` ) )
        .then( ( snapshot ) => {
          if ( snapshot.exists() ) {
            userData = snapshot.val();
            this.dealUserData( userData, user.type );
          }
        } );
    },
    dealUserData( userData, type ) {
      this.select = false;
      this.select2 = false;
      let data = {};
      let direct = '';
      if ( userData.goingTo.trainNo === this.trainNo ) {
        data = userData.goingTo;
        direct = 'goingTo';
        this.getPrice( data.startStation.value, data.endStation.value );
      } else if ( userData.goingBack.trainNo === this.trainNo ) {
        data = userData.goingBack;
        direct = 'goingBack';
        this.getPrice( data.startStation.value, data.endStation.value );
      }
      this.callData = data;
      this.callType = type;
      this.direct = direct;
      this.customConfirm( this.$t( 'data.confirmChange' ) );
    },
    rebuildUserData( userData, type ) {
      let count = null;
      const data = userData;
      for ( let i = 0; i < data.seatsNo.length; i++ ) {
        if ( data.seatsNo[i] === this.showInfos.seatsNo ) {
          data.seatsNo.splice( i, 1 );
        }
      }
      if ( type === 'adult' ) {
        count = data.ticketCount.adult.value - 1;
        data.ticketCount.adult.value = count;
      } else if ( type === 'kid' ) {
        count = data.ticketCount.kid.value - 1;
        data.ticketCount.kid.value = count;
      } else if ( type === 'love' ) {
        count = data.ticketCount.love.value - 1;
        data.ticketCount.love.value = count;
      } else if ( type === 'elder' ) {
        count = data.ticketCount.older.value - 1;
        data.ticketCount.older.value = count;
      } else if ( type === 'student' ) {
        count = data.ticketCount.student.value - 1;
        data.ticketCount.student.value = count;
      }
      data.price = this.countPrice( data.carType, data.ticketCount );
      this.setUserData( data );
      this.setSeatData();
      this.closeTable();
      this.getSeatsInfo();
    },
    rebuildUserDataU( userData, type ) {
      let count = null;
      const data = userData;

      if ( type === 'adult' ) {
        count = data.ticketCount.adult.value - 1;
        data.ticketCount.adult.value = count;
      } else if ( type === 'kid' ) {
        count = data.ticketCount.kid.value - 1;
        data.ticketCount.kid.value = count;
      } else if ( type === 'love' ) {
        count = data.ticketCount.love.value - 1;
        data.ticketCount.love.value = count;
      } else if ( type === 'elder' ) {
        count = data.ticketCount.older.value - 1;
        data.ticketCount.older.value = count;
      } else if ( type === 'student' ) {
        count = data.ticketCount.student.value - 1;
        data.ticketCount.student.value = count;
      }

      if ( this.selectedType === 'adult' ) {
        count = data.ticketCount.adult.value + 1;
        data.ticketCount.adult.value = count;
      } else if ( this.selectedType === 'kid' ) {
        count = data.ticketCount.kid.value + 1;
        data.ticketCount.kid.value = count;
      } else if ( this.selectedType === 'love' ) {
        count = data.ticketCount.love.value + 1;
        data.ticketCount.love.value = count;
      } else if ( this.selectedType === 'elder' ) {
        count = data.ticketCount.older.value + 1;
        data.ticketCount.older.value = count;
      } else if ( this.selectedType === 'student' ) {
        count = data.ticketCount.student.value + 1;
        data.ticketCount.student.value = count;
      }
      data.price = this.countPrice( data.carType, data.ticketCount );
      this.setUserData( data );
      this.setSeatData();
      this.closeTable();
      this.getSeatsInfo();
    },
    setUserData( data ) {
      const db = getDatabase( GetfirebaseConfig() );
      if ( this.direct === 'goingTo' ) {
        set( ref( db, `users/${this.user.ID}/${this.user.phone}/${this.user.date}/${this.user.time}` ), {
          goingTo: data,
        } );
      } else if ( this.direct === 'goingBack' ) {
        set( ref( db, `users/${this.user.ID}/${this.user.phone}/${this.user.date}/${this.user.time}` ), {
          goingBack: data,
        } );
      }
    },
    getPrice( startStation, endStation ) {
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
    getTrainTime() {
      const data = this.trainData.StopTimes;
      for ( let i = 0; i < data.length; i++ ) {
        if ( data[i].StationID === this.searchInfo.departure.value ) {
          this.trainTime.departure = data[i].DepartureTime;
        } else if ( data[i].StationID === this.searchInfo.arrival.value ) {
          this.trainTime.arrival = data[i].ArrivalTime;
        }
      }
      const direction = this.trainData.GeneralTrainInfo.Direction;
      const depart = parseInt( this.searchInfo.departure.value, 10 );
      const arrive = parseInt( this.searchInfo.arrival.value, 10 );
      if ( direction === 0 && depart > arrive ) {
        this.searchInfo = {
          departure: { name: this.$t( 'data.station0' ), value: '' },
          arrival: { name: this.$t( 'data.station0' ), value: '' },
        };
        this.customAlert( this.$t( 'checkoutCars.directERR' ) );
      } else if ( direction === 1 && depart < arrive ) {
        this.searchInfo = {
          departure: { name: this.$t( 'data.station0' ), value: '' },
          arrival: { name: this.$t( 'data.station0' ), value: '' },
        };
        this.customAlert( this.$t( 'checkoutCars.directERR' ) );
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
        this.customAlert( this.$t( 'checkoutCars.alertSeat' ) );
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
        adult: { name: `${this.$t( 'booking.adultTick' )}`, value: 0 },
        kid: { name: `${this.$t( 'booking.kidTickL' )}`, value: 0 },
        love: { name: `${this.$t( 'booking.loveTick' )}`, value: 0 },
        older: { name: `${this.$t( 'booking.olderTickL' )}`, value: 0 },
        student: { name: `${this.$t( 'booking.studentTick' )}`, value: 0 },
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
    dealShowSeats( ) {
      const count = this.ticketCount;
      if ( count.adult.value > 0 ) {
        this.showType.adult = this.selectedSeats.slice( 0, count.adult.value );
      }
      if ( count.kid.value > 0 ) {
        this.showType.kid = this.selectedSeats.slice(
          count.adult.value,
          count.adult.value + count.kid.value,
        );
      }
      const start = count.adult.value + count.kid.value;
      if ( count.love.value > 0 ) {
        this.showType.love = this.selectedSeats.slice( start, start + count.love.value );
      }
      const start1 = start + count.love.value;
      if ( count.older.value > 0 ) {
        this.showType.older = this.selectedSeats.slice( start1, start1 + count.older.value );
      }
      const start2 = start1 + count.older.value;
      if ( count.student.value > 0 ) {
        this.showType.student = this.selectedSeats.slice( start2, start2 + count.student.value );
      }
    },
    dealTicket() {
      const count = this.ticketCount;
      const total = count.adult.value + count.kid.value + count.love.value
      + count.older.value + count.student.value;
      this.totalSeat = parseInt( total, 10 );
      this.totalPrice = this.countPrice( this.carType, count );
    },
    countPrice( carType, ticketCount ) {
      let total = 0;
      if ( carType === '0' ) {
        total = this.fares.standardAdult * ticketCount.adult.value
				+ this.fares.standardKid * ticketCount.kid.value
				+ this.fares.standardKid * ticketCount.love.value
				+ this.fares.standardKid * ticketCount.older.value
				+ this.fares.standardGroup * ticketCount.student.value;
      } else if ( carType === '1' ) {
        total = this.fares.bussinessAdult * ticketCount.adult.value
				+ this.fares.bussinessKid * ticketCount.kid.value
				+ this.fares.bussinessKid * ticketCount.love.value
				+ this.fares.bussinessKid * ticketCount.older.value
				+ this.fares.bussinessGroup * ticketCount.student.value;
      }
      return total;
    },
    goBook() {
      if ( this.userId !== '' && this.phoneNum !== '' && this.carType !== '' && this.searchInfo.departure.value !== '' && this.searchInfo.arrival.value !== '' ) {
        this.checkIDPhone();
      } else {
        this.customAlert( this.$t( 'checkoutCars.needData' ) );
      }
    },
    checkIDPhone() {
      const phone = this.phoneNum.split( '' );
      const ID = this.userId.split( '' );
      let IDValue = false;
      const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      for ( let i = 0; i < chars.length; i++ ) {
        if ( chars[i] === ID[0] ) {
          IDValue = true;
        }
      }
      if ( phone.length === 10 && ID.length === 10 && IDValue ) {
        this.checkTickets();
      } else {
        this.customAlert( this.$t( 'booking.PFErr' ) );
      }
    },
    checkTickets() {
      if ( this.totalSeat === this.selectedSeats.length && this.totalSeat > 0 ) {
        this.setTookOrNot();
        this.customConfirm( this.$t( 'checkoutCars.sure' ) );
      } else {
        this.customAlert( this.$t( 'checkoutCars.tickErr' ) );
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
      let item = {};
      const waitDealInput = [];
      if ( this.inputSeatData.length > 0 ) {
        for ( let i = 0; i < this.inputSeatData.length; i++ ) {
          for ( let j = 0; j < this.selectedSeats.length; j++ ) {
            if ( this.inputSeatData[i].seatsNo === this.selectedSeats[j] ) {
              item = JSON.stringify( this.inputSeatData[i] );
              waitDealInput.push( JSON.parse( item ) );
            }
          }
        }
      }
      const oldArr = this.setSeatsTypeS( this.inputSeatData, waitDealInput );
      const newArr = this.dealNewBook( this.inputSeatData );
      for ( let a = 0; a < this.inputSeatData.length; a++ ) {
        for ( let c = 0; c < oldArr.length; c++ ) {
          if ( this.inputSeatData[a].seatsNo === oldArr[c].seatsNo ) {
            this.inputSeatData.splice( a, 1, oldArr[c] );
          }
        }
      }
      for ( let b = 0; b < this.selectedSeats.length; b++ ) {
        this.inputSeatData.push( this.selectedSeats[b] );
      }
      for ( let c = 0; c < this.inputSeatData.length; c++ ) {
        for ( let d = 0; d < newArr.length; d++ ) {
          if ( this.inputSeatData[c] === newArr[d].seatsNo ) {
            this.inputSeatData.splice( c, 1, newArr[d] );
          }
        }
      }
      return this.inputSeatData;
    },
    dealNewBook( seatsData ) {
      for ( let k = 0; k < this.selectedSeats.length; k++ ) {
        for ( let l = 0; l < seatsData.length; l++ ) {
          if ( this.selectedSeats[k] === seatsData[l].seatsNo ) {
            this.selectedSeats.splice( k, 1 );
          }
        }
      }
      let result = [];
      if ( this.selectedSeats.length > 0 ) {
        result = this.setSeatsType( );
      }
      return result;
    },
    setSeatsType() {
      const newSeats = [];
      this.insertSeatsType( newSeats, 'adult' );
      this.insertSeatsType( newSeats, 'kid' );
      this.insertSeatsType( newSeats, 'love' );
      this.insertSeatsType( newSeats, 'older' );
      this.insertSeatsType( newSeats, 'student' );
      return newSeats;
    },
    insertSeatsType( newSeats, value ) {
      let item = {};
      let took = {};
      const info = JSON.stringify( this.tookOrNot );
      for ( let a = 0; a < this.showType[value].length; a++ ) {
        for ( let c = 0; c < this.selectedSeats.length; c++ ) {
          if ( this.showType[value][a] === this.selectedSeats[c] ) {
            took = JSON.parse( info );
            for ( let b = 0; b < took.length; b++ ) {
              if ( took[b].took ) {
                took[b].type = value;
                took[b].ID = this.userId;
                took[b].phone = this.phoneNum;
                took[b].date = this.todayDate;
                took[b].time = this.todayTime;
                item = { 	seatsNo: this.showType[value][a],	tookOrNot: took };
              }
            }
          }
        }
        newSeats.push( item );
      }
    },
    setSeatsTypeS( waitDealInput ) {
      const arr = [];
      this.insertSeatsTypeS( waitDealInput, arr, 'adult' );
      this.insertSeatsTypeS( waitDealInput, arr, 'kid' );
      this.insertSeatsTypeS( waitDealInput, arr, 'love' );
      this.insertSeatsTypeS( waitDealInput, arr, 'older' );
      this.insertSeatsTypeS( waitDealInput, arr, 'student' );
      return arr;
    },
    insertSeatsTypeS( waitDealInput, arr, value ) {
      let item = {};
      let took = {};
      let originTook = [];
      const info = JSON.stringify( this.tookOrNot );
      for ( let a = 0; a < this.showType[value].length; a++ ) {
        for ( let c = 0; c < waitDealInput.length; c++ ) {
          if ( waitDealInput[c].seatsNo === this.showType[value][a] ) {
            originTook = waitDealInput[c].tookOrNot;
            took = JSON.parse( info );
            for ( let b = 0; b < took.length; b++ ) {
              if ( took[b].took ) {
                originTook[b].type = value;
                originTook[b].took = true;
                originTook[b].ID = this.userId;
                originTook[b].phone = this.phoneNum;
                originTook[b].date = this.todayDate;
                originTook[b].time = this.todayTime;
                item = { 	seatsNo: this.showType[value][a],	tookOrNot: originTook };
              }
            }
          }
        }
        arr.push( item );
      }
    },
    oneWayBook() {
      if ( this.confirmValue ) {
        this.setSeatsData();
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
        set( ref( db, `bookedSeats/${this.dateSearch}/${this.trainNo}` ), {
          seatsData: this.inputSeatData,
        } )
          .then( () => {
            this.customAlert( this.$t( 'data.bookSuccess' ) );
            this.confirmValue = false;
            this.getSeatsInfo();
          } )
          .catch( () => {
            this.customAlert( this.$t( 'data.bookAgain' ) );
            this.confirmValue = false;
          } );
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
  .select-area{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    justify-items: center;
    z-index: 10;
  }
  .select-area .v-input{
    max-width: 200px;
  }
  .data-input{
    max-width: 200px;
  }
  .train-no{
    cursor: pointer;
  }
  .train-no:hover{
    background: rgba(111, 238, 238, 0.596);
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
