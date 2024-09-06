import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { verifyUser } from "../../api/user.api";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //response is the token of this user's info
      let response = await verifyUser(user);
      sessionStorage.setItem("User", response);
      //save token in every axios request header
      axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred during login");
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup
      </button>
    </div>
  );
}
