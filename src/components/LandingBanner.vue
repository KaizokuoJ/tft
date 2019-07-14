<template>
  <div>
    <mq-layout mq="lg+">
      <img
        src="../assets/images/riverspriteEyeShadow.png"
        alt=""
        class="banner-logo"
      />
      <h1 class="title text-white font-weight-bold">TFT Cheat Sheets</h1>
      <h3 class="text-white">
        Find meta team compositions based on your current in-game champions
      </h3> </mq-layout
    >
    <mq-layout :mq="['sm', 'md']">
      <img
        src="../assets/images/riverspriteEyeShadow.png"
        alt=""
        class="sm-md-banner-logo"
      />
      <h1 class="sm-md-title text-white font-weight-bold">TFT Cheat Sheets</h1>
      <h6 class="text-white">
        Find meta team compositions based on your current in-game champions
      </h6>
    </mq-layout>
  </div>
</template>

<script>
export default {};
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
