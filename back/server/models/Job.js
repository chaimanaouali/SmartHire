// job.model.js (in the models folder)
import mongoose from 'mongoose';

const jobListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ['full-time', 'part-time', 'contract', 'internship'], required: true },
  experience: { type: String, required: true },
  description: { type: String, required: true },
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  status: { type: String, enum: ['active', 'draft'], required: true },
  deadline: { type: Date, required: true },
  postedDate: { type: Date, default: Date.now },
  image: { type: String, default: null }
});

export default mongoose.model('JobListing', jobListingSchema); 
