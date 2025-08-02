import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCurrentUser } from '@/entities/auth';

export const useDeleteCurrentUserMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCurrentUser,
    onSuccess: () => {
      queryClient.clear();
    },
    onError: error => {
      console.error('사용자 삭제 실패', error);
    },
  });

  return mutation;
};
