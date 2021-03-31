<template>
    <div class="card">
        <div class="card-header bline">
            <h3 class="card-title"><b>Education History</b></h3>
            <div class="page-options d-flex">
                <button v-if="schoolHistories.length > 0" class="btn mr-2 d-flex justify-content-center align-center shadow-sm" @click="showSchoolHistoryModal">
                    <span class="mr-2">Add New</span>
                    <i style="font-size: 22px" class="fe fe-plus" data-toggle="tooltip" title="" data-original-title="Add School History"></i>
                </button>
            </div>
        </div>
        <div class="card-body" v-if="schoolHistories.length">
            <SchoolHistoryForm v-for="schoolHistory in schoolHistories" :key="schoolHistory.id" :schoolHistory="schoolHistory" />
        </div>
        <div class="card-body" v-else>
            <div class="container text-center">
                <AddItemBox :boxName="boxName" :boxType="boxType" />
            </div>
        </div>
    </div>
</template>
<script>
import SchoolHistoryForm from "../forms/SchoolHistoryForm";
import AddItemBox from "./AddItemBox";
export default {
    components: {
        SchoolHistoryForm,
        AddItemBox
    },
    data() {
        return {
            boxName: "Add Education History",
            boxType: "EDUCATION"
        };
    },
    computed: {
        user() {
            return this.$store.getters.user || null;
        },
        schoolHistories() {
            return this.user.userInfo.userSchoolHistories;
        }
    },

    methods: {
        showSchoolHistoryModal: function() {
            this.$store.dispatch("showSchoolHistoryModal");
        }
    }
};
</script>
<style>
</style>