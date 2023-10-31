import PricingCard from "@/components/PricingCard";
import { authOptions } from "@base/auth";
import { getServerSession } from "next-auth";

const RegisterPage = async() => {

  const session = await getServerSession(authOptions);
  
  
  return ( 
    <div className="isolate h-full overflow-hidden bg-gray-900 pb-40">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mt-2 text-4xl sm:text-5xl text-white font-bold tracking-tight">
            {"Let's handle your membership"} {session?.user?.name?.split(" ")?.[0]}!
          </p>
        </div>
        
        <div className="relative">
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"  
          >
            <ellipse
              cx={604}
              cy={512}
              fill="url(#radial-gradient)"
              rx={604}
              ry={512}
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6"/>
                <stop offset={1} stopColor="#E935C1"/>
              </radialGradient>
            </defs>
            <rect className="absolute inset-0 w-full h-full" fill="url(#gradient)"/>
          </svg>
        </div>
      </div>

      <PricingCard/>

    </div>
   );
}
 
export default RegisterPage;