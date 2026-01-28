# Fricamore Frontend

Next.js storefront powered by Supabase (no custom backend server).

## Prerequisites

- Node.js
- Supabase project (URL + anon key)

## Environment variables

Create `.env.local` in `medusa-app/`:

```shell
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
REVALIDATE_SECRET=<your-revalidate-secret>
```

## Install dependencies

```shell
npm install
```

## Start developing

```shell
npm run dev
```

Your site runs at http://localhost:8000

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
