// import { create } from "zustand"

// // Define types for our store
// type Process = {
//   id: string
//   name: string
//   state: "new" | "ready" | "running" | "waiting" | "terminated"
//   priority: number
//   burstTime: number
//   arrivalTime: number
//   resources: string[]
//   color: string
// }

// type Resource = {
//   id: string
//   name: string
//   total: number
//   available: number
//   allocated: Record<string, number>
// }

// type SchedulingAlgorithm = "FCFS" | "SJF" | "RR"

// type SimulationState = {
//   isRunning: boolean
//   speed: number
//   currentTime: number
//   algorithm: SchedulingAlgorithm
//   timeQuantum: number
//   score: number
//   level: number
//   deadlockDetected: boolean
// }

// type Store = {
//   processes: Process[]
//   resources: Resource[]
//   simulation: SimulationState
//   // Actions
//   addProcess: (process: Omit<Process, "id">) => void
//   removeProcess: (id: string) => void
//   updateProcessState: (id: string, state: Process["state"]) => void
//   allocateResource: (processId: string, resourceId: string, amount: number) => void
//   releaseResource: (processId: string, resourceId: string, amount: number) => void
//   startSimulation: () => void
//   pauseSimulation: () => void
//   resetSimulation: () => void
//   setAlgorithm: (algorithm: SchedulingAlgorithm) => void
//   setTimeQuantum: (quantum: number) => void
//   setSpeed: (speed: number) => void
//   setLevel: (level: number) => void
//   detectDeadlock: () => boolean
// }

// // Process colors
// const processColors = [
//   "#4FACFE", // Blue
//   "#9D50BB", // Purple
//   "#43E97B", // Green
//   "#FF5E62", // Red
//   "#FFDB3A", // Yellow
// ]

// // Create the store
// export const useStore = create<Store>((set, get) => ({
//   processes: [],
//   resources: [],
//   simulation: {
//     isRunning: false,
//     speed: 1,
//     currentTime: 0,
//     algorithm: "FCFS",
//     timeQuantum: 2,
//     score: 0,
//     level: 1,
//     deadlockDetected: false,
//   },

//   // Actions
//   addProcess: (process) => {
//     const id = `p-${Date.now()}`
//     const colorIndex = get().processes.length % processColors.length

//     set((state) => ({
//       processes: [
//         ...state.processes,
//         {
//           ...process,
//           id,
//           color: processColors[colorIndex],
//         },
//       ],
//     }))

//     // API Route: POST /api/processes
//     // Request Body: { name: string, priority: number, burstTime: number, arrivalTime: number }
//     // Response: { id: string, ...processData }
//   },

//   removeProcess: (id) => {
//     set((state) => ({
//       processes: state.processes.filter((p) => p.id !== id),
//     }))

//     // API Route: DELETE /api/processes/:id
//     // Response: { success: boolean }
//   },

//   updateProcessState: (id, newState) => {
//     set((state) => ({
//       processes: state.processes.map((p) => (p.id === id ? { ...p, state:newState } : p)),
//     }))

//     // API Route: PATCH /api/processes/:id
//     // Request Body: { state: string }
//     // Response: { id: string, ...updatedProcess }
//   },

//   allocateResource: (processId, resourceId, amount) => {
//     set((state) => {
//       const updatedResources = state.resources.map((r) => {
//         if (r.id === resourceId && r.available >= amount) {
//           const allocated = r.allocated[processId] || 0
//           return {
//             ...r,
//             available: r.available - amount,
//             allocated: {
//               ...r.allocated,
//               [processId]: allocated + amount,
//             },
//           }
//         }
//         return r
//       })

//       const updatedProcesses = state.processes.map((p) => {
//         if (p.id === processId) {
//           return {
//             ...p,
//             resources: [...p.resources, resourceId],
//           }
//         }
//         return p
//       })

//       return {
//         resources: updatedResources,
//         processes: updatedProcesses,
//       }
//     })

//     // API Route: POST /api/allocation
//     // Request Body: { processId: string, resourceId: string, amount: number }
//     // Response: { success: boolean, process: Process, resource: Resource }
//   },

//   releaseResource: (processId, resourceId, amount) => {
//     set((state) => {
//       const updatedResources = state.resources.map((r) => {
//         if (r.id === resourceId) {
//           const allocated = r.allocated[processId] || 0
//           const amountToRelease = Math.min(allocated, amount)

//           const newAllocated = { ...r.allocated }
//           newAllocated[processId] = allocated - amountToRelease

