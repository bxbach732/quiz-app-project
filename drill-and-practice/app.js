import { Application, Session, oakCors } from "./deps.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { serveStaticMiddleware } from "./middlewares/serveStaticMiddleware.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { userMiddleware } from "./middlewares/userMiddleware.js";
import { router } from "./routes/routes.js";
import "https://deno.land/x/dotenv/load.ts";

const app = new Application();
const session = new Session();
app.use(session.initMiddleware());

app.use(errorMiddleware);
app.use(authMiddleware);
app.use(userMiddleware);
app.use(serveStaticMiddleware);
app.use(renderMiddleware);
app.use(oakCors());
app.use(router.routes());

export { app };