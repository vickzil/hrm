<template>
    <div class="card">
        <div class="card-header bline">
            <h3 class="card-title"><b>Work History</b></h3>
            <div class="page-options d-flex">
                <button v-if="workHistories.length > 0" class="btn bg-midnight mr-2 d-flex justify-content-center align-center shadow-sm" @click="showWorkHistoryModal">
                    <span class="mr-2">Add New</span>
                    <i style="font-size: 22px" class="fe fe-plus" data-toggle="tooltip" title="" data-original-title="Add Work History"></i>
                </button>
            </div>
        </div>
        <div class="card-body" v-if="workHistories.length">
            <WorkHistoryForm v-for="workHistory in workHistories" :key="workHistory.id" :workHistory="workHistory" />
        </div>
        <div class="card-body" v-else>
            <div class="container text-center">
                <AddItemBox :boxName="boxName" :boxType="boxType" />
            </div>
        </div>
    </div>
</template>
<script>
import WorkHistoryForm from "../forms/WorkHistoryForm";
import AddItemBox from "./AddItemBox";

export default {
    components: {
        WorkHistoryForm,
        AddItemBox
    },
    data() {
        return {
            boxName: "Add Work History",
            boxType: "WORK"
        };
    },
    computed: {
        user() {
            return this.$store.getters.user || null;
        },
        userAmount() {
            return this.$store.getters.userAmount;
        },

        checkGender() {
            return this.user.gender == "male" ? true : false;
        },
        countries() {
            return this.$store.getters.countries;
        },

        workHistories() {
            return this.$store.getters.user.userInfo.userWorkHistories;
        }
    },

    methods: {
        showWorkHistoryModal: function() {
            this.$store.dispatch("showWorkHistoryModal");
        }
    }
};
</script>
<style>
</style>