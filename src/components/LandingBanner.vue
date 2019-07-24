<template>
  <div>
    <b-alert v-model="showDismissibleAlert" variant="success" dismissible>
      Unfortunately I can't update the meta compositions to account for this weeks' patch until Friday. I've been on a holiday
        and I'll be working on improving the website again once I return :) Enjoy the new patch!
    </b-alert>
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
      showDismissibleAlert: true
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
