<template>
  <transition name="fade">
    <div
      class="overlay_div"
      tabindex="-1"
      v-if="UploadEvidenceFormModal"
    >
      <div
        class="overlay-close"
        @click="closeUploadEvidenceFormModal"
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
            > Fill Out this field </h3>
            <div
              data-dismiss="modal"
              style="font-size: 19px; color: #000!important;"
              class="close text-dark"
              @click="closeUploadEvidenceFormModal"
            ></div>
          </div>
          <div class="modal-body animated px-4">
            <button
              class="btn bg-light-orange box-shadow-sm"
              @click="goBack"
            > <i class="fe fe-corner-up-left"></i> Back </button>
            <br><br>
            <div class="card shadow">
              <div class="card-body">
                <form
                  id="form_fd"
                  v-on:submit.prevent="submitForm"
                >
                  <p
                    class="alert alert-error"
                    v-if="showError"
                  >{{errorMessage}}</p>
                  <div class="row">
                    <div class="form-group col-md-6">
                      <label><b>Currency</b></label>
                      <select
                        class="form-control custom-select"
                        v-model="currency"
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
                    <div class="form-group col-md-6">
                      <label><b>Amount</b></label>
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
                  <br> <br>
                  <div class="row">
                    <div class="form-group col-md-12 mb-4">
                      <label><b>Additional Information</b></label>
                      <textarea
                        cols="30"
                        rows="5"
                        class="form-control"
                        v-model.trim="additionalInformation"
                        @input="checkform"
                      ></textarea>
                    </div>
                    <br> <br> <br><br> <br> <br><br>
                    <div class="form-group col-md-12">
                      <div class="row">
                        <label class="col-sm-5 col-form-label"><b>Evidience of Payment</b></label>
                        <div class="col-sm-7">
                          <input
                            type="file"
                            ref="add_evidience_input"
                            style="display: none;"
                            @change="changePaymentEvidience($event)"
                          >
                          <div v-if="previewDocument">
                            <small
                              class="mb-3"
                              ref="preview_image"
                            >{{previewDocument}}</small>
                          </div>
                          <button
                            class="btn btn-outline-danger font-weight-bold mt-1"
                            @click.prevent="$refs.add_evidience_input.click()"
                          >
                            <span>Upload Document</span> <i
                              style="font-size: 16px"
                              class="fe fe-upload ml-2"
                            ></i>
                          </button>
                        </div>
                      </div>
                      <br>
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
  name: "UploadEvidenceFormModal",
  data() {
    return {
      amount: this.addComma(100),
      currency: "",
      additionalInformation: "",
      processing: false,
      buttonText: "Submit Evidence",
      emptyFields: true,
      inputError: false,
      formError: false,
      errorMessage: "",
      showError: false,
      previewDocument: "",
      document: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },

    UploadEvidenceFormModal() {
      return this.$store.getters.UploadEvidenceFormModal;
    },
    currencies() {
      return this.$store.getters.userPaymentOptions.currencies;
    },
    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    },
    countryBankName() {
      return this.$store.getters.countryBankName;
    }
  },

  methods: {
    changePaymentEvidience: function(event) {
      this.document = event.target.files[0];
      this.previewDocument = this.document.name;
      this.checkInput(this.amount);
    },
    closeUploadEvidenceFormModal: function() {
      if (!this.processing) {
        this.$store.dispatch("closeUploadEvidenceFormModal");
        this.clearForm();
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
        this.inputError = false;
        return false;
      }
      if (!this.additionalInformation) {
        this.emptyFields = true;
        this.inputError = false;
        return false;
      }

      if (!this.document) {
        this.emptyFields = true;
        this.inputError = false;
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
        this.submitEvidenceOfPayment();

        return true;
      } else {
        this.checkform();
        return false;
      }
    },
    checkform: function() {
      if (
        !this.amount ||
        !this.currency ||
        !this.additionalInformation ||
        !this.document
      ) {
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

    submitEvidenceOfPayment: function() {
      this.buttonText = "Please wait...";
      this.processing = true;

      const url = `${this.walletURL}/v1.0/PaymentEvidence/sendpaymentEvidence`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Evidence: this.document,
        Currency: this.currency,
        Amount: this.amount,
        AdditionalInformation: this.additionalInformation,
        Email: this.user.userInfo.email
      };

      console.log(data);

      var fd = new FormData();

      fd.append("UserCode", this.user.userInfo.code);
      fd.append("Currency", this.currency);
      fd.append("Amount", this.amount);
      fd.append("Email", this.user.userInfo.email);
      fd.append("AppId", this.AppId);
      fd.append("RequestId", this.RequestId);
      fd.append("Evidence", this.document);

      axios
        .post(url, fd)
        .then(res => {
          this.processing = false;
          this.buttonText = "Submit Evidence";

          let payload;

          if (res.data.success) {
            // let responseData = res.data.data;

            payload = {
              type: "success",
              message: "Payment Evidence Submitted successfully!!"
            };

            // console.log(res);
          } else {
            this.showError = true;
            this.errorMessage = "Sorry, Server not reachable, Try again later";

            payload = {
              type: "error",
              message: res.data.message
            };

            setTimeout(() => {
              this.$store.dispatch("showAlert", payload);
              this.closeUploadEvidenceFormModal();
            }, 1200);
          }

          // console.log(res);
        })
        .catch(err => {
          console.log(err);
          this.processing = false;
          this.buttonText = "Submit Evidence";
        });
    },

    goBack: function() {
      this.$store.dispatch("closeUploadEvidenceFormModal");
      this.$store.dispatch("showUploadEvidienceModal");
      this.clearForm();
    },

    clearForm: function() {
      this.amount = null;
      this.currency = "";
      this.previewDocument = "";
      this.document = null;
      this.processing = false;
      this.buttonText = "Submit Evidence";
      this.emptyFields = true;
      this.inputError = false;
      this.formError = false;
      this.errorMessage = "";
      this.showError = false;
    }
  },

  mounted() {}
};
</script>
<style scoped>
#form_fd {
  width: 80%;
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

@media screen and (max-width: 600px) {
  #form_fd {
    width: 95%;
    margin: auto;
  }
}
</style>