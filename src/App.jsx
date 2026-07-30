import { useState } from "react";
import "./App.css";

function App() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const addExpense = () => {
  const newExpense = {
    name: expense,
    amount: amount,
  };

 setExpenses([...expenses, newExpense]);

setExpense("");
setAmount("");
};

const deleteExpense = (index) => {
  const updatedExpenses = expenses.filter((_, i) => i !== index);

  setExpenses(updatedExpenses);
};


  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>

      <input
        type="text"
        placeholder="Enter Expense Name"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={addExpense}>
  Add Expense
</button>

{expenses.map((item, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "10px",
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "8px",
    }}
  >
    <span>
      {item.name} - ₹ {item.amount}
    </span>

    <button
      onClick={() => deleteExpense(index)}
      style={{
        width: "70px",
        background: "red",
      }}
    >
      Delete
    </button>
  </div>
))}

    </div>
  );
}

export default App;