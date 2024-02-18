// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@samk-dev/nuxt-vcalendar",
  ],
  css: ["@/assets/styles/main.scss"],
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: "ValidationForm",
      Field: "Field",
      ErrorMessage: "ErrorMessage",
    },
  },
});
