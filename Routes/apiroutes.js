const path = require("path");
const router = require("express").Router();
const fs = require("fs");
const util = require("util");
const { v4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

function getNotes() {
  return readFileAsync("db/db.json", "utf8")
    .then((notes) => JSON.parse(notes))
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
}

function writeNotes(updatedNotes) {
  return writeFileAsync("db/db.json", JSON.stringify(updatedNotes))
    .then(() => {
      return updatedNotes;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    });
}

router.get("/notes", (req, res) => {
  getNotes()
    .then((notes) => res.status(200).json(notes))
    .catch((e) => res.status(500).json(e));
});

router.post("/notes", (req, res) => {
  console.log("post route");
  getNotes().then((notes) => {
    let newNote = req.body;
    newNote.id = v4();
    notes.push(newNote);

    writeNotes(notes)
      .then((newNote) => {
        res.status(200).json(newNote);
      })
      .catch((e) => res.status(500).json(e));
  });
});

router.delete("/notes/:id", (req, res) => {
  getNotes().then((notes) => {
    const filteredNotes = notes.filter((note) => note.id !== req.params.id);
    writeNotes(filteredNotes).then(() => {
      res.json({ message: "successfully deleted" });
    });
  });
});

module.exports = router;
