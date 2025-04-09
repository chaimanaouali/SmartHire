import { useState, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import PageBreadcrumb from '@/components/common/PageBreadCrumb';
import { JobListing } from '@/types/job';
import JobListingTable from '@/components/jobs/JobListingTable';
import CreateJobModal from '@/components/jobs/CreateJobModal';
import Button from '@/components/ui/button/Button';
import Input from '@/components/form/input/InputField';
import Select from '@/components/form/Select';
import { jobsApi } from '@/utils/api';
import axios from 'axios';  // Add this line


export default function JobManagement() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<(JobListing & { id: string }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    type: '',
    status: ''
  });
  
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    fetchJobs();
  }, [debouncedSearch, filters]);

  const fetchJobs = async () => {
    try {
      setIsLoading(true);
      const data = await jobsApi.getJobs({
        search: debouncedSearch,
        ...filters
      });
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /*const handleCreateJob = async (jobData: JobFormData) => {
    try {
      const newJob = await jobsApi.createJob(jobData);
      setJobs([...jobs, newJob]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };*/
  // Update the type in your component to use JobListing
  const handleCreateJob = async (data: JobListing) => {
    console.log("Sending data:", data); // Log the data to see its structure
    try {
      const res = await axios.post('/api/jobs', data);
      console.log('Job created:', res.data);
      setJobs([...jobs, res.data]);
    } catch (err) {
      console.error('Error creating job:', err);
    }
  };
  

  
  
    /*const result = await res.json();
    console.log('Job created:', result);
    // Optionally refresh your job list here
  };*/
  

  const handleEditJob = (job: JobListing) => {
    setSelectedJob(job);
    setIsCreateModalOpen(true);
  };

  const handleUpdateJob = async (job: JobListing) => {
    if (!selectedJob?.id) return;
    try {
      const updatedJob = await jobsApi.updateJob(selectedJob.id, {
        ...job,
        postedDate: selectedJob.postedDate
      });
      setJobs(jobs.map(job => job.id === selectedJob.id ? updatedJob : job));
      setIsCreateModalOpen(false);
      setSelectedJob(null);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      try {
        await jobsApi.deleteJob(id);
        setJobs(jobs.filter(job => job.id !== id));
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PageBreadcrumb pageName="Job Management" />
        
        <Button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          + Create New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white/90">
              Job Listings
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
            <Input
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              options={[
                { value: '', label: 'All Departments' },
                { value: 'engineering', label: 'Engineering' },
                { value: 'marketing', label: 'Marketing' },
                { value: 'sales', label: 'Sales' }
              ]}
            />
            <Select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              options={[
                { value: '', label: 'All Types' },
                { value: 'full-time', label: 'Full Time' },
                { value: 'part-time', label: 'Part Time' },
                { value: 'contract', label: 'Contract' }
              ]}
            />
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-40">
              <span className="text-gray-500">Loading...</span>
            </div>
          ) : (
            <JobListingTable 
              jobs={jobs}
              onEdit={handleEditJob}
              onDelete={handleDeleteJob}
            />
          )}
        </div>
      </div>

      <CreateJobModal 
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setSelectedJob(null);
        }}
        onCreate={handleCreateJob}
        onUpdate={handleUpdateJob}
        initialData={selectedJob}
      />
    </>
  );
} 