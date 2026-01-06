# Architecture & Technical Design

## System Overview

This document describes the technical architecture, design decisions, and system structure of the Task Management Application.

---

## 🏗️ Architecture Pattern

### Component-Based Architecture

The application follows a modern React component-based architecture with clear separation of concerns:

```
App (Root)
├── TooltipProvider (UI Provider)
├── QueryClientProvider (State Management)
├── BrowserRouter (Routing)
└── Routes
    ├── Route: "/" → Index (Main Page)
    │   ├── Header
    │   ├── StatsCard (x4)
    │   ├── CreateTaskForm
    │   ├── StatusFilter
    │   └── TaskCard (x n)
    └── Route: "*" → NotFound (404 Page)
```

### Layered Architecture

```
┌─────────────────────────────────────────┐
│         UI Components Layer             │
│  TaskCard, CreateTaskForm, StatusFilter │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│      State Management Layer             │
│   React Hooks, useState, useEffect      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       Persistence Layer                 │
│   localStorage API                      │
└─────────────────────────────────────────┘
```

---

## 📦 Component Structure

### Core Components

#### 1. **Index.tsx** (Main Page)

**Responsibility**: Application dashboard and state management

- Manages global task state
- Handles task CRUD operations
- Implements filtering logic
- Renders statistics dashboard
- Orchestrates child components

**State**:

```typescript
tasks: Task[]          // List of all tasks
filterStatus: Status   // Current filter
```

**Key Methods**:

- `handleAddTask()` - Create new task
- `handleStatusChange()` - Update task status
- `handleDeleteTask()` - Remove task
- `setFilterStatus()` - Change filter

---

#### 2. **TaskCard.tsx** (Task Display)

**Responsibility**: Display individual task with actions

- Render task information
- Provide status dropdown
- Handle deletion
- Apply color coding

**Props**:

```typescript
interface TaskCardProps {
  task: Task;
  onStatusChange: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}
```

**Features**:

- Hover effects for better UX
- Color-coded status badges
- Formatted date display
- Responsive layout

---

#### 3. **CreateTaskForm.tsx** (Task Creation)

**Responsibility**: Expandable form for task creation

- Input fields for title and description
- Form state management
- Validation logic
- Event handlers

**Props**:

```typescript
interface CreateTaskFormProps {
  onSubmit: (title: string, description: string) => void;
}
```

**Features**:

- Auto-expands on focus
- Collapsible interface
- Cancel/Submit buttons
- Input validation

---

#### 4. **StatusFilter.tsx** (Filtering)

**Responsibility**: Filter UI for task status

- Render filter buttons
- Handle filter changes
- Visual feedback

**Props**:

```typescript
interface StatusFilterProps {
  activeFilter: "all" | "pending" | "in-progress" | "completed";
  onChange: (filter: FilterType) => void;
}
```

**Features**:

- 4 filter options
- Active state styling
- Responsive button layout

---

## 📊 Data Model

### Task Interface

```typescript
interface Task {
  id: string; // Unique identifier
  title: string; // Task title (required)
  description: string; // Task description (optional)
  status: "pending" | "in-progress" | "completed";
  createdAt: Date; // Creation timestamp
}
```

### Status Flow

```
User Creates Task
      ↓
Task Status: "pending" (default)
      ↓
User Updates Status
      ↓
Status: "in-progress" → "completed"
      ↓
User Deletes Task
      ↓
Task Removed from List
```

---

## 🔄 State Management Strategy

### Current Implementation: React Hooks

**Why React Hooks?**

- ✅ Simple for small to medium applications
- ✅ No external dependencies needed
- ✅ Easy to understand and maintain
- ✅ Perfect for component-level state

**Implementation**:

```typescript
// State declaration
const [tasks, setTasks] = useState<Task[]>([]);
const [filterStatus, setFilterStatus] = useState("all");

// Side effects (persistence)
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);
```

### Future Enhancement: TanStack Query (React Query)

For backend integration:

```typescript
const tasksQuery = useQuery({
  queryKey: ["tasks"],
  queryFn: async () => fetch("/api/tasks").then((r) => r.json()),
});
```

---

## 💾 Data Persistence Layer

### LocalStorage Strategy

**Why localStorage?**

- ✅ No backend required for MVP
- ✅ Zero latency access
- ✅ Automatic persistence
- ✅ Works offline

**Implementation**:

```typescript
// Save to localStorage
localStorage.setItem("tasks", JSON.stringify(tasks));

// Load from localStorage
const saved = localStorage.getItem("tasks");
const tasks = saved ? JSON.parse(saved) : [];
```

**Limitations**:

- ⚠️ Limited storage (~5-10MB per domain)
- ⚠️ Not sharable between devices
- ⚠️ Cleared when cache is cleared

### Future Enhancement: Backend Database

```
Frontend (React) ← HTTP/API → Backend (Express) ← ORM/Query → Database (PostgreSQL)
```

---

## 🎨 Styling Architecture

