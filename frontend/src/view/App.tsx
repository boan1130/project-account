import React, { useEffect, useState } from "react";
import "../style/App.css";
import homeIcon from "../assets/home.png";
import { asyncDelete, asyncGet, asyncPost, asyncPut } from "../apiService";

interface Expense {
  _id?: string;
  sid:number
  name: string;
  price: number;
  remark: string;
}

const API_URL = "http://localhost:2083/"; // 修改為您的後端 API 位置

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [formData, setFormData] = useState<Expense>({
    sid:0,
    name: "",
    price: 0,
    remark: ""
  });



  useEffect(() => {
    fetchExpenses(); // 初始化時取得所有資料
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await asyncGet(`${API_URL}all`);
      console.log(response)
      // 檢查是否為陣列
      if (Array.isArray(response.body)) {
        
        setExpenses(response.body);
      } else {
        console.error("後端回傳的資料格式不正確：", response.body);
      }
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const expensesList = expenses? expenses.map((expense: Expense) => {
    console.log(expense)
        return (
          <div key={expense._id} className="expense-item">
            <p>
              序號: {expense.sid} | 項目: {expense.name} | 金額: {expense.price}{" "}
              | 備註: {expense.remark}
            </p>
          </div>
        );
      })
    : "loading";

  const addExpense = async () => {
    try {
      await asyncPost(`${API_URL}add`, {
        sid: formData.sid,
        name: formData.name,
        price: formData.price,
        remark: formData.remark,
      });

      // 成功提示
      alert("新增成功！");
      fetchExpenses(); // 新增後重新載入資料
      setFormData({ sid: 0, name: "", price: 0, remark: "" });
      setCurrentPage("home"); // 返回主頁
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("新增失敗，請檢查後端連接！");
    }
  };

  const deleteExpense = async (sid: number) => {
    try {
      await asyncDelete(`${API_URL}delete/${sid}`);
      alert("刪除成功！");
      fetchExpenses(); // 刪除後重新載入資料
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("刪除失敗，請檢查後端連接！");
    }
  };

  const updateExpense = async () => {
    try {
      await asyncPut(`${API_URL}update/${formData.sid}`, {
        name: formData.name,
        price: formData.price,
        remark: formData.remark,
      });
      alert("更新成功！");
      fetchExpenses(); // 更新後重新載入資料
      setFormData({ sid: 0, name: "", price: 0, remark: "" });
      setCurrentPage("home");
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("更新失敗，請檢查後端連接！");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container">
      {currentPage === "home" && (
        <div className="card home-card">
          <h1>今天有記帳了嗎？</h1>
          <button className="btn" onClick={() => setCurrentPage("add")}>
            新增金額
          </button>
          <button className="btn" onClick={() => setCurrentPage("delete")}>
            刪除金額
          </button>
          <button className="btn" onClick={() => setCurrentPage("update")}>
            修改金額
          </button>
          <button className="btn" onClick={() => setCurrentPage("view")}>
            查詢所有
          </button>
        </div>
      )}

      {currentPage === "add" && (
        <div className="card">
          <div className="home-button" onClick={() => setCurrentPage("home")}>
            <img src={homeIcon} alt="Home" />
          </div>

          <h2>新增一筆花費</h2>
          <input
            className="input"
            name="sid"
            placeholder="輸入序號"
            value={formData.sid}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="name"
            placeholder="輸入項目"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="price"
            placeholder="輸入金額"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="remark"
            placeholder="輸入備註"
            value={formData.remark}
            onChange={handleInputChange}
          />
          <button className="btn primary" onClick={addExpense}>
            完成
          </button>
          <button
            className="btn secondary"
            onClick={() => setCurrentPage("home")}
          >
            返回
          </button>
        </div>
      )}

      {currentPage === "delete" && (
        <div className="card">
          <div className="home-button" onClick={() => setCurrentPage("home")}>
            <img src={homeIcon} alt="Home" />
          </div>

          <h2>刪除一筆花費</h2>
          <input
            className="input"
            name="sid"
            placeholder="輸入序號"
            value={formData._id}
            onChange={handleInputChange}
          />
           <button className="btn primary" onClick={() => deleteExpense(parseInt(formData._id))}>完成</button> 
          <button
            className="btn secondary"
            onClick={() => setCurrentPage("home")}
          >
            返回
          </button>
        </div>
      )}

      {currentPage === "update" && (
        <div className="card">
          <div className="home-button" onClick={() => setCurrentPage("home")}>
            <img src={homeIcon} alt="Home" />
          </div>

          <h2>修改一筆花費</h2>

          <input
            className="input"
            name="sid"
            placeholder="輸入序號"
            value={formData._id}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="name"
            placeholder="輸入項目"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="price"
            placeholder="輸入金額"
            value={formData.price}
            onChange={handleInputChange}
          />
          <input
            className="input"
            name="remark"
            placeholder="輸入備註"
            value={formData.remark}
            onChange={handleInputChange}
          />
          <button className="btn primary" onClick={() => updateExpense(parseInt(formData.sid))}>完成</button> 
          <button
            className="btn secondary"
            onClick={() => setCurrentPage("home")}
          >
            返回
          </button>
        </div>
      )}

      {currentPage === "view" && (
       
        <div className="card">
          <div className="home-button" onClick={() => setCurrentPage("home")}>
            <img src={homeIcon} alt="Home" />
          </div>

          <h2>查看所有花費</h2>
          {expensesList}
          <button
            className="btn secondary"
            onClick={() => setCurrentPage("home")}
          >
            返回
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
