<template>
  <div class="text-white mt-5">
    <b-container>
      <b-row>
        <b-col md="4" offset="4">
          <b-form @submit.prevent="createTeamComposition()">
            <b-form-group>
              <b-form-input v-model="champions.champion1"> </b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="champions.champion2"> </b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="champions.champion3"> </b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="champions.champion4"> </b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="champions.champion5"> </b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="champions.champion6"> </b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="champions.champion7"> </b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="champions.champion8"> </b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input v-model="champions.champion9"> </b-form-input>
            </b-form-group>
            <b-button type="submit">Submit</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      champions: {
        champion1: "",
        champion2: "",
        champion3: "",
        champion4: "",
        champion5: "",
        champion6: "",
        champion7: "",
        champion8: "",
        champion9: ""
      }
    };
  },

  methods: {
    createTeamComposition() {
      const data = this.champions;
      axios
        .post(
          "https://us-central1-tft-cheatsheets.cloudfunctions.net/createTeamComposition",
          data
        )
        .then(() => console.log("success"))
        .catch(() => console.log("error"));
    }
  }
};
</script>