### Tailwind CSS Strategy

**Design System**:

- Utility-first CSS framework
- Pre-configured color palette
- Responsive design tokens
- Built-in dark mode support

**Custom Configuration** (`tailwind.config.ts`):

```typescript
theme: {
  colors: {
    status: {
      pending: "hsl(var(--status-pending))",
      "in-progress": "hsl(var(--status-in-progress))",
      completed: "hsl(var(--status-completed))"
    }
  }
}
```

**CSS Variables** (`global.css`):

```css
:root {
  --status-pending: 39 92% 50%; /* Amber */
  --status-in-progress: 217 91% 60%; /* Blue */
  --status-completed: 142 71% 45%; /* Green */
}
```

### Color Coding System

| Status      | Color | Hex     | HSL         | Use Case        |
| ----------- | ----- | ------- | ----------- | --------------- |
| Pending     | Amber | #FBBF24 | 39 92% 50%  | Action required |
| In Progress | Blue  | #3B82F6 | 217 91% 60% | Active work     |
| Completed   | Green | #22C55E | 142 71% 45% | Done            |

---

## 📱 Responsive Design Architecture

### Breakpoint Strategy

```typescript
// Tailwind breakpoints (default + custom)
sm: 640px   // Tablets
md: 768px   // Small desktops
lg: 1024px  // Desktops
xl: 1280px  // Large desktops
2xl: 1536px // Extra large

// Mobile-first approach
Default Styles (Mobile) → sm: → md: → lg: → xl:
```

### Responsive Components

**Stats Grid**:

```jsx
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
  {/* 2 columns mobile, 4 columns desktop */}
</div>
```

**Header**:

```jsx
<h1 className="text-2xl sm:text-3xl font-bold">
  {/* Responsive font sizes */}
</h1>
```

---

## 🔐 Type Safety

### TypeScript Configuration

**tsconfig.json**:

```json
{
  "compilerOptions": {
    "strict": true, // All strict type checking
    "target": "ES2020", // Modern JavaScript
    "module": "ESNext", // ES modules
    "jsx": "react-jsx", // React 18+ JSX
    "moduleResolution": "bundler"
  }
}
```

**Benefits**:

- ✅ Compile-time error detection
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring

### Type Definitions

```typescript
// Exported types for component contracts
export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}
```

---

## 🔌 API Integration Design

### Current State: Client-Side Only

```
React App ← localStorage → Browser Storage
```

### Future State: Full-Stack Application

```
React App ← HTTP/REST API → Express Server ← ORM → PostgreSQL Database
```

### Planned API Endpoints

```
GET    /api/tasks                    # Get all tasks
GET    /api/tasks?status=pending    # Filter by status
POST   /api/tasks                    # Create task
PATCH  /api/tasks/:id                # Update task
DELETE /api/tasks/:id                # Delete task
```

### API Request/Response Types

```typescript
// Create Task Request
interface CreateTaskRequest {
  title: string;
  description?: string;
}

// Task Response
interface TaskResponse {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

// Error Response
interface ErrorResponse {
  error: string;
  message: string;
  code: string;
}
```

---

## 🚀 Build & Deployment Architecture

### Build Process

```
Source Code (TypeScript/JSX)
      ↓
Vite Build Tool
      ↓
├── Client Build (dist/spa/)
│   ├── HTML bundling
│   ├── TypeScript compilation
│   ├── CSS minification
│   └── Code splitting
│
└── Server Build (dist/server/)
    ├── Node.js entry point
    └── Express configuration
```

### Build Configuration

**vite.config.ts** (Client):

```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    target: "ES2020",
    sourcemap: false,
    minify: "terser",
  },
});
```

**vite.config.server.ts** (Server):

```typescript
export default defineConfig({
  ssr: {
    target: "node",
    external: [],
  },
});
```

---

## 📈 Performance Considerations

### Code Splitting

```typescript
// Future: Lazy-loaded routes
const TaskDetails = lazy(() => import("./pages/TaskDetails"))

<Routes>
  <Route path="/tasks/:id" element={<Suspense><TaskDetails /></Suspense>} />
</Routes>
```

### Bundle Analysis

- Client bundle: ~576 KB (minified), ~178 KB (gzipped)
- JavaScript: Heavy due to React ecosystem
- CSS: ~62.5 KB (minified), ~11.2 KB (gzipped)

### Optimization Strategies

1. **Tree Shaking**: Vite/Rollup removes unused code
2. **CSS Purging**: Tailwind removes unused classes
3. **Image Optimization**: Lucide SVG icons (minimal)
4. **Lazy Loading**: Ready for code splitting

---

## 🧪 Testing Architecture

### Test Structure

```
client/
├── lib/
│   ├── utils.ts
│   └── utils.spec.ts
└── components/
    ├── TaskCard.tsx
    └── TaskCard.spec.ts (planned)
```

### Testing Strategy

**Unit Tests** (Vitest):

- Utility function tests
- Component logic tests
- Type checking tests

