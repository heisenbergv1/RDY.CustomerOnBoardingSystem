# API – Backend (.NET)

## Overview

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


## Requirements Coverage Checklist

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

### Technical Requirements

#### ✅ Architecture

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

#### ✅ Backend Requirements

| Requirement | Status |
|------------|--------|
| Latest .NET | ✅ |
| Clean layering | ✅ |
| Dependency Injection | ✅ |
| Input validation | ✅ (DataAnnotations / FluentValidation) |
| At least one service class | ✅ (Repository / Application Service / Handler) |

---

#### ✅ Database Requirements

- Uses **SQLite**
- File-based
- Auto-created on first run via `Database.Migrate()`
- No external setup required

Database file location:
```

/src/Api/app.db

````

---

#### ✅ Integration Testing

| Section | Description | Details |
|----------|------------|----------|
| **Integration Testing** | Test approach | API-level integration tests validating the system end-to-end via real HTTP calls against the test server. |
| | Coverage | Customer creation; Validation rules; Retrieve customer by ID; Retrieve all customers; Database persistence behavior |
| **Frameworks Used** | Testing framework | xUnit |
| | API bootstrapping | `Microsoft.AspNetCore.Mvc.Testing` – Bootstraps the API for integration testing |
| | Serialization | Newtonsoft.Json or System.Text.Json – Used for response deserialization |

---

#### Notable Packages & Libraries Used

| Category   | Package / Library | Purpose / Notes |
|------------|------------------|----------------|
| **Core** | MediatR | Implements CQRS pattern |
| | Microsoft.EntityFrameworkCore | ORM for data access |
| | Microsoft.EntityFrameworkCore.Sqlite | SQLite database provider |
| | Microsoft.EntityFrameworkCore.InMemory | Used for testing database scenarios |
| **Logging** | Serilog | Structured logging |
| | Serilog – Rolling File Sink | Logs persisted to rotating files |
| | Serilog – Request Logging Middleware | Logs HTTP request/response pipeline |
| **Validation** | System.ComponentModel.DataAnnotations | Model validation attributes |
| | FluentValidation (Optional) | Alternative validation framework if implemented |
| **Testing** | xUnit | Unit & integration testing framework |
| | Microsoft.AspNetCore.Mvc.Testing | Bootstraps API for integration tests |
---

## Setup & Installation

### Prerequisites

Install:

- .NET SDK (Latest LTS)

Verify:

```bash
dotnet --version
node -v
````

Clone the project:
```
git clone https://github.com/heisenbergv1/RDY.CustomerOnBoardingSystem.git
```

---

### How to Run Backend

#### 1. Navigate to API Project

```bash
cd src/Api
```

#### 2. Restore Dependencies

```bash
dotnet restore
```

#### 3. Run Database Migration (Auto-Handled)

Database auto-creates on first run:

```csharp
dbContext.Database.Migrate();
```

---

#### 4. Run Backend

```bash
dotnet run
```

Check the listening port:

```
Now listening on: http://localhost:5064
```

API will be available at:

```
http://localhost:5064
```

Swagger:

```
http://localhost:5064/swagger
```

---

### 🧪 Run Tests

Navigate to test project:

```bash
cd src/
dotnet test
```

---

#### Database

SQLite database file:

```
app.db
```

Automatically created on first run.

No external database required.

---

#### 🔐 Logging

Configured with:

* Request logging middleware
* Global exception middleware
* Rolling file logs

Logs stored in:

```
/Logs
```

---

#### 🏗 Project Structure

```
/src
 ├── Api
 │    ├── Controllers
 │    ├── Middleware
 │    └── DTOs
 │
 ├── Application
 │    ├── Commands
 │    ├── Queries
 │    ├── Interfaces
 │
 ├── Domain
 │    └── Entities
 │
 ├── Infrastructure
 │    ├── Persistence
 │    ├── Repositories
 │    └── Extensions
 │
 └── Tests
      ├── Unit
      └── Integration
```

---

