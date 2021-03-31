<template>
    <div class="row clearfix" v-if="user">
        <div class="col-lg-4 col-md-12">
            <div class="card profile-header">
                <div class="body text-center">
                    <img v-if="user.userInfo.photo" :src="user.userInfo.photo" style="width: 140px; height: 140px;" class="rounded-circle profile_image" alt="">
                    <img v-else src="@/assets/images/user.png" style="width: 140px; height: 140px;" class="rounded-circle profile_image" alt="">
                    <div class="mt-4">
                        <h5 class="mb-3">
                            <span style="text-transform: capitalize;">
                                <strong>{{user.userInfo.firstName}} </strong> {{user.userInfo.middleName}} {{user.userInfo.lastName}} </span>
                        </h5>
                        <span>
                            <span class="badge badge-success" style="background: green!important;" v-for="(role, index) in user.userInfo.roles" :key="role">
                                <span v-if="index == 0">{{role}}</span>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-8 col-md-12">
            <div class="card">
                <div class="header">
                </div>
                <div class="body">
                    <div class="row">
                        <div class="col-md-6 col-sm-12">
                            <small class="text-muted">Staff Code: </small>
                            <p v-if="user.userInfo.code">
                                <span>
                                    {{user.userInfo.code}}
                                </span>
                            </p>
                            <small class="text-muted">Email address: </small>
                            <p v-if="user.userInfo.email">{{user.userInfo.email}}</p>
                            <small class="text-muted">Mobile: </small>
                            <p v-if="user">{{user.userInfo.phoneNumber}}</p>
                            <small class="text-muted">Address: </small>
                            <p v-if="user">{{user.userInfo.homeAddress}}</p>
                            <p v-else class="text-secondary">No Address Yet</p>
                        </div>
                        <div class="col-md-6 col-sm-12">
                            <small class="text-muted">Date of Birthday: </small>
                            <p v-if="user">{{removeTimeZone(user.userInfo.dateOfBirth)}}</p>
                            <small class="text-muted">Group: </small>
                            <p v-if="user">{{user.userInfo.groupCode}}</p>
                            <small class="text-muted">Subsidiary: </small>
                            <p v-if="user">{{user.userInfo.subsidiaryCode}}</p>
                            <small class="text-muted">BVN: </small>
                            <p v-if="user">{{user.userInfo.bvn}}</p>
                        </div>
                    </div>
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
        }
    }
};
</script>
<style>
</style>