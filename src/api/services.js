import { supabase } from '../lib/supabaseClient';

// Get all active services
export const getServices = async () => {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
};

// Get service by ID
export const getServiceById = async (id) => {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

// Admin: Get all services (including inactive)
export const getAllServices = async () => {
    const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
};

// Admin: Create service
export const createService = async (serviceData) => {
    const { data, error } = await supabase
        .from('services')
        .insert([serviceData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Update service
export const updateService = async (id, serviceData) => {
    const { data, error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Delete service
export const deleteService = async (id) => {
    const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// Admin: Reorder services
export const reorderServices = async (services) => {
    const updates = services.map((service, index) => ({
        id: service.id,
        display_order: index,
    }));

    const { error } = await supabase
        .from('services')
        .upsert(updates);

    if (error) throw error;
};
