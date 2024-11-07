import SkeletonCard from "./skeletonCard";

export default function HomeSkeleton() {
  return (
      <main className="flex min-h-screen flex-col p-10">
        <SkeletonCard/> 
        <SkeletonCard/> 
        <SkeletonCard/> 
      </main>

  );
}
