import { signOutUser } from '@/entities/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useSignOutMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      navigate('/', { replace: true });
      queryClient.clear();
    },
    onError: error => {
      console.error('로그아웃 실패', error);
    },
  });

  return mutation;
};
