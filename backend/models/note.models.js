const mongoose = require("mongoose");

//Fields: Title, Content, tags, PinnedStatus,userId, createdOn
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdOn: {
    type: Date,
    default: new Date().getTime(),
  },
});

module.exports = mongoose.model("Note", noteSchema);
