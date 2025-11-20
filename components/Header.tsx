import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <div className="inline-flex items-center justify-center p-3 mb-4 bg-blue-100 rounded-full">
        <FileSpreadsheet className="w-8 h-8 text-blue-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Normalizador de Planilhas
      </h1>
      <p className="text-slate-600 max-w-lg mx-auto">
        Transforme títulos de colunas complexos em formatos padronizados (snake_case) prontos para banco de dados.
        Processamento 100% local.
      </p>
    </header>
  );
};