//           if (newAllocated[processId] === 0) {
//             delete newAllocated[processId]
//           }

//           return {
//             ...r,
//             available: r.available + amountToRelease,
//             allocated: newAllocated,
//           }
//         }
//         return r
//       })

//       const updatedProcesses = state.processes.map((p) => {
//         if (p.id === processId) {
//           return {
//             ...p,
//             resources: p.resources.filter((id) => id !== resourceId),
//           }
//         }
//         return p
//       })

//       return {
//         resources: updatedResources,
//         processes: updatedProcesses,
//       }
//     })

//     // API Route: DELETE /api/allocation
//     // Request Body: { processId: string, resourceId: string, amount: number }
//     // Response: { success: boolean, process: Process, resource: Resource }
//   },

//   startSimulation: () => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         isRunning: true,
//       },
//     }))

//     // API Route: POST /api/simulation/start
//     // Request Body: { levelId: number, algorithm: string, timeQuantum: number }
//     // Response: { sessionId: string, initialState: object }
//   },

//   pauseSimulation: () => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         isRunning: false,
//       },
//     }))

//     // API Route: POST /api/simulation/pause
//     // Request Body: { sessionId: string }
//     // Response: { success: boolean, currentState: object }
//   },

//   resetSimulation: () => {
//     set((state) => ({
//       processes: [],
//       resources: [],
//       simulation: {
//         ...state.simulation,
//         isRunning: false,
//         currentTime: 0,
//         score: 0,
//         deadlockDetected: false,
//       },
//     }))

//     // API Route: POST /api/simulation/reset
//     // Request Body: { sessionId: string }
//     // Response: { success: boolean }
//   },

//   setAlgorithm: (algorithm) => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         algorithm,
//       },
//     }))
//   },

//   setTimeQuantum: (timeQuantum) => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         timeQuantum,
//       },
//     }))
//   },

//   setSpeed: (speed) => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         speed,
//       },
//     }))
//   },

//   setLevel: (level) => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         level,
//       },
//     }))

//     // API Route: GET /api/levels/:id
//     // Response: { id: number, name: string, description: string, initialState: object }
//   },

//   detectDeadlock: () => {
//     // Simple deadlock detection algorithm
//     // In a real implementation, this would be more complex
//     const { processes, resources } = get()

//     // Check if there's a cycle in the resource allocation graph
//     // This is a simplified version
//     const deadlockDetected = processes.some(
//       (p) =>
//         p.state === "waiting" &&
//         p.resources.some((rId) => {
//           const resource = resources.find((r) => r.id === rId)
//           return resource && resource.available === 0
//         }),
//     )

//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         deadlockDetected,
//       },
//     }))

//     // API Route: GET /api/simulation/deadlock
//     // Request Body: { sessionId: string }
//     // Response: { deadlockDetected: boolean, cycle: string[] }

//     return deadlockDetected
//   },
// }))


// import { create } from "zustand"

// // Define types for our store
// type Process = {
//   id: string
//   name: string
//   state: "new" | "ready" | "running" | "waiting" | "terminated"
//   priority: number
//   burstTime: number
//   arrivalTime: number
//   resources: string[]
//   color: string
// }

// type Resource = {
//   id: string
//   name: string
//   total: number
//   available: number
//   allocated: Record<string, number>
// }

// type SchedulingAlgorithm = "FCFS" | "SJF" | "RR"

// type SimulationState = {
//   isRunning: boolean
//   speed: number
//   currentTime: number
//   algorithm: SchedulingAlgorithm
//   timeQuantum: number
//   score: number
//   level: number
//   deadlockDetected: boolean
//   achievements: Achievement[]
//   completedChallenges: string[]
//   experience: number
//   streak: number
//   lastPlayDate: string | null
// }

// type Achievement = {
//   id: string
//   name: string
//   description: string
//   icon: string
//   unlocked: boolean
//   progress: number
//   target: number
// }

// type Challenge = {
//   id: string
//   name: string
//   description: string
//   reward: number
//   completed: boolean
// }

