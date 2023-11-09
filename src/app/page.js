import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-between py-6 px-6">
        <div>Welcome to Random Wallet</div>
        <ul className="flex gap-4">
          <li>
            <Link
              href="/signin"
              className="border-black border rounded-full py-4 px-6"
            >
              Sign in
            </Link>
          </li>
          <li>
            <Link
              href="/signup"
              className="bg-[#FFD100] rounded-full py-4 px-6 text-black"
            >
              Register for free
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
