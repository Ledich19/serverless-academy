const { findIp, normalizeIP } = require('../utils/user.utils');
const userRouter = require('express').Router();

userRouter.get('/ip', async (request, response, next) => {
  const { ip } = request;
  try {
    console.log(ip);
    const decimalIP = normalizeIP(ip);
    const result = await findIp(decimalIP);
    response.send({
      success: true,
      data: { ...result, ip: ip },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
