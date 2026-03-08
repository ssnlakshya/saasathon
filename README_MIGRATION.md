# SaaSathon v1 - React Migration

The frontend has been migrated to **React + Vite** for better dynamism and stability. 

## Key Improvements
1. **React Framework**: Migrated from static HTML to a modern React architecture using Vite.
2. **"Load Balancing" & Stability**:
   - **Backend Rate Limiting**: Added `express-rate-limit` to prevent API abuse and handle bursts of concurrent users.
   - **Graceful Shutdown**: Updated server to handle `SIGTERM` for zero-downtime restarts.
   - **Concurrent Protection**: Client-side state management prevents double-payment attempts.
   - **Robust Logging**: Winston logger implemented for trackable errors during high traffic.
3. **Animations**: Integrated `framer-motion` for premium, smooth transitions.
4. **Razorpay Integration**: Fully ported to React with proper state handling and verification.

## How to Run
1. **Install Dependencies**:
   ```bash
   # Root (Backend)
   npm install
   # Frontend
   cd frontend && npm install
   ```
2. **Environment Setup**:
   - Update `.env` in the root with your Razorpay keys.
   - Update `frontend/.env` with your Razorpay public key (`VITE_RAZORPAY_KEY`).
3. **Start Development**:
   ```bash
   # From root
   npm run dev
   ```
   This will start both the backend (Port 5000) and frontend (Port 5173).

## Directory Structure
- `frontend/`: React application (Vite).
- `server.js`: Express backend with updated security and stability features.
- `logs/`: Server logs for monitoring high-concurrency traffic.
