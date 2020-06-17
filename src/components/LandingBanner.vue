<template>
  <div>
    <!--    <b-alert v-model="showDismissibleAlert" variant="success" dismissible>-->
    <!-- Write news/message to users here and uncomment -->
    <!--    </b-alert>-->

    <img
      src="../assets/images/riverspriteEyeShadow.png"
      alt=""
      class="banner-logo"
    />
    <h1 class="title text-white font-weight-bold">TFT Cheat Sheets</h1>
    <h3
      class="text-white"
      :class="{
        h6: $mq === 'md' || $mq === 'sm',
        h3: $mq === 'xxl' || $mq === 'xl' || $mq === 'lg'
      }"
    >
      Find team compositions based on your current in-game champions
    </h3>
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

<style lang="scss" scoped>
.title {
  font-size: 52px;
}
.banner-logo {
  height: 300px;
}

@media screen and (max-width: 768px) {
  .title {
    font-size: 32px;
  }
  .banner-logo {
    height: 150px;
  }
}
</style>
