import inquirer from 'inquirer';

const getUserData = async () => {
  const questions = [
    {
      type: 'list',
      name: 'gender',
      message: 'Choose your gender: ',
      choices: ['Male', 'Female'],
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: 'input',
      name: 'age',
      message: 'Enter your age:',
      validate(value) {
        const age = parseInt(value);
        if (isNaN(age)) {
          return 'Please enter a number';
        }
        if (age < 0 || age > 120) {
          return 'Please enter correct age';
        }
        return true;
      },
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);
    return answers;
  } catch (error) {
    throw error;
  }
};

export default getUserData;
