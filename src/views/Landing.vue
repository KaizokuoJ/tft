<template>
  <div class="container">
    <LandingBanner></LandingBanner>
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
