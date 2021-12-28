<template>
		<v-app>
				<v-container class="trainInfo">
						<div v-if="trainInfo != '' ">
								<h2>請選擇列車</h2>
						</div>
						<div class="m-5" v-if="trainInfo.length == 0 && !ticketInfo.standardAdult ">
								<h1 class="text-center">請選擇車站與時段</h1>
						</div>
						<div class="trainItem mt-5" v-if="trainInfo != '' ">
								<h4>
									{{trainInfo[0].OriginStopTime.StationName.Zh_tw}} ~ {{trainInfo[0].DestinationStopTime.StationName.Zh_tw}}
								</h4>
								<v-data-table
									v-model="selectedTrain"
									:headers="headers"
									:items="trainInfo"
									:items-per-page="5"
									item-key="DailyTrainInfo.TrainNo"
									:single-select="true"
									show-select
									class="elevation-1"
									disable-sort
									hide-default-footer
								></v-data-table>
								<hr>
						</div>
						<div class="trainItem mt-5" v-if="backTrainInfo != '' ">
								<h4>
									{{trainInfo[0].DestinationStopTime.StationName.Zh_tw}} ~ {{trainInfo[0].OriginStopTime.StationName.Zh_tw}}
								</h4>
								<v-data-table
									v-model="selectedBackTrain"
									:headers="headers"
									:items="backTrainInfo"
									:items-per-page="5"
									item-key="DailyTrainInfo.TrainNo"
									:single-select="true"
									show-select
									class="elevation-1"
									disable-sort
									hide-default-footer
								></v-data-table>
								<hr>
						</div>
						<div class="ticketPrice my-3" v-if="ticketInfo.standardAdult">
								<TicketPrice :parentInfo="ticketInfo"></TicketPrice>
						</div>
						<v-row justify="center" class="booking ma-2">
								<v-btn nuxt to="/booking" color="warning">進入訂票頁面</v-btn>
								<!-- <NuxtLink to="/booking">
										<button class="btn btn-outline-warning" :disabled="isBtnDisabled">
												進入訂票頁面
										</button>
								</NuxtLink> -->
						</v-row>
						<v-row justify="space-around" class="back ma-2">
								<v-btn nuxt to="/" color="grey darken-1">返回查詢頁面</v-btn>
								<v-btn nuxt to="/bookingInfo" color="blue">訂票查詢</v-btn>
								<!-- <div class="m-3">
										<NuxtLink to="/">
												<div class="btn btn-outline-secondary">
														返回查詢頁面
												</div>
										</NuxtLink>
								</div>
								<div class="m-3">
										<NuxtLink to="/bookingInfo">
												<div class="search btn btn-primary">
														訂票查詢
												</div>
										</NuxtLink>
								</div> -->
						</v-row>
				</v-container>
		</v-app>
</template>

<script>
export default {
  data() {
    return{
			headers: [
				{
					text: '列車編號',
					align: 'center',
					sortable: false,
					value: 'DailyTrainInfo.TrainNo',
				},
				{ text: '出發及抵達時間', align: 'center', value: 'startEndTime' },
				{ text: '行車時間', align: 'center', value: 'movingTime' },
				{ text: '剩餘座位', align: 'center', value: 'SeatStatus' },
			],
			selectedTrain: [],
			selectedBackTrain: [],
			ticketInfo: {},
			trainInfo: [],
			backTrainInfo: [],
			isBtnDisabled: true,
    };
  },
  created() {
		this.ticketInfo = this.$store.state.ticketInfo;
		this.trainInfo = this.$store.state.trainInfo;
		this.backTrainInfo = this.$store.state.backTrainInfo;
  },
  updated() {
		this.checkSelect();
		this.checkTrainStatus();
  },
  computed: {

  },
  methods:{
		chooseTrain() {
			this.$store.commit( "chooseTrain", this.selectedTrain[0] );
		},
		chooseBackTrain() {
			this.$store.commit( "chooseBackTrain", this.selectedBackTrain[0] );
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
			if ( this.$store.state.oneWayOrNot === "false" ) {
				if (this.selectedTrain.length > 0 ) {
					if ( this.selectedTrain[0].BusinessSeatStatus === 'X' ) {
						if ( this.selectedTrain[0].StandardSeatStatus === 'X' ) {
							alert("所選列車標準席與商務席已滿");
							this.chooseTrain();
						} else {
						alert("所選列車商務席已滿");
						this.chooseTrain();
						}
					} else if ( this.selectedTrain[0].StandardSeatStatus === 'X' ) {
						alert("所選列車標準席已滿");
							this.chooseTrain();
					} else {
						this.chooseTrain();
					}
				}
			} else {
				if (this.selectedTrain.length > 0 && this.selectedBackTrain.length > 0 ) {
					if ( this.selectedTrain[0].BusinessSeatStatus === 'X' || this.selectedBackTrain[0].BusinessSeatStatus === 'X' ) {
						if (this.selectedTrain[0].StandardSeatStatus === 'X' || this.selectedBackTrain[0].StandardSeatStatus === 'X' ) {
							alert("所選列車標準席與商務席已滿");
							this.chooseTrain();
							this.chooseBackTrain();
							} else {
							alert("所選列車商務席已滿");
							this.chooseTrain();
							this.chooseBackTrain();
						}
					} else if ( this.selectedTrain[0].StandardSeatStatus === 'X' || this.selectedBackTrain[0].StandardSeatStatus === 'X' ) {
						alert("所選列車標準席已滿");
						this.chooseTrain();
						this.chooseBackTrain();
					} else {
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
	.trainInfo{
		max-width: 1200px;
	}
	.trainItem{
		font-weight: normal;
		text-align: center;
	}
	@media (max-width: 725px) {
		.trainItem{
			font-size: 16px;
		}
		.trains{
			font-size: 14px;
		}
	}
	@media (max-width: 450px) {
		.trainItem{
			font-size: 14px;
		}
		.trains{
			font-size: 13px;
		}
		.train{
				padding: 12px 6px;
		}
		.train span{
				font-size: 12px;
		}
	}
</style>