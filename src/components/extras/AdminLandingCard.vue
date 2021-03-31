<template>
    <div class="card">
        <a href="javascript:void(0)" class="card-body" @click="showCommingSoon">
            <div class="dimmer active" v-if="loader">
                <div class="loader"></div>
                <div class="dimmer-content py-5">
                </div>
            </div>
            <i class="text-gray" :class="card.icon" v-if="!commingSoon && !loader"></i>
            <p v-if="!commingSoon && !loader">{{card.title}}</p>
            <div v-if="commingSoon && !loader">
                <div class="font-15 font-weight-bold text-danger py-4 mt-2">Coming Soon</div>
            </div>
        </a>
    </div>
</template>
<script>
export default {
    props: ["card"],
    data() {
        return {
            commingSoon: false,
            loader: false
        };
    },
    methods: {
        showCommingSoon: function() {
            this.loader = true;

            setTimeout(() => {
                this.commingSoon = true;
                this.loader = false;
            }, 2000);

            setTimeout(() => {
                this.commingSoon = false;
                this.loader = false;
            }, 4000);
        }
    }
};
</script>
<style>
.admin_landing_page_grid .card {
    box-shadow: 3px 6px 10px 0 rgb(0 102 245 / 7%);
}

.admin_landing_page_grid .card:hover {
    transform: scale(1.1);
}

.admin_landing_page_grid i {
    font-size: 55px;
    font-weight: lighter;
}

.admin_landing_page_grid p {
    font-size: 18px;
    font-weight: 400;
    margin-top: 12px;
    color: rgb(43, 43, 43);
}

.dark-mode .admin_landing_page_grid i {
    color: #fff !important;
}

.dark-mode .admin_landing_page_grid p {
    color: #fff;
}

@media screen and (max-width: 1200px) {
    .admin_landing_page_grid i {
        font-size: 50px;
    }

    .admin_landing_page_grid p {
        font-size: 17px;
    }
}

@media screen and (max-width: 450px) {
    .admin_landing_page_grid i {
        font-size: 38px;
    }

    .admin_landing_page_grid p {
        font-size: 16px;
    }
}
</style>