import * as statisticService from "../../services/statisticsService.js"

const showMain = async ({ request, render, response }) => {
  const numberOfTopics = await statisticService.getTotalNumberOfTopics();
  const numberOfQuestions = await statisticService.getTotalNumberOfQuestions();
  const numberOfAnswers = await statisticService.getTotalNumberOfAnswers();                                                                                                                                                                                                                                                                                                                                                                                                              
  render("main.eta", {
    topics: numberOfTopics[0].count,
    questions: numberOfQuestions[0].count,
    answers: numberOfAnswers[0].count,
  });
};

export { showMain };
