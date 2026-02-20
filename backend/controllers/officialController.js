const Submission = require("../models/Submission");

exports.getAllSubmissions = async (req, res) => {
    const submissions = await Submission.find()
        .populate("farmer", "name email");

    res.json(submissions);
};

exports.verifySubmission = async (req, res) => {
    const { status } = req.body;

    const submission = await Submission.findById(req.params.id);
    submission.status = status;
    submission.verifiedBy = req.user.id;

    await submission.save();
    res.json(submission);
};