// type Store = {
//   processes: Process[]
//   resources: Resource[]
//   simulation: SimulationState
//   // Actions
//   addProcess: (process: Omit<Process, "id">) => void
//   removeProcess: (id: string) => void
//   updateProcessState: (id: string, state: Process["state"]) => void
//   allocateResource: (processId: string, resourceId: string, amount: number) => void
//   releaseResource: (processId: string, resourceId: string, amount: number) => void
//   startSimulation: () => void
//   pauseSimulation: () => void
//   resetSimulation: () => void
//   setAlgorithm: (algorithm: SchedulingAlgorithm) => void
//   setTimeQuantum: (quantum: number) => void
//   setSpeed: (speed: number) => void
//   setLevel: (level: number) => void
//   detectDeadlock: () => boolean
//   unlockAchievement: (id: string) => void
//   completeChallenge: (id: string) => void
//   addExperience: (amount: number) => void
//   calculateScore: () => number
// }

// // Process colors
// const processColors = [
//   "#4FACFE", // Blue
//   "#9D50BB", // Purple
//   "#43E97B", // Green
//   "#FF5E62", // Red
//   "#FFDB3A", // Yellow
// ]

// // Create the store
// export const useStore = create<Store>((set, get) => ({
//   processes: [],
//   resources: [],
//   simulation: {
//     isRunning: false,
//     speed: 1,
//     currentTime: 0,
//     algorithm: "FCFS",
//     timeQuantum: 2,
//     score: 0,
//     level: 1,
//     deadlockDetected: false,
//     achievements: [
//       {
//         id: "first_process",
//         name: "First Steps",
//         description: "Create your first process",
//         icon: "🚀",
//         unlocked: false,
//         progress: 0,
//         target: 1,
//       },
//       {
//         id: "process_master",
//         name: "Process Master",
//         description: "Create 10 processes",
//         icon: "👨‍💻",
//         unlocked: false,
//         progress: 0,
//         target: 10,
//       },
//       {
//         id: "algorithm_explorer",
//         name: "Algorithm Explorer",
//         description: "Try all scheduling algorithms",
//         icon: "🧪",
//         unlocked: false,
//         progress: 0,
//         target: 3,
//       },
//       {
//         id: "deadlock_resolver",
//         name: "Deadlock Resolver",
//         description: "Detect and resolve a deadlock",
//         icon: "🔓",
//         unlocked: false,
//         progress: 0,
//         target: 1,
//       },
//       {
//         id: "efficiency_expert",
//         name: "Efficiency Expert",
//         description: "Achieve 90% CPU utilization",
//         icon: "⚡",
//         unlocked: false,
//         progress: 0,
//         target: 90,
//       },
//     ],
//     completedChallenges: [],
//     experience: 0,
//     streak: 0,
//     lastPlayDate: null,
//   },

//   // Actions
//   addProcess: (process) => {
//     const id = `p-${Date.now()}`
//     const colorIndex = get().processes.length % processColors.length

//     set((state) => {
//       // Check for achievements
//       const updatedAchievements = state.simulation.achievements.map((achievement) => {
//         if (achievement.id === "first_process" && state.processes.length === 0) {
//           return { ...achievement, progress: 1, unlocked: true }
//         }

//         if (achievement.id === "process_master") {
//           const newProgress = Math.min(achievement.target, achievement.progress + 1)
//           const unlocked = newProgress >= achievement.target
//           return { ...achievement, progress: newProgress, unlocked }
//         }

//         return achievement
//       })

//       // Add experience for creating a process
//       state.addExperience(5)

//       return {
//         processes: [
//           ...state.processes,
//           {
//             ...process,
//             id,
//             color: processColors[colorIndex],
//           },
//         ],
//         simulation: {
//           ...state.simulation,
//           achievements: updatedAchievements,
//           score: state.calculateScore(),
//         },
//       }
//     })
//   },

//   removeProcess: (id) => {
//     set((state) => ({
//       processes: state.processes.filter((p) => p.id !== id),
//     }))

//     // API Route: DELETE /api/processes/:id
//     // Response: { success: boolean }
//   },

//   updateProcessState: (id, newState) => {
//     set((state) => ({
//       processes: state.processes.map((p) => (p.id === id ? { ...p, state:newState } : p)),
//     }))

//     // API Route: PATCH /api/processes/:id
//     // Request Body: { state: string }
//     // Response: { id: string, ...updatedProcess }
//   },

//   allocateResource: (processId, resourceId, amount) => {
//     set((state) => {
//       const updatedResources = state.resources.map((r) => {
//         if (r.id === resourceId && r.available >= amount) {
//           const allocated = r.allocated[processId] || 0
//           return {
//             ...r,
//             available: r.available - amount,
//             allocated: {
//               ...r.allocated,
//               [processId]: allocated + amount,
//             },
//           }
//         }
//         return r
//       })

