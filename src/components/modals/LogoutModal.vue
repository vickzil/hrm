<template>
  <transition name="fade">
    <div
      class="overlay_div"
      tabindex="-1"
      v-if="logoutModal"
    >
      <div
        class="overlay-close"
        @click="closeLogoutModal"
      ></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body animated px-4">
            <div class="card text-center">
              <div class="card-body">
                <br><br>
                <h4>Are you sure you want to logout?</h4>
                <br><br>
                <div class="row">
                  <div class="col-md-6 col-sm-6">
                    <button
                      @click="closeLogoutModal"
                      class="btn btn-outline-dark"
                    >Close</button>
                  </div>
                  <div class="col-md-6 col-sm-6">
                    <button
                      @click="logout"
                      class="btn btn-outline-danger"
                    >Yes, Please!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
import "@/mixins";

export default {
  computed: {
    logoutModal() {
      return this.$store.getters.logoutModal;
    },

    user() {
      return this.$store.getters.user;
    }
  },

  methods: {
    closeLogoutModal: function() {
      this.$store.dispatch("closeLogoutModal");
    },

    logout: function() {
      this.$store.dispatch("logout");

      setTimeout(() => {
        this.$router.push("/login");
      }, 200);
    },
    logoutFromServer: function() {
      const url = `${this.hrmURL}/v1.0/OAuth/signOut`;

      var fd = new FormData();
      fd.append("userName", this.user.userName);

      axios
        .post(url, fd)
        .then(response => {
          if (response) {
            response;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style>
</style>