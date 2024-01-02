"use client";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

function TradeViewComp() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="flex gap-[10px] flex-col w-full h-fit">
      <div className="bg-[#F4F4F4] w-full h-full rounded-2xl p-8 flex flex-col gap-8">
        {/* amount row */}
        <div className="flex flex-col gap-2">
          <p className="text-lg">Amount:</p>
          <div className="flex gap-[10px]">
            <input
              className="w-full p-4 border border-border rounded-[4px] appearance-none disabled:bg-darkBlack/20 disabled:border-[#BBBBBB]"
              type="number"
              min="0.1"
              step={0.1}
              disabled={true}
              value="100"
            />{" "}
            <button
              disabled
              className="bg-[#BBBBBB] duration-300 transition-all rounded-[4px] items-center justify-center font-bold hover:bg-lightGray px-8 py-4 flex gap-[10px] disabled:bg-darkBlack/20 disabled:border-[#BBBBBB] disabled:cursor-not-allowed"
            >
              MAX
              <Image
                src="/assets/icons/dollar-sign-yellow.svg"
                height={16}
                width={16}
                alt="Dollar Icon"
              />
            </button>
          </div>
        </div>
        <button
          className="bg-primary p-4 mt-2 flex items-center justify-center rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-lightGray disabled:cursor-not-allowed"
          type="button"
          onClick={openModal}
        >
          Stop the trade
        </button>
      </div>
      <div className="bg-[#F4F4F4] w-full h-full rounded-2xl p-8 flex flex-col gap-8">
        <h2>Graph here</h2>
      </div>
      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col gap-8 w-full max-w-[719px] transform overflow-hidden rounded-2xl bg-white p-6 align-middle items-center shadow-xl transition-all text-center">
                  <h3 className="text-2xl p-4 rounded-2xl bg-lightlightGray w-full">
                    You are not authorized to perform this action
                  </h3>
                  <div className="w-full h-px bg-gray"></div>
                  <button
                    type="button"
                    className="bg-primary px-6 py-4 rounded-full duration-300 transition-all hover:bg-yellow disabled:bg-lightGray disabled:cursor-not-allowed w-fit"
                    onClick={closeModal}
                  >
                    Close this window
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default TradeViewComp;
