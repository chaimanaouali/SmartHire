import express from 'express';
import Job from '../models/Job.js';


const router = express.Router();

// Create a job
router.post('/', async (req, res) => {
    try {
      // Use the correct model name `Job`
      const job = new Job(req.body);  // Correct the reference here
      await job.save();
      res.status(201).json(job);
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ message: 'Error creating job', error: error.message });
    }
  });
  
// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ postedDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

export default router;
