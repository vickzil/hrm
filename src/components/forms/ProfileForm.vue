<template>
  <form
    style="width: 100%"
    v-on:submit.prevent="submitForm"
    enctype="multipart/form-data"
  >
    <div class="card">
      <div class="card-header bline">
        <h3 class="card-title"><b>Edit Profile</b></h3>
      </div>
      <div class="card-body profile_page_form">
        <div class="row clearfix">
          <div class="col-md-4">
            <div class="card profile-header">
              <div class="body text-center">
                <div class="mb-4">
                  <p class="font-16 font-weight-bold">Change Profile Picture</p>
                </div>
                <input
                  type="file"
                  ref="profile_input"
                  style="display: none;"
                  @change="changeProfileImage($event)"
                >
                <img
                  v-if="user.userInfo.photo"
                  :src="user.userInfo.photo"
                  class="rounded-circle edit_profile_image profile_image"
                  alt=""
                  style="cursor: pointer; width: 140px; height: 140px; border: 2px dotted #82beff; padding:8px;"
                  @click="$refs.profile_input.click()"
                >
                <img
                  v-else
                  src="@/assets/images/user.png"
                  class="rounded-circle edit_profile_image profile_image"
                  alt=""
                  style="cursor: pointer; width: 140px; height: 140px; border: 2px dotted #82beff; padding:8px;"
                  @click="$refs.profile_input.click()"
                >
              </div>
            </div>
          </div>
          <div class="col-md-7">
            <div
              class="form-group"
              v-if="user"
            >
              <label class="form-label">First Name</label>
              <input
                type="text"
                v-model.trim="firstName"
                value="firstName"
                class="form-control form-control-lg"
              >
            </div>
            <div
              class="form-group"
              v-if="user"
            >
              <label class="form-label">Last Name</label>
              <input
                type="text"
                class="form-control form-control-lg"
                v-model.trim="lastName"
              >
            </div>
            <div
              class="form-group"
              v-if="user"
            >
              <label class="form-label">Middle Name</label>
              <input
                type="text"
                class="form-control form-control-lg"
                v-model.trim="middleName"
              >
            </div>
          </div>
        </div>
        <br>
        <div class="row clearfix">
          <div class="col-sm-12 col-md-6">
            <div
              class="form-group"
              v-if="registrationInfo"
            >
              <label class="form-label">Gender</label>
              <select class="form-control custom-select">
                <option
                  :value="gen.code"
                  v-for="gen in registrationInfo.gender"
                  :key="gen.code"
                  :selected="gen.name.toLowerCase() == user.userInfo.gender.toLowerCase()"
                >{{gen.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div
              class="form-group"
              v-if="user"
            >
              <label class="form-label">Date of Birth</label>
              <input
                type="date"
                class="form-control"
                v-model.trim="dateOfBirth"
              >
            </div>
          </div>
        </div>
        <br>
        <div class="row clearfix">
          <div class="col-md-6 col-sm-12">
            <div
              class="form-group"
              v-if="user"
            >
              <label class="form-label">Address</label>
              <textarea
                rows="2"
                style="min-height: 50px;"
                class="form-control form-control-lg"
                v-model="homeAddress"
              ></textarea>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div
              class="form-group"
              v-if="registrationInfo"
            >
              <label class="form-label">Country</label>
              <input
                type="text"
                :value="country"
                class="form-control form-control-lg"
                readonly
              />
            </div>
          </div>
        </div>
        <br>
        <div class="row clearfix">
          <div class="col-sm-12 col-md-6">
            <div
              class="form-group"
              v-if="registrationInfo"
            >
              <label class="form-label">Subsidiary</label>
              <select
                class="form-control custom-select"
                v-model="subsidiaryCode"
              >
                <option
                  :value="subsidiary.code"
                  v-for="(subsidiary, index) in registrationInfo.groupSubsidiaries"
                  :key="index"
                  :selected="('S'+ subsidiary.code).toUpperCase() === subsidiaryCode.toUpperCase()"
                >{{subsidiary.name}}</option>
              </select>
            </div>
          </div>
          <div class="col-sm-12 col-md-6">
            <div
              class="form-group"
              v-if="user"
            >
              <label class="form-label">Phone</label>
              <input
                type="tel"
                class="form-control"
                v-model.trim="phoneNumber"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-right">
        <button
          type="submit"
          class="btn btn-danger"
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
</template>
<script>
import "@/mixins";
import axios from "axios";

export default {
  computed: {
    user() {
      return this.$store.getters.user || null;
    },
    userAmount() {
      return this.$store.getters.userAmount;
    },

    checkGender() {
      return "male";
    },
    countries() {
      return this.$store.getters.countries;
    },

    registrationInfo() {
      return this.$store.getters.registrationInfo;
    },

    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    },
    firstName: {
      get() {
        return this.user.userInfo.firstName;
      },
      set(value) {
        return (this.user.userInfo.firstName = value);
      }
    },
    lastName: {
      get() {
        return this.user.userInfo.lastName;
      },
      set(value) {
        return (this.user.userInfo.lastName = value);
      }
    },
    middleName: {
      get() {
        return this.user.userInfo.middleName;
      },
      set(value) {
        return (this.user.userInfo.middleName = value);
      }
    },
    dateOfBirth: {
      get() {
        return this.removeTimeZone(this.user.userInfo.dateOfBirth);
      },
      set(value) {
        return (this.user.userInfo.dateOfBirth = value);
      }
    },
    phoneNumber: {
      get() {
        return this.user.userInfo.phoneNumber;
      },
      set(value) {
        return (this.user.userInfo.phoneNumber = value);
      }
    },
    homeAddress: {
      get() {
        return this.user.userInfo.homeAddress;
      },
      set(value) {
        return (this.user.userInfo.homeAddress = value);
      }
    },
    country: {
      get() {
        return this.user.userInfo.countryName;
      },
      set(value) {
        return (this.user.userInfo.countryName = value);
      }
    },
    countryCode: {
      get() {
        return this.user.userInfo.country;
      },
      set(value) {
        return (this.user.userInfo.country = value);
      }
    },
    subsidiaryCode: {
      get() {
        return this.user.userInfo.subsidiaryCode;
      },
      set(value) {
        return (this.user.userInfo.subsidiaryCode = value);
      }
    }
  },
  data() {
    return {
      photo: null,
      subsidiaries: null,
      formError: false,
      processing: false,
      emptyFields: true,
      formMessage: "",
      formText: "Update Profile"
    };
  },

  methods: {
    changeProfileImage: function(event) {
      if (event.target.files[0]) {
        this.photo = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
          let images = document.querySelectorAll(".profile_image");

          images.forEach(image => {
            image.setAttribute("src", event.target.result);
          });
        };

        reader.readAsDataURL(event.target.files[0]);
      }
    },

    submitForm: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/User/updateUserInfo`;
      var fd = new FormData();

      fd.append("AppId", this.AppId);
      fd.append("RequestId", this.RequestId);
      fd.append("Email", this.user.userInfo.email);
      fd.append("UserCode", this.user.userInfo.code);
      fd.append("HomeAddress", this.homeAddress);
      fd.append("PhoneNumber", this.phoneNumber);
      fd.append("SubsidiaryCode", this.subsidiaryCode);
      fd.append("Country", this.countryCode);
      fd.append("DateOfBirth", this.dateOfBirth);
      fd.append("FirstName", this.firstName);
      fd.append("LastName", this.lastName);
      fd.append("MiddleName", this.middleName);
      fd.append("PhotoFile", this.photo);

      axios
        .post(url, fd)
        .then(response => {
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Update Profile";
          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Profile updated successfully!!"
            };

            let userCode = sessionStorage.getItem("activeformations");
            this.$store.dispatch("fetchUserData", userCode);
          } else {
            payload = {
              type: "error",
              message: "profile not updated!!"
            };
          }

          this.$store.dispatch("showAlert", payload);
        })
        .catch(err => {
          let payload = {
            type: "error",
            message: "profile could not update",
            status: err
          };

          this.emptyFields = true;
          this.processing = false;
          this.formText = "Update Profile";

          this.$store.dispatch("showAlert", payload);
        });
    }
  }
};
</script>
<style>
</style>