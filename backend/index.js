require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
const User = require("./models/user.models");
const Note = require("./models/note.models");

//Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

//DB Connection
try {
  mongoose.connect(process.env.MONGO_DB_URL);
  console.log("DB Connected");
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.json("Hello World");
});

//Create Account
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is required" });
  }

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is required" });
  }

  const isUser = await User.findOne({ email });

  if (isUser) {
    return res.json({
      error: true,
      message: "User Already Exist",
    });
  }

  const user = new User({
    fullName,
    email,
    password,
  });

  await user.save();

  const accssToken = jwt.sign(
    { _id: user._id, fullName: user.fullName, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "360000m",
    }
  );

  return res.json({
    error: false,
    user,
    accssToken,
    message: "Registration Successful",
  });
});

//Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const userInfo = await User.findOne({ email: email });

  if (!userInfo) {
    return res.status(400).json({ message: "user not found" });
  }

  if (userInfo.email == email && userInfo.password == password) {
    const user = { user: userInfo };
    const accssToken = jwt.sign(
      {
        _id: userInfo._id,
        fullName: userInfo.fullName,
        email: userInfo.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "360000m",
      }
    );
    return res.status(200).json({
      error: false,
      user,
      accssToken,
      message: "Logged In Successful",
    });
  } else {
    res.status(400).json({
      error: true,
      message: "Invalid Credentials",
    });
  }
});

//Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  try {
    // Debug: Log what's in req.user
    console.log("Full req.user object:", req.user);
    console.log("req.user._id:", req.user._id);
    console.log("req.user.u_id:", req.user.u_id);

    const userId = req.user.u_id || req.user._id;

    console.log("Final userId:", userId);

    if (!userId) {
      return res.status(400).json({
        error: true,
        message: "Invalid token structure - no user ID found",
        debugInfo: req.user,
      });
    }

    const isUser = await User.findOne({ _id: userId });

    if (!isUser) {
      return res.status(401).json({
        error: true,
        message: "User not found",
      });
    }

    return res.json({
      error: false,
      user: {
        _id: isUser._id,
        fullName: isUser.fullName,
        email: isUser.email,
      },
      message: "User fetched successfully",
    });
  } catch (error) {
    console.error("Error in get-user:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// Add Note
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      error: true,
      message: "Missing either Title or Content",
    });
  }

  try {
    const note = new Note({
      title,
      content,
      tags: Array.isArray(tags) ? tags : [],
      userId: req.user._id,
    });

    const savedNote = await note.save();

    return res.status(200).json({
      error: false,
      note: savedNote,
      message: "Note Added Successfully",
    });
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({
      error: true,
      message: "Server Error",
    });
  }
});

//Edit Note
app.put("/edit-note/:noteID", authenticateToken, async (req, res) => {
  const noteID = req.params.noteID;
  console.log("Note ID:", noteID);

  const { title, content, tags, isPinned } = req.body;

  const userId = req.user._id || req.user.id;

  // console.log("User ID:", userId);
  // console.log("Request body:", req.body);

  if (!title && !content && !tags && isPinned === undefined) {
    return res
      .status(400)
      .json({ error: true, message: "No update fields provided" });
  }

  try {
    const note = await Note.findOne({ _id: noteID, userId: userId });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found or you don't have permission to edit it",
      });
    }

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;
    if (isPinned !== undefined) note.isPinned = isPinned;

    note.updatedAt = new Date();

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

app.get("/get-all-notes", authenticateToken, async (req, res) => {
  const userId = req.user._id;

  try {
    const notes = await Note.find({
      userId: userId,
    }).sort({ isPinned: -1 });

    return res.status(200).json({
      error: false,
      notes,
      message: "Fetched All Notes",
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

//Delete Note
app.delete("/delete-note/:noteID", authenticateToken, async (req, res) => {
  const noteID = req.params.noteID;
  const userId = req.user._id;

  try {
    const note = await Note.findOne({ _id: noteID, userId: userId });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found or you don't have permission to delete it",
      });
    }

    await Note.deleteOne({ _id: noteID, userId: userId });

    return res.json({
      error: false,
      message: "Note Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

//Pin Note
app.put("/pin-note/:noteID", authenticateToken, async (req, res) => {
  const noteID = req.params.noteID;
  console.log("Note ID:", noteID);

  const { isPinned } = req.body;

  const userId = req.user._id || req.user.id;

  try {
    const note = await Note.findOne({ _id: noteID, userId: userId });

    if (!note) {
      return res.status(404).json({
        error: true,
        message: "Note not found or you don't have permission to edit it",
      });
    }

    if (isPinned !== undefined) note.isPinned = isPinned;

    note.updatedAt = new Date();

    await note.save();

    return res.status(200).json({
      error: false,
      note,
      message: "Note Pinned successfully",
    });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

//search notes
app.get("/search-note", authenticateToken, async (req, res) => {
  const userId = req.user._id;
  const { query } = req.query;

  if (!query) {
    return res
      .status(400)
      .json({ error: true, message: "Search Query is required" });
  }

  try {
    const matchingNotes = await Note.find({
      userId: userId,
      $or: [
        { title: { $regex: new RegExp(query, "i") } },
        { content: { $regex: new RegExp(query, "i") } },
        { tags: { $in: [new RegExp(query, "i")] } }
      ],
    }).sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch (error) {
    console.error("Error searching notes:", error);
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

app.listen(8000);

module.exports = app;
