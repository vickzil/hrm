<template>
  <form
    class="form"
    v-on:submit.prevent="login"
  >
    <transition name="fade">
      <p
        class="errors alert mb-4 alert-danger"
        v-if="formStatus"
      >
        {{ formMessage }}
      </p>
    </transition>
    <div class="row">
      <div class="form-group col-md-10 mx-md-auto">
        <input
          type="email"
          v-model.trim="email"
          class="form_input"
          name="email"
          value=""
          placeholder="E-mail Address"
          @input="processForm"
        />
        <transition name="fade">
          <p
            class="errors my-2 text-danger"
            v-if="emailError"
          >
            {{ formMessage }}
          </p>
        </transition>
      </div>
      <div class="form-group col-md-10 mx-md-auto">
        <input
          id="password-field"
          :type="showpassword ? 'text': 'password' "
          class="form_input"
          @input="processForm"
          v-model.trim="password"
          placeholder="Password"
        >
        <span
          toggle="#password-field"
          @click="toggleShowPassword"
          :class="showpassword && 'fa-eye-slash'"
          class="fa fa-fw fa-eye field-icon"
        ></span>
        <transition name="fade">
          <p
            class="errors my-2 text-danger"
            v-if="passwordError"
          >
            {{ formMessage }}
          </p>
        </transition>
      </div>
      <div class="col-md-12 text-right">
        <p class="fgpass">
          <router-link
            to="/forgot-password"
            class="font-weight-bold mr-md-5"
          >
            Forgot Password?
          </router-link>
        </p>
      </div>
      <div class="col-md-10 mx-md-auto">
        <button
          type="submit"
          class=""
          :class="emptyFields ? 'btn btn-danger btn-lg d-block btn-block w-75 mx-auto' : 'sign_button'"
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
</template>
<script>
import axios from "axios";
import "@/mixins";

export default {
  data() {
    return {
      email: "",
      password: "",
      formStatus: false,
      processing: false,
      emailError: false,
      passwordError: false,
      formMessage: "",
      statusMessage: "",
      formText: "Login",
      emptyFields: true,
      formError: false,
      showpassword: false
    };
  },
  computed: {
    expiresAt: {
      get: function() {
        return sessionStorage.getItem("appexrat");
      },
      set: function(expiresIn) {
        return sessionStorage.setItem("appexrat", expiresIn);
      }
    },
    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    }
  },
  methods: {
    login: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.saveData();
        return true;
      } else {
        this.processForm();
      }
    },

    processForm: function() {
      if (!this.email || !this.validEmail(this.email) || !this.password) {
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.formError = false;
      return true;
    },
    saveData: function() {
      this.$store.dispatch("authRequest");
      let email = this.email;
      let password = this.password;
      this.formStatus = false;

      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";
      const url = `${this.hrmURL}/v1.0/OAuth/login`;

      var data = {
        Email: email,
        RequestId: "anything",
        Password: password,
        AppId: this.AppId
      };

      axios
        .post(url, data)
        .then(response => {
          if (response.data.success) {
            if (response.data.data.emailConfirmed) {
              const data = response.data.data;
              const token = response.data.data.token.token;
              const expireTo = response.data.data.token.expireTo;

              this.expiresAt = expireTo;

              sessionStorage.setItem("appUserThemeSettingsCode", token);
              sessionStorage.setItem("activeformations", data.code);
              axios.defaults.headers.common["Authorization"] = token;
              this.$store.dispatch("login", data);

              this.fetchUserData(data.code);
            } else {
              setTimeout(() => {
                this.$router.push({ path: "/confirm" });
              }, 1500);
            }
          } else {
            console.log(response);
            this.formStatus = true;
            this.formMessage = response.data.message;
            this.formText = "Login";
            this.emptyFields = true;
            this.processing = false;

            this.clearMsg();
          }
        })
        .catch(err => {
          console.log(err);
          this.formText = "Login";
          this.emailError = false;
          this.passwordError = false;
          this.emptyFields = true;
          this.processing = false;
          this.clearMsg();
        });
    },
    clearMsg: function() {
      this.email = "";
      this.password = "";
    },
    toggleShowPassword: function() {
      this.showpassword = !this.showpassword;
    },
    // email validation
    validEmail: function(email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    },
    redirect: function() {
      setTimeout(() => {
        this.statusMessage = "Redirecting...!!!";
      }, 2000);

      setTimeout(() => {
        this.$router.push({ path: "/" });
        (this.formStatus = false),
          (this.success = false),
          (this.statusMessage = ""),
          (this.processing = false);
      }, 3500);
    },
    fetchUserData: function(code) {
      var bankData = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Country: "NG"
      };

      this.$store.dispatch("fetchBankNames", bankData);

      let data = {
        AppId: this.AppId,
        RequestId: "001100102",
        UserCode: code
      };
      const url = `${this.hrmURL}/v1.0/Dashboard/getDashboardInfo`;

      axios
        .post(url, data)
        .then(response => {
          if (response.data.success) {
            const data = response.data.data;
            // console.log(data);
            this.$store.dispatch("saveUserData", data);

            let userRole = data.userInfo.roles;

            let adminRole;
            let isSuperAdmin;

            if (userRole) {
              adminRole = userRole.includes("admin");
              isSuperAdmin = userRole.includes("superadmin");
            }

            if (!!adminRole || !!isSuperAdmin) {
              sessionStorage.setItem("draggerability", "expandedCol");
              if (this.$store.getters.user) {
                this.$router.push({ path: "/admin-home" });
              }
            } else {
              this.$router.push({ path: "/dashboard" });
            }

            let payload = {
              type: "success",
              message: "Login Successfull"
            };

            setTimeout(() => {
              this.$store.dispatch("showAlert", payload);
            }, 600);

            this.formStatus = false;
            this.formText = "Login";

            this.emptyFields = true;
            this.processing = false;
          }
        })
        .catch(err => {
          this.formStatus = false;
          this.formText = "Login";

          this.emptyFields = true;
          this.processing = false;
          console.log(err);
        });
    }
  }
};
</script>
<style></style>