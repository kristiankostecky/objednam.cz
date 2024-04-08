This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Supabase

Create supabase account and create a new project. Copy the url and key and create a `.env` file in the root of the project. Replace `PROJECT_REF` with the project reference in [`package.json`](./package.json). Add the following to the file:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Initialize supabase and link the project to the database.

```
npx supabase init
```

```
npx supabase link --project-ref ${project-ref}
```

Generate the types for the supabase client.

```
npm run supabase:types
```

Useful commands:

Reset the database (WARNING: This will delete all data in the database):

```
npm run supabase:db:reset // local db
npm run supabase:db:reset-linked-project // linked db
```

Run local supabase server:

```
npm run supabase:start
```

#### Issues:

Auth "Auth Unable to connect" - authentication in the app is not working
Check the project status and logs. If logs show `running db migrations: error executing migrations/20221208132122_backfill_email_last_sign_in_at.up.sql`. Do as described in the discussion [here](https://github.com/orgs/supabase/discussions/20722).

```
insert into auth.schema_migrations values ('20221208132122');
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
