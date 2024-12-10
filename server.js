// var http = require("http")
// const express = require("express")
// const app = express()

// const { MongoClient } = require('mongodb');


// const uri = 'mongodb://localhost:27017'; // For local MongoDB
// // const uri = 'mongodb+srv://username:password@cluster.mongodb.net/mydatabase'; // For MongoDB Atlas

// const client = new MongoClient(uri);

// let path = require('path');

// // app.set('view engine', path.join(__dirname, "..", "views"))
// app.set('view engine', 'ejs')


// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// app.use(express.json()); // Parse JSON data


// app.get("/", async function(req, res){



//     // try {
//     //     const db = await connectToDatabase();
//     //     const collection = db.collection("PaymentCollect");
//     //     const payment = await collection.findOne({});
//     //     // res.json(payment); // Send the fetched data as a response

//     //     console.log(payment)
//     //   } catch (err) {
//     //     console.error("Error fetching data:", err);
//     //     res.status(500).send("Internal Server Error");
//     //   }


    
// async function run() {
//     try {
    
//         await client.connect();
//         console.log('Connected to MongoDB');
    
//         // Access the database and collection
//         const database = client.db('PaymentDB');  
//         const collection = database.collection('PaymentCollect'); 
    
       
//     //     const doc = { salary: 877 };
//     //     const result = await collection.insertOne(doc);
//     //     console.log(`Document inserted with _id: ${result.insertedId}`);
//     //   } catch (error) {
//     //     console.error('Error connecting to MongoDB:', error);
//     //   } finally {
//     //     await client.close();
//     //   }


    
//     // Fetch all documents from the collection
//     const data = await collection.find({}).toArray();

//     // Render the EJS page and pass the data
//     res.render('pages/home', { items: data });
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   } finally {
//     // Ensure the client is closed properly
//     await client.close();
//   }
// }

// run();



// }) 


// app.post('/add-amount', async (req, res) => {
//     const { amount } = req.body; // Retrieve 'amount' from form
  
//     try {
//       await client.connect();
//       const database = client.db('PaymentDB'); // Replace with your database name
//       const collection = database.collection('PaymentCollect'); // Replace with your collection name
  
//       // Insert amount into the database
//       const result = await collection.insertOne({ salary: parseInt(amount, 10) });
  
//       console.log(`Amount inserted with ID: ${result}`);
//     }catch{
//         console.log("error submit salary")
//     }
//   });

// http.createServer(function(req, res){

//     // res.write("sdfdfdfdf");
//     // res.end()
//     console.log("server start ...")

// })




const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();

const uri = "mongodb://localhost:27017"; // Update as per your MongoDB setup
const client = new MongoClient(uri);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

// Handle both GET and POST for "/"
app.all("/", async (req, res) => {
  try {
    await client.connect();
    const database = client.db("PaymentDB");
    const collection = database.collection("PaymentCollect");

    if (req.method === "POST") {
      const { amount } = req.body;
      if (amount) {
        // Insert the submitted amount into the database
        await collection.insertOne({ salary: parseInt(amount, 10) });
      }
    }

    // Fetch all documents from the database to display
    const data = await collection.find({}).toArray();

    // Render the EJS page with the fetched data
    res.render("pages/home", { items: data });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Optionally, close the MongoDB client after each request
    await client.close();
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});



