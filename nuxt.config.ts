// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@ant-design-vue/nuxt",
    "nuxt-lodash",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
  ],
  css: ["~/styles/index.css"],
  imports: {
    dirs: ["./stores"],
  },
  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },
  lodash: {
    prefix: "_",
    upperAfterPrefix: false,
  },
  runtimeConfig: {
    public: {
      gitlabToken: process.env.GITLAB_TOKEN,
    },
  },
});
