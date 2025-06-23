This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).


## Getting Started
cd FrontEND/tailwind-test-app
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

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Implemented Features In the Project: (With screenshots)
1. User Authentication:
○ Implement secure login functionality using email-password authentication or
third-party tools (e.g., Google OAuth).
![Screenshot 2025-06-23 133040](https://github.com/user-attachments/assets/87a8314e-ea61-4159-bef9-ddc40dd7612b)

![Screenshot 2025-06-23 133540](https://github.com/user-attachments/assets/736480f1-9b45-430f-945e-ca8c4ce90793)

2. News and Blog Data Integration:
○ Fetch data from free third-party news APIs (e.g., News API, Guardian API).
○ Display article/blog  with details like author, date, and type.

![Screenshot 2025-06-23 133753](https://github.com/user-attachments/assets/92be7bfc-6b6d-4408-9473-7f4a1d0e5b0b)

3. Filtering and Search:
○ Implement filters to allow users to search by:
■ Author
■ Date range
■ Type (e.g., news, blogs)
Add a global search bar for quick keyword searches.

![Screenshot 2025-06-23 133859](https://github.com/user-attachments/assets/f6e99ef4-431c-4e78-a412-132c6796e266)

4. Payout Calculator:
○ Allow admins to set a payout per article/blog value.
○ Store payout data in local storage.
○ Automatically calculate total payouts based on the number of articles/blogs
and their rates.
Only admin dashboard (role based access)

![Screenshot 2025-06-23 134320](https://github.com/user-attachments/assets/eb23635f-1d43-4e57-be69-d05343026e51)

![Screenshot 2025-06-23 134349](https://github.com/user-attachments/assets/90ef639a-21e3-4332-ab5f-7fd533de0809)

5. Export Functionality:
○ Enable users to export payout reports as:
■ PDF
■ CSV
■ Google Sheets integration.
![Screenshot 2025-06-23 134550](https://github.com/user-attachments/assets/8e6f3483-75d6-4235-99ce-e19538e9c52f)

![Screenshot 2025-06-23 134642](https://github.com/user-attachments/assets/6bf99497-af9c-41f7-b491-322d863d9314)

![Screenshot 2025-06-23 134716](https://github.com/user-attachments/assets/4e5c23dc-454f-422b-b94b-998ad5170994)

![Screenshot 2025-06-23 135429](https://github.com/user-attachments/assets/9cf7b087-ff64-405a-bc3a-4b57833293e2)

6.Frontend Frameworks & Tools:
○ Use modern frameworks like NextJs for development.
○ Ensure proper state management using tools like Redux, Pinia, or Context
API.

7.Payout Details:
○ A simple table listing authors, articles, and calculated payouts.
○ Inline editing for payout rates.

![Screenshot 2025-06-23 135706](https://github.com/user-attachments/assets/a175418d-c661-4a32-b2e4-7dbb1f10eed7)

8.News Analytics:
○ Graphical charts (e.g., bar, pie, or line charts) showing article trends by author
or type.
![Screenshot 2025-06-23 135901](https://github.com/user-attachments/assets/e6a8fec3-2083-40c2-85ef-299a1a9d039f)

9. Incorporating dark mode for the dashboard.
![Screenshot 2025-06-23 140047](https://github.com/user-attachments/assets/7aee3510-0824-4277-8a88-fa7248b04ea8)




