# Hướng dẫn Deploy Portfolio

## 📋 Mục lục
1. [Chuẩn bị](#chuẩn-bị)
2. [Push lên GitHub](#push-lên-github)
3. [Deploy lên Vercel](#deploy-lên-vercel)
4. [Cấu hình Domain](#cấu-hình-domain-tùy-chọn)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Chuẩn bị

### 1. Kiểm tra Portfolio hoạt động

```bash
# Build để kiểm tra lỗi
npm run build

# Nếu build thành công → OK!
# Nếu có lỗi → Fix trước khi deploy
```

### 2. Tạo file .gitignore (nếu chưa có)

File `.gitignore` đã có sẵn, kiểm tra nội dung:

```bash
# Xem nội dung .gitignore
cat .gitignore
```

Đảm bảo có các dòng sau:
```
node_modules/
.next/
.env.local
.env*.local
```

### 3. Tạo tài khoản (nếu chưa có)

- **GitHub**: https://github.com/signup
- **Vercel**: https://vercel.com/signup (đăng nhập bằng GitHub)

---

## 📤 Push lên GitHub

### Bước 1: Khởi tạo Git (nếu chưa có)

```bash
# Di chuyển vào thư mục portfolio
cd d:\Portfolio

# Kiểm tra Git đã khởi tạo chưa
git status

# Nếu báo lỗi "not a git repository", chạy:
git init
```

### Bước 2: Tạo Repository trên GitHub

1. Truy cập: https://github.com/new
2. Điền thông tin:
   - **Repository name**: `portfolio` (hoặc tên bạn muốn)
   - **Description**: "My personal portfolio website"
   - **Public** hoặc **Private**: Chọn Public
   - **KHÔNG** tick "Add a README file"
3. Click **"Create repository"**

### Bước 3: Commit và Push code

```bash
# 1. Thêm tất cả files
git add .

# 2. Commit với message
git commit -m "Initial commit: Portfolio website"

# 3. Thêm remote repository (thay YOUR_USERNAME bằng username GitHub của bạn)
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# 4. Đổi branch sang main (nếu cần)
git branch -M main

# 5. Push code lên GitHub
git push -u origin main
```

**Lưu ý:** Nếu GitHub yêu cầu đăng nhập:
- Username: Tên GitHub của bạn
- Password: Sử dụng **Personal Access Token** (không phải password)

### Tạo Personal Access Token (nếu cần)

1. Vào: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Chọn quyền: `repo` (full control)
4. Click **"Generate token"**
5. **Copy token** và dùng làm password khi push

---

## 🚀 Deploy lên Vercel

### Phương pháp 1: Deploy qua Dashboard (Khuyến nghị)

#### Bước 1: Đăng nhập Vercel

1. Truy cập: https://vercel.com/login
2. Click **"Continue with GitHub"**
3. Cho phép Vercel truy cập GitHub

#### Bước 2: Import Repository

1. Vào Dashboard: https://vercel.com/new
2. Click **"Import Git Repository"**
3. Tìm repository `portfolio` của bạn
4. Click **"Import"**

#### Bước 3: Cấu hình Project

**Configure Project:**
- **Framework Preset**: Next.js (tự động detect)
- **Root Directory**: `./` (giữ nguyên)
- **Build Command**: `npm run build` (mặc định)
- **Output Directory**: `.next` (mặc định)

**Environment Variables** (Tùy chọn):
- Nếu muốn contact form hoạt động, thêm:
  - Key: `RESEND_API_KEY`
  - Value: `re_your_api_key_here`

#### Bước 4: Deploy

1. Click **"Deploy"**
2. Đợi 2-3 phút
3. Khi thấy 🎉 **"Congratulations!"** → Hoàn thành!

#### Bước 5: Xem Website

- URL sẽ có dạng: `https://portfolio-abc123.vercel.app`
- Click vào link để xem portfolio live!

---

### Phương pháp 2: Deploy qua CLI

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Đăng nhập
vercel login

# 3. Deploy
vercel

# 4. Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (Chọn account của bạn)
# - Link to existing project? No
# - What's your project's name? portfolio
# - In which directory is your code located? ./
# - Want to override settings? No

# 5. Deploy production
vercel --prod
```

---

## 🌐 Cấu hình Domain (Tùy chọn)

### Sử dụng Domain miễn phí của Vercel

URL mặc định: `https://portfolio-abc123.vercel.app`

### Đổi tên subdomain

1. Vào Project Settings: https://vercel.com/dashboard
2. Click vào project `portfolio`
3. Tab **"Domains"**
4. Thêm domain mới: `tinvo.vercel.app` (hoặc tên bạn muốn)
5. Click **"Add"**

### Sử dụng Custom Domain (Có phí)

1. Mua domain từ: Namecheap, GoDaddy, etc.
2. Vào Vercel → **Domains** → **Add Domain**
3. Nhập domain của bạn: `tinvo.com`
4. Follow hướng dẫn cấu hình DNS

---

## 🔄 Cập nhật Portfolio sau khi Deploy

### Cách 1: Push lên GitHub (Tự động deploy)

```bash
# 1. Sửa code
# 2. Commit changes
git add .
git commit -m "Update portfolio content"

# 3. Push lên GitHub
git push

# Vercel sẽ tự động deploy sau vài giây!
```

### Cách 2: Deploy thủ công

```bash
# Deploy ngay lập tức
vercel --prod
```

---

## 🐛 Troubleshooting

### Lỗi: "Build failed"

**Nguyên nhân:** Code có lỗi

**Giải pháp:**
```bash
# Chạy build local để tìm lỗi
npm run build

# Fix lỗi rồi push lại
```

### Lỗi: "Module not found"

**Nguyên nhân:** Thiếu dependencies

**Giải pháp:**
```bash
# Cài đặt lại dependencies
npm install

# Commit package-lock.json
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### Lỗi: "Authentication failed" khi push GitHub

**Giải pháp:**
1. Tạo Personal Access Token (xem hướng dẫn ở trên)
2. Dùng token thay vì password

### Portfolio không hiển thị đúng trên Vercel

**Kiểm tra:**
1. Build logs trên Vercel Dashboard
2. Browser Console (F12) xem có lỗi không
3. Đảm bảo environment variables đã cấu hình đúng

---

## 📊 So sánh các nền tảng Deploy miễn phí

| Nền tảng | Ưu điểm | Nhược điểm | Khuyến nghị |
|----------|---------|------------|-------------|
| **Vercel** | ⭐ Tốt nhất cho Next.js<br>✅ Auto deploy<br>✅ Fast CDN<br>✅ Free SSL | ❌ Giới hạn bandwidth | ⭐⭐⭐⭐⭐ |
| **Netlify** | ✅ Dễ dùng<br>✅ Free SSL<br>✅ Form handling | ❌ Chậm hơn Vercel cho Next.js | ⭐⭐⭐⭐ |
| **GitHub Pages** | ✅ Free unlimited<br>✅ Tích hợp GitHub | ❌ Chỉ static sites<br>❌ Cần build trước | ⭐⭐⭐ |
| **Render** | ✅ Free tier tốt<br>✅ Hỗ trợ nhiều framework | ❌ Cold start chậm | ⭐⭐⭐ |

**Kết luận:** Dùng **Vercel** cho Next.js portfolio! 🚀

---

## ✅ Checklist Deploy

- [ ] Build thành công local (`npm run build`)
- [ ] Code đã commit và push lên GitHub
- [ ] Repository đã public (hoặc Vercel có quyền truy cập)
- [ ] Deploy trên Vercel thành công
- [ ] Kiểm tra website live hoạt động
- [ ] Test trên mobile
- [ ] Chia sẻ link với bạn bè! 🎉

---

## 🎯 Bước tiếp theo

Sau khi deploy thành công:

1. **Chia sẻ portfolio:**
   - LinkedIn: Thêm vào profile
   - Facebook: Post link
   - CV: Thêm URL vào CV

2. **SEO:**
   - Submit lên Google Search Console
   - Tạo sitemap.xml
   - Thêm Google Analytics

3. **Cập nhật thường xuyên:**
   - Thêm projects mới
   - Update skills
   - Viết blog (nếu có)

**Chúc bạn deploy thành công! 🚀**
