#### 1. **Basic Setup Check**
Your friends should run these commands **in order**:

```bash
# 1. Clone the repo
git clone https://github.com/SushilChandaragi/Gradify.git
cd Gradify

# 2. Install dependencies
npm install

# 3. Copy environment file
cp .env.example .env
# On Windows: copy .env.example .env

# 4. Start development server
npm run dev
```

#### 2. **Common Issues & Solutions**

**Issue A: "npm not found"**
- Install Node.js from https://nodejs.org
- Restart terminal after installation
- Run `node --version` to verify

**Issue B: "npm install" fails**
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Issue C: "npm run dev" fails**
```bash
# Check if port 5173 is busy
npx kill-port 5173
npm run dev
```

**Issue D: Can't access localhost:5173**
- Make sure `npm run dev` is running and shows:
  ```
  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ```
- Try these URLs:
  - http://localhost:5173
  - http://127.0.0.1:5173
  - http://0.0.0.0:5173

#### 3. **Network Access (If friends are remote)**

If your friends are not on the same network, they need to:

**Option A: Run on their own machines**
- Clone the repo on their own computers
- Follow setup steps above

**Option B: Expose your dev server (NOT recommended for production)**
```bash
npm run dev -- --host
# This will show Network URL they can access
```


#### 5. **Quick Test Commands**

```bash
# Check if Node.js is installed
node --version
npm --version

# Check if project files downloaded correctly
ls -la  # (or 'dir' on Windows)

# Check if dependencies installed
ls node_modules  # Should show many folders

# Test if Vite works
npx vite --version
```

### 📞 **Share This Checklist**

Send your friends this file and ask them to go through each step. Most issues are:
- ❌ Node.js not installed
- ❌ Wrong directory
- ❌ npm install failed
- ❌ Port already in use
- ❌ Firewall blocking localhost

### 🆘 **Still Not Working?**

Ask friends to run and share output:
```bash
npm run dev --verbose
```

This will show detailed error messages we can debug! 🔧
