const admin = require("firebase-admin");
const serviceAccount = require("./tft-cheatsheets-firebase-adminsdk-bcsn9-b3f19c1de2.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tft-cheatsheets.firebaseio.com"
  });
} catch (e) {
  console.log("App already initialized");
}

module.exports = {
  getAllAvailableChampions: () => {
    return new Promise((resolve, reject) => {
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
            const champion = championsQuerySnapshot.docs[i].data();
            availableChampions.push(champion);
            if (i < len - 1) {
              resolve(availableChampions);
            }
          }
          return null
        })
        .catch(error => reject(error));
    });
  },
  createTeamComposition: (teamCompositionChampions, teamCompositionSynergies, teamCompositionChampionNames) => {
    return admin
      .firestore()
      .collection("compositions")
      .add({
        championNames: teamCompositionChampionNames,
        champions: teamCompositionChampions,
        synergies: teamCompositionSynergies,
        createdAt: admin.firestore.Timestamp.now()
      });
  }

};