## ✅ Summary

This backend satisfies:

| Principle / Feature | Description |
|--------------------|------------|
| Clean Architecture | Clear separation of concerns between layers |
| Proper Layer Separation | Domain, Application, Infrastructure, and API layers isolated |
| CQRS with MediatR | Command/Query separation implemented using MediatR |
| SQLite Persistence | Data stored using SQLite provider |
| Dependency Injection | Services and dependencies registered via DI container |
| Logging | Structured logging integrated into the application |
| Validation | Input and model validation implemented |
| Integration Testing | Automated API integration tests included |
---

If extended further, this project can scale by adding:

* Authentication / JWT
* Role-based authorization
* Event-driven architecture
* Redis caching
* Docker support
* CI/CD pipeline


# Frontend – React Application

## Overview

This project implements the **Customer Onboarding UI** for the Customer Registration & Onboarding System.

The frontend is responsible for:

* Displaying a customer registration form
* Capturing customer details
* Capturing a canvas-based signature
* Submitting data to the backend via REST API
* Displaying confirmation after successful registration
* Viewing customer records

It is built using **React + Next.js** with functional components and clean separation of concerns.

---

## ✅ Requirements Coverage (Frontend)

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

### Technical Requirements

#### Architecture

Frontend follows a structured layout:

```
/frontend
  /src
    /app
    /components
    /data
    /types
    /lib
```

### Implementation Requirements

#### ✅ Functional Components

All UI elements are implemented using:

* React functional components
* Hooks (`useState`, `useEffect`, `useCallback`)
* No class components


#### ✅ Signature Capture

Signature is implemented using:

* HTML `<canvas>`
* Mouse/touch event listeners
* Export to Base64 string
* Sent to backend as image string

Storage format:

* Base64 image string included in request payload


#### ✅ API Communication

Frontend communicates with backend via:

* REST endpoints:

  * `POST /api/customers`
  * `GET /api/customers`
  * `GET /api/customers/{id}`

Implementation uses:

* `fetch`
* Error handling for failed requests


#### ✅ Validation

Basic validation implemented:

* Required fields enforced
* Email format validation
* Signature required
* Error messages displayed inline

#### ✅ Routing

Routing handled using:

* Next.js App Router (`next/navigation`)
* Page-based routing for:

  * Register page
  * Customer list page
  * Customer detail page

---

### 📦 Notable Packages / Libraries

#### Core

| Package      | Purpose             |
| ------------ | ------------------- |
| `react`      | UI library          |
| `next`       | Routing + framework |
| `typescript` | Type safety         |


---

#### Testing

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

### Prerequisites

* Node.js ≥ 18
* npm or yarn

Clone the project:
```
git clone https://github.com/heisenbergv1/RDY.CustomerOnBoardingSystem.git
```

### Environment Setup

#### Copy Environment File

Before running the frontend, create your environment file:

```bash
cp .env.example .env
```

On Windows (Command Prompt):

```bash
copy .env.example .env
```

---

#### Set API URL

Open `.env` and set:

```env
NEXT_PUBLIC_API_URL=http://localhost:5064/
```
---

### Install Dependencies

```bash
cd frontend
npm install
```

or

```bash
yarn install
```

---

### ▶️ Running the Frontend

#### Development Mode

```bash
npm run dev
```

Runs on:

```
http://localhost:3000
```

---

#### Production Build

```bash
npm run build
npm start
```

---

#### Run Unit Tests

```bash
npm test
```

or

```bash
npm run test -- --watch
```

---

## 🧪 Verify Requirements Are Satisfied

After running the app, confirm:

### ✅ Form loads correctly

* All required fields visible
* Signature canvas renders

### ✅ Validation works

* Error messages appear for missing fields
* Invalid email blocked

### ✅ Submission works

* Data sent to backend
* Success confirmation shown

### ✅ Table works

* Customers displayed
* "View" navigates to detail page

### ✅ Tests Pass

* Jest tests pass
* Coverage includes key components

---

