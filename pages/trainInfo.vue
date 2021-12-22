<template>
    <div class="container trainInfo">
        <div class="error row justify-content-center" v-if="trainInfo.length == 0 && !ticketInfo.standardAdult ">
            <h1>請選擇車站與時段</h1>
        </div>
        <div class="trainItem row justify-content-center" v-if="trainInfo != '' ">
            <div class="col-3 trainNo">列車編號 <span>(點選預定)</span></div>
            <div class="col-3 trainTime">出發及抵達時間</div>
            <div class="col-3 trainStation">起訖站</div>
            <div class="col-3 seatInfo">剩餘座位</div>
        </div>
        <div class="trains row justify-content-center " v-for="oneTrainInfo in trainInfo" :key="oneTrainInfo.index">
            <div class="col-3 trainNo" >
                <input type="radio" name="selected" v-model="selectedTrain" :value="oneTrainInfo">
                {{oneTrainInfo.DailyTrainInfo.TrainNo}}
            </div>
            <div class="col-3 trainTime">
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
        <div class="trainItem row justify-content-center"  v-if="backTrainInfo != '' ">
            <div class="col-3 trainNo">列車編號 <span>(點選預定)</span></div>
            <div class="col-3 trainTime">出發及抵達時間</div>
            <div class="col-3 trainStation">起訖站</div>
            <div class="col-3 seatInfo">剩餘座位</div>
        </div>
        <div class="trains row justify-content-center " v-for="oneBackTrainInfo in backTrainInfo" :key="oneBackTrainInfo.index">
            <div class="col-3 trainNo" >
                <input type="radio" name="backSelected" v-model="selectedBackTrain" :value="oneBackTrainInfo">
                {{oneBackTrainInfo.DailyTrainInfo.TrainNo}}
            </div>
            <div class="col-3 trainTime">
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
            <div class="col-3"></div>
            <div class="col-3">
                <NuxtLink to="/">
                    <div class="btn btn-outline-secondary">
                        返回查詢頁面
                    </div>
                </NuxtLink>
            </div>
            <div class="col-3">
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

<style>
  .trainInfo{
		max-width: 1200px;
	}
	.trainNo span{
		font-size: 0.7rem;
	}
	.trainItem{
		font-size: 1.5rem;
		font-weight: normal;
	}
	.col-3{
		text-align: center;
	}
	.trains{
        margin-top: 0;
		border-bottom: 3px solid #EEEEEE;
	}
	.trains:hover{
		background-color: rgb(182, 226, 253);
	}
	.trainTime span{
		font-size: 0.6rem;
	}
	.back{
		margin: 10px;
	}
</style>