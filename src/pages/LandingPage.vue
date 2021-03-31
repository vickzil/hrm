/* eslint-disable */
<template>
    <div class="account_body">
        <div class="bg-img">
            <div class="container" id="content">
                <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center m-auto">
                    <div class="left-content p-2 p-lg-5 text-center text-lg-left">
                        <div class="logo mt-n5 mt-lg-0 mb-4">
                            <a href="javascript:void(0)">
                                <!-- <img src="@/assets/images/logo.jpeg" width="150px" height="auto" alt="logo"> -->
                            </a>
                        </div>
                        <div class="left-content-text text-white my-3">
                            <h2>Welcome To Oxford Group Portal</h2>
                            <p>Create An Account Or Login To Continue</p>
                        </div>
                    </div>
                    <div class="right-content p-5 rounded-lg">
                        <div class="my-3 login-btn">
                            <button class="btn btn-block btn-danger" @click="goToLoginPage">Log Into Your Account</button>
                        </div>
                        <div class="mb-4 create-btn">
                            <button class="btn btn-block btn-dark" @click="goToRegisterPage">Create A Free Account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";

export default {
    name: "LandingPage",
    computed: {},

    methods: {
        windowMatchMedia: function() {
            var screen = window.matchMedia("(max-width: 768px)");
            window.addEventListener("resize", this.changeScreen(screen));
        },
        changeScreen: function(x) {
            if (x.matches) {
                $(".left-content-text").html("Welcome To HRM Portal");
                $(".left-content-text").css({
                    fontSize: "20px",
                    "margin-bottom": "16px"
                });
            } else {
                $(".left-content-text").html(
                    `<div>
                    <h2>Welcome To HRM Portal</h2>
                    <p>Create An Account Or Login To Continue</p>
                </div>`
                );
            }
        },
        goToLoginPage: function() {
            this.$router.push({ path: "/login" });
        },
        goToRegisterPage: function() {
            this.$router.push({ path: "/register" });
        }
    },

    created() {
        this.windowMatchMedia();
    }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700|Poppins:400,500&display=swap");

.bg-img {
    background: url("../assets/images/gallery/bg.jpg");
    height: 100vh;
    background-size: cover;
    background-position: center;
    width: 100%;
    animation: anim-width 7s normal ease-in-out 0s;
    -o-animation: anim-width 7s normal ease-in-out 0s;
    -moz-animation: anim-width 7s normal ease-in-out 0s;
    -webkit-animation: anim-width 7s normal ease-in-out 0s;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    animation-duration: 7s;
    overflow: hidden !important;
    font-family: "Montserrat", sans-serif;
    z-index: 1000000000000000000;
}

@keyframes anim-width {
    0% {
        width: 100%;
    }

    50% {
        width: 110%;
    }

    100% {
        width: 100%;
    }
}

.bg-img:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
}

#content {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin: auto;
    transform: translateY(-50%);
    margin: auto;
    z-index: 2;
}

#content h2 {
    font-weight: 800;
}

.right-content {
    text-align: center;
    padding: 30px 60px;
    width: 580px;
    height: auto;
    background: #fff;
    box-shadow: 0px 5px 45px rgba(190, 190, 190, 0.5);
    transition: 0.3s ease;
}

.right-content:hover {
    box-shadow: 0px 5px 45px rgba(190, 190, 190, 0.18);
}

.left-content-text h2 {
    font-size: 52px;
    text-rendering: geometricPrecision;
}

.left-content-text p {
    font-size: 16px;
}

.bg-img .btn {
    border: none !important;
}

.bg-img .btn:active,
.bg-img .btn:focus {
    box-shadow: none !important;
}

.right-content .btn {
    padding-top: 15px !important;
    padding-bottom: 15px !important;
    font-weight: bold;
}

.right-content .create-btn .btn {
    background: transparent !important;
    border: 1px solid red !important;
    color: red !important;
    transition: 400ms ease-in-out;
}

.right-content .create-btn .btn:hover {
    background: rgb(167, 41, 41) !important;
    border: 1px solid rgb(167, 41, 41) !important;
    color: rgb(250, 250, 250) !important;
}

.right-content .text-dark.pt-2.text-left {
    font-size: 14px;
    text-align: center !important;
}

.right-content .text-dark.pt-2.text-left a {
    color: red;
}

@media screen and (max-width: 768px) {
    .left-content-text {
        margin-bottom: 16px;
    }

    .left-content-text h2 {
        font-size: 20px;
    }

    .left-content-text p {
        font-size: 14px;
    }

    .right-content .btn {
        padding-top: 10px !important;
        padding-bottom: 10px !important;
        font-weight: bold;
    }

    .right-content .text-dark.pt-2.text-left {
        font-size: 13px;
    }
}
</style>