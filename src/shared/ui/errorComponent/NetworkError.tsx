import { Button } from '@/shared';

type NetworkErrorProps = {
  onClickRetry: () => void;
};

export default function NetworkError({ onClickRetry }: NetworkErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <h2 className="text-xl font-semibold mb-2">네트워크 오류</h2>
      <p className="text-gray-600 mb-4">
        인터넷 연결이 불안정하거나 서버에 접근할 수 없습니다.
      </p>
      <Button onClick={onClickRetry} className="px-6">
        다시 시도
      </Button>
    </div>
  );
}
