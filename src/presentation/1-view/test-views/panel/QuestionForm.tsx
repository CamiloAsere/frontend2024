import React, { useState, useEffect } from "react";
import styles from './AdminPanel.module.css';

const QuestionForm = ({ data, onSubmit }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label>Pregunta:</label>
        <input type="text" name="question" value={formData.question} onChange={handleInputChange} />
      </div>
      <div className={styles.formGroup}>
        <label>Imagen:</label>
        <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
      </div>
      <div className={styles.formGroup}>
        <label>Opciones:</label>
        <input type="text" name="options" value={formData.options} onChange={handleInputChange} />
      </div>
      <div className={styles.formGroup}>
        <label>Respuesta correcta:</label>
        <input type="text" name="correctAnswer" value={formData.correctAnswer} onChange={handleInputChange} />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};
export default QuestionForm