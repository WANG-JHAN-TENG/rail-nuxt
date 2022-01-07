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
                <div>
										<v-text-field
											v-model="searchInfo.backDepartDate"
											:label="$t('index.backDate')"
											type="date"
											background-color="white"
										></v-text-field>
                </div>
                <div>
										<v-text-field
											v-model="searchInfo.backDepartTime"
											:label="$t('index.backTime')"
											type="time"
											background-color="white"
										></v-text-field>
                </div>
            </v-row>
            <v-row justify="center">
								<v-btn nuxt :to="localePath('trainInfo')" :disabled="isBtnDisabled" color="warning">
										{{ $t('index.search') }}
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
export default {
  data() {
    return {
			stops: [
				{ name: "請選擇" , value: "" },
				{ name: "南港" , value: "0990" },
				{ name: "台北" , value: "1000" },
				{ name: "板橋" , value: "1010" },
				{ name: "桃園" , value: "1020" },
				{ name: "新竹" , value: "1030" },
				{ name: "苗栗" , value: "1035" },
				{ name: "台中" , value: "1040" },
				{ name: "彰化" , value: "1043" },
				{ name: "雲林" , value: "1047" },
				{ name: "嘉義" , value: "1050" },
				{ name: "台南" , value: "1060" },
				{ name: "左營" , value: "1070" }
			],
			ways: [
					{ name : "單程" , value: false },
					{ name : "去回程" , value: true },
			],
			searchInfo: {
				departure: { name: "請選擇" , value: "" },
				arrival: { name: "請選擇" , value: "" },
				oneWayOrNot: "false",
				departDate: "",
				departTime: "",
				backDepartDate: "",
				backDepartTime: ""
			},
			isBtnDisabled: true,
    };
  },
  computed: {
  },
  mounted() {
		this.searchInfo.departure.name = this.$store.state.departureName;
		this.searchInfo.departure.value = this.$store.state.departureValue;
		this.searchInfo.arrival.name = this.$store.state.arrivalName;
		this.searchInfo.arrival.value = this.$store.state.arrivalValue;
		this.searchInfo.oneWayOrNot = this.$store.state.oneWayOrNot;
		this.searchInfo.departDate = this.$store.state.departDate;
		this.searchInfo.departTime = this.$store.state.departTime;
		this.searchInfo.backDepartDate = this.$store.state.backDepartDate;
		this.searchInfo.backDepartTime = this.$store.state.backDepartTime;
  },
	watch: {
		"searchInfo.oneWayOrNot": function( ){
			if ( this.searchInfo.oneWayOrNot ) {
				this.checkBackData();
			} else {
				this.checkData();
			}
		},
		"searchInfo.departTime": function( ){
			this.checkData();
			this.$store.commit ( "insertData" , this.searchInfo );
			this.$store.dispatch ( "oneWaySearching" );
		},
		"searchInfo.backDepartTime": function( ){
			this.checkBackData();
			this.$store.commit ( "insertData", this.searchInfo );
			this.$store.dispatch("searching");
		},
	},
  methods:{
		checkData() {
			if ( this.searchInfo.oneWayOrNot ) {
				this.isBtnDisabled = true;
			} else {
				if ( this.searchInfo.departure.value === "" || this.searchInfo.arrival.value === "" || this.searchInfo.departDate === "" || this.searchInfo.departTime === "" ) {
					this.isBtnDisabled = true;
				} else {
					this.isBtnDisabled = false;
				}
			}
		},
		checkBackData() {
			if ( this.searchInfo.departure.value === "" || this.searchInfo.arrival.value === "" || this.searchInfo.departDate === "" || this.searchInfo.departTime === "" ) {
				this.isBtnDisabled = true;
			} else if ( this.searchInfo.backDepartDate === "" || this.searchInfo.backDepartTime === "" ) {
				this.isBtnDisabled = true;
			} else {
				this.isBtnDisabled = false;
			}
		},
		goManage() {
			let getIn = prompt( "管理密碼?" , "" );
			if ( getIn === "0000" ){
					window.location.assign("/rail-nuxt/manage");
			} else {
					alert("密碼錯誤")
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
		content: "";
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