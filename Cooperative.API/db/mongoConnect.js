const mongoose = require('mongoose');
const {secret} = require("../config/config")


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://${secret.userDb}:${secret.passDb}@cluster0.cmu9u.mongodb.net/car`);
  console.log("mongo connected uriya count to car chanel!!!");
}