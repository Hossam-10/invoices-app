<template>
  <header
    class="h-[4.5rem] lg:h-auto lg:min-h-screen fixed right-0 lg:right-auto left-0 w-full lg:w-[6.4375rem] z-[3] flex lg:flex-col justify-between bg-[#252945] lg:rounded-r-[20px]"
  >
    <div
      class="w-[4.5rem] lg:w-full h-[4.5rem] lg:h-[6.4375rem] bg-[#7c5dfa] flex justify-center items-center cursor-pointer rounded-r-[20px] overflow-hidden relative icon-container"
    >
      <img alt="logo" :src="logo" class="h-[26px] z-[2]" />
    </div>

    <div
      class="h-full lg:h-[5.5rem] w-20 lg:w-auto flex justify-center items-center"
    >
      <img
        class="cursor-pointer"
        alt="change mode icon"
        :src="icon"
        @click="changeMode"
      />
    </div>
  </header>
</template>

<script lang="ts" setup>
import logo from "~/assets/images/logo.svg";
import darkModeIcon from "~/assets/images/icon-moon.svg";
import lightModeIcon from "~/assets/images/icon-sun.svg";

const mode = useStatefulCookie('mode')
const icon = computed(() =>
  mode.value === "dark" ? lightModeIcon : darkModeIcon
);
const changeMode = () => {
  mode.value === "dark" ? (mode.value = "light") : (mode.value = "dark");
  useHead({
    htmlAttrs: {
      "data-mode": mode.value,
    },
  });
};
</script>

<style scoped lang="scss">
.icon-container {
  &::after {
    content: "";
    width: 100%;
    height: 6.4375rem;
    position: absolute;
    background-color: #9277ff;
    border-radius: 20px 0 0 20px;
    top: 50%;
    -webkit-transition: 0.3s ease;
    transition: 0.3s ease;
  }
  &:hover:after {
    top: 10%;
  }
}
</style>
