'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productApi } from '@/services/product.service';
import { paymentApi } from '@/services/payment.service';
import { ProductDetailResponse } from '@/types/api';
import Header from '@/components/shared/Header';
import ContactIcons from '@/components/shared/ContactIcons';

// Mock data for reviews
const mockReviews = [
  {
    id: 1,
    user: {
      name: 'Nguyễn Văn A',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      verified: true
    },
    rating: 5,
    comment: 'Source code rất chất lượng, code sạch và dễ hiểu. Tài liệu hướng dẫn chi tiết, hỗ trợ nhiệt tình. Đáng đồng tiền bát gạo!',
    createdAt: '2024-09-05T10:30:00Z',
    helpful: 12
  },
  {
    id: 2,
    user: {
      name: 'Trần Thị B',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      verified: true
    },
    rating: 4,
    comment: 'Code khá ổn, thiết kế đẹp. Tuy nhiên một số chỗ còn có thể tối ưu hơn. Nhìn chung vẫn recommend.',
    createdAt: '2024-09-03T14:20:00Z',
    helpful: 8
  },
  {
    id: 3,
    user: {
      name: 'Lê Minh C',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      verified: false
    },
    rating: 5,
    comment: 'Mình là newbie nhưng follow theo tài liệu thì làm được ngay. Code rất dễ hiểu và có comment đầy đủ.',
    createdAt: '2024-09-01T16:45:00Z',
    helpful: 5
  },
  {
    id: 4,
    user: {
      name: 'Phạm Đức D',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      verified: true
    },
    rating: 5,
    comment: 'Xuất sắc! Đây là source code tốt nhất mình từng mua. Responsive design cực đẹp, performance tốt.',
    createdAt: '2024-08-28T09:15:00Z',
    helpful: 15
  }
];

