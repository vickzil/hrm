/* eslint-disable */
<template>
    <div class="page">
        <PageHeader :topPageName='topPageName' />
        <SubPageHeader />
        <div class="section-body py-4 mt-2">
            <div class="container-fluid">
                <div class="row clearfix">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Timeline Activities</h3>
                            </div>
                            <div class="card-body" v-if="user && timelimes.length">
                                <TimelineCard v-for="timeline in timelines" :key="timeline" :timeline="timeline" />
                            </div>
                            <div class="card-body" v-else>
                                <div class="container text-center font-weight-bold mt-5">
                                    <p>No Activity yet</p>
                                    <br>
                                </div>
                            </div>

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
import PageHeader from "@/components/header/PageHeader";
import SubPageHeader from "../components/header/SubPageHeader";
import Footer from "../components/footer/Footer";
import TimelineCard from '../components/extras/TimelineCard.vue'
import "@/mixins";

export default {
    name: "Home",
    components: {
        PageHeader,
        SubPageHeader,
        TimelineCard,
        Footer
    },

    data() {
        return {
            topPageName: "Timeline"
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },

        timelimes() {
            return this.user.userActivities;
        },


    },

    methods: {

        removeOffcanvas: function() {
            document.body.classList.remove("offcanvas-active");
        },
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