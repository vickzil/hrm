<template>
    <div class="account_body">
        <div class="signin forsignup">
            <div class="row zxc">
                <div class="col-md-6 signin-box dws sig resendemail">
                    <h4>Welcome To</h4>
                    <h2>OXFORD HRM PORTAL</h2>
                    <p>Confirm Email</p>
                    <div class="ruler"></div>
                    <p>Find us on</p>
                    <AccountSocialIcons />
                </div>
                <div class="col-md-6 signin-box signuup">
                    <br><br><br>
                    <Logo />
                    <h4 class="font-weight-bold" style="color: rgb(44, 37, 37); font-weight: 900;">Confirm Your email</h4>
                    <p style="color: rgb(51, 18, 18); text-align: center;">Please Type your email to resend your email confirmation link.</p>
                    <div class="well" style="margin-top: 3%;">
                        <ConfirmEmailForm />
                        <p class="signupp text-center mt-4">
                            Forget it,
                            <router-link to="/login" class="font-weight-bold">
                                Send me Back
                            </router-link> to the Login.
                        </p>
                        <br><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ConfirmEmailForm from "../components/forms/ConfirmEmailForm";
import AccountSocialIcons from "../components/extras/AccountSocialIcons";
import Logo from "../components/extras/Logo";
export default {
    components: {
        ConfirmEmailForm,
        Logo,
        AccountSocialIcons
    },

    methods: {}
};
</script>