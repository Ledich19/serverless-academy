const { NOT_FOUND } = require('../utils/constants');
const { createLinkInDB,  getLinkFromDB } = require('../services/linker.service');
const linkerRouter = require('express').Router();

linkerRouter.put('/short', async (request, response, next) => {
  try {
    const {
      body: { link },
    } = request;
    const linkInDB = await getLinkFromDB('longLink', link)
    if (linkInDB) response.status(200).json({ status: true, data: { link: linkInDB.shortLink } });
    const newLink = await createLinkInDB(link)
    response.status(201).json({ status: true, data: { link: newLink.shortLink } });
  } catch (error) {
    next(error);
  }
});

linkerRouter.get('/:code', async (request, response, next) => {
  const { code } = request.params;
  try {
    const link = await getLinkFromDB('shortLink', code)
    if (!link) throw new Error(NOT_FOUND);
    response.redirect(302, link.longLink);
    console.log('');
  } catch (error) {
    next(error);
  }
});

module.exports = linkerRouter;
