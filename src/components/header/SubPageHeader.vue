<template>
  <div class="section-white">
    <div class="container-fluid">
      <div class="row clearfix">
        <div class="col-lg-12 dashboard_top">
          <div class="d-sm-flex justify-content-between mt-5 mb-3">
            <div class="welcome_text">
              <h4 v-if="user">Welcome <span style="text-transform: capitalize;"><b>{{ user.userInfo.firstName }}</b></span> </h4>
            </div>
            <div class="header-action">
              <div class="d-sm-flex justify-content-between align-items-center">
                <span
                  v-if="user"
                  class="mr-1 account_balance"
                  style="text-align: right"
                >₦<span class="counter">{{
                                        addComma(userAmount)
                                        }}</span></span>
                <span class="ml-1 mr-3">
                  <i
                    class="fa fa-refresh font-weight-bold "
                    :class="refreshingAmount && 'fa-spin'"
                    style="font-size: 17px; cursor: pointer;"
                    @click="refreshUserAmount"
                  ></i>
                </span>
                <button
                  type="button"
                  class=" btn btn-outline-danger wallet_button_animate"
                  @click="showPaymentOptions"
                >
                  Fund wallet <i class="fe fe-credit-card ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>
<script>
import "@/mixins";
import axios from "axios";
export default {
  data() {
    return {
      billingErroes: [],
      Error: false,
      refreshingAmount: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    userAmount: {
      get() {
        return this.user.userWalletBalance.availableBalance;
      },
      set(value) {
        return (this.user.userWalletBalance.availableBalance = value);
      }
    },

    genReference() {
      return this.$store.getters.genReference;
    },
    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    },
    userPaymentOptions() {
      return this.$store.getters.userPaymentOptions;
    }
  },

  methods: {
    refreshUserAmount: function() {
      this.refreshingAmount = true;
      this.getAccountBance();
    },
    showPaymentOptions: function() {
      this.$store.dispatch("showPageProcessing");

      if (this.userPaymentOptions == null) {
        this.getPaymentOptions();
      } else {
        setTimeout(() => {
          this.$store.dispatch("closePageProcessing");
          this.$store.dispatch("showPaymentOptions");
        }, 400);
      }
    },

    getPaymentOptions: function() {
      this.$store.dispatch("getPaymentOptions");
    },

    getAccountBance: function() {
      const url = `${this.walletURL}/v1.0/Wallet/getAccountBalance`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.email
      };

      axios
        .post(url, data)
        .then(res => {
          if (res.data.success == true) {
            this.userAmount = res.data.data;
          }

          this.refreshingAmount = false;

          // console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.refreshingAmount = false;
        });
    }
  }
};
</script>
<style scoped>
.btn.btn-outline-danger.wallet_button_animate {
  transition: 0.3s;
  animation: glow 1s infinite;
  transition: 0.5s;
  animation-duration: 4s !important;
  animation-fill-mode: forwards !important;
  animation-iteration-count: infinite !important;
  transition: all 300ms ease-in-out !important;
  font-weight: bold;
}

@keyframes glow {
  0% {
    box-shadow: 5px 5px 8px rgb(236, 140, 133), -5px -5px 8px rgb(238, 143, 136);
    background: rgb(218, 164, 160);
  }

  25% {
    box-shadow: 5px 5px 8px rgb(224, 82, 81), -5px -5px 8px rgb(224, 114, 81);
  }

  50% {
    box-shadow: 5px 5px 8px rgb(255, 38, 0), -5px -5px 8px rgb(253, 59, 0);
  }

  75% {
    box-shadow: 5px 5px 8px rgb(224, 82, 81), -5px -5px 8px rgb(224, 114, 81);
  }

  80% {
    box-shadow: 5px 5px 10px rgb(243, 148, 119),
      -5px -5px 10px rgb(255, 156, 126);
  }
}
</style>