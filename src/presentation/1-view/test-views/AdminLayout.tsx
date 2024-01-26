
import { useContext} from "react";
import { AppContext } from "../../context/random/AppContext";
import { AppProvider } from "../../context/random/AppProvider";


const AdminPanel = () => {
    const {user } = useContext(AppContext);
  console.log("loading ")
    return (
      <h1>
          hola mundo {user?.name} role:{user?.role}
      </h1>
    );
};

export default AdminPanel;