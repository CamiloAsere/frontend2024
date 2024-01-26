import React from 'react';
import Content from './Content';
import ModalProvider from './ModalProvider';

export default function App() {
  return (
    <ModalProvider>
      <Content />
    </ModalProvider>
  );
}