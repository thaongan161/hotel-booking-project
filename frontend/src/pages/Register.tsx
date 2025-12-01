// 📁 src/pages/Register.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: string;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterRequest>({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', formData);
      alert('Register successful!');
    } catch (err: any) {
        console.error('Registration error:', err);

        if (err.response) {
          alert(`Error ${err.response.status}: ${err.response.data.message || 'Something went wrong'}`);
        } else {
          alert('Network error or server not reachable');
        }
      }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          name="fullName"
          placeholder="Full Name"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          type="tel"
          placeholder="Phone"
          className="w-full mb-3 p-2 border rounded"
          onChange={handleChange}
          required
        />

        <select
          name="role"
          className="w-full mb-4 p-2 border rounded"
          onChange={handleChange}
          value={formData.role}
          required
        >
          <option value="customer">Customer</option>
          <option value="hotel-admin">Hotel Admin</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}
