const Submission = require("../models/Submission");
const multer = require("multer");
const axios = require("axios");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

exports.upload = multer({ storage }).single("image");

exports.createSubmission = async (req, res) => {
    const { lat, lng } = req.body;

    let mlResult = "Not processed";

    // ML API integration (future)
    try {
        const response = await axios.post("http://localhost:8000/predict", {
            imagePath: req.file.path
        });
        mlResult = response.data.result;
    } catch (error) {
        console.log("ML not connected yet");
    }

    const submission = await Submission.create({
        farmer: req.user.id,
        image: req.file.path,
        gpsLocation: { lat, lng },
        mlResult
    });

    res.json(submission);
};

exports.getMySubmissions = async (req, res) => {
    const submissions = await Submission.find({ farmer: req.user.id });
    res.json(submissions);
};