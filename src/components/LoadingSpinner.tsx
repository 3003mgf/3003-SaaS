'use client'

import { TailSpin } from "react-loader-spinner";

type Props = {
  height: string;
  width: string;
  color?: string;
}

const LoadingSpinner = ({height, width, color}: Props) => {
  return ( 
    <TailSpin
      height={height}
      width={width}
      color={color || "#fff"}
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
   );
}
 
export default LoadingSpinner;