//       const updatedProcesses = state.processes.map((p) => {
//         if (p.id === processId) {
//           return {
//             ...p,
//             resources: [...p.resources, resourceId],
//           }
//         }
//         return p
//       })

//       return {
//         resources: updatedResources,
//         processes: updatedProcesses,
//       }
//     })

//     // API Route: POST /api/allocation
//     // Request Body: { processId: string, resourceId: string, amount: number }
//     // Response: { success: boolean, process: Process, resource: Resource }
//   },

//   releaseResource: (processId, resourceId, amount) => {
//     set((state) => {
//       const updatedResources = state.resources.map((r) => {
//         if (r.id === resourceId) {
//           const allocated = r.allocated[processId] || 0
//           const amountToRelease = Math.min(allocated, amount)

//           const newAllocated = { ...r.allocated }
//           newAllocated[processId] = allocated - amountToRelease

//           if (newAllocated[processId] === 0) {
//             delete newAllocated[processId]
//           }

//           return {
//             ...r,
//             available: r.available + amountToRelease,
//             allocated: newAllocated,
//           }
//         }
//         return r
//       })

//       const updatedProcesses = state.processes.map((p) => {
//         if (p.id === processId) {
//           return {
//             ...p,
//             resources: p.resources.filter((id) => id !== resourceId),
//           }
//         }
//         return p
//       })

//       return {
//         resources: updatedResources,
//         processes: updatedProcesses,
//       }
//     })

//     // API Route: DELETE /api/allocation
//     // Request Body: { processId: string, resourceId: string, amount: number }
//     // Response: { success: boolean, process: Process, resource: Resource }
//   },

//   startSimulation: () => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         isRunning: true,
//       },
//     }))

//     // API Route: POST /api/simulation/start
//     // Request Body: { levelId: number, algorithm: string, timeQuantum: number }
//     // Response: { sessionId: string, initialState: object }
//   },

//   pauseSimulation: () => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         isRunning: false,
//       },
//     }))

//     // API Route: POST /api/simulation/pause
//     // Request Body: { sessionId: string }
//     // Response: { success: boolean, currentState: object }
//   },

//   resetSimulation: () => {
//     set((state) => ({
//       processes: [],
//       resources: [],
//       simulation: {
//         ...state.simulation,
//         isRunning: false,
//         currentTime: 0,
//         score: 0,
//         deadlockDetected: false,
//       },
//     }))

//     // API Route: POST /api/simulation/reset
//     // Request Body: { sessionId: string }
//     // Response: { success: boolean }
//   },

//   setAlgorithm: (algorithm) => {
//     set((state) => {
//       // Check if this is a new algorithm the user is trying
//       const usedAlgorithms = new Set(
//         state.simulation.completedChallenges
//           .filter((id) => id.startsWith("algorithm_"))
//           .map((id) => id.replace("algorithm_", "")),
//       )

//       if (!usedAlgorithms.has(algorithm)) {
//         // Add to completed challenges
//         state.completeChallenge(`algorithm_${algorithm}`)

//         // Update algorithm explorer achievement
//         const updatedAchievements = state.simulation.achievements.map((achievement) => {
//           if (achievement.id === "algorithm_explorer") {
//             const newProgress = Math.min(achievement.target, usedAlgorithms.size + 1)
//             const unlocked = newProgress >= achievement.target
//             return { ...achievement, progress: newProgress, unlocked }
//           }
//           return achievement
//         })

//         return {
//           simulation: {
//             ...state.simulation,
//             algorithm,
//             achievements: updatedAchievements,
//             score: state.calculateScore(),
//           },
//         }
//       }

//       return {
//         simulation: {
//           ...state.simulation,
//           algorithm,
//         },
//       }
//     })
//   },

//   setTimeQuantum: (timeQuantum) => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         timeQuantum,
//       },
//     }))
//   },

//   setSpeed: (speed) => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         speed,
//       },
//     }))
//   },

//   setLevel: (level) => {
//     set((state) => ({
//       simulation: {
//         ...state.simulation,
//         level,
//       },
//     }))

//     // API Route: GET /api/levels/:id
//     // Response: { id: number, name: string, description: string, initialState: object }
//   },

//   detectDeadlock: () => {
//     // Simple deadlock detection algorithm
//     // In a real implementation, this would be more complex
//     const { processes, resources } = get()

//     // Check if there's a cycle in the resource allocation graph
//     // This is a simplified version
//     const deadlockDetected = processes.some(
//       (p) =>
//         p.state === "waiting" &&
//         p.resources.some((rId) => {
//           const resource = resources.find((r) => r.id === rId)
//           return resource && resource.available === 0
//         }),
//     )

