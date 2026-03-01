import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="form-container">
      <h2>Login</h2>
      <SignIn
        path="/login"
        routing="path"
        signUpUrl="/register"
        appearance={{
          elements: {
            card: "shadow-lg p-4 rounded-xl",
            headerTitle: "text-2xl font-semibold mb-4",
          },
        }}
      />
    </div>
  );
};

export default Login;