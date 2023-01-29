import { executeQuery } from "../database/database.js";

const addUser = async (email, password) => {
  await executeQuery(
    `INSERT INTO users
      (email, password)
        VALUES ($1, $2)`,
    email,
    password,
  );
};

const findUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email = $1",
    email,
  );

  return result.rows;
};

const checkRole = async (email) => {
    const result = await executeQuery(
      "SELECT * FROM users WHERE admin = TRUE"
    ).rows
    if (result && result.length > 0) {
        return true;
    } else {
        return false;
    }
}

export { addUser, findUserByEmail, checkRole };