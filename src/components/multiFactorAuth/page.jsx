"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

export function EnrollMFA({ onEnrolled, onCancelled }) {
  const [factorId, setFactorId] = useState("");
  const [qr, setQR] = useState(""); // holds the QR code image SVG
  const [verifyCode, setVerifyCode] = useState(""); // contains the code entered by the user
  const [error, setError] = useState(""); // holds an error message

  const supabase = createClientComponentClient();

  const onEnableClicked = () => {
    setError("");
    (async () => {
      const challenge = await supabase.auth.mfa.challenge({ factorId });
      if (challenge.error) {
        setError(challenge.error.message);
        throw challenge.error;
      }

      const challengeId = challenge.data.id;

      const verify = await supabase.auth.mfa.verify({
        factorId,
        challengeId,
        code: verifyCode,
      });
      if (verify.error) {
        setError(verify.error.message);
        throw verify.error;
      }

      onEnrolled();
    })();
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
      });
      if (error) {
        throw error;
      }

      setFactorId(data.id);

      // Supabase Auth returns an SVG QR code which you can convert into a data
      // URL that you can place in an <img> tag.
      setQR(data.totp.qr_code);
    })();
  }, []);

  return (
    <>
      {error && <div className="error">{error}</div>}
      <Image src={qr} height={300} width={300} alt="QR Code" />
      <input
        type="text"
        value={verifyCode}
        onChange={(e) => setVerifyCode(e.target.value.trim())}
      />
      <input type="button" value="Enable" onClick={onEnableClicked} />
      <input type="button" value="Cancel" onClick={onCancelled} />
    </>
  );
}

export function UnenrollMFA() {
  const [factorId, setFactorId] = useState("");
  const [factors, setFactors] = useState([]);
  const [error, setError] = useState(""); // holds an error message

  const supabase = createClientComponentClient();

  console.log(factors);
  console.log(factorId);
  useEffect(() => {
    (async () => {
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
      <tbody>
        <tr>
          <td>Factor ID</td>
          <td>Friendly Name</td>
          <td>Factor Status</td>
        </tr>
        {factors.map((factor) => (
          <tr key={factor.id}>
            <td>{factor.id}</td>
            <td>{factor.friendly_name}</td>
            <td>{factor.factor_type}</td>
            <td>{factor.status}</td>
          </tr>
        ))}
      </tbody>

      <button onClick={() => supabase.auth.mfa.unenroll({ factorId })}>
        Unenroll
      </button>
    </>
  );
}
