<template>
    <div class="container-fluid">
        <div class="container mainContent">
            <div class="row justify-content-center title">
                <h2>高鐵時刻表與票價查詢</h2>
            </div>
        </div>
        <div class="container selection">
            <div class="row justify-content-around trip">
                <div class="col-4">
                    <label for="departure">起程站</label>
                    <br>
                    <select name="departure" v-model="searchInfo.departure">
                        <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                    </select>
                </div>
                <div class="col-4">
                    <label for="arrival">到達站</label>
                    <br>
                    <select name="arrival" v-model="searchInfo.arrival">
                        <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                    </select>
                </div>
                <div class="col-4">
                    <label for="oneWayOrNot"></label>
                    <br>
                    <select name="oneWayOrNot" v-model="searchInfo.oneWayOrNot">
                        <option value="false">單程</option>
                        <option value="true">去回程</option>
                    </select>
                </div>
            </div>
            <div class="row justify-content-around dateTime">
                <div class="col-4">
                    <label for="departDate">去程日期</label>
                    <br>
                    <input type="date" name="departDate" id="departDate" v-model="searchInfo.departDate">
                </div>
                <div class="col-4">
                    <label for="departTime">去程時間</label>
                    <br>
                    <input type="time" name="departTime" id="departTime" v-model="searchInfo.departTime">
                </div>
            </div>
            <div class="row justify-content-around backDateTime" v-if="searchInfo.oneWayOrNot == 'true' ">
                <div class="col-4">
                    <label for="backDepartDate">回程日期</label>
                    <br>
                    <input type="date" name="backDepartDate" id="backDepartDate" v-model="searchInfo.backDepartDate">
                </div>
                <div class="col-4">
                    <label for="backDepartTime">回程時間</label>
                    <br>
                    <input type="time" name="backDepartTime" id="backDepartTime" v-model="searchInfo.backDepartTime">
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4 sendMes">
                    <NuxtLink to="/trainInfo">
                        <div class="search btn btn-warning">
                            查詢
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-end">
                <div class="col-2">
                    <NuxtLink to="/bookingInfo">
                        <div class="search btn btn-primary">
                            訂票查詢
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        stops: [
            { name: "請選擇", value: "" },
            {name: "南港",value: "0990"},
            {name: "台北",value: "1000"},
            {name: "板橋",value: "1010"},
            {name: "桃園",value: "1020"},
            {name: "新竹",value: "1030"},
            {name: "苗栗",value: "1035"},
            {name: "台中",value: "1040"},
            {name: "彰化",value: "1043"},
            {name: "雲林",value: "1047"},
            {name: "嘉義",value: "1050"},
            {name: "台南",value: "1060"},
            {name: "左營",value: "1070"}
        ],
        searchInfo: {
            departure: {name: "請選擇",value: ""},
            arrival: {name: "請選擇",value: ""},
            oneWayOrNot:"false",
            departDate:"",
            departTime:"",
            backDepartDate:"",
            backDepartTime:""
        },
    };
  },
  computed: {

  },
  created(){
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
  updated(){
      if (this.searchInfo.oneWayOrNot === "true") {
        this.$store.commit("insertData", this.searchInfo);
          if(this.searchInfo.backDepartDate && this.searchInfo.backDepartTime){
            this.$store.dispatch("searching");
          }
      }else{
        this.$store.commit("insertData", this.searchInfo);
        this.$store.dispatch("searching");
      }
  },
  methods:{

  },
}
</script>

<style>
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
}
.trip{
    margin: 15px 0;
    text-align: center;
}
.dateTime{
    margin: 15px 0;
}
.backDateTime{
    margin: 15px 0;
}
.sendMes{
    text-align: center;
}
.search{
    font-size: 1.rem;
}
</style>