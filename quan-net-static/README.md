# ALT F4 Gaming — Website demo quản lý quán net

Website tĩnh sử dụng HTML, CSS và JavaScript thuần, phù hợp triển khai trên GitHub Pages.

## Chạy trên máy tính
- Giải nén thư mục.
- Mở `index.html` bằng trình duyệt.
- Không cần cài Node.js hay backend.

## Đưa lên GitHub Pages
1. Tạo repository tên `quan-net` trên GitHub.
2. Upload toàn bộ nội dung thư mục này (đảm bảo `index.html` nằm ở thư mục gốc repository).
3. Vào Settings → Pages.
4. Chọn Deploy from a branch → `main` → `/ (root)` → Save.
5. Chờ GitHub xuất bản website.

## Gắn subdomain
Trong Settings → Pages → Custom domain, nhập:
`quan-net.thutt.id.vn`

Tại nơi quản lý DNS có thẩm quyền cho `thutt.id.vn`, tạo:
- Type: CNAME
- Host/Name: `quan-net`
- Target/Value: `thienthu2910.github.io`
- TTL: mặc định hoặc 3600

Sau khi GitHub xác nhận DNS và cấp chứng chỉ, bật Enforce HTTPS.

## Lưu ý
Đây chỉ là giao diện demo frontend. Dữ liệu là dữ liệu minh họa; trạng thái máy và cài đặt được lưu trong LocalStorage của trình duyệt đang dùng. Không có đăng nhập thật, phân quyền, API, database hay đồng bộ nhiều thiết bị.
