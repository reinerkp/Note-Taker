
const express = require("express");
const apiRoutes = require("./Routes/apiroutes");
const htmlRoutes = require ("./Routes/htmlroutes");

const PORT = process.env.PORT || 3001;



const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api", apiRoutes);
app.use("/",htmlRoutes);

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

// app.get("/notes", (req, res) => {
//   res.sendFile(path.join(__dirname, "./public/notes.html"));
// });

app.listen(PORT, () => {
  console.log(`The server is listening on PORT: ${PORT}`);
});


// app.post("/api/notes", (req, res) => {
//   const newNote = req.body;
//   newNote.id = Date.now().toString();
//   noteData.push(newNote);
//   fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
//     if (err) throw err;
//     res.json(newNote);
//   });
// });


// app.get("/api/notes", (req, res) => {
//   fs.readFile("./db/db.json", JSON.parse(noteData), (err) => {
//     if (err) throw err;
//     res.json(noteData);
//   });
// });
// document.getElementById("save-note").addEventListener("click", function(event){

