import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Firebase
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/firebase';
import { auth } from '../services/firebase';

export default function LandingPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [motivation, setMotivation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !studentId || !motivation) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'solicitacoesAtendimento'), {
        name,
        email,
        studentId,
        motivation,
        status: 'Pendente',
        createdAt: serverTimestamp(),
        requestedBy: auth.currentUser?.uid || null,
      });
      navigate('/obrigado');
    } catch (err) {
      console.error(err);
      setError('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Solicitar Acompanhamento Psicológico - UFC</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <label className="block mb-2">
          <span className="block text-sm font-medium text-gray-700">Nome Completo</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring" />
        </label>

        <label className="block mb-2">
          <span className="block text-sm font-medium text-gray-700">Email Institucional</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring" />
        </label>

        <label className="block mb-2">
          <span className="block text-sm font-medium text-gray-700">Matrícula</span>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring" />
        </label>

        <label className="block mb-4">
          <span className="block text-sm font-medium text-gray-700">Por que você acredita que precisa de apoio?</span>
          <textarea
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring" />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none">
          {loading ? 'Enviando...' : 'Enviar Solicitação'}
        </button>
      </form>
    </div>
  );
}
