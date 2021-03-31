<template>
    <div class="card">
        <div class="card-header bline">
            <h3 class="card-title"><b>Payment History</b></h3>
        </div>
        <div class="card-body">
            <div class="table-responsive mt-3" v-if="payments.length > 0">
                <table class="table card-table">
                    <tbody>
                        <tr v-for="payment in payments" :key="payment.code">
                            <td class="width45">
                                <span class="avatar avatar-green" v-if="payment.status == 'active' ">
                                    <i class="fa fa-check text-white"></i>
                                </span>
                                <span class="avatar avatar-danger" v-else>
                                    <i class="fa fa-times text-white"></i>
                                </span>
                            </td>
                            <td>
                                <p class="mb-0">{{payment.narration}}</p>
                                <span class="text-muted font-13"><b>Source Of Debit</b> {{payment.sourceOfDebit}}</span>
                            </td>
                            <td class="text-right">
                                <p class="mb-0"> ₦{{addComma(payment.amount)}}</p>
                                <span class="text-success font-13" v-if="payment.status == 'active' ">Successful</span>
                                <span class="text-danger font-13" v-else>Pending</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-body" v-else>
                <div class="container text-center font-weight-bold mt-5">
                    <p>No payment made yet</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "UserPaymentHistory",

    computed: {
        user() {
            return this.$store.getters.user;
        },
        payments() {
            return this.user.userPayments;
        }
    }
};
</script>
<style lang="css" scoped>
</style>