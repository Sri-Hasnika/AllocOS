// "use client"

// import { useEffect, useRef } from "react"
// import { motion } from "framer-motion"
// import { useStore } from "@/lib/store"
// import { Play, Pause, Plus, Info } from "lucide-react"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// // Process state descriptions for tooltips
// const stateDescriptions = {
//   new: "Process is being created",
//   ready: "Process is waiting to be assigned to a processor",
//   running: "Process is executing instructions",
//   waiting: "Process is waiting for some event to occur",
//   terminated: "Process has finished execution",
// }

// export function ProcessLifecycle() {
//   const { processes, simulation, addProcess, updateProcessState, startSimulation, pauseSimulation } = useStore()

//   const canvasRef = useRef<HTMLDivElement>(null)

//   // Function to create a new process
//   const handleCreateProcess = () => {
//     const processName = `Process ${processes.length + 1}`

//     addProcess({
//       name: processName,
//       state: "new",
//       priority: Math.floor(Math.random() * 10) + 1,
//       burstTime: Math.floor(Math.random() * 10) + 1,
//       arrivalTime: simulation.currentTime,
//       resources: [],
//       color: "", // Will be assigned in the store
//     })
//   }

//   // Simulate process lifecycle
//   useEffect(() => {
//     if (!simulation.isRunning) return

//     const interval = setInterval(() => {
//       // Simple simulation logic
//       processes.forEach((process) => {
//         // Randomly transition processes between states
//         if (process.state === "new") {
//           updateProcessState(process.id, "ready")
//         } else if (process.state === "ready" && Math.random() > 0.7) {
//           updateProcessState(process.id, "running")
//         } else if (process.state === "running") {
//           if (Math.random() > 0.8) {
//             updateProcessState(process.id, "waiting")
//           } else if (Math.random() > 0.9) {
//             updateProcessState(process.id, "terminated")
//           }
//         } else if (process.state === "waiting" && Math.random() > 0.7) {
//           updateProcessState(process.id, "ready")
//         }
//       })
//     }, 1000 / simulation.speed)

//     return () => clearInterval(interval)
//   }, [processes, simulation.isRunning, simulation.speed, updateProcessState])

//   return (
//     <TooltipProvider>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-os-dark rounded-lg border border-os-light p-4 shadow-lg"
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-white">Process Lifecycle</h2>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleCreateProcess}
//               className="bg-os-blue text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
//             >
//               <Plus size={16} />
//             </button>
//             <button
//               onClick={simulation.isRunning ? pauseSimulation : startSimulation}
//               className={`${
//                 simulation.isRunning ? "bg-os-yellow" : "bg-os-green"
//               } text-white p-2 rounded-md hover:opacity-90 transition-colors`}
//             >
//               {simulation.isRunning ? <Pause size={16} /> : <Play size={16} />}
//             </button>
//           </div>
//         </div>

//         {/* Process Lifecycle Visualization */}
//         <div
//           ref={canvasRef}
//           className="relative h-64 grid-pattern rounded-md border border-os-light mb-4 overflow-hidden"
//         >
//           {/* State Nodes */}
//           <div className="absolute inset-0 flex justify-between items-center px-8">
//             {/* New State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-blue w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "new")
//                       ? [
//                           "0 0 10px rgba(79, 172, 254, 0.5)",
//                           "0 0 20px rgba(79, 172, 254, 0.8)",
//                           "0 0 10px rgba(79, 172, 254, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-blue font-bold">New</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "new").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.new}</p>
//               </TooltipContent>
//             </Tooltip>

//             {/* Ready State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-green w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "ready")
//                       ? [
//                           "0 0 10px rgba(67, 233, 123, 0.5)",
//                           "0 0 20px rgba(67, 233, 123, 0.8)",
//                           "0 0 10px rgba(67, 233, 123, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-green font-bold">Ready</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "ready").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.ready}</p>
//               </TooltipContent>
//             </Tooltip>

//             {/* Running State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-purple w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "running")
//                       ? [
//                           "0 0 10px rgba(157, 80, 187, 0.5)",
//                           "0 0 20px rgba(157, 80, 187, 0.8)",
//                           "0 0 10px rgba(157, 80, 187, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-purple font-bold">Running</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "running").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.running}</p>
//               </TooltipContent>
//             </Tooltip>

