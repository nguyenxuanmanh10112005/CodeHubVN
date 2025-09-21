import Link from 'next/link';

interface BannerProps {
  title?: string;
  subtitle?: string;
  showButtons?: boolean;
}

export default function Banner({ 
  title = "Nền tảng Source Code Tự động hóa hàng đầu Việt Nam",
  subtitle = "Khám phá hàng ngàn source code IoT, Robot, và các giải pháp tự động hóa thông minh. Tăng tốc dự án của bạn với những mô hình đã được kiểm chứng.",
  showButtons = true 
}: BannerProps) {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-20 relative">
      {/* Professional background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-700/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-2000"></div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {title.includes("Source Code") ? (
              <>
                <span className="block text-white mb-2">Nền tảng</span>
                <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-black">
                  Tự động hóa
                </span>
                <span className="block text-lg md:text-xl lg:text-2xl font-normal text-gray-300 mt-2">
                  hàng đầu Việt Nam
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {title}
              </span>
            )}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            {subtitle}
          </p>
          
          {showButtons && (
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-xs mx-auto">
                <Link
                  href="/source-codes"
                  className="group bg-white text-gray-900 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span className="group-hover:text-gray-700 transition-colors">
                    Khám phá Mô hình Tự động hóa
                  </span>
                </Link>
                <Link
                  href="/posts"
                  className="group border-2 border-gray-300 text-white hover:bg-white hover:text-gray-900 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 text-center hover:border-white transform hover:-translate-y-0.5"
                >
                  <span className="transition-colors">
                    Đọc bài viết
                  </span>
                </Link>
              </div>
            </div>
            )}
        </div>
      </div>
    </section>
  );
}