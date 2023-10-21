import Database from './db/index.js';
import { NOT_FOUND, WELCOME } from './modules/constants.js';
import getName from './modules/getName.js';
import getUserData from './modules/getUserData.js';
import yesNoQuestion from './modules/getYesNoQuestion.js';

console.log(WELCOME);
const userDB = new Database('users');

const app = async () => {
  const name = await getName('Enter your name?');
  if (name && name !== '') {
    const userData = await getUserData();
    userData.user = name;
    await userDB.addData(userData);
    app();
  } else {
    const wouldYoLike = await yesNoQuestion('Would you to search values in DB ?');
    if (wouldYoLike) {
      const searchName = await getName('Enter your name 2222?');
      const data = await userDB.getData('user', searchName);
      console.log(data || `${wouldYoLike} ${NOT_FOUND}`);
    }
  }
};
export default app;
