import { CheckIcon } from "lucide-react";
import Link from "next/link";
import CheckoutButton from "./CheckoutButton";

const options = [
  {
    name: "Starter",
    id: null,
    href: "#",
    priceMonthly: null,
    description: "Get chatting right away with anyone, anywhere!",
    features: [
      "20 Messages Chat Limit in Chats",
      "2 Participant limit in Chat",
      "3 Chat Rooms limit",
      "Supports 2 languages",
      "48-hour support response time"
    ]
  },
  {
    name: "Pro",
    id: "30_pro_plan",
    href: "#",
    priceMonthly: "€5.99",
    description: "Unlock the full potential with Pro!",
    features: [
      "Unlimited messages in Chats",
      "Unlimited participants in Chat",
      "Unlimited Chat Rooms",
      "Supports up to 10 languages",
      "Multimedia support in chats (coming soon)",
      "1-hour, dedicated support response time",
      'Early access to New Features'
    ]
  }
]


const PricingCard = ({redirect}: {redirect?: boolean}) => {
  return ( 
    <div> 
      <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2"> 
        {options.map((plan) => (
          <div 
            key={plan.name + "key"}
            className="flex flex-col bg-white rounded-3xl justify-between p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10"
          >
            <div>
              {/* NAME */}
              <h3 className="text-base font-semibold leading-7 text-pink-600">
                {plan.name}
              </h3>

              {/* PRICE */}
              <div className="mt-4 flex items-baseline gap-x-2">
                {plan.priceMonthly ? (
                  <>
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {plan.priceMonthly}
                    </span>
                    <span className="text-base font-LVRegular font-semibold leading-7 text-gray-600">
                      /month
                    </span>
                  </>
                ):(
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    Free
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="mt-6 text-lg leading-7 font-LVRegular font-bold tracking-wide text-gray-600">
                {plan.description}
              </p>

              {/* FEATURES */}
              <ul
                role="list"
                className="mt-10 space-y-4 font-LVRegular leading-6 text-gray-600"
              >
                {plan.features.map(feature => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-pink-700" aria-hidden='true'/>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* BUTTON */}
            {redirect ? (
              <Link
                href="/register"
                className="w-full bg-pink-800 px-3 py-2 text-white font-semibold text-center mt-8 rounded-md leading-6 shadow-sm cursor-pointer hover:bg-pink-700 transition-colors duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                Get Started Today
              </Link>
            ):(
              plan.id && <CheckoutButton/>
            )}
          </div>
        ))}
      </div>

    </div>
   );
}
 
export default PricingCard;