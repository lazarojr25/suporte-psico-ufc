import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function GerenciarSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  
  useEffect(() => {
    const fetchSolicitacoes = async () => {
      const q = query(collection(db, 'solicitacoesAtendimento'), where('status', '==', 'Pendente'));
      const querySnapshot = await getDocs(q);
      const solicitacoesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSolicitacoes(solicitacoesData);
    };

    fetchSolicitacoes();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-6">
        <h2 className="text-2xl font-bold mb-4">Gerenciar Solicitações</h2>
        
        {solicitacoes.length === 0 ? (
          <p>Não há solicitações pendentes no momento.</p>
        ) : (
          <div>
            <ul>
              {solicitacoes.map((solicitacao) => (
                <li key={solicitacao.id} className="mb-4 p-4 border rounded-md">
                  <h3 className="font-semibold text-lg">{solicitacao.nome}</h3>
                  <p><strong>Email:</strong> {solicitacao.email}</p>
                  <p><strong>Motivo:</strong> {solicitacao.motivo}</p>
                  <p><strong>Status:</strong> {solicitacao.status}</p>
                  <Link
                    to={`/agendar/${solicitacao.id}`}
                    className="mt-4 inline-block text-blue-600 hover:text-blue-800"
                  >
                    Agendar Sessão
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
