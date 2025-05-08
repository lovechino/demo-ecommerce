export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
        <p className="text-gray-600">Đang tải nội dung...</p>
      </div>
    </div>
  );
}
