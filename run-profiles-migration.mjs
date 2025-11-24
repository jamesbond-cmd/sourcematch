import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const migrationSQL = readFileSync('./supabase/migrations/20240522000003_fix_profiles_schema.sql', 'utf8')

console.log('Running migration...')
console.log(migrationSQL)

const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL })

if (error) {
    console.error('Migration failed:', error)
    process.exit(1)
}

console.log('Migration completed successfully!')
console.log(data)
