import React, { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function AgendarAtendimento({ solicitacaoId }) {
  const [dataHora, setDataHora] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [solicitacao, setSolicitacao] = useState(null);
  const navigate = useNavigate();

  // Recupera as informações da solicitação
  useEffect(() => {
    const fetchSolicitacao = async () => {
      const docRef = doc(db, 'solicitacoesAtendimento', solicitacaoId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSolicitacao(docSnap.data());
      } else {
        console.log('Solicitação não encontrada');
      }
    };
    fetchSolicitacao();
  }, [solicitacaoId]);

  // Função para agendar a consulta
  const handleAgendamento = async (e) => {
    e.preventDefault();
    try {
      // Adiciona o agendamento no Firestore
      const agendamentoData = {
        alunoId: solicitacao.alunoId,
        solicitacaoId: solicitacaoId,
        dataHora: new Date(dataHora).toISOString(),
        status: 'Pendente',
        observacoes,
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'agendamentos'), agendamentoData);
      alert('Consulta agendada com sucesso!');
      navigate('/dashboard'); // Redireciona para o painel de controle ou outra página
    } catch (error) {
      console.error('Erro ao agendar consulta:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Agendar Atendimento</h2>

        {solicitacao ? (
          <>
            <p><strong>Aluno:</strong> {solicitacao.nome}</p>
            <p><strong>Motivo da Solicitação:</strong> {solicitacao.motivo}</p>

            <form onSubmit={handleAgendamento}>
              <label className="block mb-2">
                <span className="text-sm font-medium text-gray-700">Data e Hora do Atendimento</span>
                <input
                  type="datetime-local"
                  value={dataHora}
                  onChange={(e) => setDataHora(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                  required
                />
              </label>

              <label className="block mb-4">
                <span className="text-sm font-medium text-gray-700">Observações</span>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring"
                />
              </label>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Agendar
              </button>
            </form>
          </>
        ) : (
          <p>Carregando dados da solicitação...</p>
        )}
      </div>
    </div>
  );
}
