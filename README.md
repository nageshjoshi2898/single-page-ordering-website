# Single Page Ordering Website

## Objectives

Develop a single-page ordering website where users can:

- ✅ List items on the UI using data from `data.json`, including:
  - **Image Src**
  - **Title**
  - **Variant SKU**
  - **Variant Price**
- ✅ Implement a search bar to search by **Variant SKU** or **Title**
- ✅ Allow users to **add items to the cart**
- ✅ Display the **cart with selected items**
- ✅ Provide an option to **remove items from the cart**

---

## Tech Stack

- **Frontend:** Next.js  
- **Backend:** Node.js (Express)  
- **Database:** MongoDB (NoSQL)  
- **Testing (Bonus):** Jest  
- **Hosting:** Vercel, Netlify, or AWS

---

## Requirements

### 1️⃣ Frontend
- Display item list from `data.json`
- Enable search by SKU/Name
- Allow add/remove items to/from cart

### 2️⃣ Backend
- API for:
  - Fetching items
  - Adding/removing items
  - Searching items  
- Tech: Express + MongoDB

### 3️⃣ Chat Interface
- Query the database via chat input
  - Examples:
    - `"Find SKU 12345"`
    - `"Show electronics under $50"`

### 4️⃣ Bonus
- Unit tests using **Jest**

### 5️⃣ Hosting & Submission
- Deploy the project
- Share:
  - GitHub repository link
  - Hosted link (via email)
- Include a **README.md** with setup instructions
