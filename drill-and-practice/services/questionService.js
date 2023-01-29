import { executeQuery } from "../database/database.js";
import * as optionService from "../services/optionService.js";

const addQuestion = async (userId, topicId, questionText) => {
    await executeQuery(
      `INSERT INTO questions
        (user_id, topic_id, question_text)
          VALUES ($1, $2, $3)`,
      userId,
      topicId,
      questionText,
    );
  };

const listQuestionsByTopicId = async (topicId) => {
    const res = await executeQuery(
      `SELECT * FROM questions WHERE topic_id = $1`, 
      topicId,
    );

    return res.rows;
};

const listAllQuestions = async () => {
    const res = await executeQuery(
      "SELECT * FROM questions"
    );

    return res.rows;
}

const getTopicNameById = async (topicId) => {
    const name = (await executeQuery(
      "SELECT name FROM topics WHERE id = $1", 
      topicId,
    )).rows[0];

    return name;
}

const deleteQuestion = async (questionId) => {
  await executeQuery(
    `DELETE FROM questions 
      WHERE id = $1`,
    questionId,
  );
}

export { addQuestion, listQuestionsByTopicId, listAllQuestions, getTopicNameById, deleteQuestion };