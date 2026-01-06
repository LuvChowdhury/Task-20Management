# Contributing Guidelines

Thank you for your interest in reviewing and contributing to the Task Management Application! This document outlines the process for contributing to this project.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

---

## 🤝 Code of Conduct

### Our Commitment
We are committed to providing a welcoming and inspiring community for all. Please read and adhere to our Code of Conduct:

- **Be Respectful**: Treat all community members with respect
- **Be Collaborative**: Work together constructively
- **Be Inclusive**: Welcome diverse perspectives and backgrounds
- **Be Professional**: Maintain professional communication at all times

### Unacceptable Behavior
- Harassment or discrimination of any kind
- Personal attacks or insults
- Unwelcome sexual advances
- Publishing private information without consent
- Other conduct which could reasonably be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- pnpm 10.14.0 or higher (or npm)
- Git
- A GitHub account

### Fork & Clone

1. **Fork the repository** on GitHub
   ```bash
   Click the "Fork" button on https://github.com/LuvChowdhury/Task-20Management
   ```

2. **Clone your fork locally**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Task-20Management.git
   cd Task-20Management
   ```

3. **Add upstream remote** (to sync with main repo)
   ```bash
   git remote add upstream https://github.com/LuvChowdhury/Task-20Management.git
   ```

4. **Install dependencies**
   ```bash
   pnpm install
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```

---

## 💻 Development Workflow

### Creating a Feature Branch

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch with descriptive name
git checkout -b feature/add-task-categories
# or for bug fixes
git checkout -b fix/status-badge-colors
```

### Branch Naming Convention

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions
- `chore/description` - Build/dependency updates

### Development Best Practices

1. **Keep branches focused** - One feature or fix per branch
2. **Keep branches updated** - Regularly sync with upstream
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
3. **Make small commits** - Logical, atomic commits
4. **Test frequently** - Run tests before pushing
5. **Write clear messages** - Descriptive commit messages

---

## 📝 Coding Standards

### TypeScript

**Type Safety**
```typescript
// ✅ Good: Explicit types
interface TaskProps {
  task: Task
  onStatusChange: (id: string, status: TaskStatus) => void
}

// ❌ Avoid: Using any type
const handleChange = (data: any) => { ... }
```

**Interface Naming**
```typescript
// ✅ Good: Descriptive names
interface TaskCardProps { ... }
interface CreateTaskRequest { ... }

// ❌ Avoid: Generic names
interface Props { ... }
interface Data { ... }
```

### React Components

**Functional Components**
```typescript
// ✅ Good: Functional component with proper typing
export function TaskCard({ task, onStatusChange, onDelete }: TaskCardProps) {
  return <div>{task.title}</div>
}

// ❌ Avoid: Class components or untyped
const TaskCard = (props) => { ... }
```

**Hook Usage**
```typescript
// ✅ Good: Use hooks at top level
export function Component() {
  const [state, setState] = useState<Type>()
  
  useEffect(() => {
    // Effect logic
  }, [dependencies])
}

// ❌ Avoid: Conditional hook calls
if (condition) {
  const [state, setState] = useState()
}
```

### Naming Conventions

**Components** (PascalCase)
```typescript
export function TaskCard() { }
export function CreateTaskForm() { }
export function StatusFilter() { }
```

**Functions** (camelCase)
```typescript
const handleStatusChange = () => { }
const formatDate = (date: Date) => { }
const filterTasks = (tasks: Task[]) => { }
```

**Constants** (UPPER_SNAKE_CASE)
```typescript
const MAX_TASK_TITLE_LENGTH = 200
const DEFAULT_FILTER_STATUS = "all"
const API_TIMEOUT_MS = 5000
```

**CSS Classes** (kebab-case with semantic names)
```jsx
<div className="task-card-header">
<button className="status-badge status-completed">
```

### Tailwind CSS

**Use Utility Classes**
```jsx
// ✅ Good: Tailwind utilities
<div className="bg-white rounded-lg border border-gray-200 p-5">

// ❌ Avoid: Inline styles
<div style={{ backgroundColor: 'white', padding: '20px' }}>
```

**Responsive Design**
```jsx
// ✅ Good: Mobile-first responsive
<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

// ❌ Avoid: Non-responsive or desktop-first
<div className="grid grid-cols-4">
```

