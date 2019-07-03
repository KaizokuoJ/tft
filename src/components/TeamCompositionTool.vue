<template>
  <div>
    <b-row>
      <b-col md="6" offset="2" class="my-5">
        <b-form-group
          label-cols-sm="3"
          label="AddChampionToChampionList"
          class="mb-0"
        >
          <b-input-group>
            <b-form-input
              @keyup.enter="
                addChampionToSelectedChampionList(championFromInput)
              "
              v-model="championFromInput"
              placeholder="Enter a champion"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                :disabled="!championFromInput"
                @click="addChampionToSelectedChampionList(championFromInput)"
                >Add Champion</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    
  </div>
</template>

<script>
import db from "../firebaseConfig";

export default {
  data() {
    return {
      filter: null,
      availableChampions: [],
      selectedChampions: [],
      availableTeamCompositions: [],
      championFromInput: ""
    };
  },

  computed: {
    getDisplayedTeamCompositions () {
      return this.availableTeamCompositions.filter(teamComposition => {
        let displayTeamComposition = false;
        this.selectedChampions.forEach(selectedChampion => {
          teamComposition.champions.includes(selectedChampion) ? displayTeamComposition = true : displayTeamComposition = false;
        });
        return displayTeamComposition
      });
    }
  },

  methods: {
    addChampionToSelectedChampionList(champion) {
      this.championFromInput = "";
      this.selectedChampions.push(champion);
    }
  },

  created() {
    db.collection("champions")
      .get()
      .then(championsQuerySnapshot => {
        championsQuerySnapshot.forEach(championDoc => {
          const champion = championDoc.data();
          champion.name = championDoc.id;
          this.availableChampions.push(champion);
        });
      });
    db.collection("compositions")
      .get()
      .then(teamCompositionsQuerySnapshot => {
        teamCompositionsQuerySnapshot.forEach(teamCompositionDoc => {
          this.availableTeamCompositions.push(teamCompositionDoc.data());
        });
      });
  }
};
</script>

<style></style>
