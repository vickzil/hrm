<template>
  <form
    class="form"
    v-on:submit.prevent="confirmEmail"
  >
    <div class="row">
      <div class="col-md-12">
        <div class="form-group col-md-9 mx-md-auto col-sm-12">
          <transition name="fade">
            <p
              class="errors alert mb-4"
              :class="hasError ? 'alert-danger' : 'alert-success'"
              v-if="formError"
            >
              {{ formMessage }}
            </p>
          </transition>
          <br><b></b>
          <label
            style="text-align: left!important;"
            v-if="!alreadySentEmail"
          >E-mail Address</label>
          <input
            type="email"
            class="form_input"
            v-model.trim="email"
            @input="checkform"
            placeholder="E-mail Address"
            v-if="!alreadySentEmail"
          >
        </div>
        <transition name="fade">
          <p
            v-if="emailError"
            style="color: red!important; font-size: 13px!important;margin-top: 15px; text-align: center;"
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
            {{emailMessage}}
          </p>
        </transition>
        <button
          type="submit"
          :class="emptyFields ? 'btn btn-danger d-block btn-block w-75 mx-auto' : 'sign_button w-75'"
          v-bind:disabled="emptyFields"
          v-if="!alreadySentEmail"
        >
          {{formText}}
          <span
            class="spinner-border spinner-border-sm ml-2"
            role="status"
            aria-hidden="true"
            v-if="processing"
          ></span>
        </button>
        <button
          type="button"
          class="btn btn-danger d-block btn-block w-75 mx-auto"
          v-if="alreadySentEmail"
          @click="setAlreadySentEmail"
        >
          Retry
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import axios from "axios";
import "@/mixins";
export default {
  name: "ConfirmEmailForm",
  computed: {
    AppId() {
      return this.$store.getters.AppId;
    },
    RequestId() {
      return this.$store.getters.RequestId;
    }
  },
  data() {
    return {
      email: "",
      formError: false,
      processing: false,
      emailError: false,
      emptyFields: true,
      formMessage: "",
      emailMessage: "",
      statusMessage: "",
      formText: "Re-send E-mail",
      hasError: true,
      response: null,
      alreadySentEmail: false
    };
  },

  methods: {
    setAlreadySentEmail: function() {
      this.alreadySentEmail = false;
      this.formError = false;
    },
    confirmEmail: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitForm();
        return true;
      } else {
        this.checkform();
      }
    },

    checkform: function() {
      if (!this.validEmail(this.email)) {
        this.emailError = true;
        this.emptyFields = true;
        this.emailMessage = "Invalide Email Address";
        return false;
      }

      if (!this.email || !this.validEmail(this.email)) {
        this.emailError = true;
        this.emptyFields = true;
        this.emailMessage = "This field cannot be empty";
        return false;
      }

      this.emailError = false;
      this.emptyFields = false;
      this.emailMessage = "";
      this.formError = false;
      return true;
    },

    validEmail: function(email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    },

    submitForm: function() {
      this.emptyFields = true;
      this.processing = true;
      this.alreadySentEmail = false;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/OAuth/generateEmailToken`;

      var data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: this.email
      };

      axios
        .post(url, data)
        .then(response => {
          if (response.data.success) {
            this.formError = true;
            this.hasError = false;
            this.formMessage = "Email Sent Successfully!";
          } else {
            let message = response.data.message;
            this.formError = true;
            this.hasError = true;
            this.emptyFields = true;
            this.formMessage = message;
          }
          this.alreadySentEmail = true;

          // console.log(response);

          this.processing = false;
          this.formText = "Re-send Email";
          this.email = "";
        })
        .catch(err => {
          console.log(err);
          this.processing = false;
          this.formText = "Re-send Email";
          this.email = "";
        });
    }
  }
};
</script>
<style>
</style>