export default function SourceCodeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [sourceCode, setSourceCode] = useState<ProductDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [reviews] = useState(mockReviews);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    const fetchSourceCode = async () => {
      if (!params.id) return;

      setIsLoading(true);
      try {
        const response = await productApi.getProduct(params.id as string);
        setSourceCode(response.result);
      } catch (error) {
        console.error('Error fetching source code:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSourceCode();
  }, [params.id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Hôm nay';
    if (diffInDays === 1) return 'Hôm qua';
    if (diffInDays < 30) return `${diffInDays} ngày trước`;
    return formatDate(dateString);
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const renderStars = (rating: number, size = 'w-5 h-5') => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`${size} ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="aspect-video bg-gray-300 rounded-3xl"></div>
                <div className="flex space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={`loading-thumbnail-${i}`} className="w-20 h-16 bg-gray-300 rounded-xl"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-300 rounded-2xl w-3/4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-5/6"></div>
                  <div className="h-4 bg-gray-300 rounded-full w-4/5"></div>
                </div>
                <div className="h-16 bg-gray-300 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sourceCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center bg-white rounded-3xl p-12 shadow-xl">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Source code không tìm thấy</h1>
            <p className="text-gray-600 mb-8">Có vẻ như source code này không tồn tại hoặc đã bị xóa.</p>
            <button
              onClick={() => router.back()}
              className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-2xl hover:from-gray-800 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-3 text-sm text-gray-500">
            <button
              onClick={() => router.push('/source-codes')}
              className="hover:text-indigo-600 transition-colors font-medium"
            >
              Source Codes
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-semibold truncate">{sourceCode.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Tabs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-3xl p-6 shadow-xl">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                {sourceCode.mediaList && sourceCode.mediaList.length > 0 ? (
                  <img
                    src={sourceCode.mediaList[currentImageIndex]?.url || sourceCode.mediaList[0].url}
                    alt={sourceCode.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center">
                        <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">No preview available</p>
                    </div>
                  </div>
                )}
              </div>

              {sourceCode.mediaList && sourceCode.mediaList.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2 mt-6">
                  {sourceCode.mediaList.map((media, index) => (
                    <button
                      key={media.id || `thumbnail-${index}-${media.fileName}`}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${currentImageIndex === index
                        ? 'border-indigo-500 shadow-lg scale-105'
                        : 'border-gray-200 hover:border-indigo-300 hover:scale-102'
                        }`}
                    >
                      <img
                        src={media.url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 text-sm font-medium transition-all duration-300 ${activeTab === 'overview'
                      ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Tổng quan
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`px-6 py-4 text-sm font-medium transition-all duration-300 ${activeTab === 'reviews'
                      ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Đánh giá ({reviews.length})
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Mô tả chi tiết</h3>
                      <p className="text-gray-600 leading-relaxed">{sourceCode.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 text-center">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{sourceCode.viewCount}</p>
                        <p className="text-sm text-gray-600">Lượt xem</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 text-center">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                        <p className="text-sm text-gray-600">Đánh giá</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 text-center">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{new Date(sourceCode.createdAt).getDate()}</p>
                        <p className="text-sm text-gray-600">Tháng {new Date(sourceCode.createdAt).getMonth() + 1}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    {/* Review Summary */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-4xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
                            <div className="flex">{renderStars(Math.round(averageRating))}</div>
                          </div>
                          <p className="text-gray-600">Dựa trên {reviews.length} đánh giá</p>
                        </div>
                        <div className="space-y-1">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = reviews.filter(r => r.rating === rating).length;
                            const percentage = (count / reviews.length) * 100;
                            return (
                              <div key={rating} className="flex items-center space-x-2 text-sm">
                                <span className="w-8">{rating}★</span>
                                <div className="w-24 h-2 bg-gray-200 rounded-full">
                                  <div
                                    className="h-2 bg-yellow-400 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-gray-600 w-8">{count}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 rounded-2xl p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.user.avatar}
                              alt={review.user.name}
                              className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                                  {review.user.verified && (
                                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                                      Đã mua
                                    </div>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">{formatRelativeTime(review.createdAt)}</span>
                              </div>
                              <div className="flex items-center space-x-1 mb-3">
                                {renderStars(review.rating, 'w-4 h-4')}
                              </div>
                              <p className="text-gray-700 leading-relaxed mb-3">{review.comment}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <button className="flex items-center space-x-1 hover:text-indigo-600 transition-colors">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L9 6v4m-2.5 4l-1.5-1.5M15 10l2-2m0 0l2-2" />
                                  </svg>
                                  <span>Hữu ích ({review.helpful})</span>
                                </button>
                                <button className="hover:text-indigo-600 transition-colors">Trả lời</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Write Review */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Viết đánh giá của bạn</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Đánh giá</label>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                onClick={() => setNewReview({ ...newReview, rating })}
                                className={`w-8 h-8 ${rating <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                              >
                                <svg fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nhận xét</label>
                          <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            placeholder="Chia sẻ trải nghiệm của bạn về source code này..."
                          />
                        </div>
                        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                          Gửi đánh giá
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info & Purchase */}
          <div className="space-y-6">
            {/* Product Info Card */}
            <div className="bg-white rounded-3xl p-8 shadow-xl sticky top-24">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full">
                      SOURCE CODE
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="flex">{renderStars(Math.round(averageRating), 'w-4 h-4')}</div>
                      <span className="text-sm font-medium text-gray-700">{averageRating.toFixed(1)}</span>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    {sourceCode.name}
                  </h1>
                  <p className="text-gray-600 leading-relaxed">
                    {sourceCode.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-500 py-4 border-y border-gray-100">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{sourceCode.viewCount} lượt xem</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(sourceCode.createdAt)}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatPrice(sourceCode.price)}
                    </div>
                    <p className="text-green-700 text-sm font-medium">Giá đã bao gồm source code và tài liệu hướng dẫn</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={async () => {
                      try {
                        setIsGeneratingQr(true);
                        const url = await paymentApi.createQrSePay({
                          amount: sourceCode.price,
                          description: `Thanh toán cho source code: ${sourceCode.name}`
                        });
                        setQrCodeUrl(url);
                        setShowQrCode(true);
                      } catch (error) {
                        console.error('Error generating payment URL:', error);
                        alert('Có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại sau.');
                      } finally {
                        setIsGeneratingQr(false);
                      }
                    }}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                    {isGeneratingQr ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Đang tạo mã QR...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M8 11v6a2 2 0 002 2h8a2 2 0 002-2v-6a2 2 0 00-2-2H10a2 2 0 00-2 2z" />
                        </svg>
                        <span>Mua ngay</span>
                      </div>
                    )}
                  </button>

                  <div className="flex space-x-3">
                    {sourceCode.demoUrl && (
                      <button
                        onClick={() => window.open(sourceCode.demoUrl, '_blank')}
                        className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600 font-medium py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>Xem Demo</span>
                        </div>
                      </button>
                    )}
                    <button className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 font-medium py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105">
                      <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>Yêu thích</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Features */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Tính năng nổi bật</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Source code đầy đủ và sạch</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Tài liệu hướng dẫn chi tiết</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Hỗ trợ kỹ thuật 24/7</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">Cập nhật miễn phí</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Info */}
            {sourceCode.user && (
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <h3 className="font-semibold text-gray-900 mb-4">Thông tin tác giả</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{sourceCode.user.username}</h4>
                    <p className="text-sm text-gray-500 mb-2">Nhà phát triển</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>4.9</span>
                      </span>
                      <span>•</span>
                      <span>25 sản phẩm</span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-2xl transition-colors">
                  Xem thêm sản phẩm
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrCode && qrCodeUrl && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-t-3xl">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-3xl font-bold mb-3">Xác nhận thanh toán</h3>
                  <p className="text-indigo-100">Vui lòng hoàn tất thanh toán để nhận source code</p>
                </div>
                <button
                  onClick={() => setShowQrCode(false)}
                  className="text-indigo-200 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-xl"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-3 space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8">
                    <div className="bg-white rounded-2xl p-6 shadow-lg">
                      <img
                        src={qrCodeUrl}
                        alt="QR Code thanh toán"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-800 mb-2">Lưu ý quan trọng</h4>
                        <p className="text-sm text-yellow-700">
                          Vui lòng không đóng cửa sổ này cho đến khi bạn hoàn tất thanh toán. Mã QR sẽ hết hạn sau 15 phút.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 space-y-6">
                  {/* Product Info */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Thông tin đơn hàng</h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Source Code</p>
                          <p className="font-semibold text-gray-900">{sourceCode.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Tổng thanh toán</p>
                          <p className="font-bold text-2xl text-gray-900">{formatPrice(sourceCode.price)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Steps */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-4">Hướng dẫn thanh toán</h4>
                    <div className="space-y-4">
                      {[
                        'Mở ứng dụng ngân hàng trên điện thoại',
                        'Chọn chức năng quét mã QR',
                        'Quét mã QR và xác nhận thanh toán'
                      ].map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                            {index + 1}
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Support */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Cần hỗ trợ?</h4>
                    <p className="text-sm text-gray-600 mb-4">Liên hệ với chúng tôi qua:</p>
                    <div className="flex items-center space-x-4">
                      <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Facebook</span>
                      </a>
                      <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 19c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-7H8v7zM10 9V5c0-.55.45-1 1-1h2c.55 0 1 .45 1 1v4h2l-4 4-4-4h2z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium">Zalo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Thanh toán được bảo mật bởi VNPay</span>
                </div>
                <button
                  onClick={() => setShowQrCode(false)}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-3 rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ContactIcons />
    </div>
  );
}