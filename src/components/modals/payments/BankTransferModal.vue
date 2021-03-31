<template>
    <transition name="fade">
        <div class="overlay_div" tabindex="-1" v-if="bankTransferModal">
            <div class="overlay-close" @click="closeBankTransferModal"></div>
            <div class="modal-dialog modal-dialog-centered" style="border-radius: 0px;">
                <div class="modal-content">
                    <div class="modal-header bg-light">
                        <h3 class="" style="text-transform: capitalize; font-size: 16px;"> Fund by Bank Transfer </h3>
                        <div data-dismiss="modal" style="font-size: 19px; color: #000!important;" class="close text-dark" @click="closeBankTransferModal"></div>
                    </div>
                    <div class="modal-body animated px-4">
                        <button class="btn bg-light-orange box-shadow-sm" @click="goBack"> <i class="fe fe-corner-up-left"></i> Back </button>
                        <br>
                        <br>
                        <h6 class="text-center font-18 w-75 mx-auto">Fund wallet by bank transfer (NGN)</h6>
                        <br>
                        <p style="font-size: 14px;" class="mb-4 text-center" v-if="byLCFTransferMessage !== '' ">{{byLCFTransferMessage}}</p>
                        <div class="table-responsive mt-3">
                            <table class="table table-striped text-nowrap mb-0">
                                <thead>
                                    <tr class=" bg-gray">
                                        <th>Bank</th>
                                        <th>Acc No</th>
                                        <th>Acc Name</th>
                                        <th>Currency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="bank in localTransfers" :key="bank.accountNumber">
                                        <td>{{bank.accountBank}}</td>
                                        <td>{{bank.accountNumber}}</td>
                                        <td>{{bank.accountName}}</td>
                                        <td>{{bank.currency}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br><br><br>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import "@/mixins";

export default {
    data() {
        return {
            amount: this.addComma(0),
            lowAmount: false,
            processing: false,
            formText: "Proceed"
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },

        bankTransferModal() {
            return this.$store.getters.bankTransferModal;
        },
        localTransfers() {
            let paymentOptions = this.$store.getters.userPaymentOptions;

            return paymentOptions.byLCYTransfer.items;
        },
        byLCFTransferMessage() {
            return this.$store.getters.userPaymentOptions.byLCYTransfer.message;
        }
    },

    methods: {
        closeBankTransferModal: function() {
            this.$store.dispatch("closeBankTransferModal");
        },

        goBack: function() {
            this.$store.dispatch("closeBankTransferModal");
            this.$store.dispatch("showPaymentOptions");
        },

        proceedToPayment: function() {

            this.processing = true;
            this.formText = "please wait ...";

            setTimeout(() => {
                this.processing = false;
                this.formText = "Proceed";

                this.$store.dispatch("setMakePayment", false);

                let payload = {
                    type: "success",
                    message: "Payment Successfull!!"
                };
                this.$store.dispatch("showAlert", payload);
            }, 4000);
        }
    }
};
</script>
<style scoped>
table thead th {
    color: #fff !important;
}
</style>