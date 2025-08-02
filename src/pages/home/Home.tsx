import { AuthButtonContainer } from '@/features/auth';

export default function Home() {
  return (
    <div className="bg-gradient-to-t from-secondary to-primary flex flex-col items-center justify-center h-screen">
      <div className="flex-1 flex justify-center items-center flex-col">
        <img
          src="/common/logo_white.png"
          alt="P-Pick-Logo-white"
          className="w-48 h-48 mb-4"
        />
        <div className="flex flex-col justify-start gap-2 text-white">
          <p>
            MBTI의<span className="text-4xl font-bold">P</span>처럼 즉흥적으로
            떠나는 여행!
          </p>
          <p>
            지금 당장 여행지를<span className="text-4xl font-bold">Pick</span>
            하고 여행을 떠나보세요!
          </p>
        </div>
      </div>
      <AuthButtonContainer />
    </div>
  );
}
