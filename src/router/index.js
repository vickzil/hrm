import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Home from "../pages/Home.vue";
import Profile from "../pages/Profile.vue";
import Payment from "../pages/Payment.vue";
import ChangePassword from "../pages/ChangePassword.vue";
import AdminLandingPage from "../pages/AdminLandingPage.vue";
import Timeline from "../pages/Timeline.vue";
import Settings from "../pages/Settings.vue";
import StaffRegistration from "../pages/StaffRegistration.vue";

import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ThankYou from "../pages/ThankYou";
import ConfirmLoginEmail from "../pages/ConfirmLoginEmail";
import Verify from "../pages/Verify";
import VerifyStatus from "../pages/VerifyStatus";
import FourZeroFour from "../pages/FourZeroFour";


Vue.use(Router);

let router = new Router({
    mode: "history",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0,
            };
        }
    },
    routes: [{
            path: "/",
            name: "LandingPage",
            component: LandingPage,
            meta: {
                title: "HRM - Oxford Groups",
                guest: true

            },
        },

        {
            path: "/dashboard",
            name: "Home",
            component: Home,
            meta: {
                transition: 'fade-in-down',
                title: "HRM - Dasboard",
                requiresAuth: true,
            },
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
            meta: {
                transition: 'fade-in-down',
                title: "HRM - Profile",
                requiresAuth: true,
            },
        },
        {
            path: "/payment",
            name: "Payment",
            component: Payment,
            meta: {
                transition: 'fade-in-down',
                title: "HRM - Payment",
                requiresAuth: true,

            },
        },
        {
            path: "/change-password",
            name: "ChangePassword",
            component: ChangePassword,
            meta: {
                transition: 'fade-in-down',
                title: "HRM - Change Password",
                requiresAuth: true,

            },
        },
        {
            path: "/admin-home",
            name: "AdminLandingPage",
            component: AdminLandingPage,
            meta: {
                transition: 'fade-in-down',
                title: "HRM - Dasboard",
                requiresAuth: true,
                isAdmin: true

            },
        },
        {
            path: "/timeline",
            name: "Timeline",
            component: Timeline,
            meta: {
                transition: 'fade-in-down',
                title: "HRM - Timeline",
                requiresAuth: true,
            },
        },
        {
            path: "/staff-oxfordvest",
            name: "StaffRegistration",
            component: StaffRegistration,
            meta: {
                transition: 'fade-in-down',
                title: "HRM - Staff Registration",
                requiresAuth: true,
            },
        },
        {
            path: "/settings",
            name: "Settings",
            component: Settings,
            meta: {
                transition: 'fade-in-down',
                title: "HRM - Settings",
                requiresAuth: true,
            },
        },
        {
            path: "/login",
            name: "Login",
            component: Login,
            meta: {
                title: "HRM - Login",
                guest: true
            },
        },
        {
            path: "/register",
            name: "Register",
            component: Register,
            meta: {
                title: "HRM - Register",
                guest: true
            },
        },
        {
            path: "/forgot-password",
            name: "ForgotPassword",
            component: ForgotPassword,
            meta: {
                title: "HRM - Forgot Password",
                guest: true
            },
        },
        {
            path: "/thank-you",
            name: "ThankYou",
            component: ThankYou,
            meta: {
                title: "HRM - thank you for registering",
                guest: true
            },
        },
        {
            path: "/confirm",
            name: "ConfirmLoginEmail",
            component: ConfirmLoginEmail,
            meta: {
                title: "HRM - Confirm E-mail",
                guest: true
            },
        },
        {
            path: "/verify-status",
            name: "VerifyStatus",
            component: VerifyStatus,
            meta: {
                title: "HRM - Verification status",
                guest: true
            },
        },
        {
            path: "/verify/:id",
            name: "Verify",
            component: Verify,
            props: true,
            meta: {
                title: "HRM - Verify",
                guest: true
            },
            beforeRouteEnter(to, from, next) {
                if (Object.keys(to.query).length !== 0) {
                    next(vm => {
                        vm.userid = to.query.userid
                        vm.token = to.query.token
                    })
                }
                next()
            }
        },

        {
            path: "*",
            name: "FourZeroFour",
            component: FourZeroFour,
            meta: {
                title: "HRM - 404 Page",
            },
        },
    ],
});


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/')
    } else {
        next()
    }
})


router.beforeEach((to, from, next) => {
        let userAdmin = sessionStorage.getItem('draggerability')
        if (to.matched.some(record => record.meta.isAdmin)) {
            if (userAdmin) {
                next()
            } else {
                next('/dashboard')
            }

        } else {
            next()
        }
    })

    router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.guest)) {
            if (store.getters.isLoggedIn) {

                next('/dashboard')
            } else {
                next()
            }
        
        } else {
            next()
        }
    })




export default router;