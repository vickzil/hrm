<template>
    <transition name="fade">
        <div class="overlay_div" tabindex="-1" v-if="selectPaymentOptionModal ">
            <div class="overlay-close" @click="closePaymentOptions"></div>
            <div class="modal-dialog modal-dialog-centered" style="border-radius: 0px;">
                <div class="modal-content">
                    <div class="modal-header bg-light text-dark">
                        <h3 class="" style="text-transform: capitalize; font-size: 16px;"> Select Payment Options </h3>
                        <div data-dismiss="modal" style="font-size: 19px; color: #000!important;" class="close text-dark" @click="closePaymentOptions"></div>
                    </div>
                    <div class="modal-body animated px-4" v-if="userPaymentOptions">
                        <br>
                        <h6 class="text-center font-15 w-75 mx-auto">Kindly click on any of the payment options below to fund your wallet</h6>
                        <br>
                        <div class="grid-box text-center">
                            <button type="submit" class="btn btn-outline-danger btn-sm border-0 hrm_button" @click="showBankTransferModal" v-if="userPaymentOptions.byLCYTransfer.items.length">Bank Transfer </button>
                            <button type="submit" class="btn btn-outline-danger btn-sm hrm_button" @click="showDebitCreditCardModal" v-if="userPaymentOptions.byCard.items.length">Debit/Credit Card </button>
                            <button type="submit" class="btn btn-outline-danger btn-sm hrm_button" @click="showUploadEvidienceModal" v-if="userPaymentOptions.byFCYTransfer.items.length">Transfer (USD/EUR/GBP) </button>
                        </div>
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

        selectPaymentOptionModal() {
            return this.$store.getters.selectPaymentOptionModal;
        },

        userPaymentOptions() {
            return this.$store.getters.userPaymentOptions;
        }
    },

    methods: {
        checkAmount: function() {
            if (this.amount <= 99) {
                this.lowAmount = true;
                return;
            }

            this.lowAmount = false;
        },

        closePaymentOptions: function() {
            this.$store.dispatch("closePaymentOptions");
        },

        showBankTransferModal: function() {
            this.$store.dispatch("showBankTransferModal");
        },

        showDebitCreditCardModal: function() {
            this.$store.dispatch("showDebitCreditCardModal");
        },

        showUploadEvidienceModal: function() {
            this.$store.dispatch("showUploadEvidienceModal");
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
.grid-box {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);
    width: 80%;
    margin: 40px auto 90px;
}

@media screen and (max-width: 770px) {
    .grid-box {
        grid-template-columns: repeat(2, 1fr);
    }

    .modal-body h6.text-center.font-18 {
        width: 90% !important;
    }
}

@media screen and (max-width: 430px) {
    .grid-box {
        gap: 20px;
        grid-template-columns: 1fr;
        width: 95%;
    }

    .modal-body h6.text-center.font-18 {
        font-size: 13px !important;
    }
}
</style>