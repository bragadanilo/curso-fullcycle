const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);
connection.connect();

function insertName() {
  const name = `dbraga - ${new Date().getTime()}`;
  const sql = `INSERT INTO people (name) VALUES ("${name}")`;
  connection.query(sql, function (error, results, fields) {
    if (error) throw error;
  });
  console.log(`Name inserted  - ${name}`);
}

function createResultPage(res) {
  connection.query("SELECT * from people", function (error, results) {
    if (error) throw error;

    items = "<h1>dbraga fullcycle!</h1><ul>";
    results.forEach((item) => {
      items += `<li>${item.id} - ${item.name}</li>`;
    });
    items += "</ul>";

    res && res.send(items);
  });
}

//connection.end(); // onde chamar o connection.end?

app.get("/", (req, res) => {
  insertName();
  createResultPage(res);
});

app.listen(port, () => {
  console.log("running on port", 3000);
});