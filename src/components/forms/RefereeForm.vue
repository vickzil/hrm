<template>
  <div
    class="card work_history"
    style="margin-bottom: 50px;"
    :class="collapseCard && 'card-collapsed'"
  >
    <div class="card-header">
      <h3 class="card-title">{{referee.code}}</h3>
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
            @click="deleteReferee(referee)"
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
        v-on:submit.prevent="updateReferee"
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
          <label class="col-sm-3 col-form-label"><b>Referee's FirstName</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{referee.firstName}}</span>
            <input
              v-else
              type="text"
              @input="processReferee"
              v-model="firstName"
              class="form-control form-control-lg"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Referee's LastName</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{referee.lastName}}</span>
            <input
              v-else
              type="text"
              @input="processReferee"
              v-model="lastName"
              class="form-control form-control-lg"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Referee's MiddleName</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{referee.middleName}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processReferee"
              v-model="middleName"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Referee's E-mail</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{referee.email}}</span>
            <input
              v-else
              type="email"
              class="form-control form-control-lg"
              @input="processReferee"
              v-model="email"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Referee's Phone Number</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{referee.phoneNumber}}</span>
            <input
              v-else
              type="tel"
              class="form-control form-control-lg"
              @input="processReferee"
              v-model="phoneNumber"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Referee's Home Address</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{referee.homeAddress}}</span>
            <textarea
              v-else
              rows="6"
              @input="processReferee"
              v-model="homeAddress"
              class="form-control form-control-lg"
            ></textarea>
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Referee's Occupation</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{referee.occupation}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processReferee"
              v-model="occupation"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Referee's Additional Info</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{referee.additionalInformation}}</span>
            <textarea
              v-else
              rows="9"
              @input="processReferee"
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
          <label class="col-sm-3 col-form-label"><b>Valid ID</b></label>
          <div class="col-sm-8">
            <input
              type="file"
              ref="referee_input"
              style="display: none;"
              @change="changeReferees($event)"
            >
            <small class="mb-4 ml-3">Click here to upload file</small>
            <button
              class="btn btn-danger btn-lg"
              @click="$refs.referee_input.click()"
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
        @click="updateReferee"
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
  props: ["referee"],
  computed: {
    firstName: {
      get() {
        return this.referee.firstName;
      },
      set(value) {
        return (this.referee.firstName = value);
      }
    },
    lastName: {
      get() {
        return this.referee.lastName;
      },
      set(value) {
        return (this.referee.lastName = value);
      }
    },
    middleName: {
      get() {
        return this.referee.middleName;
      },
      set(value) {
        return (this.referee.middleName = value);
      }
    },
    email: {
      get() {
        return this.referee.email;
      },
      set(value) {
        return (this.referee.email = value);
      }
    },
    phoneNumber: {
      get() {
        return this.referee.phoneNumber;
      },
      set(value) {
        return (this.referee.phoneNumber = value);
      }
    },
    homeAddress: {
      get() {
        return this.referee.homeAddress;
      },
      set(value) {
        return (this.referee.homeAddress = value);
      }
    },
    occupation: {
      get() {
        return this.referee.occupation;
      },
      set(value) {
        return (this.referee.occupation = value);
      }
    },
    additionalInformation: {
      get() {
        return this.referee.additionalInformation;
      },
      set(value) {
        return (this.referee.additionalInformation = value);
      }
    },
    documentation: {
      get() {
        return this.referee.documentation;
      },
      set(value) {
        return (this.referee.documentation = value);
      }
    },
    code: {
      get() {
        return this.referee.code;
      },
      set(value) {
        return (this.referee.code = value);
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
      formText: "Update Referee",
      hasError: true
    };
  },
  methods: {
    changeReferees: function(event) {
      this.documentation = event.target.files[0];
    },

    deleteReferee: function(referee) {
      this.deleteRefereeFromDB(referee);
      this.$store.dispatch("showPageProcessing");
    },
    updateReferee: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitReferee();
        return true;
      } else {
        this.processReferee();
      }
    },
    processReferee: function() {
      if (
        !this.firstName ||
        !this.lastName ||
        !this.email ||
        !this.validEmail(this.email) ||
        !this.homeAddress ||
        !this.phoneNumber
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
    submitReferee: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/UserReferee/updateUserReferee`;

      var fd = new FormData();

      fd.append("Code", this.code);
      fd.append("UserCode", this.user.userInfo.code);
      fd.append("firstName", this.firstName);
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
          this.formText = "Update Referee";
          this.editing = false;
          this.collapseCard = false;
          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Referee Updated!!"
            };
          } else {
            payload = {
              type: "error",
              message: "Referee Not Updated!!"
            };
          }

          let userCode = sessionStorage.getItem("activeformations");
          this.$store.dispatch("fetchUserData", userCode);

          this.$store.dispatch("showAlert", payload);

          //   console.log(response);
        })
        .catch(err => {
          let payload = {
            type: "error",
            message: "Referee Not Updated!!",
            status: err
          };
          console.log(err);
          this.$store.dispatch("showAlert", payload);
          let userCode = sessionStorage.getItem("activeformations");
          this.$store.dispatch("fetchUserData", userCode);
        });
    },

    deleteRefereeFromDB: function(referee) {
      const url = `${this.hrmURL}/v1.0/UserReferee/deleteUserReferee`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Code: referee.code
      };

      axios
        .post(url, data)
        .then(response => {
          if (response) {
            response;
          }

          this.removeRefereeFromUI(referee);
        })
        .catch(err => {
          if (err) {
            err;
            this.$store.dispatch("closePageProcessing");
          }
        });
    },
    validEmail: function(email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    },

    removeRefereeFromUI: function(referee) {
      let referees = this.$store.state.user.userInfo.refrees;
      var index = referees.indexOf(referee);

      if (index !== -1) {
        referees.splice(index, 1);
      }
      this.$store.dispatch("closePageProcessing");

      let payload = {
        type: "success",
        message: "Referee Deleted!!"
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