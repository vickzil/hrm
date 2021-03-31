<template>
    <div id="page_top" class="section-white ">
        <div class="container-fluid">
            <div class="page-header">
                <div class="left">
                    <h1 class="page-title"><b>{{topPageName}}</b></h1>
                </div>
                <div class="right">
                    <ul class="nav nav-pills">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Language</a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="javascript:void(0)"><img class="w20 mr-2" src="@/assets/images/flags/us.svg" alt="">English</a>
                            </div>
                        </li>
                    </ul>
                    <div class="notification d-flex">
                        <div class="dropdown d-flex">
                            <a class="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i class="fa fa-bell"></i><span class="badge badge-primary"></span></a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <ul class="list-unstyled feeds_widget" v-if="user && timelimes.length">
                                    <li v-for="timeline in timelines" :key="timeline">
                                        <div class="feeds-left"><i class="fa fa-check"></i></div>
                                        <div class="feeds-body">
                                            <h4 class="title text-danger">
                                                <router-link to="/timeline">
                                                    Issue Fixed
                                                </router-link>
                                                <small class="float-right text-muted">11:05</small>
                                            </h4>
                                            <small>WE have fix all Design bug with Responsive</small>
                                        </div>
                                    </li>
                                </ul>
                                <ul class="list-unstyled feeds_widget" v-else>
                                    <li>
                                        <div class="feeds-body">
                                            <small>No Notification</small>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="dropdown d-flex">
                            <a class="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-1" data-toggle="dropdown"><i class="fa fa-user"></i></a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                <router-link to="/profile" class="dropdown-item">
                                    <i class="dropdown-icon fe fe-user"></i> Profile
                                </router-link>
                                <router-link to="/settings" class="dropdown-item">
                                    <i class="dropdown-icon fe fe-settings"></i> Settings
                                </router-link>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="javascript:void(0)"><i class="dropdown-icon fe fe-help-circle"></i> Need help?</a>
                                <a class="dropdown-item" href="javascript:void(0)" @click="showLogout"><i class="dropdown-icon fe fe-log-out"></i> Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["topPageName"],
    computed: {
        user() {
            return this.$store.getters.user;
        },
        timelimes() {
            return this.user.userActivities;
        }
    },
    methods: {
        showLogout: function() {
            this.$store.dispatch("showLogoutModal");
        }
    }
};
</script>
<style>
</style>