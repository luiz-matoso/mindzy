import Logo from "../Logo/Logo";

const AuthCard = ({ children }) => {
  return (
    <section className="text-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Logo />
        <div className="w-full bg-neutral-900 border border-zinc-800 rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default AuthCard;
