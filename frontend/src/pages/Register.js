import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <div className="form-container">
      <h2>Register</h2>
      <SignUp
        path="/register"
        routing="path"
        signInUrl="/login"
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

export default Register;