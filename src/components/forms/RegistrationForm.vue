<template>
  <form
    class="form"
    v-on:submit.prevent="register"
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
    <br><b></b>
    <div class="row">
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">First Name</label>
        <input
          type="text"
          class="form_input"
          v-model.trim="firstname"
          @input="checkform"
          placeholder="First Name"
        >
      </div>
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">Last Name</label>
        <input
          type="text"
          class="form_input"
          v-model.trim="lastname"
          @input="checkform"
          placeholder="Last Name"
        >
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">Middle Name</label>
        <input
          type="text"
          class="form_input"
          v-model.trim="middlename"
          @input="checkform"
          placeholder="Middlename"
        >
      </div>
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">E-mail Address</label>
        <input
          type="email"
          class="form_input"
          v-model.trim="email"
          @input="checkform"
          placeholder="E-mail Address"
        >
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">Phone Number</label>
        <input
          type="text"
          class="form_input"
          v-model.trim="phone"
          @input="checkform"
          placeholder="Phone Number"
        >
      </div>
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">Date of Birth</label>
        <input
          type="date"
          class="form_input"
          v-model="dob"
          @input="checkform"
        >
      </div>
    </div>
    <div
      class="row"
      v-if="registrationInfo"
    >
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">BVN</label>
        <input
          type="text"
          class="form_input"
          placeholder="01234567899"
          @input="checkform"
          v-model.trim="bvn"
        >
      </div>
      <div class="col-md-6 col-sm-12">
        <label style="text-align: left!important;">Country</label>
        <div class="form-group multiselect_div">
          <select
            class="form_select"
            v-model.trim="country"
            @change="checkform"
          >
            <option value="">Select Country</option>
            <option
              :value="country.code"
              v-for="country in registrationInfo.countries"
              :key="country.code"
            >{{country.name}}</option>
          </select>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-if="registrationInfo"
    >
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">Postal Code</label>
        <input
          type="text"
          class="form_input"
          @input="checkform"
          v-model.trim="postalCode"
          placeholder="08112"
        >
      </div>
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">Gender</label>
        <select
          class="form_select"
          v-model.trim="gender"
          @change="checkform"
        >
          <option value="">Select Gender</option>
          <option
            :value="gen.code"
            v-for="gen in registrationInfo.gender"
            :key="gen.code"
          >{{gen.name}}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="form-group col-md-6 col-sm-12">
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 text-center">
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
            {{passwordMessage}}
          </p>
        </transition>
      </div>
      <div class="form-group col-md-6 col-sm-12">
        <label
          for="password-field"
          style="text-align: left!important;;"
        >Password</label>
        <input
          id="password-field"
          :type="showpassword ? 'text': 'password' "
          class="form_input"
          @input="checkpassword"
          v-model.trim="password"
          placeholder="Password"
        >
        <span
          toggle="#password-field"
          @click="toggleShowPassword"
          :class="showpassword && 'fa-eye-slash'"
          class="fa fa-fw fa-eye field-icon"
        ></span>
      </div>
      <div class="form-group col-md-6 col-sm-12">
        <label
          for="password-field"
          style="text-align: left!important;;"
        >Confirm Password</label>
        <input
          id="cpassword-field"
          :type="showConfirmPassword ? 'text': 'password' "
          class="form_input"
          @input="checkCpassword"
          placeholder="Confirm Password"
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
    <div
      class="row"
      v-if="registrationInfo"
    >
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">Groups</label>
        <select
          class="form_select"
          @change="getSubsidiaries"
          v-model.trim="group"
        >
          <option value="">Select Group</option>
          <option
            :value="group.code"
            v-for="(group, index) in registrationInfo.groupCompanies"
            :key="group.code"
            :selected="index == 0"
          >{{group.name}}</option>
        </select>
      </div>
      <div class="form-group col-md-6 col-sm-12">
        <label style="text-align: left!important;">Subsidiary</label>
        <select
          class="form_select"
          v-model.trim="subsidiary"
          @change="checkform"
        >
          <option value="">Select Subsidiary</option>
          <option
            :value="subsidiary.code"
            v-for="(subsidiary, index) in subsidiaries"
            :key="subsidiary.code"
            :selected="index === 0"
          >{{subsidiary.name}}</option>
        </select>
      </div>
    </div>
    <br><br>
    <div class="row">
      <button
        type="submit"
        :class="emptyFields ? 'btn btn-danger d-block btn-block w-75 mx-auto' : 'sign_button'"
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
</template>
<script>
import axios from "axios";
import "@/mixins";
// import $ from 'jquery';
export default {
  name: "RegistrationForm",
  computed: {
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
    }
  },
  data() {
    return {
      subsidiaries: [],
      firstname: "",
      lastname: "",
      middlename: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
      gender: "",
      postalCode: "",
      group: "",
      subsidiary: "",
      country: "",
      dob: "",
      bvn: "",
      terms: null,
      accountType: "staff",
      roleName: "staff",
      formError: false,
      processing: false,
      emailError: false,
      passwordError: false,
      emptyFields: true,
      formMessage: "",
      passwordMessage: "",
      statusMessage: "",
      formText: "Sign Up",
      showpassword: false,
      showConfirmPassword: false,
      hasError: true,
      response: null
    };
  },

  methods: {
    getSubsidiaries: function(event) {
      let value = event.target.value;

      if (value !== "") {
        this.subsidiaries = this.registrationInfo.groupSubsidiaries.filter(
          Subsidiary => {
            return Subsidiary.groupCode === value;
          }
        );
      }
    },
    register: function() {
      if (this.formError == false && this.emptyFields == false) {
        this.submitForm();
        return true;
      } else {
        this.checkform();
      }
    },

    checkform: function() {
      if (
        !this.country ||
        !this.dob ||
        !this.group ||
        !this.subsidiary ||
        !this.firstname ||
        !this.lastname ||
        !this.email ||
        !this.validEmail(this.email) ||
        !this.phone ||
        !this.password ||
        !this.cpassword
      ) {
        this.emptyFields = true;
        return false;
      }

      if (this.cpassword && this.password !== this.cpassword) {
        this.passwordError = true;
        this.passwordMessage = "Password Do not match";
        this.emptyFields = true;
        return false;
      }

      this.emptyFields = false;
      this.passwordError = false;
      this.formError = false;
      return true;
    },

    checkpassword: function() {
      if (this.password && this.password.length < 8) {
        this.passwordError = true;
        this.passwordMessage = "Passwords must be at least 8 characters.";
        return false;
      } else {
        this.passwordError = false;
        this.passwordMessage = "";
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

    toggleShowPassword: function() {
      this.showpassword = !this.showpassword;
    },
    toggleShowCPassword: function() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    validEmail: function(email) {
      var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailReg.test(email);
    },

    submitForm: function() {
      this.emptyFields = true;
      this.processing = true;
      this.formText = "Please wait...";

      const url = `${this.hrmURL}/v1.0/OAuth/register`;

      var data = {
        AppId: this.AppId,
        RequestId: "8393762892",
        PhoneNumber: this.phone,
        Country: this.country,
        DateOfBirth: this.dob.toLowerCase(),
        Password: this.password,
        ConfirmPassword: this.cpassword,
        Email: this.email.toLowerCase(),
        AccountType: "staff",
        PostCode: this.postalCode,
        RoleName: "staff",
        SubsidiaryCode: this.subsidiary,
        FirstName: this.firstname.toLowerCase(),
        LastName: this.lastname.toLowerCase(),
        MiddleName: this.middlename.toLowerCase(),
        BVN: this.bvn
      };

      axios
        .post(url, data)
        .then(response => {
          if (response.data.success) {
            this.sendConfirmEmail(this.email.toLowerCase());

            this.formError = true;
            this.hasError = false;
            this.formMessage = "Registration Successfully!";

            this.$store.dispatch("setRegistrationText", true);

            setTimeout(() => {
              this.$router.push({ path: "/thank-you" });
            }, 1500);
          } else {
            let message = response.data.message;
            this.formError = true;
            this.hasError = true;
            this.emptyFields = true;
            this.formMessage = message;
          }

          // console.log(response);

          this.processing = false;
          this.formText = "Register";
        })
        .catch(err => {
          console.log(err);
          this.processing = false;
          this.formText = "Register";
        });
    },

    sendConfirmEmail: function(email) {
      const url = `${this.hrmURL}/v1.0/OAuth/generateEmailToken`;

      let data = {
        AppId: this.AppId,
        RequestId: this.RequestId,
        Email: email
      };

      axios
        .post(url, data)
        .then(response => {
          this.response = response;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style>
</style>