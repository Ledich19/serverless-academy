const db = require('../db/pool');
const { generateUniqueKey } = require('../utils/linker.utils');

const getLinkFromDB = async(column, value)=> {
const commands = {
  'shortLink': 'SELECT * FROM links where "shortLink" = $1',
  'longLink': 'SELECT * FROM links where "longLink" = $1'
}

  console.log('=====2', column, value);
  const link = await db.query(commands[column], [value]);
  console.log('=====1', link.rows[0]);
  return link.rows[0];
}

const updateLinkInDB = async(linkId, shortLink)=> {
  const updatedLink = await db.query('UPDATE links SET "shortLink" = $1 WHERE id = $2 RETURNING *', [shortLink, linkId]);
  return updatedLink.rows[0];
}

const createLinkInDB = async(link)=> {
  const secretKey = process.env.SECRET;
  const newLink = await db.query('INSERT INTO links ("longLink", "shortLink") values ($1, $2) RETURNING *', [link, '']);
  const uniqueKey = generateUniqueKey(newLink.rows[0].id, secretKey);
  const updatedLink = await updateLinkInDB(newLink.rows[0].id, uniqueKey);
  console.log('updatedLink', updatedLink);
  return updatedLink;
}

module.exports = {
  getLinkFromDB,
  createLinkInDB,
  updateLinkInDB,
};