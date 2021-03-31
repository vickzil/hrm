<template>
    <transition name="fade">
        <div class="overlay_div" tabindex="-1" v-if="debitCreditCardModal">
            <div class="overlay-close" @click="closeDebitCreditCardModal"></div>
            <div class="modal-dialog modal-dialog-centered" style="border-radius: 0px;">
                <div class="modal-content">
                    <div class="modal-header bg-light text-dark">
                        <h3 class="" style="text-transform: capitalize; font-size: 16px;"> Make Payment By Card </h3>
                        <div data-dismiss="modal" style="font-size: 19px; color: #000!important;" class="close text-white" @click="closeDebitCreditCardModal"></div>
                    </div>
                    <div class="modal-body animated px-4">
                        <button class="btn bg-light-orange box-shadow-sm" @click="goBack"> <i class="fe fe-corner-up-left"></i> Back </button>
                        <h6 class="text-center font-16 w-75 mx-auto" v-if="debitByCardMessage">{{debitByCardMessage}}</h6>
                        <br>
                        <div class="grid-box text-center">
                            <span v-for="payment in debitByCard" :key="payment.publicKey">
                                <img v-if="payment.provider == 'paystack' " src="data:image/png;base64,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" alt="paystack" @click="makeThisPayment(payment)">
                                <div class="font-weight-bold font-18 mt-2" v-if="payment.provider == 'paystack' ">
                                    Paystack
                                </div>
                                <img v-if="payment.provider == 'rave' " src="@/assets/images/gallery/rave-logo.png" alt="flutterwave" @click="makeThisPayment(payment)">
                                <div class="font-weight-bold font-18 mt-2" v-if="payment.provider == 'rave' ">
                                    Rave
                                </div>
                            </span>
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

        debitCreditCardModal() {
            return this.$store.getters.debitCreditCardModal;
        },
        debitByCard() {
            let paymentOptions = this.$store.getters.userPaymentOptions;

            return paymentOptions.byCard.items;
        },

        debitByCardMessage() {
            return this.$store.getters.userPaymentOptions.byCard.message;
        }
    },

    methods: {
        makeThisPayment: function(payment) {
            this.$store.state.clickedPaymentType = payment;
            this.$store.dispatch("showPaymentFormModal");
        },
        closeDebitCreditCardModal: function() {
            this.$store.dispatch("closeDebitCreditCardModal");
        },

        goBack: function() {
            this.$store.dispatch("closeDebitCreditCardModal");
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
.grid-box {
    display: grid;
    gap: 40px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    width: 80%;
    margin: 40px auto 90px;
}

.grid-box img {
    width: 150px;
    height: 80px;
    box-shadow: rgba(68, 88, 144, 0.1) 0px 10px 10px 0px;
    transition: all 300ms ease-in-out;
    cursor: pointer;
    border-radius: 12px;
    /* object-fit: cover; */
}

.grid-box img:hover {
    box-shadow: 0 2.8px 2.2px rgba(78, 78, 78, 0.034),
        0 6.7px 5.3px rgba(65, 64, 64, 0.048), 0 12.5px 10px rgba(63, 63, 63, 0.06),
        0 100px 80px rgba(0, 0, 0, 0.12);
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
        gap: 15px;
        grid-template-columns: repeat(2, 1fr);
        width: 95%;
    }

    .modal-body h6.text-center.font-18 {
        font-size: 13px !important;
    }
}
</style>