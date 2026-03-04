# 1-Hour Development Assessment

## Objective

Build a **Customer Registration & Onboarding System** using C#/.NET for the backend and React for the frontend.

The goal of this assessment is to evaluate:

* Clean architecture and separation of concerns
* Practical full-stack development skills
* Ability to design maintainable, testable code
* Basic UI/UX implementation
* Unit testing discipline

---

## Time Limit

**60 Minutes**

Focus on correctness, structure, and clarity rather than feature completeness.

---

## Functional Requirements

### 1. Customer Registration API

Create a backend service that allows:

* Create a new customer
* Retrieve customer by ID
* List all customers

Each customer must include:

* First Name
* Last Name
* Email
* Phone Number
* Date Created

---

### 2. Customer Onboarding Form (Frontend)

Create a React UI that:

* Displays a customer onboarding form
* Allows users to input customer details
* Includes a **signature capture feature** (canvas-based signature pad)
* Submits data to the backend API
* Shows a confirmation after successful registration

The signature may be stored as:

* Base64 image string
* Or saved to file storage

---

## Technical Requirements

### Architecture (Mandatory)

The solution **must clearly separate**:

| Layer          | Responsibility              |
| -------------- | --------------------------- |
| Presentation   | React UI                    |
| Application    | Business logic / validation |
| Infrastructure | Database access             |
| API            | Controllers / endpoints     |

Use a structure similar to:

```
/src
  /Api
  /Application
  /Domain
  /Infrastructure
  /Tests
/frontend
```

---

### Backend Requirements

* Use .NET (latest stable version available)
* Implement clean layering (no database calls inside controllers)
* Use dependency injection
* Include input validation
* Implement at least one service class

---

### Database Requirements

Use a **portable, file-based database** such as:

* SQLite (preferred)

The database must:

* Be created automatically on first run
* Require no external setup
* Be included with the project

---

### Unit Testing

Provide unit tests for:

* Customer creation logic
* Validation rules

Use any standard testing framework (e.g., xUnit, NUnit).

Mock infrastructure dependencies where appropriate.

---

### Frontend Requirements

* React-based form
* Use functional components
* Basic validation
* Signature pad implemented using HTML canvas
* Call backend via REST API

No styling framework required — simple layout is fine.

---

## Non-Functional Requirements

* The solution must build and run without errors.
* Must be self-contained.
* No external services required.
* Include clear run instructions.
* Code must be readable and maintainable.

---

## Expected Deliverables

Submit a zipped project containing:

* Backend solution
* Frontend app
* SQLite database (if pre-generated)
* Unit tests
* README with execution steps

---

## Run Instructions (Candidate Must Provide)

Example format:

```
# Run Backend
cd src/Api
dotnet run

# Run Frontend
cd frontend
npm install
npm start
```

---

## Evaluation Criteria

| Area          | What We Look For                   |
| ------------- | ---------------------------------- |
| Architecture  | Proper separation of concerns      |
| Code Quality  | Clean, readable, maintainable code |
| Functionality | Works end-to-end                   |
| Testing       | Meaningful unit tests              |
| Design        | Logical structure                  |
| Practicality  | Would this scale in real work?     |

---

## Bonus (Optional if Time Allows)

* Add logging
* Add async/await usage
* Add simple error handling middleware
* Add DTO mapping

---

## Notes to Candidate

You are not expected to finish everything perfectly in 1 hour.
We are evaluating **how you think, structure, and implement**, not just completion.

Prioritize:

1. Architecture
2. Working API
3. Basic UI
4. One or two meaningful tests

---

Good luck!
