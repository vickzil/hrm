<template>
  <div
    class="card work_history"
    style="margin-bottom: 50px;"
    :class="collapseCard && 'card-collapsed'"
  >
    <div class="card-header">
      <h3 class="card-title">{{workHistory.code}}</h3>
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
            class="btn mr-2 d-flex justify-content-center align-center bg-light-red"
          >
            <i
              style="font-size: 20px"
              class="fe fe-trash-2"
              @click="deleteWorkHistory(workHistory)"
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
        v-on:submit.prevent="updateWorkHistory"
      >
        <p
          class="errors alert mb-4"
          :class="hasError ? 'alert-danger' : 'alert-success'"
          v-if="formError"
        >
          {{ formMessage }}
        </p>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Job Title</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{workHistory.jobTitle}}</span>
            <input
              v-else
              type="text"
              @input="processWorkHistory"
              class="form-control form-control-lg"
              v-model="jobTitle"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Employer</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{workHistory.employer}}</span>
            <input
              v-else
              type="text"
              @input="processWorkHistory"
              class="form-control form-control-lg"
              v-model="employer"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Employer Addresss</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{workHistory.employerAddresss}}</span>
            <input
              v-else
              type="text"
              @input="processWorkHistory"
              class="form-control form-control-lg"
              v-model="employerAddresss"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Employer E-mail</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{workHistory.employerEmail}}</span>
            <input
              v-else
              type="email"
              @input="processWorkHistory"
              class="form-control form-control-lg"
              v-model.trim="employerEmail"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Employer Phone</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{workHistory.employerPhoneNumber}}</span>
            <input
              v-else
              type="tel"
              @input="processWorkHistory"
              class="form-control form-control-lg"
              v-model.trim="employerPhoneNumber"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Employer Website</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{workHistory.employerWebsite}}</span>
            <input
              v-else
              type="text"
              @input="processWorkHistory"
              class="form-control form-control-lg"
              v-model.trim="employerWebsite"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Job Description</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{workHistory.jobDescription}}</span>
            <textarea
              v-else
              rows="9"
              @input="processWorkHistory"
              v-model="jobDescription"
              class="form-control form-control-lg"
            ></textarea>
          </div>
        </div>
        <br>
        <div
          class="row"
          v-if="!editing"
        >
          <label class="col-sm-3 col-form-label"><b>Start date</b></label>
          <div class="col-sm-8">
            <span
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{removeTimeZone(workHistory.from)}}</span>
          </div>
          <br>
        </div>
        <div
          class="row"
          v-if="!editing"
        >
          <label class="col-sm-3 col-form-label"><b>End Date</b></label>
          <div class="col-sm-8">
            <span
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{removeTimeZone(workHistory.to)}}</span>
          </div>
        </div>
        <br>
        <div v-if="editing">
          <br>
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <label class="col-form-label"><b>Start Date</b></label>
              <input
                type="date"
                @change="processWorkHistory"
                class="form-control"
                v-model="from"
              >
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="col-form-label"><b>End Date</b></label>
              <input
                type="date"
                class="form-control"
                v-model="to"
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
        type="submit"
        class="btn btn-danger"
        v-bind:disabled="emptyFields"
        @click="updateWorkHistory"
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
  props: ["workHistory"],
  computed: {
    jobTitle: {
      get() {
        return this.workHistory.jobTitle;
      },
      set(value) {
        return (this.workHistory.jobTitle = value);
      }
    },
    employer: {
      get() {
        return this.workHistory.employer;
      },
      set(value) {
        return (this.workHistory.employer = value);
      }
    },
    employerAddresss: {
      get() {
        return this.workHistory.employerAddresss;
      },
      set(value) {
        return (this.workHistory.employerAddresss = value);
      }
    },
    employerEmail: {
      get() {
        return this.workHistory.employerEmail;
      },
      set(value) {
        return (this.workHistory.employerEmail = value);
      }
    },
    employerPhoneNumber: {
      get() {
        return this.workHistory.employerPhoneNumber;
      },
      set(value) {
        return (this.workHistory.employerPhoneNumber = value);
      }
    },
    employerWebsite: {
      get() {
        return this.workHistory.employerWebsite;
      },
      set(value) {
        return (this.workHistory.employerWebsite = value);
      }
    },
    jobDescription: {
      get() {
        return this.workHistory.jobDescription;
      },
      set(value) {
        return (this.workHistory.jobDescription = value);
      }
    },
    status: {
      get() {
        return this.workHistory.status;
      },
      set(value) {
        return (this.workHistory.status = value);
      }
    },
    from: {
      get() {
        return this.removeTimeZone(this.workHistory.from);
      },
      set(value) {
        return (this.workHistory.from = this.removeTimeZone(value));
      }
    },
    to: {
      get() {
        return this.removeTimeZone(this.workHistory.to);
      },
      set(value) {
        return (this.workHistory.to = this.removeTimeZone(value));
      }
    },

    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    },

    user() {
      return this.$store.getters.user;
    }
  },
  data() {
    return {
      editing: false,
      workStatus: false,
      collapseCard: false,
      formError: false,
      processing: false,
      emptyFields: true,
      formMessage: "",
      statusMessage: "",
      formText: "Update Work",
      hasError: true
    };
  },
  methods: {
    updateWorkStatus: function() {
      if (this.status == "active") {
        this.status = "";
      } else {
        this.status = "active";
      }
    },
    deleteWorkHistory: function(work) {
      this.$store.dispatch("showPageProcessing");
      this.deleteWorkHistoryFromDB(work);
    },
    updateWorkHistory: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitWorkHistory();
      } else {
        this.processWorkHistory();
      }
    },
    processWorkHistory: function() {
      if (!this.jobTitle || !this.employer || !this.from) {
        this.hasError = true;
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.formMessage = "";
      this.formError = false;
      this.hasError = false;
    },
    submitWorkHistory: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Code: this.workHistory.code,
        UserCode: this.user.userInfo.code,
        Employer: this.employer,
        EmployerAddresss: this.employerAddresss,
        EmployerEmail: this.employerEmail,
        EmployerPhoneNumber: this.employerPhoneNumber,
        EmployerWebsite: this.employerWebsite,
        JobTitle: this.jobTitle,
        JobDescription: this.jobDescription,
        VerifiedOn: "2021-03-09T06:44:08.839Z",
        VerifiedBy: "string",
        From: this.from,
        To: this.to
      };

      const url = `${this.hrmURL}/v1.0/UserWorkHistory/updateUserWorkHistory`;

      axios
        .post(url, data)
        .then(response => {
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Update Work";
          this.editing = false;
          this.collapseCard = false;
          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Work History Updated!!"
            };

            let userCode = sessionStorage.getItem("activeformations");
            this.$store.dispatch("fetchUserData", userCode);
          } else {
            payload = {
              type: "error",
              message: "Work History Not Updated!!"
            };
          }

          this.$store.dispatch("showAlert", payload);
          let userCode = sessionStorage.getItem("activeformations");
          this.$store.dispatch("fetchUserData", userCode);

          // console.log(response);
        })
        .catch(err => {
          let payload = {
            type: "error",
            message: "Work History Not Updated!!",
            status: err
          };

          if (err) {
            err;
          }

          this.$store.dispatch("showAlert", payload);
          let userCode = sessionStorage.getItem("activeformations");
          this.$store.dispatch("fetchUserData", userCode);
        });
    },

    deleteWorkHistoryFromDB: function(work) {
      const url = `${this.hrmURL}/v1.0/UserWorkHistory/deleteWorkHistory`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Code: work.code
      };

      axios
        .post(url, data)
        .then(response => {
          if (response) {
            response;
          }

          this.removeWorkHistoryFromUI(work);
        })
        .catch(err => {
          if (err) {
            err;
          }

          console.log(err);
        });
    },

    removeWorkHistoryFromUI: function(work) {
      let workHistories = this.$store.state.user.userInfo.userWorkHistories;

      var index = workHistories.indexOf(work);

      if (index !== -1) {
        workHistories.splice(index, 1);
      }
      this.$store.dispatch("closePageProcessing");

      let payload = {
        type: "success",
        message: "Work History Deleted!!"
      };

      this.$store.dispatch("showAlert", payload);
    },

    clearForm: function() {
      this.emptyFields = true;
      this.formMessage = "";
      this.formError = false;
      this.hasError = true;
    }
  },
  mounted() {
    this.editing = false;
    this.collapseCard = false;
  }
};
</script>
<style>
.work_history.card-collapsed {
  margin-bottom: 0px !important;
}
</style>