**Color Variables**
```jsx
// ✅ Good: Use CSS variables
<div className="bg-status-pending">

// ❌ Avoid: Hardcoded colors
<div className="bg-amber-100">
```

### File Organization

```
client/
├── components/
│   ├── feature/           # Feature components
│   │   ├── TaskCard.tsx
│   │   └── CreateTaskForm.tsx
│   └── ui/               # UI primitives
│       ├── button.tsx
│       └── input.tsx
├── pages/                # Page components
│   ├── Index.tsx
│   └── NotFound.tsx
├── hooks/                # Custom hooks
│   └── use-mobile.tsx
├── lib/                  # Utilities
│   └── utils.ts
├── App.tsx              # Root component
└── global.css           # Global styles
```

---

## 📌 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build, dependency, or tooling changes

### Examples

**Feature Commit**
```
feat(tasks): add task categories

Add support for categorizing tasks. Users can now assign tasks to custom categories
and filter by category. This includes:
- New Category model
- Category selection in create task form
- Category filter in task list
```

**Bug Fix Commit**
```
fix(status-badge): correct color for pending status

The pending status badge was using the wrong color code. Updated from amber-200 to
amber-100 to match design specifications.

Fixes #123
```

**Documentation Commit**
```
docs: update API endpoints documentation

Added missing endpoint documentation for PATCH /api/tasks/:id with request/response
examples.
```

### Commit Best Practices

1. **Atomic commits** - One logical change per commit
2. **Clear messages** - Describe what and why, not just what
3. **Reference issues** - Use `Fixes #123` or `Relates to #456`
4. **No mixing** - Don't mix formatting and feature changes

---

## 🔄 Pull Request Process

### Before Creating a PR

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   pnpm test
   ```

3. **Build the project**
   ```bash
   pnpm build
   ```

4. **Format code**
   ```bash
   pnpm format.fix
   ```

5. **Check for linting errors**
   ```bash
   pnpm lint  # if available
   ```

### Creating a PR

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open PR on GitHub**
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Related Issues
Fixes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Testing
Describe how you tested the changes:
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Unit tests added
- [ ] Manual testing completed

## Screenshots (if applicable)
Add before/after screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No breaking changes introduced
- [ ] Tests pass locally
- [ ] No console warnings or errors
```

### PR Review Expectations

**Reviewers will check for:**
- ✅ Code quality and adherence to standards
- ✅ TypeScript type safety
- ✅ Responsive design implementation
- ✅ Performance implications
- ✅ Security concerns
- ✅ Test coverage
- ✅ Documentation completeness

**Response time:**
- Minor issues: 24 hours
- Major issues: 48 hours
- Approval: 2-5 business days

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run tests with coverage
pnpm test --coverage
```

### Writing Tests

**Test File Naming**
```
Component.tsx → Component.spec.ts
utils.ts → utils.spec.ts
```

**Test Structure**
```typescript
describe("TaskCard", () => {
  it("should render task title", () => {
    const task = { id: "1", title: "Test Task", ... }
    render(<TaskCard task={task} ... />)
    expect(screen.getByText("Test Task")).toBeInTheDocument()
  })

  it("should call onStatusChange when status is updated", () => {
    const onStatusChange = vi.fn()
    const task = { id: "1", status: "pending", ... }
    render(<TaskCard task={task} onStatusChange={onStatusChange} ... />)
    
    // Simulate status change
    expect(onStatusChange).toHaveBeenCalledWith("1", "in-progress")
  })
})
```

### Test Coverage Goals

- **Minimum**: 80% code coverage
- **Target**: 90% code coverage
- **Critical paths**: 100% coverage

---

## 📚 Documentation

### Code Comments

**When to add comments:**
```typescript
// ✅ Good: Complex logic explanation
const filterTasks = (tasks: Task[], status: TaskStatus) => {
  // Filter tasks by exact status match and exclude deleted tasks
  // marked with soft-delete flag
  return tasks.filter(t => t.status === status && !t.isDeleted)
}

// ❌ Avoid: Obvious comments
const getName = () => {
  // Get the name
  return user.name
}
```

**Comment Format**
```typescript
// Single line comments for brief explanations

