import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const handleUserSignUpClick = () => navigate("/signup/user");

  const handleLogout = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      navigate("/");
      toast.success("Vous êtes bien déconnecté !");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      console.error("Erreur lors de la déconnexion");
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <nav className="flex flex-col md:flex-row justify-between items-center p-4 bg-black bg-opacity-90 z-10 relative min-h-20">
      <div className="flex-shrink-0 mb-4 md:mb-0">
        <Link to="/">
          <img src={logo} alt="logo-yugioh" className="h-16 w-auto" />
        </Link>
      </div>
      <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:space-x-8 md:ml-auto">
        <Link
          to="/login/user"
          className="flex items-center justify-center mb-2 mr-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-yellow-500 transition duration-300 text-center"
        >
          Connexion
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="flex flex-col items-center mb-2 mr-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-yellow-500 transition duration-300 "
          onClick={handleUserSignUpClick}
        >
          <span>Inscrivez-vous</span>
        </button>
      </div>
      <div>
        <button
          type="button"
          className="flex flex-col items-center mb-2 mr-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-red-500 transition duration-300"
          onClick={handleLogout}
        >
          <span>Se Déconnecter</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
