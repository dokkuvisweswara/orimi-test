export default function PodcastListSkeleton() {
  return (
    <div className="suggetion-paceholder animate-pulse">
      <div className="flex">
        <div className="flex flex-col w-20 h-5 bg-gray-600 mt-4 rounded-md ml-2"></div>
        <div className="flex flex-col w-20 h-5 bg-gray-600 mt-4 rounded-md ml-2"></div>
        <div className="flex flex-col w-20 h-5 bg-gray-600 mt-4 rounded-md ml-2"></div>
      </div>

      <div className="w-full h-20 bg-gray-600 mt-4 rounded-md"></div>
      <div className="mt-4">
        <div className="h-32 bg-gray-600 rounded-md w-full"></div>
      </div>
    </div>
  );
}
