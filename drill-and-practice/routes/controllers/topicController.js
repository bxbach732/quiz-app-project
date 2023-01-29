import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const getTopicData = async (request) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  return {
    name: params.get("name"),
  };
};


const addTopic = async ({ request, response, user, render }) => {
  const topicData = await getTopicData(request);

  const [passes, errors] = await validasaur.validate(
    topicData,
    topicValidationRules,
  );

  if (!passes) {
    console.log(errors);
    topicData.validationErrors = errors;
    topicData.checkAdmin = user.admin;
    topicData.topics = await topicService.listTopics();
    render("topic.eta", topicData);
  } else {
    await topicService.addTopic(
      user.id, //userId  
      topicData.name, //topic name
    );

    response.redirect("/topics");
  }
};

const listTopics = async ({ render, user }) => {
  console.log(user.admin);
  render("topic.eta", { 
    topics: await topicService.listTopics(), 
    checkAdmin: user.admin,
  });
};

const deleteTopic = async ({ request, user, response }) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  if (user.admin) {
    await topicService.deleteTopic(urlParts[2]);
    response.redirect(`/topics`);
  }
};

export { addTopic, listTopics, deleteTopic };