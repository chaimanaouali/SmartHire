import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job details');
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-8">{error}</div>;
  if (!job) return <div className="text-center py-8">Job not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/jobs"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Back to Jobs
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-gray-600">
            <div>
              <span className="font-medium">Department:</span> {job.department}
            </div>
            <div>
              <span className="font-medium">Location:</span> {job.location}
            </div>
            <div>
              <span className="font-medium">Job Type:</span> {job.type}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-3">Salary Range</h2>
            <p className="text-gray-700">
              ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()} per year
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Experience Required</h2>
            <p className="text-gray-700">{job.experience}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <div className="prose max-w-none text-gray-700">
            {job.description}
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center bg-gray-50 p-6 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Posted on {formatDate(job.postedDate)}</p>
            <p className="text-sm font-medium text-red-600">
              Application Deadline: {formatDate(job.deadline)}
            </p>
          </div>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => {
              // TODO: Implement apply functionality
              alert('Application functionality coming soon!');
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 