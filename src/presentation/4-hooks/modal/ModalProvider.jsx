import React, { useState } from 'react';
import ModalContext from '../../context/ModalContext';

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const modalStyles = {
    bgImg: `repeating-linear-gradient(
      -45deg,
      #ffffff 0px,
      #ffffff 20px,
      #b1e0ff 20px,
      #b1e0ff 40px
    )`,
    minHeight:"60vh",
    minWidth:"35vw",
    height: "auto",
    width: "auto",
    flex:"flex",
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, modalStyles }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;