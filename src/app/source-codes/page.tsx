'use client';

import { useState, useEffect } from 'react';
import { productApi } from '@/services/product.service';
import { ProductDetailResponse } from '@/types/api';
import Banner from '@/components/shared/Banner';
import Header from '@/components/shared/Header';
import ContactIcons from '@/components/shared/ContactIcons';

export default function SourceCodesPage() {
  const [sourceCodes, setSourceCodes] = useState<ProductDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSourceCodes = sourceCodes.filter(code =>
    code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchSourceCodes = async () => {
      setIsLoading(true);
      try {
        const productResponse = await productApi.getAllProducts();
        setSourceCodes(productResponse.result || []);
      } catch (error) {
        console.error('Error fetching source codes:', error);
        setSourceCodes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSourceCodes();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Banner
        title="Mô hình đồ án Tự động hóa"
        subtitle="Khám phá hàng trăm source code IoT, Robot và các giải pháp tự động hóa thông minh"
        showButtons={false}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm source code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-4 text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            {searchTerm ? (
              `Hiển thị ${filteredSourceCodes.length} items (đã lọc từ ${sourceCodes.length} tổng cộng)`
            ) : (
              `Hiển thị ${sourceCodes.length} items`
            )}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video w-full bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <div className="h-8 bg-gray-200 rounded mb-4"></div>
                    <div className="h-14 bg-gray-200 rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            filteredSourceCodes.map((code) => (
              <div key={code.id} className="group bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden flex flex-col h-full">
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                  {code.mediaList && code.mediaList.length > 0 ? (
                    <>
                      <img
                        src={code.mediaList[0].url}
                        alt={code.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="w-16 h-16 mx-auto bg-gray-200 rounded-2xl flex items-center justify-center group-hover:bg-gray-300 transition-colors duration-300">
                          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <p className="text-sm text-gray-400 font-medium">Preview Image</p>
                      </div>
                    </div>
                  )}

                  {/* Floating Rating */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
                      <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-gray-800">5.0</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3 flex flex-col flex-grow">
                  {/* Category Tag */}
                  <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 w-fit">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></div>
                    <span className="text-xs font-medium uppercase tracking-wide">Source Code</span>
                  </div>

                  {/* Title - Fixed height */}
                  <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors min-h-[3rem]">
                    {code.name}
                  </h3>

                  {/* Description - Fixed height with ellipsis */}
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 flex-grow min-h-[2.5rem]">
                    {code.description}
                  </p>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between pt-1 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{code.viewCount}</span>
                    </div>
                  </div>

                  {/* Price and Button - Always at bottom */}
                  <div className="pt-3 border-t border-gray-100 mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatPrice(code.price)}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => window.location.href = `/source-codes/${code.id}`}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-sm"
                    >
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Contact Icons */}
      <ContactIcons />
    </div>
  );
}