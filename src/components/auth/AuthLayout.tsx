import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
    subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left side - Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
                <div className="max-w-md w-full">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="text-center mb-6">
                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">C</span>
                                </div>
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                            {subtitle && (
                                <p className="mt-1 text-xs text-gray-600">{subtitle}</p>
                            )}
                        </div>
                        {children}
                    </div>
                </div>
            </div>

            {/* Right side - Illustration */}
            <div className="hidden lg:block relative w-0 flex-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative h-full flex items-center justify-center p-8">
                        <div className="text-center text-white">
                            <div className="mb-6">
                                <svg className="w-24 h-24 mx-auto text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold mb-3">Chào mừng đến với CodeHub</h2>
                            <p className="text-base text-white/90 leading-relaxed">
                                Nền tảng source code tự động hóa và mô hình đồ án thông minh hàng đầu Việt Nam
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
