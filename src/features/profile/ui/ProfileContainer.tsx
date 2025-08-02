import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { authOptions } from '@/entities/auth';

import { useSignOutMutation } from '@/features/profile';
import { useDeleteCurrentUserMutation } from '../model/useDeleteCurrentUserMutation';
import { AuthButtonContainer } from '@/features/auth';

export default function ProfileContainer() {
  const navigate = useNavigate();

  const { data: user } = useQuery(authOptions.auth());
  const signOutMutation = useSignOutMutation();
  const deleteUserMutation = useDeleteCurrentUserMutation();

  const handleSignOut = () => {
    signOutMutation.mutate();
    navigate('/', { replace: false });
  };

  const handleDeleteUser = () => {
    if (confirm('정말로 회원탈퇴를 하시겠습니까?')) {
      deleteUserMutation.mutate();
      navigate('/', { replace: false });
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-center text-gray-500 mt-4">
          로그인 후 프로필을 확인할 수 있습니다.
        </div>
        <AuthButtonContainer />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex flex-col m-3 mt-10 p-3">
        <div className="flex items-center justify-center">
          {user?.photoURL ? (
            <img
              src={user?.photoURL}
              alt="User Profile"
              className="w-24 h-24"
            />
          ) : (
            <div>No Profile Picture</div>
          )}
        </div>
        <div className="flex flex-col items-center mt-4">
          <span>{user?.displayName}</span>
          <span className="ml-2">{user?.email}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          className="bg-(--color-primary) text-white px-4 py-2 rounded"
          onClick={handleSignOut}
        >
          로그아웃
        </button>
        <button
          className="bg-(--color-secondary) text-white px-4 py-2 rounded"
          onClick={handleDeleteUser}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}
