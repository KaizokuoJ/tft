<template>
  <div class="test">
    <div class="container">
      <LandingBanner
        v-if="!hasValidChampionBeenEntered"
        class="mb-5"
      ></LandingBanner>
      <TeamCompositionBuilder
        @validChampionHasBeenEntered="hasValidChampionBeenEntered = true"
      ></TeamCompositionBuilder>
      <FooterLayout
        :hasValidChampionBeenEntered="hasValidChampionBeenEntered"
        class="footer"
      ></FooterLayout>
    </div>
  </div>
</template>
<script>
import LandingBanner from "../components/LandingBanner.vue";
import TeamCompositionBuilder from "../components/TeamCompositionBuilder";
import FooterLayout from "../components/FooterLayout";

export default {
  data() {
    return {
      hasValidChampionBeenEntered: false
    };
  },
  components: {
    LandingBanner,
    TeamCompositionBuilder,
    FooterLayout
  }
};
</script>
