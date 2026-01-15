# Hướng dẫn kết nối Git với GitHub

## 🔐 Phương pháp xác thực

GitHub không còn hỗ trợ xác thực bằng password thông thường. Bạn có 2 cách:

### ✅ Phương pháp 1: Personal Access Token (Khuyến nghị - Dễ nhất)

#### Bước 1: Tạo Personal Access Token

1. Đăng nhập GitHub: https://github.com
2. Click vào **Avatar** (góc phải trên) → **Settings**
3. Scroll xuống dưới, click **Developer settings** (menu trái)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Điền thông tin:
   - **Note**: `Portfolio Deploy` (tên ghi nhớ)
   - **Expiration**: `90 days` (hoặc `No expiration` nếu muốn vĩnh viễn)
   - **Select scopes**: Tick ✅ **repo** (full control of private repositories)
7. Scroll xuống, click **Generate token**
8. **QUAN TRỌNG**: Copy token ngay (chỉ hiện 1 lần!)
   - Token có dạng: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### Bước 2: Lưu token vào Git Credential Manager

**Cách 1: Push và nhập token khi được hỏi**

```bash
# Push code lên GitHub
git push -u origin main

# Khi được hỏi:
# Username: vnttin96
# Password: [Paste token ở đây, KHÔNG phải password GitHub]
```

**Cách 2: Cấu hình credential helper (Tự động lưu)**

```bash
# Bật credential helper
git config --global credential.helper wincred

# Push lần đầu
git push -u origin main

# Nhập username và token
# Lần sau Git sẽ tự động dùng token đã lưu
```

---

### ✅ Phương pháp 2: SSH Key (Chuyên nghiệp hơn)

#### Bước 1: Kiểm tra SSH key đã có chưa

```bash
# Kiểm tra
ls ~/.ssh

# Nếu thấy id_rsa.pub hoặc id_ed25519.pub → Đã có key
# Nếu không → Tạo mới
```

#### Bước 2: Tạo SSH key mới (nếu chưa có)

```bash
# Tạo SSH key
ssh-keygen -t ed25519 -C "vnttin96@gmail.com"

# Nhấn Enter 3 lần (không cần passphrase)
# Key sẽ được tạo tại: C:\Users\Admin\.ssh\id_ed25519
```

#### Bước 3: Copy public key

```bash
# Hiển thị public key
cat ~/.ssh/id_ed25519.pub

# Copy toàn bộ nội dung (bắt đầu bằng ssh-ed25519...)
```

#### Bước 4: Thêm SSH key vào GitHub

1. Vào GitHub: https://github.com/settings/keys
2. Click **New SSH key**
3. Điền:
   - **Title**: `Portfolio Laptop` (tên máy tính)
   - **Key**: Paste public key vừa copy
4. Click **Add SSH key**

#### Bước 5: Đổi remote URL sang SSH

```bash
# Đổi từ HTTPS sang SSH
git remote set-url origin git@github.com:vnttin96/portfolio.git

# Kiểm tra
git remote -v

# Test kết nối
ssh -T git@github.com
# Nếu thấy "Hi vnttin96! You've successfully authenticated" → OK!
```

#### Bước 6: Push code

```bash
git push -u origin main
# Không cần nhập username/password nữa!
```

---

## 🚀 Push code lên GitHub (Sau khi đã xác thực)

### Lần đầu tiên

```bash
# Đảm bảo đã commit
git status

# Push lên GitHub
git push -u origin main

# Nếu branch là master thay vì main:
git branch -M main
git push -u origin main
```

### Lần sau (khi có thay đổi)

```bash
# 1. Xem thay đổi
git status

# 2. Add files
git add .

# 3. Commit
git commit -m "Update portfolio content"

# 4. Push
git push
```

---

## ❌ Troubleshooting

### Lỗi: "Authentication failed"

**Nguyên nhân:** Sai username hoặc token

**Giải pháp:**
1. Đảm bảo username đúng: `vnttin96`
2. Dùng **Personal Access Token** thay vì password
3. Token phải có quyền `repo`

### Lỗi: "Permission denied (publickey)"

**Nguyên nhân:** SSH key chưa được thêm vào GitHub

**Giải pháp:**
1. Kiểm tra SSH key: `cat ~/.ssh/id_ed25519.pub`
2. Thêm vào GitHub: https://github.com/settings/keys
3. Test: `ssh -T git@github.com`

### Lỗi: "Repository not found"

**Nguyên nhân:** Repository chưa tạo hoặc URL sai

**Giải pháp:**
1. Tạo repository trên GitHub: https://github.com/new
2. Repository name: `portfolio`
3. Kiểm tra URL: `git remote -v`

### Lỗi: "failed to push some refs"

**Nguyên nhân:** Remote có commits mới hơn local

**Giải pháp:**
```bash
# Pull trước
git pull origin main --rebase

# Rồi push
git push
```

---

## 📝 Checklist

- [ ] Đã tạo repository `portfolio` trên GitHub
- [ ] Đã tạo Personal Access Token (hoặc SSH key)
- [ ] Đã cấu hình remote: `git remote -v`
- [ ] Đã commit code: `git status`
- [ ] Push thành công: `git push -u origin main`
- [ ] Kiểm tra code trên GitHub: https://github.com/vnttin96/portfolio

---

## 🎯 Tóm tắt nhanh

**Nếu chưa có repository:**
```bash
# 1. Tạo repo trên GitHub: https://github.com/new
# 2. Cấu hình remote (đã làm rồi)
git remote set-url origin https://github.com/vnttin96/portfolio.git

# 3. Push
git push -u origin main
# Username: vnttin96
# Password: [Personal Access Token]
```

**Nếu đã có repository:**
```bash
# Push thẳng
git push -u origin main
# Nhập username và token khi được hỏi
```

---

## 💡 Lưu ý quan trọng

1. **KHÔNG BAO GIỜ** commit file `.env.local` (đã có trong .gitignore)
2. **Personal Access Token** giống như password, giữ bí mật!
3. Nếu token bị lộ, xóa ngay và tạo token mới
4. Dùng SSH key nếu push/pull thường xuyên (tiện hơn)

**Chúc bạn thành công! 🚀**
