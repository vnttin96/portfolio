# Hướng dẫn xóa Contributors cũ

## 🎯 Vấn đề

GitHub hiển thị tất cả contributors từ Git history, bao gồm cả người đã commit trước đó (taqui-786, cengizhan, taqui-lightwork).

## ✅ Giải pháp: Tạo Repository mới (Khuyến nghị - Dễ nhất)

### Bước 1: Tạo repository mới trên GitHub

1. Vào: https://github.com/new
2. Repository name: `portfolio` (hoặc tên khác)
3. **KHÔNG** tick "Initialize with README"
4. Click "Create repository"

### Bước 2: Xóa Git history cũ và tạo mới

```bash
# Di chuyển vào thư mục portfolio
cd d:\Portfolio

# Xóa thư mục .git cũ (chứa history cũ)
Remove-Item -Path ".git" -Recurse -Force

# Khởi tạo Git mới
git init

# Cấu hình user (quan trọng!)
git config user.name "vnttin96"
git config user.email "vnttin96@gmail.com"

# Add tất cả files
git add .

# Commit lần đầu (chỉ có bạn là author)
git commit -m "Initial commit: Tín Võ Portfolio"

# Thêm remote (thay YOUR_NEW_REPO bằng tên repo mới)
git remote add origin https://github.com/vnttin96/YOUR_NEW_REPO.git

# Push lên GitHub
git branch -M main
git push -u origin main --force
```

### Bước 3: Xóa repository cũ (Tùy chọn)

1. Vào: https://github.com/vnttin96/portfolio/settings
2. Scroll xuống "Danger Zone"
3. Click "Delete this repository"
4. Confirm

---

## 🔄 Giải pháp 2: Rewrite Git History (Phức tạp hơn)

### Sử dụng git filter-branch

```bash
# Backup trước
git clone https://github.com/vnttin96/portfolio.git portfolio-backup

# Rewrite tất cả commits
git filter-branch --env-filter '
CORRECT_NAME="vnttin96"
CORRECT_EMAIL="vnttin96@gmail.com"

export GIT_COMMITTER_NAME="$CORRECT_NAME"
export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
export GIT_AUTHOR_NAME="$CORRECT_NAME"
export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
' --tag-name-filter cat -- --branches --tags

# Force push
git push --force --all
git push --force --tags
```

**Lưu ý:** Cách này phức tạp và có thể gây lỗi!

---

## 🆕 Giải pháp 3: Tạo Repository hoàn toàn mới (Khuyến nghị nhất)

### Bước 1: Tạo repo mới với tên khác

```bash
# Tạo repo mới trên GitHub: portfolio-v2 hoặc tinvo-portfolio
```

### Bước 2: Copy code vào thư mục mới

```bash
# Tạo thư mục mới
mkdir d:\Portfolio-New
cd d:\Portfolio-New

# Copy tất cả files (trừ .git)
Copy-Item -Path "d:\Portfolio\*" -Destination "." -Recurse -Exclude ".git"

# Khởi tạo Git mới
git init
git config user.name "vnttin96"
git config user.email "vnttin96@gmail.com"

# Add và commit
git add .
git commit -m "Initial commit: Tín Võ - IT Staff Portfolio"

# Push lên repo mới
git remote add origin https://github.com/vnttin96/portfolio-v2.git
git branch -M main
git push -u origin main
```

### Bước 3: Xóa repo cũ

- Xóa `portfolio` cũ trên GitHub
- Đổi tên `portfolio-v2` thành `portfolio`

---

## 📝 So sánh các phương pháp

| Phương pháp | Ưu điểm | Nhược điểm | Khuyến nghị |
|-------------|---------|------------|-------------|
| **Tạo repo mới** | ✅ Đơn giản<br>✅ Sạch 100%<br>✅ Không lỗi | ❌ Mất stars/forks (nếu có) | ⭐⭐⭐⭐⭐ |
| **Rewrite history** | ✅ Giữ repo cũ | ❌ Phức tạp<br>❌ Dễ lỗi | ⭐⭐ |
| **Xóa .git và init lại** | ✅ Nhanh | ❌ Phải force push | ⭐⭐⭐⭐ |

---

## ✅ Hướng dẫn chi tiết (Phương pháp khuyến nghị)

### 1. Xóa Git history cũ

```powershell
# Vào thư mục portfolio
cd d:\Portfolio

# Xóa .git (chứa history cũ)
Remove-Item -Path ".git" -Recurse -Force

# Verify đã xóa
Test-Path ".git"  # Phải trả về False
```

### 2. Khởi tạo Git mới

```powershell
# Init Git mới
git init

# Cấu hình user
git config user.name "vnttin96"
git config user.email "vnttin96@gmail.com"

# Kiểm tra
git config user.name
git config user.email
```

### 3. Commit lần đầu

```powershell
# Add tất cả files
git add .

# Commit (chỉ có bạn là author)
git commit -m "Initial commit: Tín Võ - IT Staff Portfolio

- Modern Next.js 15 portfolio
- IT Support expertise showcase
- Responsive design with Shadcn UI
- Vietnamese content support"

# Kiểm tra log
git log
# Chỉ có 1 commit, author là vnttin96
```

### 4. Push lên GitHub

**Option A: Dùng repo cũ (Force push)**

```powershell
# Add remote
git remote add origin https://github.com/vnttin96/portfolio.git

# Force push (XÓA history cũ)
git branch -M main
git push -u origin main --force
```

**Option B: Tạo repo mới (An toàn hơn)**

```powershell
# Tạo repo mới trên GitHub: portfolio-clean

# Add remote
git remote add origin https://github.com/vnttin96/portfolio-clean.git

# Push
git branch -M main
git push -u origin main
```

---

## 🎯 Kết quả

Sau khi làm xong:
- ✅ Contributors: Chỉ có **vnttin96**
- ✅ Commits: Chỉ có commits của bạn
- ✅ History: Hoàn toàn sạch
- ✅ Code: Giữ nguyên 100%

---

## ⚠️ Lưu ý quan trọng

1. **Backup trước khi làm:**
   ```powershell
   # Copy toàn bộ thư mục
   Copy-Item -Path "d:\Portfolio" -Destination "d:\Portfolio-Backup" -Recurse
   ```

2. **Force push sẽ XÓA history cũ:**
   - Không thể khôi phục
   - Nếu ai đó đã clone repo cũ, họ sẽ bị conflict

3. **Nếu đã deploy Vercel:**
   - Vercel vẫn hoạt động bình thường
   - Có thể cần reconnect repository

---

## 🚀 Tóm tắt nhanh

**Cách nhanh nhất (5 phút):**

```powershell
cd d:\Portfolio
Remove-Item -Path ".git" -Recurse -Force
git init
git config user.name "vnttin96"
git config user.email "vnttin96@gmail.com"
git add .
git commit -m "Initial commit: Tín Võ Portfolio"
git remote add origin https://github.com/vnttin96/portfolio.git
git branch -M main
git push -u origin main --force
```

**Xong! Chỉ còn bạn trong contributors! 🎉**
