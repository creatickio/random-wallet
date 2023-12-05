"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function UnenrollMFA() {
  const [factorId, setFactorId] = useState("");
  const [factors, setFactors] = useState([]);
  const [error, setError] = useState(""); // holds an error message
  const [verifyCode, setVerifyCode] = useState(""); // holds the code entered by the user
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRemoveMfa = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/src/app/api/remove-mfa", {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) {
        throw error;
      }
      setFactors(data.totp);
    })();
  }, []);

  return (
    <>
      {error && <div className="error">{error}</div>}
      <div className="max-w-[1068px] mx-auto">
        <div className="bg-[#F4F4F4] p-8 rounded-2xl flex flex-col gap-6 text-center">
          <div className="flex flex-col">
            <div className="flex justify-between text-left py-4 px-6 text-base font-normal uppercase text-darkBlack bg-darkBlack/20 rounded-t-[4px]">
              <p>Type</p>
              <p>Status</p>
              <p className="text-darkBlack/0 select-none">Action</p>
            </div>
            {factors.map((factor) => (
              <div
                key={factor.id}
                className="flex justify-between items-center text-left p-6 border border-[#BBBBBB] rounded-b-[4px]"
              >
                {factor.factor_type && <p>Authenticator App</p>}
                {factor.status === "verified" ? (
                  <p className="bg-[#D3FFCE] text-darkBlack px-4 py-2 rounded-lg w-fit">
                    Verified
                  </p>
                ) : (
                  <p>Not Configured</p>
                )}
                <button
                  className="bg-primary py-4 px-6 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed w-fit self-end"
                  onClick={handleRemoveMfa}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Remove MFA"}
                </button>
                {error && <p>Error: {error}</p>}
                {success && (
                  <p>MFA factors removed and MFA level set to aal1</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
