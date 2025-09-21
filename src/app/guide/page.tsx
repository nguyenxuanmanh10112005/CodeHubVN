'use client';

import Header from '@/components/shared/Header';
import ContactIcons from '@/components/shared/ContactIcons';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-black text-white py-16 md:py-20 relative">
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
              <span className="block text-white mb-2">Hướng dẫn mua</span>
              <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent font-black">
                Source Code
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
              Quy trình đơn giản và nhanh chóng để sở hữu những mã nguồn chất lượng cao
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Purchase Process */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Quy trình mua hàng tại CodeHub
            </h2>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Chọn Source Code
                  </h3>
                  <p className="text-gray-600">
                    Duyệt qua danh sách các source code tại trang <strong>Source Code</strong>. 
                    Xem chi tiết sản phẩm, demo và mô tả để chọn mã nguồn phù hợp với dự án của bạn.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nhấn nút "Mua ngay"
                  </h3>
                  <p className="text-gray-600">
                    Sau khi đã quyết định, nhấn vào nút <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">Mua ngay</span> 
                    trên trang chi tiết sản phẩm. Hệ thống sẽ chuyển bạn đến trang thanh toán.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Tiến hành thanh toán
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Chọn phương thức thanh toán phù hợp và hoàn tất giao dịch. 
                    CodeHub hỗ trợ nhiều phương thức thanh toán an toàn:
                  </p>
                  <ul className="space-y-1 text-gray-600 ml-4">
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Quét mã QR thanh toán
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Chuyển khoản ngân hàng
                    </li>
                    <li className="flex items-center">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Ví điện tử (MoMo, ZaloPay)
                    </li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Nhận Source Code qua Email
                  </h3>
                  <p className="text-gray-600">
                    Sau khi thanh toán thành công, source code sẽ được gửi về 
                    <strong> email của tài khoản</strong> bạn đã đăng ký. 
                    Thời gian gửi thường từ <strong>5-10 phút</strong> sau khi xác nhận thanh toán.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Lưu ý quan trọng
            </h3>
            <ul className="space-y-2 text-yellow-800">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Đảm bảo email tài khoản của bạn chính xác và có thể truy cập được
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Kiểm tra cả hộp thư spam/junk nếu không thấy email sau 10 phút
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Source code chỉ được gửi một lần, vui lòng lưu trữ cẩn thận
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Mọi thắc mắc vui lòng liên hệ support qua Zalo hoặc email
              </li>
            </ul>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Câu hỏi thường gặp
            </h2>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: Tôi có thể xem demo trước khi mua không?
                </h4>
                <p className="text-gray-600">
                  A: Có, mỗi source code đều có link demo để bạn trải nghiệm trước khi quyết định mua.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: Source code có kèm hướng dẫn cài đặt không?
                </h4>
                <p className="text-gray-600">
                  A: Có, tất cả source code đều kèm file README chi tiết và hướng dẫn cài đặt, chạy project.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: Tôi có được hỗ trợ sau khi mua không?
                </h4>
                <p className="text-gray-600">
                  A: Có, chúng tôi hỗ trợ giải đáp thắc mắc và hướng dẫn cài đặt trong 7 ngày sau khi mua.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Q: Source code có thể sử dụng cho mục đích thương mại không?
                </h4>
                <p className="text-gray-600">
                  A: Có, bạn có toàn quyền sử dụng và chỉnh sửa source code cho các dự án cá nhân và thương mại.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Contact Icons */}
      <ContactIcons />

      {/* Contact Section */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Cần hỗ trợ?</h2>
          <p className="text-gray-300 mb-6">
            Đội ngũ hỗ trợ của CodeHub luôn sẵn sàng giúp đỡ bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://zalo.me/codehub" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Liên hệ qua Zalo
            </a>
            <a 
              href="mailto:support@codehub.vn"
              className="border border-gray-600 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Gửi Email hỗ trợ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}