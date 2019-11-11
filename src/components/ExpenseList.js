import React from 'react';
import ExpenseItem from './ExpenseItem';
import { MdDelete } from 'react-icons/md';

const ExpenseList = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className="list">
        {
          expenses.map(expense => {
            return <ExpenseItem key={expense.id} expense={expense} handleEdit={handleEdit} handleDelete={handleDelete}></ExpenseItem>
          })
        }
      </ul>
      {expenses.length > 0 && <button className="btn" onClick={clearItems}>Clear Expenses <MdDelete className="btn-icon"></MdDelete></button>}
    </>
  );
}

export default ExpenseList;
