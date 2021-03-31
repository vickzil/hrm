/* eslint-disable */
<template>
  <!-- #################### FOOTER ############################## -->

  <footer class="footer">
    <br><br><br>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 col-sm-12 text-center">
                    Copyright © {{getCurrentYear()}} <a href="javascript:void(0)">HRM</a>.
                </div>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
  name: "Footer",
  methods: {
    getCurrentYear() {
      let date = new Date();
      return date.getFullYear();
    }
  }
};
</script>

<style></style>
