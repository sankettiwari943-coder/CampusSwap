# 📚 CampusSwap

### **Buy Smart. Sell Easy.**

> **AI-powered peer-to-peer textbook marketplace built for students.**

CampusSwap is a campus-focused marketplace that helps students **buy and sell textbooks easily**. Instead of relying only on exact keyword searches or manually written listings, CampusSwap uses AI-powered features to generate better listings and intelligently match buyers with relevant books.

---

## 🚀 Problem

Students often have textbooks they no longer need, while other students are searching for affordable books.

However:

* Finding the right textbook can be difficult.
* Generic marketplaces aren't designed around academic requirements.
* Sellers have to manually create detailed listings.
* Exact keyword searches can miss relevant books.
* Students don't have an easy campus-focused platform for textbook exchange.

### 💡 Our Solution

**CampusSwap connects student buyers and sellers through an intelligent campus marketplace.**

A seller can provide a simple description of their book, and AI can generate a polished listing with relevant tags.

A buyer can describe what they need naturally, and the platform finds relevant books using intelligent matching.

---

# ✨ Key Features

## 🤖 AI Listing Generator

Sellers don't need to write perfect descriptions.

Example input:

> "Good condition maths book, some highlighted pages, no torn pages."

CampusSwap generates:

* Professional product description
* Relevant keyword tags
* Suggested category
* Improved listing title

---

## 🔍 AI Smart Matching

Search naturally instead of worrying about exact keywords.

Example:

> **"I need a first-year CSE maths book."**

CampusSwap can identify relevant listings such as:

* Engineering Mathematics
* Engineering Maths
* Mathematics for Engineers

Results can display an explainable match score such as:

> ✨ **96% Match**

The matching system considers factors such as:

* Keywords
* Related terms
* Subject
* Branch
* Semester
* Description
* Price

---

## 🎓 Campus-Focused Marketplace

Search and filter books according to academic requirements.

### Filters

* Branch
* Semester
* Subject
* Course
* Condition
* Price

This makes CampusSwap more relevant to students than a generic marketplace.

---

## 📚 Marketplace

Browse available textbooks through clean product cards containing:

* Book title
* Author
* Price
* Condition
* Seller
* Branch
* Semester
* Tags
* AI match score

---

## ❤️ Wishlist

Save books you're interested in and come back to them later.

---

## 👤 Student Profiles

Users can view:

* Active listings
* Sold books
* Wishlist
* Seller rating
* Basic academic information

---

## 💬 Contact Seller

Buyers can directly contact sellers about available books.

---

# 🧠 How It Works

### For Buyers

```text
Search for what you need
        ↓
AI understands your query
        ↓
Relevant books are discovered
        ↓
Compare price + condition + seller
        ↓
Contact seller
```

### For Sellers

```text
Enter basic book information
        ↓
Write a simple description
        ↓
✨ Generate with AI
        ↓
AI creates description + tags
        ↓
Review / Edit
        ↓
Publish Listing
```

---

# ⭐ Unique Selling Proposition

> **CampusSwap doesn't just list books — it intelligently connects the right buyer with the right seller.**

### Our key differentiators:

| Feature                   | CampusSwap |
| ------------------------- | ---------- |
| Peer-to-peer marketplace  | ✅          |
| Campus-focused            | ✅          |
| AI-generated descriptions | ✅          |
| AI keyword generation     | ✅          |
| Natural-language search   | ✅          |
| Intelligent matching      | ✅          |
| Explainable match score   | ✅          |
| Academic filters          | ✅          |
| Wishlist                  | ✅          |
| Student profiles          | ✅          |

---

# 🛠️ Technology Stack

The application is built using modern web technologies.

### Frontend

* React
* TypeScript
* Tailwind CSS

### UI

* Modern responsive design
* Reusable components
* Lucide icons
* Interactive cards and modals

### AI Layer

* AI-generated item descriptions
* Keyword/tag generation
* Intelligent relevance matching
* Explainable match scoring

### Application Layer

* Marketplace
* Search
* Filtering
* Wishlist
* Profiles
* Seller listings
* Match scoring

---

# 🏗️ Project Architecture

```text
                    ┌──────────────────────┐
                    │      CampusSwap      │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
             BUYER FLOW                 SELLER FLOW
                 │                           │
          Natural Search              Create Listing
                 │                           │
                 ▼                           ▼
          Smart Matching               AI Generator
                 │                    ┌──────┴──────┐
                 │                    │             │
                 │              Description       Tags
                 │                    │             │
                 └────────────┬───────┴─────────────┘
                              │
                              ▼
                     Campus Marketplace
                              │
                              ▼
                        Contact Seller
```

