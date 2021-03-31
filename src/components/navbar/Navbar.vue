/* eslint-disable */ /*eslint no-unused-vars: ["error", {"ards": "none"}]*/
<template>
	<!--###################### NAVBAR ##################### -->
	<div>
		<HeaderTop />
		<RightSideBar />
		<UserSettings />
		<LeftSideBar />
	</div>
</template>

<script>

import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import UserSettings from './UserSettings'
import HeaderTop from './HeaderTop'

export default {
	name: "Navbar",
	components: {
		LeftSideBar,
		RightSideBar,
		UserSettings,
		HeaderTop
	},
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25 ease-out;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>
