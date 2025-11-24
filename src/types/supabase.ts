export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    first_name: string | null
                    last_name: string | null
                    role: 'buyer' | 'admin' | 'agent'
                    created_at: string
                }
                Insert: {
                    id: string
                    first_name?: string | null
                    last_name?: string | null
                    role?: 'buyer' | 'admin' | 'agent'
                    created_at?: string
                }
                Update: {
                    id?: string
                    first_name?: string | null
                    last_name?: string | null
                    role?: 'buyer' | 'admin' | 'agent'
                    created_at?: string
                }
            }
            companies: {
                Row: {
                    id: string
                    name: string
                    website: string | null
                    country: string | null
                    size: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    website?: string | null
                    country?: string | null
                    size?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    website?: string | null
                    country?: string | null
                    size?: string | null
                    created_at?: string
                }
            }
            rfis: {
                Row: {
                    id: string
                    company_id: string | null
                    created_by: string | null
                    status: 'draft' | 'submitted' | 'in_review' | 'sent_to_suppliers' | 'closed'
                    product_name: string | null
                    requirements: string | null
                    estimated_volume: string | null
                    volume_unit: string | null
                    destination_markets: string[] | null
                    guidance_price: string | null
                    annual_volume: string | null
                    timeline: string | null
                    ai_status: 'checked' | 'needs_clarification' | 'pending'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    company_id?: string | null
                    created_by?: string | null
                    status?: 'draft' | 'submitted' | 'in_review' | 'sent_to_suppliers' | 'closed'
                    product_name?: string | null
                    requirements?: string | null
                    estimated_volume?: string | null
                    volume_unit?: string | null
                    destination_markets?: string[] | null
                    guidance_price?: string | null
                    annual_volume?: string | null
                    timeline?: string | null
                    ai_status?: 'checked' | 'needs_clarification' | 'pending'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    company_id?: string | null
                    created_by?: string | null
                    status?: 'draft' | 'submitted' | 'in_review' | 'sent_to_suppliers' | 'closed'
                    product_name?: string | null
                    requirements?: string | null
                    estimated_volume?: string | null
                    volume_unit?: string | null
                    destination_markets?: string[] | null
                    guidance_price?: string | null
                    annual_volume?: string | null
                    timeline?: string | null
                    ai_status?: 'checked' | 'needs_clarification' | 'pending'
                    created_at?: string
                    updated_at?: string
                }
            }
            attachments: {
                Row: {
                    id: string
                    rfi_id: string | null
                    file_url: string
                    file_type: string | null
                    file_name: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    rfi_id?: string | null
                    file_url: string
                    file_type?: string | null
                    file_name?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    rfi_id?: string | null
                    file_url?: string
                    file_type?: string | null
                    file_name?: string | null
                    created_at?: string
                }
            }
        }
    }
}
