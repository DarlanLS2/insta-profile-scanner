import { ConsoleManager } from "./src/scripts/ConsoleManager.js";
import { FileManager } from "./src/scripts/FileManager.js";

const consoleManager = new ConsoleManager();

(async () => {
  const profileNames = await FileManager.getNameOfArquives("./data/followers")

  ConsoleManager.printProfilesOptions(profileNames);

  const prompts = {
    first: ` -> Escolha o primeiro perfil [1-${profileNames.length}]: `,
    second: ` -> Escolha o segundo perfil [1-${profileNames.length}]: `,
  };

  const firstProfile = await consoleManager.input(prompts.first) - 1
  const secondProfile = await consoleManager.input(prompts.second) - 1

  const followersFilePath = {
    first: `./data/followers/${profileNames[firstProfile]}`,
    second: `./data/followers/${profileNames[secondProfile]}`
  }

  const json1 = FileManager.getJsonContent(`${followersFilePath.first}.json`)
  const json2 = FileManager.getJsonContent(`${followersFilePath.second}.json`)

  const list1 = [];
  const list2 = []

  json1.forEach(element => {
    list1.push(element.username)
  });

  json2.forEach(element => {
    list2.push(element.username)
  })

  const mutualFollowers = list1.filter(item => list2.includes(item));

  const params = { 
    firstProfile: profileNames[firstProfile],
    secondProfile: profileNames[secondProfile],
    mutualFollowers: mutualFollowers
  }

  ConsoleManager.printMutualFollowers(params)

  process.exit()
})();
