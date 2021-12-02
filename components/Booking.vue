<template>
    <div class="container bookingPanel">
        <table class="table">
        <tbody>
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
                <input type="radio" name="color" value="0"> 標準車廂
                <input type="radio" name="color" value="1"> 商務車廂
            </td>
            </tr>
            <tr>
            <th scope="row">時間</th>
            <td colspan="2">
                    <label for="departDate">去程</label>
                    <input type="date" name="departDate" id="departDate" v-model="DepartDate">
                    <label for="departTime">約</label>
                    <input type="time" name="departTime" id="departTime" v-model="DepartTime">
                    出發
                    <select name="oneWayOrNot" v-model="OneWayOrNot">
                        <option value="false">單程</option>
                        <option value="true">去回程</option>
                    </select>
                    <br>
                    <div class="backtrip" v-if="OneWayOrNot">
                        <label for="departDate">回程</label>
                        <input type="date" name="departDate" id="departDate" v-model="BackDepartDate">
                        <label for="departTime">約</label>
                        <input type="time" name="departTime" id="departTime" v-model="BackDepartTime">
                        出發
                    </div>
            </td>
            </tr>
            <tr>
            <th scope="row">票數</th>
            <td colspan="2">
                <label for="adult">全票</label>
                <select name="adult" id="adult">
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
                <select name="adult" id="adult">
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
                <select name="adult" id="adult">
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
                <select name="adult" id="adult">
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
                <select name="adult" id="adult">
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
        </tbody>
        </table>
        <div class="back row justify-content-center">
                <NuxtLink to="/">
                    <div class="btn btn-outline-warning">
                        查詢其他時段
                    </div>
                </NuxtLink>
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

  },
  methods:{

  },
}
</script>

<style>
.bookingPanel{
    width: 65%;
    margin: 50px auto;
}
</style>