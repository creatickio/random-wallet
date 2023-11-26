"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function UnenrollMFA() {
  const [factorId, setFactorId] = useState("");
  const [factors, setFactors] = useState([]);
  const [error, setError] = useState(""); // holds an error message
  const [verifyCode, setVerifyCode] = useState(""); // holds the code entered by the user

  const supabase = createClientComponentClient();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.mfa.listFactors();
      if (error) {
        throw error;
      }
      setFactors(data.totp);
    })();
  }, []);

  async function handleUnenrollFactor() {
    const { error } = await supabase.auth.mfa.unenroll({ factorId });
    if (error) {
      setError(error.message);
      return;
    }
    setFactorId(factors[0].id);
    setVerifyCode("");
    const { data, error: fetchError } = await supabase.auth.mfa.listFactors();
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    setFactors(data.totp);

    // Update the user's metadata to set the current MFA level to null
    const { user, error: updateError } = await supabase.auth.update({
      data: { currentLevel: null },
    });

    if (updateError) {
      console.error(updateError);
      return;
    }

    console.log(user);
  }

  return (
    <>
      {error && <div className="error">{error}</div>}
      <div className="max-w-[1068px] mx-auto">
        <div className="bg-[#F4F4F4] p-8 rounded-2xl flex flex-col gap-6 text-center">
          <div className="flex flex-col">
            <div className="grid grid-cols-3 text-left py-4 px-6 text-base font-normal uppercase text-darkBlack bg-darkBlack/20 rounded-t-[4px]">
              <p>Type</p>
              <p>Status</p>
              <p></p>
            </div>
            {factors.map((factor) => (
              <div
                key={factor.id}
                className="grid grid-cols-3 items-center text-left p-6 border border-[#BBBBBB] rounded-b-[4px]"
              >
                <p>{factor.factor_type}</p>
                <p>{factor.status}</p>
                <td>{factor.friendly_name}</td>
                <td>{factor.factor_type}</td>
                <button
                  onClick={handleUnenrollFactor}
                  className="bg-primary py-4 px-6 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed w-full"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* old */}
      <table>
        <thead>
          <tr>
            <th>Factor ID</th>
            <th>Friendly Name</th>
            <th>Factor Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {factors.map((factor) => (
            <tr key={factor.id}>
              <td>{factor.id}</td>
              <td>{factor.friendly_name}</td>
              <td>{factor.factor_type}</td>
              <td>{factor.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <input
        type="text"
        value={factorId}
        onChange={(e) => setFactorId(e.target.value.trim())}
      />
      <input
        type="text"
        value={verifyCode}
        onChange={(e) => setVerifyCode(e.target.value.trim())}
      />
      <button onClick={handleUnenrollFactor}>Unenroll</button>
    </>
  );
}
