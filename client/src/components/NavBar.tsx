import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const NavBar = () => {
  const navigate = useNavigate();
  const handleUserSignUpClick = () => navigate("/signup/user");
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-500">
      <div className="flex-shrink-0">
        <Link to="/">
          <img src={logo} alt="logo-yugioh" className="h-10 w-auto" />
        </Link>
      </div>
      <div>
        <Link
          to="/login/user"
          className="flex items-center justify-center my-2 px-4 py-2 rounded-md btn-accent hover:bg-gray-800 hover:text-white transition duration-300 text-center"
        >
          Connexion
        </Link>
      </div>
      <div>
        <button
          type="button"
          className="flex flex-col items-center px-6 py-2 text-xl font-medium rounded-md btn-secondary sm:px-20 sm:py-4"
          onClick={handleUserSignUpClick}
        >
          <span>Inscrivez-vous</span>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
