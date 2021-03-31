/* eslint-disable */
<template>
  <div
    class="page"
    v-if="user"
  >
    <PageHeader :topPageName="topPageName" />
    <div class="section-body">
      <div class="container-fluid">
        <div class="d-lg-flex justify-content-between">
          <ul class="nav nav-tabs page-header-tab">
            <li class="nav-item">
              <a
                class="nav-link active show"
                data-toggle="tab"
                href="#Notifications"
              >Notifications
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-toggle="tab"
                href="#Change_Password"
              >Change Password
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="section-body">
      <div class="container-fluid">
        <div class="row clearfix">
          <div class="col-md-12">
            <div class="card mt-2">
              <div class="tab-content">
                <div
                  class="tab-pane active show"
                  id="Notifications"
                >
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title">Notifications Settings</h3>
                    </div>
                    <div class="card-body">
                      <ul class="list-group">
                        <li class="list-group-item">
                          Anyone can send me a message
                          <div class="float-right">
                            <label class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                              />
                              <span class="custom-control-label">&nbsp;</span>
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item">
                          Recieve Notifications
                          <div class="float-right">
                            <label class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                checked=""
                              />
                              <span class="custom-control-label">&nbsp;</span>
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item">
                          Recieve sms alert after payment
                          <div class="float-right">
                            <label class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                checked=""
                              />
                              <span class="custom-control-label">&nbsp;</span>
                            </label>
                          </div>
                        </li>
                        <li class="list-group-item">
                          Recieve sms alert after successfully Debit
                          <div class="float-right">
                            <label class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                              />
                              <span class="custom-control-label">&nbsp;</span>
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane"
                  id="Change_Password"
                >
                  <div class="card">
                    <div class="card-body">
                      <div class="row clearfix">
                        <div class="col-lg-4 col-md-12">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              :value="user.userInfo.firstName + ' ' + user.userInfo.lastName"
                              disabled=""
                              placeholder="Username"
                            />
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-12">
                          <div class="form-group">
                            <input
                              type="email"
                              class="form-control"
                              :value="user.userInfo.email"
                              disabled=""
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-12">
                          <div class="form-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Phone Number"
                              :value="user.userInfo.phoneNumber"
                              disabled=""
                            />
                          </div>
                        </div>
                        <div class="col-lg-12 col-md-12">
                          <hr />
                          <h6>Change Password</h6>
                          <form
                            class="form col-md-10 col-sm-12 mt-5 mb-5 pb-3"
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
                                  :type="showCurrentpassword ? 'text' : 'password'"
                                  class="form_input"
                                  @input="checkInputform"
                                  placeholder="Current Password"
                                  v-model.trim="currentPassword"
                                />
                                <span
                                  toggle="#password-field"
                                  @click="toggleShowCurrentPassword"
                                  :class="showCurrentpassword && 'fa-eye-slash'"
                                  class="fa fa-fw fa-eye field-icon"
                                ></span>
                              </div>
                              <div class="col-md-12 text-center">
                                <!-- s -->
                                <transition name="fade">
                                  <p
                                    v-if="passwordError"
                                    style="color: red!important; font-size: 13px!important;margin-top: 15px;"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="10"
                                      height="10"
                                      viewBox="0 0 20 20"
                                      svg-inline=""
                                      role="presentation"
                                      focusable="false"
                                      tabindex="-1"
                                      style="color: red!important"
                                      fill="red"
                                    >
                                      <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                                    </svg>
                                    {{ passwordMessage }}
                                  </p>
                                </transition>
                              </div>
                              <div class="form-group mb-4 col-md-12 col-sm-12">
                                <label
                                  for="password-field"
                                  style="text-align: left!important;;"
                                >New Password</label>
                                <input
                                  :type="showpassword ? 'text' : 'password'"
                                  class="form_input"
                                  @input="checkpassword"
                                  v-model.trim="password"
                                  placeholder="New Password"
                                />
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
                                  :type="showConfirmPassword ? 'text' : 'password'"
                                  class="form_input"
                                  @input="checkCpassword"
                                  placeholder="Confirm New Password"
                                  v-model.trim="cpassword"
                                />
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
                                {{ formText }}
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
              </div>
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
import PageHeader from "@/components/header/PageHeader";
import Footer from "../components/footer/Footer";
import "@/mixins";
import axios from "axios";

export default {
  name: "Home",
  components: {
    PageHeader,
    Footer
  },

  data() {
    return {
      topPageName: "Settings",
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
            this.currentPassword = "";
            this.password = "";
            this.cpassword = "";
          } else {
            payload = {
              type: "error",
              message: "passord not changed!!"
            };
          }

          this.$store.dispatch("showAlert", payload);

          //   console.log(response);
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