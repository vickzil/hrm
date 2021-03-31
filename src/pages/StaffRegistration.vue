/* eslint-disable */
<template>
    <div class="page" v-if="user">
        <PageHeader :topPageName="topPageName" />
        <div class="section-body">
            <div class="container-fluid">
                <div class="row clearfix">
                    <div class="col-md-12">
                        <div class="card mt-2">
                          <div class="card-body">
                            <StaffRegistrationForm />
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="section-body">
            <Footer />
        </div>
    </div>
</template>
<script>
import PageHeader from "@/components/header/PageHeader";
import Footer from "../components/footer/Footer";
import StaffRegistrationForm from "../components/forms/StaffRegistrationForm"


export default {
    name: "Home",
    components: {
        PageHeader,
        StaffRegistrationForm,
        Footer
    },

    data() {
        return {
            topPageName: "Oxfordvest onboarding",
        };
    },
    methods: {
        
        removeOffcanvas: function() {
            document.body.classList.remove("offcanvas-active");
        }
    },

    mounted() {
        this.$store.dispatch("currentSitePage", this.$router.history.current.path);
        this.$store.dispatch("closePageLoading");
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch("showPageLoading");
        this.removeOffcanvas();
        next();
    }
};
</script>
<style scoped></style>