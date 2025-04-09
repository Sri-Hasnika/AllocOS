# OS Simulator Project Analysis

## Project Overview
This appears to be an Operating System Resource Allocation Simulator with:
- Next.js frontend
- Custom simulation components
- Resource management visualization
- User authentication
- Performance tracking

## Core Functionality
1. **Simulation Engine**:
   - Process lifecycle simulation (components/process/)
   - Resource allocation visualization (components/resource/)
   - CPU scheduling algorithms (components/scheduler/)

2. **User Interface**:
   - Dashboard with simulation controls (components/dashboard/)
   - Real-time visualization of resource allocation
   - Leaderboard tracking (app/leaderboard/)

3. **Authentication System**:
   - Login flow (app/login/)
   - Protected routes

4. **Backend Services**:
   - Simulation state management (server/routes/simulation.js)
   - Resource allocation logic (server/routes/allocation.js)
   - User authentication (server/routes/auth.js)

## Key Components
- `components/simulation-controls.tsx`: Main simulation controller
- `components/resource/resource-allocation-graph.tsx`: D3.js visualization
- `app/page.tsx`: Primary simulation interface
- `server/routes/`: Backend API endpoints
- `lib/store.ts`: Central state management

## User Flow
1. User authenticates via login page
2. Lands on main simulation dashboard
3. Configures simulation parameters
4. Starts/stops simulation
5. Views real-time resource allocation
6. Can view performance metrics/leaderboard

## Technical Stack
- Frontend: Next.js, React, TypeScript, TailwindCSS
- Visualization: D3.js, Framer Motion
- State: Custom store solution
- Backend: Node.js API routes
