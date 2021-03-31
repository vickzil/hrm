<template>
  <transition name="fade">
    <div
      class="overlay_div"
      tabindex="-1"
      v-if="addWorkHistoryModal"
    >
      <div
        class="overlay-close"
        @click="closeWorkHistoryModal"
      ></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLongTitle"
            >Add Work History</h5>
            <button
              type="button"
              class="close"
              @click="closeWorkHistoryModal"
              aria-label="Close"
            >
            </button>
          </div>
          <div class="modal-body animated px-4">
            <div class="card">
              <div class="card-body">
                <form
                  style="width: 100%;"
                  v-on:submit.prevent="submitWorkHistory"
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
                      <label class="">Job Title</label>
                      <input
                        type="text"
                        @input="processWorkHistory"
                        class="form-control form-control-lg"
                        v-model="job.jobTitle"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Employer</label>
                      <input
                        type="text"
                        @input="processWorkHistory"
                        class="form-control form-control-lg"
                        v-model="job.employer"
                      >
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <label class="">Employer Addresss</label>
                      <input
                        type="text"
                        @input="processWorkHistory"
                        class="form-control form-control-lg"
                        v-model="job.employerAddress"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Employer E-mail</label>
                      <input
                        type="email"
                        @input="processWorkHistory"
                        class="form-control form-control-lg"
                        v-model.trim="job.employerEmail"
                      >
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <label class="">Employer Phone</label>
                      <input
                        type="tel"
                        @input="processWorkHistory"
                        class="form-control form-control-lg"
                        v-model.trim="job.employerPhone"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Employer Website</label>
                      <input
                        type="text"
                        @input="processWorkHistory"
                        class="form-control form-control-lg"
                        v-model.trim="job.employerWebsite"
                      >
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-sm-12">
                      <label class="">Job Description</label>
                      <textarea
                        rows="9"
                        @input="processWorkHistory"
                        v-model="job.jobDes"
                        class="form-control form-control-lg"
                        placeholder="Here can be your description"
                      >Oh so, your weak rhyme You doubt I'll bother, reading into it I'll probably won't, left to my own devices But that's the difference in our opinions.</textarea>
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-4 col-sm-12">
                      <label class=""><b>Start Date</b></label>
                      <input
                        type="date"
                        class="form-control"
                        @change="processWorkHistory"
                        v-model="job.jobStartDate"
                      >
                    </div>
                    <div class="col-md-4 col-sm-12">
                      <label class=""><b>End Date</b></label>
                      <input
                        type="date"
                        class="form-control"
                        v-model="job.jobEndDate"
                        @change="processWorkHistory"
                      >
                    </div>
                  </div>
                  <br><br>
                  <div class="row">
                    <div class="col-md-12 text-right">
                      <button
                        type="submit"
                        class="btn btn-danger"
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
      workStatus: "",
      serverActive: false,
      job: {
        jobTitle: "",
        employer: "",
        employerEmail: "",
        employerAddress: "",
        employerPhone: "",
        employerWebsite: "",
        jobDes: "",
        jobStartDate: null,
        jobEndDate: null
      },
      formError: false,
      processing: false,
      emptyFields: true,
      formMessage: "",
      statusMessage: "",
      formText: "Add Work",
      hasError: true
    };
  },

  computed: {
    addWorkHistoryModal() {
      return this.$store.getters.addWorkHistoryModal;
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
    closeWorkHistoryModal: function() {
      this.$store.dispatch("closeWorkHistoryModal");
      this.clearForm();
    },
    updateWorkStatus: function() {
      if (this.workStatus == "active") {
        this.workStatus = "";
      } else {
        this.workStatus = "active";
      }
    },
    addWorkHistory: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitWorkHistory();
        return true;
      } else {
        this.processWorkHistory();
      }
    },
    processWorkHistory: function() {
      if (
        !this.job.jobTitle ||
        !this.job.employer ||
        !this.job.jobStartDate ||
        !this.job.jobDes ||
        !this.job.jobEndDate
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
    submitWorkHistory: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";
      this.serverActive = true;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        UserCode: this.user.userInfo.code,
        Employer: this.job.employer,
        EmployerAddresss: this.job.employerAddress,
        EmployerEmail: this.job.employerEmail,
        EmployerPhoneNumber: this.job.employerPhone,
        EmployerWebsite: this.job.employerWebsite,
        JobTitle: this.job.jobTitle,
        JobDescription: this.job.jobDes,
        From: this.job.jobStartDate,
        To: this.job.jobEndDate
      };

      const url = `${this.hrmURL}/v1.0/UserWorkHistory/insertUserWorkHistory`;

      axios
        .post(url, data)
        .then(response => {
          this.serverActive = false;
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Add Work";
          this.closeWorkHistoryModal();

          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Work History Updated!!"
            };

            let responseData = response.data.data;

            this.$store.dispatch("appendWorkHistory", responseData);
          } else {
            payload = {
              type: "error",
              message: "Work History Not Updated!!"
            };
          }

          this.$store.dispatch("showAlert", payload);

          // console.log(response);
        })
        .catch(err => {
          let payload = {
            type: "error",
            message: "Work History Not Updated!!",
            status: err
          };
          console.log(err);
          if (err) {
            err;
          }
          this.$store.dispatch("showAlert", payload);
        });
    },

    clearForm: function() {
      // this.workStatus = false;
      this.job.jobTitle = "";
      this.job.employer = "";
      this.job.employerEmail = "";
      this.job.employerAddress = "";
      this.job.employerPhone = "";
      this.job.employerWebsite = "";
      this.job.jobDes = "";
      this.job.jobStartDate = null;
      this.job.jobEndDate = null;
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