import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const handleUserSignUpClick = () => navigate("/signup/user");
  return (
    <nav className="flex justify-between items-center p-4 bg-black bg-opacity-65 z-10 relative">
      <div className="flex-shrink-0">
        <Link to="/">
          <img src={logo} alt="logo-yugioh" className="h-16 w-auto" />
        </Link>
      </div>
      <div className="ml-auto flex items-center space-x-4">
        <Link
          to="/login/user"
          className="flex items-center justify-center mr-2 px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-yellow-500 transition duration-300 text-center"
        >
          Connexion
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="flex flex-col items-center px-4 py-2 rounded-md bg-gray-800 text-white hover:bg-yellow-500 transition duration-300 "
          onClick={handleUserSignUpClick}
        >
          <span>Inscrivez-vous</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
