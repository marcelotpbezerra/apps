import React, { useCallback } from 'react';
import { UploadCloud, FileType, AlertCircle } from 'lucide-react';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
  error: string | null;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isLoading, error }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isLoading) return;

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        validateAndPass(files[0]);
      }
    },
    [onFileSelect, isLoading]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      validateAndPass(files[0]);
    }
  };

  const validateAndPass = (file: File) => {
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
      "application/vnd.ms-excel" // xls
    ];
    
    // Basic MIME check (some browsers might be loose with this, so extension check is also good practice)
    const isExcel = validTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');

    if (isExcel) {
      onFileSelect(file);
    } else {
      alert("Por favor, envie apenas arquivos Excel (.xlsx ou .xls)");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          relative flex flex-col items-center justify-center w-full h-64 
          border-2 border-dashed rounded-xl transition-all duration-300
          ${isLoading ? 'bg-slate-50 border-slate-300 cursor-wait opacity-70' : 'bg-white border-slate-300 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'}
          ${error ? 'border-red-300 bg-red-50' : ''}
        `}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
          onChange={handleFileInput}
          accept=".xlsx, .xls"
          disabled={isLoading}
        />
        
        <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
          {isLoading ? (
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          ) : (
            <UploadCloud className={`w-12 h-12 mb-4 ${error ? 'text-red-500' : 'text-slate-400'}`} />
          )}
          
          <p className="mb-2 text-sm text-slate-600 font-medium">
            {isLoading ? 'Processando planilha...' : 'Clique para enviar ou arraste o arquivo'}
          </p>
          <p className="text-xs text-slate-500">
            Suporta .XLSX ou .XLS
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-red-800">Erro ao processar</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};
