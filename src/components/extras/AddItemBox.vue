<template>
    <div class="card_add_item" @click="handleClick">
        <i class="fe fe-plus" style="font-size: 19px;"></i>
        <p>{{boxName}}</p>
    </div>
</template>
<script>
export default {
    props: ["boxName", "boxType"],
    methods: {
        handleClick: function() {
            if (this.boxType == "EDUCATION") {
                this.$store.dispatch("showSchoolHistoryModal");
                return;
            }
            if (this.boxType == "WORK") {
                this.$store.dispatch("showWorkHistoryModal");
                return;
            }
            if (this.boxType == "CERTIFICATIONS") {
                this.$store.dispatch("showCertificationModal");
                return;
            }
            if (this.boxType == "GUARANTOR") {
                this.$store.dispatch("showGuarantorModal");
                return;
            }
            if (this.boxType == "REFEREE") {
                this.$store.dispatch("showRefereeModal");
                return;
            }
        }
    }
};
</script>
<style>
.card_add_item {
    max-width: 45.33333%;
    margin: 20px auto;
    padding: 20px 25px;
    border-radius: 8px;
    min-height: 200px;
    border: 1px dotted rgba(101, 16, 10, 0.548);
    background: #fff;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: all 400ms ease-in-out;
    cursor: pointer;
}

.card_add_item:hover {
    transform: scale(0.9);

    border: 1px solid rgba(148, 142, 142, 0.747);
}

.card_add_item i {
    font-weight: 800;
}

.card_add_item p {
    margin-top: 15px;
    font-weight: 600;
}

.dark-mode .card_add_item {
    background: #2b3035;
    color: #babdbf !important;
    border: 1px solid #babdbf;
}

@media screen and (max-width: 800px) {
    .card_add_item {
        max-width: 75.33333%;
        margin: 20px auto;
        padding: 20px 25px;
        min-height: 200px;
    }
}

@media screen and (max-width: 450px) {
    .card_add_item {
        max-width: 80.33333%;
        min-height: 130px;
    }
}
</style>