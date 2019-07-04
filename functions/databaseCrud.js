const admin = require("firebase-admin");
const helpers = require("./helpers");
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
            champion.name = championsQuerySnapshot.docs[i].id;
            availableChampions.push(champion);
            if (i < len - 1) {
              resolve(availableChampions);
            }
          }
        })
        .catch(error => reject(error));
    });
  },
  createTeamComposition: teamCompositionChampions => {
    return admin.firestore().collection("compositions").add({
      champions: teamCompositionChampions
    });
  }
};
