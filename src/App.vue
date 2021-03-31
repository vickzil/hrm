/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div id="app">
    <AllModal />
    <AlertPop :class="(alertStatus) ? 'bounceInRight' : ''" />
    <div id="main_content">
      <Navbar />
      <transition
        name="page"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import "@/assets/css/main.css";
import "@/assets/css/theme1.css";
import "@/assets/css/custom.css";
import "@/assets/css/account.css";
import "@/assets/css/settings.css";
import "@/assets/css/animate.css";
import Navbar from "./components/navbar/Navbar";
import AllModal from "./components/AllModal";
import AlertPop from "./components/extras/AlertPop";

import $ from "jquery";

export default {
  name: "App",
  components: {
    Navbar,
    AllModal,
    AlertPop
    // Loading
  },

  computed: {
    expiresAt: {
      get: function() {
        return sessionStorage.getItem("appexrat");
      },
      set: function(expiresIn) {
        return sessionStorage.setItem("appexrat", expiresIn);
      }
    },
    user() {
      return this.$store.getters.user;
    },

    registrationInfo() {
      return this.$store.getters.registrationInfo;
    },

    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },

    alertStatus() {
      return this.$store.getters.alertStatus;
    },

    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    }
  },
  methods: {
    fetchUserInfo: function() {
      if (this.user == null) {
        this.$store.dispatch("logout");
        sessionStorage.clear();
        this.$router.push({ path: "/login" });
      }
    },
    getCountries: function() {
      this.$store.dispatch("getCountries");
    },
    isAuthenticated() {
      let date = new Date(this.expiresAt);
      let minusHour = date.setMinutes(date.getMinutes() - 60);
      let newExpiry = new Date().setMinutes(new Date().getMinutes());

      let newDate = newExpiry < minusHour;
      return !!newDate;
    },

    checkUserAuthentication: function() {
      const token = sessionStorage.getItem("appUserThemeSettingsCode");
      let userCode = sessionStorage.getItem("activeformations");

      let requireAuthRoutes = this.$router.history.current.meta.requiresAuth;

      if (requireAuthRoutes == true) {
        if (token && userCode) {
          if (!this.isAuthenticated()) {
            this.$store.dispatch("logout");
            sessionStorage.clear();
            this.$router.push("/").catch(error => {
              if (error) {
                error;
              }
            });
            // this.$store.clear
          } else {
            var data = {
              AppId: this.AppId,
              RequestId: this.RequestId,
              Country: "NG"
            };
            this.$store.dispatch("fetchUserData", userCode);
            this.$store.dispatch("fetchBankNames", data);
          }
        } else {
          this.$store.dispatch("logout");
          sessionStorage.clear();
          this.$router.push("/").catch(error => {
            if (error) {
              error;
            }
          });
          // this.$store.clear
        }
      }
    },

    getRegistrationInfo: function() {
      if (this.registrationInfo == null) {
        this.$store.dispatch("registrationInfo");
      }
    },

    checkMiniBarDark: function() {
      if (localStorage.getItem("minbar") !== null) {
        let miniBar = JSON.parse(localStorage.getItem("minbar"));

        $("#header_top").removeClass("dark");
        setTimeout(() => {
          $("#header_top").addClass(miniBar);
        }, 200);
      }
    }
  },

  mounted() {
    // this.checkUserAmount();
    this.$store.dispatch("closeLogoutModal");

    this.getCountries();
    this.getRegistrationInfo();

    if (document.querySelector(".user_div")) {
      var errww = document.querySelector(".close_bbtn");
      var user_div = document.querySelector(".user_div");

      errww.onclick = function() {
        user_div.classList.remove("open");
      };
    }
  },
  created: function() {
    this.checkUserAuthentication();
    this.checkMiniBarDark();
    // this.$http.interceptors.response.use(undefined, function(err) {
    //   return new Promise(function() {
    //     if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
    //       this.$store.dispatch("logout");
    //       this.$router.push("/").catch(error => {
    //         if (error) {
    //           error;
    //         }
    //       });
    //     }
    //     throw err;
    //   });
    // });
  }
};
</script>

<style>
body {
  padding-top: 0px !important;
}

.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-to,
.page-leave {
  opacity: 1;
  transform: translateY(0);
}

.hrm_button {
  border: none !important;
  box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
  font-weight: bold;
}
</style>
