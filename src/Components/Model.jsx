import React from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const Model = ({ isOpen, modelClose, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className="grid place-items-center absolute z-40 backdrop-blur h-screen w-screen top-0 ">
          <div className="relative z-50 min-h-[200px] min-w-[370px] bg-white p-2 m-auto rounded-md">
            <div className="flex justify-end">
              <IoClose onClick={modelClose} className="text-2xl" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("model-root")
  );
};

export default Model;
