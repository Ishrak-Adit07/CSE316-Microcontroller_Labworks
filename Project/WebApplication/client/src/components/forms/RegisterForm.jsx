// Collecting user's username and pin for transaction services
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Alert from "../messages/Alert";

const RegisterForm = () => {

  const navigate = useNavigate();

  const [greenName, setGreenName] = useState("");
  const [redName, setRedName] = useState("");
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      //const responseData = await registerUser(name);
      const responseData = true;

      if (responseData) {
        navigate("/livescore");
        setError(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-400 to-purple-400 p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-3xl font-semibold text-red-400 text-slate-300 mb-6 text-center">
          Register Players
        </h1>
        <form onSubmit={handleRegister}>
          <div className="relative mb-8">
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              id="greenName"
              value={greenName}
              onChange={(e) =>
                setGreenName(e.target.value)
              }
              className="w-full py-2 px-2 bg-transparent text-white border-b border-gray-700 focus:outline-none focus:border-red-400 peer autofill:bg-transparent"
              placeholder=""
            />
            {!greenName && (
              <label
                className="absolute left-0 top-4 text-gray-300 transition-all transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:left-0 peer-focus:text-xs"
                htmlFor="greenName"
              >
                Green Player Name
              </label>
            )}
          </div>

          <div className="relative mb-8">
            <motion.input
              whileFocus={{ scale: 1.05 }}
              type="text"
              id="redName"
              value={redName}
              onChange={(e) =>
                setRedName(e.target.value)
              }
              className="w-full py-2 px-2 bg-transparent text-white border-b border-gray-700 focus:outline-none focus:border-red-400 peer autofill:bg-transparent"
              placeholder=""
            />
            {!redName && (
              <label
                className="absolute left-0 top-4 text-gray-300 transition-all transform peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:left-0 peer-focus:text-xs"
                htmlFor="redName"
              >
                Red Player Name
              </label>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 bg-slate-200 text-gray-900 rounded-lg font-semibold hover:bg-slate-300 focus:outline-none"
          >
            Register
          </motion.button>
        </form>

      </motion.div>

      {error && <Alert msg={error} />}
    </div>
  );
};

export default RegisterForm;