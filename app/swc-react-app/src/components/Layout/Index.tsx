import { Outlet, Link } from "react-router-dom";
import styles from "./styles.module";

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      <nav>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/about">About</Link>
        <Link to="/query-list">查询表单表格</Link>
      </nav>
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
      <footer
        style={{ padding: "1rem", background: "#eee", textAlign: "center" }}
      >
        © {new Date().getFullYear()} SWC React App
      </footer>
    </div>
  );
}
