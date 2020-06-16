export default {
  methods: {
    getChampionThumbnailContainerClass(champion) {
      return {
        "champion-thumbnail-image-container-5-cost": champion.cost === 5,
        "champion-thumbnail-image-container-4-cost": champion.cost === 4,
        "champion-thumbnail-image-container-3-cost": champion.cost === 3,
        "champion-thumbnail-image-container-2-cost": champion.cost === 2,
        "champion-thumbnail-image-container-1-cost": champion.cost === 1
      };
    },
    getChampionThumbnailImage(championKey) {
      const formattedChampionName = this.formatChampionName(championKey);
      return require(`@/assets/images/championImages/${this.capitalizeFirstLetter(
        formattedChampionName
      )}.png`);
    },
    getClassOrOriginThumbnailImage(classOrOriginName) {
      return require(`@/assets/images/classAndOriginImages/${this.capitalizeFirstLetter(
        classOrOriginName
      )}.png`);
    }
  }
}