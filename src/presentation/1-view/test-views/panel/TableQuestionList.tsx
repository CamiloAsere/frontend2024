import React from 'react';
import styles from './Table.module.css';
import Highlight from './Highlight';
import { Empty } from '../test/Empty';

const QuestionList = ({ questions, handleEditQuestion, handleDeleteQuestion, searchTerm }) => {
  if (questions.length === 0) {
    return <Empty/>;
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Question</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <tr key={question.id}>
            <td className={styles.questionColumn} title={question.question}>
              <Highlight text={question.question} searchTerm={searchTerm} />
            </td>
            <td>
              <div className={styles.buttonContainer}>
                <button className={styles.editButton} onClick={() => handleEditQuestion(question.id)}>
                  Edit
                </button>
                <button className={styles.deleteButton} onClick={() => handleDeleteQuestion(question.id)}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuestionList;