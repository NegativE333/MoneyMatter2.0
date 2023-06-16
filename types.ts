import Stripe from "stripe";

export interface Exp {
    id: string;
    user_id: string;
    title: string;
    amount: string;
    created_at: string;
}

export interface ExpTotal{
    total: string;
}

export interface Reminder{
    id: string;
    user_id: string;
    type: string;
    name: string;
    for: string;
    amount: string;
    created_at: string;
}

export interface Available{
    id: string;
    user_id: string;
    amount: number;
}

export interface Expense{
    id: string;
    created_at: string;
    title: string;
    amount: string;
    user_id: string;
}

export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name?: string;
    avatar_url?: string;
    billing_address?: Stripe.Address;
    payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
    avail: number;
  }