/* eslint-disable */
<template>
    <div class="page" v-if="user">
        <PageHeader :topPageName='topPageName' />
        <SubPageHeader />
        <div class="section-body py-4 mt-2">
            <div class="container-fluid">
                <AdminDashboardRecordCard v-if="user && (isAdmin || isSuperAdmin)" />
                <MarketerDashboardRecordCard v-if="isStaff" />
                <br>
                <HomeTwoColumn />
                <br>
                <HomeVistorsStat />
                <br>
                <br>
                <HomeSocialStat />
                <br>
                <HomeTimeline />
                <br>
                <!-- <Map /> -->
            </div>
        </div>
        <div class="section-body">
            <Footer />
        </div>
    </div>
</template>
<script>
import PageHeader from "../components/header/PageHeader";
import SubPageHeader from "../components/header/SubPageHeader";
import Footer from "../components/footer/Footer";
import HomeTwoColumn from "../components/extras/homeComponents/HomeTwoColumn";
import HomeVistorsStat from "../components/extras/homeComponents/HomeVistorsStat";
import HomeSocialStat from "../components/extras/homeComponents/HomeSocialStat";
import HomeTimeline from "../components/extras/homeComponents/HomeTimeline";
import AdminDashboardRecordCard from "../components/extras/homeComponents/AdminDashboardRecordCard";
import MarketerDashboardRecordCard from "../components/extras/homeComponents/MarketerDashboardRecordCard";
// import Map from "../components/charts/Map";

import "@/mixins";

export default {
    name: "Home",
    components: {
        PageHeader,
        SubPageHeader,
        HomeTwoColumn,
        AdminDashboardRecordCard,
        MarketerDashboardRecordCard,
        HomeVistorsStat,
        HomeTimeline,
        HomeSocialStat,
        // Map,
        Footer
    },

    data() {
        return {
            topPageName: "Dashboard"
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
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
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch("showPageLoading");
        this.removeOffcanvas();
        next();
    }
};
</script>
<style scoped></style>