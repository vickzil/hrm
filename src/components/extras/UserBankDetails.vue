<template>
    <div class="card" v-if="user">
        <div class="card-header bline">
            <h3 class="card-title"><b>Bank Details</b></h3>
        </div>
        <div class="card-body" v-if="bankdetails.accountNumber !== null">
            <BankdetailsForm :bankdetails="bankdetails" />
        </div>
        <div class="card-body" v-if="bankdetails.accountNumber == null && !showForm">
            <div class="container text-center font-weight-bold mt-5">
                <p>No Bank details</p>
                <br>
                <div class="text-center">
                    <button class="btn btn-outline-success shadow-sm" @click="populateForm">
                        <span class="d-flex justify-content-center align-center">
                            <span class="mr-2">Add New</span>
                            <i style="font-size: 22px" class="fe fe-plus"></i>
                        </span>
                    </button>
                </div>
                <br><br>
            </div>
        </div>
        <AddBankdetails v-if="bankdetails.accountNumber == null && showForm" />
    </div>
</template>
<script>
import BankdetailsForm from "../forms/BankdetailsForm";
import AddBankdetails from "./AddBankdetails";

export default {
    components: {
        BankdetailsForm,
        AddBankdetails
    },

    data() {
        return {
            boxName: "Add Bank Details",
            boxType: "bankdetail",
            showForm: false
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        bankdetails() {
            return this.user.userInfo.userBankAccount;
        }
    },

    methods: {
        populateForm: function() {
            this.showForm = true;
        }
    }
};
</script>
<style>
</style>