# Hướng dẫn đổi tài khoản GitHub

## 🔄 Vấn đề: Đã đăng nhập tài khoản GitHub cũ

Bạn đang gặp lỗi:
```
remote: Permission to vnttin96/portfolio.git denied to vnttin2k3.
fatal: unable to access 'https://github.com/vnttin96/portfolio.git/': The requested URL returned error: 403
```

**Nguyên nhân:** Windows Credential Manager đã lưu thông tin đăng nhập của tài khoản `vnttin2k3`, nên Git tự động dùng tài khoản cũ.

---

## ✅ Giải pháp: Xóa credentials cũ

### Phương pháp 1: Dùng Windows Credential Manager (GUI - Dễ nhất)

1. **Mở Credential Manager:**
   - Nhấn `Windows + R`
   - Gõ: `control /name Microsoft.CredentialManager`
   - Nhấn Enter

2. **Tìm GitHub credentials:**
   - Click tab **"Windows Credentials"**
   - Scroll xuống tìm mục có chữ **"github"** hoặc **"git:https://github.com"**

3. **Xóa credentials cũ:**
   - Click vào mục GitHub
   - Click **"Remove"** hoặc **"Xóa"**
   - Confirm

4. **Push lại:**
   ```bash
   git push -u origin main
   ```
   - Lần này sẽ hỏi username và password
   - Username: `vnttin96`
   - Password: [Personal Access Token của tài khoản vnttin96]

---

### Phương pháp 2: Dùng Command Line (Nhanh hơn)

```bash
# Xem danh sách credentials
cmdkey /list | findstr github

# Xóa GitHub credentials (thay TARGET_NAME bằng tên thực tế)
cmdkey /delete:git:https://github.com

# Hoặc xóa tất cả credentials liên quan đến GitHub
cmdkey /delete:LegacyGeneric:target=git:https://github.com
```

Sau đó push lại:
```bash
git push -u origin main
# Nhập username: vnttin96
# Nhập password: [Token của vnttin96]
```

---

### Phương pháp 3: Cấu hình Git credential helper

```bash
# Xóa cache credentials
git credential-cache exit

# Hoặc reset credential helper
git config --global --unset credential.helper
git config --global credential.helper wincred

# Push lại
git push -u origin main
```

---

## 🔑 Tạo Personal Access Token cho tài khoản mới (vnttin96)

Nếu chưa có token cho tài khoản `vnttin96`:

1. **Đăng nhập GitHub với tài khoản vnttin96**
2. Vào: https://github.com/settings/tokens
3. Click **"Generate new token"** → **"Generate new token (classic)"**
4. Điền:
   - Note: `Portfolio Deploy`
   - Expiration: `90 days`
   - Scopes: ✅ **repo** (full control)
5. Click **"Generate token"**
6. **Copy token** (chỉ hiện 1 lần!)

---

## 📝 Cấu hình Git với tài khoản mới

```bash
# Cấu hình username và email cho tài khoản mới
git config --global user.name "vnttin96"
git config --global user.email "vnttin96@gmail.com"

# Kiểm tra
git config --global user.name
git config --global user.email
```

---

## 🚀 Push code với tài khoản mới

```bash
# 1. Đảm bảo remote đúng
git remote -v
# Phải là: https://github.com/vnttin96/portfolio.git

# 2. Push
git push -u origin main

# 3. Khi được hỏi:
# Username for 'https://github.com': vnttin96
# Password for 'https://vnttin96@github.com': [Paste Personal Access Token]

# 4. Lần sau Git sẽ tự động dùng credentials mới
```

---

## ✅ Checklist

- [ ] Xóa credentials cũ (vnttin2k3) khỏi Windows Credential Manager
- [ ] Tạo Personal Access Token cho tài khoản vnttin96
- [ ] Cấu hình Git với username/email mới
- [ ] Push thành công với tài khoản vnttin96
- [ ] Kiểm tra code trên GitHub: https://github.com/vnttin96/portfolio

---

## ❌ Troubleshooting

### Vẫn bị lỗi 403 sau khi xóa credentials

**Thử:**
```bash
# Xóa tất cả config credentials
git config --global --unset-all credential.helper

# Set lại
git config --global credential.helper manager-core

# Push lại
git push -u origin main
```

### Token không hoạt động

**Kiểm tra:**
1. Token có quyền `repo` không?
2. Token đã hết hạn chưa?
3. Đang đăng nhập đúng tài khoản GitHub không?

---

## 💡 Lưu ý

- **Personal Access Token** là password, giữ bí mật!
- Nếu dùng nhiều tài khoản GitHub, nên dùng SSH key cho mỗi tài khoản
- Có thể dùng Git Credential Manager để quản lý nhiều tài khoản

**Chúc bạn thành công! 🚀**
