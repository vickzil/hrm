<template>
  <div class="page_loading_modal">
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
import axios from "axios";
import "@/mixins";

export default {
  name: "Verify",
  props: ["id"],
  computed: {
    status: {
      get() {
        return this.$store.state.status;
      },
      set(value) {
        return (this.$store.state.status = value);
      }
    }
  },

  data() {
    return {
      verifyText: "Verifying..."
    };
  },

  methods: {},
  created() {
    if (!this.$route.query.userid && !this.$route.query.code) {
      if (this.$router.push({ path: "/" })) {
        window.location.reload();
      }
    } else {
      const url = `${this.hrmURL}/v1.0/OAuth/confirmEmail`;

      var data = {
        UserId: this.$route.query.userid,
        Token: this.$route.query.token
      };

      axios
        .post(url, data)
        .then(response => {
          this.response = response;
          // console.log(response);
          if (response.data.success) {
            this.status = true;
          } else {
            this.status = false;
          }

          localStorage.setItem("hasStatus", this.status);

          if (this.$router.push({ path: "/verify-status" })) {
            window.location.reload();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.page_loading_modal {
  z-index: 9000000000000000000000000000000000000000000000000000000000000000000000 !important;
}
</style>