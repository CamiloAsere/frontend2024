import { createPortal } from 'react-dom';
import redi from "./cross-circle-frame.png";
import styles from './modal.module.css';

const Portal = ({ children, isOpen, closeModal, bgImg }) => {
  const handleModalContainerClick = (e) => e.stopPropagation();

  return (
    <article
      className={`${styles.modal} ${isOpen && styles.isOpen}`}
      onClick={closeModal}
    >
      <div className={styles.modalContainer} style={{backgroundImage:`${bgImg}`}} onClick={handleModalContainerClick}>
        <button className={styles.modalClose} onClick={closeModal}>
          <img height={20} src={redi}/>
        </button>
        {children}
      </div>
    </article>
  );
};

const ModalPortal = ({ children, isOpen, closeModal, container, bgImg }) => createPortal(
  <Portal isOpen={isOpen} closeModal={closeModal} bgImg={bgImg}>
    {children}
  </Portal>,
  container
);

export default ModalPortal;