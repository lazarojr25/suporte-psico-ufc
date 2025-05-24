import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Solicitacao from '../pages/Solicitacao'
import PosSolicitacao from '../pages/PosSolicitacao'
import Login from '../pages/Login';
// import Dashboard from '../pages/Dashboard'; 
import AgendarAtendimento from '../pages/AgendarAtendimento';
import GerenciarSolicitacoes from '../pages/GerenciarSolicitacoes';
import CadastroFuncionario from '../pages/CadastroFuncionario';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Solicitacao />} />
        <Route path="/obrigado" element={<PosSolicitacao />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Login />} /> 
         <Route path="/agendar/:solicitacaoId" element={<AgendarAtendimento />} />
         <Route path="/gerenciar-solicitacoes" element={<GerenciarSolicitacoes />} />
         <Route path="/cadastro" element={<CadastroFuncionario />} />
      </Routes>
    </BrowserRouter>
  );
}
