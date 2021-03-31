<template>
    <div id="left-sidebar" class="sidebar ">
        <h5 class="brand-name">HRM </h5>
        <nav id="left-sidebar-nav" class="sidebar-nav">
            <ul class="metismenu">
                <li class="g_heading"></li>
                <div v-if="user && (isAdmin || isSuperAdmin)">
                    <li :class="isNavActive === '/admin-home' && 'active'" @click="hideSidebar">
                        <router-link to="/admin-home" exact>
                            <i class="icon-layers"></i><span class="nav_span">Home</span>
                        </router-link>
                    </li>
                </div>
                <div v-if="isNavActive !== '/admin-home'">
                    <li :class="isNavActive === '/dashboard' && 'active'">
                        <router-link to="/dashboard">
                            <i class="icon-home"></i><span class="nav_span">Dashboard</span>
                        </router-link>
                    </li>
                    <div v-if="user && (isStaff)">
                        <li><a href="javascript:void(0)" @click="showCommingSoonModal"><i class="icon-bar-chart"></i><span class="nav_span"> Sales</span></a></li>
                    </div>
                    <li :class="isNavActive === '/payment' && 'active'">
                        <router-link to="/payment">
                            <i class="icon-credit-card"></i><span class="nav_span">Payment</span>
                        </router-link>
                    </li>
                    <li :class="isNavActive === '/profile' && 'active'">
                        <router-link to="/profile">
                            <i class="icon-user"></i><span class="nav_span">Profile</span>
                        </router-link>
                    </li>
                    <li :class="isNavActive === '/settings' && 'active'">
                        <router-link to="/settings">
                            <i class="icon-settings"></i><span class="nav_span">Settings</span>
                        </router-link>
                    </li>
                    <div v-if="user && (isAdmin || isSuperAdmin)">
                        <li><a href="javascript:void(0)" @click="showCommingSoonModal"><i class="icon-bar-chart"></i><span class="nav_span"> Staff</span></a></li>
                    </div>
                    <div v-if="user && (isStaff || isAdmin)">
                        <li><a href="javascript:void(0)" @click="showCommingSoonModal"><i class="icon-book-open"></i><span class="nav_span"> Reports</span></a></li>
                    </div>
                    <div v-if="user && isStaff">
                        <li><a href="javascript:void(0)" @click="showCommingSoonModal"><i class="fa fa-building-o"></i><span class="nav_span"> Company</span></a></li>
                    </div>
                    <li :class="isNavActive === '/timeline' && 'active'">
                        <router-link to="/timeline">
                            <i class="fe fe-clock"></i><span class="nav_span">Timeline</span>
                        </router-link>
                    </li>
                    
                    <div>
                        <li><a href="javascript:void(0)" @click="showCommingSoonModal"><i class="icon-directions"></i><span class="nav_span"> Notice</span></a></li>
                        <li><a href="javascript:void(0)" @click="showCommingSoonModal"><i class="fa fa-money"></i><span class="nav_span"> Loan</span></a></li>
                    </div>
                    <div v-if="user && (isSuperAdmin || isAdmin || isHr)">
                        <li><a href="javascript:void(0)" @click="showCommingSoonModal"><i class="icon-calendar"></i><span class="nav_span"> Payroll</span></a></li>
                        <li><a href="javascript:void(0)" @click="showCommingSoonModal"><i class="icon-drawer"></i><span class="nav_span"> Leave</span></a></li>
                    </div>
                    <li :class="isNavActive === '/staff-oxfordvest' && 'active'">
                        <router-link to="/staff-oxfordvest">
                            <i class="fa fa-angle-double-right"></i><span class="nav_span">Oxfordvest</span>
                        </router-link>
                    </li>
                </div>
            </ul>
        </nav>
    </div>
</template>
<script>
import "@/mixins";
export default {
    computed: {
        isNavActive() {
            return this.$store.getters.currentSitePage;
        }
    },

    methods: {
        showCommingSoonModal: function() {
            this.$store.dispatch("showCommingSoonModal");
        }
    }
};
</script>
<style>
.nav_span {
    margin-left: 13px !important;
}
</style>