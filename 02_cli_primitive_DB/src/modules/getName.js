import inquirer from 'inquirer';

const getName = async (question) => {
  const questions = [
    {
      type: 'input',
      name: 'name',
      message: question,
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);
    return answers.name;
  } catch (error) {
    throw error;
  }
};

export default getName;
