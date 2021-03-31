<template>
    <transition name="fade">
        <div class="overlay_div" tabindex="-1" v-if="addBvnModal">
            <div class="overlay-close" @click="closeMakePaymentModal"></div>
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header ">
                        <h3 class="" style="text-transform: capitalize; font-size: 18px;"> Add Bvn</h3>
                        <div data-dismiss="modal" style="font-size: 19px;" class="close" @click="closeMakePaymentModal"></div>
                    </div>
                    <div class="modal-body animated px-4">
                        <br>
                        <h6 class="text-center">Please your bvn should not be more than 10 digit characters</h6>
                        <br>
                        <div class="form_payment_input">
                            <input type="text" class="payment_input" placeholder="Your BVN" autofocus="true" style="font-size: 19px; font-weight: bold" />
                        </div>
                        <transition name="fade">
                            <p v-if="lowAmount" style="color: red!important; font-size: 13px!important;margin-top: 15px;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 20 20" svg-inline="" role="presentation" focusable="false" tabindex="-1" style="color: red!important" fill="red">
                                    <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 11c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4H9v-2h2v2z"></path>
                                </svg>
                                Incorrect BVN
                            </p>
                        </transition>
                        <div class="text-right pt-3 mt-5">
                            <button type="submit" class="btn btn-danger" @click="proceedToPayment" v-bind:disabled="processing || lowAmount">
                                {{formText}}
                                <span class="spinner-border spinner-border-sm ml-2" role="status" aria-hidden="true" v-if="processing"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import $ from "jquery";
import "@/mixins";

export default {
    data() {
        return {
            amount: this.addComma(0),
            lowAmount: false,
            processing: false,
            formText: "Save BVN"
        };
    },
    computed: {
        addBvnModal() {
            return this.$store.getters.addBvnModal;
        },

        user() {
            return this.$store.getters.user;
        }
    },

    methods: {
        closeMakePaymentModal: function() {
            $(".overlay_div .modal-body").removeClass("swing");
            if (!this.processing) {
                this.$store.dispatch("setMakePayment", false);
            } else {
                setTimeout(() => {
                    $(".overlay_div .modal-body").addClass("swing");
                }, 400);
            }
        },
        showLogout: function() {
            this.$store.dispatch("showLogoutModal");
        },
        proceedToPayment: function() {
            if (this.userAmount < this.currentAmountToPay) {
                this.lowAmount = true;
            } else {
                this.sendToDB();
            }
        },

        sendToDB: function() {
            this.processing = true;
            this.formText = "please wait ...";

            setTimeout(() => {
                this.processing = false;
                this.formText = "Make payment";

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
.form_payment_input {
    position: relative;
    width: 300px;
    margin: auto;
}

.payment_input {
    background-color: #fff;
    padding: 8px 0px 8px 0px;
    border: none;
    border-radius: 2px;
    font-size: 16px;
    outline: none;
    display: inline;
    text-rendering: geometricPrecision;
    color: #3d1403;
    transition: border-color 0.3s ease;
    margin: 0px;
    margin-bottom: 0px;
    margin-left: 80px;
    text-align: left;
}

.modal_money_sign {
    font-size: 33px;
    text-align: center;
    display: inline;
    position: absolute;
    top: 8px;
    left: 53px;
    color: #3d1403;
}
</style>