//             {/* Waiting State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-yellow w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "waiting")
//                       ? [
//                           "0 0 10px rgba(255, 219, 58, 0.5)",
//                           "0 0 20px rgba(255, 219, 58, 0.8)",
//                           "0 0 10px rgba(255, 219, 58, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-yellow font-bold">Waiting</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "waiting").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.waiting}</p>
//               </TooltipContent>
//             </Tooltip>

//             {/* Terminated State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-red w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "terminated")
//                       ? [
//                           "0 0 10px rgba(255, 94, 98, 0.5)",
//                           "0 0 20px rgba(255, 94, 98, 0.8)",
//                           "0 0 10px rgba(255, 94, 98, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-red font-bold">Terminated</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "terminated").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.terminated}</p>
//               </TooltipContent>
//             </Tooltip>
//           </div>

//           {/* Connection Lines */}
//           <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
//             {/* New to Ready */}
//             <motion.path
//               d="M 90,80 L 170,80"
//               stroke="#4FACFE"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "new") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />

//             {/* Ready to Running */}
//             <motion.path
//               d="M 250,80 L 330,80"
//               stroke="#43E97B"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "ready") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />

//             {/* Running to Waiting */}
//             <motion.path
//               d="M 410,100 L 410,140 L 330,140 L 330,100"
//               stroke="#9D50BB"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "running") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />

//             {/* Waiting to Ready */}
//             <motion.path
//               d="M 250,100 L 250,140 L 170,140 L 170,100"
//               stroke="#FFDB3A"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "waiting") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />

//             {/* Running to Terminated */}
//             <motion.path
//               d="M 410,80 L 490,80"
//               stroke="#9D50BB"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "running") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />
//           </svg>
//         </div>

//         {/* Process List */}
//         <div className="bg-os-darker rounded-md border border-os-light p-2 h-40 overflow-y-auto">
//           <h3 className="text-sm font-bold text-gray-300 mb-2">Active Processes</h3>
//           {processes.length === 0 ? (
//             <div className="text-center text-gray-500 text-sm py-4">
//               No processes running. Click + to create a process.
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {processes
//                 .filter((p) => p.state !== "terminated")
//                 .map((process) => (
//                   <div
//                     key={process.id}
//                     className="flex items-center justify-between bg-os-light rounded-md p-2 text-sm"
//                   >
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: process.color }} />
//                       <span className="text-white">{process.name}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span
//                         className={`px-2 py-0.5 rounded-full text-xs mr-2 ${
//                           process.state === "new"
//                             ? "bg-os-blue/20 text-os-blue"
//                             : process.state === "ready"
//                               ? "bg-os-green/20 text-os-green"
//                               : process.state === "running"
//                                 ? "bg-os-purple/20 text-os-purple"
//                                 : process.state === "waiting"
//                                   ? "bg-os-yellow/20 text-os-yellow"
//                                   : "bg-os-red/20 text-os-red"
//                         }`}
//                       >
//                         {process.state}
//                       </span>
//                       <Tooltip>
//                         <TooltipTrigger>
//                           <Info size={14} className="text-gray-400" />
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <div>
//                             <p>Priority: {process.priority}</p>
//                             <p>Burst Time: {process.burstTime}</p>
//                             <p>Arrival: {process.arrivalTime.toFixed(1)}s</p>
//                           </div>
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </TooltipProvider>
//   )
// }


// "use client"

// import { useEffect, useRef, useCallback } from "react"
// import { motion } from "framer-motion"
// import { useStore } from "@/lib/store"
// import { Play, Pause, Plus, Info } from "lucide-react"
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip"

// const stateDescriptions = {
//   new: "Process is being created",
//   ready: "Process is waiting to be assigned to a processor",
//   running: "Process is executing instructions",
//   waiting: "Process is waiting for some event to occur",
//   terminated: "Process has finished execution",
// }

// export function ProcessLifecycle() {
//   const processes = useStore((state) => state.processes)
//   const simulation = useStore((state) => state.simulation)
//   const addProcess = useStore((state) => state.addProcess)
//   const updateProcessState = useStore((state) => state.updateProcessState)
//   const startSimulation = useStore((state) => state.startSimulation)
//   const pauseSimulation = useStore((state) => state.pauseSimulation)


