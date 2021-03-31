<template>
  <div class="account_body">
    <div class="signin rpsswd">
      <div class="row zxc">
        <div class="col-md-6 signin-box dws rpsswd">
          <h4>Welcome To</h4>
          <h2>OXFORD HRM PORTAL</h2>
          <p>Recover your Password</p>
          <div class="ruler"></div>
          <p>Find us on</p>
          <AccountSocialIcons />
        </div>
        <div class="col-md-6 signin-box text-center">
          <Logo />
          <div
            style="width: 100%"
            v-if="!successForm"
          >
            <h4
              class="font-weight-bold"
              style="color: rgb(44, 37, 37); font-weight: 900;"
            >Recover Password</h4>
            <p style="color: rgb(51, 18, 18); width: 90%;">Enter your email address and we'll send you an email with instructions to reset your password.</p>
            <div
              class="well"
              style="margin-top: 4%; width: 100%;"
            >
              <form
                class="form"
                v-on:submit.prevent="recoverPassword"
              >
                <transition name="fade">
                  <p
                    class="errors alert mb-4"
                    :class="hasError ? 'alert-danger' : 'alert-success'"
                    v-if="formError"
                  >
                    {{ formMessage }}
                  </p>
                </transition>
                <div class="row">
                  <div class="form-group col-md-12">
                    <input
                      type="email"
                      class="form_input"
                      v-model.trim="email"
                      placeholder="E-mail Address"
                      @input="processForm"
                      style="margin-bottom: 15px;"
                    >
                  </div>
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
              </form>
            </div>
          </div>
          <div
            style="width: 100%"
            v-else
          >
            <h4
              class="font-weight-bold"
              v-if="formMessageHead"
              style="color: rgb(44, 37, 37); font-weight: 900;"
            >{{ formMessageHead }}</h4>
            <p
              class="text-gray"
              v-if="formMessageBody"
              style="width: 80%; margin: auto; margin-top: 20px; margin-bottom: 30px"
            >{{ formMessageBody }}</p>
          </div>
          <p class="signupp">
            Forget it,
            <router-link
              to="/login"
              class="font-weight-bold"
            >
              Send me Back
            </router-link> to the Login.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Logo from "../components/extras/Logo";
import AccountSocialIcons from "../components/extras/AccountSocialIcons";
import "@/mixins";

export default {
  name: "ForgotPassword",
  components: {
    Logo,
    AccountSocialIcons
  },
  data() {
    return {
      processing: false,
      email: "",
      formText: "Recover Password",
      emptyFields: true,
      formError: false,
      hasError: true,
      formMessage: "",
      successForm: false,
      formMessageHead: "",
      formMessageBody: ""
    };
  },

  methods: {
    recoverPassword: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.saveData();
        return true;
      } else {
        this.processForm();
      }
    },

    processForm: function() {
      if (!this.email || !this.validEmail(this.email)) {
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.formError = false;
      return true;
    },

    saveData: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/OAuth/forgotPassword`;

      var data = {
        Email: this.email,
        UserName: "string"
      };

      axios
        .post(url, data)
        .then(resp => {
          if (resp.data.success) {
            this.formError = false;
            this.hasError = false;
            this.emptyFields = true;
            this.successForm = true;
            this.formMessage = "";
            this.formMessageHead = resp.data.message;
            this.formMessageBody =
              "Please recover your password by clicking on the link we just sent to your email.";
          } else {
            this.formError = true;
            this.hasError = true;
            this.formMessage = resp.data.message;
            this.emptyFields = false;
            this.successForm = false;
            this.formMessageHead = "";
            this.formMessageBody = "";
          }

          this.processing = false;
          this.formText = "Recover Password";

          // console.log(resp);
        })
        .catch(err => {
          console.log(err);
          this.processing = false;
          this.formText = "Recover Password";
        });
    },

    // email validation
    validEmail: function(email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    }
  }
};
</script>
<style>
</style>