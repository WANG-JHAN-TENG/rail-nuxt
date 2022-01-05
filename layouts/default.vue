<template>
    <v-app>
        <v-row justify="end">
            <div>
                <v-btn
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  nuxt
                  :to="switchLocalePath(locale.code)"
                  color="orange darken-1"
                  dark
                  large
                  elevation="2">{{ locale.name }}
                </v-btn>
            </div>
        </v-row>

        <Nuxt />
    </v-app>
</template>

<script>
export default {
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  },
}
</script>

<style>

</style>
