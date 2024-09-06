import React, { useState, ChangeEvent } from "react";
import { createUser } from "../../api/user.api";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("in submit");
    try {
      const response: AxiosResponse = await createUser(user);
      // console.log("in submit", response);
      alert(
        "Account has been created auccessfully, redirecting to log in page"
      );
      navigate("/login");

      if (response.status !== 200) {
        alert("User account could not be created");
      }
    } catch (error) {
      console.error("Error creating user account:", error);
      alert("An error occurred while creating the account");
    }
  }

  return (
    <div>
      Signup
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          value={user.name}
          onChange={handleChange}
          placeholder='Name'
          required
          maxLength={20}
        />
        <input
          type='email'
          name='email'
          value={user.email}
          onChange={handleChange}
          placeholder='Email'
          required
          maxLength={40}
        />
        <input
          type='password'
          name='password'
          value={user.password}
          onChange={handleChange}
          placeholder='Password'
          required
          maxLength={20}
        />
        <input
          type='phone'
          name='phone'
          value={user.phone}
          onChange={handleChange}
          placeholder='Phone'
          required
          maxLength={20}
        />
        <button type='submit'>Create Account</button>
      </form>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
