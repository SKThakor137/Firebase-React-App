import React from "react";

const NotFoundContact = () => {
  return (
    <div className="flex items-center justify-center gap-4 h-[80vh]">
      <div>
        <img src="/Contact.png" alt="Image of not found user" />
      </div>
      <h3 className="text-white font-semibold text-2xl">Contact Not Found</h3>
    </div>
  );
};

export default NotFoundContact;
