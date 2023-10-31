const checkIsDone = (data) => {
  let stingData = data;
  if (typeof data != 'string') {
    stingData = JSON.stringify(data);
  }

  if (stingData.includes('"isDone":true')) {
    return true;
  }
  if (stingData.includes('"isDone":false')) {
    return false;
  }
};
export default checkIsDone;