//     set((state) => {
//       // If deadlock was detected but is now resolved, reward the user
//       if (state.simulation.deadlockDetected && !deadlockDetected) {
//         // Update deadlock resolver achievement
//         const updatedAchievements = state.simulation.achievements.map((achievement) => {
//           if (achievement.id === "deadlock_resolver") {
//             return { ...achievement, progress: 1, unlocked: true }
//           }
//           return achievement
//         })

//         // Add experience for resolving deadlock
//         state.addExperience(50)

//         return {
//           simulation: {
//             ...state.simulation,
//             deadlockDetected,
//             achievements: updatedAchievements,
//             score: state.calculateScore(),
//           },
//         }
//       }

//       return {
//         simulation: {
//           ...state.simulation,
//           deadlockDetected,
//           score: state.calculateScore(),
//         },
//       }
//     })

//     return deadlockDetected
//   },

//   unlockAchievement: (id) => {
//     set((state) => {
//       const updatedAchievements = state.simulation.achievements.map((achievement) => {
//         if (achievement.id === id && !achievement.unlocked) {
//           // Add experience when unlocking an achievement
//           state.addExperience(50)

//           return {
//             ...achievement,
//             unlocked: true,
//             progress: achievement.target,
//           }
//         }
//         return achievement
//       })

//       return {
//         simulation: {
//           ...state.simulation,
//           achievements: updatedAchievements,
//           score: state.calculateScore(),
//         },
//       }
//     })
//   },

//   completeChallenge: (id) => {
//     set((state) => {
//       if (state.simulation.completedChallenges.includes(id)) {
//         return state
//       }

//       // Add experience when completing a challenge
//       state.addExperience(100)

//       return {
//         simulation: {
//           ...state.simulation,
//           completedChallenges: [...state.simulation.completedChallenges, id],
//           score: state.calculateScore(),
//         },
//       }
//     })
//   },

//   addExperience: (amount) => {
//     set((state) => {
//       const newExperience = state.simulation.experience + amount

//       // Simple leveling system - level up every 500 XP
//       const newLevel = Math.floor(newExperience / 500) + 1
//       const leveledUp = newLevel > state.simulation.level

//       if (leveledUp) {
//         // Could trigger level-up notification here
//       }

//       return {
//         simulation: {
//           ...state.simulation,
//           experience: newExperience,
//           level: newLevel,
//           score: state.calculateScore(),
//         },
//       }
//     })
//   },

//   calculateScore: () => {
//     const state = get()

//     // Base score components
//     const processScore = state.processes.length * 10
//     const completedProcessScore = state.processes.filter((p) => p.state === "terminated").length * 25
//     const achievementScore = state.simulation.achievements.filter((a) => a.unlocked).length * 50
//     const challengeScore = state.simulation.completedChallenges.length * 100
//     const experienceScore = state.simulation.experience

//     // Efficiency bonuses
//     let efficiencyBonus = 0
//     const runningProcesses = state.processes.filter((p) => p.state === "running").length
//     const totalProcesses = state.processes.length

//     if (totalProcesses > 0) {
//       const cpuUtilization = (runningProcesses / totalProcesses) * 100
//       efficiencyBonus = Math.floor(cpuUtilization) * 2
//     }

//     // Deadlock penalty
//     const deadlockPenalty = state.simulation.deadlockDetected ? -100 : 0

//     // Calculate total score
//     const totalScore =
//       processScore +
//       completedProcessScore +
//       achievementScore +
//       challengeScore +
//       efficiencyBonus +
//       deadlockPenalty +
//       experienceScore

//     return Math.max(0, totalScore)
//   },
// }))

import { create } from "zustand"

// Define types for our store
type Process = {
  id: string
  name: string
  state: "new" | "ready" | "running" | "waiting" | "terminated"
  priority: number
  burstTime: number
  arrivalTime: number
  resources: string[]
  color: string
  remainingTime?: number // For preemptive scheduling
  waitingTime?: number // For performance metrics
  turnaroundTime?: number // For performance metrics
  responseTime?: number // For performance metrics
}

type Resource = {
  id: string
  name: string
  total: number
  available: number
  allocated: Record<string, number>
  maximum?: Record<string, number> // For Banker's Algorithm
}

type SchedulingAlgorithm = "FCFS" | "SJF" | "RR" | "Priority"
type SchedulingMode = "preemptive" | "non-preemptive"

