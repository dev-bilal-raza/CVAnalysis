import JobDetailsPage from '@/components/pages/JobDetailsPage';
import MainContainer from '@/components/layout/MainContainer';

const page = ({ params }: { params: { job_id: number } }) => {
  return (
    <MainContainer>
      <div>
        <JobDetailsPage job_id={params.job_id} />
      </div>
    </MainContainer>
  );
};

export default page;
