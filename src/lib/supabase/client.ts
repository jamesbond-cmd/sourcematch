import { createBrowserClient } from "@supabase/ssr"

export interface RFI {
    id?: string
    product_name: string
    status?: string
    requirements: string
    estimated_volume: string
    annual_volume?: string
    target_price: string
    guidance_price?: string
    timeline: string
    destination_markets: string[]
    created_by?: string
    company_id?: string
    volume_unit?: string
    product_description?: string
    ai_status?: string
    [key: string]: unknown
}

export interface Company {
    id?: string
    name: string
    website?: string
    industry?: string
    description?: string
    size?: string
    country?: string
    [key: string]: unknown
}

export interface Profile {
    id: string
    email: string
    full_name?: string
    first_name?: string
    last_name?: string
    phone?: string
    terms_accepted?: boolean
    role?: string
    company_id?: string
    [key: string]: unknown
}

export interface Attachment {
    id?: string
    rfi_id: string
    file_name: string
    file_path: string
    file_size: number
    file_type: string
    file_url: string
    [key: string]: unknown
}

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey || supabaseUrl === 'https://your-project.supabase.co') {
        console.warn("Supabase credentials missing. Using mock client.")
        return {
            auth: {
                getSession: () => Promise.resolve({ data: { session: null }, error: null }),
                onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
                getUser: () => Promise.resolve({ data: { user: null }, error: null }),
                signInWithPassword: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
                signUp: () => Promise.resolve({ error: { message: "Supabase not configured" } }),
                signOut: () => Promise.resolve({ error: null }),
            },
            from: () => ({
                select: () => ({
                    eq: () => ({
                        single: () => Promise.resolve({ data: null, error: null }),
                        order: () => Promise.resolve({ data: [], error: null }),
                    }),
                    single: () => Promise.resolve({ data: null, error: null }),
                    order: () => Promise.resolve({ data: [], error: null }),
                }),
                insert: () => ({
                    select: () => ({
                        single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
                    }),
                }),
                update: () => ({
                    eq: () => ({
                        select: () => ({
                            single: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
                        }),
                    }),
                }),
            }),
            storage: {
                from: () => ({
                    upload: () => Promise.resolve({ data: null, error: { message: "Supabase not configured" } }),
                    getPublicUrl: () => ({ data: { publicUrl: "" } }),
                }),
            },
        } as unknown as ReturnType<typeof createBrowserClient>
    }

    return createBrowserClient(supabaseUrl, supabaseKey)
}

// Helper functions for common operations
export const supabaseClient = {
    get supabase() {
        return createClient()
    },

    // RFI operations
    async createRFI(data: RFI) {
        const supabase = createClient()
        const { data: rfi, error } = await supabase
            .from("rfis")
            .insert(data)
            .select()
            .single()

        if (error) throw error
        return rfi
    },

    async getRFIs(userId: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("rfis")
            .select(`
                *,
                companies (*),
                attachments (*)
            `)
            .eq("created_by", userId)
            .order("created_at", { ascending: false })

        if (error) throw error
        return data
    },

    async getRFIById(id: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("rfis")
            .select(`
                *,
                companies (*),
                attachments (*),
                messages (*, profiles (*))
            `)
            .eq("id", id)
            .single()

        if (error) throw error
        return data as RFI
    },

    async updateRFI(id: string, updates: Partial<RFI>) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("rfis")
            .update(updates)
            .eq("id", id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Company operations
    async createCompany(data: Company) {
        const supabase = createClient()
        const { data: company, error } = await supabase
            .from("companies")
            .insert(data)
            .select()
            .single()

        if (error) throw error
        return company
    },

    // Profile operations
    async createProfile(data: Profile) {
        const supabase = createClient()
        const { data: profile, error } = await supabase
            .from("profiles")
            .insert(data)
            .select()
            .single()

        if (error) throw error
        return profile
    },

    async getProfile(userId: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", userId)
            .single()

        if (error) throw error
        return data
    },

    // Message operations
    async sendMessage(rfiId: string, senderId: string, text: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("messages")
            .insert({
                rfi_id: rfiId,
                sender_id: senderId,
                text
            })
            .select()
            .single()

        if (error) throw error
        return data
    },

    async getMessages(rfiId: string) {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("messages")
            .select(`
                *,
                profiles (*)
            `)
            .eq("rfi_id", rfiId)
            .order("created_at", { ascending: true })

        if (error) throw error
        return data
    },

    // File upload
    async uploadFile(bucket: string, path: string, file: File) {
        const supabase = createClient()
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(path, file)

        if (error) throw error
        return data
    },

    async getFileUrl(bucket: string, path: string) {
        const supabase = createClient()
        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(path)

        return data.publicUrl
    },

    // Attachment operations
    async createAttachment(data: Attachment) {
        const supabase = createClient()
        const { data: attachment, error } = await supabase
            .from("attachments")
            .insert(data)
            .select()
            .single()

        if (error) throw error
        return attachment
    }
}
