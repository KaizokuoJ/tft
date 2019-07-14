<template>
  <div
    :class="{
      footer: !hasValidChampionBeenEntered,
      'footer-post-user-input': hasValidChampionBeenEntered
    }"
  >
    <EmailCaptureArea></EmailCaptureArea>
    <small class="text-muted d-block">
      Help me decide which features to build next
    </small>

    <a href="https://www.strawpoll.me/18313414" target="_blank">
      <button class="btn btn-primary btn-sm mt-2">
        Open Strawpoll
      </button>
    </a>
  </div>
</template>

<script>
import EmailCaptureArea from "./EmailCaptureArea";

export default {
  components: {
    EmailCaptureArea
  },
  props: ["hasValidChampionBeenEntered"]
};
</script>

<style>
.footer {
  margin-top: 8rem;
  margin-bottom: 1rem;
}
.footer-post-user-input {
  margin-top: 2rem;
  margin-bottom: 3rem;
}
</style>
