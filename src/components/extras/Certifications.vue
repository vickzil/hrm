<template>
    <div class="card">
        <div class="card-header bline">
            <h3 class="card-title"><b>certifications</b></h3>
            <div class="page-options d-flex">
                <button v-if="certifications.length > 0" class="btn mr-2 d-flex justify-content-center align-center shadow-sm" @click="showCertificationModal">
                    <span class="mr-2">Add New</span>
                    <i style="font-size: 22px" class="fe fe-plus" data-toggle="tooltip" title="" data-original-title="Add School History"></i>
                </button>
            </div>
        </div>
        <div class="card-body" v-if="certifications.length">
            <CertificationForm v-for="certification in certifications" :key="certification.id" :certification="certification" />
        </div>
        <div class="card-body" v-else>
            <div class="container text-center">
                <AddItemBox :boxName="boxName" :boxType="boxType" />
            </div>
        </div>
    </div>
</template>
<script>
import CertificationForm from '../forms/CertificationForm'
import AddItemBox from './AddItemBox'
export default {
    components: {
        CertificationForm,
        AddItemBox
    },
    data() {
        return {
            boxName: "Add Certifications",
            boxType: "CERTIFICATIONS",
        }
    },
    computed: {
        user() {
            return this.$store.getters.user || null;
        },

        certifications() {
            return this.user.userInfo.userCertifications;
        },
    },

    methods: {
        showCertificationModal: function() {
            this.$store.dispatch('showCertificationModal');
        },
    }
}
</script>
<style>
</style>