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
        .createTeamComposition(teamCompositionChampions, teamCompositionSynergies)
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
        return availableChampion.name === teamCompositionChampionName;
      });
      championsToBeAddedToComposition.push(champion);
    });
    return championsToBeAddedToComposition.flat();
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
      resolve(module.exports.getSynergiesFromCompositionClassesAndOriginsTotalCount(
        teamCompositionClassesAndOriginsTotalCount
      ));
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
          compositionSynergies.push({ demon: 3 });
        } else if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ demon: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ demon: 1 });
        }
      } else if (classOrOriginCount.value === "Dragon") {
        if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ dragon: 1 });
        }
      } else if (classOrOriginCount.value === "Exile") {
        if (classOrOriginCount.count >= 1) {
          compositionSynergies.push({ exile: 1 });
        }
      } else if (classOrOriginCount.value === "Glacial") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ glacial: 3 });
        } else if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ glacial: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ glacial: 1 });
        }
      } else if (classOrOriginCount.value === "Imperial") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ imperial: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({imperial: 1})
        }
      } else if (classOrOriginCount.value === "Noble") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ noble: 2 });
        } else if(classOrOriginCount.count >= 3) {
          compositionSynergies.push({noble: 1})
        }
      } else if (classOrOriginCount.value === "Ninja") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ ninja: 2 });
        } else if(classOrOriginCount.count >= 1) {
          compositionSynergies.push({ninja: 1})
        }
      } else if (classOrOriginCount.value === "Pirate") {
        if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ pirate: 1 });
        }
      } else if (classOrOriginCount.value === "Phantom") {
        if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ phantom: 1 });
        }
      } else if (classOrOriginCount.value === "Robot") {
        if (classOrOriginCount.count >= 1) {
          compositionSynergies.push({ robot: 1 });
        }
      } else if (classOrOriginCount.value === "Void") {
        if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ void: 1 });
        }
      } else if (classOrOriginCount.value === "Wild") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ wild: 2 });
        } else if(classOrOriginCount.count >= 2) {
          compositionSynergies.push({wild: 1})
        }
      } else if (classOrOriginCount.value === "Yordle") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ yordle: 2 });
        } else if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ yordle: 1 });
        }
      } else if (classOrOriginCount.value === "Assassin") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ assassin: 2 });
        } else if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ assassin: 1 });
        }
      } else if (classOrOriginCount.value === "Blademaster") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ blademaster: 2 });
        } else if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ blademaster: 1 });
        }
      } else if (classOrOriginCount.value === "Brawler") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ brawler: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ brawler: 1 });
        }
      } else if (classOrOriginCount.value === "Elementalist") {
        if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ elementalist: 1 });
        }
      } else if (classOrOriginCount.value === "Guardian") {
        if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ guardian: 1 });
        }
      } else if (classOrOriginCount.value === "Gunslinger") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ gunslinger: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ gunslinger: 1 });
        }
      } else if (classOrOriginCount.value === "Knight") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ knight: 3 });
        } else if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ knight: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ knight: 1 });
        }
      } else if (classOrOriginCount.value === "Ranger") {
        if (classOrOriginCount.count >= 4) {
          compositionSynergies.push({ ranger: 2 });
        } else if (classOrOriginCount.count >= 2) {
          compositionSynergies.push({ ranger: 1 });
        }
      } else if (classOrOriginCount.value === "Shapeshifter") {
        if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ shapeshifter: 1 });
        }
      } else if (classOrOriginCount.value === "Sorcerer") {
        if (classOrOriginCount.count >= 6) {
          compositionSynergies.push({ sorcerer: 2 });
        } else if (classOrOriginCount.count >= 3) {
          compositionSynergies.push({ sorcerer: 1 });
        }
      }
    });
    return compositionSynergies;
  }
};
