import React from "react";
import Model from "./Model";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdate = ({ isOpen, modelClose, isUpdate, contact }) => {

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      modelClose();
      toast.success("Contact Added sSuccessfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      modelClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Model isOpen={isOpen} modelClose={modelClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContact(values, contact.id) : addContact(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>{" "}
              <Field name="name" className="border h-10 rounded-md"></Field>
              <div className="text-red-500 text-xs">
                <ErrorMessage name="name"></ErrorMessage>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>{" "}
              <Field name="email" className="border h-10 rounded-md"></Field>
            </div>
            <div className="text-red-500 text-xs">
                <ErrorMessage name="email"></ErrorMessage>
              </div>

            <button className="bg-orange px-3 py-1.5 self-end rounded-md font-medium">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Model>
    </div>
  );
};

export default AddAndUpdate;
