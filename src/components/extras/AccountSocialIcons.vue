<template>
  <div class="mb-5 social_icons">
        <a :href="facebookUrl" target="_blank" class="fa fa-facebook"></a>
        <a :href="twitterUrl" target="_blank" class="fa fa-twitter"></a>
        <a :href="instagramUrl" target="_blank" class="fa fa-instagram"></a>
    </div>
</template>

<script>
export default {

	data() {
		return {
			facebookUrl: "http://facebook.com/Oxford Octopus",
			twitterUrl: "https://twitter.com/Oxford_Octopus",
			instagramUrl: "https://www.instagram.com/Oxford_Octopus"
		}
	}

}
</script>

<style>

</style>