import { Button } from '@/shared';

type UnknownErrorProps = {
  onClickRetry: () => void;
};

export default function UnknownError({ onClickRetry }: UnknownErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <h2 className="text-xl font-semibold mb-2">알 수 없는 오류</h2>
      <p className="text-gray-600 mb-4">
        예기치 못한 문제가 발생했습니다. <br />
        다시 시도해 주세요.
      </p>
      <Button onClick={onClickRetry} className="px-6">
        다시 시도
      </Button>
    </div>
  );
}
