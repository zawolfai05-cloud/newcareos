# CareOS

CareOS is a clinician-first healthcare operations workspace designed for a hospital or clinic team to manage care workflows from one place: patients, appointments, notes, documents, staff, operations, and reports.

## Current status

The frontend application is running locally and verified at:

- http://localhost:5173

This repository currently focuses on the product-facing clinical workspace and operational management layers, with the frontend workflow experience built as a realistic demo for a healthcare SaaS product.

## What is implemented in the current product

- Role-based clinical dashboard
- Patient directory and encounter flow
- Clinical notes / review workflow
- Appointments and scheduling layout
- Documents / OCR intake-style review flow
- Department overview
- Reports and operational summaries
- Staff management
- Clinic operations board
- File library / admin overview
- Bilingual UI support (Arabic / English)
- Mobile responsive behavior
- Role navigation and protected views

## Product direction

This project is intentionally designed as a clinician-first product, not as a generic chatbot. The primary audience is:

- physician
- nurse
- receptionist
- care operations manager
- hospital director
- admin / staff workflow users

The app keeps the doctor and care team in control of the workflow, with AI as a support layer rather than a replacement for clinical decision making.

## Included scope

The current implementation covers the main operational product layers while intentionally leaving out the heavy AI/backend-only phases such as:

- RAG with sources
- OCR automation production integration
- full AI agent action orchestration
- database-heavy real production workflows

These are marked as future phases and are not part of the active product demo scope.

## Tech stack

- React + TypeScript + Vite
- Lucide icons
- CSS-driven responsive UI
- Demo auth and role-based rendering
- FastAPI backend folder exists for future backend integration

## Project structure

```text
.
├── src/
│   ├── app/
│   ├── api/
│   ├── components/
│   ├── features/
│   ├── App.tsx
│   ├── i18n.ts
│   ├── main.tsx
│   └── styles.css
├── backend/
├── tests/
├── docs/
├── package.json
├── vite.config.ts
├── playwright.config.ts
├── SECURITY.md
├── ARCHITECTURE_ROADMAP.md
├── HANDOFF.md
├── docker-compose.yml
├── LICENSE
├── README.md
└── index.html
```

## Run locally

Frontend:

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Then open:

```text
http://localhost:5173
```

Production build check:

```bash
npm run build
```

## Notes

- The app is designed as a polished demo/prototype for a real healthcare operating system.
- The UI intentionally emphasizes clinical workflow, patient visibility, team operations, and operational monitoring.
- The implementation is product-oriented and suitable for demos and iteration before moving into deeper clinical AI and backend integration work.

## Important status

This repo is best understood as a clinician-first healthcare product prototype and operations interface, not as a completed PHI-ready production system.
