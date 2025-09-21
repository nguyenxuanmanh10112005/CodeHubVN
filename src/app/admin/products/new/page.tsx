'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productApi } from '@/services/product.service';
import { CreateProductRequest, MediaRequest } from '@/types/api';
import FileUpload from '@/components/shared/FileUpload';
import { FileResponse } from '@/services/file.service';

export default function NewProductPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string>('');
    const [uploadedFiles, setUploadedFiles] = useState<FileResponse[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        demoUrl: '',
        linkProduct: '',
        isPublic: true
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Prepare media list from uploaded files
            const mediaList: MediaRequest[] = uploadedFiles.map(file => ({
                fileName: file.fileName,
                url: file.url,
                fileType: file.fileType
            }));

            const createData: CreateProductRequest = {
                ...formData,
                mediaList
            };
            
            await productApi.createProduct(createData);
            router.push('/admin/products');
        } catch (error) {
            console.error('Failed to create product:', error);
            setError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo sản phẩm. Vui lòng thử lại.');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            isPublic: e.target.checked
        }));
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Tạo sản phẩm mới</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Thêm sản phẩm source code mới vào hệ thống
                </p>
            </div>

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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên sản phẩm *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Nhập tên sản phẩm"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                            rows={4}
                            placeholder="Mô tả chi tiết về sản phẩm"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Giá bán (VNĐ) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                                min="0"
                                placeholder="0"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Link Demo
                            </label>
                            <input
                                type="url"
                                name="demoUrl"
                                value={formData.demoUrl}
                                onChange={handleInputChange}
                                placeholder="https://demo.example.com"
                                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Link sản phẩm *
                        </label>
                        <input
                            type="url"
                            name="linkProduct"
                            value={formData.linkProduct}
                            onChange={handleInputChange}
                            required
                            placeholder="https://github.com/username/repo"
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Link đến repository GitHub hoặc nguồn code của sản phẩm
                        </p>
                    </div>

                    {/* File Upload Section */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Images/Screenshots
                        </label>
                        <FileUpload
                            onFileUploaded={(file) => {
                                setUploadedFiles(prev => [...prev, file]);
                                setError(''); // Clear any existing errors
                            }}
                            onError={(error) => {
                                setError(error);
                            }}
                            accept="image/*"
                            maxSize={10}
                            className="w-full"
                        />
                        {uploadedFiles.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {uploadedFiles.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img 
                                                src={file.url} 
                                                alt={file.fileName}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <p className="mt-1 text-xs text-gray-500">
                            Upload product screenshots, logos, or demonstration images
                        </p>
                    </div>

                    <div>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="isPublic"
                                checked={formData.isPublic}
                                onChange={handleCheckboxChange}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Công khai sản phẩm</span>
                        </label>
                        <p className="mt-1 text-xs text-gray-500">
                            Sản phẩm sẽ hiển thị trong danh sách công khai và khách hàng có thể mua với giá đã đặt. Nếu không chọn, sản phẩm sẽ ở chế độ riêng tư và chỉ admin có thể xem.
                        </p>
                    </div>

                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving ? 'Đang tạo...' : 'Tạo sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}