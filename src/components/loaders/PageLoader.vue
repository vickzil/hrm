<template>
  <div class="page-loader-wrapper" v-if="pageLoading">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  computed: {
    pageLoading() {
      return this.$store.getters.pageLoading;
    },
  },
};
</script>

<style></style>
