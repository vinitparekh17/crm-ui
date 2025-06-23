import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Engineer {
  id: string
  name: string
  role: string
  type: "support" | "development"
  status: "online" | "away" | "offline"
  lastSeen: string
  runningTasks: number
  resolvedTasks?: number
  completedTasks?: number
  performanceScore?: number
  customerRating?: number
  codeQuality?: number
  currentSprint?: string
  specialization?: string
  specializationColor?: string
  avatarColor: string
}

interface EngineerStore {
  engineers: Engineer[]
  supportEngineers: Engineer[]
  developmentEngineers: Engineer[]
  // Actions
  addEngineer: (engineer: Omit<Engineer, "id">) => void
  updateEngineer: (id: string, updates: Partial<Engineer>) => void
  deleteEngineer: (id: string) => void
  getActiveEngineers: () => Engineer[]
  getSupportEngineers: () => Engineer[]
  getDevelopmentEngineers: () => Engineer[]
  getSupportStats: () => {
    activeEngineers: number
    activeTasks: number
    resolvedToday: number
    avgResponseTime: string
  }
  getDevelopmentStats: () => {
    activeDevelopers: number
    activeProjects: number
    completedToday: number
    avgDevTime: string
  }
}

const supportEngineers: Engineer[] = [
  {
    id: "1",
    name: "Ravi",
    role: "Senior Support Engineer",
    type: "support",
    status: "online",
    lastSeen: "Active for 3:38",
    runningTasks: 4,
    resolvedTasks: 10,
    performanceScore: 94,
    customerRating: 4.8,
    avatarColor: "bg-gradient-to-br from-blue-500 to-blue-600",
  },
  {
    id: "2",
    name: "Vishal",
    role: "Support Engineer",
    type: "support",
    status: "online",
    lastSeen: "Active for 4:04",
    runningTasks: 4,
    resolvedTasks: 3,
    performanceScore: 87,
    customerRating: 4.6,
    avatarColor: "bg-gradient-to-br from-green-500 to-green-600",
  },
  {
    id: "3",
    name: "Testing Points",
    role: "QA Engineer",
    type: "support",
    status: "away",
    lastSeen: "Last seen 0:00",
    runningTasks: 2,
    resolvedTasks: 0,
    performanceScore: 78,
    customerRating: 4.2,
    avatarColor: "bg-gradient-to-br from-purple-500 to-purple-600",
  },
]

const developmentEngineers: Engineer[] = [
  {
    id: "4",
    name: "Chandani",
    role: "Frontend Developer",
    type: "development",
    status: "away",
    lastSeen: "Last seen 0:00",
    runningTasks: 2,
    completedTasks: 0,
    codeQuality: 85,
    currentSprint: "Sprint 12",
    specialization: "React.js",
    specializationColor: "bg-pink-100 text-pink-800",
    avatarColor: "bg-gradient-to-br from-pink-500 to-rose-600",
  },
  {
    id: "5",
    name: "Mayur",
    role: "Full Stack Developer",
    type: "development",
    status: "online",
    lastSeen: "Active for 1:12",
    runningTasks: 4,
    completedTasks: 2,
    codeQuality: 92,
    currentSprint: "Sprint 12",
    specialization: "Node.js",
    specializationColor: "bg-blue-100 text-blue-800",
    avatarColor: "bg-gradient-to-br from-blue-500 to-indigo-600",
  },
  {
    id: "6",
    name: "Purva",
    role: "Backend Developer",
    type: "development",
    status: "online",
    lastSeen: "Active for 0:50",
    runningTasks: 5,
    completedTasks: 1,
    codeQuality: 88,
    currentSprint: "Sprint 12",
    specialization: "Python",
    specializationColor: "bg-green-100 text-green-800",
    avatarColor: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  {
    id: "7",
    name: "Priya",
    role: "UI/UX Developer",
    type: "development",
    status: "offline",
    lastSeen: "Last seen 0:00",
    runningTasks: 0,
    completedTasks: 0,
    codeQuality: 90,
    currentSprint: "Sprint 12",
    specialization: "Design",
    specializationColor: "bg-purple-100 text-purple-800",
    avatarColor: "bg-gradient-to-br from-purple-500 to-violet-600",
  },
]

export const useEngineerStore = create<EngineerStore>()(
  persist(
    (set, get) => ({
      supportEngineers,
      developmentEngineers,
      engineers: [...supportEngineers, ...developmentEngineers],

      addEngineer: (engineer) => {
        const newEngineer: Engineer = {
          ...engineer,
          id: Math.random().toString(36).substr(2, 9),
        }
        set((state) => ({
          engineers: [...state.engineers, newEngineer],
        }))
      },

      updateEngineer: (id, updates) => {
        set((state) => ({
          engineers: state.engineers.map((engineer) => (engineer.id === id ? { ...engineer, ...updates } : engineer)),
        }))
      },

      deleteEngineer: (id) => {
        set((state) => ({
          engineers: state.engineers.filter((engineer) => engineer.id !== id),
        }))
      },

      getActiveEngineers: () => {
        return get().engineers.filter((engineer) => engineer.status === "online")
      },

      getSupportEngineers: () => {
        return get().engineers.filter((engineer) => engineer.type === "support")
      },

      getDevelopmentEngineers: () => {
        return get().engineers.filter((engineer) => engineer.type === "development")
      },

      getSupportStats: () => {
        const supportEngineers = get().engineers.filter((e) => e.type === "support")
        const activeEngineers = supportEngineers.filter((e) => e.status === "online").length
        const activeTasks = supportEngineers.reduce((sum, e) => sum + e.runningTasks, 0)
        const resolvedToday = supportEngineers.reduce((sum, e) => sum + (e.resolvedTasks || 0), 0)

        return {
          activeEngineers,
          activeTasks,
          resolvedToday,
          avgResponseTime: "2.8h",
        }
      },

      getDevelopmentStats: () => {
        const devEngineers = get().engineers.filter((e) => e.type === "development")
        const activeDevelopers = devEngineers.filter((e) => e.status === "online").length
        const activeProjects = devEngineers.reduce((sum, e) => sum + e.runningTasks, 0)
        const completedToday = devEngineers.reduce((sum, e) => sum + (e.completedTasks || 0), 0)

        return {
          activeDevelopers,
          activeProjects,
          completedToday,
          avgDevTime: "4.2h",
        }
      },
    }),
    {
      name: "engineer-store",
    },
  ),
)
