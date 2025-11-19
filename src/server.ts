import app from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
    console.log(`Bk_VideoJuegos running on http://localhost:${env.port}`);
});
