<template>
  <transition name="fade">
    <div
      class="overlay_div"
      tabindex="-1"
      v-if="addschoolHistoryModal"
    >
      <div
        class="overlay-close"
        @click="closeSchoolHistoryModal"
      ></div>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5
              class="modal-title"
              id="exampleModalLongTitle"
            >Add Education History</h5>
            <button
              type="button"
              class="close"
              @click="closeSchoolHistoryModal"
              aria-label="Close"
            >
            </button>
          </div>
          <div class="modal-body animated px-4">
            <div class="card">
              <div class="card-body">
                <form
                  style="width: 100%;"
                  v-on:submit.prevent="addSchoolHistory"
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
                      <label class="">Name of Educational Institution/School/etc.</label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        @input="processSchoolHistory"
                        v-model="school"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Course of Study</label>
                      <input
                        type="text"
                        @input="processSchoolHistory"
                        v-model="courseOfStudy"
                        class="form-control form-control-lg"
                      >
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <label class="">School Addresss</label>
                      <input
                        type="text"
                        @input="processSchoolHistory"
                        v-model="schoolAddresss"
                        class="form-control form-control-lg"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">School Phone</label>
                      <input
                        type="tel"
                        @input="processSchoolHistory"
                        v-model.trim="schoolPhoneNumber"
                        class="form-control form-control-lg"
                      >
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <label class="">School Website</label>
                      <input
                        type="text"
                        v-model.trim="schoolWebsite"
                        class="form-control form-control-lg"
                      >
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <label class="">Qualification</label>
                      <input
                        type="text"
                        class="form-control form-control-lg"
                        @input="processSchoolHistory"
                        v-model="degree"
                      >
                    </div>
                  </div>
                  <br>
                  <div class="row">
                    <div class="col-md-4 col-sm-12">
                      <label class=""><b>Start Date</b></label>
                      <input
                        type="date"
                        class="form-control"
                        @change="processSchoolHistory"
                        v-model="schoolStartDate"
                      >
                    </div>
                    <div class="col-md-4 col-sm-12">
                      <label class=""><b>End Date</b></label>
                      <input
                        type="date"
                        class="form-control"
                        @change="processSchoolHistory"
                        v-model="schoolEndDate"
                      >
                    </div>
                  </div>
                  <br><br>
                  <div class="row">
                    <div class="col-md-12 text-right">
                      <button
                        class="btn btn-danger btn-lg"
                        v-bind:disabled="emptyFields"
                        @click="addSchoolHistory"
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
import axios from "axios";
import "@/mixins";
export default {
  data() {
    return {
      serverActive: false,
      schoolStatus: false,
      school: "",
      courseOfStudy: "",
      degree: "",
      schoolAddresss: "",
      schoolPhoneNumber: "",
      schoolWebsite: "",
      schoolStartDate: null,
      schoolEndDate: null,
      formError: false,
      processing: false,
      emptyFields: true,
      formMessage: "",
      statusMessage: "",
      formText: "Add Education",
      hasError: true
    };
  },

  computed: {
    addschoolHistoryModal() {
      return this.$store.getters.addschoolHistoryModal;
    },

    user() {
      return this.$store.getters.user;
    },
    AppId() {
      return this.$store.getters.AppId;
    }
  },

  methods: {
    closeSchoolHistoryModal: function() {
      if (!this.serverActive) {
        this.$store.dispatch("closeSchoolHistoryModal");
        this.clearForm();
      }
    },
    updateschoolStatus: function() {
      this.$refs.schoolStatus.checked = !this.$refs.schoolStatus.checked;
      this.schoolStatus = !this.schoolStatus;
    },
    addSchoolHistory: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitSchoolHistory();
        return true;
      } else {
        this.processSchoolHistory();
      }
    },
    processSchoolHistory: function() {
      if (
        !this.school ||
        !this.courseOfStudy ||
        !this.degree ||
        !this.schoolStartDate ||
        !this.schoolEndDate
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
    submitSchoolHistory: function() {
      this.emptyFields = true;
      this.processing = true;
      this.serverActive = true;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/UserSchoolHistory/insertUserSchoolHistory`;

      var data = {
        AppId: "001",
        RequestId: "string",
        UserCode: this.user.userInfo.code,
        School: this.school,
        SchoolAddresss: this.schoolAddresss,
        SchoolPhoneNumber: this.schoolPhoneNumber,
        SchoolWebsite: this.schoolWebsite,
        CourseOfStudy: this.courseOfStudy,
        Degree: this.degree,
        From: this.schoolStartDate,
        To: this.schoolEndDate
      };
      axios
        .post(url, data)
        .then(response => {
          this.serverActive = false;
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Add School";

          this.closeSchoolHistoryModal();

          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Education History Updated!!"
            };

            let responseData = response.data.data;
            this.$store.dispatch("appendSchoolHistory", responseData);
          } else {
            payload = {
              type: "error",
              message: "Education History Not Updated!!"
            };
          }

          this.$store.dispatch("showAlert", payload);
        })
        .catch(err => {
          let payload = {
            type: "error",
            message: "Education History Not Updated!!",
            status: err
          };

          this.$store.dispatch("showAlert", payload);
        });
    },

    clearForm: function() {
      this.school = "";
      this.courseOfStudy = "";
      this.degree = "";
      this.schoolAddresss = "";
      this.schoolPhoneNumber = "";
      this.schoolWebsite = "";
      this.schoolStartDate = null;
      this.schoolEndDate = null;
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