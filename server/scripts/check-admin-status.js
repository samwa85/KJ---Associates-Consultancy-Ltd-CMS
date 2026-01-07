
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUser() {
    const email = 'admin@kjconsultancy.co.tz';
    const password = 'qwerty7890@';

    console.log(`Checking user ${email}...`);

    // 1. Try to sign up (updates user if exists, or sends email)
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: 'admin',
                name: 'CMS Administrator'
            }
        }
    });

    if (signUpError) {
        console.log('Signup attempt message:', signUpError.message);
    } else {
        console.log('Signup attempt success (or confirmation sent).');
    }

    // 2. Try to sign in
    console.log('\nAttempting to sign in...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (signInError) {
        console.error('❌ Sign In failed:', signInError.message);
        if (signInError.message.includes('Email not confirmed')) {
            console.log('\n👉 ACTION REQUIRED: Email confirmation is required.');
            console.log('   Please check your email inbox (and spam) for a link from Supabase.');
            console.log('   Once confirmed, you will be able to log in with password: ' + password);
        }
    } else {
        console.log('✅ Sign In successful! Account is active.');
        console.log('   You can now log into the CMS with the configured password.');
    }
}

checkUser();
