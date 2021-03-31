/* eslint-disable no-mixed-spaces-and-tabs */
<template>
    <div class="row clearfix" v-if="pendingPayment">
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-header bline">
                    <h3 class="card-title"><b>Pending Payments</b></h3>
                </div>
                <div class="card-body">
                    <div class="table-responsive mt-3" v-if="pendingPayment.length > 0">
                        <table class="table table-striped text-nowrap mb-0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <TablePaymentCards v-for="payment in pendingPayment" :key="payment.code" :payment="payment" />
                            </tbody>
                        </table>
                    </div>
                    <div class="card-body" v-else>
                        <div class="container text-center font-weight-bold mt-5">
                            <p>No pending payment to be made</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import TablePaymentCards from "./TablePaymentCards.vue";

export default {
    name: "PendingPayment",
    components: {
        TablePaymentCards
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
    }
};
</script>
<style scoped>
</style>