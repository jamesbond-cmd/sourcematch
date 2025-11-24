// Test Supabase connection
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ospcvzqbzrjrtgkhmrfr.supabase.co'
const supabaseKey = 'sb_publishable_isxX-87NPwgEIpTCzRbXog_IsnlK-mM'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log('Testing Supabase connection...')
    console.log('URL:', supabaseUrl)

    try {
        // Test 1: Check if we can connect
        const { data, error } = await supabase.from('profiles').select('count').limit(1)

        if (error) {
            console.error('❌ Connection failed:', error.message)
            console.error('Error details:', error)
            return false
        }

        console.log('✅ Connection successful!')
        console.log('Response:', data)

        // Test 2: Check auth
        const { data: { session }, error: authError } = await supabase.auth.getSession()
        console.log('Auth session:', session ? 'Active' : 'No session')

        return true
    } catch (err) {
        console.error('❌ Unexpected error:', err)
        return false
    }
}

testConnection()
