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
				<v-container class="container">
						<v-row align="center">
								<v-col cols="12" sm="6">
										<h1>{{ $t('manage.title') }}</h1>
								</v-col>
								<v-col cols="12" sm="6">
										<v-row justify="space-around">
												<div>
														<v-btn
															nuxt
															:to="localePath('checkoutCars')"
															color="secondary"
															outlined
															max-width="110"
														>{{ $t('manage.leftSeats') }}</v-btn>
												</div>
												<div>
														<v-btn
															nuxt
															:to="localePath('manageBook')"
															color="teal"
															outlined
															max-width="110"
														>{{ $t('manage.manageBook') }}</v-btn>
												</div>
												<div>
														<v-btn
															nuxt
															:to="localePath('/')"
															color="primary"
															max-width="110"
														>{{ $t('manage.index') }}</v-btn>
												</div>
										</v-row>
								</v-col>
						</v-row>
						<v-row align="center" class="searchBar">
								<v-col cols="9" sm="5" md="3" class="IDsearch">
										<v-text-field
											v-model="userId"
											:label="$t('manage.userId')"
											@keyup.enter="findBookingDate"
										></v-text-field>
								</v-col>
								<v-col cols="9" sm="5" md="3" class="IDsearch">
										<v-text-field
											v-model="phoneNum"
											:label="$t('manage.userPhone')"
											@keyup.enter="findBookingDate"
										></v-text-field>
								</v-col>
								<v-col class="mb-3" sm="1">
										<v-btn
											color="cyan"
											outlined
											@click="findBookingDate"
											max-width="66"
										>{{ $t('manage.search') }}</v-btn>
								</v-col>
								<v-col class="mb-3">
										<v-btn
											color="grey darken-3"
											dark
											@click="findUsers"
											max-width="110"
										>{{ $t('manage.allUsers') }}</v-btn>
								</v-col>
						</v-row>
						<v-row class="user-container mt-5" v-if="usersIds">
								<v-col
									v-for="(usersId, key) in usersIds"
									:key="usersId.index"
									cols="4"
									sm="3"
									md="2"
									class="users"
								>
										<div
											v-for=" (info , key1 ) in usersId"
											:key="info.index"
											class="user"
											@click="findBookingDate( key , key1 )"
										>
                        ID
												<span> {{key}} </span>
												<div class="phone">
														{{ $t('manage.userPhone') }}
														<span> {{key1}} </span>
												</div>
										</div>
								</v-col>
						</v-row>
						<v-row class="data-container mt-5 mx-auto" v-if="userBookingDates">
								<v-col class="mb-0 pb-0" cols="12">
										<v-card
											class="text-center"
											elevation="2"
											@click="openLists"
										>{{ $t('manage.list') }}</v-card>
								</v-col>
								<v-col
									v-for="(userBookingDate, key) in userBookingDates"
									:key="userBookingDate.index"
									v-show="openList"
									cols="12"
									class="users mt-6"
								>
										<v-row
											v-for=" (info , key1 ) in userBookingDate"
											:key="info.index"
											justify="center"
											@click="findBookingInfo(key , key1)"
										>
												<v-col class="time" cols="12">
														<v-card
															outlined
															shaped
															hover
															color="teal lighten-4"
															elevation="2"
														>
																<v-row class="ma-0">
																		<v-col class="py-0" cols="12" sm="3">
																				{{ $t('manage.trainInfo') }}
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
																						{{ $t('manage.price') }}
																						{{info.goingTo.price}}$
																				</span>
																		</v-col>
																</v-row>
														</v-card>
												</v-col>
												<v-col class="time" cols="12" v-if="info.goingBack">
														<v-card
															outlined
															shaped
															hover
															color="teal lighten-4"
															elevation="2"
														>
																<v-row class="ma-0">
																		<v-col class="py-0" cols="12" sm="3">
																				{{ $t('manage.trainInfo') }}
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
																						{{ $t('manage.price') }}
																						{{info.goingBack.price}}$
																				</span>
																		</v-col>
																</v-row>
														</v-card>
												</v-col>
										</v-row>
								</v-col>
						</v-row>
						<div class="priceInfo" v-show="updateInfo">
								<div class="ticket-table text-center">
										<h3>{{ $t('manage.priceTable') }}</h3>
										<span>{{ $t('manage.between') }}</span>
										<v-simple-table>
												<tbody>
														<tr>
																<th></th>
																<th>{{ $t('manage.adult') }}</th>
																<th>
																		{{ $t('manage.kid') }}
																		/{{ $t('manage.older') }}
																		/{{ $t('manage.love') }}
																</th>
																<th>{{ $t('manage.student') }}</th>
														</tr>
														<tr>
																<td>{{ $t('manage.standard') }}</td>
																<td>
																		<v-text-field
																			v-model="fares.standardAdult"
																			class="num mx-auto"
																			type="number"
																			max="2500"
																			min="0"
																		></v-text-field>
																</td>
																<td>
																		<v-text-field
																			v-model="fares.standardKid"
																			class="num mx-auto"
																			type="number"
																			max="2500"
																			min="0"
																		></v-text-field>
																</td>
																<td>
																		<v-text-field
																			v-model="fares.standardGroup"
																			class="num mx-auto"
																			type="number"
																			max="2500"
																			min="0"
																		></v-text-field>
																</td>
														</tr>
														<tr>
																<td>{{ $t('manage.business') }}</td>
																<td>
																		<v-text-field
																			v-model="fares.bussinessAdult"
																			class="num mx-auto"
																			type="number"
																			max="2500"
																			min="0"
																		></v-text-field>
																</td>
																<td>
																		<v-text-field
																			v-model="fares.bussinessKid"
																			class="num mx-auto"
																			type="number"
																			max="2500"
																			min="0"
																		></v-text-field>
																</td>
																<td>
																		<v-text-field
																			v-model="fares.bussinessGroup"
																			class="num mx-auto"
																			type="number"
																			max="2500"
																			min="0"
																		></v-text-field>
																</td>
														</tr>
														<tr>
																<td>{{ $t('manage.free') }}</td>
																<td>
																		<v-text-field
																			v-model="fares.freeAdult"
																			class="num mx-auto"
																			type="number"
																			max="2500"
																			min="0"
																		></v-text-field>
																</td>
																<td>
																		<v-text-field
																			v-model="fares.freeKid"
																			class="num mx-auto"
																			type="number"
																			max="2500"
																			min="0"
																		></v-text-field>
																</td>
																<td>-</td>
														</tr>
												</tbody>
										</v-simple-table>
										<v-btn
											color="primary"
											outlined
											@click="changeTicket"
										>{{ $t('manage.reset') }}</v-btn>
								</div>
						</div>
						<v-container class="booking-info" v-if="bookingData.goingTo.trainNo">
								<v-row align="center" class="bookingTitle my-3">
										<v-col class="pa-0" cols="12" sm="5" md="5">
												<h2>{{ $t('manage.goInfo') }}</h2>
										</v-col>
										<v-col
											v-show="showInfo"
											cols="3"
											sm="2"
											md="2"
											class="change pa-0 mr-2"
										>
												<v-btn
													color="warning"
													outlined
													@click="changeTicket"
													:disabled="cantBeChange"
												>{{ $t('manage.change') }}</v-btn>
										</v-col>
										<v-col
											v-show="updateInfo"
											cols="3"
											sm="2"
											md="2"
											class="change pa-0 mr-2"
										>
												<v-btn
													color="warning"
													outlined
													@click="cancelUpdateData"
												>{{ $t('manage.cancel') }}</v-btn>
										</v-col>
										<v-col
											v-show="readyToChange"
											cols="3"
											sm="2"
											md="2"
											class="change pa-0 mr-2"
										>
												<v-btn
													color="primary"
													:disabled="isBtnDisabled"
													@click="checkAndUpdate"
												>{{ $t('manage.update') }}</v-btn>
										</v-col>
										<v-col
											cols="3"
											sm="2"
											md="2"
											class="change pa-0 mr-2"
										>
												<v-btn
													color="error"
													@click="cancelGoingTo"
													:disabled="cantBeChange"
												>{{ $t('manage.quit') }}</v-btn>
										</v-col>
								</v-row>
								<v-simple-table>
										<tbody>
												<tr>
														<th>{{ $t('manage.date') }}</th>
														<td>{{bookingData.goingTo.date}}</td>
												</tr>
												<tr>
														<th>{{ $t('manage.trainNo') }}</th>
														<td>{{bookingData.goingTo.trainNo}}</td>
												</tr>
												<tr>
														<th>{{ $t('manage.departure') }}</th>
														<td>{{bookingData.goingTo.startStation.name}}</td>
												</tr>
												<tr>
														<th>{{ $t('manage.arrival') }}</th>
														<td>{{bookingData.goingTo.endStation.name}}</td>
												</tr>
												<tr>
														<th>{{ $t('manage.drivingTime') }}</th>
														<td>
																{{bookingData.goingTo.departTime}}
																~
																{{bookingData.goingTo.arrivalTime}}
														</td>
												</tr>
												<tr>
														<th>{{ $t('manage.carType') }}</th>
														<td>
																<div
																	v-if="bookingData.goingTo.carType === '0' "
																	class="carType"
																>
																		{{ $t('manage.standard') }}
																</div>
																<div
																	v-else-if="bookingData.goingTo.carType === '1' "
																	class="carType"
																>
																		{{ $t('manage.business') }}
																</div>
														</td>
												</tr>
												<tr>
														<th>{{ $t('manage.ticket') }}</th>
														<td v-show="showInfo">
																<div
																	v-if="bookingData.goingTo.ticketCount.adult != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.adult') }}
																		{{bookingData.goingTo.ticketCount.adult}}
																		{{ $t('manage.pic') }}
																</div>
																<div
																	v-if="bookingData.goingTo.ticketCount.kid != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.kid') }}
																		{{bookingData.goingTo.ticketCount.kid}}
																		{{ $t('manage.pic') }}
																</div>
																<div
																	v-if="bookingData.goingTo.ticketCount.love != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.love') }}
																		{{bookingData.goingTo.ticketCount.love}}
																		{{ $t('manage.pic') }}
																</div>
																<div
																	v-if="bookingData.goingTo.ticketCount.older != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.older') }}
																		{{bookingData.goingTo.ticketCount.older}}
																		{{ $t('manage.pic') }}
																</div>
																<div
																	v-if="bookingData.goingTo.ticketCount.student != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.studentL') }}
																		{{bookingData.goingTo.ticketCount.student}}
																		{{ $t('manage.pic') }}
																</div>
														</td>
														<td v-show="updateInfo">
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingTo.ticketCount.adult"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.adult')"
																		></v-select>
																</div>
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingTo.ticketCount.kid"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.kidL')"
																		></v-select>
																</div>
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingTo.ticketCount.love"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.love')"
																		></v-select>
																</div>
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingTo.ticketCount.older"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.olderL')"
																		></v-select>
																</div>
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingTo.ticketCount.student"
																			:items="ticketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.studentL')"
																		></v-select>
																</div>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('manage.seatInfo') }}</th>
														<td>
																{{ $t('manage.adult') }}:
																<span
																	v-for=" goAdult in showGoSeats.adult"
																	:key="goAdult"
																	class="mx-1"
																>{{goAdult}}</span>
																<br>
																{{ $t('manage.kid') }}:
																<span
																	v-for=" goKid in showGoSeats.kid"
																	:key="goKid"
																	class="mx-1"
																>{{goKid}}</span>
																<br>
																{{ $t('manage.love') }}:
																<span
																	v-for=" goLove in showGoSeats.love"
																	:key="goLove"
																	class="mx-1"
																>{{goLove}}</span>
																<br>
																{{ $t('manage.older') }}:
																<span
																	v-for=" goOlder in showGoSeats.older"
																	:key="goOlder"
																	class="mx-1"
																>{{goOlder}}</span>
																<br>
																{{ $t('manage.student') }}:
																<span
																	v-for=" goStudent in showGoSeats.student"
																	:key="goStudent"
																	class="mx-1"
																>{{goStudent}}</span>
														</td>
												</tr>
												<tr v-if="! bookingData.goingBack.trainNo">
														<th scope="row">{{ $t('manage.total') }}</th>
														<td>$ {{totalPrice}}</td>
												</tr>
										</tbody>
								</v-simple-table>
						</v-container>
						<v-container class="booking-info" v-if="bookingData.goingBack.trainNo">
								<v-row align="center" class="bookingTitle my-3">
										<v-col cols="8">
												<h2>{{ $t('manage.backInfo') }}</h2>
										</v-col>
										<v-col>
												<v-btn
													color="error"
													@click="cancelGoingBack"
													:disabled="cantBeChange"
												>{{ $t('manage.quit') }}</v-btn>
										</v-col>
								</v-row>
								<v-simple-table>
										<tbody>
												<tr>
														<th>{{ $t('manage.date') }}</th>
														<td>{{bookingData.goingBack.date}}</td>
												</tr>
												<tr>
														<th>{{ $t('manage.trainNo') }}</th>
														<td>{{bookingData.goingBack.trainNo}}</td>
												</tr>
												<tr>
														<th>{{ $t('manage.departure') }}</th>
														<td>{{bookingData.goingBack.startStation.name}}</td>
												</tr>
												<tr>
														<th>{{ $t('manage.arrival') }}</th>
														<td>{{bookingData.goingBack.endStation.name}}</td>
												</tr>
												<tr>
														<th>{{ $t('manage.drivingTime') }}</th>
														<td>
																{{bookingData.goingBack.departTime}}
																~
																{{bookingData.goingBack.arrivalTime}}
														</td>
												</tr>
												<tr>
														<th>{{ $t('manage.carType') }}</th>
														<td>
																<div
																	v-if="bookingData.goingBack.carType === '0' "
																	class="carType"
																>{{ $t('manage.standard') }}</div>
																<div
																	v-else-if="bookingData.goingBack.carType === '1' "
																	class="carType"
																>{{ $t('manage.business') }}</div>
														</td>
												</tr>
												<tr>
														<th>{{ $t('manage.ticket') }}</th>
														<td v-show="showInfo">
																<div
																	v-if="bookingData.goingBack.ticketCount.adult != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.adult') }}
																		{{bookingData.goingBack.ticketCount.adult}}
																		{{ $t('manage.pic') }}
																</div>
																<div
																	v-if="bookingData.goingBack.ticketCount.kid != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.kid') }}
																		{{bookingData.goingBack.ticketCount.kid}}
																		{{ $t('manage.pic') }}
																</div>
																<div
																	v-if="bookingData.goingBack.ticketCount.love != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.love') }}
																		{{bookingData.goingBack.ticketCount.love}}
																		{{ $t('manage.pic') }}
																</div>
																<div
																	v-if="bookingData.goingBack.ticketCount.older != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.older') }}
																		{{bookingData.goingBack.ticketCount.older}}
																		{{ $t('manage.pic') }}
																</div>
																<div
																	v-if="bookingData.goingBack.ticketCount.student != 0"
																	class="ticketCount"
																>
																		{{ $t('manage.studentL') }}
																		{{bookingData.goingBack.ticketCount.student}}
																		{{ $t('manage.pic') }}
																</div>
														</td>
														<td v-show="updateInfo">
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.adult"
																			:items="backTicketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.adult')"
																		></v-select>
																</div>
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.kid"
																			:items="backTicketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.kidL')"
																		></v-select>
																</div>
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.love"
																			:items="backTicketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.love')"
																		></v-select>
																</div>
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.older"
																			:items="backTicketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.olderL')"
																		></v-select>
																</div>
																<div class="seats-info">
																		<v-select
																			v-model="bookingData.goingBack.ticketCount.student"
																			:items="backTicketCountNums"
																			item-text="num"
																			item-value="value"
																			class="ticks"
																			:label="$t('manage.studentL')"
																		></v-select>
																</div>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('manage.seatInfo') }}</th>
														<td>
																{{ $t('manage.adult') }}:
																<span
																	v-for=" backAdult in showBackSeats.adult"
																	:key="backAdult"
																	class="mx-1"
																>{{backAdult}}</span>
																<br>
																{{ $t('manage.kid') }}:
																<span
																	v-for=" backKid in showBackSeats.kid"
																	:key="backKid"
																	class="mx-1"
																>{{backKid}}</span>
																<br>
																{{ $t('manage.love') }}:
																<span
																	v-for=" backLove in showBackSeats.love"
																	:key="backLove"
																	class="mx-1"
																>{{backLove}}</span>
																<br>
																{{ $t('manage.older') }}:
																<span
																	v-for=" backOlder in showBackSeats.older"
																	:key="backOlder"
																	class="mx-1"
																>{{backOlder}}</span>
																<br>
																{{ $t('manage.student') }}:
																<span
																	v-for=" backStudent in showBackSeats.student"
																	:key="backStudent"
																	class="mx-1"
																>{{backStudent}}</span>
														</td>
												</tr>
												<tr>
														<th scope="row">{{ $t('manage.total') }}</th>
														<td>$ {{totalPrice}}</td>
												</tr>
										</tbody>
								</v-simple-table>
						</v-container>
						<div class="seatTable" v-if="updateInfo" >
								<div class="seat-title">
										<h2>{{ $t('manage.seatChoice') }}</h2>
										<div class="showStatus">
												<div class="ready">
														{{ $t('manage.freeSeat') }}
														<div class="canBeChoose">可</div>
														{{ $t('manage.selectSeat') }}
														<div class="cantBeChoose">否</div>
														{{ $t('manage.tokenSeat') }}
														<div class="BeChoosed">選</div>
												</div>
										</div>
								</div>
								<div class="seat-choice">
										<h3>{{ $t('manage.carDirect') }}</h3>
										<div class="one-train">
												<div
													v-for="(seat, index) in seats"
													:key="seat.index"
													class="seat"
												>
														<div
															class="select-car"
															v-if="selectedCar == index"
														>
																<div
																	v-for="seatNum in seat"
																	:key="seatNum.index"
																	class="seat-num"
																>
																		<label v-if="seatNum.booked === '0' ">
																				<input
																					v-model="selectedSeats"
																					:value="seatNum.No"
																					type="checkbox"
																					name="label"
																				>
																				<span class="round button">
																						{{seatNum.No}}
																				</span>
																		</label>
																		<label v-else>
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
										<div class="car-no">
												<div
													class="single-car"
													v-for="(carNo, index) in carNos"
													:key="carNo.index"
													@click="keyInCarNo(index)"
												>
															{{carNo}}
												</div>
										</div>
										<div class="selectedCar">
												{{ $t('manage.carriageNo') }}
												{{showSelectedCar}}
										</div>
								</div>
								<div
									class="text-center"
									v-if=" this.bookingData.goingBack.trainNo "
								>
										<div v-show="goingSeatTable">
												<h3>
														{{ $t('manage.goSeat') }}
												</h3>
										</div>
										<div v-show="backSeatTable">
												<h3>
														{{ $t('manage.backSeat') }}
												</h3>
										</div>
										<div
											v-if=" this.bookingData.goingBack.trainNo "
											class="switch"
										>
												<v-btn
													v-show="goingSeatTable"
													color="warning"
													small
													class="going"
													@click="switchBack"
												>{{ $t('manage.selectBackSeat') }}</v-btn>
												<v-btn
													v-show="backSeatTable"
													color="warning"
													small
													class="back"
													@click="switchGoing"
												>{{ $t('manage.selectGoSeat') }}</v-btn>
										</div>
								</div>
								<div>
										<div class="text-center">
												{{ $t('manage.adult') }}:
												<span
													v-for=" backAdult in showSeats.adult"
													:key="backAdult"
													class="mx-1"
												>{{backAdult}}</span>
										</div>
										<div class="text-center">
												{{ $t('manage.kid') }}:
												<span
													v-for=" backKid in showSeats.kid"
													:key="backKid"
													class="mx-1"
												>{{backKid}}</span>
										</div>
										<div class="text-center">
												{{ $t('manage.love') }}:
												<span
													v-for=" backLove in showSeats.love"
													:key="backLove"
													class="mx-1"
												>{{backLove}}</span>
										</div>
										<div class="text-center">
												{{ $t('manage.older') }}:
												<span
													v-for=" backOlder in showSeats.older"
													:key="backOlder"
													class="mx-1"
												>{{backOlder}}</span>
										</div>
										<div class="text-center">
												{{ $t('manage.student') }}:
												<span
													v-for=" backStudent in showSeats.student"
													:key="backStudent"
													class="mx-1"
												>{{backStudent}}</span>
										</div>
								</div>
						</div>
				</v-container>
		</v-app>
