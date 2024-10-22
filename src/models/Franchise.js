import mongoose from "mongoose";

const FranchiseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  branches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch',
    },
  ],
},
{
  timestamps: true,
  versionKey: false,
}
);

export default mongoose.model("Franchise", FranchiseSchema);

