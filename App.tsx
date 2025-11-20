import React, { useState } from 'react';
import { Header } from './components/Header';
import { FileUploader } from './components/FileUploader';
import { DataPreview } from './components/DataPreview';
import { processExcelFile } from './services/excelService';
import { ProcessedData, ProcessingStatus } from './types';

const App: React.FC = () => {
  const [status, setStatus] = useState<ProcessingStatus>(ProcessingStatus.IDLE);
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setStatus(ProcessingStatus.PROCESSING);
    setErrorMessage(null);

    try {
      // Artificial delay for better UX perception
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const data = await processExcelFile(file);
      setProcessedData(data);
      setStatus(ProcessingStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Erro desconhecido ao processar o arquivo.");
      setStatus(ProcessingStatus.ERROR);
    }
  };

  const handleReset = () => {
    setProcessedData(null);
    setStatus(ProcessingStatus.IDLE);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="mt-8">
          {status === ProcessingStatus.SUCCESS && processedData ? (
            <DataPreview data={processedData} onReset={handleReset} />
          ) : (
            <FileUploader 
              onFileSelect={handleFileSelect} 
              isLoading={status === ProcessingStatus.PROCESSING}
              error={errorMessage}
            />
          )}
        </div>

        <footer className="mt-16 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} Normalizador de Excel. Processamento local seguro.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
