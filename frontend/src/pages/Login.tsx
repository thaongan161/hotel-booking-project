// 📁 src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance"; // ✅ Dùng axiosInstance thay vì axios trực tiếp

interface LoginResponse {
  token: string;
  userId: number; // ✅ thêm userId
  email: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post<LoginResponse>("/auth/login", formData);

      // ✅ Lưu token & email
      localStorage.setItem("token", res.data.token);
      localStorage.setItem('userId', String(res.data.userId));
      localStorage.setItem("user", formData.email);

      alert("Login successful!");
      navigate("/"); // Điều hướng về homepage
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
