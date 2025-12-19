import { useNavigate } from 'react-router-dom';

import { useSignInMutation } from '@/features/auth';

export default function AuthButtonContainer() {
  const navigate = useNavigate();
  const mutation = useSignInMutation();

  const handleGoogleLogin = () => {
    mutation.mutate();
  };
  const handleGuestLogin = () => {
    navigate('/tour/geo');
  };

  return (
    <div className="flex flex-col items-center justify-center m-2 p-2 w-full gap-2">
      <div className="w-full">
        <button
          onClick={handleGoogleLogin}
          className="bg-[#F2F2F2] w-full h-full py-3 rounded-xl cursor-pointer text-[#1F1F1F] font-medium"
        >
          <img
            src="/common/devicon_google.svg"
            alt="Google Logo"
            className="inline-block mr-[10px] w-5 h-5"
          />
          Google 계정으로 로그인
        </button>
      </div>
      <div className="w-full">
        <button
          onClick={handleGuestLogin}
          className="bg-white w-full h-full py-3 rounded-xl cursor-pointer text-(--color-primary-red) font-bold"
        >
          비회원으로 시작하기
        </button>
      </div>
    </div>
  );
}
