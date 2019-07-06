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
      const teamCompositionSynergies = await module.exports.getTeamCompositionSynergies(
        teamCompositionChampions
      );

      databaseCrud
        .createTeamComposition(
          teamCompositionChampions,
          teamCompositionSynergies,
          teamCompositionChampionNames
        )
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
          return resolve(
            module.exports.filterSelectedChampionsFromAvailableChampions(
              teamCompositionChampionNames,
              availableChampions
            )
          );
        })
        .catch(error => console.log(error));
    });
  },

  filterSelectedChampionsFromAvailableChampions(
    teamCompositionChampionNames,
    availableChampions
  ) {
    const championsToBeAddedToComposition = [];
    teamCompositionChampionNames.forEach(teamCompositionChampionName => {
      const champion = availableChampions.find(availableChampion => {
        return availableChampion.key === teamCompositionChampionName;
      });
      championsToBeAddedToComposition.push(champion);
    });
    return [].concat.apply([], championsToBeAddedToComposition)
  },

  getTeamCompositionSynergies: async teamCompositionChampions => {
    const teamCompositionClassesAndOrigins = module.exports.getTeamCompositionClassesAndOrigins(
      teamCompositionChampions
    );

    return await module.exports.buildTeamCompositionSynergiesFromClassesAndOrigins(
      teamCompositionClassesAndOrigins
    );
  },

  getTeamCompositionClassesAndOrigins(teamCompositionChampions) {
    const teamCompositionClassesAndOrigins = [];

    teamCompositionChampions.forEach(champion => {
      champion.class.forEach(championClass => {
        teamCompositionClassesAndOrigins.push(championClass);
      });

      champion.origin.forEach(championOrigin => {
        teamCompositionClassesAndOrigins.push(championOrigin);
      });
    });

    return teamCompositionClassesAndOrigins;
  },

  buildTeamCompositionSynergiesFromClassesAndOrigins: async teamCompositionClassesAndOrigins => {
    return new Promise((resolve, reject) => {
      const teamCompositionClassesAndOriginsTotalCount = module.exports.getTeamCompositionClassesAndOriginsTotalCount(
        teamCompositionClassesAndOrigins
      );
      resolve(
        module.exports.getSynergiesFromCompositionClassesAndOriginsTotalCount(
          teamCompositionClassesAndOriginsTotalCount
        )
      );
    });
  },

  getTeamCompositionClassesAndOriginsTotalCount: teamCompositionClassesAndOrigins => {
    const teamCompositionClassesAndOriginsTotalCount = [];
    const copy = teamCompositionClassesAndOrigins.slice(0);

    for (
      let i = 0, len = teamCompositionClassesAndOrigins.length;
      i < len;
      i++
    ) {
      let duplicateCount = 0;
      for (let j = 0; j < copy.length; j++) {
        if (teamCompositionClassesAndOrigins[i] === copy[j]) {
          duplicateCount++;
          delete copy[j];
        }
      }

      if (duplicateCount > 0) {
        let a = {};
        a.value = teamCompositionClassesAndOrigins[i];
        a.count = duplicateCount;
        teamCompositionClassesAndOriginsTotalCount.push(a);
      }
    }

    return teamCompositionClassesAndOriginsTotalCount;
  },

  getSynergiesFromCompositionClassesAndOriginsTotalCount: teamCompositionClassesAndOriginsTotalCount => {
    const compositionSynergies = [];

    teamCompositionClassesAndOriginsTotalCount.forEach(classOrOriginCount => {
      if (classOrOriginCount.value === "Demon") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ type: "demon", level: 3 });
        } else if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ type: "demon", level: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "demon", level: 1 });
        }
      } else if (classOrOriginCount.value === "Dragon") {
        if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "dragon", level: 1 });
        }
      } else if (classOrOriginCount.value === "Exile") {
        if (classOrOriginCount.count >= 1) {
          compositionSynergies.push({ type: "exile", level: 1 });
        }
      } else if (classOrOriginCount.value === "Glacial") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ type: "glacial", level: 3 });
        } else if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ type: "glacial", level: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "glacial", level: 1 });
        }
      } else if (classOrOriginCount.value === "Imperial") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ type: "imperial", level: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "imperial", level: 1 });
        }
      } else if (classOrOriginCount.value === "Noble") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ type: "noble", level: 2 });
        } else if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ type: "noble", level: 1 });
        }
      } else if (classOrOriginCount.value === "Ninja") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ type: "ninja", level: 2 });
        } else if (classOrOriginCount.count >= 1) {
          compositionSynergies.push({ type: "ninja", level: 1 });
        }
      } else if (classOrOriginCount.value === "Pirate") {
        if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ type: "pirate", level: 1 });
        }
      } else if (classOrOriginCount.value === "Phantom") {
        if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "phantom", level: 1 });
        }
      } else if (classOrOriginCount.value === "Robot") {
        if (classOrOriginCount.count >= 1) {
          compositionSynergies.push({ type: "robot",  level: 1 });
        }
      } else if (classOrOriginCount.value === "Void") {
        if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ type: "void", level: 1 });
        }
      } else if (classOrOriginCount.value === "Wild") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ type: "wild", level: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "wild", level: 1 });
        }
      } else if (classOrOriginCount.value === "Yordle") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ type: "yordle", level: 2 });
        } else if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ type: "yordle", level: 1 });
        }
      } else if (classOrOriginCount.value === "Assassin") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ type: "assassin", level: 2 });
        } else if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ type: "assassin", level: 1 });
        }
      } else if (classOrOriginCount.value === "Blademaster") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ type: "blademaster", level: 2 });
        } else if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ type: "blademaster", level: 1 });
        }
      } else if (classOrOriginCount.value === "Brawler") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ type: "brawler", level: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "brawler", level: 1 });
        }
      } else if (classOrOriginCount.value === "Elementalist") {
        if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ type: "elementalist", level: 1 });
        }
      } else if (classOrOriginCount.value === "Guardian") {
        if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "guardian", level: 1 });
        }
      } else if (classOrOriginCount.value === "Gunslinger") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ type: "gunslinger", level: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "gunslinger", level: 1 });
        }
      } else if (classOrOriginCount.value === "Knight") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ type: "knight", level: 3 });
        } else if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ type: "knight", level: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "knight", level: 1 });
        }
      } else if (classOrOriginCount.value === "Ranger") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ type: "ranger", level: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ type: "ranger", level: 1 });
        }
      } else if (classOrOriginCount.value === "Shapeshifter") {
        if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ type: "shapeshifter", level: 1 });
        }
      } else if (classOrOriginCount.value === "Sorcerer") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ type: "sorcerer", level: 2 });
        } else if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ type: "sorcerer", level: 1 });
        }
      }
    });
    return compositionSynergies;
  }
};
