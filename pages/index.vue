<template>
		<v-app>
        <v-container class="mainContent">
            <v-row justify="center" class="title">
                <h2>高鐵時刻表與票價查詢</h2>
            </v-row>
        </v-container>
        <v-container class="selection">
            <v-row justify="space-around" class="trip">
                <v-col cols="4">
										<!-- <v-select label="起程站" :items="stops" item-text="name" value="value" v-model="searchInfo.departure"></v-select> -->
                    <label for="departure">起程站</label>
                    <br>
                    <select name="departure" v-model="searchInfo.departure">
                        <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                    </select>
                </v-col>
                <v-col cols="4">
                    <label for="arrival">到達站</label>
                    <br>
                    <select name="arrival" v-model="searchInfo.arrival">
                        <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                    </select>
                </v-col>
                <v-col cols="4" align-self="end">
                    <label for="oneWayOrNot"></label>
                    <br>
                    <select name="oneWayOrNot" v-model="searchInfo.oneWayOrNot">
                        <option value="false">單程</option>
                        <option value="true">去回程</option>
                    </select>
                </v-col>
            </v-row>
            <v-row justify="space-around" class="dateTime">
                <div>
                    <label for="departDate">去程日期</label>
                    <br>
                    <input type="date" name="departDate" id="departDate" v-model="searchInfo.departDate">
                </div>
                <div>
                    <label for="departTime">去程時間</label>
                    <br>
                    <input type="time" name="departTime" id="departTime" v-model="searchInfo.departTime">
                </div>
            </v-row>
            <v-row justify="space-around" class="backDateTime" v-if="searchInfo.oneWayOrNot == 'true' ">
                <div>
                    <label for="backDepartDate">回程日期</label>
                    <br>
                    <input type="date" name="backDepartDate" id="backDepartDate" v-model="searchInfo.backDepartDate">
                </div>
                <div>
                    <label for="backDepartTime">回程時間</label>
                    <br>
                    <input type="time" name="backDepartTime" id="backDepartTime" v-model="searchInfo.backDepartTime">
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
				{ name: "南港", value: "0990" },
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

<style>
	input{
			background: white;
			border: 1px solid black;
	}
	select{
			background: white;
			appearance: auto;
			border: 1px solid black;
	}
	.mainContent{
		position: relative;
		margin: 30px auto;
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
	.trip{
		text-align: center;
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