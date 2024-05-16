import { logoutAction } from "@/actions";

const LogoutForm = () => {
  return (
    <div className="text-1xl lg:text-1xl bg-slate-800 rounded-md text-slate-400 p-1 m-2">
      <form action={logoutAction}>
        <button>Logout</button>
      </form>
    </div>
  );
};

export default LogoutForm;
