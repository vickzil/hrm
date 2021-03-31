<template>
    <div class="row clearfix">
        <div class="col-lg-12 col-md-6 col-sm-12">
            <div class="card">
                <div class="card-header">
                    <div class="buttons_groups text-center">
                        <button class="btn btn-outline-success mr-2 shadow" :class="topMarkerters && 'btn-success text-white'" @click="showTopMarketers">Top Marketers</button>
                        <button class="btn btn-outline-dark mr-2 shadow" :class="topCustomers && 'btn-dark text-light'" @click="showTopCustomers">Top Customers</button>
                        <button class="btn btn-outline-primary mr-2 shadow" :class="topProducts && 'btn-primary text-light'" @click="showTopProducts">Top Products</button>
                        <button class="btn btn-outline-secondary mr-2 shadow" :class="topexpenses && 'btn-secondary text-light'" @click="showTopExpenses">Top Expenses</button>
                    </div>
                </div>
                <TopmarketersCard v-if="topMarkerters" />
                <TopCustomersCard v-if="topCustomers" />
                <TopProductsCard v-if="topProducts" />
                <TopExpensesCard v-if="topexpenses" />
            </div>
        </div>
    </div>
</template>
<script>
import TopmarketersCard from "./TopmarketersCard";
import TopCustomersCard from "./TopCustomersCard";
import TopProductsCard from "./TopProductsCard";
import TopExpensesCard from "./TopExpensesCard";

export default {
    components: {
        TopmarketersCard,
        TopCustomersCard,
        TopProductsCard,
        TopExpensesCard
    },
    data() {
        return {
            topMarkerters: true,
            topCustomers: false,
            topProducts: false,
            topexpenses: false
        };
    },
    methods: {
        showTopMarketers: function() {
            this.topMarkerters = true;
            this.topCustomers = false;
            this.topProducts = false;
            this.topexpenses = false;
        },
        showTopCustomers: function() {
            this.topMarkerters = false;
            this.topCustomers = true;
            this.topProducts = false;
            this.topexpenses = false;
        },
        showTopProducts: function() {
            this.topMarkerters = false;
            this.topCustomers = false;
            this.topProducts = true;
            this.topexpenses = false;
        },
        showTopExpenses: function() {
            this.topMarkerters = false;
            this.topCustomers = false;
            this.topProducts = false;
            this.topexpenses = true;
        }
    }
};
</script>
<style scoped>
.card {
    box-shadow: 3px 6px 10px 0 rgb(0 102 245 / 7%);
}
</style>