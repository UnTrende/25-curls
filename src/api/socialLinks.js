import { supabase } from '../lib/supabaseClient';

// Get all active social links
export const getSocialLinks = async () => {
    const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
};

// Admin: Get all social links (including inactive)
export const getAllSocialLinks = async () => {
    const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
};

// Admin: Create social link
export const createSocialLink = async (linkData) => {
    const { data, error } = await supabase
        .from('social_links')
        .insert([linkData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Update social link
export const updateSocialLink = async (id, linkData) => {
    const { data, error } = await supabase
        .from('social_links')
        .update(linkData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Delete social link
export const deleteSocialLink = async (id) => {
    const { error } = await supabase
        .from('social_links')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// Admin: Reorder social links
export const reorderSocialLinks = async (links) => {
    const updates = links.map((link, index) => ({
        id: link.id,
        display_order: index,
    }));

    const { error } = await supabase
        .from('social_links')
        .upsert(updates);

    if (error) throw error;
};

// Admin: Toggle social link active status
export const toggleSocialLinkStatus = async (id, isActive) => {
    const { data, error } = await supabase
        .from('social_links')
        .update({ is_active: isActive })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};
