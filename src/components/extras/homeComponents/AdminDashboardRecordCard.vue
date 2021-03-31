<template>
    <div class="row clearfix">
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card bg-pink">
                <div class="card-body text-light">
                    <div class="widgets2">
                        <div class="state">
                            <h6>Add Staffs</h6>
                        </div>
                        <div class="icon">
                            <i class="fa fa-user-plus"></i>
                        </div>
                    </div>
                    <a href="javascript:void(0)" @click="showCommingSoonModal" class="btn btn-light btn-sm">Add Staff</a>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card bg-purple">
                <div class="card-body text-light">
                    <div class="widgets2">
                        <div class="state">
                            <h6>Total Staffs</h6>
                            <h2 class="font-18 mt-2">342</h2>
                        </div>
                        <div class="icon">
                            <i class="fa fa-users"></i>
                        </div>
                    </div>
                    <div class="progress progress-sm">
                        <div class="progress-bar bg-light" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card bg-primary">
                <div class="card-body text-light">
                    <div class="widgets2">
                        <div class="state">
                            <h6>Total Expenses</h6>
                            <h2 class="font-18 mt-2">6765466</h2>
                        </div>
                        <div class="icon">
                            <i class="fa fa-money"></i>
                        </div>
                    </div>
                    <div class="progress progress-sm">
                        <div class="progress-bar bg-light" role="progressbar" aria-valuenow="31" aria-valuemin="0" aria-valuemax="100" style="width: 31%;"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="card" style="background: #0350a3">
                <div class="card-body text-light">
                    <div class="widgets2">
                        <div class="state">
                            <h6>Total Salaries</h6>
                            <h2 class="font-18 mt-2">3224445</h2>
                        </div>
                        <div class="icon">
                            <i class="fa fa-wpforms"></i>
                        </div>
                    </div>
                    <div class="progress progress-sm">
                        <div class="progress-bar bg-light" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100" style="width: 78%;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "AdminDashboardRecordCard",

    methods: {
        showCommingSoonModal: function() {
            this.$store.dispatch("showCommingSoonModal");
        }
    }
};
</script>
<style lang="css" scoped>
.card {
    box-shadow: 3px 6px 10px 0 rgb(0 102 245 / 7%);
}
</style>