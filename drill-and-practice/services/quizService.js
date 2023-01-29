import { executeQuery } from "../database/database.js";

const addAnswer = async (userId, questionId, optionId) => {
    await executeQuery(
      `INSERT INTO question_answers
        (user_id, question_id, question_answer_option_id)
          VALUES ($1, $2, $3)`,
      userId,
      questionId,
      optionId,
    );
};

const listAnswersByOptionId = async (optionId) => {
    const res = await executeQuery(
      `SELECT * FROM question_answers WHERE question_answer_option_id = $1`, 
      optionId,
    );

    return res.rows;
}

const getRandomQuestion = async () => {
    const res = await executeQuery(
      `SELECT * FROM questions
        ORDER BY RANDOM()
          LIMIT 1`
    );
    return res.rows;
}

const getRandomQuestionByTopicId = async (topicId) => {
    const res = await executeQuery(
      `SELECT * FROM questions
        WHERE topic_id = $1
          ORDER BY RANDOM()
            LIMIT 1`,
      topicId
    );
    return res.rows;
}

const deleteAnswer = async (answerId) => {
  await executeQuery(
    `DELETE FROM question_answers 
      WHERE id = $1`,
    answerId,
  );
}

export { addAnswer, listAnswersByOptionId, getRandomQuestion, getRandomQuestionByTopicId, deleteAnswer };