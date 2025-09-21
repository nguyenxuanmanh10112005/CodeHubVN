'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productApi } from '@/services/product.service';
import { ProductDetailResponse, UpdateProductRequest, MediaRequest } from '@/types/api';
import FileUpload from '@/components/shared/FileUpload';
import { FileResponse } from '@/services/file.service';

export default function ProductEditPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;

    const [product, setProduct] = useState<ProductDetailResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [existingFiles, setExistingFiles] = useState<FileResponse[]>([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        demoUrl: '',
        linkProduct: '',
        isPublic: true
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productApi.getProduct(productId);
                const productData = response.result;
                setProduct(productData);
                setFormData({
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    demoUrl: productData.demoUrl || '',
                    linkProduct: productData.linkProduct,
                    isPublic: productData.isPublic
                });

                // Convert existing media to FileResponse format for display
                if (productData.mediaList && productData.mediaList.length > 0) {
                    const files: FileResponse[] = productData.mediaList.map(media => ({
                        fileName: media.fileName || 'existing-file',
                        fileType: media.mediaType || 'image/jpeg',
                        url: media.url
                    }));
                    setExistingFiles(files);
                }
            } catch (error) {
                console.error('Failed to fetch product:', error);
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const updateData: UpdateProductRequest = {
                id: productId,
                ...formData
            };

            await productApi.updateProduct(updateData);
            router.push('/admin/products');
        } catch (error) {
            console.error('Failed to update product:', error);
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

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa sản phẩm</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Cập nhật thông tin sản phẩm source code
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
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

                    {/* Existing Files Display */}
                    {existingFiles.length > 0 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Product Images
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                                {existingFiles.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={file.url}
                                            alt={file.fileName}
                                            className="w-full h-24 object-cover rounded-lg"
                                        />
                                        <div className="mt-1">
                                            <p className="text-xs text-gray-500 truncate">{file.fileName}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start">
                                    <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h4 className="text-sm font-medium text-blue-800">Note about file management</h4>
                                        <p className="text-sm text-blue-700 mt-1">
                                            Currently, the backend doesn't support updating product images through the edit API.
                                            The images shown above are the current product images and cannot be modified through this interface.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

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
                            {saving ? 'Đang lưu...' : 'Cập nhật sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}