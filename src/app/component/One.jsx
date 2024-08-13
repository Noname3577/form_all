import { useState } from "react";
import { getData, login, register } from "./dataManager";
import styles from "./Home.module.css";

export default function One() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(getData());

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      setMessage("เข้าสู้ระบบเรียบร้อย");
      setIsLoggedIn(true);
    } else {
      setMessage("รหัสผ่าน หรือ ชื่อผู้ใช้ ไม่ถูกต้อง");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const result = register(username, password);
    setMessage(result.message);
    if (result.success) {
      setData(getData());
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    setMessage("");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>รูปแบบจำลองหน้า Login</h1>
      {!isLoggedIn ? (
        <div className={styles.formContainer}>
          <form onSubmit={handleLogin} className={styles.form}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={styles.input}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
          <form onSubmit={handleRegister} className={styles.form}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className={styles.input}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              Register
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.loggedIn}>
          <p>ยินดีต้อนรับ, {username}!</p>
          <button onClick={handleLogout} className={styles.button}>
            ออกจากระบบ
          </button>
        </div>
      )}
      <p className={styles.message}>{message}</p>
      <div className={styles.dataDisplay}>
        <h2>ข้อมูลชื่อผู้ใช้ทั้งหมด Data:</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}
