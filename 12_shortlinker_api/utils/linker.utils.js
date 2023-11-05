const generateUniqueKey = (userId, secretKey) => {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const keyLength = 6;
  const combinedValue = userId.toString() + secretKey;

  let uniqueKey = '';
  let currentIndex = 0;

  for (let i = 0; i < keyLength; i++) {
    currentIndex = (currentIndex + combinedValue.charCodeAt(i)) % characters.length;
    uniqueKey += characters.charAt(currentIndex);
  }
  return uniqueKey;
}



module.exports = {
  generateUniqueKey
};
