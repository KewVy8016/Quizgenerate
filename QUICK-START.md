# ⚡ Quick Start Guide

## 🎯 เมื่อมีไฟล์ใหม่เข้ามา - ทำอย่างไร?

### วิธีที่ 1: Auto Format (ง่ายที่สุด) ⭐

1. **ดับเบิลคลิก `start-dev.bat`**
2. **วางไฟล์ `.json` ในโฟลเดอร์ `json/`**
3. **Refresh เบราว์เซอร์**

เท่านี้เสร็จ! ระบบจะแปลงไฟล์อัตโนมัติ

---

### วิธีที่ 2: Manual Format

```bash
# 1. วางไฟล์ในโฟลเดอร์ json/
# 2. รันคำสั่ง
npm run setup
# 3. Refresh เบราว์เซอร์
```

---

## 📋 รูปแบบไฟล์ที่รองรับ

### ✅ รูปแบบง่าย (Simple Format)
```json
[
  {
    "text": "คำถาม",
    "info": "คำอธิบาย",
    "difficulty": "easy",
    "answers": [
      { "text": "ตัวเลือก 1", "correct": true },
      { "text": "ตัวเลือก 2", "correct": false }
    ]
  }
]
```

### ✅ รูปแบบซับซ้อน (Complex Format)
มี `id`, `quiz_id`, `created_at` และ metadata อื่นๆ
→ **ระบบจะแปลงให้อัตโนมัติ**

---

## 🚀 Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push

# 2. Import to Vercel
# → ไปที่ vercel.com
# → Import project
# → Deploy!
```

Vercel จะแปลงไฟล์อัตโนมัติเมื่อ deploy

---

## 📞 Commands ที่ใช้บ่อย

```bash
npm run setup          # แปลง + สร้าง quiz-list
start-dev.bat          # Auto-convert + web server
serve . -p 3000        # รัน web server เท่านั้น
```

---

## 🆘 เจอปัญหา?

### ไฟล์ใหม่ไม่แสดง
```bash
npm run setup
```

### เว็บไม่โหลด (404)
```bash
serve . -p 3000
```

### ต้องการรายละเอียดเพิ่ม
อ่าน [GUIDE.md](GUIDE.md) ฉบับเต็ม

---

## ✅ Checklist

- [ ] ติดตั้ง Node.js
- [ ] ติดตั้ง serve: `npm install -g serve`
- [ ] วางไฟล์ quiz ในโฟลเดอร์ `json/`
- [ ] รัน `npm run setup`
- [ ] รัน `serve . -p 3000`
- [ ] เปิด http://localhost:3000

เสร็จแล้ว! 🎉
