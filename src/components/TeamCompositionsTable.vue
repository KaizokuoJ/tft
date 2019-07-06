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
          <template slot="size" slot-scope="row">
              {{row.item.championNames.length}}
          </template>
        <template slot="champions" slot-scope="row">
          <div
            v-for="champion in sortChampionsByCost(row.item.champions)"
            class="d-inline-block"
          >
            <img
              :src="getChampionThumbnailImage(champion.key)"
              alt="Image of a champion that was entered in the input field"
            />
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
        { key: "size" },
        { key: "champions" }
      ]
    };
  },
  props: ["teamCompositionsToRender"],
  methods: {
    getChampionThumbnailImage(championName) {
      return require(`@/assets/images/championImages/${this.capitalizeFirstLetter(
        championName
      )}.png`);
    },
    capitalizeFirstLetter: string => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    sortChampionsByCost: function(champions) {
      const championsSortedByCost = champions.sort(this.compare);
      return championsSortedByCost;
    },
    compare: function(a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
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
