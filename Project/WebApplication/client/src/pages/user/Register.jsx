/* eslint-disable no-unused-vars */
import React from "react";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
  return (
    <section className="mt-20 pb-20">
      <h1>Player Registration</h1>
      <RegisterForm />
      <h1 className="text-indigo-500 text-bold text-center">
        Copyright@District12
      </h1>
    </section>
  );
};

export default Register;