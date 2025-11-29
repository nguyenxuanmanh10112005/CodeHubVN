# CodeHub - Nền tảng Chia sẻ Source Code & Blog Công nghệ

**CodeHub** là một nền tảng web hiện đại, chuyên nghiệp dành cho cộng đồng lập trình viên, kỹ sư và sinh viên kỹ thuật. Website tập trung vào việc chia sẻ, trao đổi các **Source Code** chất lượng cao về **Tự động hóa, IoT, Robotics**, và các **Mô hình Đồ án**. Bên cạnh đó, CodeHub còn là nơi chia sẻ kiến thức thông qua hệ thống **Blog công nghệ** đa dạng.

Dự án được xây dựng với các công nghệ web mới nhất, đảm bảo hiệu năng cao, trải nghiệm người dùng mượt mà và giao diện đẹp mắt.

---

## 🚀 Công nghệ sử dụng (Tech Stack)

Dự án sử dụng kiến trúc hiện đại, tối ưu cho SEO và trải nghiệm người dùng:

### Frontend
*   **Framework:** [Next.js 15](https://nextjs.org/) (App Router) - Server Side Rendering (SSR) & Static Site Generation (SSG).
*   **Ngôn ngữ:** [TypeScript](https://www.typescriptlang.org/) - Đảm bảo type safety và dễ bảo trì.
*   **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) - Thiết kế giao diện nhanh chóng, responsive.
*   **State Management:** [TanStack React Query](https://tanstack.com/query/latest) - Quản lý server state, caching và data fetching hiệu quả.
*   **Form Handling:** `react-hook-form` kết hợp với `zod` (nếu có) để validate dữ liệu.
*   **UI Components:**
    *   `react-chartjs-2` / `chart.js`: Biểu đồ thống kê trực quan.
    *   `sweetalert2`: Thông báo đẹp mắt.
    *   `lucide-react` / Heroicons: Bộ icon hiện đại.

### Kết nối Backend
*   **HTTP Client:** [Axios](https://axios-http.com/) - Cấu hình Interceptors để tự động xử lý Token và lỗi.
*   **Authentication:** JWT (JSON Web Token) - Lưu trữ Access Token và Refresh Token an toàn.

---

## ✨ Tính năng chi tiết

### 1. Dành cho Người dùng (Public User)
*   **Trang chủ (Homepage):**
    *   Giao diện Landing page ấn tượng, giới thiệu tổng quan.
    *   Hiển thị các Source Code nổi bật và Bài viết mới nhất.
*   **Kho Source Code (`/source-codes`):**
    *   Danh sách các dự án, source code được phân loại rõ ràng.
    *   Xem chi tiết dự án: Mô tả, hình ảnh, tính năng, và giá bán (nếu có).
    *   Tìm kiếm và lọc dự án (đang phát triển).
*   **Blog Công nghệ (`/posts`):**
    *   Đọc các bài viết chia sẻ kiến thức, hướng dẫn kỹ thuật.
    *   Giao diện đọc bài tối ưu, dễ nhìn.
*   **Hệ thống Tài khoản:**
    *   **Đăng ký/Đăng nhập:** Hỗ trợ đăng nhập bằng Email/Password.
    *   **Google OAuth2:** Đăng nhập nhanh bằng tài khoản Google.
    *   **Quản lý phiên đăng nhập:** Tự động refresh token, tự động đăng xuất khi hết phiên.

### 2. Dành cho Quản trị viên (Admin Dashboard)
Trang quản trị (`/admin`) được bảo vệ chặt chẽ, chỉ dành cho tài khoản có quyền Admin.

*   **Dashboard (Tổng quan):**
    *   Thống kê số lượng người dùng, bài viết, sản phẩm.
    *   Biểu đồ doanh thu hoặc lượng truy cập (tích hợp Chart.js).
*   **Quản lý Sản phẩm (Products):**
    *   Xem danh sách toàn bộ source code.
    *   **Thêm mới:** Upload thông tin, hình ảnh, mô tả chi tiết cho source code.
    *   **Chỉnh sửa/Xóa:** Cập nhật thông tin hoặc gỡ bỏ dự án cũ.
*   **Quản lý Bài viết (Posts/Blog):**
    *   Soạn thảo bài viết mới với đầy đủ tiêu đề, nội dung, hình ảnh cover.
    *   Quản lý trạng thái bài viết (Published/Draft).
*   **Quản lý Người dùng (Users):**
    *   Xem danh sách người dùng đã đăng ký.
    *   Phân quyền hoặc khóa tài khoản (tùy backend hỗ trợ).
*   **Cấu hình Hệ thống (Settings):**
    *   Tùy chỉnh các tham số hệ thống (lưu trữ local hoặc server).
    *   Cấu hình giao diện, thông tin liên hệ.

---

## 🛠️ Hướng dẫn Cài đặt & Chạy dự án

Để chạy dự án này trên máy local, bạn cần cài đặt **Node.js** (phiên bản 18 trở lên).

### Bước 1: Clone dự án
```bash
git clone https://github.com/your-username/codehub-web.git
cd codehub-web
```

### Bước 2: Cài đặt thư viện
Sử dụng npm, yarn hoặc pnpm:
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

### Bước 3: Cấu hình môi trường (.env)
Tạo file `.env.local` tại thư mục gốc của dự án và thêm cấu hình sau:

```env
# URL của Backend API (Java Spring Boot / NodeJS / ...)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# Các cấu hình khác (nếu có)
```

### Bước 4: Chạy Development Server
```bash
npm run dev
```
Truy cập [http://localhost:3000](http://localhost:3000) để xem kết quả.

### Bước 5: Build cho Production
```bash
npm run build
npm start
```

---

## 📂 Cấu trúc Thư mục

```
src/
├── app/                    # Next.js App Router
│   ├── admin/              # Khu vực quản trị (Dashboard)
│   ├── (auth)/             # Các trang xác thực (Login, Register)
│   ├── posts/              # Trang danh sách & chi tiết bài viết
│   ├── source-codes/       # Trang danh sách & chi tiết source code
│   ├── layout.tsx          # Layout chính của ứng dụng
│   └── page.tsx            # Trang chủ
├── components/             # UI Components tái sử dụng
│   ├── shared/             # Các component chung (Header, Footer, Banner)
│   └── ui/                 # Các component nhỏ (Button, Input, Card)
├── services/               # API Services (gọi Backend)
│   ├── auth.service.ts     # API Đăng nhập/Đăng ký
│   ├── product.service.ts  # API Sản phẩm
│   └── blog.service.ts     # API Bài viết
├── lib/                    # Cấu hình thư viện (Axios, Utils)
├── types/                  # TypeScript Interfaces/Types
├── hooks/                  # Custom React Hooks
└── utils/                  # Các hàm tiện ích
```

## 🤝 Đóng góp (Contributing)
Mọi đóng góp đều được hoan nghênh! Nếu bạn muốn cải thiện dự án, hãy:
1.  Fork dự án.
2.  Tạo nhánh mới (`git checkout -b feature/AmazingFeature`).
3.  Commit thay đổi (`git commit -m 'Add some AmazingFeature'`).
4.  Push lên nhánh (`git push origin feature/AmazingFeature`).
5.  Tạo Pull Request.

## 📄 Giấy phép (License)
Dự án này được phân phối dưới giấy phép [MIT License](LICENSE).
