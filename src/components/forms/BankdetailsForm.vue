<template>
  <div
    class="card work_history"
    style="margin-bottom: 50px;"
    :class="collapseCard && 'card-collapsed'"
  >
    <div class="card-header">
      <h3 class="card-title">{{bankdetails.allias}}</h3>
      <div class="card-options">
        <button
          v-if="!editing"
          class="btn d-flex justify-content-center align-center bg-light-lime mr-2"
          @click="editing = true"
        >
          <i
            style="font-size: 20px"
            class="fe fe-edit-3"
          ></i>
        </button>
        <span v-if="!collapseCard">
          <button
            v-if="editing"
            class="btn mr-2 d-flex justify-content-center align-center bg-light-red"
            @click="editing = false"
          >
            <span class="mr-2">Back</span>
            <i
              style="font-size: 20px"
              class="fe fe-corner-up-left"
            ></i>
          </button>
        </span>
      </div>
    </div>
    <div class="card-body">
      <form
        style="width: 100%;"
        v-on:submit.prevent="updateBankdetails"
        enctype="multipart/form-data"
      >
        <div
          class="row"
          v-if="editing"
        >
          <label class="col-sm-3 col-form-label"><b>Select Country</b></label>
          <div class="col-sm-8">
            <div class="form-group multiselect_div">
              <select
                class="form_select"
                v-model.trim="country"
                @change="checkbankName"
              >
                <option value="">Select Country</option>
                <option
                  :value="country.code"
                  v-for="country in registrationInfo.countries"
                  :key="country.code"
                  :selected="country.code === country"
                >{{country.name}}</option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="row"
          v-if="!editing"
        >
          <label class="col-sm-3 col-form-label"><b>Bank Code</b></label>
          <div class="col-sm-8">
            <span
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{bankdetails.bankCode}}</span>
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Bank Name</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{bankdetails.bankName}}</span>
            <div v-else>
              <div
                class="form-group multiselect_div"
                v-if="!noBankfound"
              >
                <select
                  class="form_select"
                  v-model="bankName"
                  @change="updateEditingStatus"
                >
                  <option
                    :value="bank.code"
                    v-for="bank in bankList"
                    :key="bank.code"
                    :selected="bank.code === bankCode"
                  >{{bank.name}}</option>
                </select>
              </div>
              <div v-if="noBankfound">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="your bank name"
                  v-bind:readonly="country === '' "
                  v-model="bankName"
                  @input="updateEditingStatus"
                >
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Account Number</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{bankdetails.accountNumber}}</span>
            <input
              type="text"
              v-else
              class="form-control form-control-lg"
              placeholder="your Account Number"
              v-bind:readonly="!bankName "
              v-model="accountNumber"
              @input="updateEditingStatus"
              @blur="verifyAccountNumber"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Account Name</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{bankdetails.accountName}}</span>
            <div v-else>
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="your Account Number"
                v-model="accountName"
              >
              <div>
                <transition name="fade">
                  <p
                    v-if="incorrectBankNumber"
                    style="color: red!important; font-size: 13px!important;margin-top: 15px; text-align: center;"
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
                    {{incorrectBankNumberMessage}}
                  </p>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Allias</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{bankdetails.allias}}</span>
            <input
              type="text"
              v-else
              class="form-control form-control-lg"
              v-model="allias"
            >
          </div>
        </div>
      </form>
    </div>
    <div
      class="card-footer text-right border-top-0"
      style="border-bottom: 1px solid rgba(0, 40, 100, 0.12);"
      v-if="editing && country && accountNumber && accountName && bankName "
    >
      <button
        class="btn btn-danger"
        v-bind:disabled="processing"
        @click="updateBankdetails"
      >
        {{formText}}
        <span
          class="spinner-border spinner-border-sm ml-2"
          role="status"
          aria-hidden="true"
          v-if="processing"
        ></span>
      </button>
    </div>
  </div>
</template>
<script>
import "@/mixins";
import axios from "axios";

