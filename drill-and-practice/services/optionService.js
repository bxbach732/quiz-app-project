import { executeQuery } from "../database/database.js";
import * as quizService from "../services/quizService.js";

const addOption = async (questionId, optionText, isCorrect) => {
    await executeQuery(
      `INSERT INTO question_answer_options
        (question_id, option_text, is_correct)
          VALUES ($1, $2, $3)`,
      questionId,
      optionText,
      isCorrect,
    );
};

const listOptionByQuestionId = async (questionId) => {
    const res = await executeQuery(
      `SELECT * FROM question_answer_options 
        WHERE question_id = $1`, 
      questionId,
    );

    return res.rows;
};

const listCorrectOptionByQuestionId = async (questionId) => {
  const res = await executeQuery(
    `SELECT * FROM question_answer_options 
      WHERE question_id = $1 AND is_correct = TRUE`, 
    questionId,
  );

  return res.rows;
};

const getQuestionTextById = async (questionId) => {
  const questionText = (await executeQuery(
    `SELECT question_text 
      FROM questions WHERE id = $1`, 
    questionId,
  )).rows[0];

  return questionText;
}

const deleteOption = async (optionId) => {
  const answerList = await quizService.listAnswersByOptionId(optionId);

  for (const answer of answerList) {
    await quizService.deleteAnswer(answer.id);
  }

  await executeQuery(
    `DELETE FROM question_answer_options 
      WHERE id = $1`,
    optionId,
  );
}

export { addOption, listOptionByQuestionId, getQuestionTextById, deleteOption, listCorrectOptionByQuestionId };