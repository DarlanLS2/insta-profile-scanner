import fs from "fs";
import { promises as fsPromises } from "fs";

export class FileManager {
  constructor(userName) {
    this.userName = userName
    this.arquivePath = `./data/followers/${this.userName}.json`;
  }

  addUsers(newUsers) {
    if (this.isFileExits()) {
      let concatenedJson = this.getConcatenedJson(newUsers);

      this.writeFile(concatenedJson);
    } else {
      const newContent = { users: newUsers };

      this.writeFile(newContent);
    }
  }

  isFileExits() {
    return fs.existsSync(this.arquivePath) ? true : false
  }

  getConcatenedJson(newUsers) {
    const currentContent = this.getCurrentContent();
    let currentJson = FileManager.getJsonAsObject(currentContent);

    // TODO: Retirar duplicação de codigo
    // if is [{}, {}, {}]
    if (FileManager.isArray(currentJson)) {
      return currentJson.concat(newUsers);
    }

    // TODO: Retirar duplicação de codigo
    // if is { users: [{}, {}, {}]}
    if (currentJson && FileManager.isArray(currentJson.users)) {
      return currentJson.users.concat(newUsers);
    }

    // if is []
    return newUsers;
  }

  getCurrentContent() {
    return fs.readFileSync(this.arquivePath, 'utf8');
  }

  static getJsonAsObject(json) {
      try {
        return JSON.parse(json);
      } catch (e) {
        return { users: [] };
      }
  }

  static isArray(element) {
    return Array.isArray(element) ? true : false
  }

  writeFile(json) {
    fs.writeFileSync(this.arquivePath, JSON.stringify(json, null, 2));
  }

  static getJsonContent(jsonPath) {
    let json = this.getJsonAsObject(fs.readFileSync(jsonPath, 'utf8'));

    // TODO: Retirar duplicação de codigo
    if (this.isArray(json.users)) {
      return json.users
    }

    // TODO: Retirar duplicação de codigo
    if (this.isArray(json)) {
      return json
    }
  }

  static async getNameOfArquives(filePath) {
    const arquives = await this.getListOfArquives(filePath)
    const arquivesNames = arquives.map(arquive => arquive.slice(0, -5))
    return arquivesNames;
  }

  static async getListOfArquives(filePath) {
    return await fsPromises.readdir(filePath)
  }
}
