import { signOutUser } from '@/entities/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSignOutMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: signOutUser,
    onError: error => {
      console.error('로그아웃 실패', error);
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return mutation;
};
