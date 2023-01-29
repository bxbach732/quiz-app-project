import * as optionService from "../../services/optionService.js";
import { validasaur } from "../../deps.js";

const optionValidationRules = {
    option_text: [validasaur.required, validasaur.minLength(1)],
};
  
const getOptionData = async (request) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    return {
        option_text: params.get("option_text"),
        is_correct: params.get("is_correct"),
    };
};

const addOption = async ({ request, response, user, render }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const optionData = await getOptionData(request);

    const [passes, errors] = await validasaur.validate(
        optionData,
        optionValidationRules,
    );

    if (!passes) {
        console.log(errors);
        optionData.validationErrors = errors;
        optionData.options = await optionService.listOptionByQuestionId(urlParts[4]);
        optionData.questionText = (await optionService.getQuestionTextById(urlParts[4])).question_text;
        optionData.topicId = urlParts[2];
        optionData.questionId = urlParts[4];
        render("option.eta", optionData);
    } else {
        let isCorrect = false;
        if (optionData.is_correct === "on") {
            isCorrect = true;
        }

        await optionService.addOption(
            urlParts[4], //question id  
            optionData.option_text, //option text
            isCorrect, //is correct
        );

        response.redirect(`/topics/${urlParts[2]}/questions/${urlParts[4]}`);
    }
}

const listOptions = async ({ request, render }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    render("option.eta", { 
        options: await optionService.listOptionByQuestionId(urlParts[4]),
        questionText: (await optionService.getQuestionTextById(urlParts[4])).question_text,
        topicId: urlParts[2],
        questionId: urlParts[4],
    });
};

const deleteOption = async ({ request, response }) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    await optionService.deleteOption(urlParts[6]);
    response.redirect(`/topics/${urlParts[2]}/questions/${urlParts[4]}`);
};

export { addOption, listOptions, deleteOption };