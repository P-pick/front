import { signIn } from '@/entities/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSignInMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      queryClient.clear();
      navigate('/tour/geo-trip?distance=20000&tour-type=12');
    },
    onError: error => {
      console.error('로그인 실패', error);
    },
  });
  return mutation;
};

export default useSignInMutation;
