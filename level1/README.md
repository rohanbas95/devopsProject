# DevOps Project

This project is built with TypeScript and includes a frontend application along with two backend APIs.

The frontend just fetches and shows data from the backend 

So manually need to insert data in database 

---

## Getting Started

Follow the steps below to recreate this project from scratch. If you only want to run the project, skip to the [Running the Project](#running-the-project) section.

---

### Backend Services

#### User Service
1. **Create the directory**:
   ```bash
   mkdir user-service
   cd user-service
   ```
2. **Initialize npm**:
   ```bash
   npm init -y
   ```
3. **Create TypeScript configuration**:
   ```bash
   touch tsconfig.json
   ```
   update the `tsconfig.json`
4. **Create the entry file**:
   ```bash
   mkdir -p src && touch src/index.ts
   ```
   update the `index.ts`
5. **Update `package.json`** as needed.

#### Product Service
1. **Create the directory**:
   ```bash
   mkdir product-service
   cd product-service
   ```
2. **Initialize npm**:
   ```bash
   npm init -y
   ```
3. **Create TypeScript configuration**:
   ```bash
   touch tsconfig.json
   ```
   update the `tsconfig.json`
4. **Create the entry file**:
   ```bash
   mkdir -p src && touch src/index.ts
   ```
   update the `index.ts`
5. **Update `package.json`** as needed.

---

### Frontend Application

1. **Create the React app**:
   ```bash
   npx create-react-app frontend --template typescript
   cd frontend
   ```
2. **Install Axios**:
   ```bash
   npm install axios
   ```
3. **Create components**:
   ```bash
   mkdir -p src/components && touch src/components/UserList.tsx
   mkdir -p src/components && touch src/components/ProductList.tsx
   ```
   Add basic template code to the components.
4. **Update `src/App.tsx`** to include the new components.

---

### MongoDB Setup

1. **Install MongoDB via Homebrew**:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   ```
2. **Update your shell profile**:
   ```bash
   vi ~/.bash_profile
   ```
   Add the following line (update the version number as needed):
   ```bash
   export PATH="/opt/homebrew/Cellar/mongodb-community/7.0.11/bin:$PATH"
   ```
   Apply the changes:
   ```bash
   source ~/.bash_profile
   ```
3. **Install and start MongoDB Shell**:
   ```bash
   brew install mongosh
   brew services start mongodb/brew/mongodb-community
   ```
4. **Stop MongoDB service when done**:
   ```bash
   brew services stop mongodb/brew/mongodb-community
   ```

---

### MongoDB Usage

#### Open MongoShell
Ensure the MongoDB service is running:
```bash
brew services start mongodb/brew/mongodb-community
mongosh
```

#### Create Databases and Collections
```javascript
// Switch to userdb and create a collection
use userdb
db.createCollection("users")

// Switch to productdb and create a collection
use productdb
db.createCollection("products")
```

#### List Databases and Collections
```javascript
// List all databases
show dbs

// Verify collections in userdb
use userdb
show collections

// Verify collections in productdb
use productdb
show collections
```

#### Insert Data
```javascript
// Insert data into userdb
use userdb
db.users.insertOne({ name: "John Doe" })
db.users.find().pretty()

// Insert data into productdb
use productdb
db.products.insertOne({ name: "Sample Product" })
db.products.find().pretty()
```

---

## Running the Project

1. **Install dependencies and build the project**:
   Run the following commands in the `frontend`, `product-service`, and `user-service` directories:
   ```bash
   npm install
   npm run build
   ```
2. **Start the development server**:
   ```bash
   npm run start
   ```

---

## TODO

- Resolve the following warnings while running `npm run start` for `product-service` and `user-service`:
  ```
  (node:78219) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
  (node:78219) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
  ```
  Refer to [this GitHub issue](https://github.com/rohanbas95/devops/pull/2) for more information.

---

## GitHub Actions

- A GitHub Actions workflow named `pr-build` has been added to test the compilation.
- GitHub permissions have been updated for branches.

---

## Notes

- Ensure MongoDB is properly installed and running before interacting with the database.
- Use the latest versions of dependencies to avoid compatibility issues.
