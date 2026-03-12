# 📖 คู่มือการใช้งาน QuizFlow

## 🎯 เมื่อมีไฟล์ Quiz ใหม่เข้ามา

### วิธีที่ 1: Auto Format (แนะนำสำหรับ Development)

**Windows:**
1. ดับเบิลคลิก `start-dev.bat`
2. ระบบจะเปิด 2 หน้าต่าง:
   - **File Watcher** - ตรวจจับไฟล์ใหม่อัตโนมัติ
   - **Web Server** - รัน server ที่ http://localhost:3000
3. วางไฟล์ `.json` ใหม่ในโฟลเดอร์ `json/`
4. ระบบจะแปลงไฟล์อัตโนมัติทันที
5. Refresh เบราว์เซอร์เพื่อดูหัวข้อใหม่

**ตัวอย่าง:**
```
json/
├── Main Memory Management_ OS Concepts.json  (มีอยู่แล้ว)
├── Threads and Concurrency.json              (มีอยู่แล้ว)
└── New Quiz Topic.json                       (ไฟล์ใหม่ที่เพิ่งวาง)
```

→ File Watcher จะแสดง:
```
📝 Detected change: New Quiz Topic.json
🔄 Running auto-setup...
✅ Converted: New Quiz Topic.json
✅ Generated quiz-list.json with 3 quizzes
✅ Auto-setup complete! Refresh your browser.
```

---

### วิธีที่ 2: Manual Format

**ขั้นตอน:**
1. วางไฟล์ `.json` ใหม่ในโฟลเดอร์ `json/`
2. เปิด Terminal/Command Prompt
3. รันคำสั่ง:
   ```bash
   npm run setup
   ```
4. Refresh เบราว์เซอร์

**คำสั่งที่ใช้:**
```bash
npm run setup          # แปลง + สร้าง quiz-list (ทำทั้งหมด)
npm run convert        # แปลงรูปแบบไฟล์เท่านั้น
npm run generate       # สร้าง quiz-list.json เท่านั้น
```

---

## 📋 รูปแบบไฟล์ที่รองรับ

### รูปแบบที่ 1: Simple Format (ใช้ได้เลย)

```json
[
  {
    "text": "คำถาม",
    "info": "คำอธิบาย",
    "difficulty": "easy",
    "answers": [
      {
        "text": "ตัวเลือกที่ 1",
        "correct": true
      },
      {
        "text": "ตัวเลือกที่ 2",
        "correct": false
      }
    ]
  }
]
```

### รูปแบบที่ 2: Complex Format (จะถูกแปลงอัตโนมัติ)

ไฟล์ที่มี metadata เพิ่มเติม เช่น:
```json
[
  {
    "id": 47898682,
    "quiz_id": 2252307,
    "text": "คำถาม",
    "info": "คำอธิบาย",
    "difficulty": "easy",
    "created_at": "2026-03-12T17:30:21.000000Z",
    "answers": [
      {
        "id": 161562804,
        "text": "ตัวเลือก",
        "correct": true,
        "created_at": "2026-03-12T17:30:21.000000Z"
      }
    ]
  }
]
```

→ ระบบจะแปลงให้เป็น Simple Format โดยอัตโนมัติ

---

## 🔄 กระบวนการแปลงไฟล์

### สิ่งที่เกิดขึ้นเมื่อรัน `npm run setup`:

1. **Convert Quiz Format** (`convert-quiz-format.js`)
   - สแกนไฟล์ทั้งหมดในโฟลเดอร์ `json/`
   - ตรวจสอบว่าไฟล์อยู่ในรูปแบบที่ถูกต้องหรือไม่
   - ถ้าเป็น Complex Format → แปลงเป็น Simple Format
   - ถ้าเป็น Simple Format อยู่แล้ว → ข้าม

2. **Generate Quiz List** (`generate-quiz-list.js`)
   - อ่านชื่อไฟล์ทั้งหมดในโฟลเดอร์ `json/`
   - สร้างไฟล์ `quiz-list.json` ที่มีรายการไฟล์ทั้งหมด
   - ชื่อหัวข้อจะมาจากชื่อไฟล์

### ตัวอย่างผลลัพธ์:

**Input:**
```
json/
├── Main Memory Management_ OS Concepts.json
├── Threads and Concurrency.json
└── CPU Scheduling.json
```

**Output (`quiz-list.json`):**
```json
[
  "Main Memory Management_ OS Concepts.json",
  "Threads and Concurrency.json",
  "CPU Scheduling.json"
]
```

**หน้าเว็บจะแสดง:**
- Main Memory Management_ OS Concepts
- Threads and Concurrency
- CPU Scheduling

---

## 🚀 Deploy to Vercel

### ขั้นตอนการ Deploy:

1. **Commit ไฟล์ทั้งหมด:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push ไป GitHub:**
   ```bash
   git remote add origin https://github.com/username/quizflow.git
   git push -u origin main
   ```

3. **Deploy บน Vercel:**
   - ไปที่ https://vercel.com
   - คลิก "New Project"
   - Import จาก GitHub
   - เลือก repository
   - คลิก "Deploy"

### สิ่งที่เกิดขึ้นเมื่อ Deploy:

Vercel จะรัน build command อัตโนมัติ:
```bash
node convert-quiz-format.js && node generate-quiz-list.js
```

ผลลัพธ์:
- ✅ แปลงไฟล์ทั้งหมดเป็น Simple Format
- ✅ สร้าง `quiz-list.json`
- ✅ Deploy เป็น static site (ไม่มี backend)

