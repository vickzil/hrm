<template>
  <div
    class="card work_history"
    style="margin-bottom: 50px;"
    :class="collapseCard && 'card-collapsed'"
  >
    <div class="card-header">
      <h3 class="card-title">{{guarantor.code}}</h3>
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
            @click="deleteGuarantor(guarantor)"
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
        v-on:submit.prevent="updateGuarantor"
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
          <label class="col-sm-3 col-form-label"><b>Guarantor's FirstName</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{guarantor.firstName}}</span>
            <input
              v-else
              type="text"
              @input="processGuarantor"
              v-model="firstName"
              class="form-control form-control-lg"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Guarantor's LastName</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{guarantor.lastName}}</span>
            <input
              v-else
              type="text"
              @input="processGuarantor"
              v-model="lastName"
              class="form-control form-control-lg"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Guarantor's MiddleName</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{guarantor.middleName}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processGuarantor"
              v-model="middleName"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Guarantor's E-mail</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{guarantor.email}}</span>
            <input
              v-else
              type="email"
              class="form-control form-control-lg"
              @input="processGuarantor"
              v-model="email"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Guarantor's Phone Number</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{guarantor.phoneNumber}}</span>
            <input
              v-else
              type="tel"
              class="form-control form-control-lg"
              @input="processGuarantor"
              v-model="phoneNumber"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Guarantor's Home Address</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{guarantor.homeAddress}}</span>
            <textarea
              v-else
              rows="6"
              @input="processGuarantor"
              v-model="homeAddress"
              class="form-control form-control-lg"
            ></textarea>
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Guarantor's Occupation</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{guarantor.occupation}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processGuarantor"
              v-model="occupation"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Guarantor's Additional Info</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{guarantor.additionalInformation}}</span>
            <textarea
              v-else
              rows="9"
              @input="processGuarantor"
              v-model="additionalInformation"
              class="form-control form-control-lg"
            ></textarea>
          </div>
        </div>
        <br>
        <div
          class="row"
          v-if="editing"
          style="margin-bottom: 30px;"
        >
          <label class="col-sm-3 col-form-label"><b>Guarantor Document</b></label>
          <div class="col-sm-8">
            <input
              type="file"
              ref="guarantor_input"
              style="display: none;"
              @change="changeGuarantor($event)"
            >
            <small class="mb-4 ml-3">Click here to upload file</small>
            <button
              class="btn btn-danger btn-lg"
              @click="$refs.guarantor_input.click()"
              style="display: flex; justify-content: space-between; align-items: center;"
            >
              <span>Upload Document</span> <i
                style="font-size: 20px"
                class="fe fe-upload ml-2"
              ></i>
            </button>
          </div>
          <br>
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
        @click="updateGuarantor"
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
  props: ["guarantor"],
  computed: {
    firstName: {
      get() {
        return this.guarantor.firstName;
      },
      set(value) {
        return (this.guarantor.firstName = value);
      }
    },
    lastName: {
      get() {
        return this.guarantor.lastName;
      },
      set(value) {
        return (this.guarantor.lastName = value);
      }
    },
    middleName: {
      get() {
        return this.guarantor.middleName;
      },
      set(value) {
        return (this.guarantor.middleName = value);
      }
    },
    email: {
      get() {
        return this.guarantor.email;
      },
      set(value) {
        return (this.guarantor.email = value);
      }
    },
    phoneNumber: {
      get() {
        return this.guarantor.phoneNumber;
      },
      set(value) {
        return (this.guarantor.phoneNumber = value);
      }
    },
    homeAddress: {
      get() {
        return this.guarantor.homeAddress;
      },
      set(value) {
        return (this.guarantor.homeAddress = value);
      }
    },
    occupation: {
      get() {
        return this.guarantor.occupation;
      },
      set(value) {
        return (this.guarantor.occupation = value);
      }
    },
    additionalInformation: {
      get() {
        return this.guarantor.additionalInformation;
      },
      set(value) {
        return (this.guarantor.additionalInformation = value);
      }
    },
    documentation: {
      get() {
        return this.guarantor.documentation;
      },
      set(value) {
        return (this.guarantor.documentation = value);
      }
    },
    code: {
      get() {
        return this.guarantor.code;
      },
      set(value) {
        return (this.guarantor.code = value);
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
      formText: "Update Guarantor",
      hasError: true
    };
  },
  methods: {
    changeGuarantor: function(event) {
      this.documentation = event.target.files[0];
    },

    deleteGuarantor: function(guarantor) {
      this.deleteguarantorFromDB(guarantor);
      this.$store.dispatch("showPageProcessing");
    },
    updateGuarantor: function() {
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
        !this.phoneNumber ||
        !this.occupation ||
        !this.homeAddress
      ) {
        this.hasError = true;
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.formMessage = "";
      this.formError = false;
      this.hasError = false;

      return true;
    },
    submitGuarantor: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/UserGuarantor/updateUserguarantor`;

      var fd = new FormData();

      fd.append("Code", this.code);
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
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Update guarantor";
          this.editing = false;
          this.collapseCard = false;
          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "guarantor Updated!!"
            };

            let userCode = sessionStorage.getItem("activeformations");
            this.$store.dispatch("fetchUserData", userCode);
          } else {
            payload = {
              type: "error",
              message: response.data.message
            };
          }

          this.$store.dispatch("showAlert", payload);

          // console.log(response);
        })
        .catch(err => {
          let payload = {
            type: "error",
            message: "guarantor Updated not successful!!",
            status: err
          };
          console.log(err);
          this.$store.dispatch("showAlert", payload);
        });
    },

    deleteguarantorFromDB: function(guarantor) {
      const url = `${this.hrmURL}/v1.0/UserGuarantor/deleteUserGuarantor`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Code: guarantor.code
      };

      axios
        .post(url, data)
        .then(response => {
          if (response) {
            response;
          }
          this.removeGuarantorFromUI(guarantor);
        })
        .catch(err => {
          if (err) {
            err;
          }
          this.$store.dispatch("closePageProcessing");
        });
    },
    removeGuarantorFromUI: function(guarantor) {
      let guarantors = this.$store.state.user.userInfo.userGuarantors;

      var index = guarantors.indexOf(guarantor);

      if (index !== -1) {
        guarantors.splice(index, 1);
      }

      this.$store.dispatch("closePageProcessing");

      let payload = {
        type: "success",
        message: "Guarantor Deleted!!"
      };

      this.$store.dispatch("showAlert", payload);
    }
  }
};
</script>
<style>
.School_history.card-collapsed {
  margin-bottom: 0px !important;
}
</style>