/**
 * Multi-line comments for functions/complex logic
 * @param tasks - Array of tasks to filter
 * @param status - Status to filter by
 * @returns Filtered task array
 */
```

### Documentation Files

When contributing features, update relevant docs:

1. **README.md** - Feature overview
2. **ARCHITECTURE.md** - Technical details
3. **API.md** (if applicable) - API endpoints
4. **CONTRIBUTING.md** - If updating process

### JSDoc Comments

```typescript
/**
 * Updates the status of a task
 * @param taskId - The unique identifier of the task
 * @param newStatus - The new status to assign
 * @returns Promise resolving to updated task
 * @throws {Error} If task not found
 */
export async function updateTaskStatus(
  taskId: string,
  newStatus: TaskStatus
): Promise<Task> {
  // Implementation
}
```

---

## 🎯 Feature Implementation Checklist

Before submitting a PR for a new feature, ensure:

- [ ] **Code Quality**
  - [ ] TypeScript strictly typed
  - [ ] No `any` types without justification
  - [ ] Follows naming conventions
  - [ ] Functions are pure when possible
  - [ ] Proper error handling

- [ ] **Testing**
  - [ ] Unit tests written
  - [ ] Edge cases covered
  - [ ] All tests passing
  - [ ] Coverage acceptable (80%+)

- [ ] **Documentation**
  - [ ] JSDoc comments added
  - [ ] README updated if user-facing
  - [ ] ARCHITECTURE.md updated if architectural changes
  - [ ] Code comments for complex logic

- [ ] **Performance**
  - [ ] No unnecessary re-renders
  - [ ] Bundle size impact assessed
  - [ ] Performance bottlenecks identified
  - [ ] Optimization opportunities noted

- [ ] **Accessibility**
  - [ ] ARIA labels added
  - [ ] Keyboard navigation tested
  - [ ] Color contrast verified
  - [ ] Screen reader compatible

- [ ] **Browser Compatibility**
  - [ ] Works in modern browsers
  - [ ] Responsive on mobile
  - [ ] No console errors
  - [ ] Cross-browser tested

- [ ] **Security**
  - [ ] No XSS vulnerabilities
  - [ ] Input validation implemented
  - [ ] No sensitive data exposed
  - [ ] Dependencies checked for vulnerabilities

---

## 🐛 Bug Report Process

### Reporting a Bug

1. **Check if already reported** - Search existing issues
2. **Create detailed report** - Use bug template
3. **Include reproduction steps** - Make it easy to reproduce
4. **Add environment info** - OS, browser, Node version

### Bug Report Template

```markdown
## Description
Brief description of the bug

## Reproduction Steps
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: macOS/Windows/Linux
- Browser: Chrome/Firefox/Safari
- Node version: 18.x
- pnpm version: 10.x

## Screenshots
Attach screenshots if applicable

## Error Messages
Include any console errors
```

---

## 📞 Questions & Support

### Getting Help

1. **Documentation** - Check README.md and ARCHITECTURE.md
2. **Issues** - Search existing GitHub issues
3. **Discussions** - Use GitHub Discussions for questions
4. **Email** - Contact project maintainer

### Response Expectations

- **Bug reports**: 24-48 hours
- **Feature requests**: 1-2 weeks
- **Questions**: Best effort basis

---

## 🎓 Resources

### Learning Resources

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools

- **Code Editor**: VS Code recommended
- **Extensions**: ESLint, Prettier, TypeScript
- **Git GUI**: GitKraken, GitHub Desktop, or CLI

---

## 📋 Review Checklist for Maintainers

When reviewing PRs:

- [ ] Code adheres to standards
- [ ] TypeScript compilation clean
- [ ] Tests pass
- [ ] No performance regressions
- [ ] Documentation updated
- [ ] Commits are atomic and well-described
- [ ] No breaking changes
- [ ] Accessibility maintained
- [ ] Security reviewed

---

## 🙏 Thank You

Thank you for contributing to the Task Management Application! Your efforts help make this project better for everyone.

If you have any questions about the contribution process, please don't hesitate to reach out.

**Happy coding!** 🚀

---

**Last Updated**: January 2026  
**Contributing Version**: 1.0
