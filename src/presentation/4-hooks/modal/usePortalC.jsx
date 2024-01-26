import { createPortal } from 'react-dom';
import { useContext } from 'react';
import redi from './cross-circle-frame.png';
import styles from './modal.module.css';
import ModalContext from '../../context/ModalContext';
import ModalContainer from './ModalContainer';

const Portal = ({ children }) => {
 const { closeModal, modalStyles ,isOpen} = useContext(ModalContext);
 const handleModalContainerClick = (e) => e.stopPropagation();
 return (
 <article
 className={`${styles.modal} ${isOpen && styles.isOpen}`}
 onClick={closeModal}
 >
 <ModalContainer 
 bgImg={modalStyles.bgImg}
 width={modalStyles.width}
 height={modalStyles.height}
 onClick={handleModalContainerClick}
 >
 <button className={styles.modalClose} onClick={closeModal}>
 <img height={20} src={redi} />
 </button>
 {children}
 </ModalContainer>
 </article>
 );
};

const ModalPortal = ({ children,container }) => {
  return createPortal(<Portal >{children}</Portal>,container);
};

export default ModalPortal;