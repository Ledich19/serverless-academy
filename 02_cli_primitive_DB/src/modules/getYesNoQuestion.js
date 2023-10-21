import inquirer from 'inquirer';

const yesNoQuestion = async (question) => {
  const questions = [
    {
      type: 'confirm',
      name: 'wouldYou',
      message: question,
      default: false,
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);
    return answers.wouldYou;
  } catch (error) {
    throw error;
  }
};

export default yesNoQuestion;
