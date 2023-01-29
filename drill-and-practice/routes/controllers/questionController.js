import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const getQuestionData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    question_text: params.get("question_text"),
  };
};

const addQuestion = async ({ request, response, user, render }) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const questionData = await getQuestionData(request);

  const [passes, errors] = await validasaur.validate(
    questionData,
    questionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    questionData.validationErrors = errors;
    questionData.questions = await questionService.listQuestionsByTopicId(urlParts[2]);
    questionData.topicName = (await questionService.getTopicNameById(urlParts[2])).name;
    questionData.topicId = urlParts[2];
    render("question.eta", questionData);
  } else {
    await questionService.addQuestion(
      user.id, //userId 
      urlParts[2], //topicId 
      questionData.question_text, //question text
    );

    response.redirect(`/topics/${urlParts[2]}`);
  }
};

const listQuestions = async ({ request, render }) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  render("question.eta", { 
    questions: await questionService.listQuestionsByTopicId(urlParts[2]), 
    topicName: (await questionService.getTopicNameById(urlParts[2])).name, 
    topicId: urlParts[2],
  });
};

const deleteQuestion = async ({ request, response }) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  await questionService.deleteQuestion(urlParts[4]);
  response.redirect(`/topics/${urlParts[2]}`);
};

export { addQuestion, listQuestions, deleteQuestion };