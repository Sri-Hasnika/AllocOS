**AllocOS – Interactive Learning Platform**  
*Visualize. Simulate. Master Operating Systems.*  

---

## 🚀 Project Overview  
AllocOS is an immersive, web-based platform designed to demystify core Operating Systems concepts through real‑time simulations and interactive visualizations. Whether you’re a student grappling with CPU scheduling or an enthusiast curious about deadlocks, AllocOS brings these abstractions to life—making learning both engaging and intuitive.

---

## ✨ Key Features  

- **Dynamic CPU Scheduling Simulator**  
  - Compare algorithms (FCFS, SJF, Round Robin, Priority) side‑by‑side  
  - Visual Gantt charts with live time‑step controls  
  - Performance metrics: average waiting time, turnaround time, throughput  

- **Process Lifecycle & Resource Allocation**  
  - Step through process states: New → Ready → Running → Waiting → Terminated  
  - Allocate and deallocate resources (memory blocks, I/O devices)  
  - Visual queues and resource tables updating in real time  

- **Deadlock Detection & Recovery**  
  - Simulate resource‑request graphs  
  - Automatic detection using Banker's algorithm  
  - Interactive “what‑if” scenarios: force deadlock, then apply recovery strategies  

- **Gamified Learning Elements**  
  - Achievement badges for mastering each algorithm  
  - Timed challenges: optimize scheduling under constraints  
  - Leaderboard to foster friendly competition  

- **Algorithm Comparison Dashboard**  
  - Side‑by‑side bar charts and line graphs (via D3.js)  
  - Export performance reports as CSV  

---

## 🛠️ Tech Stack  

- **Framework & Language**: Next.js · TypeScript  
- **Styling**: Tailwind CSS  
- **Data Visualization**: D3.js  
- **State Management**: React Context & Hooks  
- **Build & Deployment**: Vercel / Netlify  

---

## 📥 Installation & Usage  

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Sri-Hasnika/AllocOS.git
   cd AllocOS
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn
   ```

3. **Run in development mode**  
   ```bash
   npm run dev
   # or
   yarn dev
   ```  
   Visit `http://localhost:3000` in your browser.

4. **Build for production**  
   ```bash
   npm run build && npm run start
   # or
   yarn build && yarn start
   ```

---

## 🎓 How to Learn with AllocOS  

1. **Select a Module**  
   - CPU Scheduling, Process Lifecycle, Resource Allocation, or Deadlock Detection.  
2. **Configure Parameters**  
   - Input process burst times, priorities, resource requests, time quantum, etc.  
3. **Run Simulation**  
   - Watch animations, inspect data tables, and analyze charts in real time.  
4. **Challenge Yourself**  
   - Attempt timed quizzes and compare your results on the leaderboard.  

---

## 🤝 Contributing  

Contributions are welcome! To get started:  
1. Fork the repository.  
2. Create a feature branch: `git checkout -b feature/YourFeature`.  
3. Commit your changes: `git commit -m "Add YourFeature"`.  
4. Push to your branch: `git push origin feature/YourFeature`.  
5. Open a Pull Request and describe your enhancements.

Please ensure code style consistency and add relevant tests or storybook examples where applicable.

---

## 📝 License  

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments  

- Inspired by classic OS textbooks and interactive tutorials.  
- Built with love by **Sri Hasnika Venigalla** as part of an educational initiative to make system-level concepts accessible to all.  

---

*Dive into OS internals like never before—happy learning!*
