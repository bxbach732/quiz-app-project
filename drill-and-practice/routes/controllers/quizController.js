import * as topicService from "../../services/topicService.js";
import * as quizService from "../../services/quizService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const listTopics = async ({ render }) => {
    render("quizList.eta", { 
        topics: await topicService.listTopics(), 
    });
};

const getRandomQuestionByTopicId = async ({ request, response }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const randomQuiz = await quizService.getRandomQuestionByTopicId(urlParts[2]);
    console.log(randomQuiz);
    if (randomQuiz && randomQuiz.length > 0) {
        response.redirect(`/quiz/${urlParts[2]}/questions/${randomQuiz[0].id}`);
    } else {
        response.redirect(`/quiz/${urlParts[2]}/questions/undefined`);
    }
}

const listRandomQuestion = async ({ request, render }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    if (urlParts[4] === "undefined") {
        render("quiz.eta", { noQuestion: true });
    } else {
        render("quiz.eta", {
            options: await optionService.listOptionByQuestionId(urlParts[4]),
            questionText: (await optionService.getQuestionTextById(urlParts[4])).question_text,
            topicId: urlParts[2],
            questionId: urlParts[4],
            noQuestion: false,
        })
    }
}

const processSelection = async ({ request, user, response }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const correctOption = await optionService.listCorrectOptionByQuestionId(urlParts[4]);
    await quizService.addAnswer(
        user.id,
        urlParts[4],
        urlParts[6], 
    );

    if (Number(correctOption[0].id) === Number(urlParts[6])) {
        response.redirect(`/quiz/${urlParts[2]}/questions/${urlParts[4]}/correct`);
    } else {
        response.redirect(`/quiz/${urlParts[2]}/questions/${urlParts[4]}/incorrect`);
    }
}

const showCorrect = async ({ request, render }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    render("correct.eta", {
        topicId: urlParts[2],
    });
}

const showIncorrect = async ({ request, render }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const correctOption = await optionService.listCorrectOptionByQuestionId(urlParts[4]);

    render("incorrect.eta", {
        correctOption: correctOption[0].option_text,
        topicId: urlParts[2],
    });
}

export { listTopics, getRandomQuestionByTopicId, listRandomQuestion, processSelection, showCorrect, showIncorrect };