type SimulationState = {
  isRunning: boolean
  speed: number
  currentTime: number
  algorithm: SchedulingAlgorithm
  schedulingMode: SchedulingMode
  timeQuantum: number
  score: number
  level: number
  deadlockDetected: boolean
  completedChallenges: string[]
  experience: number
  streak: number
  lastPlayDate: string | null
  cpuUtilization: number
  averageWaitingTime: number
  averageTurnaroundTime: number
  averageResponseTime: number
}

type GameMetrics = {
  levelsCompleted: number
  bestScores: Record<number, number> // level -> score
  attempts: number
  deadlocksAvoided: number
  deadlocksOccurred: number
  mostEfficientAlgorithm: SchedulingAlgorithm | null
}

type Store = {
  processes: Process[]
  resources: Resource[]
  simulation: SimulationState
  gameMetrics: GameMetrics
  // Actions
  addProcess: (process: Omit<Process, "id">) => void
  removeProcess: (id: string) => void
  updateProcessState: (id: string, state: Process["state"]) => void
  allocateResource: (processId: string, resourceId: string, amount: number) => void
  releaseResource: (processId: string, resourceId: string, amount: number) => void
  startSimulation: (mode?: SchedulingMode) => void
  pauseSimulation: () => void
  resetSimulation: () => void
  setAlgorithm: (algorithm: SchedulingAlgorithm) => void
  setSchedulingMode: (mode: SchedulingMode) => void
  setTimeQuantum: (quantum: number) => void
  setSpeed: (speed: number) => void
  setLevel: (level: number) => void
  detectDeadlock: () => boolean
  isSafeState: () => boolean // For Banker's Algorithm
  completeChallenge: (id: string) => void
  addExperience: (amount: number) => void
  calculateScore: () => number
  updateGameMetrics: (metrics: Partial<GameMetrics>) => void
  setMaximumResource: (processId: string, resourceId: string, amount: number) => void
  clearGanttChart: () => void
}

// Process colors
const processColors = [
  "#4FACFE", // Blue
  "#9D50BB", // Purple
  "#43E97B", // Green
  "#FF5E62", // Red
  "#FFDB3A", // Yellow
]

