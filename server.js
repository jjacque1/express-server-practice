const PORT = 5000; //defines the port Node server will listen on for incomming http request

const express = require("express"); //import the express framework so we can create and configure a web server

const app = express(); //creates an express application instance which represents our server

const cors = require("cors"); //imports CORS middleware to allow cross-origin requests between different ports (frontend and backend)

app.use(cors()); //enable the cors resource that allows requests from other origins
app.use(express.json()); //express built in middleware that parses incoming JSON request bodies and makes them available on req.body

let tasks = []

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
}); //health check endpoint to confirm the server is running and responding to request

app.get("/api/tasks")

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); //start the server and begins listening for incoming requests on the specified port
