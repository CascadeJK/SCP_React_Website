import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slapmdchskufpvrvjdqi.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsYXBtZGNoc2t1ZnB2cnZqZHFpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNTkyMTcyMCwiZXhwIjoyMDQxNDk3NzIwfQ.ULG2ik62qyD-oofRRNnwbypc7BFSw4dPzVNv7tZFS3w';
export const supabase = createClient(supabaseUrl, supabaseKey);