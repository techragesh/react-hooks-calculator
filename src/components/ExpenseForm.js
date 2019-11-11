import React from 'react';
import { MdSend } from 'react-icons/md';
const ExpenseForm = ({ charge, amount, handleCharge, handleAmount, handleSubmit, edit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label htmlFor="charge">charge</label>
          <input type="text" className="form-control" id="charge" name="charge" placeholder="e.g rent" onChange={handleCharge} value={charge} />
        </div>
        <div className="form-group">
          <label htmlFor="charge">amount</label>
          <input type="text" className="form-control" id="amount" name="amount" placeholder="e.g amount" onChange={handleAmount} value={amount} />
        </div>
      </div>
      <button type="submit" className="btn">{edit ? "edit" : "submit"}
        <MdSend className="btn-icon"></MdSend>
      </button>
    </form>
  );
}

export default ExpenseForm;
