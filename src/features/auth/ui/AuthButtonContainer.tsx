import { signIn } from '@/entities/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export default function AuthButtonContainer() {
  const navigate = useNavigate();
  const { mutate } = useMutation({ mutationFn: signIn });

  const handleKakaoLogin = () => {
    mutate();
  };
  const handleGuestLogin = () => {
    navigate('/tour/geo-trip?distance=1000&tour-type=12');
  };

  return (
    <div className="flex flex-col items-center justify-center m-2 p-2 w-full gap-2">
      <div className="w-full">
        <button
          onClick={handleKakaoLogin}
          className="bg-[#FEE500] w-full h-full py-3 rounded-xl cursor-pointer text-[#191919] font-bold"
        >
          <img
            src="/kakaotalk.png"
            alt="KakaoTalk Logo"
            className="inline-block mr-2 w-5 h-5"
          />
          카카오로 시작하기
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