**Example Test**:

```typescript
describe("TaskCard", () => {
  it("should render task information", () => {
    const task = { id: "1", title: "Test", ... }
    render(<TaskCard task={task} ... />)
    expect(screen.getByText("Test")).toBeInTheDocument()
  })
})
```

---

## 🔒 Security Architecture

### XSS Prevention

```typescript
// React automatically escapes content
<h3>{task.title}</h3>  // Safe, no innerHTML
```

### Input Validation

```typescript
// Form validation before state update
if (title.trim()) {
  handleAddTask(title, description);
}
```

### CORS Configuration (Future)

```typescript
// Express CORS setup for API
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
```

### Environment Variables

```bash
# .env.local (not committed)
VITE_API_URL=http://localhost:3000/api
```

---

## 📚 Dependency Management

### Core Dependencies

```json
{
  "react": "^18.3.1", // UI library
  "react-dom": "^18.3.1", // DOM rendering
  "react-router-dom": "^6.30.1", // Routing
  "typescript": "^5.9.2", // Type checking
  "tailwindcss": "^3.4.17", // Styling
  "lucide-react": "^0.539.0" // Icons
}
```

### Development Dependencies

```json
{
  "vite": "^7.1.2", // Build tool
  "@vitejs/plugin-react-swc": "^4.0.0", // SWC transpiler
  "vitest": "^3.2.4", // Testing
  "prettier": "^3.6.2" // Formatting
}
```

### Dependency Security

- ✅ Regular dependency updates
- ✅ Vulnerability scanning with npm audit
- ✅ Lock file (pnpm-lock.yaml) for reproducibility

---

## 🎯 Design Patterns Used

### 1. Component Pattern

```typescript
// Presentational (dumb) component
const TaskCard = ({ task, onStatusChange, onDelete }) => { ... }

// Container (smart) component
const Index = () => {
  const [tasks, setTasks] = useState()
  return <TaskCard task={task} onStatusChange={...} />
}
```

### 2. Hook Pattern

```typescript
// Custom hook (future)
const useTasks = () => {
  const [tasks, setTasks] = useState();
  return { tasks, addTask, deleteTask };
};
```

### 3. Props Drilling (Current)

```
Index (parent) → StatusFilter → (child renders)
```

### 4. Factory Pattern (Future)

```typescript
// Task creation factory
const createTask = (title, description) => ({
  id: generateId(),
  title,
  description,
  status: "pending",
  createdAt: new Date(),
});
```

---

## 🔮 Future Architecture Roadmap

### Phase 1: Current State ✅

- Client-side React application
- localStorage persistence
- Basic UI components

### Phase 2: Backend Integration 🚧

```
Frontend (React 18)
     ↕ (REST API/GraphQL)
Backend (Express.js)
     ↕ (ORM: Prisma/Sequelize)
Database (PostgreSQL)
```

### Phase 3: Real-time & Advanced Features

```
Frontend (React + WebSocket)
     ↕ (HTTP + WebSocket)
Backend (Express + Socket.io)
     ↕ (Event Bus/Queue)
Database + Cache (Redis)
```

### Phase 4: Scalable Architecture

```
Frontend (React SPA + PWA)
     ↕
Load Balancer
     ↕
├─ API Server (Node cluster)
├─ WebSocket Server
└─ Background Jobs
     ↕
├─ PostgreSQL (Primary)
├─ Redis (Cache/Sessions)
└─ Message Queue (Bull/RabbitMQ)
```

---

## 📊 Architecture Decision Records (ADR)

### ADR-001: Use React Hooks for State Management

**Decision**: Implement state with React Hooks instead of Redux/Context
**Rationale**: Simple application scope, no need for complex state management
**Status**: ✅ Accepted
**Alternatives**: Redux, Context API, Zustand

### ADR-002: Use localStorage for Persistence

**Decision**: Use browser localStorage for data persistence
**Rationale**: MVP phase, no backend infrastructure yet
**Status**: ✅ Accepted
**Transition**: Will migrate to backend API in Phase 2

### ADR-003: Use Tailwind CSS for Styling

**Decision**: Utility-first CSS with Tailwind
**Rationale**: Rapid development, consistent design system, good DX
**Status**: ✅ Accepted
**Alternatives**: CSS Modules, Styled-components, CSS-in-JS

### ADR-004: Use TypeScript for Type Safety

**Decision**: Full TypeScript implementation with strict mode
**Rationale**: Better DX, fewer runtime errors, self-documenting
**Status**: ✅ Accepted
**Coverage**: 100% of application code

---

## 🎓 Learning Resources

For understanding this architecture:

- [React Architecture Best Practices](https://react.dev/learn/thinking-in-react)
- [Clean Code in TypeScript](https://github.com/labs42io/clean-code-typescript)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [System Design Primer](https://github.com/donnemartin/system-design-primer)

---

**Last Updated**: January 2026  
**Architecture Version**: 1.0  
**Status**: Production Ready ✅
