<template>
    <form style="width: 100%">
        <div class="card">
            <div class="card-header bline">
                <h3 class="card-title"><b>Staff ID Card</b></h3>
                <div class="page-options d-flex">
                </div>
            </div>
            <div class="card-body">
                <div class="row clearfix">
                    <div class="col-sm-12 col-md-6 mx-auto">
                        <div class="id_card">
                            <div class="image_grid">
                                <img v-if="user.userInfo.photo" :src="user.userInfo.photo" class="profile_image" :alt="user.userInfo.photo">
                                <img v-else src="@/assets/images/user.png" class="profile_image">
                                <img id='barcode' src="https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld" alt="" title="HELLO" width="50" height="50" />
                            </div>
                            <h1 style="text-transform: capitalize!important;">{{user.userInfo.firstName}} {{user.userInfo.middleName}} {{user.userInfo.lastName}}</h1>
                            <table>
                                <tr>
                                    <td><strong>Staff Code</strong></td>
                                    <td>{{user.userInfo.code}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Designation</strong></td>
                                    <td><span v-for="role in user.userInfo.roles" :key="role">
                                            {{role}}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>Gender</strong></td>
                                    <td>Male</td>
                                </tr>
                                <tr>
                                    <td><strong>D.O.B</strong></td>
                                    <td>{{removeTimeZone(user.userInfo.dateOfBirth)}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Group</strong></td>
                                    <td>{{user.userInfo.groupName.toLowerCase()}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Subsidiary</strong></td>
                                    <td>{{user.userInfo.subsidiaryName.toLowerCase()}}</td>
                                </tr>
                                <tr>
                                    <td><strong>Contact</strong></td>
                                    <td>{{user.userInfo.phoneNumber}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </form>
</template>
<script>
import "@/assets/css/idcard.css";
import "@/mixins";

export default {
    computed: {
        user() {
            return this.$store.getters.user;
        },
        userAmount() {
            return this.$store.getters.userAmount;
        },

        checkGender() {
            return this.user.gender == "male" ? true : false;
        },
        countries() {
            return this.$store.getters.countries;
        }
    },

    methods: {
        changeProfileImage: function(event) {
            if (event.target.files[0]) {
                var reader = new FileReader();

                reader.onload = function(event) {
                    let images = document.querySelectorAll(".profile_image");

                    images.forEach(image => {
                        image.setAttribute("src", event.target.result);
                    });
                };

                reader.readAsDataURL(event.target.files[0]);
            }
        }
    }
};
</script>
<style>
</style>