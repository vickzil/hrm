<template>
  <div
    class="page_loading_modal"
    v-if="!user || !isUserLoggedIn"
  >
    <div class="wrapper_loading">
      <div class="circle_loading"></div>
      <div class="circle_loading"></div>
      <div class="circle_loading"></div>
      <div class="shadow_loading"></div>
      <div class="shadow_loading"></div>
      <div class="shadow_loading"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    }
  }
};
</script>

<style>
</style>

