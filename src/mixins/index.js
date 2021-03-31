import Vue from "vue";
import $ from 'jquery';

Vue.mixin({
    computed: {
        user() {
            return this.$store.getters.user;
        },
        hrmURL() {
            return this.$store.state.hrmURL;
        },
        walletURL() {
            return this.$store.state.walletURL;
        },

        isAdmin() {
            let userRole = this.user.userInfo.roles;
            let adminRole;

            if (userRole) {
                adminRole = userRole.includes("admin");
            }
            return !!adminRole;
        },
        isStaff() {
            let userRole = this.user.userInfo.roles;

            let staffRole;
            if (userRole) {
                staffRole = userRole.includes("staff");
            }

            return !!staffRole;
        },
        isHr() {
            let userRole = this.user.userInfo.roles;

            let hrRole;
            if (userRole) {
                hrRole = userRole.includes("hr");
            }

            return !!hrRole;
        },
        isSuperAdmin() {
            let userRole = this.user.userInfo.roles;

            let superAdminRole;
            if (userRole) {
                superAdminRole = userRole.includes("superadmin");
            }

            return !!superAdminRole;
        },
        isExecs() {
            let userRole = this.user.userInfo.roles;

            let execsRole;
            if (userRole) {
                execsRole = userRole.includes("execs");
            }

            return !!execsRole;
        }
    },
    methods: {
        capitalizeFirstLetter(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        addComma(value) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        removeTimeZone(datestring) {
            let finalDate = "";

            if (datestring.split("+").length > 1) {
                let b = datestring.split("T");
                finalDate = b[0];
            } else {
                let b = datestring.split("T");

                if (b.length > 1) {
                    b.pop();
                    finalDate = b.join("-");
                }
            }

            return finalDate;
        },
        validEmail: function(email) {
            var emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailReg.test(email);
        },
        hideSidebar: function() {
            $("body").addClass('offcanvas-active');
        },
        showSidebar: function() {
            $("body").removeClass('offcanvas-active');
        },
    }
})