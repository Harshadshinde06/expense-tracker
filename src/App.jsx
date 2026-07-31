import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
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

  if (editIndex === null) {
    setExpenses([...expenses, newExpense]);
  } else {
    const updatedExpenses = [...expenses];
    updatedExpenses[editIndex] = newExpense;
    setExpenses(updatedExpenses);
    setEditIndex(null);
  }

  setExpense("");
  setAmount("");
  setCategory("Food");
}; 

const deleteExpense = (index) => {
  const updatedExpenses = expenses.filter((_, i) => i !== index);

  setExpenses(updatedExpenses);
};

const totalAmount = expenses.reduce((total, item) => {
  return total + Number(item.amount);
}, 0);

const totalEntries = expenses.length;

const highestExpense =
  expenses.length > 0
    ? Math.max(...expenses.map((item) => Number(item.amount)))
    : 0;




useEffect(() => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}, [expenses]);




  return (
    <div className="container">
      <h1>💰 Expense Tracker</h1>
     <div className="dashboard">

 <div className="card green">
    <h3>Total Expense</h3>
    <h2>₹ {totalAmount}</h2>
  </div>

  <div className="card blue">
      
    <h3>Total Entries</h3>
    <h2>{totalEntries}</h2>
  </div>

 <div className="card orange">
  
    <h3>Highest Expense</h3>
    <h2>₹ {highestExpense}</h2>
  </div>
</div>

      <input
  type="text"
  placeholder="🔍 Search Expense"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

      <input
        type="text"
        placeholder="Enter Expense Name"
        value={expense}
        onChange={(e) => setExpense(e.target.value)}
      />

      <select
  value={filterCategory}
  onChange={(e) => setFilterCategory(e.target.value)}
>
  <option value="All">All Categories</option>
  <option value="Food">Food</option>
  <option value="Travel">Travel</option>
  <option value="Shopping">Shopping</option>
  <option value="Entertainment">Entertainment</option>
</select>

<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
>
  <option value="default">Sort By</option>
  <option value="amountLow">Amount (Low to High)</option>
  <option value="amountHigh">Amount (High to Low)</option>
  <option value="nameAZ">Name (A-Z)</option>
  <option value="nameZA">Name (Z-A)</option>
</select>

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

{expenses
  .filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )
   .filter((item) =>
    filterCategory === "All" || item.category === filterCategory
  )
 .sort((a, b) => {
  if (sortBy === "amountLow") {
    return Number(a.amount) - Number(b.amount);
  }

  if (sortBy === "amountHigh") {
    return Number(b.amount) - Number(a.amount);
  }

  if (sortBy === "nameAZ") {
    return a.name.localeCompare(b.name);
  }

  if (sortBy === "nameZA") {
    return b.name.localeCompare(a.name);
  }

  return 0;
})


  .map((item, index) => (
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

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => {
            setExpense(item.name);
            setAmount(item.amount);
            setCategory(item.category);
            setEditIndex(index);
          }}
          style={{
            width: "70px",
            background: "blue",
          }}
        >
          Edit
        </button>

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
    </div>
  ))}

<h2 className="total">
  Total Expense: ₹ {totalAmount}
</h2>

    </div>
  );
}

export default App;