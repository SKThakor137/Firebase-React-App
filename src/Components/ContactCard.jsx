import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { RiEditCircleLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/firebase";
import AddAndUpdate from "./AddAndUpdate";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, modelClose, modelOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted sSuccessfully")

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-2 rounded-lg mt-4 bg-yellow">
        <div className="flex gap-2 items-center">
          <FaRegUserCircle className="text-orange text-3xl" />
          <div className="">
            <h2 className="font-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine className="cursor-pointer" onClick={modelOpen} />
          <MdDelete
            className="text-orange cursor-pointer"
            onClick={() => deleteContact(contact.id)}
          />
        </div>
      </div>
      <AddAndUpdate isUpdate modelClose={modelClose} isOpen={isOpen} contact={contact} />
    </>
  );
};

export default ContactCard;
