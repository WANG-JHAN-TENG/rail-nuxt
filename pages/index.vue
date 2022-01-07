<template>
		<v-app>
        <v-container class="mainContent">
            <v-row justify="center" class="title">
                <h2 class="text-h5 text-sm-h4">{{ $t('index.title') }}</h2>
            </v-row>
        </v-container>
        <v-container class="selection">
            <v-row justify="space-around" class="trip">
                <div>
										<v-select class="station" :label="$t('index.departure')" :items="stops" item-text="name" item-value="value" v-model="searchInfo.departure" return-object background-color="white">
										</v-select>
                </div>
                <div>
										<v-select class="station" :label="$t('index.arrival')" :items="stops" item-text="name" item-value="value" v-model="searchInfo.arrival" return-object background-color="white">
										</v-select>
                </div>
                <div align-self="end">
										<v-select class="station" :items="ways" item-text="name" item-value="value" v-model="searchInfo.oneWayOrNot" background-color="white">
										</v-select>
                </div>
            </v-row>
            <v-row justify="space-around" class="dateTime">
                <div>
										<v-text-field :label="$t('index.goDate')" type="date" v-model="searchInfo.departDate" background-color="white">
										</v-text-field>
                </div>
                <div>
										<v-text-field :label="$t('index.goTime')" type="time" v-model="searchInfo.departTime" background-color="white">
										</v-text-field>
                </div>
            </v-row>
            <v-row justify="space-around" class="backDateTime" v-if="searchInfo.oneWayOrNot == 'true' ">
                <div>
										<v-text-field :label="$t('index.backDate')" type="date" v-model="searchInfo.backDepartDate" background-color="white">
										</v-text-field>
                </div>
                <div>
										<v-text-field :label="$t('index.backTime')" type="time" v-model="searchInfo.backDepartTime" background-color="white">
										</v-text-field>
                </div>
            </v-row>
            <v-row justify="center">
								<v-btn nuxt :to="localePath('trainInfo')" color="warning">
										{{ $t('index.search') }}
								</v-btn>
            </v-row>
        </v-container>
        <v-container class="footer my-3">
            <v-row justify="space-around">
								<v-btn color="primary" max-width="100" nuxt :to="localePath('bookingInfo')">{{ $t('index.bookSearch') }}</v-btn>
								<v-btn color="grey darken-4" dark @click="goManage">{{ $t('index.manage') }}</v-btn>
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