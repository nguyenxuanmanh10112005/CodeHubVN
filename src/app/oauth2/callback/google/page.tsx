'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApi } from '@/services/auth.service';

function GoogleOAuthCallback() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const handleGoogleCallback = async () => {
            try {
                const code = searchParams.get('code');
                const errorParam = searchParams.get('error');

                if (errorParam) {
                    setError('Đăng nhập Google bị hủy hoặc thất bại');
                    setIsLoading(false);
                    return;
                }

                if (!code) {
                    setError('Không nhận được mã xác thực từ Google');
                    setIsLoading(false);
                    return;
                }

                const result = await authApi.loginGoogle(code);

                if (result.code === 200) {
                    router.push('/');
                } else {
                    setError(result.message || 'Đăng nhập Google thất bại');
                }
            } catch (err: unknown) {
                console.error('Google OAuth callback error:', err);
                const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra trong quá trình đăng nhập';
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        handleGoogleCallback();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">C</span>
                        </div>
                    </div>

                    {isLoading ? (
                        <div>
                            <div className="flex items-center justify-center mb-4">
                                <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Đang xử lý đăng nhập</h2>
                            <p className="text-gray-600">Vui lòng chờ trong giây lát...</p>
                        </div>
                    ) : error ? (
                        <div>
                            <div className="flex items-center justify-center mb-4">
                                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Đăng nhập thất bại</h2>
                            <p className="text-red-600 mb-6">{error}</p>
                            <button
                                onClick={() => router.push('/login')}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            >
                                Quay lại trang đăng nhập
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="flex items-center justify-center mb-4">
                                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">Đăng nhập thành công</h2>
                            <p className="text-gray-600">Đang chuyển hướng...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function GoogleOAuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="animate-spin h-8 w-8 mx-auto text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        }>
            <GoogleOAuthCallback />
        </Suspense>
    );
}