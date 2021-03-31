<template>
    <tr>
        <td>{{payment.name}}</td>
        <td>{{payment.description}}</td>
        <td>{{payment.amount}}</td>
        <td>{{payment.currency}}</td>
        <td>
            <button @click="pay(payment)" class="btn btn-success">Pay</button>
        </td>
    </tr>
</template>
<script>
export default {
    props: ["payment"],
    methods: {
        pay: function(payment) {
            this.$store.state.currentpayment = payment;

            this.$store.dispatch("showPageProcessing");

            setTimeout(() => {
                this.$store.dispatch("closePageProcessing");
                this.$store.dispatch("setMakePayment", true);
            }, 1800);
        }
    }
};
</script>
<style>
</style>