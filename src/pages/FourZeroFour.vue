<template>
    <div class="account_body">
        <div class="signin">
            <div class="row zxc">
                <div class="col-md-6 signin-box dws">
                    <h2>OXFORD HRM PORTAL</h2>
                    <h4>404 Page</h4>
                    <div class="ruler"></div>
                    <p>Find us on</p>
                    <AccountSocialIcons />
                </div>
                <div class="col-md-6 signin-box text-center">
                    <Logo />
                    <h4 class="font-weight-bold" style="color: rgb(44, 37, 37); font-weight: 900;">404 Page</h4>
                    <div class="well" style="margin-top: 4%;">
                        <div class="card">
                            <div class="card-body">
                                <div class="display-3 text-muted mb-5"><i class="si si-exclamation"></i> 404</div>
                                <h1 class="h3 mb-3">Oops.. You just found an error page..</h1>
                                <p class="h6 text-muted font-weight-normal mb-3">We are sorry but our service is currently not available&hellip;</p>
                                <a class="btn btn-primary" href="javascript:history.back()" @click="hasHistory() ? $router.go(-1) : $router.push('/')"><i class="fe fe-arrow-left mr-2"></i>Go back</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AccountSocialIcons from "../components/extras/AccountSocialIcons";
import Logo from "../components/extras/Logo";
export default {
    components: {
        Logo,
        AccountSocialIcons
    },
    methods: {
        hasHistory: function() {
            return window.history.length > 2;
        }
    }
};
</script>