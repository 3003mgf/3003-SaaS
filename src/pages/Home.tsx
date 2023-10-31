import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return ( 
    <div className="relative isolate pt-14 dark:bg-gray-900">
      <div 
        className="absolute inset-x-0 top-28 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        {/* Backdrop Effect */}
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2
          rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>


      <div className="py-12 sm:py-20 lg:pb-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            
            {/* Intro */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Chat with anyone, anywhere.
            </h1>
            <p className="mt-6 text-lg leading-0 text-gray-600 dark:text-gray-300 font-LVRegular">
              You speak your language, they speak their language. &nbsp;
              <span className="text-pink-700 dark:text-pink-600">
                Let AI handle the translation.
              </span>
            </p>

            {/* Get Started & Pricing */}
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/chat"
                className="rounded-md bg-pink-700 font-semibold px-3.5 py-2.5 text-sm fonty text-white dark:text-white shadow-sm hover:bg-pink-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-700"
              >
                Get Started
              </Link>
              <Link
                href="/pricing"
                className="rounded-md px-3.5 font-semibold py-2.5 text-sm fonty text-white dark:text-white shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-700"
              >
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Image */}
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  unoptimized
                  src={"/images/giffy.gif"}
                  alt="Chatting with anyone, anywhere."
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      

      {/* Second Blob */}
      <div 
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        {/* Backdrop Effect */}
        <div
          className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2
          rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>
    </div>
   );
}
 
export default HomePage;