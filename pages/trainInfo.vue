<template>
    <div class="container trainInfo">
		<h2 v-if="trainInfo != '' ">請選擇列車</h2>
        <div class="error row justify-content-center" v-if="trainInfo.length == 0 && !ticketInfo.standardAdult ">
            <h1>請選擇車站與時段</h1>
        </div>
        <div class="trainItem row justify-content-center align-items-center mt-2" v-if="trainInfo != '' ">
            <div class="col-2 trainNo">列車編號</div>
            <div class="col trainTime">出發及抵達時間</div>
            <div class="col-3 trainStation">起訖站</div>
            <div class="col-3 seatInfo">剩餘座位</div>
        </div>
        <div class="trains row justify-content-center align-items-center mt-0" v-for="oneTrainInfo in trainInfo" :key="oneTrainInfo.index">
            <div class="col-2 trainNo" >
                <input type="radio" name="selected" v-model="selectedTrain" :value="oneTrainInfo">
                {{oneTrainInfo.DailyTrainInfo.TrainNo}}
            </div>
            <div class="col trainTime">
                {{oneTrainInfo.OriginStopTime.DepartureTime}}
                ~
                {{oneTrainInfo.DestinationStopTime.ArrivalTime}}
                <br>
                <span>行駛時間{{oneTrainInfo.movingTime}}</span>
            </div>
            <div class="col-3 trainStation">
                {{oneTrainInfo.OriginStopTime.StationName.Zh_tw}}
                ~
                {{oneTrainInfo.DestinationStopTime.StationName.Zh_tw}}
            </div>
            <div class="col-3 seatInfo">
                商務席:{{oneTrainInfo.BusinessSeatStatus}}
                ；
                標準席:{{oneTrainInfo.StandardSeatStatus}}
            </div>
        </div>
        <div class="trainItem row justify-content-center align-items-center"  v-if="backTrainInfo != '' ">
            <div class="col-2 trainNo">列車編號 <span>(點選預定)</span></div>
            <div class="col trainTime">出發及抵達時間</div>
            <div class="col-3 trainStation">起訖站</div>
            <div class="col-3 seatInfo">剩餘座位</div>
        </div>
        <div class="trains row justify-content-center align-items-center mt-0" v-for="oneBackTrainInfo in backTrainInfo" :key="oneBackTrainInfo.index">
            <div class="col-2 trainNo" >
                <input type="radio" name="backSelected" v-model="selectedBackTrain" :value="oneBackTrainInfo">
                {{oneBackTrainInfo.DailyTrainInfo.TrainNo}}
            </div>
            <div class="col trainTime">
                {{oneBackTrainInfo.OriginStopTime.DepartureTime}}
                ~
                {{oneBackTrainInfo.DestinationStopTime.ArrivalTime}}
                <br>
                <span>行駛時間{{oneBackTrainInfo.movingTime}}</span>
            </div>
            <div class="col-3 trainStation">
                {{oneBackTrainInfo.OriginStopTime.StationName.Zh_tw}}
                ~
                {{oneBackTrainInfo.DestinationStopTime.StationName.Zh_tw}}
            </div>
            <div class="col-3 seatInfo">
                商務席:{{oneBackTrainInfo.BusinessSeatStatus}}
                ；
                標準席:{{oneBackTrainInfo.StandardSeatStatus}}
            </div>
        </div>
        <div class="ticketPrice" v-if="ticketInfo.standardAdult">
            <TicketPrice :parentInfo="ticketInfo"></TicketPrice>
        </div>
        <div class="booking row justify-content-center">
            <NuxtLink to="/booking">
                <div class="btn btn-outline-warning">
                    進入訂票頁面
                </div>
            </NuxtLink>
        </div>
        <div class="back row justify-content-center">
            <div class="m-3">
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return{
			selectedTrain: [],
			selectedBackTrain: [],
			ticketInfo: {},
            trainInfo: [],
            backTrainInfo: [],
    };
  },
  created() {
		this.ticketInfo = this.$store.state.ticketInfo;
		this.trainInfo = this.$store.state.trainInfo;
		this.backTrainInfo = this.$store.state.backTrainInfo;
  },
  updated() {
		if ( this.$store.state.oneWayOrNot === "false" ) {
			if ( this.selectedTrain.BusinessSeatStatus == 'X' ) {
				if ( this.selectedTrain.StandardSeatStatus == 'X' ) {
					alert("所選列車標準席與商務席已滿");
					this.chooseTrain();
				} else {
				alert("所選列車商務席已滿");
				this.chooseTrain();
				}
			} else if ( this.selectedTrain.StandardSeatStatus == 'X' ) {
				alert("所選列車標準席已滿");
					this.chooseTrain();
			} else {
				this.chooseTrain();
			}
		} else if ( this.$store.state.oneWayOrNot === "true" ) {
			if ( this.selectedTrain.BusinessSeatStatus == 'X' || this.selectedBackTrain.BusinessSeatStatus == 'X' ) {
				if (this.selectedTrain.StandardSeatStatus == 'X' || this.selectedBackTrain.StandardSeatStatus == 'X' ) {
					alert("所選列車標準席與商務席已滿");
					this.chooseTrain();
					this.chooseBackTrain();
					} else {
					alert("所選列車商務席已滿");
					this.chooseTrain();
					this.chooseBackTrain();
				}
			} else if ( this.selectedTrain.StandardSeatStatus == 'X' || this.selectedBackTrain.StandardSeatStatus == 'X' ) {
				alert("所選列車標準席已滿");
				this.chooseTrain();
				this.chooseBackTrain();
			} else {
				this.chooseTrain();
				this.chooseBackTrain();
			}
		}
  },
  computed: {

  },
  methods:{
		chooseTrain() {
			this.$store.commit( "chooseTrain", this.selectedTrain );
		},
		chooseBackTrain() {
			this.$store.commit( "chooseBackTrain", this.selectedBackTrain );
		},
  },
}
</script>

<style scoped>
	.trainInfo{
		max-width: 1200px;
	}
	.trainItem{
		font-size: 1.5rem;
		font-weight: normal;
		text-align: center;
	}
	.trains{
		border-bottom: 3px solid #EEEEEE;
		text-align: center;
	}
	.trains:hover{
		background-color: rgb(182, 226, 253);
	}
	.trainTime span{
		font-size: 0.6rem;
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
	}
</style>