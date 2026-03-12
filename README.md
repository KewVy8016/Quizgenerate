# 🧩 QuizFlow

Static Quiz Learning Platform - เว็บสำหรับทำข้อสอบจากไฟล์ JSON

📖 **[อ่านคู่มือการใช้งานฉบับเต็ม (GUIDE.md)](GUIDE.md)**

## ✨ Features

- 📚 อ่านไฟล์ quiz จากโฟลเดอร์ `json/` แบบ dynamic
- 🔄 แปลงรูปแบบไฟล์อัตโนมัติ (รองรับ 2 รูปแบบ)
- 💾 บันทึก progress ใน localStorage
- 🔄 Resume quiz อัตโนมัติ
- 📊 แสดงคะแนนและคำอธิบาย
- 🎨 UI สวยงาม responsive
- 🚀 Deploy ง่าย ไม่ต้องมี backend

## 🚀 Quick Start

### เริ่มต้นใช้งาน (Windows)

1. **ดับเบิลคลิก `start-dev.bat`**
2. เปิดเบราว์เซอร์ที่ http://localhost:3000
3. เพิ่มไฟล์ `.json` ในโฟลเดอร์ `json/`
4. ระบบจะแปลงและอัปเดตอัตโนมัติ

### เพิ่ม Quiz ใหม่

**แบบ Auto (แนะนำ):**
1. เปิด `start-dev.bat` ทิ้งไว้
2. วางไฟล์ `.json` ในโฟลเดอร์ `json/`
3. Refresh เบราว์เซอร์

**แบบ Manual:**
```bash
# 1. วางไฟล์ในโฟลเดอร์ json/
# 2. รันคำสั่ง
npm run setup
# 3. Refresh เบราว์เซอร์
```

## 📖 เอกสารเพิ่มเติม

- **[GUIDE.md](GUIDE.md)** - คู่มือการใช้งานฉบับเต็ม
  - วิธีเพิ่มไฟล์ใหม่
  - รูปแบบไฟล์ที่รองรับ
  - การ Deploy
  - Troubleshooting
  - Best Practices

## 🚀 การใช้งาน

## 🚀 การใช้งาน

### Local Development (แบบ Auto)