//   const intervalRef = useRef<NodeJS.Timeout | null>(null)

//   const handleCreateProcess = useCallback(() => {
//     const processName = `Process ${processes.length + 1}`

//     addProcess({
//       // id: uuidv4(),
//       name: processName,
//       state: "new",
//       priority: Math.floor(Math.random() * 10) + 1,
//       burstTime: Math.floor(Math.random() * 10) + 1,
//       arrivalTime: simulation.currentTime,
//       resources: [],
//       color: "",
//     })
//   }, [processes.length, simulation.currentTime, addProcess])

//   useEffect(() => {
//     if (!simulation.isRunning) {
//       if (intervalRef.current) clearInterval(intervalRef.current)
//       return
//     }

//     intervalRef.current = setInterval(() => {
//       const cloned = [...processes]
//       cloned.forEach((process) => {
//         const roll = Math.random()
//         if (process.state === "new") {
//           updateProcessState(process.id, "ready")
//         } else if (process.state === "ready" && roll > 0.7) {
//           updateProcessState(process.id, "running")
//         } else if (process.state === "running") {
//           if (roll > 0.9) {
//             updateProcessState(process.id, "terminated")
//           } else if (roll > 0.8) {
//             updateProcessState(process.id, "waiting")
//           }
//         } else if (process.state === "waiting" && roll > 0.7) {
//           updateProcessState(process.id, "ready")
//         }
//       })
//     }, 1000 / simulation.speed)

//     return () => {
//       if (intervalRef.current) clearInterval(intervalRef.current)
//     }
//   }, [simulation.isRunning, simulation.speed, processes, updateProcessState])

//   const stateCount = useCallback(
//     (state: string) => processes.filter((p) => p.state === state).length,
//     [processes]
//   )

//   const stateColors = {
//     new: "os-blue",
//     ready: "os-green",
//     running: "os-purple",
//     waiting: "os-yellow",
//     terminated: "os-red",
//   }

//   const renderNode = (label: string, color: string) => (
//     <Tooltip>
//       <TooltipTrigger>
//         <motion.div
//           className={`hexagon bg-os-darker border-2 border-${color} w-20 h-20 flex items-center justify-center relative process-node`}
//           animate={{
//             boxShadow: stateCount(label.toLowerCase()) > 0
//               ? [
//                   `0 0 10px var(--${color}-a5)`,
//                   `0 0 20px var(--${color}-a8)`,
//                   `0 0 10px var(--${color}-a5)`,
//                 ]
//               : "0 0 0px transparent",
//           }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <span className={`text-${color} font-bold`}>{label}</span>
//           <div className="absolute -top-6 text-xs text-gray-400">
//             {stateCount(label.toLowerCase())}
//           </div>
//         </motion.div>
//       </TooltipTrigger>
//       <TooltipContent>
//         <p>{stateDescriptions[label.toLowerCase() as keyof typeof stateDescriptions]}</p>
//       </TooltipContent>
//     </Tooltip>
//   )

//   return (
//     <TooltipProvider>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-os-dark rounded-lg border border-os-light p-4 shadow-lg"
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-white">Process Lifecycle</h2>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleCreateProcess}
//               className="bg-os-blue text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
//               aria-label="Create new process"
//             >
//               <Plus size={16} />
//             </button>
//             <button
//               onClick={simulation.isRunning ? pauseSimulation : startSimulation}
//               className={`${
//                 simulation.isRunning ? "bg-os-yellow" : "bg-os-green"
//               } text-white p-2 rounded-md hover:opacity-90 transition-colors`}
//               aria-label={simulation.isRunning ? "Pause simulation" : "Start simulation"}
//             >
//               {simulation.isRunning ? <Pause size={16} /> : <Play size={16} />}
//             </button>
//           </div>
//         </div>

//         {/* Lifecycle States */}
//         <div
//           className="relative h-64 grid-pattern rounded-md border border-os-light mb-4 overflow-hidden"
//         >
//           <div className="absolute inset-0 flex justify-between items-center px-8">
//             {renderNode("New", "os-blue")}
//             {renderNode("Ready", "os-green")}
//             {renderNode("Running", "os-purple")}
//             {renderNode("Waiting", "os-yellow")}
//             {renderNode("Terminated", "os-red")}
//           </div>

