const { mkdir } = require('node:fs/promises');
const path = require('node:path');

const dbRouter = require('express').Router();
const { writeFile, readFile } = require('fs/promises');

dbRouter.get('/*', async (request, response, next) => {
  const { url } = request;
  const filePath = `./files/${url}.json`;
  try {
    const contents = await readFile(filePath, { encoding: 'utf8' });
    response(contents);
  } catch (error) {
    next(error);
  }
});

dbRouter.put('/*', async (request, response, next) => {
  const { body, url } = request;
  const newFilePath = `./files/${url}.json`;
  const dataString = body.toString('utf8');
  try {
    await mkdir(path.dirname(newFilePath), { recursive: true });
    await writeFile(newFilePath, dataString, { flag: 'w' });
    response.json({
      message: `The JSON at the path ${url} has been saved.`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = dbRouter;
