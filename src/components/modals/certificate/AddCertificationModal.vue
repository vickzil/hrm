<template>
  <transition name="fade">
    <div
      class="overlay_div"
      tabindex="-1"
      v-if="addCertificationModal"
    >
      <div
        class="overlay-close"
        @click="closeCertificationModal"
      ></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLongTitle"
            >Add Certification</h5>
            <button
              type="button"
              class="close"
              @click="closeCertificationModal"
              aria-label="Close"
            >
            </button>
          </div>
          <div class="modal-body animated px-4">
            <div class="card">
              <div class="card-body">
                <form
                  style="width: 100%;"
                  v-on:submit.prevent="addCertification"
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
                      <label class="">Certificate Title</label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        @input="processCertification"
                        v-model="title"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Certificate Issued By</label>
                      <input
                        type="text"
                        @input="processCertification"
                        v-model="issuedBy"
                        class="form-control form-control-lg"
                      >
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <label class="col-sm-3 col-form-label"><b>Certificate Url</b></label>
                    <div class="col-sm-8">
                      <input
                        type="file"
                        ref="add_certificate_input"
                        style="display: none;"
                        @change="changeCertificate($event)"
                      >
                      <div v-if="previewImage">
                        <small
                          class="mb-3"
                          ref="preview_image"
                        >{{previewImage}}</small>
                      </div>
                      <button
                        class="btn btn-danger font-weight-bold mt-1"
                        @click.prevent="$refs.add_certificate_input.click()"
                      >
                        <span>Upload certificate</span> <i
                          style="font-size: 16px"
                          class="fe fe-upload ml-2"
                        ></i>
                      </button>
                    </div>
                    <br>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-12 col-sm-12">
                      <label class="">Certificate Description</label>
                      <textarea
                        rows="9"
                        @input="processCertification"
                        v-model="description"
                        class="form-control form-control-lg"
                        placeholder="Here can be your description"
                      >Oh so, your weak rhyme You doubt I'll bother, reading into it I'll probably won't, left to my own devices But that's the difference in our opinions.</textarea>
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-4 col-sm-12">
                      <label class=""><b>Certificate Issued On</b></label>
                      <input
                        type="date"
                        class="form-control"
                        @change="processCertification"
                        v-model="issuedOn"
                      >
                    </div>
                    <div class="col-md-4 col-sm-12">
                      <label class=""><b>Certificate Expire On</b></label>
                      <input
                        type="date"
                        class="form-control"
                        @change="processCertification"
                        v-model="expireOn"
                      >
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
      title: "",
      issuedBy: "",
      description: "",
      certificateUrl: null,
      issuedOn: null,
      expireOn: null,
      formError: false,
      processing: false,
      emptyFields: true,
      formMessage: "",
      statusMessage: "",
      formText: "Add Certification",
      hasError: true,
      previewImage: ""
    };
  },

  computed: {
    addCertificationModal() {
      return this.$store.getters.addCertificationModal;
    },

    user() {
      return this.$store.getters.user;
    },

    AppId() {
      return this.$store.getters.AppId;
    }
  },

  methods: {
    closeCertificationModal: function() {
      if (!this.serverActive) {
        this.$store.dispatch("closeCertificationModal");
        this.clearForm();
        this.previewImage = "";
      }
    },

    changeCertificate: function(event) {
      this.certificateUrl = event.target.files[0];
      this.previewImage = this.certificateUrl.name;
    },

    addCertification: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitCertification();
        return true;
      } else {
        this.processCertification();
      }
    },
    processCertification: function() {
      if (
        !this.title ||
        !this.issuedBy ||
        !this.issuedOn ||
        !this.expireOn ||
        !this.certificateUrl
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
    submitCertification: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";
      this.serverActive = true;

      const url = `${this.hrmURL}/v1.0/UserCertification/insertUserCertification`;

      var fd = new FormData();

      fd.append("UserCode", this.user.userInfo.code);
      fd.append("Title", this.title);
      fd.append("IssuedBy", this.issuedBy);
      fd.append("IssuedOn", this.issuedOn);
      fd.append("ExpireOn", this.expireOn);
      fd.append("Description", this.description);
      fd.append("AppId", "001");
      fd.append("RequestId", "String");
      fd.append("CeritificationFile", this.certificateUrl);

      axios
        .post(url, fd)
        .then(response => {
          this.serverActive = false;
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Add Certification";

          this.closeCertificationModal();

          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Certification Updated!!"
            };

            let responseData = response.data.data;
            this.$store.dispatch("appendCertification", responseData);
          } else {
            payload = {
              type: "error",
              message: "Certification Not Updated!!"
            };
          }

          this.$store.dispatch("showAlert", payload);

          // console.log(response);
        })
        .catch(err => {
          let payload = {
            type: "error",
            message: "Certification Not Updated!!",
            status: err
          };
          console.log(err);

          this.serverActive = false;
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Add Certification";

          this.$store.dispatch("showAlert", payload);
        });
    },

    clearForm: function() {
      this.title = "";
      this.issuedBy = "";
      this.description = "";
      this.certificateUrl = "";
      this.issuedOn = null;
      this.expireOn = null;
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