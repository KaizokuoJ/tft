<template>
  <div>
    <div class="container">
      <LandingBanner class="mb-5"></LandingBanner>
      <TeamCompositionBuilder></TeamCompositionBuilder>
        <Footer class="footer"></Footer>
    </div>
  </div>
</template>
<script>
import LandingBanner from "../components/LandingBanner.vue";
import TeamCompositionBuilder from "../components/TeamCompositionBuilder";
import Footer from "../components/Footer";

export default {
  components: {
    LandingBanner,
    TeamCompositionBuilder,
    Footer
  }
};
</script>
<style>
</style>
