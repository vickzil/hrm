<template>
    <form class="form" v-on:submit.prevent="submitForm">
        <transition name="fade">
            <p class="errors alert mb-4" :class="hasError ? 'alert-danger' : 'alert-success'" v-if="formError">
                {{ formMessage }}
            </p>
        </transition>
        <br><b></b>
        <div class="row">
            <div class="form-group col-md-12">
                <label style="text-align: left !important"><b>Staff Code</b></label>
                <input type="text" class="form-control" v-model.trim="staffCode" placeholder="Your Staff Code" @input="processFormCode" style="margin-bottom: 15px" :disabled="codeverified" />
            </div>
        </div>
        <div v-if="codeverified">
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group disabled">
                        <label style="text-align: left !important"><b>First Name</b></label>
                        <input type="text" class="form-control" v-model="firstname" disabled />
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group disabled">
                        <label style="text-align: left !important"><b>Last Name</b></label>
                        <input type="text" class="form-control" v-model="lastname" disabled />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label style="text-align: left !important"><b>Phone Number</b></label>
                        <input type="text" class="form-control" v-model="phone" disabled />
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label style="text-align: left !important"><b>E-mail Address</b></label>
                        <input type="email" class="form-control" v-model="email" disabled />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label style="text-align: left !important">Gender</label>
                        <input type="text" class="form-control" v-model="gender" disabled />
                    </div>
                </div>
                <div class="col-md-6 col-sm-12">
                    <div class="form-group">
                        <label style="text-align: left !important">Country</label>
                        <input type="text" class="form-control" v-model="country" disabled />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 text-center mb-3 mt-3">
                    <label style="color: #a30303"><b>Please Input Your Password</b></label>
                </div>
            </div>
            <div class="row mb-4">
                <div class="form-group col-md-6 col-sm-12">
                    <label class="h5" for="password-field" style="text-align: left !important">Password</label>
                    <input id="password-field" :type="showpassword ? 'text' : 'password'" class="form_input" @input="checkpassword" v-model.trim="password" placeholder="Password" />
                    <span toggle="#password-field" @click="toggleShowPassword" :class="showpassword && 'fa-eye-slash'" class="fa fa-fw fa-eye field-icon"></span>
                </div>
                <div class="form-group col-md-6 col-sm-12">
                    <label for="password-field" style="text-align: left !important">Confirm Password</label>
                    <input id="cpassword-field" :type="showConfirmPassword ? 'text' : 'password'" class="form_input" @input="checkCpassword" placeholder="Confirm Password" v-model.trim="cpassword" />
                    <span toggle="#cpassword-field" :class="showConfirmPassword && 'fa-eye-slash'" class="fa fa-fw fa-eye field-icon" @click="toggleShowCPassword"></span>
                </div>
                <div class="col-md-12 text-center">
                    <transition name="fade">
                        <p v-if="passwordError" style="
                color: red !important;
                font-size: 13px !important;
                margin-top: 15px;
              ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" svg-inline="" role="presentation" focusable="false" tabindex="-1" style="color: red !important" fill="red">
                                <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                            </svg>
                            {{ passwordMessage }}
                        </p>
                    </transition>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 text-md-right">
                <button type="submit" style="display: inline-block!important;" class="btn btn-danger" v-bind:disabled="emptyFields">
                    {{ formText }}
                    <span class="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true" v-if="processing"></span>
                </button>
            </div>
        </div>
    </form>
