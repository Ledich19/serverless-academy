const { readCVSFile, memoize } = require('./healper');

const ipv4ToDecimal = (ip) => {
  const arrayApi = ip.split('.');
  return arrayApi.reduce((decimal, octet, index) => {
    return decimal + parseInt(octet) * Math.pow(256, 3 - index);
  }, 0);
};

const ipv6ToDecimal = (ip) => {
  const parts = ip.split(':');
  if (parts.length !== 8) {
    throw new Error('Недопустимый формат IPv6-адреса');
  }
  const decimalParts = parts.map((hex) => parseInt(hex, 16));
  const decimalIP = decimalParts.reduce((decimal, part) => decimal * 65536 + part, 0);
  return decimalIP;
};

const findIp = memoize(async (decimalIP) => {
  const locationArr = await readCVSFile('./assets/IP2LOCATION-LITE-DB1.CSV');
  const binarySearch = (locationArr, decimalIP) => {
    if (isNaN(decimalIP) || decimalIP < 0) {
      return null;
    }
    let left = 0;
    let right = locationArr.length - 1;
    while (left <= right) {
      const midIndex = (left + right) >> 1;
      const mid = locationArr[midIndex];
      const columns = mid.split(',');
      const rangeFrom = parseInt(columns[0].replace('"', ''), 10);
      const rangeTo = parseInt(columns[1].replace('"', ''), 10);
      if (rangeFrom < decimalIP && rangeTo > decimalIP) {
        return {
          rangeFrom,
          rangeTo,
          countryCode: columns[2],
          country: columns[3],
        };
      } else if (decimalIP < rangeFrom) {
        right = midIndex - 1;
      } else {
        left = midIndex + 1;
      }
    }
    return null;
  };
  return binarySearch(locationArr, decimalIP);
});

function normalizeIP(ip) {
  if (ip.startsWith('::ffff:')) {
    const ipv4Part = ip.substring(7);
    return ipv4ToDecimal(ipv4Part);
  } else {
    return ipv6ToDecimal(ip);
  }
}

module.exports = {
  findIp,
  normalizeIP,
};
