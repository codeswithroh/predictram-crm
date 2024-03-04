export const csvTOJson = (csvData) => {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  const json = [];

  for (let i = 1; i < lines.length; i += 1) {
    const data = lines[i].split(',');
    const obj = {};
    for (let j = 0; j < headers.length; j += 1) {
      if (data[j] || data[j] === false || data[j] === 0) {
        obj[headers[j].trim()] = data[j];
      }
    }
    if (Object.keys(obj).length > 0) json.push(obj);
  }

  console.log(json);
  return json;
};
