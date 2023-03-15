// Reads the Javascript rile, executes it, and also returns JSON objects
const { json } = require("express");
const notesData = require("./db/db.json");

// Set user port
const PORT = process.env.PORT || 3001;

// Create express server 
const app = express();

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    res.json(notesData.slice(1));
});

app.use(express.urlencoded({extended: true}));

app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Function to save new notes
function createNewNotes(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
    notesArray = [];

    if (notesArray.length === 0)
    notesArray.push(0);
    
    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    FileSystem.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}
