/* eslint-disable */
<template>
  <div
    class="page"
    v-if="user"
  >
    <PageHeader :topPageName='topPageName' />
    <SubPageHeader />
    <div class="section-body py-4 mt-2">
      <div class="container-fluid">
        <div class="row clearfix row-deck">
          <div class="col-lg-12 col-md-12">
            <div class="card">
              <div class="card-header bline">
                <h2 class="card-title">Change Password</h2>
              </div>
              <form
                class="form mx-auto col-md-7 col-sm-12 mt-5 mb-5 pb-3"
                v-on:submit.prevent="changePassword"
              >
                <div class="row">
                  <div class="form-group mb-3 col-md-12 col-sm-12">
                    <label
                      for="password-field"
                      style="text-align: left!important;;"
                    >Current Password</label>
                    <input
                      id="password-field"
                      :type="showCurrentpassword ? 'text': 'password' "
                      class="form_input"
                      @input="checkInputform"
                      placeholder="Current Password"
                      v-model.trim="currentPassword"
                    >
                    <span
                      toggle="#password-field"
                      @click="toggleShowCurrentPassword"
                      :class="showCurrentpassword && 'fa-eye-slash'"
                      class="fa fa-fw fa-eye field-icon"
                    ></span>
                  </div>
                  <div class="col-md-12 text-center">
                    <p
                      class="badge badge-danger my-2"
                      style="font-size: 14px;"
                      v-if="passwordError"
                    >
                      {{ passwordMessage }}
                    </p>
                  </div>
                  <div class="form-group mb-4 col-md-12 col-sm-12">
                    <label
                      for="password-field"
                      style="text-align: left!important;;"
                    >New Password</label>
                    <input
                      :type="showpassword ? 'text': 'password' "
                      class="form_input"
                      @input="checkpassword"
                      v-model.trim="password"
                      placeholder="New Password"
                    >
                    <span
                      toggle="#password-field"
                      @click="toggleShowPassword"
                      :class="showpassword && 'fa-eye-slash'"
                      class="fa fa-fw fa-eye field-icon"
                    ></span>
                  </div>
                  <div class="form-group col-md-12 col-sm-12">
                    <label
                      for="password-field"
                      style="text-align: left!important;;"
                    >Confirm New Password</label>
                    <input
                      :type="showConfirmPassword ? 'text': 'password' "
                      class="form_input"
                      @input="checkCpassword"
                      placeholder="Confirm New Password"
                      v-model.trim="cpassword"
                    >
                    <span
                      toggle="#cpassword-field"
                      :class="showConfirmPassword && 'fa-eye-slash'"
                      class="fa fa-fw fa-eye field-icon "
                      @click="toggleShowCPassword"
                    ></span>
                  </div>
                </div>
                <div class="mt-4 text-right">
                  <button
                    type="submit"
                    class="btn btn-danger"
                    @click="changePassword"
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-body">
      <Footer />
    </div>
  </div>
</template>
<script>
import PageHeader from "../components/header/PageHeader";
import SubPageHeader from "../components/header/SubPageHeader";
import Footer from "../components/footer/Footer";

import "@/mixins";
import axios from "axios";

export default {
  name: "ChangePassword",
  components: {
    PageHeader,
    SubPageHeader,
    Footer
  },

  data() {
    return {
      topPageName: "Change Password",
      currentPassword: "",
      password: "",
      cpassword: "",
      formError: false,
      processing: false,
      emailError: false,
      passwordError: false,
      emptyFields: true,
      formMessage: "",
      passwordMessage: "",
      statusMessage: "",
      formText: "Change password",
      showCurrentpassword: false,
      showpassword: false,
      showConfirmPassword: false,
      hasError: true
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    },

    AppId() {
      return this.$store.getters.AppId;
    }
  },

  methods: {
    checkCurrentpassword: function() {
      if (!this.currentPassword) {
        this.emptyFields = true;
      } else {
        this.emptyFields = false;
      }
    },
    checkpassword: function() {
      if (this.password && this.password.length < 8) {
        this.passwordError = true;
        this.passwordMessage = "Passwords must be at least 8 characters.";
        this.emptyFields = true;
        return false;
      } else {
        this.passwordError = false;
        this.passwordMessage = "";
        this.emptyFields = false;
        return true;
      }
    },
    checkCpassword: function() {
      if (this.cpassword && this.password !== this.cpassword) {
        this.passwordError = true;
        this.passwordMessage = "Password Do not match";
        this.emptyFields = true;
        return false;
      } else {
        this.passwordError = false;
        this.passwordMessage = "";
        return true;
      }
    },

    toggleShowCurrentPassword: function() {
      this.showCurrentpassword = !this.showCurrentpassword;
    },
    toggleShowPassword: function() {
      this.showpassword = !this.showpassword;
    },
    toggleShowCPassword: function() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },

    checkInputform: function() {
      if (!this.currentPassword || !this.password || !this.cpassword) {
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.passwordError = false;
      this.formError = false;
      return true;
    },

    changePassword: function() {
      if (this.emptyFields == false) {
        this.submitForm();
        return true;
      } else {
        this.checkInputform();
      }
    },

    submitForm: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/OAuth/changePassword`;

      var data = {
        AppId: this.AppId,
        RequestId: "annotherone",
        Email: this.user.userInfo.email,
        CurrentPassword: this.currentPassword,
        NewPassword: this.password,
        ConfirmNewPassword: this.cpassword
      };

      // console.log(data);

      axios
        .post(url, data)
        .then(response => {
          this.emptyFields = false;
          this.processing = false;
          this.formText = "Change password";
          let payload;

          if (response.data.success == true) {
            payload = {
              type: "success",
              message: "Password changed successfully!!"
            };

            this.currentPassword, this.password, (this.cpassword = "");
          } else {
            payload = {
              type: "error",
              message: "passord not changed!!"
            };
          }

          this.$store.dispatch("showAlert", payload);
        })
        .catch(err => {
          let payload = {
            type: "error",
            message: "passord not changed!!",
            status: err
          };

          this.emptyFields = true;
          this.processing = false;
          this.formText = "Change password";

          this.$store.dispatch("showAlert", payload);
        });
    },

    removeOffcanvas: function() {
      document.body.classList.remove("offcanvas-active");
    }
  },

  mounted() {
    this.$store.dispatch("currentSitePage", this.$router.history.current.path);
    this.$store.dispatch("closePageLoading");
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("showPageLoading");
    this.removeOffcanvas();
    next();
  }
};
</script>
<style scoped></style>