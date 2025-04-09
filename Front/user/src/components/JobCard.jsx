import React, { useState } from 'react';
import Modal from './Modal';
import './JobCard.css';

const JobCard = ({ job }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatSalary = (salary) => {
    if (!salary || !salary.min || !salary.max) return 'Salary not specified';
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
  };

  // Default image if job.image is not provided
  const defaultImage = '/img/job-default.jpg';

  return (
    <>
      <div className="job-card">
        <div className="job-card-image">
          <img src={job.image || defaultImage} alt={job.title} />
          <div className="job-type-badge">{job.type || 'Full Time'}</div>
        </div>
        <div className="job-card-content">
          <div className="job-category">{job.department || 'General'}</div>
          <h3 className="job-title">{job.title || 'Untitled Position'}</h3>
          <p className="job-description">
            {job.description?.substring(0, 100) || 'No description available'}...
          </p>
          <div className="job-meta">
            <div className="job-location">
              <i className="fa fa-map-marker"></i>
              {job.location || 'Location N/A'}
            </div>
            <div className="job-date">
              Posted: {formatDate(job.postedDate)}
            </div>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="view-job-btn">
            Learn More
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="job-details">
          <div className="job-details-header">
            <div className="job-image">
              <img src={job.image || defaultImage} alt={job.title} />
              <div className="job-type-badge">{job.type || 'Full Time'}</div>
            </div>
            <h2>{job.title}</h2>
            <div className="job-meta-info">
              <div className="meta-item">
                <i className="fas fa-building"></i>
                <span>{job.department || 'General'}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{job.location || 'Location N/A'}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-briefcase"></i>
                <span>{job.type || 'Full Time'}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>Posted: {formatDate(job.postedDate)}</span>
              </div>
            </div>
            <div className="salary-range">
              <i className="fas fa-money-bill-wave mr-2"></i>
              Salary Range: {formatSalary(job.salary)} per year
            </div>
          </div>

          <div className="job-description">
            <h3>Job Description</h3>
            <p>{job.description || 'No description available'}</p>
          </div>

          <div className="job-description">
            <h3>Required Experience</h3>
            <p>{job.experience || 'Experience requirements not specified'}</p>
          </div>

          <div className="application-deadline">
            <i className="fas fa-clock mr-2"></i>
            Application Deadline: {formatDate(job.deadline)}
          </div>

          <button
            className="apply-button"
            onClick={() => alert('Application feature coming soon!')}
          >
            Apply Now
          </button>
        </div>
      </Modal>
    </>
  );
};

export default JobCard; 