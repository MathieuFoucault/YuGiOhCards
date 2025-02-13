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
    <div className="background-home flex justify-center items-center relative z-0">
      <button
        type="button"
        className="bg-yellow-500 hover:bg-yellow-600 text-xl transform transition-transform duration-300 px-4 py-2 rounded-md hover:scale-125"
        onClick={handleAccessCards}
      >
        Accéder aux cartes
      </button>
    </div>
  );
};

export default HomePage;
