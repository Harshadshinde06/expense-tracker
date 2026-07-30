import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState(() => {
  const savedExpenses = localStorage.getItem("expenses");

  return savedExpenses ? JSON.parse(savedExpenses) : [];
});
  

  const addExpense = () => {
const newExpense = {
  name: expense,
  amount: amount,
  category: category,
};

 setExpenses([...expenses, newExpense]);

setExpense("");
setAmount("");
};

const deleteExpense = (index) => {
  const updatedExpenses = expenses.filter((_, i) => i !== index);

  setExpenses(updatedExpenses);
};

const totalAmount = expenses.reduce((total, item) => {
  return total + Number(item.amount);
}, 0);

useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);




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

<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="Food">🍔 Food</option>
  <option value="Travel">🚌 Travel</option>
  <option value="Shopping">🛍 Shopping</option>
  <option value="Entertainment">🎬 Entertainment</option>
</select>

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
  {item.category === "Food" && "🍔 "}
  {item.category === "Travel" && "🚌 "}
  {item.category === "Shopping" && "🛍️ "}
  {item.category === "Entertainment" && "🎬 "}

  {item.category} | {item.name} - ₹ {item.amount}
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

<h2 className="total">
  Total Expense: ₹ {totalAmount}
</h2>

    </div>
  );
}

export default App;