# Quick Start Guide

Get the Task Management Application up and running in 5 minutes.

---

## ⚡ 5-Minute Setup

### 1. Prerequisites Check
```bash
# Verify Node.js version (need 18+)
node --version

# Verify pnpm is installed
pnpm --version
# If not installed: npm install -g pnpm
```

### 2. Clone & Install
```bash
# Clone the repository
git clone https://github.com/LuvChowdhury/Task-20Management.git
cd Task-20Management

# Install dependencies (< 2 minutes)
pnpm install
```

### 3. Start Development Server
```bash
# Start dev server with hot reload
pnpm dev

# Output will show:
# ➜  Local:   http://localhost:5173/
# ➜  Press q to quit
```

### 4. Open in Browser
Visit `http://localhost:5173` in your browser. You should see the Task Manager application!

---

## 🎯 What You Can Do

### Create a Task
1. Click in "Add a new task..." input
2. Type your task title
3. (Optional) Add description in the expanded form
4. Click "Create Task"

### Manage Tasks
- **Change Status**: Use dropdown on task card
- **Delete Task**: Click trash icon on hover
- **Filter**: Click filter buttons at top

### Data Persistence
Tasks automatically save to your browser's localStorage. Refresh the page - they'll still be there!

---

## 📁 Project Structure (Quick Reference)

```
Task-20Management/
├── client/              # React frontend
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   └── global.css      # Global styles
├── README.md           # Full documentation
├── ARCHITECTURE.md     # Technical design
├── DEPLOYMENT.md       # Deployment guide
└── package.json        # Dependencies
```

---

## 🔧 Common Commands

```bash
# Development
pnpm dev              # Start dev server (HMR enabled)

# Production
pnpm build            # Build for production
pnpm start            # Run production build

# Code Quality
pnpm format.fix       # Format code with Prettier
pnpm typecheck        # Check TypeScript types
pnpm test             # Run tests

# Build Info
pnpm build            # See bundle size

# Dependencies
pnpm install          # Install/reinstall dependencies
pnpm update           # Update packages
pnpm audit            # Security audit
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# If port 5173 is already in use, Vite will use next available port
# Check the terminal output for the actual URL
```

### Module Not Found Error
```bash
# Clear cache and reinstall
rm -rf node_modules
pnpm install
pnpm dev
```

### TypeScript Errors
```bash
# Check for type errors
pnpm typecheck

# Most IDEs show errors in real-time
# Check VS Code problems panel (Ctrl+Shift+M)
```

### Styles Not Updating
```bash
# Clear browser cache
# Ctrl+Shift+R (hard refresh)
# Or disable cache in DevTools
```

---

## 📚 Next Steps

### Learn the Code
1. **Start here**: `client/pages/Index.tsx` - Main page component
2. **Components**: `client/components/` - Individual components
3. **Styling**: `client/global.css` - Global CSS variables
4. **Config**: `tailwind.config.ts` - Design system

### Make Changes
1. Edit a file in `client/` directory
2. Dev server auto-reloads (HMR)
3. See changes instantly in browser

### Understand Architecture
- Read `ARCHITECTURE.md` for technical details
- Check `README.md` for feature overview
- See `CONTRIBUTING.md` for code standards

### Deploy
- See `DEPLOYMENT.md` for platform-specific guides
- Netlify recommended (zero-config)
- Vercel, AWS Amplify also supported

---

## 💡 Tips

### Development Productivity
- **VS Code Extensions**:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Vue Plugin
  - Prettier - Code formatter
  
- **Browser DevTools**:
  - Open DevTools: F12 or Right-click → Inspect
  - React DevTools extension (helpful)
  - Network tab to check requests

### Component Editing
```typescript
// Try editing this file: client/components/TaskCard.tsx
// Change the status badge text and see it update instantly!
```

### Experimenting
- Try adding a new filter status
- Create a new component
- Modify the color scheme
- Change form behavior

---

## 🔍 Quick Feature Review

**Status Filtering** ✅
```
Buttons: All Tasks | Pending | In Progress | Completed
Try clicking each to see filtered results
```

**Create Task Form** ✅
```
1. Click input → form expands
2. Enter title + description
3. Click "Create Task"
4. New task appears at top of list
```

**Task Card** ✅
```
Shows:
- Task title
- Task description
- Status badge (color-coded)
- Creation date
- On hover: Status dropdown + Delete button
```

**Data Persistence** ✅
```
1. Create a task
2. Close browser tab
3. Reopen application
4. Task still there! ✅
```

---

## 📊 Performance Checks

### Bundle Size
```bash
pnpm build

# Output shows:
# dist/spa/index.html         0.41 kB
# dist/spa/assets/index-*.css 62.51 kB (gzipped: 11.20 kB)
# dist/spa/assets/index-*.js  576.08 kB (gzipped: 178.21 kB)
```

### Check Dev Server Performance
Open browser DevTools:
1. Network tab - Check load times
2. Performance tab - Monitor runtime performance
3. Coverage tab - Unused CSS/JS analysis

---

## 🚀 Next Level: Backend Integration

Once comfortable with frontend, explore backend:

1. **Express Server** in `server/` directory
2. **API Endpoints** in `ARCHITECTURE.md`
3. **Database Integration** in `DEPLOYMENT.md`
4. **WebSocket Setup** for real-time updates

---

## 📞 Need Help?

### Documentation
- **Full Guide**: `README.md`
- **Architecture**: `ARCHITECTURE.md`
- **Deployment**: `DEPLOYMENT.md`
- **Contributing**: `CONTRIBUTING.md`

### Common Questions

**Q: Can I customize the colors?**  
A: Yes! Edit CSS variables in `client/global.css` and `tailwind.config.ts`

**Q: How do I add more task statuses?**  
A: Update `TaskStatus` type in `client/components/TaskCard.tsx`

**Q: Can I use this with a backend?**  
A: Yes! See `ARCHITECTURE.md` for API integration guide

**Q: Is this mobile-responsive?**  
A: Yes! Fully responsive from 320px (mobile) to 1920px+ (desktop)

**Q: Can I deploy this?**  
A: Yes! See `DEPLOYMENT.md` for Netlify, Vercel, AWS, etc.

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Dev server starts: `pnpm dev`
- [ ] App loads at http://localhost:5173
- [ ] Can create a task
- [ ] Can update task status
- [ ] Can delete a task
- [ ] Can filter by status
- [ ] Styles look correct
- [ ] Responsive on mobile (DevTools)
- [ ] No console errors (F12 console)

---

## 🎓 Learning Path

### Beginner (First day)
1. Run the app
2. Explore the UI
3. Read `README.md`
4. Try making small style changes

### Intermediate (First week)
1. Understand component structure
2. Read `ARCHITECTURE.md`
3. Make feature changes
4. Learn TypeScript patterns

### Advanced (First month)
1. Add backend API integration
2. Implement new features
3. Deploy to production
4. Optimize performance

---

## 🎉 You're All Set!

Everything is installed and running. Start exploring and building! 

**Happy coding!** 🚀

---

**Quick Links**:
- 📖 [Full README](./README.md)
- 🏗️ [Architecture Guide](./ARCHITECTURE.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 🤝 [Contributing Guide](./CONTRIBUTING.md)
- 📝 [Project Summary](./PROJECT_SUMMARY.md)

---

**Last Updated**: January 2026
