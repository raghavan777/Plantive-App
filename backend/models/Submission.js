const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image: String,
    gpsLocation: {
        lat: Number,
        lng: Number
    },
    mlResult: String,
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

module.exports = mongoose.model("Submission", submissionSchema);