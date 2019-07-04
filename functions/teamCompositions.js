const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const serviceAccount = require("./tft-cheatsheets-firebase-adminsdk-bcsn9-b3f19c1de2.json");

const databaseCrud = require("./databaseCrud");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://tft-cheatsheets.firebaseio.com"
  });
} catch (e) {
  console.log("App already initialized");
}

module.exports = {
  createTeamComposition: functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
      const teamCompositionChampionNames = req.body.champions;
      const teamCompositionChampions = await module.exports.getTeamCompositionChampions(
        teamCompositionChampionNames
      );

      databaseCrud
        .createTeamComposition(teamCompositionChampions)
        .then(response => {
          return res.status(200).send("Team Composition created");
        })
        .catch(error => {
          console.log(error);
          return res.status(200).send("Error creating team composition");
        });
    });
  }),

  getTeamCompositionChampions: teamCompositionChampionNames => {
    return new Promise((resolve, reject) => {
      databaseCrud
        .getAllAvailableChampions()
        .then(availableChampions => {
          resolve(
            module.exports.filterSelectedChampionsFromAllChampions(
              teamCompositionChampionNames,
              availableChampions
            )
          );
        })
        .catch(error => console.log(error));
    });
  },

  filterSelectedChampionsFromAllChampions(teamCompositionChampionNames, availableChampions) {
    const champions = [];
    console.log(availableChampions);
    teamCompositionChampionNames.forEach(teamCompositionChampionName => {
      const champion = availableChampions.find(availableChampion => {
        return availableChampion.name === teamCompositionChampionName;
      });
      champions.push(champion);
    });
    return champions.flat();
  }
};
