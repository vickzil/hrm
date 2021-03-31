<template>
    <div class="account_body">
        <div class="signin forsignup">
            <div class="row zxc">
                <div class="col-md-6 signin-box dws sig loginn">
                    <h4>Welcome To</h4>
                    <h2>OXFORD HRM PORTAL</h2>
                    <p>Account Verification</p>
                    <div class="ruler"></div>
                    <p>Find us on</p>
                    <AccountSocialIcons />
                </div>
                <div class="col-md-6 signin-box signuup ">
                    <br><br>
                    <br><br>
                    <Logo />
                    <br><br>
                    <div class="row">
                        <div class="col-md-10 col-sm-12 mx-auto">
                            <h4 class="font-weight-bold" style="color: rgb(44, 37, 37); font-weight: 900;">{{pageTitle}}</h4>
                            <p style="color: rgb(51, 18, 18); text-align: center;" class="W-80">{{pageDescription1}}</p>
                            <div class="well" style="margin-top: 5%;">
                                <div class="text-center">
                                    <p class="signupp" v-if="status === 'true'">
                                        continue,
                                        <router-link to="/login" class="font-weight-bold">
                                            Send me Back
                                        </router-link> to the Login.
                                    </p>
                                    <p class="signupp" v-else>
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
        </div>
    </div>
</template>
<script>
import AccountSocialIcons from "../components/extras/AccountSocialIcons";
import Logo from "../components/extras/Logo";
export default {
    components: {
        Logo,
        AccountSocialIcons
    },

    computed: {
        status() {
            return localStorage.getItem("hasStatus");
        },
        pageTitle() {
            let pageT;

            if (this.status == "true") {
                pageT = "Email Verified successful";
            } else {
                pageT = "Email not Verified";
            }

            return pageT;
        },
        pageDescription1() {
            let pageD;

            if (this.status == "true") {
                pageD =
                    "Thank you for confirming your email. please click on the link below to login to your Account";
            } else {
                pageD =
                    "Your email cannot be verified. Please click on the link below to resend confirmation link!";
            }

            return pageD;
        }
    },
    mounted() {
        setTimeout(() => {
            localStorage.removeItem("hasStatus");
        }, 6000);
    },

    created() {
        if (localStorage.getItem("hasStatus") == null) {
            this.$router.push({ path: "/" });
        }
    }
};
</script>