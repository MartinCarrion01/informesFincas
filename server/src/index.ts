import { __prod__ } from "./constants";
import config from "./utils/config";
import { createServer } from "./utils/server";

const main = async () => {
  
  const app = await createServer();

  if (process.env.NODE_ENV !== "test") {
    app.listen(8080, () => console.log("Listening on", config.PORT));
  }
};

main().catch((err) => console.error(err));
