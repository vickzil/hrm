<template>
    <div class="row clearfix">
        <div class="col-lg-6 col-md-12 col-6">
            <div class="card">
                <div class="card-status bg-orange"></div>
                <div class="card-header">
                    <h3 class="card-title">Timeline</h3>
                </div>
                <div class="card-body">
                    <ul class="new_timeline mt-3">
                        <li>
                            <div class="bullet pink"></div>
                            <div class="time">11:00am</div>
                            <div class="desc">
                                <h3>Attendance</h3>
                                <h4>Computer Class</h4>
                            </div>
                        </li>
                        <li>
                            <div class="bullet orange"></div>
                            <div class="time">1:30pm</div>
                            <div class="desc">
                                <h3>Lunch Break</h3>
                            </div>
                        </li>
                        <li>
                            <div class="bullet green"></div>
                            <div class="time">2:38pm</div>
                            <div class="desc">
                                <h3>Finish</h3>
                                <h4>Go to Home</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-sm-12">
            <div class="card">
                <div class="card-status bg-orange"></div>
                <div class="card-header">
                    <h3 class="card-title">Feeds Notifications</h3>
                </div>
                <div class="card-body">
                    <ul class="list-unstyled feeds_widget">
                        <li>
                            <div class="feeds-left"><i class="fa fa-user"></i></div>
                            <div class="feeds-body">
                                <h4 class="title">New Staff Registration <small class="float-right text-muted">10:45</small></h4>
                                <small>I feel great! Thanks team</small>
                            </div>
                        </li>
                        <li>
                            <div class="feeds-left"><i class="fa fa-question-circle"></i></div>
                            <div class="feeds-body">
                                <h4 class="title text-warning">2 pending payments <small class="float-right text-muted">10:50</small></h4>
                                <small>Your connection is not private</small>
                            </div>
                        </li>
                        <li>
                            <div class="feeds-left"><i class="fa fa-check"></i></div>
                            <div class="feeds-body">
                                <h4 class="title text-danger">10 successfully payments confirmed <small class="float-right text-muted">11:05</small></h4>
                                <small>WE have fix all Design bug with Responsive</small>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.card {
    box-shadow: 3px 6px 10px 0 rgb(0 102 245 / 7%);
}
</style>