</template>

<script>
// import axios from 'axios';
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
      confirmMes: '',
      confirmSymbol: '',
      confirmGoing: false,
      confirmBack: false,
      confirmUpdate: false,
      userId: '',
      phoneNum: '',
      selectedDate: '',
      selectedTime: '',
      usersIds: [],
      userBookingDates: null,
      isBtnDisabled: false,
      bookingData: {
        goingTo: {
          startStation: { name: '', value: '' },
          endStation: { name: '', value: '' },
          carType: '',
          date: '',
          trainNo: '',
          departTime: '',
          arrivalTime: '',
          ticketCount: {
            adult: 0,
            kid: 0,
            love: 0,
            older: 0,
            student: 0,
          },
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
          ticketCount: {
            adult: 0,
            kid: 0,
            love: 0,
            older: 0,
            student: 0,
          },
          seatsNo: [''],
          price: 0,
        },
      },
      showSeats: {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      },
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
      ticketTotal: 0,
      backTicketTotal: 0,
      openList: true,
      showInfo: true,
      updateInfo: false,
      readyToChange: false,
      cantBeChange: false,
      seats: [
        [], [], [], [], [], [], [], [], [], [],
      ],
      carNos: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      selectedCar: '0',
      showSelectedCar: 'A',
      selectedSeats: [],
      goingSeatTable: true,
      backSeatTable: false,
      goingSeats: [],
      backSeats: [],
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
      inputSeatData: [],
      inputBackSeatData: [],
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
      backTookOrNot: [
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
      ticketCountNums: [],
      backTicketCountNums: [],
      totalPrice: null,
    };
  },
  mounted() {
    this.createTicketSelector();
  },
  watch: {
    'bookingData.goingTo.ticketCount': {
      handler() {
        this.countTotalPrice();
      },
      deep: true,
    },
    'bookingData.goingBack.ticketCount': {
      handler() {
        this.countTotalPrice();
      },
      deep: true,
    },
    selectedSeats: {
      handler() {
        this.watchSeatsChoice();
        this.rebuildSeats();
      },
    },
    fares: {
      handler() {
        this.checkPrice();
      },
      deep: true,
    },
    'bookingData.goingTo.date': {
      handler() {
        this.watchDateOver();
      },
    },
    confirmGoing: {
      handler() {
        this.cancelGoingTo();
      },
    },
    confirmBack: {
      handler() {
        this.cancelGoingBack();
      },
    },
    confirmUpdate: {
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
      this.confirm = false;
      this.confirmGoing = false;
      this.confirmBack = false;
      this.confirmUpdate = false;
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
    watchSeatsChoice() {
      this.ticketTotal = parseInt( this.bookingData.goingTo.ticketCount.adult, 10 )
			+ parseInt( this.bookingData.goingTo.ticketCount.kid, 10 )
			+ parseInt( this.bookingData.goingTo.ticketCount.love, 10 )
			+ parseInt( this.bookingData.goingTo.ticketCount.older, 10 )
			+ parseInt( this.bookingData.goingTo.ticketCount.student, 10 );
      this.backTicketTotal = parseInt( this.bookingData.goingBack.ticketCount.adult, 10 )
			+ parseInt( this.bookingData.goingBack.ticketCount.kid, 10 )
			+ parseInt( this.bookingData.goingBack.ticketCount.love, 10 )
			+ parseInt( this.bookingData.goingBack.ticketCount.older, 10 )
			+ parseInt( this.bookingData.goingBack.ticketCount.student, 10 );
      if ( this.backSeatTable === false ) {
        if ( this.selectedSeats.length > this.ticketTotal ) {
          this.$nextTick( () => {
            this.selectedSeats.pop();
          } );
          this.customAlert( this.$t( 'data.alertSeat' ) );
        }
      } else if ( this.selectedSeats.length > this.backTicketTotal ) {
        this.$nextTick( () => {
          this.selectedSeats.pop();
        } );
        this.customAlert( this.$t( 'data.alertSeat' ) );
      }
    },
    watchDateOver() {
      const fullDate = new Date();
      const nowY = fullDate.getFullYear();
      const nowM = ( fullDate.getMonth() + 1 ) >= 10 ? ( fullDate.getMonth() + 1 ) : ( `0${fullDate.getMonth() + 1}` );
      const nowD = fullDate.getDate() < 10 ? ( `0${fullDate.getDate()}` ) : fullDate.getDate();
      const date = this.bookingData.goingTo.date.split( '-' );
      if ( date[0] < nowY ) {
        this.cantBeChange = true;
      } else if ( date[1] < nowM ) {
        this.cantBeChange = true;
      } else if ( date[2] < nowD ) {
        this.cantBeChange = true;
      } else {
        this.cantBeChange = false;
      }
    },
    checkPrice() {
      const low = 0;
      const high = 2500;
      if (
        this.fares.freeKid < low
				|| this.fares.standardKid < low
				|| this.fares.standardGroup < low
				|| this.fares.freeAdult < low
				|| this.fares.standardAdult < low
				|| this.fares.bussinessKid < low
				|| this.fares.bussinessGroup < low
				|| this.fares.bussinessAdult < low
      ) {
        this.isBtnDisabled = true;
      } else if (
        this.fares.freeKid > high
						|| this.fares.standardKid > high
						|| this.fares.standardGroup > high
						|| this.fares.freeAdult > high
						|| this.fares.standardAdult > high
						|| this.fares.bussinessKid > high
						|| this.fares.bussinessGroup > high
						|| this.fares.bussinessAdult > high
      ) {
        this.isBtnDisabled = true;
      } else {
        this.isBtnDisabled = false;
      }
    },
    findUsers() {
      this.bookingData = {
        goingTo: {
          startStation: { name: '', value: '' },
          endStation: { name: '', value: '' },
          carType: '',
          date: '',
          trainNo: '',
          departTime: '',
          arrivalTime: '',
          ticketCount: {
            adult: 0,
            kid: 0,
            love: 0,
            older: 0,
            student: 0,
          },
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
          ticketCount: {
            adult: 0,
            kid: 0,
            love: 0,
            older: 0,
            student: 0,
          },
          seatsNo: [''],
          price: 0,
        },
      };
      this.selectedSeats = [];
      this.userBookingDates = null;
      this.updateInfo = false;
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      get( child( dbRef, 'users/' ) )
        .then( ( snapshot ) => {
          if ( snapshot.exists() ) {
            this.usersIds = snapshot.val();
          } else {
            this.customAlert( this.$t( 'data.alertNoMes' ) );
          }
        } )
        .catch( ( error ) => {
          console.error( error );
          this.customAlert( this.$t( 'data.alertNoMes' ) );
        } );
    },
    openLists() {
      if ( this.openList === false ) {
        this.openList = true;
      } else {
        this.openList = false;
      }
    },
    findBookingDate( key, key1 ) {
      this.bookingData = {
        goingTo: {
          startStation: { name: '', value: '' },
          endStation: { name: '', value: '' },
          carType: '',
          date: '',
          trainNo: '',
          departTime: '',
          arrivalTime: '',
          ticketCount: {
            adult: 0,
            kid: 0,
            love: 0,
            older: 0,
            student: 0,
          },
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
          ticketCount: {
            adult: 0,
            kid: 0,
            love: 0,
            older: 0,
            student: 0,
          },
          seatsNo: [''],
          price: 0,
        },
      };
      this.updateInfo = false;
      this.cantBeChange = false;
      this.openList = true;
      this.usersIds = [];
      if ( key && key1 ) {
        this.userId = key;
        this.phoneNum = key1;
      }
      if ( this.userId === '' || this.phoneNum === '' ) {
        this.customAlert( this.$t( 'data.alertInsert' ) );
      } else {
        const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
        get( child( dbRef, `users/${this.userId}/${this.phoneNum}` ) )
          .then( ( snapshot ) => {
            if ( snapshot.exists() ) {
              this.userBookingDates = snapshot.val();
            } else {
              this.customAlert( this.$t( 'data.alertNoMes' ) );
            }
          } )
          .catch( ( error ) => {
            console.error( error );
            this.customAlert( this.$t( 'data.alertNoMes' ) );
          } );
      }
    },
    findBookingInfo( key, key1 ) {
      this.alert = false;
      this.confirm = false;
      this.confirmGoing = false;
      this.confirmBack = false;
      this.confirmUpdate = false;
      this.updateInfo = false;
      this.showInfo = true;
      this.readyToChange = false;
      this.showGoSeats = {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      };
      this.showBackSeats = {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      };
      this.selectedSeats = [];
      this.goingSeats = [];
      this.backSeats = [];
      this.inputSeatData = [];
      this.inputBackSeatData = [];
      this.goingSeatTable = true;
      this.backSeatTable = false;
      this.openList = false;
      this.bookingData = {
        goingTo: {
          startStation: { name: '', value: '' },
          endStation: { name: '', value: '' },
          carType: '',
          date: '',
          trainNo: '',
          departTime: '',
          arrivalTime: '',
          ticketCount: {
            adult: 0,
            kid: 0,
            love: 0,
            older: 0,
            student: 0,
          },
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
          ticketCount: {
            adult: 0,
            kid: 0,
            love: 0,
            older: 0,
            student: 0,
          },
          seatsNo: [''],
          price: 0,
        },
      };
      this.createSeats();
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      if ( key && key1 ) {
        this.selectedDate = key;
        this.selectedTime = key1;
      }
      get( child( dbRef, `users/${this.userId}/${this.phoneNum}/${this.selectedDate}/${this.selectedTime}` ) )
        .then( ( snapshot ) => {
          if ( snapshot.exists() ) {
            this.bookingData.goingTo = snapshot.val().goingTo;
            if ( snapshot.val().goingBack ) {
              this.bookingData.goingBack = snapshot.val().goingBack;
            }
            this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
            this.getSeatsInfo();
            this.setTookOrNot();
            this.createTicketType();
          } else {
            this.customAlert( this.$t( 'data.alertNoMes' ) );
          }
        } )
        .catch( ( error ) => {
          console.error( error );
          this.customAlert( this.$t( 'data.alertNoMes' ) );
        } );
    },
    createTicketType() {
      const going = this.bookingData.goingTo;
      const back = this.bookingData.goingBack;
      if ( back.trainNo ) {
        this.dealShowSeats( going.seatsNo, this.showGoSeats, going.ticketCount );
        this.dealShowSeats( back.seatsNo, this.showBackSeats, back.ticketCount );
      } else {
        this.dealShowSeats( going.seatsNo, this.showGoSeats, going.ticketCount );
      }
    },
    dealShowSeats( data, show, count ) {
      const showSeats = show;
      if ( count.adult > 0 ) {
        showSeats.adult = data.slice( 0, count.adult );
      }
      if ( count.kid > 0 ) {
        showSeats.kid = data.slice( count.adult, count.adult + count.kid );
      }
      const start = count.adult + count.kid;
      if ( count.love > 0 ) {
        showSeats.love = data.slice( start, start + count.love );
      }
      const start1 = count.adult + count.kid + count.love;
      if ( count.older > 0 ) {
        showSeats.older = data.slice( start1, start1 + count.older );
      }
      const start2 = count.adult + count.kid + count.love + count.older;
      if ( count.student > 0 ) {
        showSeats.student = data.slice( start2, start2 + count.student );
      }
    },
    // changeTicket() {
    //   const count = this.bookingData.goingTo.ticketCount;
    //   this.dealShowSeats( this.selectedSeats, this.showSeats, count );
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
      const count = this.bookingData.goingTo.ticketCount;
      this.dealShowSeats( this.selectedSeats, this.showSeats, count );
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
    countTotalPrice() {
      if ( this.fares.standardAdult ) {
        if ( this.bookingData.goingTo.carType === '0' ) {
          const total = this.fareCounterS( this.bookingData.goingTo );
          this.bookingData.goingTo.price = total;
          if ( this.bookingData.goingBack ) {
            const total2 = this.fareCounterS( this.bookingData.goingBack );
            this.bookingData.goingBack.price = total2;
          }
        } else if ( this.bookingData.goingTo.carType === '1' ) {
          const total =	this.fareCounterB( this.bookingData.goingTo );
          this.bookingData.goingTo.price = total;
          if ( this.bookingData.goingBack ) {
            const total2 = this.fareCounterB( this.bookingData.goingBack );
            this.bookingData.goingBack.price = total2;
          }
        }
        this.totalPrice = this.bookingData.goingTo.price + this.bookingData.goingBack.price;
      }
    },
    fareCounterS( info ) {
      const ticketInfo = this.fares;
      const result = ticketInfo.standardAdult * info.ticketCount.adult
      + ticketInfo.standardKid * info.ticketCount.kid
      + ticketInfo.standardKid * info.ticketCount.love
      + ticketInfo.standardKid * info.ticketCount.older
      + ticketInfo.standardGroup * info.ticketCount.student;
      return result;
    },
    fareCounterB( info ) {
      const ticketInfo = this.fares;
      const result = ticketInfo.bussinessAdult * info.ticketCount.adult
      + ticketInfo.bussinessKid * info.ticketCount.kid
      + ticketInfo.bussinessKid * info.ticketCount.love
      + ticketInfo.bussinessKid * info.ticketCount.older
      + ticketInfo.bussinessGroup * info.ticketCount.student;
      return result;
    },
    getSeatsInfo() {
      const dbRef = ref( getDatabase( GetfirebaseConfig() ) );
      const goingDate = this.bookingData.goingTo.date;
      const goingTrainNo = this.bookingData.goingTo.trainNo;
      get( child( dbRef, `bookedSeats/${goingDate}/${goingTrainNo}` ) )
        .then( ( snapshot ) => {
          if ( snapshot.exists() ) {
            const response = snapshot.val();
            this.inputSeatData = response.seatsData;
            this.refreshInputSeats();
            this.initSeatTable();
          }
        } ).catch( ( error ) => {
          console.error( error );
        } );

      const backDate = this.bookingData.goingBack.date;
      const backTrainNo = this.bookingData.goingBack.trainNo;
      get( child( dbRef, `bookedSeats/${backDate}/${backTrainNo}` ) )
        .then( ( snapshot ) => {
          if ( snapshot.exists() ) {
            const response = snapshot.val();
            this.inputBackSeatData = response.seatsData;
            this.refreshInputSeats();
          }
        } ).catch( ( error ) => {
          console.error( error );
        } );
    },
    setTookOrNot() {
      const going = this.bookingData.goingTo;
      const back = this.bookingData.goingBack;
      if ( going.startStation.value < going.endStation.value ) {
        for ( let i = 0; i < this.tookOrNot.length; i++ ) {
          if ( going.startStation.value <= this.tookOrNot[i].station
					&& this.tookOrNot[i].station < going.endStation.value ) {
            this.tookOrNot[i].took = true;
          }
        }
      } else {
        for ( let j = 0; j < this.tookOrNot.length; j++ ) {
          if ( going.startStation.value >= this.tookOrNot[j].station
					&& this.tookOrNot[j].station > going.endStation.value ) {
            this.tookOrNot[j].took = true;
          }
        }
      }
      if ( back.trainNo ) {
        if ( back.startStation.value > back.endStation.value ) {
          for ( let k = 0; k < this.backTookOrNot.length; k++ ) {
            if ( back.endStation.value < this.backTookOrNot[k].station
						&& this.backTookOrNot[k].station <= back.startStation.value ) {
              this.backTookOrNot[k].took = true;
            }
          }
        } else {
          for ( let l = 0; l < this.backTookOrNot.length; l++ ) {
            if ( back.endStation.value > this.backTookOrNot[l].station
						&& this.backTookOrNot[l].station >= back.startStation.value ) {
              this.backTookOrNot[l].took = true;
            }
          }
        }
      }
    },
    refreshInputSeats() {
      if ( this.inputSeatData ) {
        const input = this.inputSeatData;
        const userBookedSeats = this.bookingData.goingTo.seatsNo;
        for ( let g = 0; g < userBookedSeats.length; g++ ) {
          for ( let h = 0; h < input.length; h++ ) {
            if ( userBookedSeats[g] === input[h].seatsNo ) {
              input.splice( h, 1 );
            }
          }
        }
        this.selectedSeats = userBookedSeats;
      }
      if ( this.inputBackSeatData ) {
        const backInput = this.inputBackSeatData;
        const userBookedBackSeats = this.bookingData.goingBack.seatsNo;
        for ( let i = 0; i < userBookedBackSeats.length; i++ ) {
          for ( let j = 0; j < backInput.length; j++ ) {
            if ( userBookedBackSeats[i] === backInput[j].seatsNo ) {
              backInput.splice( j, 1 );
            }
          }
        }
        this.backSeats = userBookedBackSeats;
      }
    },
    initSeatTable() {
      if ( this.inputSeatData.length > 0 ) {
        const inputs = this.inputSeatData;
        const { seats } = this;
        const going = this.bookingData.goingTo;
        let seat = {};
        let input = {};
        for ( let i = 0; i < inputs.length; i++ ) {
          for ( let j = 0; j < seats.length; j++ ) {
            seat = seats[j];
            for ( let k = 0; k < seat.length; k++ ) {
              if ( seat[k].No === inputs[i].seatsNo ) {
                input = inputs[i];
                for ( let l = 0; l < input.tookOrNot.length; l++ ) {
                  if ( going.endStation.value > going.startStation.value ) {
                    if ( going.startStation.value <= input.tookOrNot[l].station
										&& input.tookOrNot[l].station < going.endStation.value ) {
                      if ( input.tookOrNot[l].took === true ) {
                        seat[k].booked = '1';
                        break;
                      }
                    }
                  } else if ( going.endStation.value < input.tookOrNot[l].station
									&& input.tookOrNot[l].station <= going.startStation.value ) {
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
    initBackSeatTable() {
      if ( this.inputBackSeatData.length > 0 ) {
        const inputs = this.inputBackSeatData;
        const { seats } = this;
        const back = this.bookingData.goingBack;
        let seat = {};
        let input = {};
        for ( let i = 0; i < inputs.length; i++ ) {
          for ( let j = 0; j < seats.length; j++ ) {
            seat = seats[j];
            for ( let k = 0; k < seat.length; k++ ) {
              if ( seat[k].No === inputs[i].seatsNo ) {
                input = inputs[i];
                for ( let l = 0; l < input.tookOrNot.length; l++ ) {
                  if ( back.endStation.value > back.startStation.value ) {
                    if ( back.startStation.value <= input.tookOrNot[l].station
										&& input.tookOrNot[l].station < back.endStation.value ) {
                      if ( input.tookOrNot[l].took === true ) {
                        seat[k].booked = '1';
                        break;
                      }
                    }
                  } else if ( back.endStation.value < input.tookOrNot[l].station
									&& input.tookOrNot[l].station <= back.startStation.value ) {
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
    switchBack() {
      this.goingSeatTable = false;
      this.backSeatTable = true;
      this.seats = [
        [], [], [], [], [], [], [], [], [], [],
      ];
      this.showSeats = {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      };
      if ( this.backSeats.length > 0 ) {
        this.goingSeats = this.selectedSeats;
        this.selectedSeats = this.backSeats;
        const count = this.bookingData.goingBack.ticketCount;
        this.dealShowSeats( this.selectedSeats, this.showSeats, count );
      } else {
        this.goingSeats = this.selectedSeats;
        this.selectedSeats = [];
      }
      this.createSeats();
      this.initBackSeatTable();
    },
    switchGoing() {
      this.goingSeatTable = true;
      this.backSeatTable = false;
      this.seats = [
        [], [], [], [], [], [], [], [], [], [],
      ];
      this.showSeats = {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      };
      if ( this.goingSeats.length > 0 ) {
        this.backSeats = this.selectedSeats;
        this.selectedSeats = this.goingSeats;
        const count = this.bookingData.goingTo.ticketCount;
        this.dealShowSeats( this.selectedSeats, this.showSeats, count );
      } else {
        this.backSeats = this.selectedSeats;
        this.selectedSeats = [];
      }
      this.createSeats();
      this.initSeatTable();
    },
    rebuildSeats() {
      const goCount = this.bookingData.goingTo.ticketCount;
      const backCount = this.bookingData.goingBack.ticketCount;
      if ( this.goingSeatTable ) {
        this.showSeats = {
          adult: [],
          kid: [],
          love: [],
          older: [],
          student: [],
        };
        this.dealShowSeats( this.selectedSeats, this.showSeats, goCount );
      } else {
        this.showSeats = {
          adult: [],
          kid: [],
          love: [],
          older: [],
          student: [],
        };
        this.dealShowSeats( this.selectedSeats, this.showSeats, backCount );
      }
    },
    cancelUpdateData() {
      this.findBookingInfo();
    },
    cancelGoingTo() {
      this.confirmSymbol = 'going';
      this.customConfirm( this.$t( 'data.confirmCancel' ) );

      if ( this.confirmGoing ) {
        const db = getDatabase( GetfirebaseConfig() );
        if ( this.bookingData.goingBack.trainNo ) {
          update( ref( db, `bookedSeats/${this.bookingData.goingTo.date}/${this.bookingData.goingTo.trainNo}` ), {
            seatsData: this.inputSeatData,
          } );
          remove( ref( db, `users/${this.userId}/${this.phoneNum}/${this.selectedDate}/${this.selectedTime}/goingTo` ), {} );
          set( ref( db, `users/${this.userId}/${this.phoneNum}/${this.selectedDate}/${this.selectedTime}` ), {
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
          remove( ref( db, `users/${this.userId}/${this.phoneNum}/${this.selectedDate}/${this.selectedTime}/goingTo` ), {} )
            .then( () => {
              this.customAlert( this.$t( 'data.alertGoCancel' ) );
              window.location.reload();
            } );
        }
      }
    },
    cancelGoingBack() {
      this.confirmSymbol = 'back';
      this.customConfirm( this.$t( 'data.confirmBackCancel' ) );

      if ( this.confirmBack ) {
        const db = getDatabase( GetfirebaseConfig() );
        update( ref( db, `bookedSeats/${this.bookingData.goingBack.date}/${this.bookingData.goingBack.trainNo}` ), {
          seatsData: this.inputBackSeatData,
        } );
        remove( ref( db, `users/${this.userId}/${this.phoneNum}/${this.selectedDate}/${this.selectedTime}/goingBack` ), {} )
          .then( () => {
            this.customAlert( this.$t( 'data.alertBackCancel' ) );
            window.location.reload();
          } );
      }
    },
    setSeatsData( input, selectedSeats, took, count ) {
      const ticketType = {
        adult: [],
        kid: [],
        love: [],
        older: [],
        student: [],
      };
      this.dealShowSeats( selectedSeats, ticketType, count );
      let item = {};
      const waitDealInput = [];
      if ( input.length > 0 ) {
        for ( let i = 0; i < input.length; i++ ) {
          for ( let j = 0; j < selectedSeats.length; j++ ) {
            if ( input[i].seatsNo === selectedSeats[j] ) {
              item = JSON.stringify( input[i] );
              waitDealInput.push( JSON.parse( item ) );
            }
          }
        }
      }
      const oldArr = this.setSeatsTypeS( waitDealInput, ticketType, took );
      const newArr = this.dealNewBook( waitDealInput, selectedSeats, ticketType, took );
      for ( let a = 0; a < input.length; a++ ) {
        for ( let c = 0; c < oldArr.length; c++ ) {
          if ( input[a].seatsNo === oldArr[c].seatsNo ) {
            input.splice( a, 1, oldArr[c] );
          }
        }
      }
      for ( let b = 0; b < selectedSeats.length; b++ ) {
        input.push( selectedSeats[b] );
      }
      for ( let c = 0; c < input.length; c++ ) {
        for ( let d = 0; d < newArr.length; d++ ) {
          if ( input[c] === newArr[d].seatsNo ) {
            input.splice( c, 1, newArr[d] );
          }
        }
      }
      return input;
    },
    dealNewBook( waitDealInput, selected, ticketType, took ) {
      const selectedSeats = JSON.parse( JSON.stringify( selected ) );
      for ( let k = 0; k < selectedSeats.length; k++ ) {
        for ( let l = 0; l < waitDealInput.length; l++ ) {
          if ( selectedSeats[k] === waitDealInput[l].seatsNo ) {
            selectedSeats.splice( k, 1 );
          }
        }
      }
      let result = [];
      if ( selectedSeats.length > 0 ) {
        result = this.setSeatsType( selectedSeats, ticketType, took );
      }
      return result;
    },
    setSeatsType( selectedSeats, ticketType, tookInfo ) {
      const newSeats = [];
      const info = JSON.stringify( tookInfo );
      this.insertSeatsType( info, ticketType, selectedSeats, newSeats, 'adult' );
      this.insertSeatsType( info, ticketType, selectedSeats, newSeats, 'kid' );
      this.insertSeatsType( info, ticketType, selectedSeats, newSeats, 'love' );
      this.insertSeatsType( info, ticketType, selectedSeats, newSeats, 'older' );
      this.insertSeatsType( info, ticketType, selectedSeats, newSeats, 'student' );
      return newSeats;
    },
    insertSeatsType( info, ticketType, selectedSeats, newSeats, value ) {
      let item = {};
      let took = {};
      for ( let a = 0; a < ticketType[value].length; a++ ) {
        for ( let c = 0; c < selectedSeats.length; c++ ) {
          if ( ticketType[value][a] === selectedSeats[c] ) {
            took = JSON.parse( info );
            for ( let b = 0; b < took.length; b++ ) {
              if ( took[b].took ) {
                took[b].type = value;
                took[b].ID = this.userId;
                took[b].phone = this.phoneNum;
                took[b].date = this.selectedDate;
                took[b].time = this.selectedTime;
                item = { 	seatsNo: ticketType[value][a],	tookOrNot: took };
              }
            }
          }
        }
        newSeats.push( item );
      }
    },
    setSeatsTypeS( waitDealInput, ticketType, tookInfo ) {
      const arr = [];
      const info = JSON.stringify( tookInfo );
      this.insertSeatsTypeS( info, ticketType, waitDealInput, arr, 'adult' );
      this.insertSeatsTypeS( info, ticketType, waitDealInput, arr, 'kid' );
      this.insertSeatsTypeS( info, ticketType, waitDealInput, arr, 'love' );
      this.insertSeatsTypeS( info, ticketType, waitDealInput, arr, 'older' );
      this.insertSeatsTypeS( info, ticketType, waitDealInput, arr, 'student' );
      return arr;
    },
    insertSeatsTypeS( info, ticketType, waitDealInput, arr, value ) {
      let item = {};
      let took = {};
      let originTook = [];
      for ( let a = 0; a < ticketType[value].length; a++ ) {
        for ( let c = 0; c < waitDealInput.length; c++ ) {
          if ( waitDealInput[c].seatsNo === ticketType[value][a] ) {
            originTook = waitDealInput[c].tookOrNot;
            took = JSON.parse( info );
            for ( let b = 0; b < took.length; b++ ) {
              if ( took[b].took ) {
                originTook[b].type = value;
                originTook[b].took = true;
                originTook[b].ID = this.userId;
                originTook[b].phone = this.phoneNum;
                originTook[b].date = this.selectedDate;
                originTook[b].time = this.selectedTime;
                item = { 	seatsNo: ticketType[value][a],	tookOrNot: originTook };
              }
            }
          }
        }
        arr.push( item );
      }
    },
    getSelectedSeats() {
      if ( this.goingSeatTable ) {
        this.goingSeats = this.selectedSeats;
      } else {
        this.backSeats = this.selectedSeats;
      }
    },
    checkAndUpdate() {
      this.getSelectedSeats();
      if ( this.bookingData.goingBack.trainNo === '' ) {
        if ( this.goingSeats.length === this.ticketTotal ) {
          this.updateData();
        } else {
          this.customAlert( this.$t( 'data.alertTicks' ) );
        }
      } else if ( this.goingSeats.length === this.ticketTotal
			&& this.backSeats.length === this.backTicketTotal ) {
        this.updateData();
      } else {
        this.customAlert( this.$t( 'data.alertTicks' ) );
      }
    },
    updateData() {
      this.confirmSymbol = 'update';
      this.customConfirm( this.$t( 'data.confirmChange' ) );

      if ( this.confirmUpdate ) {
        const db = getDatabase( GetfirebaseConfig() );
        const count = this.bookingData.goingTo.ticketCount;
        this.setSeatsData( this.inputSeatData, this.goingSeats, this.tookOrNot, count );
        update( ref( db, `users/${this.userId}/${this.phoneNum}/${this.selectedDate}/${this.selectedTime}/goingTo` ), {
          ticketCount: this.bookingData.goingTo.ticketCount,
          price: this.bookingData.goingTo.price,
          seatsNo: this.goingSeats,
        } );
        update( ref( db, `bookedSeats/${this.bookingData.goingTo.date}/${this.bookingData.goingTo.trainNo}` ), {
          seatsData: this.inputSeatData,
        } );
        if ( this.bookingData.goingBack.trainNo ) {
          const count2 = this.bookingData.goingBack.ticketCount;
          this.setSeatsData( this.inputBackSeatData, this.backSeats, this.backTookOrNot, count2 );
          update( ref( db, `users/${this.userId}/${this.phoneNum}/${this.selectedDate}/${this.selectedTime}/goingBack` ), {
            ticketCount: this.bookingData.goingBack.ticketCount,
            price: this.bookingData.goingBack.price,
            seatsNo: this.backSeats,
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
	.ticket-table .table td{
		vertical-align: middle;
	}
	.ticket-table span{
		color: red;
		font-size: 1rem;
	}
	.booking-info .table td{
		vertical-align: middle;
	}
	.container{
		max-width: 1200px;
	}
  .user-container{
    margin: 15px;
  }
  .users{
    text-align: center;
    margin: 0;
    margin-left: -1px;
		margin-top: -1px;
    padding: 0;
  }
  .user{
    cursor: pointer;
    border: 1px solid black;
  }
	.user:hover{
		background: rgb(245, 245, 245);
	}
  .data-container{
    margin: 15px;
		max-width: 720px;
  }
	.num{
		width: 70px;
		justify-content: center;
	}
	.seats-info{
		display: inline-block;
		margin:0 2%;
	}
	.ticks{
		width: 150px;
	}
	.seat-title{
		text-align: center;
	}
	.seat-title .canBeChoose{
		display: inline-block;
		background: #8ecbcf;
		color: #8ecbcf;
	}
	.seat-title .BeChoosed{
		display: inline-block;
		background: #d86c6c;
		color: #d86c6c;
	}
	.seat-title .cantBeChoose{
		display: inline-block;
		background: #5e7380;
		color: #5e7380;
	}
	.seat-choice{
		margin: 5% auto;
		width: 70%;
		border: 2px solid #ccc;
		text-align: center;
	}
	.seat-choice h3{
		display: inline-block;
		margin: 2% 0 0 0;
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
	.one-train input[type='checkbox'] {
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
		margin: 2% 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
	}
	.single-car{
		margin: 0 2%;
		height: 100%;
		width: 4%;
		font-size: normal;
		cursor: pointer;
		color: rgb(0, 0, 0);
		transition: 0.2s ease all;
	}
	.single-car:hover{
		color: rgb(224, 228, 235);
		background: rgb(122, 173, 231);
		border-radius: 25%;
	}
	@media (max-width: 1000px) {
		.seat-choice{
			width: 95%;
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
		.single-car{
			margin: 0 3%;
		}
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
	@media (max-width: 450px) {
		.one-train .button{
			width: 4vh;
			height: 6vh;
		}
		.user-container{
			font-size: 12px;
		}
		.v-btn:not(.v-btn--round).v-size--default{
			font-size: 12px;
			padding: 0 3px;
		}
	}
</style>
