<template>
    <div class="notificazion animated">
        <span class="alert_message_box">{{alertMessage}}</span>
        <span class="closebtn" @click="closeAlert">Ok</span>
    </div>
</template>
<script>
export default {
    computed: {
        alertStatus() {
            return this.$store.getters.alertStatus;
        },

        alertType() {
            return this.$store.getters.alertType;
        },

        alertMessage() {
            return this.$store.getters.alertMessage;
        }
    },

    methods: {
        closeAlert: function() {
            this.$store.dispatch("closeAlert");
        }
    }
};
</script>
<style>
.alert-error {
    background-color: #f44336 !important;
    color: #fff !important;
}

.alert-success {
    background-color: #45f987 !important;
    color: rgb(15, 4, 4) !important;
}

/* The close button */
.closebtn {
    margin-left: 22px;
    color: rgb(204, 213, 221);
    font-weight: bold;
    font-size: 11px;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 20px;
    background: #45494b;
    padding: 7px;
    border-radius: 6px;
    text-transform: capitalize !important;
    text-align: left;
}

/* When moving the mouse over the close button */
.closebtn:hover {
    color: white;
    background: #241515;
}

.notificazion {
    position: fixed;
    bottom: 20px;
    right: 10px;
    z-index: 100000000000000000000 !important;
    transition: var(--mainTransition);
    display: none;
    padding: 17px 17px 17px 12px;
    border-radius: 3px;
    background: #202124 !important;
    color: #fff !important;
    border: none;
    border-radius: 4px;
    font-weight: 400;
    box-shadow: 0 1px 3px 0 rgb(60 64 67 / 30%), 0 4px 8px 3px rgb(60 64 67 / 15%);
    -webkit-font-smoothing: antialiased;
}

.notificazion .alert_message_box {
    text-align: center;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    margin-right: 40px;
    cursor: pointer;
}

.bounceInRight {
    display: unset !important;
}
</style>