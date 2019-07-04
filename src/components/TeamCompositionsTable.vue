<template>
  <b-row>
    <b-col md="8" offset="2">
      <b-table
        stacked="md"
        show-empty
        empty-text="No team comps found using given champion(s)"
        :items="teamCompositionsToRender"
        :fields="teamCompositionsToRenderFields"
        class="text-white"
      >
        <template slot="synergies" slot-scope="row">
          {{ getTeamCompositionSynergies(row.item.synergies) }}
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import db from "../firebaseConfig";

export default {
  data() {
    return {
      availableChampions: [],
      teamCompositionsToRenderFields: [{ key: "synergies" }]
    };
  },
  props: ["teamCompositionsToRender"],
  methods: {
    getTeamCompositionSynergies(teamCompositionTypes) {

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
  }
};
</script>
