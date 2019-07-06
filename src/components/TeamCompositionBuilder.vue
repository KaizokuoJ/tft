<template>
  <div>
    <b-row>
      <b-col md="9" offset="2" class="my-5">
        <b-form-group label-cols-sm="3" class="mb-0">
          <b-input-group>
            <!--            <b-form-input-->
            <!--              @keyup.enter="-->
            <!--                addChampionToSelectedChampions(championNameFromInput)-->
            <!--              "-->
            <!--              v-model="championNameFromInput"-->
            <!--              placeholder="Enter a champion name"-->
            <!--            >-->
            <!--            </b-form-input>-->
            <VueSimpleSuggest
              v-model="championNameFromInput"
              :list="availableChampionsNameSuggestions"
              :prevent-submit="false"
              :filter-by-query="true"
              ref="simpleSuggestRef"
            >
              <input
                @keyup.enter="
                  addChampionToSelectedChampions(championNameFromInput)
                "
                type="text"
              />
            </VueSimpleSuggest>
            <button
              class="autosuggest__add-champion-button btn btn-primary"
              @click="addChampionToSelectedChampions(championNameFromInput)"
            >
              Add Champion
            </button>
            <!--            <b-input-group-append>-->
            <!--              <b-button-->
            <!--                :disabled="!championNameFromInput"-->
            <!--                @click="addChampionToSelectedChampions(championNameFromInput)"-->
            <!--                >Add-->
            <!--              </b-button>-->
            <!--            </b-input-group-append>-->
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="8" offset="2">
        <p v-if="selectedChampions.length !== 0" class="text-white text-muted">
          Click champion portraits to remove them from your composition
        </p>
        <p />
        <div class="selected-champions-display text-white mx-auto mb-3">
          <div
            v-for="championName in selectedChampions"
            class="selected-champion-thumbnail-image-container selected-champion-thumbnail"
            @click="removeChampionFromSelectedChampions(championName)"
          >
            <img
              :src="getChampionThumbnailImage(championName)"
              alt="Image of a champion that was entered in the input field"
              class="selected-champion-thumbnail-image selected-champion-thumbnail"
            />
          </div>
        </div>
      </b-col>
    </b-row>
    <TeamCompositionsTable
      :teamCompositionsToRender="getTeamCompositionsToRender"
      :selectedChampions="selectedChampions"
      :availableChampions="availableChampions"
    ></TeamCompositionsTable>
  </div>
</template>

<script>
import db from "../firebaseConfig";
import TeamCompositionsTable from "./TeamCompositionsTable";
import VueSimpleSuggest from "vue-simple-suggest";
import "vue-simple-suggest/dist/styles.css";

export default {
  data() {
    return {
      availableChampions: [],
      selectedChampions: [],
      availableTeamCompositions: [],
      championNameFromInput: ""
    };
  },

  computed: {
    getTeamCompositionsToRender() {
      return this.availableTeamCompositions.filter(teamComposition => {
        return this.shouldTeamCompositionBeRendered(teamComposition);
      });
    },
    availableChampionsNameSuggestions() {
      const availableChampionsNames = [];
      this.availableChampions.forEach(champion => {
        availableChampionsNames.push(champion.name);
      });
      return availableChampionsNames;
    }
  },

  components: {
    TeamCompositionsTable,
    VueSimpleSuggest
  },

  methods: {
    shouldTeamCompositionBeRendered(teamComposition) {
      let teamCompositionShouldBeRendered = false;
      for (let i = 0, len = this.selectedChampions.length; i < len; i++) {
        const selectedChampion = this.selectedChampions[i];
        teamCompositionShouldBeRendered = teamComposition.championNames.includes(
          selectedChampion
        );
        if (!teamCompositionShouldBeRendered) return false;
      }
      return teamCompositionShouldBeRendered;
    },

    addChampionToSelectedChampions(championName) {
      this.championNameFromInput = "";
      this.$refs.simpleSuggestRef.setText('');
      this.selectedChampions.push(championName);
    },

    removeChampionFromSelectedChampions(championName) {
      this.selectedChampions = this.selectedChampions.filter(
        selectedChampion => {
          return selectedChampion !== championName;
        }
      );
    },

    getChampionThumbnailImage(championName) {
      return require(`@/assets/images/championImages/${this.capitalizeFirstLetter(
        championName
      )}.png`);
    },

    capitalizeFirstLetter: string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  },

  created() {
    db.collection("compositions")
      .get()
      .then(teamCompositionsQuerySnapshot => {
        teamCompositionsQuerySnapshot.forEach(teamCompositionDoc => {
          this.availableTeamCompositions.push(teamCompositionDoc.data());
        });
      });
    db.collection("champions")
      .get()
      .then(championsQuerySnapshot => {
        championsQuerySnapshot.forEach(championDoc => {
          const champion = championDoc.data();
          champion.name = championDoc.id;
          this.availableChampions.push(champion);
        });
      });
  }
};
</script>

<style lang="scss">
.selected-champion-thumbnail {
  -webkit-clip-path: polygon(
    50% 6%,
    89% 24%,
    89% 76%,
    50% 94%,
    11% 74%,
    11% 26%
  );
  clip-path: polygon(50% 6%, 89% 24%, 89% 76%, 50% 94%, 11% 74%, 11% 26%);
  transition-timing-function: ease-in-out;
  transition: 0.2s;

  &:hover {
    opacity: 0.4;
  }
}
.selected-champion-thumbnail-image-container {
  display: inline-block;
  position: relative;
  width: 71px;
  height: 71px;
  background: white;
}
.selected-champion-thumbnail-image {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 65px;
  height: 65px;
}

.autosuggest__add-champion-button {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
</style>
