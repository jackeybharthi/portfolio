import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qbsawbvyquszckkwjmgj.supabase.co'
const supabaseKey = 'sb_publishable_xXmlnUx7ZPmhHu9phpqG-g_OHcL1u8o'

export const supabase = createClient(supabaseUrl, supabaseKey)
