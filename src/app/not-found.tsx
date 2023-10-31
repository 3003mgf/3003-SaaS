import Link from "next/link";

const NotFound = () => {
  return ( 
    <div className="flex items-center justify-center pt-[15rem] w-full flex-col">
      <h1 className="font-bold text-2xl mb-4 text-[#1f1f1f] dark:text-white"><span className="fonty text-[#1f1f1f] dark:text-white">404</span> Not Found</h1>
      <p className="fonty font-semibold text-xs tracking-wider text-gray-400 dark:text-white">{"You lost? Don't worry, click the button below and we'll take you to our Home!"}</p>
      <Link href="/" className="bg-pink-800 dark:bg-gray-950 mt-6 rounded-sm px-4 py-2 text-white font-semibold hover:opacity-80 cursor-pointer">
        Go Home
      </Link>
    </div>
   );
}
 
export default NotFound;