---

## 📝 เพิ่ม Quiz ใหม่หลัง Deploy

### Local Development:

**วิธีที่ 1: Auto (แนะนำ)**
1. เปิด `start-dev.bat` ทิ้งไว้
2. วางไฟล์ใหม่ในโฟลเดอร์ `json/`
3. ระบบแปลงอัตโนมัติ
4. Refresh เบราว์เซอร์

**วิธีที่ 2: Manual**
1. วางไฟล์ใหม่ในโฟลเดอร์ `json/`
2. รัน `npm run setup`
3. Refresh เบราว์เซอร์

### Production (Vercel):

1. วางไฟล์ใหม่ในโฟลเดอร์ `json/`
2. Commit และ Push:
   ```bash
   git add json/
   git commit -m "Add new quiz: Topic Name"
   git push
   ```
3. Vercel จะ auto-deploy และแปลงไฟล์อัตโนมัติ
4. รอ 1-2 นาที แล้วเปิดเว็บดู

---

## 🛠️ Troubleshooting

### ปัญหา: ไฟล์ใหม่ไม่แสดงบนเว็บ

**สาเหตุ:** ยังไม่ได้รัน setup

**แก้ไข:**
```bash
npm run setup
```
แล้ว refresh เบราว์เซอร์

---

### ปัญหา: ไฟล์ไม่ถูกแปลง

**สาเหตุ:** ไฟล์ JSON มี syntax error

**แก้ไข:**
1. ตรวจสอบไฟล์ด้วย JSON validator
2. ตรวจสอบว่ามี comma, bracket ครบหรือไม่
3. รัน `npm run convert` เพื่อดู error message

---

### ปัญหา: เว็บไม่โหลด (404 Error)

**สาเหตุ:** ไม่ได้รัน web server

**แก้ไข:**
```bash
serve . -p 3000
```
หรือ
```bash
npm run dev:simple
```
แล้วเปิด http://localhost:3000

---

### ปัญหา: File Watcher ไม่ทำงาน

**สาเหตุ:** ไม่ได้เปิด watch script

**แก้ไข:**
- Windows: ดับเบิลคลิก `start-dev.bat`
- หรือรัน: `node watch-and-convert.js`

---

## 📊 ตัวอย่างการใช้งานจริง

### Scenario 1: เพิ่ม Quiz ใหม่ครั้งแรก

```bash
# 1. วางไฟล์ในโฟลเดอร์
json/Operating Systems.json

# 2. รัน setup
npm run setup

# Output:
# Processing: Operating Systems.json
# ✅ Converted: Operating Systems.json
# ✅ Generated quiz-list.json with 3 quizzes

# 3. Refresh เบราว์เซอร์
# → เห็นหัวข้อ "Operating Systems" ใหม่
```

---

### Scenario 2: แก้ไขไฟล์ที่มีอยู่

```bash
# 1. แก้ไขไฟล์
json/CPU Scheduling.json

# 2. ถ้าเปิด File Watcher ไว้
# → แปลงอัตโนมัติ

# 3. ถ้าไม่ได้เปิด File Watcher
npm run setup

# 4. Refresh เบราว์เซอร์
```

---

### Scenario 3: Deploy ไป Production

```bash
# 1. เพิ่มไฟล์ใหม่
json/Database Systems.json

# 2. Test local
npm run setup
serve . -p 3000
# → ตรวจสอบว่าทำงานถูกต้อง

# 3. Commit และ Push
git add json/Database\ Systems.json
git commit -m "Add Database Systems quiz"
git push

# 4. Vercel auto-deploy
# → รอ 1-2 นาที
# → เปิดเว็บดูหัวข้อใหม่
```

---

## 🎓 Best Practices

### 1. ตั้งชื่อไฟล์ให้ชัดเจน
✅ ดี: `Operating Systems Fundamentals.json`
❌ ไม่ดี: `quiz1.json`, `test.json`

### 2. ใช้ File Watcher ตอน Development
```bash
start-dev.bat  # เปิดทิ้งไว้ตลอด
```

### 3. Test ก่อน Deploy
```bash
npm run setup
serve . -p 3000
# → ตรวจสอบว่าทำงานถูกต้อง
# → แล้วค่อย push
```

### 4. Commit Message ที่ดี
```bash
git commit -m "Add Operating Systems quiz (50 questions)"
git commit -m "Update Memory Management quiz - fix typos"
git commit -m "Remove outdated Networking quiz"
```

### 5. Backup ไฟล์ต้นฉบับ
เก็บไฟล์ Complex Format ไว้ในโฟลเดอร์อื่น (ถ้าต้องการ)
```
backup/
└── original-files/
    └── quiz-export-2024.json
```

---

## 📞 สรุป Commands ที่ใช้บ่อย

```bash
# Development
npm run setup          # แปลง + สร้าง quiz-list
npm run dev:simple     # รัน web server
start-dev.bat          # Auto-convert + web server (Windows)

# Manual
npm run convert        # แปลงไฟล์เท่านั้น
npm run generate       # สร้าง quiz-list เท่านั้น
npm run watch          # เปิด file watcher

# Production
git add json/
git commit -m "Add new quiz"
git push               # Vercel auto-deploy
```

---

## 🎉 เสร็จสิ้น!

ตอนนี้คุณรู้วิธีเพิ่มและจัดการไฟล์ quiz แล้ว

มีคำถามเพิ่มเติม? ดูที่ README.md หรือเปิด issue บน GitHub
