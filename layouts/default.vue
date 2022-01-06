<template>
    <v-app>
        <v-container>
            <v-row justify="end">
                <div>
                    <v-btn
                      v-for="locale in availableLocales"
                      :key="locale.code"
                      nuxt
                      :to="switchLocalePath(locale.code)"
                      color="cyan"
                      dark
                      elevation="2">{{ locale.name }}
                    </v-btn>
                </div>
            </v-row>
        </v-container>

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
