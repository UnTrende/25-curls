import { supabase } from '../lib/supabaseClient';

// Create contact message
export const createContactMessage = async (messageData) => {
    const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
            ...messageData,
            status: 'new',
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Get all contact messages
export const getContactMessages = async (filters = {}) => {
    let query = supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters.status) {
        query = query.eq('status', filters.status);
    }

    if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

// Admin: Get message by ID
export const getMessageById = async (id) => {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

// Admin: Update message status
export const updateMessageStatus = async (id, status) => {
    const { data, error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Delete message
export const deleteMessage = async (id) => {
    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// Admin: Bulk update status
export const bulkUpdateMessageStatus = async (ids, status) => {
    const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .in('id', ids);

    if (error) throw error;
};

// Admin: Bulk delete messages
export const bulkDeleteMessages = async (ids) => {
    const { error } = await supabase
        .from('contact_messages')
        .delete()
        .in('id', ids);

    if (error) throw error;
};

// Get messages stats
export const getMessagesStats = async () => {
    const { data, error } = await supabase
        .from('contact_messages')
        .select('status');

    if (error) throw error;

    return {
        total: data.length,
        new: data.filter(m => m.status === 'new').length,
        read: data.filter(m => m.status === 'read').length,
        replied: data.filter(m => m.status === 'replied').length,
        archived: data.filter(m => m.status === 'archived').length,
    };
};
