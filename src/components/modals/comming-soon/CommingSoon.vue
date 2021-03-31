<template>
    <transition name="fade">
        <div class="overlay_div" tabindex="-1" v-if="commingSoonModal">
            <div class="overlay-close" @click="closeCommingSoonModal"></div>
            <div class="modal-dialog modal-dialog-centered" style="border-radius: 0px;">
                <div class="modal-content">
                    <div class="modal-header bg-light text-dark">
                        <h3 class="text-center font-weight-bold" style="text-transform: capitalize; font-size: 16px;"> Coming Soon </h3>
                        <div data-dismiss="modal" style="font-size: 19px; color: #000!important;" class="close text-dark" @click="closeCommingSoonModal"></div>
                    </div>
                    <div class="modal-body animated px-4">
                        <div class="card shadow text-center">
                            <div class="card-body">
                                <p><b>Coming Soon!!!</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            processing: false
        };
    },

    components: {
        // Paystack
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },

        commingSoonModal() {
            return this.$store.getters.commingSoonModal;
        }
    },

    methods: {
        closeCommingSoonModal: function() {
            this.$store.dispatch("closeCommingSoonModal");
        }
    }
};
</script>
<style scoped>
.close::before {
    content: "\ea00";
    color: #000 !important;
}
</style>