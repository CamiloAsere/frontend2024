import React, { useContext } from 'react';
import ModalPortal from './usePortalC';
import classes from "./modal.module.css";
import ModalContext from '../../context/ModalContext';
const ContentA = () => {
  const { isOpen, openModal } = useContext(ModalContext);

  return (
    <>
      <div className={classes.actions}>
      <button onClick={openModal}>Like it!</button>
       </div>
      {isOpen && (
      <ModalPortal container={document.getElementById('root')}>
      <h1>openin</h1>
      </ModalPortal>
       )}
    </>
  );
};

export default ContentA;