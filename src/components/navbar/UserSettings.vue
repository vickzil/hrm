<template>
    <div class="user_div" v-if="user">
        <h5 class="brand-name mb-4"><img src="@/assets/images/logo.jpeg" width="90px" height="auto" alt="logo"><a href="javascript:void(0)" class="user_btn close_bbtn" @click="closeUserNav($event)">
                <i class="icon-logout"></i>
            </a></h5>
        <div class="card">
            <div class="card-body">
                <div class="media">
                    <img class="avatar avatar-xl mr-3 profile_image" v-if="user.userInfo.photo" :src="user.userInfo.photo" alt="avatar">
                    <img class="avatar avatar-xl mr-3 profile_image" v-else src="@/assets/images/user.png" alt="avatar">
                    <div class="media-body">
                        <h5 class="m-0">{{user.userInfo.firstName}} {{user.userInfo.lastName}}</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Statistics</h3>
                <div class="card-options">
                </div>
            </div>
            <div class="card-body">
                <div class="text-center">
                    <div class="row">
                        <div class="col-9 pb-3">
                            <label class="mb-0">Balance</label>
                            <h4 class="font-20 font-weight-bold" v-if="user">₦{{addComma(userAmount)}}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/mixins";
import $ from "jquery";

export default {
    
    computed: {
        user() {
            return this.$store.getters.user;
        },
        userAmount() {
            return this.user.userWalletBalance.availableBalance;
        }
    },

    methods: {
        closeUserNav: function() {
            $(".user_div").removeClass("open");
        }
    },

    created() {
        if (document.querySelector(".page")) {
            var err = document.querySelector(".page");

            err.onclick = function() {
                err.classList.toggle("open");
            };
        }
    }
};
</script>
<style>
</style>