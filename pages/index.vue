<template>
		<v-app>
        <v-container class="mainContent">
            <v-row justify="center" class="title">
                <h2>高鐵時刻表與票價查詢123</h2>
            </v-row>
        </v-container>
        <v-container class="selection">
            <v-row justify="space-around" class="trip">
                <div>
										<v-select class="station" label="起程站" :items="stops" item-text="name" item-value="value" v-model="searchInfo.departure" return-object background-color="white">
										</v-select>
                </div>
                <div>
										<v-select class="station" label="到達站" :items="stops" item-text="name" item-value="value" v-model="searchInfo.arrival" return-object background-color="white">
										</v-select>
                </div>
                <div align-self="end">
										<v-select class="station" :items="ways" item-text="name" item-value="value" v-model="searchInfo.oneWayOrNot" background-color="white">
										</v-select>
                </div>
            </v-row>
            <v-row justify="space-around" class="dateTime">
                <div>
										<v-text-field label="去程日期" type="date" v-model="searchInfo.departDate" background-color="white">
										</v-text-field>
                </div>
                <div>
										<v-text-field label="去程時間" type="time" v-model="searchInfo.departTime" background-color="white">
										</v-text-field>
                </div>
            </v-row>
            <v-row justify="space-around" class="backDateTime" v-if="searchInfo.oneWayOrNot == 'true' ">
                <div>
										<v-text-field label="回程日期" type="date" v-model="searchInfo.backDepartDate" background-color="white">
										</v-text-field>
                </div>
                <div>
										<v-text-field label="回程時間" type="time" v-model="searchInfo.backDepartTime" background-color="white">
										</v-text-field>
                </div>
            </v-row>
            <v-row justify="center">
                <v-col cols="4" class="sendMes">
										<v-btn nuxt to="trainInfo" color="warning">
												查詢
										</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-container class="footer">
            <v-row justify="end">
                <v-col cols="4" sm="2">
										<v-btn color="primary" nuxt to="/bookingInfo"> 訂票查詢</v-btn>
                </v-col>
                <v-col cols="4" sm="2">
										<v-btn color="grey darken-4" dark @click="goManage">管理頁面</v-btn>
                </v-col>
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
					{name : "單程" , value: "false"},
					{name : "去回程" , value: "true"},
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
  },
  updated() {
		if ( this.searchInfo.oneWayOrNot === "true" ) {
			this.$store.commit ( "insertData", this.searchInfo );
				if ( this.searchInfo.backDepartDate && this.searchInfo.backDepartTime ) {
					this.$store.dispatch("searching");
				}
		} else {
			this.$store.commit ( "insertData" , this.searchInfo );
			this.$store.dispatch ( "oneWaySearching" );
		}
  },
  methods:{
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
	.mainContent{
		position: relative;
		margin: 30px auto;
	}
	.station{
		width: 100px;
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
	.sendMes{
		text-align: center;
	}
	.search{
		font-size: 1.rem;
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