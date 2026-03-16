import { createApp } from "./src/app.js";
import { env } from "./src/config/env.js";

const app = createApp();

app.listen(env.port, () => {
  console.log(`Backend running on port ${env.port}`);
});
