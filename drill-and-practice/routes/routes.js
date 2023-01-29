import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as topicController from "./controllers/topicController.js";
import * as quizController from "./controllers/quizController.js"
import * as questionApi from "./apis/questionApi.js"

//import * as statisticsController from "./controllers/statisticsController.js";

const router = new Router();

//Show main
router.get("/", mainController.showMain);

//List, add, delete topics
router.get("/topics", topicController.listTopics);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

//List, add, delete questions
router.get("/topics/:id", questionController.listQuestions);
router.post("/topics/:id/questions", questionController.addQuestion);
router.post("/topics/:tId/questions/:qId/delete", questionController.deleteQuestion);

//List, add, delete answer options
router.get("/topics/:id/questions/:qId", optionController.listOptions);
router.post("/topics/:id/questions/:qId/options", optionController.addOption);
router.post("/topics/:tId/questions/:qId/options/:oId/delete", optionController.deleteOption);

//Register
router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

//Login
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

//List quizzes, access random question, answer question
router.get("/quiz", quizController.listTopics);
router.get("/quiz/:tId", quizController.getRandomQuestionByTopicId);
router.get("/quiz/:tId/questions/:qId", quizController.listRandomQuestion)
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.processSelection);
router.get("/quiz/:tId/questions/:qId/correct", quizController.showCorrect);
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.showIncorrect);

//Api
router.get("/api/questions/random", questionApi.showRandomQuestion);
router.post("/api/questions/answer", questionApi.showResult);

export { router };
