<template>
  <transition name="fade">
    <div
      class="overlay_div"
      tabindex="-1"
      v-if="PaymentFormModal"
    >
      <div
        class="overlay-close"
        @click="closePaymentFormModal"
      ></div>
      <div
        class="modal-dialog modal-dialog-centered"
        style="border-radius: 0px;"
      >
        <div class="modal-content">
          <div class="modal-header bg-light text-dark">
            <h3
              class="text-center font-weight-bold"
              style="text-transform: capitalize; font-size: 16px;"
            >
              <span v-if="!payWithPaystack && !payWithRave">Fill Out this field</span>
              <span v-else>Confirm Payment</span>
            </h3>
            <div
              data-dismiss="modal"
              style="font-size: 19px; color: #000!important;"
              class="close text-white"
              @click="closePaymentFormModal"
            ></div>
          </div>
          <div class="modal-body animated px-4">
            <button
              class="btn bg-light-orange box-shadow-sm"
              @click="goBack"
            > <i class="fe fe-corner-up-left"></i> Back </button>
            <br><br>
            <div
              class=""
              style="padding: 0px!important;"
            >
              <div
                class=""
                style="padding: 0px!important;"
              >
                <div v-if="!payWithPaystack && !payWithRave">
                  <form
                    id="form_fd"
                    v-on:submit.prevent="submitForm"
                  >
                    <p
                      class="alert alert-error"
                      v-if="showError"
                    >{{errorMessage}}</p>
                    <div class="row">
                      <div class="form-group col-md-12">
                        <label>Currency</label>
                        <select
                          class="form-control custom-select"
                          v-model.trim="currency"
                          @change="checkform"
                        >
                          <option value="">Select Currency</option>
                          <option
                            :value="currency.code"
                            v-for="currency in currencies"
                            :key="currency.code"
                            :selected="currency.code === currency"
                          >{{currency.name + ` (${currency.code})`}}</option>
                        </select>
                      </div>
                      <div class="form-group col-md-12">
                        <label>Amount</label>
                        <input
                          type="text"
                          class="form-control"
                          v-model.trim="amount"
                          @input="checkInput(amount) || checkform"
                        >
                        <transition name="fade">
                          <p
                            v-if="inputError"
                            style="color: red!important; font-size: 13px!important;margin-top: 15px;"
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
                            {{inputMessage}}
                          </p>
                        </transition>
                      </div>
                    </div>
                    <div class="text-right pt-3 mt-3">
                      <button
                        type="submit"
                        class="btn btn-danger btn-lg"
                        v-bind:disabled="processing || emptyFields"
                      >
                        {{buttonText}}
                        <span
                          class="spinner-border spinner-border-sm ml-2"
                          role="status"
                          aria-hidden="true"
                          v-if="processing"
                        ></span>
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  class="text-center"
                  v-if="payWithPaystack"
                >
                  <p>{{clickedPaymentType.message}}</p>
                  <div class="table-responsive mt-3 mb-4">
                    <table class="table table-striped text-nowrap mb-0">
                      <thead>
                        <tr class="bg-dark text-light">
                          <th>Name</th>
                          <th>E-mail</th>
                          <th>Amount</th>
                          <th>Charges</th>
                          <th>Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="text-transform: capitalize">{{user.userInfo.firstName}} {{user.userInfo.lastName}}</td>
                          <td>{{user.userInfo.email}}</td>
                          <td> <span v-if="currency === 'NGN' ">₦</span>{{addComma(Math.trunc(paymentForPaystackInfo.amount))}}</td>
                          <td> <span v-if="currency === 'NGN' ">₦</span>{{addComma(Math.trunc(paymentForPaystackInfo.charges))}}</td>
                          <td>{{currency}}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <br>
                        <tr>
                          <td
                            class="text-right"
                            colspan="4"
                          >
                            <strong>Total Amount</strong>
                          </td>
                          <td colspan="4"><b><span v-if="currency === 'NGN' ">₦</span>{{ addComma(Math.trunc(paymentForPaystackInfo.totalDebit)) }}</b></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <br><br>
                  <Paystack
                    :paystackkey="paystackkeyKey"
                    :reference="paymentForPaystackInfo.reference"
                    :callback="callback"
                    :amount="Math.trunc(paymentForPaystackInfo.totalDebit) * 100"
                    :currency="paymentForPaystackInfo.currency"
                    :firstname="user.userInfo.firstName"
                    :lastname="user.userInfo.lastName"
                    :email="user.userInfo.email"
                    :close="close"
                    :embed="false"
                    class="btn btn-danger btn-lg"
                  >
                    Confirm Payment
                    <i class="fe fe-credit-card ml-2"></i>
                  </Paystack>
                  <div>
                    <br><br>
                    <img
                      style="border-radius: 3px"
                      class="bg-dark py-1 px-1"
                      src="@/assets/images/secure-white.e212765.svg"
                      alt=""
                    >
                  </div>
                </div>
                <div
                  class="text-center"
                  v-if="payWithRave"
                >
                  <p>{{clickedPaymentType.message}}</p>
                  <div class="table-responsive mt-3 mb-4">
                    <table class="table table-striped text-nowrap mb-0">
                      <thead>
                        <tr class="bg-dark text-light">
                          <th>Name</th>
                          <th>E-mail</th>
                          <th>Amount</th>
                          <th>Charges</th>
                          <th>Currency</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style="text-transform: capitalize">{{user.userInfo.firstName}} {{user.userInfo.lastName}}</td>
                          <td>{{user.userInfo.email}}</td>
                          <td> <span v-if="currency === 'NGN' ">₦</span>{{addComma(Math.trunc(paymentForRaveInfo.amount))}}</td>
                          <td> <span v-if="currency === 'NGN' ">₦</span>{{addComma(Math.trunc(paymentForRaveInfo.charges))}}</td>
                          <td>{{currency}}</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <br>
                        <tr>
                          <td
                            class="text-right"
                            colspan="4"
                          >
                            <strong>Total Amount</strong>
                          </td>
                          <td colspan="4"><b><span v-if="currency === 'NGN' ">₦</span>{{ addComma(Math.trunc(paymentForRaveInfo.totalDebit)) }}</b></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <br><br>
                  <!--    clickedPaymentType.publicKey -->
                  <Rave
                    style-class="btn btn-danger btn-lg"
                    :email="user.userInfo.email"
                    :amount="(Math.trunc(paymentForRaveInfo.totalDebit))"
                    :reference="paymentForRaveInfo.reference"
                    :rave-key="ravekeyKey"
                    :callback="processRave"
                    :close="closeRave"
                    :paymentPlan="plan"
                    :customerFirstname="user.userInfo.firstName"
                    :customerLastname="user.userInfo.lastName"
                    paymentOptions="card,barter,account,ussd"
                    hostedPayemt="1"
                    customTitle="Fund your Wallet"
                    :currency="currency"
                  >
                    Confirm Payment <i class="fe fe-credit-card ml-2"></i></Rave>
                  <div>
                    <br><br>
                    <div
                      class="secured__badge bg-dark py-0 px-1 text-white"
                      style="display: inline-block!important; border-radius: 3px!important;"
                    >
                      <div
                        style="display: inline!important; font-size: 11px!important; "
                        class="secured__badge__text"
                      >
                        <span style="display: flex; align-items: center; justify-content: center;">
                          <svg
                            height="9.599999999999909"
                            width="8"
                          >
                            <defs>
                              <path
                                id="path-0"
                                opacity="1"
                                d="M3.9932318000000038,0.7706122399999913 C5.211505900000002,0.7706122399999913 6.226734300000004,1.724081599999991 6.226734300000004,2.912653099999993 L6.226734300000004,3.7224489999999903 L1.7597293000000036,3.7224489999999903 L1.7597293000000036,2.912653099999993 C1.7597293000000036,1.7371428999999914 2.774957700000005,0.7706122399999913 3.9932318000000038,0.7706122399999913 L3.9932318000000038,0.7706122399999913ZM4.006768200000021,5.407346899999993 C4.426395900000021,5.407346899999993 4.7648054000000215,5.7338775999999925 4.7648054000000215,6.138775499999994 C4.7648054000000215,6.386938799999992 4.642978000000021,6.556734699999993 4.453468700000023,6.687346899999994 L4.670050800000023,7.902040799999995 L3.3434856000000224,7.902040799999995 L3.5600677000000225,6.700408199999991 C3.3705584000000215,6.5697958999999955 3.2487310000000207,6.373877599999993 3.2487310000000207,6.138775499999994 C3.2487310000000207,5.7338775999999925 3.5871404000000204,5.407346899999993 4.006768200000021,5.407346899999993 L4.006768200000021,5.407346899999993ZM3.9932318,0 C2.3282571999999995,0 0.9475465000000014,1.3061223999999996 0.9475465000000014,2.9126531 L0.9475465000000014,3.7224489999999975 L0.4602368999999982,3.7224489999999975 C0.18950929999999744,3.7224489999999975 0,4.048979599999999 0,4.3102041 L0,9.234285700000001 C0,9.495510199999998 0.18950929999999744,9.600000000000001 0.4602368999999982,9.600000000000001 L7.5803723000000005,9.600000000000001 C7.8510998,9.600000000000001 8,9.495510199999998 8,9.234285700000001 L8,4.3102041 C7.9864636,4.048979599999999 7.824027099999999,3.7224489999999975 7.566835900000001,3.7224489999999975 L7.038917100000003,3.7224489999999975 L7.038917100000003,2.9126531 C7.038917099999999,1.3061223999999996 5.658206400000001,0 3.9932318,0 L3.9932318,0Z"
                              >
                              </path>
                            </defs>
                            <g transform="translate(0, 0) ">
                              <use
                                xlink:href="#path-0"
                                fill="#f5a623"
                                fill-opacity="1"
                              ></use>
                            </g>
                          </svg>
                          <span class="ml-1">secured by flutterwave</span>
                        </span>
                      </div>
                    </div>
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
import $ from "jquery";
import "@/mixins";
import Paystack from "vue-paystack";
import Rave from "vue-ravepayment";
export default {
  data() {
    return {
      plan: 2333,
      meta: [
        {
          metaname: "school",
          metavalue: "high school"
        }
      ],
      sub: [
        {
          id: "1324"
        },
        {
          id: "1221"
        }
      ],
      inputMessage: "",
      raveResponse: false
    };
  },

  components: {
    Paystack,
    Rave
  },
  computed: {
    amount: {
      get() {
        return this.$store.state.amount;
      },
      set(value) {
        return (this.$store.state.amount = value);
      }
    },
    currency: {
      get() {
        return this.$store.state.currency;
      },
      set(value) {
        return (this.$store.state.currency = value);
      }
    },
    processing: {
      get() {
        return this.$store.state.processing;
      },
      set(value) {
        return (this.$store.state.processing = value);
      }
    },
    buttonText: {
      get() {
        return this.$store.state.buttonText;
      },
      set(value) {
        return (this.$store.state.buttonText = value);
      }
    },
    emptyFields: {
      get() {
        return this.$store.state.emptyFields;
      },
      set(value) {
        return (this.$store.state.emptyFields = value);
      }
    },
    inputError: {
      get() {
        return this.$store.state.inputError;
      },
      set(value) {
        return (this.$store.state.inputError = value);
      }
    },
    formError: {
      get() {
        return this.$store.state.formError;
      },
      set(value) {
        return (this.$store.state.formError = value);
      }
    },
    payWithPaystack: {
      get() {
        return this.$store.state.payWithPaystack;
      },
      set(value) {
        return (this.$store.state.payWithPaystack = value);
      }
    },
    payWithRave: {
      get() {
        return this.$store.state.payWithRave;
      },
      set(value) {
        return (this.$store.state.payWithRave = value);
      }
    },
    paymentForPaystackInfo: {
      get() {
        return this.$store.state.paymentForPaystackInfo;
      },
      set(value) {
        return (this.$store.state.paymentForPaystackInfo = value);
      }
    },
    paymentForRaveInfo: {
      get() {
        return this.$store.state.paymentForRaveInfo;
      },
      set(value) {
        return (this.$store.state.paymentForRaveInfo = value);
      }
    },
    errorMessage: {
      get() {
        return this.$store.state.errorMessage;
      },
      set(value) {
        return (this.$store.state.errorMessage = value);
      }
    },
    showError: {
      get() {
        return this.$store.state.showError;
      },
      set(value) {
        return (this.$store.state.showError = value);
      }
    },
    user() {
      return this.$store.getters.user;
    },
    PaymentFormModal() {
      return this.$store.getters.PaymentFormModal;
    },
    clickedPaymentType() {
      return this.$store.getters.clickedPaymentType;
    },
    paystackkeyKey() {
      return this.clickedPaymentType.publicKey;
      //   return this.clickedPaymentType.secreteKey;
    },
    ravekeyKey() {
      return this.clickedPaymentType.publicKey;
    },
    currencies() {
      return this.$store.getters.userPaymentOptions.currencies;
    },
    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    }
  },

  methods: {
    closePaymentFormModal: function() {
      if (!this.processing) {
        this.$store.dispatch("closePaymentFormModal");
        this.amount = 0;
        this.currency = "";
        this.processing = false;
        this.buttonText = "Proceed";
        this.emptyFields = true;
        this.inputError = false;
        this.formError = false;
        this.payWithPaystack = false;
        this.payWithRave = false;
        this.paymentForPaystackInfo = null;
        this.paymentForRaveInfo = null;
        this.errorMessage = "";
        this.showError = false;
      }
    },
    checkInput: function(input) {
      var regex = /^[0-9]+$/;
      if (!input.match(regex)) {
        this.inputError = true;
        this.emptyFields = true;
        this.inputMessage = "please input must be numbers.";
        return false;
      }

      if (this.currency == "NGN" && input < 100) {
        this.inputMessage = "Amount must be up to 100";
        this.inputError = true;
        this.emptyFields = true;

        return false;
      }
      if (!this.currency) {
        this.emptyFields = true;
        return false;
      }

      this.inputError = false;
      this.emptyFields = false;

      return true;
    },

    submitForm: function() {
      this.errorMessage = "";
      this.showError = false;
      if (this.formError == false && this.emptyFields == false) {
        this.paymentFeeInfo();

        return true;
      } else {
        this.checkform();
        return false;
      }
    },
    checkform: function() {
      if (!this.amount || !this.currency) {
        this.emptyFields = true;
        this.formError == true;
        return false;
      }
      if (this.currency == "NGN" && this.amount < 100) {
        this.inputMessage = "Amount must be up to 100";
        this.inputError = true;
        this.emptyFields = true;
        this.formError == true;
        return false;
      }

      this.inputError = false;
      this.formError == false;
      this.emptyFields = false;

      return true;
    },

    paymentFeeInfo: function() {
      this.buttonText = "Please wait...";
      this.processing = true;

      const url = `${this.walletURL}/v1.0/PaymentFee/paymentFeeInfo`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.email,
        Currency: this.currency,
        Amount: this.amount,
        Provider: this.clickedPaymentType.provider
      };

      axios
        .post(url, data)
        .then(res => {
          this.processing = false;
          this.buttonText = "Proceed";

          if (res.data.success) {
            let responseData = res.data.data;

            // console.log(responseData);

            if (responseData.provider === "paystack") {
              this.paymentForPaystackInfo = responseData;

              // console.log(responseData);

              if (this.paymentForPaystackInfo) {
                this.payWithPaystack = true;
                this.payWithRave = false;
              }
            }

            if (responseData.provider === "rave") {
              this.paymentForRaveInfo = responseData;
              // console.log(responseData);

              if (this.paymentForRaveInfo) {
                this.payWithPaystack = false;
                this.payWithRave = true;
              }
            }
          } else {
            this.showError = true;
            this.errorMessage = "Sorry, Server not reachable, Try again later";

            setTimeout(() => {
              this.closePaymentFormModal();
            }, 1200);
          }

          // console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.processing = false;
          this.buttonText = "Proceed";
        });
    },

    goBack: function() {
      if (this.payWithPaystack || this.payWithRave) {
        this.payWithPaystack = false;
        this.payWithRave = false;
      } else {
        this.$store.dispatch("closePaymentFormModal");
        this.$store.dispatch("showDebitCreditCardModal");
        this.amount = 0;
        this.currency = "";
        this.processing = false;
        this.buttonText = "Proceed";
        this.emptyFields = true;
        this.inputError = false;
        this.formError = false;
        this.payWithPaystack = false;
        this.payWithRave = false;
        this.paymentForPaystackInfo = null;
        this.paymentForRaveInfo = null;
        this.errorMessage = "";
        this.showError = false;
      }
    },

    callback: function(response) {
      if (response.status) {
        this.verifyPacystackCardPayment(response);

        // console.log(response);
      } else {
        let payload = {
          type: "error",
          message: "Payment not completed"
        };
        this.$store.dispatch("showAlert", payload);
      }

      this.$store.dispatch("closePaymentFormModal");
      // console.log(response);
    },
    processRave: function(response) {
      if (response.success) {
        let responseData = response.data.tx;
        this.verifyRaveCardPayment(responseData);
        this.raveResponse = true;
      } else {
        let payload = {
          type: "error",
          message: "Payment not completed"
        };
        this.$store.dispatch("showAlert", payload);
      }

      this.$store.dispatch("closePaymentFormModal");

      $("#web-close-btn").click();
    },
    close: function() {
      // console.log("Payment closed");
      this.$store.dispatch("closePaymentFormModal");

      let payload = {
        type: "error",
        message: "Payment not completed"
      };
      this.$store.dispatch("showAlert", payload);

      this.amount = 0;
      this.currency = "";
      this.processing = false;
      this.buttonText = "Proceed";
      this.emptyFields = true;
      this.inputError = false;
      this.formError = false;
      this.payWithPaystack = false;
      this.payWithRave = false;
      this.paymentForPaystackInfo = null;
      this.paymentForRaveInfo = null;
      this.errorMessage = "";
      this.showError = false;
    },
    closeRave: function() {
      this.$store.dispatch("closePaymentFormModal");
      this.$store.dispatch("showPageProcessing");
      let payload;

      if (this.raveResponse == true) {
        payload = {
          type: "success",
          message: "Payment successfully"
        };
      } else {
        payload = {
          type: "error",
          message: "Payment not completed"
        };
      }

      setTimeout(() => {
        this.$store.dispatch("closePageProcessing");
        this.$store.dispatch("showAlert", payload);
      }, 2000);
    },
    verifyPacystackCardPayment: function(response) {
      this.$store.dispatch("showPageProcessing");

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.email,
        ProviderPaymentReference: response.reference,
        TransactionReference: this.paymentForPaystackInfo.reference,
        Provider: this.paymentForPaystackInfo.provider,
        Currency: this.currency
      };
      const url = `${this.walletURL}/v1.0/VerifyCardPayment/confirmCardPaymentStatus`;

      axios
        .post(url, data)
        .then(response => {
          // console.log(response);

          let payload;

          if (response.data.success) {
            payload = {
              type: "success",
              message: "Payment successfully"
            };
          } else {
            payload = {
              type: "error",
              message: "Payment not completed"
            };
          }

          this.$store.dispatch("showAlert", payload);
          this.$store.dispatch("closePageProcessing");
        })
        .catch(err => {
          console.log(err);

          let payload = {
            type: "error",
            message: "Payment not completed"
          };

          this.$store.dispatch("showAlert", payload);
          this.$store.dispatch("closePageProcessing");
        });
    },

    verifyRaveCardPayment: function(response) {
      this.$store.dispatch("showPageProcessing");

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.user.userInfo.email,
        ProviderPaymentReference: response.flwRef,
        TransactionReference: response.txRef,
        Currency: this.currency
      };
      const url = `${this.walletURL}/v1.0/VerifyCardPayment/confirmCardPaymentStatus`;

      axios
        .post(url, data)
        .then(response => {
          // console.log(response);

          let payload;

          if (response.data.success) {
            payload = {
              type: "success",
              message: "Payment successfully"
            };
          } else {
            payload = {
              type: "error",
              message: "Payment not completed"
            };
          }

          setTimeout(() => {
            this.$store.dispatch("showAlert", payload);
            this.$store.dispatch("closePageProcessing");
          }, 1000);
        })
        .catch(err => {
          console.log(err);

          let payload = {
            type: "error",
            message: "Payment not completed"
          };

          this.$store.dispatch("showAlert", payload);
          this.$store.dispatch("closePageProcessing");
        });
    }
  },

  mounted() {}
};
</script>
<style scoped>
#form_fd {
  width: 60%;
  margin: auto;
}

#form_fd input {
  background-color: #fff;
  padding: 8px;
  border: none;
  border-radius: 2px;
  font-size: 16px;
  outline: none;
  display: inline;
  border: 1px solid #ced4da;
  text-rendering: geometricPrecision;
  color: #3d1403;
  transition: border-color 0.3s ease;
}

.table-responsive::-webkit-scrollbar {
  -webkit-appearance: none;
}

.table-responsive::-webkit-scrollbar:vertical {
  width: 12px;
}

.table-responsive::-webkit-scrollbar:horizontal {
  height: 12px;
}

.table-responsive::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: 2px solid #ffffff;
}

.table-responsive::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: #ffffff;
}

@media screen and (max-width: 600px) {
  #form_fd {
    width: 95%;
    margin: auto;
  }
}
</style>