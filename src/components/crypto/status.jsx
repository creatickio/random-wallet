import React from "react";
export default function Status({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <p className="font-light text-darkBlack text-[21px]">{label}</p>
      <p className="font-medium text-darkBlack text-[27px]">{value}</p>
    </div>
  );
}