---

# 🎯 Demo Flow

The complete product can be demonstrated in under two minutes.

### 1. Search

Enter:

> `First-year CSE maths book`

### 2. AI Matching

CampusSwap identifies relevant books.

Example:

> ✨ 96% Match

### 3. View Listing

Show:

* Price
* Condition
* Seller
* Tags
* Match explanation

### 4. Sell a Book

Enter:

> `Good condition maths book, some highlighted pages, no torn pages.`

### 5. Generate With AI

AI creates:

* Professional description
* Tags
* Category

### 6. Publish

The listing becomes available in the marketplace.

---

# 📸 Screenshots

Add screenshots of the application here after deployment.

```text
docs/
├── home.png
├── marketplace.png
├── ai-search.png
├── book-details.png
└── sell-book.png
```

Example:

### Home

![CampusSwap Home](docs/home.png)

### AI Smart Matching

![AI Matching](docs/ai-search.png)

### AI Listing Generator

![AI Listing Generator](docs/sell-book.png)

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/campusswap.git
```

## 2. Navigate to the project

```bash
cd campusswap
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the development server

```bash
npm run dev
```

The application should now be available at the local development URL shown in your terminal.

---

# 🔐 Environment Variables

If you connect a real AI API or backend, create a `.env` file.

Example:

```env
VITE_AI_API_KEY=your_api_key
VITE_API_URL=your_api_url
```

> Never commit API keys or other secrets to GitHub.

For the hackathon prototype, the application can use a local/mock AI service when an external AI API is unavailable.

---

# 📂 Project Structure

```text
campusswap/
│
├── src/
│   ├── components/
│   │   ├── Navbar
│   │   ├── BookCard
│   │   ├── SearchBar
│   │   ├── MatchScore
│   │   ├── AIButton
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── Marketplace
│   │   ├── Sell
│   │   ├── BookDetails
│   │   ├── Profile
│   │   └── Wishlist
│   │
│   ├── data/
│   ├── services/
│   ├── utils/
│   └── App.tsx
│
├── public/
├── docs/
├── package.json
└── README.md
```

---

# 🔮 Future Scope

CampusSwap can evolve beyond textbooks.

### Phase 1 — Campus Textbooks

* AI listings
* Smart matching
* Academic filters
* Student profiles

### Phase 2 — Campus Marketplace

* Notes
* Stationery
* Lab equipment
* Academic supplies

### Phase 3 — Multi-Campus Ecosystem

* Verified student accounts
* Ratings and reviews
* In-app messaging
* Digital payments
* Pickup coordination
* Multi-campus discovery

### Future AI Features

* Personalized recommendations
* Price suggestions
* Demand prediction
* Automated listing optimization
* AI-powered seller insights

---

# 💰 Potential Business Model

Future monetization possibilities include:

* Featured listings
* Small transaction fees
* Premium seller tools
* Campus partnerships
* Sponsored listings

These are proposed future models and are not required for the current prototype.

---

# 🌱 Impact

CampusSwap promotes:

### 💰 Affordability

Students can access used textbooks at lower prices.

### ♻️ Reuse

Unused books can get a second life.

### 🤝 Community

Students can directly help other students access academic resources.

> **One student's unused book can become another student's affordable resource.**

---

# 🏆 Hackathon

### Problem Statement

**PS 4 — Campus Market Matchmaker**

### Team

**The Catalyst**

### Project

**CampusSwap**

### Tagline

**Buy Smart. Sell Easy.**

---

# 👥 Team

## The Catalyst

| Member        | Role                    |
| ------------- | ----------------------- |
| Team Member 1 | Product & Development   |
| Team Member 2 | AI & Logic              |
| Team Member 3 | UI/UX                   |
| Team Member 4 | Backend & Integration   |
| Team Member 5 | Research & Presentation |

Replace the placeholders with the actual team members and roles.

---

# 📜 License

This project is developed as a hackathon prototype.

Add the appropriate license before making the project public for production use.

---

# ❤️ Final Thought

> **The book you need is probably already sitting on someone's shelf.**

### CampusSwap

**Buy Smart. Sell Easy.**

**Built by The Catalyst 🚀**
