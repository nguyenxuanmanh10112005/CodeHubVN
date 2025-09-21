'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import InputField from "@/components/auth/InputField";
import ErrorMessage from "@/components/auth/ErrorMessage";
import { authApi } from "@/services/auth.service";
import { LoginRequest } from "@/types/api";

interface LoginFormData extends LoginRequest {
    rememberMe: boolean;
}

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const handleGoogleLogin = () => {
        // Construct Google OAuth2 URL
        const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'your-google-client-id';
        const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2/callback/google';
        const scope = 'openid profile email';
        const responseType = 'code';
        
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=${responseType}`;
        
        window.location.href = googleAuthUrl;
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<LoginFormData>({
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            setError("");

            const result = await authApi.login({
                email: data.email,
                password: data.password
            });

            if (result.code === 200) {
                if (data.rememberMe) {
                    localStorage.setItem('rememberLogin', 'true');
                }
                router.push("/admin/users");
            } else {
                setError(result.message || "Đăng nhập thất bại. Vui lòng thử lại.");
            }
        } catch (err: unknown) {
            console.error("Login error:", err);
            const errorMessage = err instanceof Error ? err.message : "Có lỗi xảy ra. Vui lòng thử lại sau.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Đăng nhập"
            subtitle="Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục."
        >
            {/* Social Login */}
            <div className="mb-4">
                <button
                    type="button"
                    disabled={isLoading}
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Image src="/google.svg" alt="Google" width={18} height={18} />
                    <span className="text-sm font-medium text-gray-700">Tiếp tục với Google</span>
                </button>
            </div>

            {/* Divider */}
            <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-500 uppercase tracking-wide">Hoặc</span>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-3">
                    <ErrorMessage message={error} />
                </div>
            )}

            {/* Login Form */}
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField
                        id="email"
                        type="email"
                        label="Email"
                        placeholder="Nhập email của bạn"
                        autoComplete="email"
                        disabled={isLoading}
                        {...register("email", {
                            required: "Email là bắt buộc",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email không hợp lệ"
                            }
                        })}
                    />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <InputField
                        id="password"
                        type="password"
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu của bạn"
                        autoComplete="current-password"
                        disabled={isLoading}
                        {...register("password", {
                            required: "Mật khẩu là bắt buộc",
                            minLength: {
                                value: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự"
                            }
                        })}
                    />
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            disabled={isLoading}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                            {...register("rememberMe")}
                        />
                        <label htmlFor="remember-me" className="ml-2 text-xs text-gray-700">
                            Ghi nhớ đăng nhập
                        </label>
                    </div>

                    <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={!isValid || isLoading}
                    className="w-full flex items-center justify-center px-3 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Đang đăng nhập...
                        </>
                    ) : (
                        'Đăng nhập'
                    )}
                </button>

                <p className="text-center text-xs text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Link
                        href="/register"
                        className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                    >
                        Đăng ký ngay
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}