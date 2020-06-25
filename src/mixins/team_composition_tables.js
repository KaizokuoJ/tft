import utilities from "../helpers/utilities";

export default {
  methods: {
    capitalizeFirstLetter: utilities.capitalizeFirstLetter,
    getChampionThumbnailContainerClass(champion) {
      return {
        "champion-thumbnail__image-container--5-cost": champion.cost === 5,
        "champion-thumbnail__image-container--4-cost": champion.cost === 4,
        "champion-thumbnail__image-container--3-cost": champion.cost === 3,
        "champion-thumbnail__image-container--2-cost": champion.cost === 2,
        "champion-thumbnail__image-container--1-cost": champion.cost === 1
      };
    },
    getChampionThumbnailImage(championKeyOrName) {
      const formattedForImageUrlChampionName = this.formatChampionName(
        championKeyOrName
      );
      return require(`@/assets/images/championImages/${this.capitalizeFirstLetter(
        formattedForImageUrlChampionName
      )}.png`);
    },
    getClassOrOriginThumbnailImage(classOrOriginName) {
      return require(`@/assets/images/classAndOriginImages/${this.capitalizeFirstLetter(
        classOrOriginName
      )}.png`);
    },
    getSynergiesSorted: function(synergies) {
      return synergies.slice().sort(this.compareSynergyTypes);
    },
    getChampionsSortedByCost: function(champions) {
      return champions.slice().sort(this.compareChampionCost);
    },
    compareChampionCost: function(a, b) {
      if (a.cost < b.cost) {
        return -1;
      }
      if (a.cost > b.cost) {
        return 1;
      }
      return 0;
    },
    compareSynergyTypes: function(a, b) {
      if (a.type < b.type) {
        return -1;
      }
      if (a.type > b.type) {
        return 1;
      }
      return 0;
    },
    convertTierNumberToLetter: function(tierNumber) {
      if (tierNumber === 1) {
        return "S";
      } else if (tierNumber === 2) {
        return "A";
      } else if (tierNumber === 3) {
        return "B";
      } else if (tierNumber >= 4) {
        return "C";
      }
    },
    formatChampionName(championName) {
      if (championName === "AurelionSol") {
        return "Aurelion Sol";
      } else if (championName === "MissFortune") {
        return "Miss Fortune";
      } else if (championName === "Chogath") {
        return "Cho'gath";
      } else if (championName === "RekSai") {
        return "Rek'sai";
      } else if (championName === "Khazix") {
        return "Kha'zix";
      } else {
        return championName;
      }
    }
  }
};
