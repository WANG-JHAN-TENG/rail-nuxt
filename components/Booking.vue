<template>
    <div class="container bookingPanel">
        <div class="noInfo" v-if="SelectedTrain == '' ">
            <h1>請選擇車次</h1>
        </div>
        <div class="bookingForm" v-if="SelectedTrain != ''">
            <table class="table">
            <tbody>
                <tr>
                    <th scope="row">訂票人ID</th>
                    <td>
                        <input name="userId" id="userId" v-model="UserId">
                    </td>
                </tr>
                <tr>
                    <th scope="row">起訖站</th>
                    <td>
                        <label for="departure">起程站</label>
                        <select name="departure" id="departure" v-model="Departure">
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
                        <label for="arrival">到達站</label>
                        <select name="arrival" id="arrival" v-model="Arrival">
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
                    </td>
                </tr>
                <tr>
                    <th scope="row">車廂種類</th>
                    <td>
                        <input type="radio" name="color" value="0" v-model="CarType"> 標準車廂
                        <input type="radio" name="color" value="1" v-model="CarType"> 商務車廂
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">時間</th>
                    <td colspan="2">
                            <label for="departDate">去程</label>
                            <input type="date" name="departDate" id="departDate" v-model="DepartDate">
                            <label for="trainNo">車次號碼</label>
                            <input name="trainNo" id="trainNo" v-model="SelectedTrain.DailyTrainInfo.TrainNo">
                            <select name="oneWayOrNot" v-model="OneWayOrNot">
                                <option value="false">單程</option>
                                <option value="true">去回程</option>
                            </select>
                            <br>
                            <div class="backtrip" v-if="OneWayOrNot == 'true'">
                                <label for="departDate">回程</label>
                                <input type="date" name="departDate" id="departDate" v-model="BackDepartDate">
                                <label for="backTrainNo">車次號碼</label>
                                <input name="backTrainNo" id="backTrainNo" v-model="SelectedBackTrain.DailyTrainInfo.TrainNo">
                            </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">票數</th>
                    <td colspan="2">
                        <label for="adult">全票</label>
                        <select name="adult" id="adult" v-model="adultCount">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                        </select>
                        <label for="adult">孩童票(6-11歲)</label>
                        <select name="adult" id="adult" v-model="kidCount">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                        </select>
                        <label for="adult">愛心票</label>
                        <select name="adult" id="adult" v-model="loveCount">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                        </select>
                        <label for="adult">敬老票(65歲以上)</label>
                        <select name="adult" id="adult" v-model="olderCount">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                        </select>
                        <label for="adult">大學生優惠票</label>
                        <select name="adult" id="adult" v-model="studentCount">
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>總價</th>
                    <td>${{price}}</td>
                </tr>
            </tbody>
            </table>
            <div class="bookingButton row justify-content-center">
                <div class="btn btn-outline-success" @click="goBook">
                    訂票
                </div>
            </div>
        </div>

        <div class="button row justify-content-center">
            <div class="col-3 search">
                <NuxtLink to="/">
                    <div class="btn btn-outline-secondary">
                        查詢其他時段
                    </div>
                </NuxtLink>
            </div>
            <div class="col-3 info">
                <NuxtLink to="/trainInfo">
                    <div class="btn btn-outline-secondary">
                        選擇其他列車
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return{

    };
  },
  computed: {
      price(){
          return this.$store.state.totalPrice;
      },
    SelectedTrain: {
        get () {
        return this.$store.state.selectedTrain
        },
        set (value) {
        this.$store.commit('setSelectedTrain', value)
        }
    },
    UserId: {
        get () {
        return this.$store.state.userId
        },
        set (value) {
        this.$store.commit('setUserId', value)
        }
    },
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
    BackDepartDate: {
        get () {
        return this.$store.state.backDepartDate
        },
        set (value) {
        this.$store.commit('setBackDepartDate', value)
        }
    },
    SelectedBackTrain: {
        get () {
        return this.$store.state.selectedBackTrain
        },
        set (value) {
        this.$store.commit('setSelectedBackTrain', value)
        }
    },
    CarType: {
        get () {
        return this.$store.state.carType
        },
        set (value) {
        this.$store.commit('setCarType', value)
        }
    },
    adultCount: {
        get () {
        return this.$store.state.ticketCount.adult
        },
        set (value) {
        this.$store.commit('setAdultCount', value)
        }
    },
    kidCount: {
        get () {
        return this.$store.state.ticketCount.kid
        },
        set (value) {
        this.$store.commit('setKidCount', value)
        }
    },
    loveCount: {
        get () {
        return this.$store.state.ticketCount.love
        },
        set (value) {
        this.$store.commit('setLoveCount', value)
        }
    },
    olderCount: {
        get () {
        return this.$store.state.ticketCount.older
        },
        set (value) {
        this.$store.commit('setOlderCount', value)
        }
    },
    studentCount: {
        get () {
        return this.$store.state.ticketCount.student
        },
        set (value) {
        this.$store.commit('setStudentCount', value)
        }
    },
  },
  updated(){
      this.$store.commit("countPrice")
  },
  methods:{
      goBook(){
        if(this.UserId && this.Departure && this.Arrival && this.DepartDate && this.CarType && this.SelectedTrain.DailyTrainInfo.TrainNo ){
            if(this.OneWayOrNot === "false"){
                if(this.adultCount > 0 || this.kidCount > 0 || this.loveCount > 0 || this.olderCount > 0 || this.studentCount > 0){
                    this.$store.dispatch('goBook')
                }else{
                    alert("請選擇票數")
                }
            }else if(this.OneWayOrNot === "true"){
                if(this.BackDepartDate && this.SelectedBackTrain.DailyTrainInfo.TrainNo){
                    if(this.adultCount > 0 || this.kidCount > 0 || this.loveCount > 0 || this.olderCount > 0 || this.studentCount > 0){
                        this.$store.dispatch('goBook')
                    }else{
                        alert("請選擇票數")
                    }
                }else{
                    alert("請輸入回程列車資訊")
                }
            }
        }else{
            alert("請輸入完整列車資訊")
        }
      }
  },
}
</script>

<style>
.noInfo{
    text-align: center;
}
.bookingPanel{
    width: 65%;
    margin: 50px auto;
}
</style>