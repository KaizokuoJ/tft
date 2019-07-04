<template>
  <div class="container">
    <LandingBanner class="mb-5"></LandingBanner>
    <TeamCompositionBuilder></TeamCompositionBuilder>
  </div>
</template>
<script>
import LandingBanner from "../components/LandingBanner.vue";
import TeamCompositionBuilder from "../components/TeamCompositionBuilder";
export default {
  components: {
    LandingBanner,
    TeamCompositionBuilder
  }
};
</script>
