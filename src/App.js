import React, { useState } from 'react';

import './App.css';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import uuid from 'uuid/v4';

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 1600 },
  { id: uuid(), charge: "car payment", amount: 2600 },
  { id: uuid(), charge: "credit card bill", amount: 600 },
]

function App() {

  const [expenses, setExpenses] = useState(initialExpenses);

  const [charge, setCharge] = useState("");

  const [amount, setAmount] = useState("");

  const [alert, setAlert] = useState({ show: false });

  const [edit, setEdit] = useState(false);

  const [id, setId] = useState(0);

  const handleCharge = e => {
    setCharge(e.target.value);
  }

  const handleAmount = e => {
    setAmount(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? { ...item, charge, amount } : item;
        })
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'item updated' })
      } else {
        const singleExpense = { id: uuid(), charge, amount };
        setExpenses([...expenses, singleExpense])
        handleAlert({ type: 'success', text: 'item added' })
      }
      setCharge("")
      setAmount("")
    } else {
      handleAlert({ type: 'danger', text: `charge and amount cannot be empty` })
    }
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000);
  }

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: "all items deleted" })
  }

  const handleEdit = id => {
    console.log(`Item Edited: ${id}`);
    let expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }

  const handleDelete = id => {
    console.log(`Item Deleted: ${id}`);
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: "Item deleted" })
  }

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text}></Alert>}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge} amount={amount} handleCharge={handleCharge} handleAmount={handleAmount} handleSubmit={handleSubmit} edit={edit}></ExpenseForm>
        <ExpenseList expenses={expenses} handleEdit={handleEdit} handleDelete={handleDelete} clearItems={clearItems}></ExpenseList>
      </main>
      <h1>
        total spending : <span className="total">${expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}</span>
      </h1>
    </>
  );
}

export default App;
