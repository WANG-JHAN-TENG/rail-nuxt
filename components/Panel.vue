<template>
    <div class="container-fluid">
        <div class="container mainContent">
            <div class="row justify-content-center title">
                <h2>時刻表與票價查詢</h2>
            </div>
        </div>
        <div class="container selection">
            <div class="row justify-content-around trip">
                <div class="col-4">
                    <label for="departure">起程站</label>
                    <br>
                    <select name="departure" v-model="Departure">
                        <option value="">請選擇</option>
                        <option value="0990">南港</option>
                        <option value="1000">台北</option>
                        <option value="1010">板橋</option>
                        <option value="1020">桃園</option>
                        <option value="1030">新竹</option>
                        <option value="1035">苗栗</option>
                        <option value="1040">台中</option>
                        <option value="1043">彰化</option>
                        <option value="1047">雲林</option>
                        <option value="1050">嘉義</option>
                        <option value="1060">台南</option>
                        <option value="1070">左營</option>
                    </select>
                </div>
                <div class="col-4">
                    <label for="arrival">到達站</label>
                    <br>
                    <select name="arrival" v-model="Arrival">
                        <option value="">請選擇</option>
                        <option value="0990">南港</option>
                        <option value="1000">台北</option>
                        <option value="1010">板橋</option>
                        <option value="1020">桃園</option>
                        <option value="1030">新竹</option>
                        <option value="1035">苗栗</option>
                        <option value="1040">台中</option>
                        <option value="1043">彰化</option>
                        <option value="1047">雲林</option>
                        <option value="1050">嘉義</option>
                        <option value="1060">台南</option>
                        <option value="1070">左營</option>
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
                        <div class="search btn btn-outline-warning">
                            查詢
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <!-- <div class="test" v-if="Departure !='' && Arrival != '' && DepartDate != '' ">
            {{Departure}}
            {{Arrival}}
            {{DepartDate}}
            {{DepartTime}}
        </div> -->
    </div>
</template>

<script>
export default {
  data(){
    return{

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
    font-size: 1.5rem;
}
</style>