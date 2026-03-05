# 🚀 API – Backend (.NET)

## 🔎 Overview

This backend implements the **Customer Registration & Onboarding API** using **.NET (Clean Architecture)** with:

- REST API for customer management
- SQLite as a portable database
- MediatR for CQRS pattern
- Dependency Injection
- Validation
- Logging
- Integration testing

The backend follows the required layered structure:

```

/src
/Api
/Application
/Domain
/Infrastructure
/Tests

```

---

## 📋 Requirements Coverage Checklist

### Functional Requirements

| Requirement | Status | Implementation |
|------------|--------|---------------|
| Create Customer | ✅ | POST `/api/Customer` via Command + Handler |
| Get Customer by ID | ✅ | GET `/api/Customer/{id}` via Query + Handler |
| List All Customers | ✅ | GET `/api/Customer` via Query + Handler |
| Store First Name | ✅ | Stored in DB |
| Store Last Name | ✅ | Stored in DB |
| Store Email | ✅ | Stored in DB |
| Store Phone Number | ✅ | Stored in DB |
| Store Signature | ✅ | Stored in DB |
| Store Date Created | ✅ | Automatically set in domain/entity |

---

## 🏗 Technical Requirements

### ⚙ Architecture

| Layer | Status | Notes |
|-------|--------|-------|
| Presentation | ✅ | API Controllers |
| Application | ✅ | Commands, Queries, Handlers, Validation |
| Infrastructure | ✅ | EF Core + SQLite Repository |
| Domain | ✅ | Entities + Business Models |

Separation enforced:
- Controllers do NOT access database directly.
- Controllers call MediatR.
- Application layer depends on abstractions.
- Infrastructure implements repositories.

---

### ⚙ Backend Requirements

| Requirement | Status |
|------------|--------|
| Latest .NET | ✅ |
| Clean layering | ✅ |
| Dependency Injection | ✅ |
| Input validation | ✅ (DataAnnotations / FluentValidation) |
| At least one service class | ✅ (Repository / Application Service / Handler) |

---

## 🗄 Database

- Uses **SQLite**
- File-based
- Auto-created on first run via `Database.Migrate()`
- No external setup required

Database file location:

```
/src/Api/app.db
````

---

## 🧪 Integration Testing

| Section | Description | Details |
|----------|------------|----------|
| Integration Testing | Test approach | API-level integration tests validating system behavior via real HTTP calls |
| | Coverage | Customer creation; Validation; Get by ID; Get all; Persistence |
| Frameworks Used | Testing framework | xUnit |
| | API bootstrapping | `Microsoft.AspNetCore.Mvc.Testing` |
| | Serialization | System.Text.Json / Newtonsoft.Json |

---

## 📦 Notable Packages & Libraries Used

| Category | Package | Purpose |
|----------|----------|----------|
| Core | MediatR | CQRS pattern |
| | Microsoft.EntityFrameworkCore | ORM |
| | Microsoft.EntityFrameworkCore.Sqlite | SQLite provider |
| Logging | Serilog | Structured logging |
| | Rolling File Sink | Log rotation |
| | Request Logging Middleware | HTTP pipeline logging |
| Validation | DataAnnotations | Model validation |
| | FluentValidation (Optional) | Alternative validation |
| Testing | xUnit | Testing framework |
| | Microsoft.AspNetCore.Mvc.Testing | API test bootstrap |

---

## ⚡ Setup & Installation

### Prerequisites

Install:

- .NET SDK (Latest LTS)

Verify:

```bash
dotnet --version
node -v
````

Clone:

```bash
git clone https://github.com/heisenbergv1/RDY.CustomerOnBoardingSystem.git
```

---

## ▶ How to Run Backend

### 1. Navigate to API

```bash
cd src/Api
```

### 2. Restore Dependencies

```bash
dotnet restore
```

### 3. Run Database Migration

Database auto-creates on first run:

```csharp
dbContext.Database.Migrate();
```

---

### 4. Run Application

```bash
dotnet run
```

Running:

```
Now listening on: http://localhost:5064
```

API:

```
http://localhost:5064
```

Swagger:

```
http://localhost:5064/swagger
```

---

## 🧪 Run Tests

```bash
cd src/
dotnet test
```

---

## 🗄 Database

```
app.db
```

Automatically created on first run.

No external database required.

---

## 🔐 Logging

Configured with:

* Request logging middleware
* Global exception middleware
* Rolling file logs

Logs stored at:

```
/Logs
```

---

## 🏗 Project Structure

```
/src
 ├── 🖥 Api
 │    ├── Controllers
 │    ├── Middleware
 │    └── DTOs
 │
 ├── 🧠 Application
 │    ├── Commands
 │    ├── Queries
 │    ├── Interfaces
 │
 ├── 🏛 Domain
 │    └── Entities
 │
 ├── 💾 Infrastructure
 │    ├── Persistence
 │    ├── Repositories
 │    └── Extensions
 │
 └── 🧪 Tests
      ├── Unit
      └── Integration
```

