import LoadingSpinner from "@/components/LoadingSpinner";

const LoadingScreen = () => {
  return ( 
    <div className="pt-[15rem] flex items-center flex-col space-y-4 justify-center overflow-hidden">
      <LoadingSpinner height="50" width="50"/>
      <h1 className="font-semibold text-lg tracking-tight animate-pulse">Loading...</h1>
    </div>
   );
}
 
export default LoadingScreen;