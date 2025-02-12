// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const handleAccessCards = () => {
    if (userId) {
      navigate("/cards");
    } else {
      navigate("/");
    }
  };

  return (
    <button type="button" onClick={handleAccessCards}>
      Accéder aux cartes
    </button>
  );
};

export default HomePage;
