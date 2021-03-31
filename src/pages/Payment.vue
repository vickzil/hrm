/* eslint-disable */
<template>
    <div class="page" v-if="user">
        <PageHeader :topPageName='topPageName' />
        <SubPageHeader />
        <div class="section-body py-4 mt-2">
            <div class="container-fluid">
                <div class="row clearfix">
                    <div class="col-12">
                        <ul class="nav nav-tabs mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="pills-paymentHistory-tab" data-toggle="pill" href="#pills-paymentHistory" role="tab" aria-controls="pills-paymentHistory" aria-selected="false">Payment History</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-pendingPayments-tab" data-toggle="pill" href="#pills-pendingPayments" role="tab" aria-controls="pills-pendingPayments" aria-selected="false">Pending Payments</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-12 col-md-12">
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-paymentHistory" role="tabpanel" aria-labelledby="pills-paymentHistory-tab">
                                <UserPaymentHistory />
                            </div>
                            <div class="tab-pane fade" id="pills-pendingPayments" role="tabpanel" aria-labelledby="pills-pendingPayments-tab">
                                <PendingPayment />
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
import Footer from "../components/footer/Footer";
import UserPaymentHistory from "../components/extras/paymentComponent/UserPaymentHistory";
import PendingPayment from "../components/extras/paymentComponent/PendingPayment";
import "@/mixins";

export default {
    name: "Payment",
    components: {
        PageHeader,
        SubPageHeader,
        UserPaymentHistory,
        PendingPayment,
        Footer
    },

    data() {
        return {
            topPageName: "Payment"
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