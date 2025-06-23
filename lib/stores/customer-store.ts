import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  industry: string
  type: "premium" | "standard" | "trial"
  status: "active" | "inactive" | "suspended"
  totalComplaints: number
  resolvedComplaints: number
  lastActivity: string
  createdAt: string
}

interface CustomerStore {
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, "id" | "createdAt">) => void
  updateCustomer: (id: string, updates: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
  getCustomerStats: () => {
    total: number
    active: number
    newThisMonth: number
    premium: number
  }
}

const sampleCustomers: Customer[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Inc.",
    industry: "Technology",
    type: "premium",
    status: "active",
    totalComplaints: 3,
    resolvedComplaints: 2,
    lastActivity: "2 hours ago",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@designstudio.com",
    phone: "+1 (555) 987-6543",
    company: "Design Studio",
    industry: "Creative Agency",
    type: "standard",
    status: "active",
    totalComplaints: 1,
    resolvedComplaints: 0,
    lastActivity: "1 day ago",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.j@startup.io",
    phone: "+1 (555) 456-7890",
    company: "Startup.io",
    industry: "Software",
    type: "trial",
    status: "inactive",
    totalComplaints: 0,
    resolvedComplaints: 0,
    lastActivity: "3 days ago",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah.w@enterprise.com",
    phone: "+1 (555) 321-0987",
    company: "Enterprise Corp",
    industry: "Manufacturing",
    type: "premium",
    status: "suspended",
    totalComplaints: 5,
    resolvedComplaints: 3,
    lastActivity: "1 week ago",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      customers: sampleCustomers,
      
      addCustomer: (customer) => {
        const newCustomer: Customer = {
          ...customer,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString()
        }
        set((state) => ({
          customers: [newCustomer, ...state.customers]
        }))
      },
      
      updateCustomer: (id, updates) => {
        set((state) => ({
          customers: state.customers.map((customer) =>
            customer.id === id ? { ...customer, ...updates } : customer
          )
        }))
      },
      
      deleteCustomer: (id) => {
        set((state) => ({
          customers: state.customers.filter((customer) => customer.id !== id)
        }))
      },
      getCustomerStats: () => {
        const total = get().customers.length
        const active = get().customers.filter((c) => c.status === "active").length
        const newThisMonth = get().customers.filter(
          (c) => new Date(c.createdAt).getMonth() === new Date().getMonth()
        ).length
        const premium = get().customers.filter((c) => c.type === "premium").length

        return {
          total,
          active,
          newThisMonth,
          premium
        }
      }
    }),
    {
      name: "customer-store",
      // getStorage: () => localStorage, // Use localStorage for persistence
      partialize: (state) => ({
        customers: state.customers.map(({ id, name, email, phone, company, industry, type, status, totalComplaints, resolvedComplaints, lastActivity, createdAt }) => ({
          id,
          name,
          email,
          phone,
          company,
          industry,
          type,
          status,
          totalComplaints,
          resolvedComplaints,
          lastActivity,
          createdAt
        }))
      })
    }
  )
)
export const useCustomerActions = () => {
  const addCustomer = useCustomerStore((state) => state.addCustomer);
  const updateCustomer = useCustomerStore((state) => state.updateCustomer);
  const deleteCustomer = useCustomerStore((state) => state.deleteCustomer);
  const getCustomerStats = useCustomerStore((state) => state.getCustomerStats);

  return {
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomerStats
  };
}
export const useCustomerList = () => {
  const customers = useCustomerStore((state) => state.customers);
  const getCustomerStats = useCustomerStore((state) => state.getCustomerStats);

  return {
    customers,
    getCustomerStats
  };
}
export const useCustomerById = (id: string) => {
  const customer = useCustomerStore((state) =>
    state.customers.find((c) => c.id === id)
  );

  return customer;
}
export const useCustomerCount = () => {
  const customers = useCustomerStore((state) => state.customers);
  return customers.length;
}
export const useCustomerStats = () => {
  const getCustomerStats = useCustomerStore((state) => state.getCustomerStats);
  return getCustomerStats();
}

