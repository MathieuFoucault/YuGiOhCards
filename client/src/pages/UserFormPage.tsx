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
    <>
      <section className=" mt-10">
        <article className="flex flex-col justify-center items-center">
          <h1 className=" text-4xl font-bold text-black mt-5 mb-5 justify-center">
            Candidat
          </h1>
          <img
            className="w-24  mt-10"
            src={userIcone}
            alt="Icone de création de compte"
          />

          <UserFormRegister onSubmit={handleUserFormSubmit} />
        </article>
      </section>
    </>
  );
}

export default UserFormPage;
