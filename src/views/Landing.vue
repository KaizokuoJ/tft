<template>
  <div>
    <div class="container">
      <LandingBanner v-if="!hasValidChampionBeenEntered" class="mb-5"></LandingBanner>
      <TeamCompositionBuilder @validChampionHasBeenEntered="hasValidChampionBeenEntered = true"></TeamCompositionBuilder>
        <Footer class="footer"></Footer>
    </div>
  </div>
</template>
<script>
import LandingBanner from "../components/LandingBanner.vue";
import TeamCompositionBuilder from "../components/TeamCompositionBuilder";
import Footer from "../components/Footer";

export default {
  data() {
    return {
      hasValidChampionBeenEntered: false
    }
  },
  components: {
    LandingBanner,
    TeamCompositionBuilder,
    Footer
  }
};
</script>
<style>
</style>
