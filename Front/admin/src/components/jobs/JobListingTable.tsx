import { JobListing } from '@/types/job';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import Badge from '@/components/ui/badge/Badge';
import { formatDate } from '@/utils/dateUtils';
import Button from '@/components/ui/button/Button';

interface JobListingTableProps {
  jobs: JobListing[];
  onEdit: (job: JobListing) => void;
  onDelete: (id: string) => void;
}

export default function JobListingTable({ jobs, onEdit, onDelete }: JobListingTableProps) {
  return (
    <div className="max-w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Posted Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.department}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell>
                <Badge color="info">{job.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  color={
                    job.status === 'active'
                      ? 'success'
                      : job.status === 'closed'
                      ? 'error'
                      : 'warning'
                  }
                >
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(job.postedDate)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button onClick={() => onEdit(job)} variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button onClick={() => onDelete(job.id)} variant="danger" size="sm" className="ml-2">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 