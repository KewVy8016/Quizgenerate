# PRD v2 — JSON Quiz Learning Platform

---

## 🧩 Product Overview

| Field | Detail |
|---|---|
| **Product Name** | QuizFlow |
| **Product Type** | Static Quiz Learning Platform |
| **Deploy Target** | Vercel (ไม่ต้องมี backend) |

**เว็บสำหรับทำข้อสอบจากไฟล์ JSON** ที่โหลดจากโฟลเดอร์ และสามารถเรียนรู้จากคำอธิบายหลังเฉลย

### User Journey

```
เลือกหัวข้อข้อสอบ → ทำข้อสอบ → ดูคำอธิบาย → ระบบจำ progress → กลับมาทำต่อได้
```

---

## 🎯 Product Vision

สร้างเว็บสำหรับ **Self-learning · Exam Preparation · Knowledge Review**

ที่มี UX: **Simple · Fast · Focus Learning**

แนวเดียวกับ Quizizz · LeetCode Learning Mode · Quizgecko Study Mode

---

## 🗂️ Core Concept

ระบบใช้ **JSON files** เป็น Quiz database โดยแต่ละไฟล์ = 1 quiz topic

```
/json
 ├── Memory Management.json
 ├── CPU Scheduling.json
 └── Networking.json
```

---

## 📐 Data Structure

### โครงสร้างคำถาม

```json
{
  "text": "question",
  "info": "explanation",
  "difficulty": "easy | medium | hard",
  "answers": [
    {
      "text": "choice",
      "correct": true
    }
  ]
}
```

### Field Reference

| Field | Description |
|---|---|
| `text` | คำถาม |
| `answers` | ตัวเลือก |
| `correct` | คำตอบที่ถูก |
| `info` | คำอธิบาย (แสดงหลังตอบ) |
| `difficulty` | ระดับความยาก |

> **หมายเหตุ:** field `info` ใช้เป็น explanation หลังผู้ใช้ตอบคำถาม

---

## 📚 Quiz Library System

ระบบ scan quiz list → generate topics → display quiz library

ข้อมูลมาจาก `quiz-list.json`

```json
[
  "Memory Management.json",
  "CPU Scheduling.json",
  "Networking.json"
]
```

---

## 🏷️ Topic Generation

ชื่อหัวข้อ quiz มาจาก **file name**

| Input | Output |
|---|---|
| `Memory Management.json` | Memory Management |

**ขั้นตอน:**
1. Remove `.json`
2. Replace `_` → space

---

## 🔄 User Flow

### Home
```
open website → show quiz topics → select quiz
```

### Quiz
```
load quiz JSON → render questions → user selects answer → show explanation → next question
```

### Result
```
calculate score → show summary → retry quiz
```

---

## 💾 State Persistence

เก็บ state ใน **LocalStorage** เพื่อไม่ให้ progress หาย

**Key:** `quiz_state_<quiz_name>`

```json
{
  "currentQuestion": 4,
  "answers": {
    "0": 2,
    "1": 1,
    "2": 0
  }
}
```

---

## ▶️ Resume Quiz

เมื่อเปิด quiz → ระบบ check localStorage → ถ้ามี state → **resume quiz automatically**

---

## 🔁 Reset Progress

ปุ่ม **Reset Progress** จะ:
- clear localStorage
- restart quiz

```javascript
localStorage.removeItem("quiz_state_topic")
```

---

## ✅ Answer Evaluation

เมื่อผู้ใช้ตอบ ระบบจะแสดง:
- highlight answer
- correct / incorrect indicator
- explanation

**ตัวอย่าง:**

> ✔ **Correct**
>
> *Explanation:* Main memory and registers are the only storage areas the CPU can access directly.

---

## 🏆 Score System

```
score = correct / total × 100
```

**ตัวอย่าง:** Score: 12 / 15 → **80%**

---

## 🖥️ UI Pages

### Home Page
- Quiz Library
- Topic Cards
- Resume Indicator

```
Memory Management
Progress: 6 / 20
```

### Quiz Page
- Question number
- Question text
- Choices
- Submit / Next / Previous
- Explanation
- Progress bar

### Result Page
- Score
- Correct answers
- Retry quiz
- Return to library

---

## 📖 Quiz Library Features

แสดงข้อมูลต่อไปนี้ใน Library:

```
Memory Management
20 questions · Progress: 8 / 20
```

| Info | Detail |
|---|---|
| Topic | ชื่อหัวข้อ |
| Question count | จำนวนข้อ |
| Progress | ความก้าวหน้า |

---

## ✨ Optional Features (Future)

| Feature | Description |
|---|---|
| **Shuffle Questions** | random question order |
| **Shuffle Answers** | random choice order |
| **Difficulty Filter** | easy / medium / hard |
| **Search Quiz** | search topics |
| **Study Mode** | show explanation immediately |

---

## ⚡ Performance Requirements

- Load < **1 second**
- Support **1,000+ questions**
- Work **without backend**

---

## 🏗️ Architecture

```
Browser
  ↓
Load quiz-list.json
  ↓
Render quiz library
  ↓
User selects quiz
  ↓
Fetch quiz JSON
  ↓
Render questions
  ↓
Save progress → LocalStorage
  ↓
Resume after refresh
```

---

## 📁 Project Structure

```
quizflow/
│
├── index.html
├── quiz.js
├── library.js
├── style.css
│
├── quiz-list.json
│
└── json/
    ├── memory-management.json
    ├── scheduling.json
    └── networking.json
```
