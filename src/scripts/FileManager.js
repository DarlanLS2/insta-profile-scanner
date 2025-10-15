const fs = require("fs");

class FileManager {
  constructor(userName) {
    this.userName = userName
    this.arquivePath = `./logs/${this.userName}.json`;
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
    let currentJson = this.getJsonAsObject(currentContent);

    // if is [{}, {}, {}]
    if (this.isArray(currentJson)) {
      return currentJson.concat(newUsers);
    }
    // if is { users: [{}, {}, {}]}
    if (currentJson && this.isArray(currentJson.users)) {
      return currentJson.users.concat(newUsers);
    }

    // if is []
    return newUsers;
  }

  getCurrentContent() {
    return fs.readFileSync(this.arquivePath, 'utf8');
  }

  getJsonAsObject(currentContent) {
      try {
        return JSON.parse(currentContent);
      } catch (e) {
        return { users: [] };
      }
  }

  isArray(element) {
    return Array.isArray(element) ? true : false
  }

  writeFile(json) {
    fs.writeFileSync(this.arquivePath, JSON.stringify(json, null, 2));
  }
}

module.exports = FileManager;
