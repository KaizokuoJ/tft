<template>
  <div>
<!--    <b-alert v-model="showDismissibleAlert" variant="success" dismissible>-->
<!--      The highest tier comps have been updated to reflect the new patch meta and-->
<!--      can now be used to rank. I'll be on top of keeping it up to date as the-->
<!--      meta continues to evolve on a daily basis.-->
<!--    </b-alert>-->
    <mq-layout mq="lg+">
      <img
        src="../assets/images/riverspriteEyeShadow.png"
        alt=""
        class="banner-logo"
      />
      <h1 class="title text-white font-weight-bold">TFT Cheat Sheets</h1>
      <h3 class="text-white">
        Find team compositions based on your current in-game champions
      </h3>
    </mq-layout>
    <mq-layout :mq="['sm', 'md']">
      <img
        src="../assets/images/riverspriteEyeShadow.png"
        alt=""
        class="sm-md-banner-logo"
      />
      <h1 class="sm-md-title text-white font-weight-bold">TFT Cheat Sheets</h1>
      <h6 class="text-white">
        Find team compositions based on your current in-game champions
      </h6>
    </mq-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDismissibleAlert: false
    };
  }
};
</script>

<style lang="scss">
.title {
  font-size: 52px;
}
.banner-logo {
  height: 300px;
}
.sm-md-title {
  font-size: 32px;
}
.sm-md-banner-logo {
  height: 150px;
}
</style>
