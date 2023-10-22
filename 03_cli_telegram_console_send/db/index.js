import { writeFile, readFile, open } from 'node:fs/promises';

class Database {
  constructor(dbName) {
    this.dbName = dbName;
    this._filePath = new URL(`./${this.dbName}.txt`, import.meta.url);
  }

  async addData(data) {
    const dataString = `${JSON.stringify(data)}\n`;
    await writeFile(this._filePath, dataString, { flag: 'a' });
    return data;
  }

  async getData(option, data) {
    const file = await open(this._filePath);
    for await (const line of file.readLines()) {
      const item = JSON.parse(line);
      if (item[option].toUpperCase() === data.toUpperCase()) {
        return item;
      }
    }
    return null;
  }
}

export default Database;
