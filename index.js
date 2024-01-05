const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Tasks
const tasks = [
  {
    id: 0,
    title: "Complete coding assignment",
    description: "Finish the coding assignment for the programming course.",
    status: "In progress",
  },
  {
    id: 1,
    title: "Read a chapter of a book",
    description: 'Read chapter 5 of "The Hitchhiker\'s Guide to the Galaxy".',
    status: "Not started",
  },
  {
    id: 2,
    title: "Go for a 30-minute walk",
    description: "Take a break and go for a walk to refresh your mind.",
    status: "Completed",
  },
  {
    id: 3,
    title: "Create a grocery shopping list",
    description:
      "Make a list of items needed for the week and plan the budget.",
    status: "Pending",
  },
  {
    id: 4,
    title: "Practice playing the guitar for 1 hour",
    description: "Work on finger exercises and learn a new song on the guitar.",
    status: "In progress",
  },
];

// Get
app.get("/api/tasks", (req, res) => {
  const search = req.query.search ? req.query.search.toLowerCase() : null;
  const status = req.query.status ? req.query.status.toLowerCase() : null;

  let results = tasks;
  if (search)
    results = {
      match: results.filter((task) => task.title.toLowerCase() === search),
      include: results.filter((task) =>
        task.title.toLowerCase().includes(search)
      ),
    };
  if (status)
    results = results.filter((task) => task.status.toLowerCase() === status);

  if (results[0] || (search && (results.match[0] || results.include[0])))
    return res.status(200).json(results);
  else return res.status(404).json({ code: 404, error: "No task found." });
});
app.get("/api/tasks/:taskId", (req, res) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.taskId));

  if (task) return res.status(200).json(task);
  else return res.status(404).json({ code: 404, error: "No task found." });
});

// Post
app.post("/api/tasks", (req, res) => {
  let { title, description, status } = req.body;
  if (!status) status = "Not Started";

  if (!title || !description)
    return res
      .status(422)
      .json({ code: "422", error: "Missing field(s) in the request." });

  const task = {
    id: tasks.length,
    title,
    description,
    status,
  };
  tasks.push(task);
  return res.status(200).json({ task: task, tasks });
});

// Put
app.put("/api/tasks/:taskId", (req, res) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.taskId));
  if (!task)
    return res.status(404).json({ code: 404, error: "No task found." });

  const { title, description, status } = req.body;

  if (title) tasks[tasks.indexOf(task)].title = title;
  if (description) tasks[tasks.indexOf(task)].description = description;
  if (status) tasks[tasks.indexOf(task)].status = status;

  return res.status(200).json({ updateTask: task, tasks });
});

// Delete
app.delete("/api/tasks/:taskId", (req, res) => {
  const task = tasks.find((task) => task.id === parseInt(req.params.taskId));
  if (!task)
    return res.status(404).json({ code: 404, error: "No task found." });

  tasks.splice(tasks.indexOf(task), 1);

  return res.status(200).json({ deletedTask: task, tasks });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
