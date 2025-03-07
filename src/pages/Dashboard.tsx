import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/Dialog";
import { Document, Page, pdfjs } from "react-pdf";

const API_URL = import.meta.env.VITE_API_URL;    

pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

interface FileData {
  id?: string;
  title: string;
  uploadedOn?: string;
  fileName?: string;
  filePath?: string;
}

const LegalDocuments: React.FC = () => {
  const [files, setFiles] = useState<FileData[]>(Array(9).fill(null));
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isFileViewModalOpen, setIsFileViewModalOpen] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/data`);
      const newFiles = Array(9).fill(null);

      response.data.forEach((file: FileData, index: number) => {
        if (index < 9) {
          newFiles[index] = file;
        }
      });

      setFiles(newFiles);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setFiles(Array(9).fill(null));
    }
  };

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0 || selectedIndex === null) return;

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("index", selectedIndex.toString());

    try {
      const response = await axios.post(`${API_URL}/api/upload`, formData);
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        updatedFiles[selectedIndex] = response.data;
        return updatedFiles;
      });
      setIsUploadModalOpen(false);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
    if (!files[index]) {
      setIsUploadModalOpen(true);
    } else {
      setSelectedFile(files[index]);
      setIsFileViewModalOpen(true);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {Array.from({ length: 9 }).map((_, index) => {
        const file = files[index];

        return (
          <Card key={index} onClick={() => handleCardClick(index)}>
            <CardContent>
              <h3 className="text-lg font-bold">Legal Document {index + 1}</h3>
              {file ? (
                <>
                  <p className="text-sm">Uploaded On: {file.uploadedOn}</p>
                  <p className="text-sm">File Name: {file.fileName}</p>
                </>
              ) : (
                <p className="text-gray-500 text-sm">No document uploaded</p>
              )}
            </CardContent>
          </Card>
        );
      })}

      {/* Upload Modal */}
      {isUploadModalOpen && selectedIndex !== null && (
        <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload a Legal Document</DialogTitle>
            </DialogHeader>
            <FileUploader onDrop={onDrop} />
            <Button onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
          </DialogContent>
        </Dialog>
      )}

      {/* File View Modal */}
      {isFileViewModalOpen && selectedFile && (
        <Dialog open={isFileViewModalOpen} onOpenChange={setIsFileViewModalOpen}>
          <DialogContent>
            <div className="flex w-full h-[500px]">
              {/* Left Section (Document Content - 70%) */}
              <div className="w-[70%] bg-gray-100 p-4 overflow-auto">
                {selectedFile.fileName?.endsWith(".pdf") ? (
                  <Document
                  file={selectedFile?.filePath ? `${API_URL}${selectedFile.filePath}` : null}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  {selectedFile?.filePath ? <Page pageNumber={currentPage} /> : <p>Loading PDF...</p>}
                </Document>
                ) : (
                  <p>Preview not available for this file type.</p>
                )}
              </div>

              {/* Right Section (Page Buttons - 30%) */}
              <div className="w-[30%] bg-white p-4 border-l flex flex-col items-center">
                <h3 className="text-lg font-bold mb-4">Pages</h3>
                {numPages &&
                  Array.from({ length: numPages }, (_, i) => (
                    <Button key={i + 1} className="mb-2 w-full" onClick={() => setCurrentPage(i + 1)}>
                      Page {i + 1}
                    </Button>
                  ))}
              </div>
            </div>
            <Button onClick={() => setIsFileViewModalOpen(false)}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const FileUploader: React.FC<{ onDrop: (files: File[]) => void }> = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [],
      "application/vnd.ms-excel": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "text/csv": [],
    },
    onDrop,
  });

  return (
    <div {...getRootProps()} className="border p-4 text-center cursor-pointer hover:bg-gray-100">
      <input {...getInputProps()} />
      <p>Drag & drop a file here, or click to select one</p>
    </div>
  );
};

export default LegalDocuments;
