import { executeQuery } from "../database/database.js";
import * as questionService from "../services/questionService.js";
import * as optionService from "../services/optionService.js";

const addTopic = async (userId, name) => {
  await executeQuery(
    `INSERT INTO topics 
      (user_id, name ) 
         VALUES ($1, $2)`,
    userId,
    name,
  );
};

const listTopics = async (context) => {
  const res = await executeQuery(
    `SELECT * FROM topics
      ORDER BY name ASC`
  );
  return res.rows;
}

const deleteTopic = async (topicId) => {
  const questionList = await questionService.listQuestionsByTopicId(topicId);
  
  for (const question of questionList) {
    const optionList = await optionService.listOptionByQuestionId(question.id);
    for (const option of optionList) {
      await optionService.deleteOption(option.id);
    }
    await questionService.deleteQuestion(question.id);
  }

  await executeQuery(
    `DELETE FROM topics 
      WHERE id = $1`,
    topicId,
  );
}

export { addTopic, listTopics, deleteTopic };