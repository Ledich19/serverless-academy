const checkIsDone = (data) => {
  let stingData = data;
  if (typeof data != 'string') {
    stingData = JSON.stringify(data);
  }
  const match = /"isDone":\s*(true|false)/.exec(stingData);
  if (match) {
    return match[1] === 'true';
  }
};
export default checkIsDone;
