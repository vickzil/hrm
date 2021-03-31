/* eslint-disable */
<template>
    <div class="page">
        <div class="section-body py-4 mt-2">
            <div class="container-fluid">
                <div class="row clearfix">
                    <div class="col-lg-12 col-md-12">
                        <br><br>
                        <div class="admin_landing_page_grid">
                            <div class="card active_modules" @click="showSidebar">
                                <router-link to="/dashboard" class="card-body">
                                    <i class="fe fe-users text-danger"></i>
                                    <p>HRM</p>
                                </router-link>
                            </div>
                            <AdminLandingCard v-for="card in cards" :key="card.id" :card="card" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-body">
            <Footer />
        </div>
    </div>
</template>
<script>
import Footer from "../components/footer/Footer";
import AdminLandingCard from "../components/extras/AdminLandingCard";

import "@/mixins";

export default {
    name: "Home",
    components: {
        AdminLandingCard,
        Footer
    },

    data() {
        return {
            topPageName: "Admin Dashboard",
            cards: [{
                    id: 1,
                    title: "Properties",
                    icon: "fa fa-building-o",
                    url: "",
                    color: "success"
                },
                {
                    id: 2,
                    title: "CRM",
                    icon: "fe fe-users",
                    url: ""
                },
                {
                    id: 3,
                    title: "Projects",
                    icon: "fe fe-briefcase",
                    url: ""
                },
                {
                    id: 4,
                    title: "Accounting",
                    icon: "fe fe-credit-card",
                    url: ""
                },
                {
                    id: 5,
                    title: "Assets",
                    icon: "fe fe-grid",
                    url: ""
                },
                {
                    id: 6,
                    title: "Sales",
                    icon: "fe fe-trending-up",
                    url: ""
                },
                {
                    id: 7,
                    title: "Procurement",
                    icon: "fe fe-credit-card",
                    url: ""
                },
                {
                    id: 8,
                    title: "Inventory",
                    icon: "fe fe-layers",
                    url: ""
                },
                {
                    id: 9,
                    title: "Investment",
                    icon: "fa fa-bar-chart",
                    url: ""
                },
                {
                    id: 10,
                    title: "Documents",
                    icon: "fe fe-book-open",
                    url: ""
                },
                {
                    id: 11,
                    title: "Messaging",
                    icon: "fe fe-mail",
                    url: ""
                },
                {
                    id: 12,
                    title: "Marketers",
                    icon: "icon-users",
                    url: ""
                },
                {
                    id: 13,
                    title: "Workspace",
                    icon: "icon-screen-desktop",
                    url: ""
                },
                {
                    id: 14,
                    title: "Construction",
                    icon: "icon-home",
                    url: ""
                }
            ]
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        pendingPayment() {
            let pending = [];
            if (this.user) {
                pending = this.user.userPendingPayments;
            }
            return pending;
        }
    },

    methods: {
        removeOffcanvas: function() {
            document.body.classList.remove("offcanvas-active");
        }
    },

    mounted() {
        this.$store.dispatch("currentSitePage", this.$router.history.current.path);
        this.$store.dispatch("closePageLoading");

        this.hideSidebar();
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch("showPageLoading");
        this.removeOffcanvas();
        next();
    }
};
</script>
<style scoped>
.dark-mode .admin_landing_page_grid .active_modules i {
    color: #ff0505 !important;
}

.admin_landing_page_grid .active_modules p {
    font-weight: bold;
}

.dark-mode .admin_landing_page_grid .active_modules p {
    color: #ff0505 !important;
}

.admin_landing_page_grid {
    display: grid;
    gap: 40px;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
}

@media screen and (max-width: 1200px) {
    .admin_landing_page_grid {
        gap: 20px;
        grid-template-columns: repeat(3, 1fr);
    }
}

@media screen and (max-width: 850px) {
    .admin_landing_page_grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>