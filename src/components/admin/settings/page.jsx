"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Settings() {
  const [companyName, setCompanyName] = useState();
  const [defaultBtc, setDefaultBtc] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [location, setLocation] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState();
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const supabase = createClientComponentClient();
      const { data } = await supabase.from("settings").select();
      const settings = data[0];
      setCompanyName(settings.company_name);
      setDefaultBtc(settings.default_btc_address);
      setPhoneNumber(settings.phone_number);
      setLocation(settings.location);
      setEmail(settings.email);
      setImageUrl(settings.qr_code_url);
    }
    fetchData();
  }, []);

  //   update the data
  async function updateSettings(event) {
    event.preventDefault();
    const supabase = createClientComponentClient();
    const { data } = await supabase.from("settings").select();
    console.log(data);
    setLoading(true);

    const updates = {
      id: 1,
      company_name: companyName,
      default_btc_address: defaultBtc,
      phone_number: phoneNumber,
      location: location,
      email: email,
    };

    const { error } = await supabase.from("settings").upsert(updates);

    if (error) {
      setError(error.message);
      toast.error(`${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      setLoading(false);
      setUpdatedSuccessfully("Settings updated successfully");
      toast.success("Settings updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  // Handle Image Upload
  async function handleUpload(event) {
    try {
      setUploading(true);
      toast.info("Image is being uploaded ...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      if (!event.target.files || event.target.files.length === 0) {
        toast.error("You must select a file to upload.", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      const supabase = createClientComponentClient();
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Fetch the current uploaded QR Code Image from Storage
      const { data: qrcode } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);
      setImageUrl(qrcode.publicUrl);

      // show the success message of image uploaded
      toast.success("Image uploaded successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // Update the qr_code_url in settings table
      const { data } = await supabase.from("settings").select();
      const updateQRCode = {
        id: 1,
        qr_code_url: qrcode.publicUrl,
      };

      const { error } = await supabase.from("settings").upsert(updateQRCode);
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setUploading(false);
    }
  }

  // Remove the BTC QR Code Image
  async function removeImage() {
    const supabase = createClientComponentClient();
    const { data } = await supabase.from("settings").select();
    const removeQRCode = {
      id: 1,
      qr_code_url: "",
    };

    const { error } = await supabase.from("settings").upsert(removeQRCode);

    setImageUrl("");

    // show the success message of image removed
    // toast.success("Image removed successfully!", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "colored",
    // });

    if (error) {
      toast.error(`${error.message}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <form
      onSubmit={(event) => updateSettings(event)}
      className="text-left flex flex-col gap-6"
    >
      <ToastContainer />
      {/* Company Name */}
      <div className="flex flex-col w-full">
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter the company name"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* BTC Address */}
      <div className="flex flex-col w-full">
        <label htmlFor="btcAddress">Default BTC Address</label>
        <input
          type="text"
          name="btcAddress"
          id="btcAddress"
          value={defaultBtc || ""}
          onChange={(e) => setDefaultBtc(e.target.value)}
          placeholder="Enter your btc address"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* BTC QR Code */}
      <div className="flex flex-col w-full">
        <label htmlFor="file">Default QR code for BTC address</label>
        {!imageUrl ? (
          <>
            <div class="flex items-center justify-center w-full">
              <label
                for="file"
                class="flex flex-col items-center justify-center w-full h-40 bg-[#CFCFCF] rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> your QR
                    Code
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    PNG, or JPG allowed only
                  </p>
                </div>
                <input
                  type="file"
                  id="file"
                  onChange={handleUpload}
                  disabled={uploading}
                  class="hidden"
                />
              </label>
            </div>
          </>
        ) : (
          <div className="border border-slate-200 p-4 rounded-lg bg-white flex justify-between items-end">
            <Image src={imageUrl} width={300} height={300} />
            <div className="w-6/12">
              <p>
                If you want to replace the image you need to remove it first and
                then upload a new image
              </p>
              <button
                onClick={removeImage}
                className="bg-primary p-4 mt-2 w-full flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow"
              >
                Remove Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Phone Number and Currency */}
      <div className="flex flex-col w-full">
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={phoneNumber || ""}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>

      {/* Location */}
      <div className="flex flex-col w-full">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          value={location || ""}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your address"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      {/* Email */}
      <div className="flex flex-col w-full">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter the email address"
          className="border border-slate-200 p-4 rounded-lg disabled:bg-darkBlack/20 disabled:cursor-not-allowed"
        />
      </div>
      <button
        className="bg-primary p-4 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow"
        type="submit"
        disabled={loading}
      >
        {loading ? "Loading ..." : "Save changes"}
      </button>
      {error && <p>{error}</p>}
      {updatedSuccessfully !== "" && (
        <p className="text-center text-green-500">{updatedSuccessfully}</p>
      )}
    </form>
  );
}

export default Settings;
