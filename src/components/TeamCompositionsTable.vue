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
          <div
            v-for="synergy in row.item.synergies"
            class="d-inline-block mx-3"
          >
            {{ synergy.type }}
          </div>
        </template>
        <template slot="championNames">
            <div class="d-inline-block">
                
            </div>
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
      teamCompositionsToRenderFields: [
        { key: "synergies" },
        {key: "championNames", label: 'Champions'}
      ]
    };
  },
  props: ["teamCompositionsToRender"],
  methods: {},
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
