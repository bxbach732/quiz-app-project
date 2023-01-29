import { executeQuery } from "../database/database.js";

const getTotalNumberOfTopics = async () => {
    const res = await executeQuery(
        "SELECT COUNT(*) FROM topics"
    );

    return res.rows;
};

const getTotalNumberOfQuestions = async () => {
    const res = await executeQuery(
        "SELECT COUNT(*) FROM questions"
    );
  
    return res.rows;
};

const getTotalNumberOfAnswers = async () => {
    const res = await executeQuery(
        "SELECT COUNT(*) FROM question_answers"
    );

    return res.rows;
};

export { getTotalNumberOfTopics, getTotalNumberOfQuestions, getTotalNumberOfAnswers };