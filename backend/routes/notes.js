const express = require('express');
const router = express.Router()
const fetchUser = require('../middleware/fetchUser');
const note = require('../models/note')
const { body, validationResult } = require('express-validator');

router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const Notes = await note.find({ User: req.User.id })
        res.json(Notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal error has occurred" });
    }
})

router.post('/addNotes', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, description, tag } = req.body
        const Note = note({
            title, description, tag, User: req.User.id
        })
        const savedNotes = await Note.save()
        res.json(savedNotes)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal error has occurred" });
    }

})
router.put('/updateNotes/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body

        let newNotes = {}
        if (title) { newNotes.title = title }
        if (description) { newNotes.description = description }
        if (tag) { newNotes.tag = tag }


        let Note = await note.findById(req.params.id)
        if (!Note) { return res.status(404).send("Not Found") }

        if (Note.User.toString() != req.User.id) { return res.status(401).send("Not Allowed") }

        Note = await note.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        res.json({ Note })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal error has occurred" });
    }
})

router.delete('/deleteNote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body

        let newNotes = {}
        if (title) { newNotes.title = title }
        if (description) { newNotes.description = description }
        if (tag) { newNotes.tag = tag }


        let Note = await note.findById(req.params.id)
        if (!Note) { return res.status(404).send("Not Found") }

        if (Note.User.toString() != req.User.id) { return res.status(401).send("Not Allowed") }

        Note = await note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note deleted Successfully" })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal error has occurred" });
    }
})

module.exports = router