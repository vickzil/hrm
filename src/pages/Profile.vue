/* eslint-disable */
<template>
    <div class="page">
        <PageHeader :topPageName='topPageName' />
        <SubPageHeader />
        <div class="section-body py-4 mt-2" v-if="user">
            <div class="container-fluid profile_div">
                <div class="row clearfix">
                    <div class="col-12">
                        <ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-user-tab" data-toggle="pill" href="#pills-user" role="tab" aria-controls="pills-user" aria-selected="false">My Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-idCard-tab" data-toggle="pill" href="#pills-idCard" role="tab" aria-controls="pills-idCard" aria-selected="false">ID Card</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Edit Profile</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-workHistory-tab" data-toggle="pill" href="#pills-workHistory" role="tab" aria-controls="pills-workHistory" aria-selected="false">Work History</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-schoolHistory-tab" data-toggle="pill" href="#pills-schoolHistory" role="tab" aria-controls="pills-schoolHistory" aria-selected="false">Education History</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-Certifications-tab" data-toggle="pill" href="#pills-Certifications" role="tab" aria-controls="pills-Certifications" aria-selected="false">Certifications</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-userGuarantor-tab" data-toggle="pill" href="#pills-userGuarantor" role="tab" aria-controls="pills-userGuarantor" aria-selected="false">Guarantor</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-Referees-tab" data-toggle="pill" href="#pills-Referees" role="tab" aria-controls="pills-Referees" aria-selected="false">Referees</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-userBankDetails-tab" data-toggle="pill" href="#pills-userBankDetails" role="tab" aria-controls="pills-userBankDetails" aria-selected="false">Bank Details</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-12 col-md-12">
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-user" role="tabpanel" aria-labelledby="pills-user-tab">
                                <div class="card">
                                    <div class="card-header bline">
                                        <h3 class="card-title"><b>Profile</b></h3>
                                    </div>
                                    <div class="card-body">
                                        <div id="user">
                                            <ProfileCard />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-idCard" role="tabpanel" aria-labelledby="pills-idCard-tab">
                                <IDCard />
                            </div>
                            <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                <ProfileForm />
                            </div>
                            <div class="tab-pane fade" id="pills-workHistory" role="tabpanel" aria-labelledby="pills-workHistory-tab">
                                <WorkHistory />
                            </div>
                            <div class="tab-pane fade" id="pills-schoolHistory" role="tabpanel" aria-labelledby="pills-schoolHistory-tab">
                                <SchoolHistory />
                            </div>
                            <div class="tab-pane fade" id="pills-Certifications" role="tabpanel" aria-labelledby="pills-Certifications-tab">
                                <Certifications />
                            </div>
                            <div class="tab-pane fade" id="pills-userGuarantor" role="tabpanel" aria-labelledby="pills-userGuarantor-tab">
                                <Guarantor />
                            </div>
                            <div class="tab-pane fade" id="pills-Referees" role="tabpanel" aria-labelledby="pills-Referees-tab">
                                <Referees />
                            </div>
                            <div class="tab-pane fade" id="pills-userBankDetails" role="tabpanel" aria-labelledby="pills-userBankDetails-tab">
                                <UserBankDetails />
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
import PageHeader from "../components/header/PageHeader";
import SubPageHeader from "../components/header/SubPageHeader";
import ProfileCard from "../components/extras/profileComponent/ProfileCard";
import ProfileForm from "../components/forms/ProfileForm";
import WorkHistory from "../components/extras/WorkHistory";
import SchoolHistory from "../components/extras/SchoolHistory";
import Certifications from "../components/extras/Certifications";
import Guarantor from "../components/extras/Guarantor";
import Referees from "../components/extras/Referees";
import UserBankDetails from "../components/extras/UserBankDetails";
import IDCard from "../components/extras/profileComponent/IDCard";

import Footer from "../components/footer/Footer";

import "@/mixins";

export default {
    name: "Profile",
    components: {
        PageHeader,
        SubPageHeader,
        ProfileCard,
        IDCard,
        ProfileForm,
        WorkHistory,
        SchoolHistory,
        Certifications,
        Guarantor,
        Referees,
        UserBankDetails,
        Footer
    },
    data() {
        return {
            topPageName: "Profile"
        };
    },

    computed: {
        user() {
            return this.$store.getters.user || null;
        },
        userAmount() {
            return this.$store.getters.userAmount;
        },
        userBankDetails() {
            return this.$store.getters.userBankDetails;
        },
        userTokenDate() {
            return this.user.gender == "male" ? true : false;
        }
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