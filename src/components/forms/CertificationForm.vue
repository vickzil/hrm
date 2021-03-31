<template>
  <div
    class="card certificate_history"
    style="margin-bottom: 50px;"
    :class="collapseCard && 'card-collapsed'"
  >
    <div class="card-header">
      <h3 class="card-title">{{certification.code}}</h3>
      <div class="card-options">
        <a
          @click="collapseCard = !collapseCard"
          v-if="!editing"
          href="javascript:void(0);"
          style="font-size: 20px"
          class="card-options-collapse mr-3"
        ><i
            class="fe"
            :class="collapseCard ? 'fe-chevron-down' : 'fe-chevron-up'  "
          ></i></a>
        <button
          v-if="!editing && !collapseCard"
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
            v-if="!editing"
            @click="deleteCertificate(certification)"
            class="btn mr-2 d-flex justify-content-center align-center bg-light-red"
          >
            <i
              style="font-size: 20px"
              class="fe fe-trash-2"
            ></i>
          </button>
          <button
            v-else
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
        v-on:submit.prevent="updateCertificate"
        enctype="multipart/form-data"
      >
        <p
          class="errors alert mb-4"
          :class="hasError ? 'alert-danger' : 'alert-success'"
          v-if="formError"
        >
          {{ formMessage }}
        </p>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Certificate Title</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{certification.title}}</span>
            <input
              v-else
              type="text"
              @input="processCertificate"
              v-model="title"
              class="form-control form-control-lg"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Certificate Issued By</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{certification.issuedBy}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processCertificate"
              v-model="issuedBy"
            >
          </div>
        </div>
        <br>
        <div
          class="row"
          v-if="editing"
          style="margin-bottom: 30px;"
        >
          <label class="col-sm-3 col-form-label"><b>Certificate Url</b></label>
          <div class="col-sm-8">
            <input
              type="file"
              ref="certificate_input"
              style="display: none;"
              @change="changeCertificate($event)"
            >
            <small class="mb-4 ml-3">Click here to upload file</small>
            <button
              class="btn btn-danger btn-lg"
              @click="$refs.certificate_input.click()"
              style="display: flex; justify-content: space-between; align-items: center;"
            >
              <span>Upload certificate</span> <i
                style="font-size: 20px"
                class="fe fe-upload ml-2"
              ></i>
            </button>
          </div>
          <br>
        </div>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Certificate Description</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{certification.description}}</span>
            <textarea
              v-else
              rows="9"
              @input="processCertificate"
              v-model="description"
              class="form-control form-control-lg"
            ></textarea>
          </div>
        </div>
        <br>
        <div
          class="row"
          v-if="!editing && certificateUrl"
          style="margin-top: 30px;"
        >
          <div class="col-sm-6">
            <iframe
              :src="`https://view.officeapps.live.com/op/embed.aspx?src=${certificateUrl}`"
              frameborder="no"
              style="width:100%;height:500px"
            ></iframe>
          </div>
        </div>
        <br>
        <div v-if="editing">
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <label class="col-form-label"><b>Certificate Issued On</b></label>
              <input
                type="date"
                class="form-control"
                @change="processCertificate"
                v-model="issuedOn"
              >
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="col-form-label"><b>Certificate Expire On</b></label>
              <input
                type="date"
                class="form-control"
                @change="processCertificate"
                v-model="expireOn"
              >
            </div>
          </div>
        </div>
      </form>
    </div>
    <div
      class="card-footer text-right border-top-0"
      style="border-bottom: 1px solid rgba(0, 40, 100, 0.12);"
    >
      <button
        v-if="editing"
        class="btn btn-danger"
        v-bind:disabled="emptyFields"
        @click="updateCertificate"
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
  props: ["certification"],
  computed: {
    title: {
      get() {
        return this.certification.title;
      },
      set(value) {
        return (this.certification.title = value);
      }
    },
    description: {
      get() {
        return this.certification.description;
      },
      set(value) {
        return (this.certification.description = value);
      }
    },
    issuedBy: {
      get() {
        return this.certification.issuedBy;
      },
      set(value) {
        return (this.certification.issuedBy = value);
      }
    },
    certificateUrl: {
      get() {
        return this.certification.certificateUrl;
      },
      set(value) {
        return (this.certification.certificateUrl = value);
      }
    },
    issuedOn: {
      get() {
        return this.removeTimeZone(this.certification.issuedOn);
      },
      set(value) {
        return (this.certification.issuedOn = this.removeTimeZone(value));
      }
    },
    expireOn: {
      get() {
        return this.removeTimeZone(this.certification.expireOn);
      },
      set(value) {
        return (this.certification.expireOn = this.removeTimeZone(value));
      }
    },

    user() {
      return this.$store.getters.user;
    },
    AppId() {
      return this.$store.getters.AppId;
    }
  },
  data() {
    return {
      editing: false,
      collapseCard: false,
      formError: false,
      processing: false,
      emptyFields: true,
      formMessage: "",
      statusMessage: "",
      formText: "Update Certificate",
      hasError: true
    };
  },
  methods: {
    changeCertificate: function(event) {
      this.certificateUrl = event.target.files[0];
    },

    deleteCertificate: function(certification) {
      this.$store.dispatch("showPageProcessing");
      this.deleteCertificationFromDB(certification);
    },
    updateCertificate: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitCertificate();
        return true;
      } else {
        this.processCertificate();
      }
    },
    processCertificate: function() {
      if (!this.title || !this.issuedBy || !this.issuedOn || !this.expireOn) {
        this.hasError = true;
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.formMessage = "";
      this.formError = false;
      this.hasError = false;
    },
    submitCertificate: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/UserCertification/updateUserCertification`;

      var fd = new FormData();

      fd.append("Code", this.certification.code);
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
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Update Certification";
          this.editing = false;
          this.collapseCard = false;
          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Certification Updated!!"
            };

            let userCode = sessionStorage.getItem("activeformations");
            this.$store.dispatch("fetchUserData", userCode);
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
          this.$store.dispatch("showAlert", payload);
        });
    },

    deleteCertificationFromDB: function(certificate) {
      const url = `${this.hrmURL}/v1.0/UserCertification/deleteCertification`;

      var data = {
        AppId: "001",
        RequestId: "98euiu38338",
        Code: certificate.code
      };

      axios
        .post(url, data)
        .then(response => {
          if (response) {
            response;
          }

          this.$store.dispatch("closePageProcessing");

          this.removeCertificateFromUI(certificate);
        })
        .catch(err => {
          if (err) {
            err;
          }
        });
    },

    removeCertificateFromUI: function(certificate) {
      let certificateHistories = this.$store.state.user.userInfo
        .userCertifications;

      var index = certificateHistories.indexOf(certificate);

      if (index !== -1) {
        certificateHistories.splice(index, 1);
      }

      let payload = {
        type: "success",
        message: "Certificate History Deleted!!"
      };

      this.$store.dispatch("showAlert", payload);
    }
  }
};
</script>
<style>
.certificate_history.card-collapsed {
  margin-bottom: 0px !important;
}
</style>