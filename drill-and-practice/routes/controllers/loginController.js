import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const loginData = {
  errorFlag: false,
  errorDetails: "",
}

const processLogin = async ({ request, response, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  const userFromDatabase = await userService.findUserByEmail(
    params.get("email"),
  );

  if (userFromDatabase.length != 1) {
    loginData.errorFlag = true;
    loginData.errorDetails = "This email is not yet registered";
    response.redirect("/auth/login");
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    params.get("password"),
    user.password,
  );

  if (!passwordMatches) {
    loginData.errorFlag = true;
    loginData.errorDetails = "Wrong password";
    response.redirect("/auth/login");
    return;
  }

  await state.session.set("user", user);
  response.redirect("/topics");
};

const showLoginForm = ({ render }) => {
  render("login.eta", loginData);
  loginData.errorDetails = "";
  loginData.errorFlag = false;
};

export { processLogin, showLoginForm };