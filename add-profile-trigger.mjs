import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ospcvzqbzrjrtgkhmrfr.supabase.co'
const supabaseKey = 'sb_publishable_isxX-87NPwgEIpTCzRbXog_IsnlK-mM'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('📝 Please run this SQL in your Supabase SQL Editor:')
console.log('https://supabase.com/dashboard/project/ospcvzqbzrjrtgkhmrfr/sql/new')
console.log('')
console.log('Copy and paste this SQL:')
console.log('='.repeat(60))
console.log(`
-- Create a function to handle new user signups
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'role', 'buyer')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to automatically create a profile on user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
`)
console.log('='.repeat(60))
console.log('')
console.log('After running this, new signups will automatically create profiles!')
