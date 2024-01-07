import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import NotFoundContact from "./Components/NotFoundContact";
import ContactCard from "./Components/ContactCard";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./Config/firebase";
import Model from "./Components/Model";
import AddAndUpdate from "./Components/AddAndUpdate";
import useDisclouse from "./hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, modelClose, modelOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contacts");

        onSnapshot(contactRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContact = (e) => {
    const value = e.target.value;

    const contactRef = collection(db, "contacts");
    onSnapshot(contactRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(contactList);


      const filterdContacts = contactList.filter((contact) => 
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      
      setContacts(filterdContacts)

      return filterdContacts
    });
  };

  return (
    <>
      <div class="max-w-[370px]  mx-auto shadow-lg ring-2 ring-white ring-gray-100 p-4 mt-2 rounded-md">
        <Navbar />
        <SearchBar modelOpen={modelOpen} filterContact={filterContact} />

        <div>
          {
            contacts.length <= 0 ?
            <NotFoundContact /> :
            contacts.map((contact) => (
              <ContactCard key={contact.key} contact={contact} />
            ))
          }
        </div>
      </div>
      <AddAndUpdate modelClose={modelClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