export const useCustomerTypes = () => {
  const customers = useCustomerStore((state) => state.customers);
  const types = Array.from(new Set(customers.map((c) => c.type)));
  return types;
}
export const useCustomerStatuses = () => {
  const customers = useCustomerStore((state) => state.customers);
  const statuses = Array.from(new Set(customers.map((c) => c.status)));
  return statuses;
}
export const useCustomerIndustries = () => {
  const customers = useCustomerStore((state) => state.customers);
  const industries = Array.from(new Set(customers.map((c) => c.industry)));
  return industries;
}
export const useCustomerCompanies = () => {
  const customers = useCustomerStore((state) => state.customers);
  const companies = Array.from(new Set(customers.map((c) => c.company)));
  return companies;
}
export const useCustomerEmails = () => {
  const customers = useCustomerStore((state) => state.customers);
  const emails = Array.from(new Set(customers.map((c) => c.email)));
  return emails;
}
export const useCustomerPhones = () => {
  const customers = useCustomerStore((state) => state.customers);
  const phones = Array.from(new Set(customers.map((c) => c.phone)));
  return phones;
}
export const useCustomerNames = () => {
  const customers = useCustomerStore((state) => state.customers);
  const names = Array.from(new Set(customers.map((c) => c.name)));
  return names;
}
export const useCustomerCreatedAt = () => {
  const customers = useCustomerStore((state) => state.customers);
  const createdAt = Array.from(new Set(customers.map((c) => c.createdAt)));
  return createdAt;
}
export const useCustomerLastActivity = () => {
  const customers = useCustomerStore((state) => state.customers);
  const lastActivity = Array.from(new Set(customers.map((c) => c.lastActivity)));
  return lastActivity;
}
export const useCustomerTotalComplaints = () => {
  const customers = useCustomerStore((state) => state.customers);
  const totalComplaints = Array.from(new Set(customers.map((c) => c.totalComplaints)));
  return totalComplaints;
}
export const useCustomerResolvedComplaints = () => {
  const customers = useCustomerStore((state) => state.customers);
  const resolvedComplaints = Array.from(new Set(customers.map((c) => c.resolvedComplaints)));
  return resolvedComplaints;
}
export const useCustomerByType = (type: "premium" | "standard" | "trial") => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.type === type)
  );
  return customers;
}
export const useCustomerByStatus = (status: "active" | "inactive" | "suspended") => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.status === status)
  );
  return customers;
}
export const useCustomerByIndustry = (industry: string) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.industry === industry)
  );
  return customers;
}
export const useCustomerByCompany = (company: string) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.company === company)
  );
  return customers;
}
export const useCustomerByEmail = (email: string) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.email === email)
  );
  return customers;
}
export const useCustomerByPhone = (phone: string) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.phone === phone)
  );
  return customers;
}
export const useCustomerByName = (name: string) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.name === name)
  );
  return customers;
}
export const useCustomerByCreatedAt = (createdAt: string) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.createdAt === createdAt)
  );
  return customers;
}
export const useCustomerByLastActivity = (lastActivity: string) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.lastActivity === lastActivity)
  );
  return customers;
}
export const useCustomerByTotalComplaints = (totalComplaints: number) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.totalComplaints === totalComplaints)
  );
  return customers;
}
export const useCustomerByResolvedComplaints = (resolvedComplaints: number) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter((c) => c.resolvedComplaints === resolvedComplaints)
  );
  return customers;
}
export const useCustomerByIdOrEmail = (idOrEmail: string) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter(
      (c) => c.id === idOrEmail || c.email === idOrEmail
    )
  );
  return customers;
}
export const useCustomerByIdOrPhone = (idOrPhone: string) => {
  const customers = useCustomerStore((state) =>
    state.customers.filter(
      (c) => c.id === idOrPhone || c.phone === idOrPhone
    )
  );
  return customers;
}