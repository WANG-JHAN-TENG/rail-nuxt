<template>
    <div class="container">
        <div class="trainItem row justify-content-center">
            <div class="col-3 trainNo">列車編號</div>
            <div class="col-3 trainTime">出發及抵達時間</div>
            <div class="col-3 trainStation">起訖站</div>
        </div>
        <div class="trains row justify-content-center " v-for="n in res" :key="n.index">
            <div class="col-3 trainNo" >
                {{n.DailyTrainInfo.TrainNo}}
            </div>
            <div class="col-3 trainTime">
                {{n.OriginStopTime.DepartureTime}}
                ~
                {{n.DestinationStopTime.ArrivalTime}}
            </div>
            <div class="col-3 trainStation">
                {{n.OriginStopTime.StationName.Zh_tw}}
                ~
                {{n.DestinationStopTime.StationName.Zh_tw}}
            </div>
        </div>
        <div class="back">
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
      res(){
          return this.$store.state.trainInfo
      }
  },
  methods:{

  },
}
</script>

<style>
.trainItem{
    font-size: 1.5rem;
    font-weight: normal;
}
.col-3{
    text-align: center;
    margin: 5px 0;
}
.trains:hover{
    background-color: rgb(182, 226, 253);
}
</style>