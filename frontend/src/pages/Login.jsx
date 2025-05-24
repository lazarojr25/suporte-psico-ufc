import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // Redireciona para a página de gestão/admin
    } catch (err) {
      setError('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login de Funcionário</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </label>
        <label className="block mb-2">
          <span className="text-sm font-medium text-gray-700">Senha</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
