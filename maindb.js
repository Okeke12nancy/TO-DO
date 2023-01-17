const prompt = require("prompt-sync")();

// Create Database and Collection

// Connect Mongodb
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

// The Logic Starts Here
console.log(">>>>>>>>>>");
console.log("Welcome to Your Todo App...");
console.log(">>>>>>>>>>");

let keepAppRunning = prompt(
  "Press 'M'  to start making an order, press  'Q'  to quit >>>> "
);

todos = true;
let choice;

// While Statements
while (todos === true) {
  // Convert the string inside the KeepAppRunning variable too lowerCase

  keepAppRunning.toLowerCase();

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    //Create Database
    console.log("Database created!");
    var dbo = db.db("Todo");

    // Create Collection
    dbo.createCollection("Notes", function (err, res) {
      if (err) throw err;
      console.log("Collection created!");
    });
  });
  // if keepAppRunning equals "q", Exit the console application
  if (keepAppRunning === "q") {
    todos = false;
    console.log("");
    console.log("");
    console.log(">>>>>>>>>>");
    console.log("Thank you for visiting us,lol");
    console.log(">>>>>>>>>>");
    console.log("");
    console.log("");
    break;
  }

  choice = prompt(
    " Choose from the following options:\n C. Create Todo \n R. Read Todo \n U. Update Todo \n D. Delete Todo \n Q. Exit Application \n\n"
  );

  choice = choice.toLowerCase();

  if (choice === "q") {
    todos = false;
    console.log(">>>>>>>>>>");
    console.log("");
    console.log(">>>>>>>>>>");
    console.log("Thank you for visiting us,lol");
    console.log("");
    break;
  }

  if (choice === "c") {
    console.log("");
    console.log(">>>>>>>>>>");
    console.log("");

    let my_Todo = prompt("What do you want to add to your Todos?");
    let Priority = prompt("What is the Priority of Your Todos");
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Todo");
      var myTodos = { my_Todo, Priority };
      dbo.collection("Notes").insertOne(myTodos, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
    });
  } else if (choice === "r") {
    console.log("");
    console.log("");
    console.log(">>>>>>>>>>");

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Todo");
      dbo.collection("Notes").findOne({}, function (err, result) {
        if (err) throw err;
        console.log(result.name);
      });
    });
  } else if (choice === "d") {
    console.log("");
    console.log("");
    console.log(">>>>>>>>>>");

    // Prompt the User For Inputs
    let my_Todo = prompt("What do you want to add to your Todos?");
    let Priority = prompt("What is the Priority of Your Todos");

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Todos");
      var myquery = { my_Todo: my_Todo };
      dbo.collection("Notes").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
      });
    });
  } else if (choice == "u") {
    console.log("");
    console.log("");
    console.log(">>>>>>>>>>");

    // prompt ther Users for Inputs
    let my_Todo = prompt("What do you want to add to your Todos?");
    let Priority = prompt("What is the Priority of Your Todos");

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("Todos");
      var myquery = { my_Todo: my_Todo, Priority: Priority };
      var newvalues = { $set: { my_Todo: my_Todo, Priority: Priority } };
      dbo
        .collection("Notes")
        .updateOne(myquery, newvalues, function (err, res) {
          if (err) throw err;
          console.log("1 document updated");
          db.close();
        });
    });
  }
}
