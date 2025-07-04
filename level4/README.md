# Level 4 - DevOps Project

This project includes a frontend built with React and Material-UI, along with two backend services that communicate with each other. Below are the steps and updates made to the project.

---

## Frontend Setup

### Install Material-UI
To set up Material-UI for the frontend, run the following commands:

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

### Version Note
Ensure you use the following versions of Material-UI to avoid compatibility issues:
```json
"@mui/icons-material": "^5.15.20",
"@mui/material": "^5.15.20"
```

---

## Backend Updates

### Error Handling
- Added error-handling code to both backend services to improve reliability.

### Backend Communication
- Enabled communication between the two backend services using Axios.
- Install Axios in both backend services:
  ```bash
  npm install axios
  ```

---

## Frontend Updates

### Updated Files
The following files were updated to support the new features:
1. **`frontend/src/components/ProductList.tsx`**
2. **`frontend/src/components/UserList.tsx`**
3. **`frontend/src/App.tsx`**
4. **`frontend/src/services/api.ts`**

---

## build.sh 
a file to compile all the code together so i dont need to manually keep running each command

## Notes
- Ensure all dependencies are installed before running the project.
- Follow the versioning guidelines for Material-UI to avoid issues with newer versions.

---