export interface Medicine {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  image?: string;
}

export interface CartItem {
  id: number;
  medicine?: Medicine;
  quantity: number;
  price?: number;
  name?: string;
  image?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: string;
  createdAt: string;
}

export interface BloodDonor {
  id: number;
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  age: number;
  weight: number;
  lastDonation?: string;
}

export interface BloodRequest {
  id: number;
  patientName: string;
  bloodGroup: string;
  unitsNeeded: number;
  urgency: 'low' | 'medium' | 'high';
  hospital: string;
  contactPhone: string;
  status: 'pending' | 'fulfilled' | 'cancelled';
}
