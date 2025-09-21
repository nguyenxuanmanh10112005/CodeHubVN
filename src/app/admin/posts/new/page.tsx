'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { postApi } from '@/services/blog.service';
import { CreatePostRequest, MediaRequest } from '@/types/api';
import FileUpload from '@/components/shared/FileUpload';
import { FileResponse } from '@/services/file.service';

export default function NewPostPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        link: ''
    });
    const [uploadedFiles, setUploadedFiles] = useState<FileResponse[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!formData.title.trim()) {
            setError('Vui lòng nhập tiêu đề bài viết');
            return;
        }
        
        if (!formData.content.trim()) {
            setError('Vui lòng nhập nội dung bài viết');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            // Prepare media list from uploaded files
            const medias: MediaRequest[] = uploadedFiles.map(file => ({
                fileName: file.fileName,
                url: file.url,
                fileType: file.fileType
            }));

            const postData: CreatePostRequest = {
                title: formData.title.trim(),
                content: formData.content.trim(),
                link: formData.link.trim() || undefined,
                medias
            };

            const response = await postApi.createPost(postData);
            
            if (response.code === 200) {
                // Success - redirect to posts list
                router.push('/admin/posts');
            } else {
                setError(response.message || 'Có lỗi xảy ra khi tạo bài viết');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Có lỗi xảy ra khi tạo bài viết');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tạo bài viết mới</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Tạo và xuất bản bài viết mới cho hệ thống
                        </p>
                    </div>
                    <Link
                        href="/admin/posts"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Quay lại
                    </Link>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Error Display */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex">
                                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div className="ml-3">
                                    <p className="text-sm text-red-800">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Title Field */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Tiêu đề bài viết <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-colors duration-200"
                            placeholder="Nhập tiêu đề bài viết..."
                        />
                    </div>

                    {/* Content Field */}
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                            Nội dung bài viết <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                            rows={12}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-colors duration-200 resize-vertical"
                            placeholder="Nhập nội dung bài viết..."
                        />
                    </div>

                    {/* File Upload Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Images/Files
                        </label>
                        <FileUpload
                            onFileUploaded={(file) => {
                                setUploadedFiles(prev => [...prev, file]);
                            }}
                            onError={(error) => {
                                setError(error);
                            }}
                            accept="image/*,video/*,.pdf,.doc,.docx"
                            maxSize={50}
                            className="w-full"
                        />
                        {uploadedFiles.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
                                <div className="space-y-2">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                {file.fileType.startsWith('image/') ? (
                                                    <img 
                                                        src={file.url} 
                                                        alt={file.fileName}
                                                        className="w-12 h-12 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{file.fileName}</p>
                                                    <p className="text-xs text-gray-500">{file.fileType}</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                                                className="text-red-600 hover:text-red-800 p-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Link Field */}
                    <div>
                        <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                            Liên kết (tùy chọn)
                        </label>
                        <input
                            type="url"
                            id="link"
                            name="link"
                            value={formData.link}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-colors duration-200"
                            placeholder="https://example.com"
                        />
                    </div>

                    {/* Preview Section */}
                    {(formData.title || formData.content || uploadedFiles.length > 0) && (
                        <div className="border-t border-gray-200 pt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Xem trước bài viết</h3>
                            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                                {formData.title && (
                                    <h4 className="text-xl font-semibold text-gray-900">{formData.title}</h4>
                                )}
                                {uploadedFiles.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {uploadedFiles.slice(0, 6).map((file, index) => (
                                            <div key={index}>
                                                {file.fileType.startsWith('image/') ? (
                                                    <img
                                                        src={file.url}
                                                        alt={file.fileName}
                                                        className="w-full h-32 object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <div className="text-center">
                                                            <svg className="w-8 h-8 text-gray-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            <p className="text-xs text-gray-500 truncate">{file.fileName}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {formData.content && (
                                    <div className="text-gray-700 whitespace-pre-wrap max-h-32 overflow-y-auto">
                                        {formData.content.length > 200 
                                            ? formData.content.substring(0, 200) + '...'
                                            : formData.content
                                        }
                                    </div>
                                )}
                                {formData.link && (
                                    <a
                                        href={formData.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        {formData.link}
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                <span className="text-red-500">*</span> Các trường bắt buộc
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/admin/posts"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    Hủy bỏ
                                </Link>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !formData.title.trim() || !formData.content.trim()}
                                    className="inline-flex items-center px-6 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Đang tạo...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                            Tạo bài viết
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}