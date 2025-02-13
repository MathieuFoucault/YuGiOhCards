import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../components/context/AuthContext";
import Login from "../components/userForm/Login";
import type { UserFormData } from "../lib/userForm.definitions";

function LoginUserPage({ isAdmin = false }) {
  const navigate = useNavigate();

  const { setUserId } = useAuth();

  const handleUserLogin = async (loginDataUser: UserFormData) => {
    try {
      const endpoint = isAdmin ? "admin" : "user";
      const loginUser = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginDataUser),
          credentials: "include",
        },
      );
      if (loginUser.ok) {
        const data = await loginUser.json();
        setUserId(data.userId);
        toast.success("Vous êtes bien connecté !");
        navigate("/cards");
      } else {
        toast.error(
          "Un problème est survenu lors de votre connexion ! Veuillez réessayer",
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="background-login flex justify-center items-center relative z-0 min-h-screen">
      <section className="flex flex-col items-center justify-center min-h-screen">
        <section className="py-2 m-10 rounded-md mt-20 bg-gray-800 w-10/12 ">
          <article className="max-w-md mx-auto px-4">
            <div className="text-center">
              <FaUsers
                style={{ height: "120px", width: "120px" }}
                className="text-white mx-auto"
              />
              <h2 className="text-3xl font-extrabold text-white mt-4 mb-5">
                {isAdmin ? "Connexion Administrateur" : "Connectez-vous"}
              </h2>
              <p className="mt-2 font-bold text-lg text-white">S'identifier</p>
            </div>

            <Login onSubmit={handleUserLogin} />
          </article>

          <article className="flex flex-col justify-center items-center ">
            <p className="mt-6 text-white text-center">
              Pas encore inscrit chez nous ?
            </p>
            <button
              type="button"
              onClick={() => navigate("/signup/user")}
              className="mt-4 mb-8 bg-yellow-500 hover:bg-orange-600 rounded-md text-white font-bold py-2 px-4 w-48"
            >
              Créer un compte
            </button>
          </article>
        </section>
      </section>
    </div>
  );
}

export default LoginUserPage;
