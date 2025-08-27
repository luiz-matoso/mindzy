import { useRef, useState } from "react";

const FileUpload = ({ file, setFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    handleDrag(e);
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    handleDrag(e);
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    handleDrag(e);
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileType = e.dataTransfer.files[0].type;
      if (
        fileType === "application/pdf" ||
        fileType ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setFile(e.dataTransfer.files[0]);
      } else {
        alert("Por favor, envie apenas arquivos PDF ou DOCX.");
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const removeFile = () => {
    setFile(null);
  };

  if (file) {
    return (
      <div className="text-center p-26 bg-neutral-900 rounded-xl border border-cyan-900">
        <p className="text-xl text-white">Arquivo carregado:</p>
        <p className="text-lg text-gray-300 mt-2">{file.name}</p>
        <button
          onClick={removeFile}
          className="mt-4 px-4 py-2 text-sm bg-red-800 text-white rounded-lg hover:bg-red-900 cursor-pointer transition-colors"
        >
          Remover Arquivo
        </button>
      </div>
    );
  }

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
      className={`text-center p-30 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300
        ${
          isDragging
            ? "border-sky-500 bg-neutral-800"
            : "border-zinc-700 bg-neutral-900"
        }`}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept=".pdf,.docx"
      />
      <p className="text-gray-400">Arraste e solte seu PDF aqui</p>
      <p className="text-gray-500 text-sm mt-2">ou clique para selecionar</p>
    </div>
  );
};

export default FileUpload;
