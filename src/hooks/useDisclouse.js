import React, { useState } from "react";

const useDisclouse = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modelOpen = () => {
    setIsOpen(true);
  };

  const modelClose = () => {
    setIsOpen(false);
  };
  return { isOpen, modelClose, modelOpen };
};

export default useDisclouse;