// Create the store
export const useStore = create<Store>((set, get) => ({
  processes: [],
  resources: [],
  simulation: {
    isRunning: false,
    speed: 1,
    currentTime: 0,
    algorithm: "FCFS",
    schedulingMode: "non-preemptive",
    timeQuantum: 2,
    score: 0,
    level: 1,
    deadlockDetected: false,
    completedChallenges: [],
    experience: 0,
    streak: 0,
    lastPlayDate: null,
    cpuUtilization: 0,
    averageWaitingTime: 0,
    averageTurnaroundTime: 0,
    averageResponseTime: 0,
  },
  gameMetrics: {
    levelsCompleted: 0,
    bestScores: {},
    attempts: 0,
    deadlocksAvoided: 0,
    deadlocksOccurred: 0,
    mostEfficientAlgorithm: null,
  },

  // Actions
  addProcess: (process) => {
    const id = `p-${Date.now()}`
    const colorIndex = get().processes.length % processColors.length

    set((state) => {
      // Add process with additional scheduling metrics
      return {
        processes: [
          ...state.processes,
          {
            ...process,
            id,
            color: processColors[colorIndex],
            remainingTime: process.burstTime,
            waitingTime: 0,
            turnaroundTime: 0,
            responseTime: -1, // Will be set when first scheduled
          },
        ],
      }
    })
  },

  removeProcess: (id) => {
    set((state) => ({
      processes: state.processes.filter((p) => p.id !== id),
    }))
  },

  updateProcessState: (id, newState) => {
    set((state) => {
      const currentTime = state.simulation.currentTime

      return {
        processes: state.processes.map((p) => {
          if (p.id === id) {
            const updatedProcess = { ...p, state:newState }

            // Track response time when first scheduled to run
            if (newState === "running" && p.responseTime === -1) {
              updatedProcess.responseTime = currentTime - p.arrivalTime
            }

            // Calculate turnaround time when terminated
            if (newState === "terminated") {
              updatedProcess.turnaroundTime = currentTime - p.arrivalTime
            }

            return updatedProcess
          }
          return p
        }),
      }
    })
  },

  allocateResource: (processId, resourceId, amount) => {
    set((state) => {
      const updatedResources = state.resources.map((r) => {
        if (r.id === resourceId && r.available >= amount) {
          const allocated = r.allocated[processId] || 0
          return {
            ...r,
            available: r.available - amount,
            allocated: {
              ...r.allocated,
              [processId]: allocated + amount,
            },
          }
        }
        return r
      })

      const updatedProcesses = state.processes.map((p) => {
        if (p.id === processId) {
          return {
            ...p,
            resources: [...p.resources, resourceId],
          }
        }
        return p
      })

      // After allocation, check for deadlock
      const deadlockDetected = get().detectDeadlock()

      return {
        resources: updatedResources,
        processes: updatedProcesses,
        simulation: {
          ...state.simulation,
          deadlockDetected,
        },
      }
    })
  },

  releaseResource: (processId, resourceId, amount) => {
    set((state) => {
      const updatedResources = state.resources.map((r) => {
        if (r.id === resourceId) {
          const allocated = r.allocated[processId] || 0
          const amountToRelease = Math.min(allocated, amount)

          const newAllocated = { ...r.allocated }
          newAllocated[processId] = allocated - amountToRelease

          if (newAllocated[processId] === 0) {
            delete newAllocated[processId]
          }

          return {
            ...r,
            available: r.available + amountToRelease,
            allocated: newAllocated,
          }
        }
        return r
      })

      const updatedProcesses = state.processes.map((p) => {
        if (p.id === processId) {
          return {
            ...p,
            resources: p.resources.filter((id) => id !== resourceId),
          }
        }
        return p
      })

      return {
        resources: updatedResources,
        processes: updatedProcesses,
      }
    })
  },

  startSimulation: (mode) => {
    set((state) => {
      // Update game metrics
      const gameMetrics = {
        ...state.gameMetrics,
        attempts: state.gameMetrics.attempts + 1,
      }

      return {
        simulation: {
          ...state.simulation,
          isRunning: true,
          schedulingMode: mode || state.simulation.schedulingMode,
        },
        gameMetrics,
      }
    })
  },

  pauseSimulation: () => {
    set((state) => ({
      simulation: {
        ...state.simulation,
        isRunning: false,
      },
    }))
  },

  resetSimulation: () => {
    set((state) => ({
      processes: [],
      resources: [],
      simulation: {
        ...state.simulation,
        isRunning: false,
        currentTime: 0,
        score: 0,
        deadlockDetected: false,
        cpuUtilization: 0,
        averageWaitingTime: 0,
        averageTurnaroundTime: 0,
        averageResponseTime: 0,
      },
    }))
  },

  setAlgorithm: (algorithm) => {
    set((state) => ({
      simulation: {
        ...state.simulation,
        algorithm,
      },
    }))
  },

  setSchedulingMode: (mode) => {
    set((state) => ({
      simulation: {
        ...state.simulation,
        schedulingMode: mode,
      },
    }))
  },

  setTimeQuantum: (timeQuantum) => {
    set((state) => ({
      simulation: {
        ...state.simulation,
        timeQuantum,
      },
    }))
  },

  setSpeed: (speed) => {
    set((state) => ({
      simulation: {
        ...state.simulation,
        speed,
      },
    }))
  },

  setLevel: (level) => {
    set((state) => ({
      simulation: {
        ...state.simulation,
        level,
      },
    }))
  },

  detectDeadlock: () => {
    // Simple deadlock detection algorithm
    // In a real implementation, this would be more complex
    const { processes, resources } = get()

    // Check if there's a cycle in the resource allocation graph
    // This is a simplified version
    const deadlockDetected = processes.some(
      (p) =>
        p.state === "waiting" &&
        p.resources.some((rId) => {
          const resource = resources.find((r) => r.id === rId)
          return resource && resource.available === 0
        }),
    )

    set((state) => {
      // Update game metrics if deadlock was detected
      let gameMetrics = { ...state.gameMetrics }

      if (deadlockDetected && !state.simulation.deadlockDetected) {
        gameMetrics = {
          ...gameMetrics,
          deadlocksOccurred: gameMetrics.deadlocksOccurred + 1,
        }
      }

      return {
        simulation: {
          ...state.simulation,
          deadlockDetected,
          score: state.calculateScore(),
        },
        gameMetrics,
      }
    })

    return deadlockDetected
  },

  isSafeState: () => {
    // Banker's Algorithm for deadlock avoidance
    const { processes, resources } = get()

    // Make copy of available resources
    const available: { [key: string]: number } = {}
    resources.forEach((r) => {
      available[r.id] = r.available
    })

    // Make copy of remaining need for each process
    const need: { [key: string]: { [key: string]: number } } = {}
    processes.forEach((p) => {
      need[p.id] = {}
      resources.forEach((r) => {
        const max = r.maximum?.[p.id] || 0
        const allocated = r.allocated[p.id] || 0
        need[p.id][r.id] = Math.max(0, max - allocated)
      })
    })

    // Find a safe sequence
    const finished = new Set()
    const n = processes.length

    while (finished.size < n) {
      let found = false

      // Find a process that can finish with available resources
      for (const p of processes) {
        if (finished.has(p.id)) continue

        let canFinish = true
        for (const r of resources) {
          if ((need[p.id]?.[r.id] || 0) > (available[r.id] || 0)) {
            canFinish = false
            break
          }
        }

        if (canFinish) {
          // Process can finish, release its resources
          finished.add(p.id)
          found = true

          // Release allocated resources
          resources.forEach((r) => {
            const allocated = r.allocated[p.id] || 0
            available[r.id] = (available[r.id] || 0) + allocated
          })
        }
      }

      // If no process can finish, there's no safe sequence
      if (!found && finished.size < n) {
        return false
      }
    }

    // All processes can finish, state is safe
    return true
  },

  completeChallenge: (id) => {
    set((state) => {
      if (state.simulation.completedChallenges.includes(id)) {
        return state
      }

      // Add experience when completing a challenge
      state.addExperience(100)

      return {
        simulation: {
          ...state.simulation,
          completedChallenges: [...state.simulation.completedChallenges, id],
          score: state.calculateScore(),
        },
      }
    })
  },

  addExperience: (amount) => {
    set((state) => {
      const newExperience = state.simulation.experience + amount

      // Simple leveling system - level up every 500 XP
      const newLevel = Math.floor(newExperience / 500) + 1
      const leveledUp = newLevel > state.simulation.level

      return {
        simulation: {
          ...state.simulation,
          experience: newExperience,
          level: newLevel,
          score: state.calculateScore(),
        },
      }
    })
  },

  calculateScore: () => {
    const state = get()
    const { simulation, processes, resources } = state

    // Get the number of completed processes
    const completedProcesses = processes.filter((p) => p.state === "terminated").length

    // Level multiplier increases with level
    const levelMultiplier = simulation.level * 10

    // Base score based on CPU utilization
    const cpuUtilizationScore = Math.round(simulation.cpuUtilization * levelMultiplier)

    // Penalties and bonuses
    const deadlockPenalty = simulation.deadlockDetected ? -100 * simulation.level : 0

    // Efficiency bonus based on waiting and turnaround times
    const waitingTimeBonus = simulation.averageWaitingTime === 0 ? 0 : Math.round(100 / simulation.averageWaitingTime)
    const turnaroundTimeBonus =
      simulation.averageTurnaroundTime === 0 ? 0 : Math.round(200 / simulation.averageTurnaroundTime)

    // Complexity bonus based on number of processes and resources
    const complexityBonus = processes.length * 5 + resources.length * 10

    // Deadlock avoidance bonus
    const safeStateBonus = state.isSafeState() ? 50 * simulation.level : 0

    // Calculate total score
    const totalScore =
      cpuUtilizationScore +
      deadlockPenalty +
      waitingTimeBonus +
      turnaroundTimeBonus +
      complexityBonus +
      safeStateBonus +
      completedProcesses * 25

    return Math.max(0, totalScore)
  },

  updateGameMetrics: (metrics) => {
    set((state) => {
      // Update best score if current score is higher
      const bestScores = { ...state.gameMetrics.bestScores }
      const currentLevel = state.simulation.level
      const currentScore = state.simulation.score

      if (!bestScores[currentLevel] || currentScore > bestScores[currentLevel]) {
        bestScores[currentLevel] = currentScore
      }

      return {
        gameMetrics: {
          ...state.gameMetrics,
          ...metrics,
          bestScores,
        },
      }
    })
  },

  setMaximumResource: (processId, resourceId, amount) => {
    set((state) => {
      const updatedResources = state.resources.map((r) => {
        if (r.id === resourceId) {
          return {
            ...r,
            maximum: {
              ...r.maximum,
              [processId]: amount,
            },
          }
        }
        return r
      })

      return {
        resources: updatedResources,
      }
    })
  },

  clearGanttChart: () => {
    // This is a trigger for the Gantt Chart component to clear its data
    // We don't need to modify any state here, just trigger a re-render
    set((state) => ({ ...state }))
  },
}))
