<template>
    <div class="container">
        <div class="test">
            {{res}}
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

</style>