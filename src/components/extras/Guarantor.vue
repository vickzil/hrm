<template>
    <div class="card">
        <div class="card-header bline">
            <h3 class="card-title"><b>Guarantor</b></h3>
            <div class="page-options d-flex">
                <button v-if="guarantors.length > 0" class="btn mr-2 d-flex justify-content-center align-center shadow-sm" @click="showGuarantorModal">
                    <span class="mr-2">Add New</span>
                    <i style="font-size: 22px" class="fe fe-plus" data-toggle="tooltip" title="" data-original-title="Add School History"></i>
                </button>
            </div>
        </div>
        <div class="card-body" v-if="guarantors.length">
            <GuarantorsForm v-for="guarantor in guarantors" :key="guarantor.id" :guarantor="guarantor" />
        </div>
        <div class="card-body" v-else>
            <div class="container text-center">
                <AddItemBox :boxName="boxName" :boxType="boxType" />
            </div>
        </div>
    </div>
</template>
<script>
import GuarantorsForm from "../forms/GuarantorsForm";
import AddItemBox from "./AddItemBox";
export default {
    components: {
        GuarantorsForm,
        AddItemBox
    },
    data() {
        return {
            boxName: "Add Guarantor",
            boxType: "GUARANTOR"
        };
    },
    computed: {
        user() {
            return this.$store.getters.user || null;
        },

        guarantors() {
            return this.user.userInfo.userGuarantors;
        }
    },

    methods: {
        showGuarantorModal: function() {
            this.$store.dispatch("showGuarantorModal");
        }
    }
};
</script>
<style>
</style>