<template>
  <transition name="fade">
    <div
      class="overlay_div"
      tabindex="-1"
      v-if="addGuarantorModal"
    >
      <div
        class="overlay-close"
        @click="closeGuarantorModal"
      ></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLongTitle"
            >Add Guarantor</h5>
            <button
              type="button"
              class="close"
              @click="closeGuarantorModal"
              aria-label="Close"
            >
            </button>
          </div>
          <div class="modal-body animated px-4">
            <div class="card">
              <div class="card-body">
                <form
                  style="width: 100%;"
                  v-on:submit.prevent="addGuarantor"
                >
                  <p
                    class="errors alert mb-4"
                    :class="hasError ? 'alert-danger' : 'alert-success'"
                    v-if="formError"
                  >
                    {{ formMessage }}
                  </p>
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <label class="">Guarantor's FirstName</label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        @input="processGuarantor"
                        v-model.trim="firstName"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Guarantor's LastName</label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        @input="processGuarantor"
                        v-model.trim="lastName"
                      >
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <label class="">Guarantor's MiddleName</label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        @input="processGuarantor"
                        v-model.trim="middleName"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Guarantor's E-mail</label>
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        @input="processGuarantor"
                        v-model.trim="email"
                      >
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <label class="">Guarantor's Phone Number</label>
                      <input
                        type="tel"
                        class="form-control form-control-lg"
                        @input="processGuarantor"
                        v-model="phoneNumber"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Guarantor's Occupation</label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        @input="processGuarantor"
                        v-model="occupation"
                      >
                    </div>
                  </div>
                  <br> <br>
                  <div class="row">
                    <label class="col-sm-5 col-form-label"><b>Guarantor's Document</b></label>
                    <div class="col-sm-7">
                      <input
                        type="file"
                        ref="add_guarantor_input"
                        style="display: none;"
                        @change="changeGuarantor($event)"
                      >
                      <div v-if="previewImage">
                        <small
                          class="mb-3"
                          ref="preview_image"
                        >{{previewImage}}</small>
                      </div>
                      <button
                        class="btn btn-outline-danger font-weight-bold mt-1"
                        @click.prevent="$refs.add_guarantor_input.click()"
                      >
                        <span>Upload Document</span> <i
                          style="font-size: 16px"
                          class="fe fe-upload ml-2"
                        ></i>
                      </button>
                    </div>
                    <br>
                  </div>
                  <br> <br><br>
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <label class="">Guarantor's Home Address</label>
                      <textarea
                        rows="3"
                        @input="processGuarantor"
                        v-model="homeAddress"
                        class="form-control form-control-lg"
                      ></textarea>
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Guarantor's Additional Info</label>
                      <textarea
                        rows="3"
                        @input="processGuarantor"
                        v-model="additionalInformation"
                        class="form-control form-control-lg"
                      ></textarea>
                    </div>
                  </div>
                  <br><br>
                  <div class="row">
                    <div class="col-md-12 text-right">
                      <button
                        class="btn btn-danger btn-lg"
                        v-bind:disabled="emptyFields"
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
                  <br>
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
import "@/mixins";
import axios from "axios";

export default {
  data() {
    return {
      serverActive: false,
      firstName: "",
      lastName: "",
      middleName: "",
      email: "",
      phoneNumber: "",
      homeAddress: "",
      occupation: "",
      additionalInformation: "",
      documentation: "",
      formError: false,
      processing: false,
      emptyFields: true,
      formMessage: "",
      statusMessage: "",
      formText: "Add Guarantor",
      hasError: true,
      previewImage: ""
    };
  },

  computed: {
    addGuarantorModal() {
      return this.$store.getters.addGuarantorModal;
    },

    user() {
      return this.$store.getters.user;
    },
    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    }
  },

  methods: {
    closeGuarantorModal: function() {
      if (!this.serverActive) {
        this.$store.dispatch("closeGuarantorModal");
        this.clearForm();
        this.previewImage = "";
      }
    },

    changeGuarantor: function(event) {
      this.documentation = event.target.files[0];
      this.previewImage = this.documentation.name;
      this.processGuarantor();
    },

    addGuarantor: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitGuarantor();
        return true;
      } else {
        this.processGuarantor();
      }
    },
    processGuarantor: function() {
      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.validEmail(this.email) ||
        !this.homeAddress ||
        !this.phoneNumber ||
        !this.documentation
      ) {
        this.hasError = true;
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.formMessage = "";
      this.formError = false;
      this.hasError = false;
    },
    submitGuarantor: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";
      this.serverActive = true;

      const url = `${this.hrmURL}/v1.0/UserGuarantor/insertUserGuarantor`;

      var fd = new FormData();

      fd.append("UserCode", this.user.userInfo.code);
      fd.append("FirstName", this.firstName);
      fd.append("LastName", this.lastName);
      fd.append("MiddleName", this.middleName);
      fd.append("Email", this.email);
      fd.append("PhoneNumber", this.phoneNumber);
      fd.append("HomeAddress", this.homeAddress);
      fd.append("Occupation", this.occupation);
      fd.append("AdditionalInformation", this.additionalInformation);
      fd.append("AppId", this.AppId);
      fd.append("RequestId", this.RequestId);
      fd.append("Documentation", this.documentation);

      axios
        .post(url, fd)
        .then(response => {
          this.serverActive = false;
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Add Guarantor";

          this.closeGuarantorModal();

          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Guarantor Updated!!"
            };

            let responseData = response.data.data;
            this.$store.dispatch("appendGuarantor", responseData);
          } else {
            payload = {
              type: "error",
              message: response.data.message
            };
          }

          this.$store.dispatch("showAlert", payload);

          //   console.log(response);
        })
        .catch(err => {
          let payload = {
            type: "error",
            message: "Guarantor Not Updated!!",
            status: err
          };
          console.log(err);

          this.serverActive = false;
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Add Guarantor";

          this.$store.dispatch("showAlert", payload);
        });
    },
    validEmail: function(email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    },
    clearForm: function() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.middleName = "";
      this.firstName = "";
      this.phoneNumber = "";
      this.homeAddress = "";
      this.occupation = "";
      this.additionalInformation = "";
      this.documentation = null;
      this.emptyFields = true;
      this.formMessage = "";
      this.formError = false;
      this.hasError = true;
    }
  }
};
</script>
<style>
</style>