import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { BsShare } from "react-icons/bs";
import Facebook from "../assets/facebook-icon.svg";
import Linkedin from "../assets/linkedin-icon.svg";
import Whatsapp from "../assets/whatsapp-icon.svg";
import Twitter from "../assets/twitter-icon.svg";
import Mail from "../assets/mail-icon.svg";

const ShareModal = ({ isOpen, closeModal }) => {
  return (
    <>
      <Transition.Root appear show={isOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-black bg-opacity-60" />
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
                <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white p-11 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-md font-bold leading-6 text-gray-900"
                  >
                    Share
                  </Dialog.Title>
                  <div className="mt-2">
                    <IoMdClose
                      onClick={closeModal}
                      className="absolute text-slate-500 right-3 top-3 text-2xl cursor-pointer"
                    />
                    <div className="flex items-center space-x-3">
                      <p className="flex items-center flex-1 border-2 p-2 text-xs text-slate-500 border-slate-300 rounded-md border-dashed">
                        Link:
                        <span className="mx-2 font-semibold text-xs overflow-x-hidden text-black">
                          http://www.almabetter.com/asdfjasfdlj
                        </span>
                      </p>
                      <TbCopy className="text-xl text-slate-500 scale-x-[-1] cursor-pointer" />
                      <BsShare className="text-xl text-slate-500 cursor-pointer" />
                    </div>
                    <div className="mt-6 flex items-center space-x-10">
                      <img
                        src={Facebook}
                        alt="Facebook"
                        className="w-10 p-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <img
                        src={Linkedin}
                        alt="Linkedin"
                        className="w-10 p-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <img
                        src={Whatsapp}
                        alt="Whatsapp"
                        className="w-10 p-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <img
                        src={Twitter}
                        alt="Twitter"
                        className="w-10 p-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <img
                        src={Mail}
                        alt="Mail"
                        className="w-10 p-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ShareModal;
