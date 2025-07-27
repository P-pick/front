import { AuthButtonContainer } from '@/features/auth';

export default function Home() {
  return (
    <div className="bg-gradient-to-t from-secondary to-primary flex flex-col items-center justify-center h-screen">
      <div className="flex-1"></div>
      <AuthButtonContainer />
    </div>
  );
}
