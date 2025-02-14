import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userIcone from "../assets/images/UserIcone.png";
import UserFormRegister from "../components/userForm/UserFormRegister";
import type { UserFormData } from "../lib/userForm.definitions";

function UserFormPage() {
  const navigate = useNavigate();

  const handleUserFormSubmit = async (userData: UserFormData) => {
    try {
      const newUser = await fetch(
        `${import.meta.env.VITE_API_URL}/api/userformregister`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );
      if (newUser.ok) {
        toast.success("Votre compte a bien été créé. Commencez à jouer !");
        navigate("/");
      } else {
        toast.error(
          "Une erreur est survenue lors de votre inscription ! Veuillez réessayer",
        );
      }
    } catch (err) {
      err;
    }
  };

  return (
    <div className="background-register flex justify-center items-center relative z-0">
      <section className=" my-10">
        <article className="flex flex-col justify-center items-center">
          <h1 className=" text-4xl font-bold text-white mt-2 mb-5 justify-center">
            Bienvenue
          </h1>
          <img
            className="w-24  mt-2"
            src={userIcone}
            alt="Icone de création de compte"
            style={{
              filter: "brightness(0) invert(1)",
            }}
          />

          <UserFormRegister onSubmit={handleUserFormSubmit} />
        </article>
      </section>
    </div>
  );
}

export default UserFormPage;
