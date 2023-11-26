"use client";
import { useState, useEffect } from "react";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EnrollMFA from "../enrollMFA/page";
import UnenrollMFA from "../unenrollMFA/page";

function MFAComponent() {
  const [hasMFA, setHasMFA] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function checkMFA() {
      const supabase = createClientComponentClient();
      const { data, error } =
        await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

      console.log(data);
      if (error) {
        console.error(error);
        return;
      }

      if (data.currentLevel !== "aal1") {
        setHasMFA(true);
      }

      setIsLoading(false);
    }

    checkMFA();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-[1068px] mx-auto">
        <div className="bg-[#F4F4F4] p-8 rounded-2xl flex flex-col gap-6 text-center">
          <div className="flex flex-col">
            <div className="grid grid-cols-3 text-left py-4 px-6 text-base font-normal uppercase text-darkBlack bg-darkBlack/20 rounded-t-[4px]">
              <p>Type</p>
              <p>Status</p>
              <p></p>
            </div>
            <div className="grid grid-cols-3 items-center text-left p-6 border border-[#BBBBBB] rounded-b-[4px]">
              <p>Loading ...</p>
              <p>Loading ...</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary py-4 px-6 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed w-full"
              >
                Loading ...
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasMFA) {
    return (
      <div>
        <UnenrollMFA />
      </div>
    );
  }

  return (
    // Show non-MFA UI
    <>
      <div className="max-w-[1068px] mx-auto">
        <div className="bg-[#F4F4F4] p-8 rounded-2xl flex flex-col gap-6 text-center">
          <div className="flex flex-col">
            <div className="grid grid-cols-3 text-left py-4 px-6 text-base font-normal uppercase text-darkBlack bg-darkBlack/20 rounded-t-[4px]">
              <p>Type</p>
              <p>Status</p>
              <p></p>
            </div>
            <div className="grid grid-cols-3 items-center text-left p-6 border border-[#BBBBBB] rounded-b-[4px]">
              <p>Authenticator App</p>
              <p>Not Configured</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary py-4 px-6 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-darkBlack/20 disabled:cursor-not-allowed w-full"
              >
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Show Modal */}
      {isModalOpen && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full min-h-full bg-darkBlack/50">
          {/* Modal */}
          <div className="w-[630px] bg-white rounded-2xl">
            <EnrollMFA setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      )}
    </>
  );
}

export { MFAComponent };
