# AI Sidekick – Task Management App

AI Sidekick is a React Native app designed to help users manage tasks with time, categories, files, and optional premium features like exporting and smart reminders.

---

## 📁 Project Structure (Frontend)

```
src/
├── components/        # UI components (DatePicker, TaskModal, etc.)
├── constants/         # Global constants (keys, colors, roles, texts)
├── features/          # Redux slices (auth, tasks, holidays)
│   └── tasks/
│       ├── tasksSlice.js
│       ├── taskTempSlice.js
│       └── taskHelpers.js
├── navigation/        # Navigation structure (Drawer + Stack)
├── redux/             # Store configuration
├── screens/           # App screens (HomeScreen, AddTaskScreen, etc.)
├── services/          # Axios instance, storage handling
├── styles/            # Shared style files per screen
└── utils/             # General helper functions
```

---

## 🔄 Data Flow

### Adding a task:
1. User fills form in `AddTaskScreen`
2. Task is dispatched to Redux via `addTask(date, title, ...)`
3. Stored in `state.tasks.taskLists`
4. Rendered in `HomeScreen` and `TaskModal` using `selectTasksForDay(date)`

---

## 📦 Redux Overview

- **Slices:**
  - `authSlice` → stores user + token
  - `tasksSlice` → manages tasks by day (`taskLists`)
  - `taskTempSlice` → temporary file/image storage before saving

- **Persisted Keys:**  
  Defined in `src/constants/constants.js`
  ```js
  STORAGE_KEYS = {
    AUTH: "auth",
    TASKS: "tasks",
    TASK_TEMP: "taskTemp"
  }
  ```

---

## 👤 User Roles

Handled in `USER_ROLES` constant:
- `basic`: Free user
- `premium`: Paid features
- `admin`: Future use

Use to conditionally show premium features.

---

## 🖼️ UI Components

- `TaskModal`: Show and delete tasks for a day
- `WeekCarusel`: Horizontal scroll for week selection
- `ImageSelector` / `FilePicker`: Attachments and images
- `DatePicker`, `TimePicker`: Set timing for task

---

## 🧠 Future Features

- Premium access control
- Export to PDF or calendar
- AI-based reminders
- User analytics dashboard

---

## 🔐 Backend (server folder)

Located in `/server`, following MVC:
- `routes/`, `controllers/`, `models/`
- MongoDB with Mongoose
- User login, file upload, holiday API

---

## 🚀 Running the Project

### Frontend (Expo):
```bash
cd ai-sidekick-clean
npm install
npm start
```

### Backend (Node.js):
```bash
cd server
npm install
node index.js
```

---

© 2025 by Nikita Servaisky
