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
                    <select name="departure" v-model="Departure" required>
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
                    <select name="arrival" v-model="Arrival" required>
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
            </div>
            <div class="row justify-content-around dateTime">
                <div class="col-4">
                    <label for="departDate">日期</label>
                    <br>
                    <input type="date" name="departDate" id="departDate" v-model="DepartDate" required>
                </div>
                <div class="col-4">
                    <label for="departTime">時間</label>
                    <br>
                    <input type="time" name="departTime" id="departTime" v-model="DepartTime">
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-4 sendMes">
                    <NuxtLink to="/trainInfo">
                        <div class="search btn btn-outline-warning" @click="sendMes">
                            查詢
                        </div>
                    </NuxtLink>
                </div>

            </div>
        </div>
        <div class="test">
            {{Departure}}
            {{Arrival}}
            {{DepartDate}}
            {{DepartTime}}
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
  },
  methods:{
      sendMes(){
          this.$store.dispatch("sendMes");
      }
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
}
.dateTime{
    margin: 15px 0;
}
.sendMes{
    text-align: center;
}
.search{
    font-size: 1.5rem;
}
</style>