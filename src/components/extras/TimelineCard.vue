<template>
    <div class="timeline_item ">
        <img class="tl_avatar" src="@/assets/images/xs/avatar1.jpg" alt="" />
        <span><a href="javascript:void(0);">Elisse Joson</a> San Francisco, CA <small class="float-right text-right">20-April-2019 - Today</small></span>
        <h6 class="font600">Hello, 'Im a single div responsive timeline without media Queries!</h6>
        <div class="msg">
            <p>I'm speaking with myself, number one, because I have a very good brain and I've said a lot of things. I write the best placeholder text, and I'm the biggest developer on the web card she has is the Lorem card.</p>
            <a href="javascript:void(0);" class="mr-20 text-muted"><i class="fa fa-heart text-pink"></i> 12 Love</a>
            <a class="text-muted" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><i class="fa fa-comments"></i> 1 Comment</a>
            <div class="collapse p-4 section-gray mt-2" id="collapseExample">
                <form class="well">
                    <div class="form-group">
                        <textarea rows="2" class="form-control no-resize" placeholder="Enter here for tweet..."></textarea>
                    </div>
                    <button class="btn btn-primary">Submit</button>
                </form>
                <ul class="recent_comments list-unstyled mt-4 mb-0">
                    <li>
                        <div class="avatar_img">
                            <img class="rounded img-fluid" src="@/assets/images/xs/avatar4.jpg" alt="">
                        </div>
                        <div class="comment_body">
                            <h6>Donald Gardner <small class="float-right font-14">Just now</small></h6>
                            <p>Lorem ipsum Veniam aliquip culpa laboris minim tempor</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {

    name: 'TimelineCard',
    props: ["timeline"],

    data() {
        return {

        }
    }
}
</script>
<style lang="css" scoped>
</style>