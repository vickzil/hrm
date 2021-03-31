<template>
    <div class="account_body">
        <div class="signin forsignup">
            <div class="row zxc">
                <div class="col-md-6 signin-box dws sig loginn">
                    <h4>Welcome To</h4>
                    <h2>OXFORD HRM PORTAL</h2>
                    <p>Login to your Account</p>
                    <div class="ruler"></div>
                    <p>Find us on</p>
                    <AccountSocialIcons />
                </div>
                <div class="col-md-6 signin-box signuup ">
                    <br><br>
                    <Logo />
                    <h4 class="font-weight-bold" style="color: rgb(44, 37, 37); font-weight: 900;">Login</h4>
                    <p style="color: rgb(51, 18, 18); text-align: center;">Securely login to your HRM portal</p>
                    <div class="well" style="margin-top: 7%;">
                        <LoginForm />
                        <div class="text-center">
                            <p class="signupp">
                                New User?
                                <router-link to="/register" class="font-weight-bold">
                                    Sign Up
                                </router-link>
                            </p>
                            <p class="signupp">
                                <router-link to="/confirm" class="font-weight-bold">
                                    Resend email confirmation link
                                </router-link>
                            </p>
                        </div>
                        <br><br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoginForm from "../components/forms/LoginForm";
import AccountSocialIcons from "../components/extras/AccountSocialIcons";
import Logo from "../components/extras/Logo";
export default {
    components: {
        LoginForm,
        AccountSocialIcons,
        Logo
    },
    mounted() {}
};
</script>