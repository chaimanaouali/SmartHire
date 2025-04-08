import PageMeta from "../../components/common/PageMeta";
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/button/Button';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="SmartHire"
        description=""
      />
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <Button 
          onClick={() => navigate('/jobs')}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          Manage Jobs
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Clean dashboard content will go here */}
      </div>
    </>
  );
}
