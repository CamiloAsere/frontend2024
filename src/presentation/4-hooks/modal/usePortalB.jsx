import { createPortal } from 'react-dom';
import redi from "./cross-circle-frame.png";
import styles from './modal.module.css';
import { useContext } from 'react';
import ModalContext from '../../context/ModalContext';
import ModalContainer from './ModalContainer';
const Portal = ({ children }) => {
  const { isOpen, closeModal ,modalStyles} = useContext(ModalContext);
  const handleModalContainerClick = (e) => e.stopPropagation();
  if (!open) return null;

  return (
    <article
      className={`${styles.modal} ${isOpen && styles.isOpen}`}
      onClick={closeModal}
    >
 <ModalContainer 
 bgImg={modalStyles.bgImg}
 minWidth={modalStyles.minWidth}
 minHeight={modalStyles.minHeight}
 width={modalStyles.width}
 height={modalStyles.height}
 //display={modalStyles.flex}
 onClick={handleModalContainerClick}
 >
 <button className={styles.modalClose} onClick={closeModal}>
          <img height={20} src={redi}/>
        </button>
        {children}
</ModalContainer>
    </article>
  );
};
const OtherModalPortal  = ({ children,container }) => {
    return createPortal(<Portal >{children}</Portal>,container);
};

export default OtherModalPortal;
/*
const OtherModalPortal = ({ children, container, bgImg }) => {
  const { isOpen, closeModal } = useContext(ModalContext);

  return createPortal(
    <Portal isOpen={isOpen} closeModal={closeModal} bgImg={bgImg}>
      {children}
    </Portal>,
    container
  );
  
};
*/