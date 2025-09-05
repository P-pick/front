export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <h2 className="text-xl font-semibold mb-2">서버 점검 중</h2>
      <p className="text-gray-600">
        현재 서버 점검이 진행 중입니다. <br />
        잠시 후 다시 접속해 주세요.
      </p>
    </div>
  );
}
