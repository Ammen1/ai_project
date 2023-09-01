import styles from "./style";
import { Login } from "./components";

const App = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Login />
      </div>
    </div>
  </div>
);

export default App;