//           {/* SVG Lines */}
//           <svg className="absolute inset-0 w-full h-full z-[-1]">
//             {[
//               { d: "M 90,80 L 170,80", color: "#4FACFE", from: "new" },
//               { d: "M 250,80 L 330,80", color: "#43E97B", from: "ready" },
//               { d: "M 410,100 L 410,140 L 330,140 L 330,100", color: "#9D50BB", from: "running" },
//               { d: "M 250,100 L 250,140 L 170,140 L 170,100", color: "#FFDB3A", from: "waiting" },
//               { d: "M 410,80 L 490,80", color: "#9D50BB", from: "running" },
//             ].map((line, idx) => (
//               <motion.path
//                 key={idx}
//                 d={line.d}
//                 stroke={line.color}
//                 strokeWidth="2"
//                 fill="none"
//                 strokeDasharray="5,5"
//                 animate={{
//                   strokeDashoffset: [0, -20],
//                   opacity: stateCount(line.from) > 0 ? 1 : 0.3,
//                 }}
//                 transition={{ duration: 1, repeat: Infinity }}
//               />
//             ))}
//           </svg>
//         </div>

//         {/* Active Processes */}
//         <div className="bg-os-darker rounded-md border border-os-light p-2 h-40 overflow-y-auto">
//           <h3 className="text-sm font-bold text-gray-300 mb-2">Active Processes</h3>
//           {processes.length === 0 ? (
//             <div className="text-center text-gray-500 text-sm py-4">
//               No processes running. Click + to create a process.
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {processes
//                 .filter((p) => p.state !== "terminated")
//                 .map((process) => (
//                   <div
//                     key={process.id}
//                     className="flex items-center justify-between bg-os-light rounded-md p-2 text-sm"
//                   >
//                     <div className="flex items-center">
//                       <div
//                         className="w-3 h-3 rounded-full mr-2"
//                         style={{ backgroundColor: process.color }}
//                       />
//                       <span className="text-white">{process.name}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span
//                         className={`px-2 py-0.5 rounded-full text-xs mr-2 ${
//                           process.state === "new"
//                             ? "bg-os-blue/20 text-os-blue"
//                             : process.state === "ready"
//                             ? "bg-os-green/20 text-os-green"
//                             : process.state === "running"
//                             ? "bg-os-purple/20 text-os-purple"
//                             : process.state === "waiting"
//                             ? "bg-os-yellow/20 text-os-yellow"
//                             : "bg-os-red/20 text-os-red"
//                         }`}
//                       >
//                         {process.state}
//                       </span>
//                       <Tooltip>
//                         <TooltipTrigger>
//                           <Info size={14} className="text-gray-400" />
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <div>
//                             <p>Priority: {process.priority}</p>
//                             <p>Burst Time: {process.burstTime}</p>
//                             <p>Arrival: {process.arrivalTime.toFixed(1)}s</p>
//                           </div>
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//       </motion.div>
//     </TooltipProvider>
//   )
// }

// "use client"

// import { useEffect, useRef, useState } from "react"
// import { motion } from "framer-motion"
// import { useStore } from "@/lib/store"
// import { Play, Pause, Plus, Info } from "lucide-react"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { AddProcessModal } from "./add-process-modal"

// // Process state descriptions for tooltips
// const stateDescriptions = {
//   new: "Process is being created",
//   ready: "Process is waiting to be assigned to a processor",
//   running: "Process is executing instructions",
//   waiting: "Process is waiting for some event to occur",
//   terminated: "Process has finished execution",
// }

// export function ProcessLifecycle() {
//   const { processes, simulation, addProcess, updateProcessState, startSimulation, pauseSimulation } = useStore()

//   const canvasRef = useRef<HTMLDivElement>(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   // Function to create a new process
//   const handleCreateProcess = () => {
//     setIsModalOpen(true)
//   }

//   // Simulate process lifecycle
//   useEffect(() => {
//     if (!simulation.isRunning) return

//     const interval = setInterval(() => {
//       // Simple simulation logic
//       processes.forEach((process) => {
//         // Randomly transition processes between states
//         if (process.state === "new") {
//           updateProcessState(process.id, "ready")
//         } else if (process.state === "ready" && Math.random() > 0.7) {
//           updateProcessState(process.id, "running")
//         } else if (process.state === "running") {
//           if (Math.random() > 0.8) {
//             updateProcessState(process.id, "waiting")
//           } else if (Math.random() > 0.9) {
//             updateProcessState(process.id, "terminated")
//           }
//         } else if (process.state === "waiting" && Math.random() > 0.7) {
//           updateProcessState(process.id, "ready")
//         }
//       })
//     }, 1000 / simulation.speed)

//     return () => clearInterval(interval)
//   }, [processes, simulation.isRunning, simulation.speed, updateProcessState])

//   return (
//     <TooltipProvider>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-os-dark rounded-lg border border-os-light p-4 shadow-lg"
//       >
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-xl font-bold text-white">Process Lifecycle</h2>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleCreateProcess}
//               className="bg-os-blue text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
//             >
//               <Plus size={16} />
//             </button>
//             <button
//               onClick={simulation.isRunning ? pauseSimulation : startSimulation}
//               className={`${
//                 simulation.isRunning ? "bg-os-yellow" : "bg-os-green"
//               } text-white p-2 rounded-md hover:opacity-90 transition-colors`}
//             >
//               {simulation.isRunning ? <Pause size={16} /> : <Play size={16} />}
//             </button>
//           </div>
//         </div>

//         {/* Process Lifecycle Visualization */}
//         <div
//           ref={canvasRef}
//           className="relative h-64 grid-pattern rounded-md border border-os-light mb-4 overflow-hidden"
//         >
//           {/* State Nodes */}
//           <div className="absolute inset-0 flex justify-between items-center px-8">
//             {/* New State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-blue w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "new")
//                       ? [
//                           "0 0 10px rgba(79, 172, 254, 0.5)",
//                           "0 0 20px rgba(79, 172, 254, 0.8)",
//                           "0 0 10px rgba(79, 172, 254, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-blue font-bold">New</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "new").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.new}</p>
//               </TooltipContent>
//             </Tooltip>

//             {/* Ready State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-green w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "ready")
//                       ? [
//                           "0 0 10px rgba(67, 233, 123, 0.5)",
//                           "0 0 20px rgba(67, 233, 123, 0.8)",
//                           "0 0 10px rgba(67, 233, 123, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-green font-bold">Ready</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "ready").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.ready}</p>
//               </TooltipContent>
//             </Tooltip>

//             {/* Running State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-purple w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "running")
//                       ? [
//                           "0 0 10px rgba(157, 80, 187, 0.5)",
//                           "0 0 20px rgba(157, 80, 187, 0.8)",
//                           "0 0 10px rgba(157, 80, 187, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-purple font-bold">Running</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "running").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.running}</p>
//               </TooltipContent>
//             </Tooltip>

//             {/* Waiting State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-yellow w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "waiting")
//                       ? [
//                           "0 0 10px rgba(255, 219, 58, 0.5)",
//                           "0 0 20px rgba(255, 219, 58, 0.8)",
//                           "0 0 10px rgba(255, 219, 58, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-yellow font-bold">Waiting</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "waiting").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.waiting}</p>
//               </TooltipContent>
//             </Tooltip>

//             {/* Terminated State */}
//             <Tooltip>
//               <TooltipTrigger>
//                 <motion.div
//                   className="hexagon bg-os-darker border-2 border-os-red w-20 h-20 flex items-center justify-center relative process-node"
//                   animate={{
//                     boxShadow: processes.some((p) => p.state === "terminated")
//                       ? [
//                           "0 0 10px rgba(255, 94, 98, 0.5)",
//                           "0 0 20px rgba(255, 94, 98, 0.8)",
//                           "0 0 10px rgba(255, 94, 98, 0.5)",
//                         ]
//                       : "0 0 0px transparent",
//                   }}
//                   transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   <span className="text-os-red font-bold">Terminated</span>
//                   <div className="absolute -top-6 text-xs text-gray-400">
//                     {processes.filter((p) => p.state === "terminated").length}
//                   </div>
//                 </motion.div>
//               </TooltipTrigger>
//               <TooltipContent>
//                 <p>{stateDescriptions.terminated}</p>
//               </TooltipContent>
//             </Tooltip>
//           </div>

//           {/* Connection Lines */}
//           <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
//             {/* New to Ready */}
//             <motion.path
//               d="M 90,80 L 170,80"
//               stroke="#4FACFE"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "new") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />

//             {/* Ready to Running */}
//             <motion.path
//               d="M 250,80 L 330,80"
//               stroke="#43E97B"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "ready") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />

//             {/* Running to Waiting */}
//             <motion.path
//               d="M 410,100 L 410,140 L 330,140 L 330,100"
//               stroke="#9D50BB"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "running") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />

//             {/* Waiting to Ready */}
//             <motion.path
//               d="M 250,100 L 250,140 L 170,140 L 170,100"
//               stroke="#FFDB3A"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "waiting") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />

//             {/* Running to Terminated */}
//             <motion.path
//               d="M 410,80 L 490,80"
//               stroke="#9D50BB"
//               strokeWidth="2"
//               fill="none"
//               strokeDasharray="5,5"
//               animate={{
//                 strokeDashoffset: [0, -20],
//                 opacity: processes.some((p) => p.state === "running") ? 1 : 0.3,
//               }}
//               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//             />
//           </svg>
//         </div>

//         {/* Process List */}
//         <div className="bg-os-darker rounded-md border border-os-light p-2 h-40 overflow-y-auto">
//           <h3 className="text-sm font-bold text-gray-300 mb-2">Active Processes</h3>
//           {processes.length === 0 ? (
//             <div className="text-center text-gray-500 text-sm py-4">
//               No processes running. Click + to create a process.
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {processes
//                 .filter((p) => p.state !== "terminated")
//                 .map((process) => (
//                   <div
//                     key={process.id}
//                     className="flex items-center justify-between bg-os-light rounded-md p-2 text-sm"
//                   >
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: process.color }} />
//                       <span className="text-white">{process.name}</span>
//                     </div>
//                     <div className="flex items-center">
//                       <span
//                         className={`px-2 py-0.5 rounded-full text-xs mr-2 ${
//                           process.state === "new"
//                             ? "bg-os-blue/20 text-os-blue"
//                             : process.state === "ready"
//                               ? "bg-os-green/20 text-os-green"
//                               : process.state === "running"
//                                 ? "bg-os-purple/20 text-os-purple"
//                                 : process.state === "waiting"
//                                   ? "bg-os-yellow/20 text-os-yellow"
//                                   : "bg-os-red/20 text-os-red"
//                         }`}
//                       >
//                         {process.state}
//                       </span>
//                       <Tooltip>
//                         <TooltipTrigger>
//                           <Info size={14} className="text-gray-400" />
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <div>
//                             <p>Priority: {process.priority}</p>
//                             <p>Burst Time: {process.burstTime}</p>
//                             <p>Arrival: {process.arrivalTime.toFixed(1)}s</p>
//                           </div>
//                         </TooltipContent>
//                       </Tooltip>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//         <AddProcessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//       </motion.div>
//     </TooltipProvider>
//   )
// }

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useStore } from "@/lib/store"
import { Play, Pause, Plus, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AddProcessModal } from "./add-process-modal"
import { SchedulingModeModal } from "../scheduler/scheduling-mode-modal"

