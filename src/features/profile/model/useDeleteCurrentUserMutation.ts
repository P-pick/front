import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCurrentUser } from '@/entities/auth';
import { useNavigate } from 'react-router-dom';

export const useDeleteCurrentUserMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCurrentUser,
    onSuccess: () => {
      queryClient.clear();
      navigate('/', { replace: true });
    },
    onError: error => {
      console.error('사용자 삭제 실패', error);
    },
  });

  return mutation;
};