</template>
<script>
import axios from "axios";
import "@/mixins";
export default {
    name: "StaffRegisterForm",
    data() {
        return {
            codeverified: false,
            staffCode: "",
            email: "",
            firstname: "",
            lastname: "",
            middlename: "",
            phone: "",
            dob: "",
            country: "",
            countryCode: "",
            gender: "",
            bvn: "",
            groupCode: "",
            subsidiaryCode: "",
            accountType: "",
            roles: "",
            password: "",
            cpassword: "",
            formText: "Confirm Code",
            passwordError: false,
            emptyFields: true,
            formError: false,
            processing: false,
            hasError: true,
            formMessage: "",
            passwordMessage: "",
            statusMessage: "",
            successForm: false,
            showpassword: false,
            showConfirmPassword: false,
        };
    },

    methods: {
        submitForm: function() {
            if (this.codeverified == false) {
                if (this.staffCode === this.user.userInfo.code) {
                    this.submitCode();
                    this.hasError = false;
                    this.formError = false;
                    this.formMessage = "";
                } else {
                    this.processing = true;
                    this.emptyFields = true;
                    setTimeout(() => {
                        this.hasError = true;
                        this.formError = true;
                        this.formMessage = "Incorrect user code";
                        this.processing = false;
                        this.emptyFields = false;
                    }, 2000)
                }

                return true;
            } else {
                this.submitStaffDetails();
            }
        },
        submitStaffDetails: function() {
            if (this.formError == false && this.emptyFields == false) {
                this.saveData();
                return true;
            } else {
                this.processForm();
            }
        },

        processFormCode: function() {
            if (!this.staffCode && this.staffCode < 4) {
                this.emptyFields = true;
                return false;
            }

            this.emptyFields = false;
            this.formError = false;
            return true;
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
                this.emptyFields = false;
                this.formError = false;
                return true;
            }
        },

        toggleShowPassword: function() {
            this.showpassword = !this.showpassword;
        },
        toggleShowCPassword: function() {
            this.showConfirmPassword = !this.showConfirmPassword;
        },

        saveData: function() {

        },
        submitCode: function() {
            // this.$store.dispatch("setActionLoading", true);
            this.processing = true;
            this.emptyFields = true;
            // this.$store.dispatch("setActionLoading", true);

            const url = `${this.hrmURL}/v1.0/User/getUserInfo`;

            var data = {
                AppId: this.AppId,
                RequestId: this.RequestId,
                UserCode: this.staffCode,
            };

            axios
                .post(url, data)
                .then((resp) => {
                    this.processing = false;
                    if (resp.data.success) {
                        this.formError = false;
                        this.emptyFields = true;

                        this.$store.dispatch("setActionLoading", false);

                        let userData = resp.data.data;

                        this.firstname = userData.firstName;
                        this.lastname = userData.lastName;
                        this.middlename = userData.middleName;
                        this.gender = userData.gender;
                        this.email = userData.email;
                        this.phone = userData.phoneNumber;
                        this.dob = userData.dateOfBirth;
                        this.country = userData.countryName;
                        this.countryCode = userData.country;
                        this.groupCode = userData.groupCode;
                        this.subsidiaryCode = userData.subsidiaryCode;
                        this.accountType = userData.accountType;
                        this.bvn = userData.bvn;
                        this.roles = userData.roles[0];

                        this.codeverified = true;
                        this.formText = "Confirm Details";


                        var data = {
                            AppId: this.AppId,
                            RequestId: this.RequestId,
                            PhoneNumber: this.phone,
                            Country: this.countryCode,
                            DateOfBirth: this.dob,
                            Password: this.password,
                            ConfirmPassword: this.cpassword,
                            Email: this.email,
                            AccountType: this.accountType,
                            RoleName: this.roles,
                            SubsidiaryCode: this.subsidiaryCode,
                            FirstName: this.firstname,
                            LastName: this.lastname,
                            MiddleName: this.middlename,
                            BVN: this.bvn,
                            UserCode: this.staffCode,
                        }

                        console.log(data)
                    }

                    // else {
                    //   this.formError = true;
                    //   this.emptyFields = false;

                    //   this.$store.dispatch("setActionLoading", false);
                    //   setTimeout(() => {
                    //     let payload = {
                    //       status: true,
                    //       type: "error",
                    //       message: resp.data.message,
                    //     };
                    //     this.$store.dispatch("setAlertModalStatus", payload);
                    //   }, 200);
                    // }

                    //   this.email = "";

                    //   this.$store.dispatch("setActionLoading", false);
                    console.log(resp);
                })
                .catch((err) => {
                    console.log(err);

                    this.hasError = true;
                    this.formError = true;
                    this.formMessage = "Server Error";
                    this.processing = false;
                    this.emptyFields = false;
                });
        },

        // email validation
        validEmail: function(email) {
            var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test(email);
        },
    },

    //   OIG-0574
};
</script>
<style></style>