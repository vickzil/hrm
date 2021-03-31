<template>
    <div class="card">
        <div class="card-header bline">
            <h3 class="card-title"><b>Referees</b></h3>
            <div class="page-options d-flex">
                <button v-if="referees.length > 0" class="btn mr-2 d-flex justify-content-center align-center shadow-sm" @click="showRefereeModal">
                    <span class="mr-2">Add New</span>
                    <i style="font-size: 22px" class="fe fe-plus"></i>
                </button>
            </div>
        </div>
        <div class="card-body" v-if="referees.length">
            <RefereeForm v-for="referee in referees" :key="referee.id" :referee="referee" />
        </div>
        <div class="card-body" v-else>
            <div class="container text-center">
                <AddItemBox :boxName="boxName" :boxType="boxType" />
            </div>
        </div>
    </div>
</template>
<script>
import RefereeForm from "../forms/RefereeForm";
import AddItemBox from "./AddItemBox";
export default {
    components: {
        RefereeForm,
        AddItemBox
    },
    data() {
        return {
            boxName: "Add Referee",
            boxType: "REFEREE"
        };
    },
    computed: {
        user() {
            return this.$store.getters.user || null;
        },

        referees() {
            return this.user.userInfo.refrees;
        }
    },

    methods: {
        showRefereeModal: function() {
            this.$store.dispatch("showRefereeModal");
        }
    }
};
</script>
<style>
.card-collapsed .card-header {
    -webkit-box-shadow: 0 0.05rem 0.01rem rgba(75, 75, 90, 0.075);
    box-shadow: 0 0.05rem 0.01rem rgba(75, 75, 90, 0.075);
    background: #f5f6f76e !important;
}
</style>