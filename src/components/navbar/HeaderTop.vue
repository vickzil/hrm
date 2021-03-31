<template>
    <div id="header_top" class="header_top" v-if="user">
        <div class="container">
            <div class="hleft">
                <a href="javascript:void(0)" to="/dashboard" class="header-brand" v-if="isNavActive == '/admin-home'">
                    <i class="fa fa-dashboard brand-logo"></i>
                </a>
                <router-link v-else to="/dashboard" class="header-brand">
                    <i class="fa fa-dashboard brand-logo"></i>
                </router-link>
                <a href="javascript:void(0)" class="nav-link user_btn">
                    <img @click="openUserDiv" class="avatar profile_image" v-if="user.userInfo.photo" :src="user.userInfo.photo" alt="" data-toggle="tooltip" data-placement="right" title="User Menu" />
                    <img @click="openUserDiv" class="avatar profile_image" v-else src="@/assets/images/user.png" alt="" data-toggle="tooltip" data-placement="right" title="User Menu" />
                </a>
                <div class="dropdown">
                    <a href="javascript:void(0)" class="nav-link icon" @click="showCommingSoonModal"><i class="fa fa-search" data-toggle="tooltip" data-placement="right" title="Search..."></i></a>
                    <a href="javascript:void(0)" class="nav-link icon create_page xs-hide" @click="showCommingSoonModal"><i class="fa fa-plus" data-toggle="tooltip" data-placement="right" title="Create New"></i></a>
                    <a href="javascript:void(0)" class="nav-link icon app_inbox" @click="showCommingSoonModal"><i class="fa fa-envelope" data-toggle="tooltip" data-placement="right" title="Inbox"></i></a>
                    <a href="javascript:void(0)" class="nav-link icon app_file xs-hide" @click="showCommingSoonModal"><i class="fa fa-folder" data-toggle="tooltip" data-placement="right" title="File Manager"></i></a>
                    <a href="javascript:void(0)" class="nav-link icon xs-hide" @click="showCommingSoonModal"><i class="fa fa-share-alt" data-toggle="tooltip" data-placement="right" title="Social Media"></i></a>
                    <a href="javascript:void(0)" class="nav-link icon xs-hide" @click="showCommingSoonModal"><i class="fa fa-bullhorn" data-toggle="tooltip" data-placement="right" title="Projects"></i></a>
                    <a href="javascript:void(0)" class="nav-link icon xs-hide" @click="showCommingSoonModal"><i class="fa fa-cloud-upload" data-toggle="tooltip" data-placement="right" title="Cloud Upload"></i></a>
                </div>
            </div>
            <div class="hright">
                <div class="dropdown">
                    <a href="javascript:void(0)" @click="toggleRightSideBar" class="nav-link icon settingbar"><i class="fa fa-gear" data-toggle="tooltip" data-placement="right" title="Settings"></i></a>
                    <a href="javascript:void(0)" @click="toggleOffcanvas" class="nav-link icon menu_toggle"><i class="fa  fa-align-left"></i></a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/mixins";
export default {
    computed: {
        user() {
            return this.$store.getters.user;
        },
        isNavActive() {
            return this.$store.getters.currentSitePage;
        }
    },
    methods: {
        toggleOffcanvas: function() {
            document.body.classList.toggle("offcanvas-active");
        },

        toggleRightSideBar: function() {
            var el = document.querySelector(".right_sidebar");
            el.classList.toggle("open");
        },
        openUserDiv: function() {
            var el = document.querySelector(".user_div");
            el.classList.toggle("open");
        },

        showCommingSoonModal: function() {
            this.$store.dispatch("showCommingSoonModal");
        }
    }
};
</script>
<style>
</style>