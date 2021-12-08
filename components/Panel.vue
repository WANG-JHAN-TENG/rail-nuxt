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
                    <select name="departure" v-model="Departure">
                        <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                    </select>
                </div>
                <div class="col-4">
                    <label for="arrival">到達站</label>
                    <br>
                    <select name="arrival" v-model="Arrival">
                        <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                    </select>
                </div>
                <div class="col-4">
                    <label for="oneWayOrNot"></label>
                    <br>
                    <select name="oneWayOrNot" v-model="OneWayOrNot">
                        <option value="false">單程</option>
                        <option value="true">去回程</option>
                    </select>
                </div>
            </div>
            <div class="row justify-content-around dateTime">
                <div class="col-4">
                    <label for="departDate">去程日期</label>
                    <br>
                    <input type="date" name="departDate" id="departDate" v-model="DepartDate">
                </div>
                <div class="col-4">
                    <label for="departTime">去程時間</label>
                    <br>
                    <input type="time" name="departTime" id="departTime" v-model="DepartTime">
                </div>
            </div>
            <div class="row justify-content-around backDateTime" v-if="OneWayOrNot == 'true' ">
                <div class="col-4">
                    <label for="backDepartDate">回程日期</label>
                    <br>
                    <input type="date" name="backDepartDate" id="backDepartDate" v-model="BackDepartDate">
                </div>
                <div class="col-4">
                    <label for="backDepartTime">回程時間</label>
                    <br>
                    <input type="time" name="backDepartTime" id="backDepartTime" v-model="BackDepartTime">
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
  data(){
    return{
        stops:[
            {name: "請選擇",value: ""},
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
    };
  },
  computed: {
    Departure: {
        get () {
        return this.$store.state.departure
        },
        set (value) {
        this.$store.commit('setDeparture', value)
        }
    },
    Arrival: {
        get () {
        return this.$store.state.arrival
        },
        set (value) {
        this.$store.commit('setArrival', value)
        }
    },
    OneWayOrNot:{
        get () {
        return this.$store.state.oneWayOrNot
        },
        set (value) {
        this.$store.commit('setOneWayOrNot', value)
        }   
    },
    DepartDate: {
        get () {
        return this.$store.state.departDate
        },
        set (value) {
        this.$store.commit('setDepartDate', value)
        }
    },
    DepartTime: {
        get () {
        return this.$store.state.departTime
        },
        set (value) {
        this.$store.commit('setDepartTime', value)
        }
    },
    BackDepartDate: {
        get () {
        return this.$store.state.backDepartDate
        },
        set (value) {
        this.$store.commit('setBackDepartDate', value)
        }
    },
    BackDepartTime: {
        get () {
        return this.$store.state.backDepartTime
        },
        set (value) {
        this.$store.commit('setBackDepartTime', value)
        }
    },
  },
  updated(){
    this.$store.dispatch("searching");
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