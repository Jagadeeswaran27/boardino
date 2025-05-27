# Boardino

Boardino is a web application built with [Next.js](https://nextjs.org), designed to provide a modern, scalable, and maintainable platform for collaborative boards.

---

## Domain

Boardino is a collaborative board platform, enabling users to create, manage, and interact with boards for project management, brainstorming, or task tracking.

---

## Tech Stack

- **Frontend:** [Next.js](https://nextjs.org) (React, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **State Management:** React Context
- **Backend:** Next.js API routes
- **Database:** Postgres Sql
- **ORM:** Prisma
- **Authentication:** Next Auth - Oauth and Credentials
- **Deployment:** [Vercel](https://vercel.com)

---

## Database

- **Type:** Postgres Sql
- **Schema:** Boards, Users, Tasks, Columns (Refer schema.prisma file)
- **ORM/ODM:** Postgres

---

## Coding Standards

- **Language:** TypeScript (strict mode enabled)
- **Linting:** [ESLint](https://eslint.org/) with Airbnb or Next.js recommended rules
- **Formatting:** [Prettier](https://prettier.io/) for consistent code style
- **Folder Structure:** Feature-based or domain-driven structure
- **Naming Conventions:** camelCase for variables/functions/utility files, PascalCase for components.
- **Commits:** Conventional Commits (e.g., `feat:`, `fix:`, `chore:`)

---

## Approach

1. **Component-Driven Development:** Build reusable, isolated UI components.
2. **API-First:** Define API contracts before implementing features.
3. **Type Safety:** Use TypeScript throughout the stack for reliability.
4. **Responsive Design:** Mobile-first, accessible UI.
5. **Continuous Integration:** Automated linting, testing, and deployment.

---

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