**วิธีที่ 1: ใช้ Batch File (Windows - แนะนำ)**
1. ดับเบิลคลิก `start-dev.bat`
2. ระบบจะเปิด 2 หน้าต่าง:
   - File Watcher (ตรวจจับไฟล์ใหม่อัตโนมัติ)
   - Web Server (http://localhost:3000)
3. เพิ่มหรือแก้ไขไฟล์ `.json` ในโฟลเดอร์ `json/`
4. ระบบจะแปลงและอัปเดตอัตโนมัติ
5. Refresh เบราว์เซอร์เพื่อดูการเปลี่ยนแปลง

**วิธีที่ 2: ใช้ npm scripts**
```bash
npm run dev:simple    # รัน web server อย่างเดียว (ต้อง setup ก่อน)
npm run watch         # รัน file watcher อย่างเดียว
```

**วิธีที่ 3: Manual Setup**
```bash
npm run setup         # แปลง + สร้าง quiz-list
serve . -p 3000       # รัน web server
```

### Local Development (แบบ Manual)

**⚠️ สำคัญ: ต้องใช้ web server ไม่สามารถเปิดไฟล์ HTML โดยตรงได้**

1. เพิ่มไฟล์ quiz ในโฟลเดอร์ `json/`
2. รัน setup script:
   ```bash
   npm run setup
   ```
3. รัน web server:
   ```bash
   serve . -p 3000
   ```
4. เปิดเบราว์เซอร์ที่ `http://localhost:3000`

**npm scripts ที่มี:**
```bash
npm run convert       # แปลงรูปแบบไฟล์ quiz
npm run generate      # สร้าง quiz-list.json
npm run setup         # แปลง + สร้าง quiz-list
npm run watch         # ตรวจจับการเปลี่ยนแปลงอัตโนมัติ
npm run dev:simple    # setup + รัน web server
```

### Deploy to Vercel (Static Site - No Backend)

**ไม่มี Backend/Serverless Functions - เป็น Static Site ล้วนๆ**

1. **Commit ไฟล์ทั้งหมดไป Git:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push ไป GitHub:**
   ```bash
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. **Deploy บน Vercel:**
   - ไปที่ [vercel.com](https://vercel.com)
   - Import โปรเจคจาก GitHub
   - Vercel จะรัน build command อัตโนมัติ
   - Deploy เสร็จ!

**สิ่งที่เกิดขึ้นเมื่อ Deploy:**
- ✅ แปลงไฟล์ JSON อัตโนมัติ
- ✅ สร้าง quiz-list.json
- ✅ Deploy เป็น static files เท่านั้น
- ✅ ไม่มี API endpoints หรือ serverless functions

**เพิ่ม Quiz ใหม่:**
```bash
git add json/
git commit -m "Add new quiz"
git push
```
Vercel จะ auto-deploy และแปลงไฟล์ใหม่อัตโนมัติ

## 📁 โครงสร้างโปรเจค

```
quizflow/
├── index.html                 # หน้าแรก - Quiz Library
├── quiz.html                  # หน้าทำข้อสอบ
├── style.css                  # สไตล์
├── library.js                 # จัดการ quiz library
├── quiz.js                    # จัดการข้อสอบ
├── convert-quiz-format.js     # Script แปลงรูปแบบไฟล์
├── generate-quiz-list.js      # Script สร้าง quiz-list.json
├── watch-and-convert.js       # Auto-convert เมื่อไฟล์เปลี่ยน
├── start-dev.bat              # เริ่ม dev server (Windows)
├── package.json               # npm scripts
├── vercel.json                # Vercel config (static site)
├── quiz-list.json             # รายการ quiz (auto-generated)
└── json/                      # โฟลเดอร์เก็บไฟล์ quiz
    ├── memory-management.json
    ├── cpu-scheduling.json
    └── networking.json
```

## 📝 รูปแบบไฟล์ Quiz

สร้างไฟล์ `.json` ในโฟลเดอร์ `json/` ตามรูปแบบนี้:

```json
[
  {
    "text": "คำถาม",
    "difficulty": "easy",
    "answers": [
      {
        "text": "ตัวเลือก 1",
        "correct": true
      },
      {
        "text": "ตัวเลือก 2",
        "correct": false
      }
    ],
    "info": "คำอธิบาย"
  }
]
```

## 🔄 เพิ่ม Quiz ใหม่

1. สร้างไฟล์ `.json` ในโฟลเดอร์ `json/`
2. ตั้งชื่อไฟล์ตามหัวข้อ (เช่น `Operating Systems.json`)
3. รัน `npm run setup` (สำหรับ local)
4. Refresh หน้าเว็บ

ชื่อหัวข้อจะถูกสร้างจากชื่อไฟล์โดยอัตโนมัติ:
- `memory-management.json` → "memory management"
- `CPU_Scheduling.json` → "CPU Scheduling"
- `Main Memory Management_ OS Concepts.json` → "Main Memory Management_ OS Concepts"

### รองรับ 2 รูปแบบไฟล์:

**รูปแบบง่าย (Simple Format):**
```json
[
  {
    "text": "คำถาม",
    "info": "คำอธิบาย",
    "difficulty": "easy",
    "answers": [
      { "text": "ตัวเลือก", "correct": true }
    ]
  }
]
```

**รูปแบบซับซ้อน (Complex Format - จะถูกแปลงอัตโนมัติ):**
ระบบจะแปลงไฟล์ที่มี `quiz_id`, `created_at`, และ metadata อื่นๆ ให้เป็นรูปแบบง่ายโดยอัตโนมัติ

## 🛠️ Technology Stack

- HTML5, CSS3, JavaScript (Vanilla)
- LocalStorage API
- Vercel Serverless Functions (optional)
- No backend required

## 📄 License

MIT
