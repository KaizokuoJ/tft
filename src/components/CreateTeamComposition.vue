<template>
  <div class="text-white mt-5">
    <b-container>
      <b-row>
        <b-col md="6" offset="2" class="my-5">
          <b-form-group
            label-cols-sm="3"
            label="AddChampionToChampionList"
            class="mb-0"
          >
            <b-input-group>
              <b-form-input
                @keyup.enter="addChampionToSelectedChampions()"
                v-model="championNameFromInput"
                placeholder="Enter a champion name"
              >
              </b-form-input>
              <b-input-group-append>
                <b-button
                  :disabled="!championNameFromInput"
                  @click="addChampionToSelectedChampions()"
                  >Add
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="8" offset="2">
          <div class="selected-champions-display text-white mx-auto mb-3">
            <div
              v-for="championName in selectedChampions"
              class="selected-champion-thumbnail-image-container selected-champion-thumbnail"
              @click="clearChampionFromSelectedChampions(championName)"
            >
              <img
                :src="getChampionThumbnailImage(championName)"
                alt="Image of a champion that was entered in the input field"
                class="selected-champion-thumbnail-image selected-champion-thumbnail"
              />
            </div>
          </div>
          <b-button @click="createTeamComposition">Submit</b-button>
          <b-button @click="clearAllSelectedChampions()" class="mb-5"
            >Clear all</b-button
          >
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
      championNameFromInput: "",
      selectedChampions: [],
      selectedChampionItems: {}
    };
  },

  methods: {
    createTeamComposition() {
      let data = {};
      data.champions = this.selectedChampions;
      data.championItems = this.selectedChampionItems;

      axios
        .post(
          "https://us-central1-tft-cheatsheets.cloudfunctions.net/createTeamComposition",
          data
        )
        .then(() => {
          this.selectedChampions = [];
          this.selectedChampionItems = {};
          console.log("success");
        })
        .catch(() => console.log("error"));
    },

    addChampionToSelectedChampions() {
      this.selectedChampions.push(this.championNameFromInput);
      this.championNameFromInput = "";
    },

    clearChampionFromSelectedChampions(championName) {
      this.selectedChampions = this.selectedChampions.filter(
        selectedChampion => {
          return selectedChampion !== championName;
        }
      );
    },

    clearAllSelectedChampions: function() {
      this.selectedChampions = [];
    },

    getChampionThumbnailImage(championName) {
      return require(`@/assets/images/championImages/${this.capitalizeFirstLetter(
        championName
      )}.png`);
    },

    capitalizeFirstLetter: string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>