export default {
  props: ["bankdetails"],
  computed: {
    registrationInfo() {
      return this.$store.getters.registrationInfo;
    },
    bankName: {
      get() {
        return this.bankdetails.bankName;
      },
      set(value) {
        return (this.bankdetails.bankName = value);
      }
    },
    bankCode: {
      get() {
        return this.bankdetails.bankCode;
      },
      set(value) {
        return (this.bankdetails.bankCode = value);
      }
    },
    code: {
      get() {
        return this.bankdetails.code;
      },
      set(value) {
        return (this.bankdetails.code = value);
      }
    },
    accountNumber: {
      get() {
        return this.bankdetails.accountNumber;
      },
      set(value) {
        return (this.bankdetails.accountNumber = value);
      }
    },
    accountName: {
      get() {
        return this.bankdetails.accountName;
      },
      set(value) {
        return (this.bankdetails.accountName = value);
      }
    },
    currency: {
      get() {
        return this.bankdetails.currency;
      },
      set(value) {
        return (this.bankdetails.currency = value);
      }
    },
    allias: {
      get() {
        return this.bankdetails.allias;
      },
      set(value) {
        return (this.bankdetails.allias = value);
      }
    },

    user() {
      return this.$store.getters.user;
    },
    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    },
    countryBankName() {
      return this.$store.getters.countryBankName;
    },
    country() {
      let selectedCountry;
      if (this.currency == "NGN") {
        selectedCountry = "NG";
      } else {
        selectedCountry = "";
      }
      return selectedCountry;
    },
    bankList() {
      let cuBankName = this.countryBankName.filter(bank => {
        return bank.code === this.country;
      });

      let newData = cuBankName[0];
      let countryBankData = newData.countryBanks;

      return countryBankData;
    }
  },
  data() {
    return {
      bank: "",
      noBankfound: false,
      editing: false,
      collapseCard: false,
      formError: false,
      processing: false,
      emptyFields: true,
      formMessage: "",
      statusMessage: "",
      formText: "Update Bankdetails",
      hasError: true,
      noBankName: true,
      incorrectBankNumber: false,
      incorrectBankNumberMessage: "",
      allInputError: true,
      updatingBankdetails: false
    };
  },
  methods: {
    updateEditingStatus: function() {
      this.updatingBankdetails = true;
    },
    checkbankName: function() {
      if (this.country === "") {
        this.bankList = [];
        this.noBankfound = true;
        this.noBankName = false;
        this.$store.dispatch("closePageProcessing");
      } else {
        let cuBankName = this.countryBankName.filter(bank => {
          return bank.code === this.country;
        });

        if (cuBankName) {
          let newData = cuBankName[0];

          this.currency = newData.currencies[0].code;

          this.bankList = newData.countryBanks;
          let countryBankData = newData.countryBanks;

          if (countryBankData.length) {
            this.bankList = countryBankData;
            this.noBankfound = false;
          } else {
            this.bankList = [];
            this.noBankfound = true;
            this.noBankName = false;
          }
        } else {
          this.bankList = [];
          this.noBankfound = true;
        }
      }

      this.incorrectBankNumber = false;
      this.incorrectBankNumberMessage = "";
      this.$store.dispatch("closePageProcessing");
    },

    verifyAccountNumber: function() {
      this.incorrectBankNumber = false;
      if (this.bankList.length) {
        if (this.updatingBankdetails == false && !this.accountNumber) {
          return false;
        }

        this.apiVerifyAccountNumber();
        return true;
      } else {
        this.$store.dispatch("closePageProcessing");
        return false;
      }
    },

    apiVerifyAccountNumber: function() {
      this.$store.dispatch("showPageProcessing");
      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Country: this.country,
        BankCode: this.bankName,
        AccountNumber: this.accountNumber
      };

      const url = `${this.walletURL}/CountryBank/verifyAccountNumber`;

      axios
        .post(url, data)
        .then(response => {
          if (response.data.success) {
            let responseData = response.data.data.accountName;

            this.accountName = responseData;
          } else {
            this.incorrectBankNumber = true;
            this.incorrectBankNumberMessage = response.data.message;
          }

          this.$store.dispatch("closePageProcessing");
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateBankdetails: function() {
      if (
        !this.country &&
        !this.bank &&
        !this.bankName &&
        !this.accountNumber &&
        !this.accountName &&
        !this.allias
      ) {
        return false;
      } else {
        this.$store.dispatch("showPageProcessing");
        var data = {
          AppId: this.AppId,
          RequestId: this.RequestId,
          Country: this.country,
          Code: this.code,
          BankCode: this.bankCode,
          AccountNumber: this.accountNumber,
          Allias: this.allias,
          UserCode: this.user.userInfo.code,
          AccountName: this.accountName,
          Currency: this.currency
        };

        const url = `${this.hrmURL}/v1.0/UserBankAccount/updateUserBankAccount`;

        axios
          .post(url, data)
          .then(response => {
            // console.log(response);

            let payload;

            if (response.data.success) {
              let userCode = sessionStorage.getItem("activeformations");
              this.$store.dispatch("fetchUserData", userCode);

              payload = {
                type: "success",
                message: "Bank Details Updated!!"
              };

              this.editing = false;
            } else {
              payload = {
                type: "error",
                message: response.data.message
              };
            }

            this.$store.dispatch("showAlert", payload);

            this.$store.dispatch("closePageProcessing");
          })
          .catch(err => {
            if (err) {
              err;
            }

            let payload = {
              type: "error",
              message: "Bank Details Not Updated!!"
            };

            this.$store.dispatch("showAlert", payload);
          });

        return true;
      }
    }
  }
};
</script>
<style>
.School_history.card-collapsed {
  margin-bottom: 0px !important;
}
</style>