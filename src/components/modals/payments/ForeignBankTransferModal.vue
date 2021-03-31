<template>
    <transition name="fade">
        <div class="overlay_div" tabindex="-1" v-if="uploadEvidienceModal" id="AUDdetailsModal">
            <div class="overlay-close" @click="closeUploadEvidienceModal"></div>
            <div class="modal-dialog modal-dialog-centered" style="border-radius: 0px;">
                <div class="modal-content">
                    <div class="modal-header bg-light text-dark">
                        <h3 class="" style="text-transform: capitalize; font-size: 16px;"> Fund by Bank Transfer (USD/EUR/GBP) </h3>
                        <div data-dismiss="modal" style="font-size: 19px; color: #000!important;" class="close text-white" @click="closeUploadEvidienceModal"></div>
                    </div>
                    <div class="modal-body animated px-4" id="fbtModal">
                        <button class="btn bg-light-orange box-shadow-sm" @click="goBack"> <i class="fe fe-corner-up-left"></i> Back </button>
                        <br>
                        <br>
                        <h6 class="text-center font-18 w-75 mx-auto">Fund wallet by bank transfer (USD/EUR/GBP)</h6>
                        <br>
                        <p style="font-size: 14px;" class="mb-4 text-center" v-if="byFCYTransferMessage !== '' ">{{byFCYTransferMessage}}</p>
                        <div class="table-responsive mt-3">
                            <table id="lstProblems" class="table table-striped table-hover responsive">
                                <thead>
                                    <tr class="bg-dark text-light">
                                        <th>Bank Swift code(Local)</th>
                                        <th>Bank IBAN</th>
                                        <th>Bank Name</th>
                                        <th>Bank SortCode</th>
                                        <th>Bank SwiftCode(corresponding)</th>
                                        <th>currency</th>
                                        <th>Description</th>
                                        <th>local Account Name</th>
                                        <th>local Account Number</th>
                                        <th>local Bank Name</th>
                                        <th>Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="bank in foreignTransfers" :key="bank.accountNumber">
                                        <td v-if="bank.bankSwiftCode">{{bank.bankSwiftCode}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.correspondingBankIBAN">{{bank.correspondingBankIBAN}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.correspondingBankName">{{bank.correspondingBankName}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.correspondingBankSortCode">{{bank.correspondingBankSortCode}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.correspondingBankSwiftCode">{{bank.correspondingBankSwiftCode}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.currency">{{bank.currency}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.description">{{bank.description}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.localAccountName">{{bank.localAccountName}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.localAccountNumber">{{bank.localAccountNumber}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.localBankName">{{bank.localBankName}}</td>
                                        <td v-else>.</td>
                                        <td v-if="bank.rate">{{bank.rate}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="text-right pt-3 mt-5">
                            <p class="text-right"><b>Already made payment??</b></p>
                            <button type="submit" class="btn btn-outline-danger" @click="uploadPaymentEvidence">
                                Upload Payment Evidence
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
            formText: "Proceed"
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },

        uploadEvidienceModal() {
            return this.$store.getters.uploadEvidienceModal;
        },
        foreignTransfers() {
            let paymentOptions = this.$store.getters.userPaymentOptions;

            return paymentOptions.byFCYTransfer.items;
        },
        byFCYTransferMessage() {
            return this.$store.getters.userPaymentOptions.byFCYTransfer.message;
        }
    },

    methods: {
        closeUploadEvidienceModal: function() {
            this.$store.dispatch("closeUploadEvidienceModal");
        },

        uploadPaymentEvidence: function() {
            this.processing = true;

            setTimeout(() => {
                this.processing = false;
                this.$store.dispatch("closeUploadEvidienceModal");
                this.$store.dispatch("showUploadEvidenceFormModal");
            }, 1000);
        },

        goBack: function() {
            this.$store.dispatch("closeUploadEvidienceModal");
            this.$store.dispatch("showPaymentOptions");
        }
    },
    mounted() {
        $("#AUDdetailsModal").on("shown.bs.modal", function() {
            var table = $("#lstProblems").DataTable();
            table.columns.adjust();
        });
    }
};
</script>
<style scoped>
table thead th {
    color: #fff !important;
}

.table-responsive::-webkit-scrollbar {
    -webkit-appearance: none;
}

.table-responsive::-webkit-scrollbar:vertical {
    width: 12px;
}

.table-responsive::-webkit-scrollbar:horizontal {
    height: 12px;
}

.table-responsive::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    border: 2px solid #ffffff;
}

.table-responsive::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #ffffff;
}
</style>