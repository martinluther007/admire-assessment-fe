// eslint-disable-next-line react/prop-types
const AuthContainer = ({ children, headingMain }) => {
  return (
    <main className="auth__container">
      <h1 className="heading__main">{headingMain}</h1>
      <h5 className="heading__sub">
        Please {headingMain} to access your account
      </h5>

      {children}
    </main>
  );
};

export default AuthContainer;