---

## ✅ Summary

| Principle / Feature  | Description                                       |
| -------------------- | ------------------------------------------------- |
| Clean Architecture   | Clear separation of concerns                      |
| Layer Separation     | Domain, Application, Infrastructure, API isolated |
| CQRS                 | Implemented via MediatR                           |
| SQLite Persistence   | File-based database                               |
| Dependency Injection | Managed via container                             |
| Logging              | Structured logging integrated                     |
| Validation           | Input validation enforced                         |
| Integration Testing  | Automated API tests                               |

---

If extended further, this project can scale by adding:

* Authentication / JWT
* Role-based authorization
* Event-driven architecture
* Redis caching
* Docker support
* CI/CD pipeline

---

# 💻 Frontend – React Application

## 🌐 Overview

This project implements the **Customer Onboarding UI** for the Customer Registration & Onboarding System.

The frontend is responsible for:

* Displaying a customer registration form
* Capturing customer details
* Capturing a canvas-based signature
* Submitting data to the backend via REST API
* Displaying confirmation after successful registration
* Viewing customer records

Built with **React + Next.js** using functional components and clean architecture principles.

---

## 📋 Requirements Coverage (Frontend)

### Functional Requirements

| Requirement                                            | Status | Notes                                  |
| ------------------------------------------------------ | ------ | -------------------------------------- |
| Customer onboarding form                               | ✅      | Form built using functional components |
| Input fields (first, last, email, phone, date created) | ✅      | Validated and submitted to backend     |
| Signature capture                                      | ✅      | Canvas-based signature pad implemented |
| Submit data to backend                                 | ✅      | REST API integration using fetch/axios |
| Confirmation after registration                        | ✅      | Success feedback shown after submit    |
| List & view customers                                  | ✅      | Table + navigation to detail page      |

---

## 🏗 Technical Architecture

Frontend follows a structured layout:

```

/frontend
  /src
  /app
  /components
  /services
  /data
  /types
  /lib

```

---

## ⚙ Implementation Details

### 🧩 Functional Components

All UI elements are implemented using:

* React functional components
* Hooks (`useState`, `useEffect`, `useCallback`)
* No class components

---

### ✍ Signature Capture

Signature implemented with:

* HTML `<canvas>`
* Mouse & touch event listeners
* Export to Base64 string
* Sent to backend as image string

Storage format:

* Base64 string included in request payload

---

### 🔌 API Communication

Frontend communicates with backend via:

* REST endpoints:
  * `POST /api/customers`
  * `GET /api/customers`
  * `GET /api/customers/{id}`

Implementation uses:

* `fetch`
* Error handling for failed requests

---

### ✅ Validation

Validation rules:

* Required fields enforced
* Email format validation
* Signature required
* Inline error messages displayed

---

### 🧭 Routing

Routing handled using:

* Next.js App Router (`next/navigation`)
* Page-based routing:

  * Register page
  * Customer list page
  * Customer detail page

---

## 📦 Notable Packages / Libraries

### Core

| Package      | Purpose             |
| ------------ | ------------------- |
| `react`      | UI library          |
| `next`       | Routing + framework |
| `typescript` | Type safety         |

---

### 🧪 Testing

| Package                     | Purpose           |
| --------------------------- | ----------------- |
| `jest`                      | Test runner       |
| `@testing-library/react`    | Component testing |
| `@testing-library/jest-dom` | DOM matchers      |

Tests cover:

* Form validation
* Signature behavior
* API submission logic
* Table rendering
* Navigation behavior

---

## 🚀 Installation

### 📌 Prerequisites

* Node.js ≥ 18
* npm or yarn

Clone:

```
git clone https://github.com/heisenbergv1/RDY.CustomerOnBoardingSystem.git
````

---

### ⚙ Environment Setup

#### Copy Environment File

Create environment file:

```bash
cp .env.example .env
````

Windows:

```bash
copy .env.example .env
```

---

#### Configure API URL

Set in `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5064/
```

---

### 📦 Install Dependencies

```bash
cd frontend
npm install
```

or

```bash
yarn install
```

---

## ▶ Running the Frontend

### 🚀 Development Mode

```bash
npm run dev
```

Runs at:

```
http://localhost:3000
```

---

### 🏗 Production Build

```bash
npm run build
npm start
```

---

### 🧪 Run Tests

```bash
npm test
```

or

```bash
npm run test -- --watch
```

---

## 🔎 Verify Requirements

After running:

### ✔ Form Loads

* Fields visible
* Signature canvas renders

### ✔ Validation Works

* Errors shown for invalid input
* Email blocked if invalid

### ✔ Submission Works

* Data sent to backend
* Success message displayed

### ✔ Table Works

* Customers rendered
* View navigates to detail page

### ✔ Tests Pass

* Jest tests succeed
* Coverage includes core components
