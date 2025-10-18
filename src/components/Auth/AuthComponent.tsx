interface LoginProps {
  children: React.ReactNode;
}

const AuthComponent: React.FC<LoginProps> = ({ children }) => {
  return <>{children}</>;
};

export default AuthComponent;
