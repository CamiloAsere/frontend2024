
import domtoimage from 'dom-to-image';
import { useRef, useState } from 'react';
//import Presentation from './capa1';
import styles from "./presentation.module.css"
import ModalPortal from '../../4-hooks/modal/usePortalC';

function GetImg() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const ref = useRef(null);
  const handleSaveImage = () => {
    domtoimage.toPng(ref.current).then((dataUrl:string) => {
      // Aquí puedes guardar la imagen en el servidor o descargarla localmente
      // Por ejemplo, para descargar la imagen localmente:
      const link = document.createElement('a');
      link.download = 'my-image.png';
      link.href = dataUrl;
      link.click();
    });
  };

  return (
  <>
      <div ref={ref}>
      <h1>Header</h1>
      <p>descripcion</p>
      </div>
      
      <button
      className='bg-white text-brand-teal-dark border-none py-12 px-28' style={{marginTop:"28px",borderRadius:"0.25rem"}}
       onClick={openModal}>Abrir modal</button>
      { isOpen && (
      <ModalPortal isOpen={isOpen} closeModal={closeModal} container={document.getElementById("root")}>
        <button onClick={handleSaveImage}>Generar imagen</button>
      </ModalPortal> )}
      
      
  </>
  );
}
export default GetImg