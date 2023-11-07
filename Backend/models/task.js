import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // New fields for scheduling
    startDate: {
        type: Date,
        required: true // Set to true if you want the start date to be required
    },
    endDate: {
        type: Date,
        required: true // Set to true if you want the end date to be required
    }
});

export const Task = mongoose.model("Task", taskSchema);
