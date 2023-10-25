import fs from 'fs/promises';

const filePath = 'data.json';

const readAndWriteJSON = async () => {
  const newData = [];
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    jsonData.forEach((vacation) => {
      const index = newData.findIndex((user) => user.userId === vacation.user._id);
      if (index < 0) {
        const newObj = {
          userId: vacation.user._id,
          userName: vacation.user.name,
          vacations: [
            {
              startDate: vacation.startDate,
              endDate: vacation.endDate,
            },
          ],
        };
        newData.push(newObj);
      } else {
        newData[index].vacations.push({
          startDate: vacation.startDate,
          endDate: vacation.endDate,
        });
      }
    });

    await fs.writeFile(filePath, JSON.stringify(newData), 'utf-8');
  } catch (error) {
    console.error('ERROR', error);
  }
};

readAndWriteJSON();
