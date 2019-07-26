<template>
  <div class="email-capture-area mx-auto border-bottom">
    <p class="email-capture-text">
      Get an email ONLY when I release a new feature
    </p>
    <b-form-group>
      <b-input-group>
        <b-form-input
          placeholder="Enter email"
          v-model="email"
          @keyup.enter="submitEmailToEmailList()"
        >
        </b-form-input>
        <b-input-group-append>
          <b-button @click="submitEmailToEmailList()">Submit </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>
    <b-alert
      variant="success"
      @dismissed="wasUserEmailAddedToEmailList = false"
      :show="wasUserEmailAddedToEmailList"
      dismissible
      :fade="true"
      class="mt-3 w-75 mx-auto"
      >Success! I'll send you an email when I release a new feature :)
    </b-alert>
  </div>
</template>

<script>
import db from "../firebaseConfig";

export default {
  data() {
    return {
      email: "",
      wasUserEmailAddedToEmailList: false
    };
  },
  methods: {
    submitEmailToEmailList: function() {
      db.collection("emailAddresses")
        .doc(this.email)
        .set({
          email: this.email
        })
        .then(() => (this.wasUserEmailAddedToEmailList = true));
    }
  }
};
</script>

<style lang="scss">
.email-capture-area {
  width: 280px;
}
.email-capture-text {
  color: #a2abb3;
}
</style>
