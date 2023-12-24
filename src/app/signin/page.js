import Image from "next/image";
import SignIn from "@/components/signIn/page";
import IPAddress from "@/components/ipAddress/page";

function Signin() {
  const userIP = IPAddress();
  // console.log("User IP Address:", userIP);
  return (
    <div className="flex">
      {/* Form */}
      <div className="lg:w-6/12 w-full h-screen flex flex-col justify-between">
        <SignIn />
      </div>
      {/* Image on the right side */}
      <div className="w-6/12 bg-slate-200 h-screen relative hidden lg:flex">
        <Image
          src="/assets/sign-in-bg.svg"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

export default Signin;
