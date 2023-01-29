import * as quizService from "../../services/quizService.js";
import * as optionService from "../../services/optionService.js";

const showRandomQuestion = async ({ response }) => {
    const question = await quizService.getRandomQuestion();
    if (question && question.length > 0) {
        question[0].questionId = question[0].id;
        question[0].questionText = question[0].question_text;
        question[0].answerOptions = [];
        const options = await optionService.listOptionByQuestionId(question[0].id);   
        options.forEach(option => {
            question[0].answerOptions.push({ 
                "optionId": option.id, 
                "optionText": option.option_text,
            });
        });
        delete question[0].id;
        delete question[0].user_id;
        delete question[0].topic_id;
        delete question[0].question_text;
        response.body = question[0];
    } else {
        response.body = {};
    }
    
};

const showResult = async ({ request, response }) => {
    const body = request.body({type: "json"});
    const params = await body.value;

    const chosenOptionId = params.optionId;
    const questionId = params.questionId;
    const correctAnswer = (await optionService.listCorrectOptionByQuestionId(questionId))[0];
    if (Number(correctAnswer.id) === Number(chosenOptionId)) {
        response.body = {"correct": true};
    } else {
        response.body = {"correct": false};
    }
}

export { showRandomQuestion, showResult };