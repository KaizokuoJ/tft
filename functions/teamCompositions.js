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
      const teamCompositionChampions = req.body.champions;
      const teamCompositionSynergies = await module.exports.getTeamCompositionSynergies(
        teamCompositionChampions
      );
      // When done, create the teamComposition in the database with that object and champion names
      console.log(teamCompositionSynergies);
      // When done, resolve function
    });
  }),

  getTeamCompositionSynergies: async teamCompositionChampions => {
    databaseCrud
      .getAvailableChampions()
      .then(availableChampions => {
        return module.exports.getTeamCompositionTypes(
          teamCompositionChampions,
          availableChampions
        );
      })
      .catch(error => console.log(error));
  },

  getTeamCompositionTypes(teamCompositionChampions, availableChampions) {
    const teamCompositionTypes = [];
    teamCompositionChampions.forEach(teamCompositionChampionName => {
      const champion = availableChampions.find(availableChampion => {
        return availableChampion.name === teamCompositionChampionName;
      });
      teamCompositionTypes.push(module.exports.getChampionTypes(champion));
    });
    return teamCompositionTypes.flat();
  },

  getChampionTypes: champion => {
    let championTypes = [];
    console.log(champion);

    if (champion.synergies.includes("assassin")) {
      championTypes.push("assassin");
    } else if (champion.synergies.includes("assassin")) {
      championTypes.push("blademaster");
    } else if (champion.synergies.includes("brawler")) {
      championTypes.push("brawler");
    } else if (champion.synergies.includes("elementalist")) {
      championTypes.push("elementalist");
    } else if (champion.synergies.includes("guardian")) {
      championTypes.push("guardian");
    } else if (champion.synergies.includes("gunslinger")) {
      championTypes.push("gunslinger");
    } else if (champion.synergies.includes("knight")) {
      championTypes.push("knight");
    } else if (champion.synergies.includes("ranger")) {
      championTypes.push("ranger");
    } else if (champion.synergies.includes("shapeshifter")) {
      championTypes.push("shapeshifter");
    } else if (champion.synergies.includes("sorcerer")) {
      championTypes.push("sorcerer");
    } else if (champion.synergies.includes("demon")) {
      championTypes.push("demon");
    } else if (champion.synergies.includes("dragon")) {
      championTypes.push("dragon");
    } else if (champion.synergies.includes("exile")) {
      championTypes.push("exile");
    } else if (champion.synergies.includes("glacial")) {
      championTypes.push("glacial");
    } else if (champion.synergies.includes("imperial")) {
      championTypes.push("imperial");
    } else if (champion.synergies.includes("ninja")) {
      championTypes.push("ninja");
    } else if (champion.synergies.includes("noble")) {
      championTypes.push("noble");
    } else if (champion.synergies.includes("phantom")) {
      championTypes.push("phantom");
    } else if (champion.synergies.includes("pirate")) {
      championTypes.push("pirate");
    } else if (champion.synergies.includes("robot")) {
      championTypes.push("robot");
    } else if (champion.synergies.includes("void")) {
      championTypes.push("void");
    } else if (champion.synergies.includes("wild")) {
      championTypes.push("wild");
    } else if (champion.synergies.includes("yordle")) {
      championTypes.push("yordle");
    }
    return championTypes;
  }
};
