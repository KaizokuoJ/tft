const admin = require("firebase-admin");

module.exports = {
  getAvailableChampions: async () => {
    let availableChampions = [];
    admin
      .firestore()
      .collection("champions")
      .get()
      .then(championsQuerySnapshot => {
        for (
          let i = 0, len = championsQuerySnapshot.docs.length;
          i < len;
          i++
        ) {
          const champion = championsQuerySnapshot[i].data();
          availableChampions.push(champion);
        }
        return availableChampions
      })
      .catch(error => console.log(error))
  }
};
