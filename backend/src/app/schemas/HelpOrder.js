import mongoose from 'mongoose';

const HelpOrder = new mongoose.Schema(
  {
    studentId: {
      type: Number,
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
    },
    answerAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('helpOrder', HelpOrder);
