'use client';

import { useState, useRef } from 'react';
import { fileApi, FileResponse } from '@/services/file.service';

interface FileUploadProps {
    onFileUploaded: (file: FileResponse) => void;
    onError?: (error: string) => void;
    accept?: string;
    maxSize?: number; // in MB
    className?: string;
    currentFile?: FileResponse | null;
    disabled?: boolean;
}

export default function FileUpload({
    onFileUploaded,
    onError,
    accept = "image/*",
    maxSize = 10,
    className = "",
    currentFile = null,
    disabled = false
}: FileUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
            onError?.(`File size must be less than ${maxSize}MB`);
            return;
        }

        setIsUploading(true);
        try {
            const response = await fileApi.uploadFile(file);
            if (response.code === 200) {
                onFileUploaded(response.result);
            } else {
                onError?.(response.message || 'Upload failed');
            }
        } catch (error) {
            onError?.(error instanceof Error ? error.message : 'Upload failed');
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragIn = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDragActive(true);
        }
    };

    const handleDragOut = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    const openFileDialog = () => {
        if (!disabled && !isUploading) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className={`relative ${className}`}>
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={handleFileSelect}
                className="hidden"
                disabled={disabled || isUploading}
            />
            
            <div
                className={`
                    border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
                    ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
                    ${disabled || isUploading ? 'cursor-not-allowed opacity-50' : 'hover:border-blue-400 hover:bg-gray-50'}
                    ${currentFile ? 'border-green-300 bg-green-50' : ''}
                `}
                onClick={openFileDialog}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {isUploading ? (
                    <div className="flex flex-col items-center">
                        <svg className="animate-spin w-8 h-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-sm text-blue-600">Uploading file...</p>
                    </div>
                ) : currentFile ? (
                    <div className="flex flex-col items-center">
                        {currentFile.fileType.startsWith('image/') ? (
                            <img
                                src={currentFile.url}
                                alt={currentFile.fileName}
                                className="w-24 h-24 object-cover rounded-lg mb-2"
                            />
                        ) : (
                            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        )}
                        <p className="text-sm text-green-600 font-medium truncate max-w-full">
                            {currentFile.fileName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Click to change file
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <div className="text-gray-600">
                            <p className="text-sm font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs mt-1">Max file size: {maxSize}MB</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}