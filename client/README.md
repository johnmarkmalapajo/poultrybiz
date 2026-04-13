# 🐔 PoultryBriz Backend

Node.js + Express + MongoDB REST API for Egginear Agri-Poultry Solutions.

---

## 📁 Folder Structure

```
poultrybriz-backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Signup, Login, GetMe
│   ├── dashboardController.js # All dashboard stats
│   ├── eggController.js       # Egg harvest CRUD
│   ├── flockController.js     # Flock CRUD
│   ├── transactionController.js # Sales & expenses CRUD
│   ├── feedController.js      # Feed stock CRUD
│   └── taskController.js      # To-do tasks CRUD
├── middleware/
│   └── auth.js                # JWT authentication
├── models/
│   ├── User.js
│   ├── EggHarvest.js
│   ├── Flock.js
│   ├── Transaction.js
│   ├── FeedStock.js
│   └── Task.js
├── routes/
│   ├── auth.js
│   ├── dashboard.js
│   ├── eggs.js
│   ├── flock.js
│   ├── transactions.js
│   ├── feed.js
│   └── tasks.js
├── api.js                     # ← Copy this to your React client/src/services/
├── .env.example
├── server.js
└── package.json
```

---

## ⚙️ Setup

### 1. Install dependencies
```bash
cd poultrybriz-backend
npm install
```

### 2. Create your `.env` file
```bash
cp .env.example .env
```
Then edit `.env` and fill in your MongoDB URI:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/poultrybriz
JWT_SECRET=any_long_random_string_here
JWT_EXPIRE=7d
```

### 3. Get a free MongoDB URI
- Go to https://www.mongodb.com/atlas
- Create a free cluster
- Click **Connect** → **Drivers** → copy the URI
- Replace `<username>` and `<password>` with your credentials

### 4. Run the server
```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

Server runs at: `http://localhost:5000`

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET  | `/api/auth/me` | Get current user (requires token) |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get all dashboard stats |

### Egg Harvests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/eggs` | Get all egg records |
| POST | `/api/eggs` | Add egg harvest |
| PUT | `/api/eggs/:id` | Update record |
| DELETE | `/api/eggs/:id` | Delete record |

### Flock
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/flock` | Get all flocks |
| POST | `/api/flock` | Add flock |
| PUT | `/api/flock/:id` | Update flock |
| DELETE | `/api/flock/:id` | Delete flock |

### Transactions (Sales & Expenses)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/transactions` | Get all transactions |
| POST | `/api/transactions` | Add transaction |
| PUT | `/api/transactions/:id` | Update |
| DELETE | `/api/transactions/:id` | Delete |

### Feed Stock
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feed` | Get all feed stocks |
| POST | `/api/feed` | Add feed stock |
| PUT | `/api/feed/:id` | Update |
| DELETE | `/api/feed/:id` | Delete |

### Tasks (To Do)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Add task |
| PUT | `/api/tasks/:id` | Update/complete task |
| DELETE | `/api/tasks/:id` | Delete task |

---

## 🔌 Connect to React Frontend

1. Copy `api.js` into your React project at `client/src/services/api.js`
2. Import in your components:

```jsx
import { authAPI, dashboardAPI, taskAPI } from '../services/api';

// Signup example
const handleSignup = async (formData) => {
  const res = await authAPI.signup(formData);
  if (res.success) {
    localStorage.setItem('token', res.token);
  }
};

// Load dashboard
const loadDashboard = async () => {
  const res = await dashboardAPI.get();
  if (res.success) {
    setDashboardData(res.data);
  }
};
```

---

## 🚨 Alerts Logic
- **High Mortality** → triggered when average mortality rate > 5%
- **Low Feed** → triggered when any feed stock falls below its threshold (default: 50kg)