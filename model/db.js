

const {MongoClient} = require("mongodb")
const url = "mongodb+srv://test:test@payment-project.tqr1g.mongodb.net/?retryWrites=true&w=majority&appName=Payment-project"
const dbName = "PaymentDB"



let dbInstance; // Store the database connection

const connectToDatabase = async () => {
  if (!dbInstance) {
    try {
      const client = await MongoClient.connect(url);
      console.log("Connected to MongoDB");
      dbInstance = client.db(dbName);
    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
      throw err;
    }
  }
  return dbInstance;
};

module.exports = { connectToDatabase };