export function ProcessLifecycle() {
  const { processes, simulation, addProcess, updateProcessState, startSimulation, pauseSimulation, clearGanttChart } =
    useStore()

  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false)
  const [isSchedulingModalOpen, setIsSchedulingModalOpen] = useState(false)

  // Function to create a new process
  const handleCreateProcess = () => {
    // Clear Gantt Chart data before adding a new process
    clearGanttChart()
    setIsProcessModalOpen(true)
  }

  // Handle play button click
  const handlePlayClick = () => {
    if (simulation.isRunning) {
      pauseSimulation()
    } else {
      // Show scheduling mode selection for SJF and Priority algorithms
      if (simulation.algorithm === "SJF" || simulation.algorithm === "Priority") {
        setIsSchedulingModalOpen(true)
      } else {
        startSimulation()
      }
    }
  }

  // Simulate process lifecycle
  useEffect(() => {
    if (!simulation.isRunning) return

    const interval = setInterval(() => {
      // Simple simulation logic
      processes.forEach((process) => {
        // Randomly transition processes between states
        if (process.state === "new") {
          updateProcessState(process.id, "ready")
        } else if (process.state === "ready" && Math.random() > 0.7) {
          updateProcessState(process.id, "running")
        } else if (process.state === "running") {
          if (Math.random() > 0.8) {
            updateProcessState(process.id, "waiting")
          } else if (Math.random() > 0.9) {
            updateProcessState(process.id, "terminated")
          }
        } else if (process.state === "waiting" && Math.random() > 0.7) {
          updateProcessState(process.id, "ready")
        }
      })
    }, 1000 / simulation.speed)

    return () => clearInterval(interval)
  }, [processes, simulation.isRunning, simulation.speed, updateProcessState])

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-os-dark rounded-lg border border-os-light p-4 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Process Lifecycle</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleCreateProcess}
              className="bg-os-blue text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={handlePlayClick}
              className={`${
                simulation.isRunning ? "bg-os-yellow" : "bg-os-green"
              } text-white p-2 rounded-md hover:opacity-90 transition-colors`}
            >
              {simulation.isRunning ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
        </div>

        {/* Process Visualization (Simplified) */}
        <div className="bg-os-darker rounded-md border border-os-light p-4 mb-4 h-64 flex items-center justify-center">
          {processes.length === 0 ? (
            <div className="text-center text-gray-500">No processes available. Click + to create a process.</div>
          ) : (
            <div className="w-full grid grid-cols-5 gap-4">
              {["new", "ready", "running", "waiting", "terminated"].map((state) => {
                const stateProcesses = processes.filter((p) => p.state === state)
                const stateColor =
                  state === "new"
                    ? "os-blue"
                    : state === "ready"
                      ? "os-green"
                      : state === "running"
                        ? "os-purple"
                        : state === "waiting"
                          ? "os-yellow"
                          : "os-red"

                return (
                  <div key={state} className="text-center">
                    <div className={`text-${stateColor} font-bold mb-2 capitalize`}>{state}</div>
                    <div className={`text-2xl font-bold mb-4 text-${stateColor}`}>{stateProcesses.length}</div>
                    <div className="space-y-1">
                      {stateProcesses.slice(0, 3).map((process) => (
                        <div key={process.id} className="bg-os-light rounded px-2 py-1 text-xs flex items-center">
                          <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: process.color }}></div>
                          <span className="truncate">{process.name}</span>
                        </div>
                      ))}
                      {stateProcesses.length > 3 && (
                        <div className="text-gray-500 text-xs">+{stateProcesses.length - 3} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Active Processes */}
        <div className="bg-os-darker rounded-md border border-os-light p-2 h-40 overflow-y-auto">
          <h3 className="text-sm font-bold text-gray-300 mb-2">Active Processes</h3>
          {processes.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-4">
              No processes running. Click + to create a process.
            </div>
          ) : (
            <div className="space-y-2">
              {processes
                .filter((p) => p.state !== "terminated")
                .map((process) => (
                  <div
                    key={process.id}
                    className="flex items-center justify-between bg-os-light rounded-md p-2 text-sm"
                  >
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: process.color }} />
                      <span className="text-white">{process.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs mr-2 ${
                          process.state === "new"
                            ? "bg-os-blue/20 text-os-blue"
                            : process.state === "ready"
                              ? "bg-os-green/20 text-os-green"
                              : process.state === "running"
                                ? "bg-os-purple/20 text-os-purple"
                                : process.state === "waiting"
                                  ? "bg-os-yellow/20 text-os-yellow"
                                  : "bg-os-red/20 text-os-red"
                        }`}
                      >
                        {process.state}
                      </span>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info size={14} className="text-gray-400" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div>
                            <p>Priority: {process.priority}</p>
                            <p>Burst Time: {process.burstTime}</p>
                            <p>Arrival: {process.arrivalTime.toFixed(1)}s</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Modals */}
        <AddProcessModal isOpen={isProcessModalOpen} onClose={() => setIsProcessModalOpen(false)} />
        <SchedulingModeModal isOpen={isSchedulingModalOpen} onClose={() => setIsSchedulingModalOpen(false)} />
      </motion.div>
    </TooltipProvider>
  )
}
