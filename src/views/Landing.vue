<template>
  <div class="container">
    <LandingBanner class="mb-5"></LandingBanner>
    <TeamCompositionTool></TeamCompositionTool>
  </div>
</template>
<script>
import LandingBanner from "../components/LandingBanner.vue";
import TeamCompositionTool from "../components/TeamCompositionTool";
export default {
  components: {
    LandingBanner,
    TeamCompositionTool
  }
};
</script>
