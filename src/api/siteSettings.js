import { supabase } from '../lib/supabaseClient';

// Get site settings by category
export const getSettings = async (category = null) => {
    let query = supabase
        .from('site_settings')
        .select('*');

    if (category) {
        query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

// Get setting by key
export const getSetting = async (key) => {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', key)
        .single();

    if (error) throw error;
    return data;
};

// Get contact information
export const getContactInfo = async () => {
    const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('category', 'contact');

    if (error) throw error;

    // Convert array to object
    const contactInfo = {};
    data.forEach(setting => {
        contactInfo[setting.key] = setting.value;
    });

    return contactInfo;
};

// Admin: Update setting
export const updateSetting = async (key, value) => {
    const { data, error } = await supabase
        .from('site_settings')
        .upsert({
            key,
            value,
            updated_at: new Date().toISOString(),
        })
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Update contact information
export const updateContactInfo = async (contactData) => {
    const updates = Object.entries(contactData).map(([key, value]) => ({
        key,
        value,
        category: 'contact',
    }));

    const { error } = await supabase
        .from('site_settings')
        .upsert(updates);

    if (error) throw error;
};

// Admin: Create setting
export const createSetting = async (key, value, category) => {
    const { data, error } = await supabase
        .from('site_settings')
        .insert([{
            key,
            value,
            category,
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Delete setting
export const deleteSetting = async (key) => {
    const { error } = await supabase
        .from('site_settings')
        .delete()
        .eq('key', key);

    if (error) throw error;
};
