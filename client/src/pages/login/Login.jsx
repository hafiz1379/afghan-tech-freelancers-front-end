import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
    console.log(error);
  };

  return (
    <div>
      <form className="max-w-[400px] rounded border p-5 mx-auto my-auto mt-20" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold mb-2.5">{t('signIn')}</h1>
        <div className="my-4">
          <label htmlFor="username" className="block">
            {t('username')}
          </label>
          <input
            type="text"
            name="username"
            placeholder={t('typeUsername')}
            id="username"
            className="block w-full"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="my-4">
          <label className="block" htmlFor="password">
            {t('password')}
          </label>
          <input
            required
            type="password"
            name="password"
            placeholder={t('enterPassword')}
            id="password"
            className="block w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="bg-green-400 text-white py-2 w-full my-2 rounded">
          {t('logIn')}
        </button>

        {error ? <p className="my-2 text-red-500">{t('invalidCredentials')}</p> : <p></p>}
      </form>
    </div>
  );
};

export default Login;
