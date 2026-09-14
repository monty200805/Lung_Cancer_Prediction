const app = require("./app");
const env = require("./config/env");
const connectDB = require("./config/db");

async function start() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
    console.log(`Swagger docs available at http://localhost:${env.port}/api-docs`);
  });
}

start();
