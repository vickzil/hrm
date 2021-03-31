<template>
  <div
    class="card work_history"
    style="margin-bottom: 50px;"
    :class="collapseCard && 'card-collapsed'"
  >
    <div class="card-header">
      <h3 class="card-title">{{schoolHistory.code}}</h3>
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
            @click="deleteSchoolHistory(schoolHistory)"
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
        v-on:submit.prevent="updateSchoolHistory"
      >
        <p
          class="errors alert mb-4"
          :class="hasError ? 'alert-danger' : 'alert-success'"
          v-if="formError"
        >
          {{ formMessage }}
        </p>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Name of Educational Institution/School/etc.</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{schoolHistory.school}}</span>
            <input
              v-else
              type="text"
              @input="processSchoolHistory"
              v-model="school"
              class="form-control form-control-lg"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Course of Study</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{schoolHistory.courseOfStudy}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processSchoolHistory"
              v-model="courseOfStudy"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>Degree</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{schoolHistory.degree}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processSchoolHistory"
              v-model="degree"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>School Address</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{schoolHistory.schoolAddresss}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processSchoolHistory"
              v-model="schoolAddresss"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>School Phone</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{schoolHistory.schoolPhoneNumber}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processSchoolHistory"
              v-model.trim="schoolPhoneNumber"
            >
          </div>
        </div>
        <br>
        <div class="row">
          <label class="col-sm-3 col-form-label"><b>School Website</b></label>
          <div class="col-sm-8">
            <span
              v-if="!editing"
              class="form-control-plaintext"
              style="font-size: 15px;"
            >{{schoolHistory.schoolWebsite}}</span>
            <input
              v-else
              type="text"
              class="form-control form-control-lg"
              @input="processSchoolHistory"
              v-model.trim="schoolWebsite"
            >
          </div>
        </div>
        <br>
        <div v-if="editing">
          <div class="row">
            <div class="col-md-4 col-sm-12">
              <label class="col-form-label"><b>Start Date</b></label>
              <input
                type="date"
                class="form-control"
                @change="processSchoolHistory"
                v-model="from"
              >
            </div>
            <div class="col-md-4 col-sm-12">
              <label class="col-form-label"><b>End Date</b></label>
              <input
                type="date"
                class="form-control"
                @change="processSchoolHistory"
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
        class="btn btn-danger"
        v-bind:disabled="emptyFields"
        @click="updateSchoolHistory"
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
  props: ["schoolHistory"],
  computed: {
    school: {
      get() {
        return this.schoolHistory.school;
      },
      set(value) {
        return (this.schoolHistory.school = value);
      }
    },
    schoolAddresss: {
      get() {
        return this.schoolHistory.schoolAddresss;
      },
      set(value) {
        return (this.schoolHistory.schoolAddresss = value);
      }
    },
    schoolPhoneNumber: {
      get() {
        return this.schoolHistory.schoolPhoneNumber;
      },
      set(value) {
        return (this.schoolHistory.schoolPhoneNumber = value);
      }
    },
    schoolWebsite: {
      get() {
        return this.schoolHistory.schoolWebsite;
      },
      set(value) {
        return (this.schoolHistory.schoolWebsite = value);
      }
    },
    courseOfStudy: {
      get() {
        return this.schoolHistory.courseOfStudy;
      },
      set(value) {
        return (this.schoolHistory.courseOfStudy = value);
      }
    },
    degree: {
      get() {
        return this.schoolHistory.degree;
      },
      set(value) {
        return (this.schoolHistory.degree = value);
      }
    },
    from: {
      get() {
        return this.removeTimeZone(this.schoolHistory.from);
      },
      set(value) {
        return (this.schoolHistory.from = this.removeTimeZone(value));
      }
    },
    to: {
      get() {
        return this.removeTimeZone(this.schoolHistory.to);
      },
      set(value) {
        return (this.schoolHistory.to = this.removeTimeZone(value));
      }
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
      formText: "Update Education",
      hasError: true
    };
  },
  methods: {
    deleteSchoolHistory: function(school) {
      this.$store.dispatch("showPageProcessing");
      this.deleteSchoolHistoryFromDB(school);
    },
    updateSchoolHistory: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitSchoolHistory();
      } else {
        this.processSchoolHistory();
      }
    },
    processSchoolHistory: function() {
      if (!this.school || !this.courseOfStudy || !this.degree) {
        this.hasError = true;
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.formMessage = "";
      this.formError = false;
      this.hasError = false;
    },
    submitSchoolHistory: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      var data = {
        Code: this.schoolHistory.code,
        School: this.school,
        SchoolAddresss: this.schoolAddresss,
        SchoolPhoneNumber: this.schoolPhoneNumber,
        SchoolWebsite: this.schoolWebsite,
        CourseOfStudy: this.courseOfStudy,
        Degree: this.degree,
        VerifiedOn: "2021-03-09T11:58:22.325Z",
        VerifiedBy: "string",
        From: this.from,
        To: this.to
      };

      const url = `${this.hrmURL}/v1.0/UserSchoolHistory/updateUserSchoolHistory`;

      axios
        .post(url, data)
        .then(response => {
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Update Education";
          this.editing = false;
          this.collapseCard = false;
          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Education History Updated!!"
            };

            let userCode = sessionStorage.getItem("activeformations");
            this.$store.dispatch("fetchUserData", userCode);
          } else {
            payload = {
              type: "error",
              message: "Education History Not Updated!!"
            };
          }

          this.$store.dispatch("showAlert", payload);

          // console.log(response);
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

    deleteSchoolHistoryFromDB: function(school) {
      const url = `${this.hrmURL}/v1.0/UserSchoolHistory/deleteSchoolHistory`;

      var data = {
        AppId: "001",
        RequestId: "98euiu38338",
        Code: school.code
      };

      axios
        .post(url, data)
        .then(response => {
          if (response) {
            response;
          }
          this.$store.dispatch("closePageProcessing");
          this.removeSchoolHistoryFromUI(school);
        })
        .catch(err => {
          if (err) {
            err;
          }
        });
    },
    removeSchoolHistoryFromUI: function(school) {
      let schoolHistories = this.$store.state.user.userInfo.userSchoolHistories;

      var index = schoolHistories.indexOf(school);

      if (index !== -1) {
        schoolHistories.splice(index, 1);
      }

      let payload = {
        type: "success",
        message: "Education History Deleted!!"
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