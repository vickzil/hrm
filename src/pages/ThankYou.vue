<template>
  <div class="account_body">
    <div class="signin rpsswd">
      <div class="row zxc">
        <div class="col-md-6 signin-box dws rpsswd">
          <h4>Welcome To</h4>
          <h2>OXFORD HRM PORTAL</h2>
          <p>Thank You</p>
          <div class="ruler"></div>
          <p>Find us on</p>
          <AccountSocialIcons />
        </div>
        <div class="col-md-6 signin-box text-center">
          <Logo />
          <transition name="fade">
            <p
              class="errors alert mb-4"
              :class="hasError ? 'alert-danger' : 'alert-success'"
              v-if="formSuccess"
            >
              {{ formMessage }}
            </p>
          </transition>
          <h4
            class="font-weight-bold mb-4"
            style="color: rgb(44, 37, 37); font-weight: 900;"
            v-if="registrationText"
          >Thank you for your Registration!!</h4>
          <h4
            class="font-weight-bold mb-4"
            style="color: rgb(44, 37, 37); font-weight: 900;"
            v-else
          >Verify your email</h4>
          <p style="color: rgb(51, 18, 18); width: 90%;">Your account have not been Verified. Please verify your account by clicking on the link we just sent to your email.</p>
          <div
            class="well"
            style="margin-top: 4%; width: 100%;"
          >
          </div>
          <p class="signupp">
            <router-link
              to="/confirm"
              class="font-weight-bold"
            >
              Resend email confirmation link
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import AccountSocialIcons from "../components/extras/AccountSocialIcons";
import Logo from "../components/extras/Logo";
import "@/mixins";

export default {
  name: "ConfirmEmail",
  components: {
    Logo,
    AccountSocialIcons
  },

  data() {
    return {
      formSuccess: false,
      processing: false,
      formMessage: "",
      statusMessage: "",
      formText: "Resend E-mail",
      hasError: true
    };
  },

  computed: {
    userId() {
      return sessionStorage.getItem("hasDiscoveredidLauncher");
    },
    emailToken() {
      return sessionStorage.getItem("hasDiscoveredemailLauncher");
    },
    registrationText() {
      return this.$store.getters.registrationText;
    }
  },
  methods: {
    sendConfirmEmail: function() {
      this.formSuccess = false;
      this.formMessage = "";
      this.processing = true;
      this.formText = "Please wait...";
      this.hasError = false;

      const url = `${this.hrmURL}/v1.0/OAuth/confirmEmail`;

      var data = {
        UserId: this.userId,
        Token: this.emailToken
      };

      axios
        .post(url, data)
        .then(res => {
          if (res.data.success) {
            setTimeout(() => {
              this.formSuccess = true;
              this.formMessage = "E-mail successfully sent";
              this.hasError = false;
            }, 1000);
          } else {
            setTimeout(() => {
              this.formSuccess = true;
              this.formMessage = "E-mail not sent";
              this.hasError = true;
            }, 1000);
          }
          this.processing = false;
          this.formText = "Resend E-mail";

          // console.log(res);
        })
        .catch(err => {
          console.log(err);

          setTimeout(() => {
            this.formSuccess = true;
            this.formMessage = "E-mail not sent";
            this.hasError = true;
          }, 1000);

          this.processing = false;
          this.formText = "Resend E-mail";
        });
    }
  }
};
</script>
