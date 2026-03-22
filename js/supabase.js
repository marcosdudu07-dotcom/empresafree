import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = "https://ynemvsrzfqdszbbqxuzd.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1d8Il1RkaqcniKvWB9EQuA_YeS12A6z";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);