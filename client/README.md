# Next.js Project (Created with `create-next-app`)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

---

## Prerequisites

- Node.js installed (version 14 or higher recommended)
- Backend server code available and ready to run

---

## Setup and Run the Project

### 1. Start the Backend Server

- Open a terminal/command prompt.
- Navigate to your **backend server directory** (where your backend code lives).
- Run the backend server (this example assumes a Node.js backend):

```bash
npm install
npm run start
```

- Confirm the backend is running by opening your browser and going to:  
  [http://localhost:5000](http://localhost:5000)

---

### 2. Configure Environment Variables for Client (Next.js) App

- In the **client project root directory** (where the Next.js app is):
- Create a file called `.env.local` in `./client` directory.
- Add the following environment variable:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

---

### 3. Run the Next.js Client Application

- In a new terminal window/tab:
- Navigate to the **client project root directory** (where the Next.js app code is located).
- Install dependencies (only needed the first time):

```bash
npm install
```

- Start the development server:

```bash
npm run dev
```

- Open your browser and go to: [http://localhost:3000](http://localhost:3000)


If you have any questions or issues, feel free to open an issue or reach out for help!
