
const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const noteData = require("./db/db.json");
const { response } = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () => {
  console.log(`The server is listening on PORT: ${PORT}`);
});


app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = Date.now().toString();
  noteData.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
    if (err) throw err;
    res.json(newNote);
  });
});


app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", JSON.parse(noteData), (err) => {
    if (err) throw err;
    res.json(noteData);
  });
});
// document.getElementById("save-note").addEventListener("click", function(event){

// event.preventDefault();
// const noteTitle = document.getElementById("note-title").value; 
// const noteText = document.getElementById("note-text").value; 
// const newNote = { title: noteTitle, Text: noteText };
// fetch("/api/notes", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify(newNote)
// })
// .then(response => response.json())
// .then(data => {
//   console.log(data);
// })
// .catch(error => console.error(error));
// })