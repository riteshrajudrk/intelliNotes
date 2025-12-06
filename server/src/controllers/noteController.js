import Note from "../models/Note.js";

// @desc    Create a new note
// @route   POST /api/notes
export const createNote = async (req, res, next) => {
  try {
    const { title, content, topicTags } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const note = await Note.create({
      title,
      content,
      topicTags: topicTags || [],
    });

    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

// @desc    Get all notes
// @route   GET /api/notes
export const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single note by ID
// @route   GET /api/notes/:id
export const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      return next(new Error("Note not found"));
    }

    res.json(note);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
export const updateNote = async (req, res, next) => {
  try {
    const { title, content, topicTags } = req.body;

    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      return next(new Error("Note not found"));
    }

    note.title = title ?? note.title;
    note.content = content ?? note.content;
    note.topicTags = topicTags ?? note.topicTags;

    const updated = await note.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
export const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      res.status(404);
      return next(new Error("Note not found"));
    }

    await note.deleteOne();

    res.json({ message: "Note removed" });
  } catch (err) {
    next(err);
  }
};
