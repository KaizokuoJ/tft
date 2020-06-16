<template>
  <div>
    <b-row>
      <b-col
        cols="10"
        offset="1"
        md="6"
        offset-md="3"
        sm="10"
        offset-sm="1"
        class="my-5"
      >
        <b-form-group class="mb-0">
          <b-input-group>
            <b-form-input
              data-hj-whitelist
              max="5"
              list="championNamesList"
              @keyup.enter="
                addChampionToSelectedChampions(championNameFromInput)
              "
              v-model="championNameFromInput"
              placeholder="Enter a champion name"
            >
            </b-form-input>

            <datalist id="championNamesList">
              <option v-for="champion in availableChampionsNameSuggestions">{{
                champion
              }}</option>
            </datalist>
            <b-input-group-append>
              <b-button
                variant="primary"
                @click="addChampionToSelectedChampions(championNameFromInput)"
                >Add Champion
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
        <b-alert
          variant="warning"
          @dismissed="didUserProvideIncorrectInput = false"
          :show="didUserProvideIncorrectInput"
          dismissible
          :fade="true"
          class="mt-3 w-75 mx-auto"
          >Sorry, please try again. I couldn't process your input.</b-alert
        >
      </b-col>
    </b-row>

    <b-row>
      <b-col md="8" offset-md="2">
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
      class="team-comp-table"
    ></TeamCompositionsTable>
  </div>
</template>

<script>
import db from "../firebaseConfig";
import TeamCompositionsTable from "./TeamCompositionsTable";

export default {
  data() {
    return {
      availableChampions: [],
      selectedChampions: [],
      availableTeamCompositions: [],
      championNameFromInput: "",
      didUserProvideIncorrectInput: false
    };
  },

  computed: {
    getTeamCompositionsToRender() {
      return this.availableTeamCompositions.filter(teamComposition => {
        return this.shouldTeamCompositionBeRendered(teamComposition);
      });
    },
    availableChampionsNameSuggestions() {
      return this.getChampionNamesFromAvailableChampions();
    }
  },

  components: {
    TeamCompositionsTable
  },

  methods: {
    shouldTeamCompositionBeRendered(teamComposition) {
      let teamCompositionShouldBeRendered = false;
      const championNames = teamComposition.championNames.map(championName => {
        return this.formatChampionForNameHumanReadability(championName);
      });
      for (let i = 0, len = this.selectedChampions.length; i < len; i++) {
        const selectedChampion = this.capitalizeFirstLetter(
          this.selectedChampions[i]
        );
        teamCompositionShouldBeRendered = championNames.includes(
          selectedChampion
        );
        if (!teamCompositionShouldBeRendered) return false;
      }
      return teamCompositionShouldBeRendered;
    },

    getChampionNamesFromAvailableChampions() {
      const availableChampionsNames = [];
      this.availableChampions.forEach(champion => {
        const championName = this.formatChampionForNameHumanReadability(
          champion.name
        );
        availableChampionsNames.push(championName);
      });
      return availableChampionsNames;
    },

    formatChampionForNameHumanReadability(championName) {
      if (championName === "AurelionSol") {
        return "Aurelion Sol";
      } else if (championName === "MissFortune") {
        return "Miss Fortune";
      } else if (championName === "Chogath") {
        return "Cho'gath";
      } else if (championName === "RekSai") {
        console.log("yo");
        return "Rek'sai";
      } else if (championName === "Khazix") {
        return "Kha'zix";
      } else {
        return championName;
      }
    },

    addChampionToSelectedChampions(championName) {
      if (
        this.availableChampionsNameSuggestions.includes(
          this.capitalizeFirstLetter(championName)
        )
      ) {
        this.selectedChampions.push(championName);
        this.championNameFromInput = "";
        this.$emit("validChampionHasBeenEntered");
      } else {
        this.didUserProvideIncorrectInput = true;
      }
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

<style lang="scss" scoped>
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
</style>
