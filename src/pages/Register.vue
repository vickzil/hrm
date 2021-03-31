<template>
    <div class="account_body">
        <div class="signin forsignup">
            <div class="row zxc">
                <div class="col-md-6 signin-box dws sig">
                    <h4>Welcome To</h4>
                    <h2>OXFORD HRM PORTAL</h2>
                    <p>Create an account</p>
                    <div class="ruler"></div>
                    <p>Find us on</p>
                    <AccountSocialIcons />
                </div>
                <div class="col-md-6 signin-box signuup">
                    <br><br>
                    <Logo />
                    <h4 class="font-weight-bold" style="color: rgb(44, 37, 37); font-weight: 900;">Sign Up</h4>
                    <p style="color: rgb(51, 18, 18); text-align: center;">Create a secured Account</p>
                    <div class="well" style="margin-top: 2%;">
                        <RegistrationForm />
                        <p class="signupp text-center">
                            <br> Already have an account?
                            <router-link to="/login" class="font-weight-bold">
                                Login
                            </router-link>
                        </p>
                        <br><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import RegistrationForm from "../components/forms/RegistrationForm";
import AccountSocialIcons from "../components/extras/AccountSocialIcons";
import Logo from "../components/extras/Logo";
export default {
    components: {
        RegistrationForm,
        Logo,
        AccountSocialIcons
    },

    methods: {}
};
</script>