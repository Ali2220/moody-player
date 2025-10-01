const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadFile = require("../service/storage.service");
const songModel = require('../models/song.model');
const song = require("../models/song.model");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/songs", upload.single("audio"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No audio file uploaded",
      });
    }
    const fileData = await uploadFile(req.file);
    
    const song = await songModel.create({
      title: req.body.title,
      artist: req.body.title,
      audio: fileData.url,
      mood: req.body.mood
    })

    res.json({
      message: "Song created Successfully",
      song,
    });
  } catch (err) {
    res.json({
      err,
    });
  }
});

router.get('/songs', async(req, res) => {
  const {mood} = req.query

  const songs = await songModel.find({
    mood: mood
  })

  res.status(200).json({
    message: 'Songs fetched Successfully',
    songs
  })
})

module.exports = router;
