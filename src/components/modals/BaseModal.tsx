import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon as XCircleOutline } from "@heroicons/react/24/outline";
import { XCircleIcon as XCircleSolid } from "@heroicons/react/24/solid";
import { Fragment } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
};

export const BaseModal = ({ title, children, isOpen, handleClose }: Props) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex min-h-full items-center justify-center px-4 py-10 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 min-h-screen bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="overflow-hidden rounded-lg bg-white p-5 text-left shadow-xl dark:bg-gray-800 sm:w-full sm:max-w-md">
              <div className="flex justify-between">
                <Dialog.Title
                  as="h2"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
                >
                  {title}
                </Dialog.Title>
                <div
                  className="icon-group group"
                  tabIndex={0}
                  onClick={() => handleClose()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleClose();
                    }
                  }}
                >
                  <XCircleSolid className="icon-solid opacity-0 group-hover:opacity-100" />
                  <XCircleOutline className="icon-outline opacity-100 group-hover:opacity-0" />
                </div>
              </div>
              <div className="mt-5">{children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
