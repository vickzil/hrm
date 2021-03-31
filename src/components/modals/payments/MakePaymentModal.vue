<template>
  <transition name="fade">
    <div
      class="overlay_div"
      tabindex="-1"
      v-if="user && makePayment"
    >
      <div
        class="overlay-close"
        @click="closeMakePaymentModal"
      ></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header bg-light text-dark">
            <h3
              class=""
              style="text-transform: capitalize; font-size: 18px;"
            > {{currentpayment.name}} </h3>
            <div
              data-dismiss="modal"
              style="font-size: 19px;"
              class="close"
              @click="closeMakePaymentModal"
            ></div>
          </div>
          <div class="modal-body animated px-4">
            <div class="text-right">
              <h4 class="font-16 font-weight-bold">Current Balance: <span class="ml-2">₦{{addComma(userAmount)}}</span></h4>
            </div>
            <br>
            <h6 class="text-center">Click the button below to proceed!!</h6>
            <br>
            <div class="form_payment_input">
              <span class="modal_money_sign">₦</span> <input
                type="text"
                class="payment_input"
                v-model="currentAmountToPay"
                autofocus="true"
                :readonly="currentAmountToPay !== '' "
                style="font-size: 33px; font-weight: bold"
              />
            </div>
            <transition name="fade">
              <p
                v-if="lowAmount"
                style="color: red!important; font-size: 13px!important;margin-top: 15px; text-align: center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 20 20"
                  svg-inline=""
                  role="presentation"
                  focusable="false"
                  tabindex="-1"
                  style="color: red!important"
                  fill="red"
                >
                  <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                </svg>
                Your balance is too low, Fund Your wallet!!.
              </p>
            </transition>
            <div class="text-right pt-3 mt-5">
              <button
                type="submit"
                class="btn btn-danger"
                @click="proceedToPayment"
                v-bind:disabled="processing || lowAmount"
              >
                {{formText}}
                <i class="fa fa-money ml-2 mr-2"></i>
                <span
                  class="spinner-border spinner-border-sm ml-2"
                  role="status"
                  aria-hidden="true"
                  v-if="processing"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import $ from "jquery";
import "@/mixins";
import axios from "axios";

export default {
  data() {
    return {
      amount: this.addComma(0),
      lowAmount: false,
      processing: false,
      formText: "Make payment"
    };
  },
  computed: {
    makePayment() {
      return this.$store.getters.makePayment;
    },

    user() {
      return this.$store.getters.user;
    },

    currentpayment() {
      return this.$store.getters.currentpayment;
    },

    currentAmountToPay: {
      get() {
        return this.currentpayment.amount;
      },
      set(value) {
        return (this.currentpayment.amount = value);
      }
    },

    genReference() {
      return this.$store.getters.genReference;
    },

    userAmount() {
      return this.user.userWalletBalance.availableBalance;
    },
    userPaymentOptions() {
      return this.$store.getters.userPaymentOptions;
    },
    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    }
  },

  methods: {
    closeMakePaymentModal: function() {
      $(".overlay_div .modal-body").removeClass("swing");
      if (!this.processing) {
        this.$store.dispatch("setMakePayment", false);
      } else {
        setTimeout(() => {
          $(".overlay_div .modal-body").addClass("swing");
        }, 400);
      }
    },
    showLogout: function() {
      this.$store.dispatch("showLogoutModal");
    },
    proceedToPayment: function() {
      this.processing = true;
      if (this.userAmount < this.currentAmountToPay && this.userAmount <= 100) {
        this.lowAmount = true;

        setTimeout(() => {
          this.processing = false;
          this.$store.dispatch("setMakePayment", false);
          this.$store.dispatch("showPageProcessing");
        }, 1800);
        setTimeout(() => {
          if (this.userPaymentOptions) {
            this.$store.dispatch("closePageProcessing");
            this.$store.dispatch("showPaymentOptions");
          } else {
            this.$store.dispatch("getPaymentOptions");
          }
          this.lowAmount = false;
        }, 2500);
      } else {
        this.sendToDB();
      }
    },

    sendToDB: function() {
      this.formText = "please wait ...";

      // console.log(this.currentpayment)

      const url = `${this.hrmURL}/v1.0/Payment/initiate`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.code,
        Country: this.currentpayment.country,
        Amount: this.currentAmountToPay,
        Narration: this.currentpayment.description,
        Currency: this.currentpayment.currency,
        PaymentCode: this.currentpayment.code
      };

      // console.log(data);

      axios
        .post(url, data)
        .then(res => {
          if (res.data.success) {
            this.fetchDashboardInfo();
            this.$store.state.user.userWalletBalance.availableBalance =
              res.data.data;
          } else {
            let payload = {
              type: "error",
              message: "Payment Not Successfull!!"
            };

            this.processing = false;
            this.formText = "Make payment";

            this.$store.dispatch("showAlert", payload);
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);

          let payload = {
            type: "error",
            message: "Payment Not Successfull!!"
          };

          this.$store.dispatch("showAlert", payload);
          this.$store.dispatch("setMakePayment", false);
        });
    },
    fetchDashboardInfo: function() {
      const url = `${this.hrmURL}/v1.0/Dashboard/getDashboardInfo`;
      let code = this.user.userInfo.code;
      let data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: code
      };

      axios
        .post(url, data)
        .then(response => {
          if (response.data.success) {
            const data = response.data.data;
            // console.log(data);
            this.$store.dispatch("saveUserData", data);

            this.processing = false;
            this.formText = "Make payment";

            this.$store.dispatch("setMakePayment", false);

            let payload = {
              type: "success",
              message: "Payment Successfull!!"
            };
            this.$store.dispatch("showAlert", payload);
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
.form_payment_input {
  position: relative;
  width: 300px;
  margin: auto;
}

.payment_input {
  background-color: #fff;
  padding: 8px 0px 8px 0px;
  border: none;
  border-radius: 2px;
  font-size: 16px;
  outline: none;
  display: inline;
  text-rendering: geometricPrecision;
  color: #3d1403;
  transition: border-color 0.3s ease;
  margin: 0px;
  margin-bottom: 0px;
  margin-left: 80px;
  text-align: left;
}

.modal_money_sign {
  font-size: 33px;
  text-align: center;
  display: inline;
  position: absolute;
  top: 8px;
  left: 53px;
  color: #3d1403;
}
</style>