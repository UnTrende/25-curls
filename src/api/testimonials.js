import { supabase } from '../lib/supabaseClient';

// Get all approved testimonials
export const getApprovedTestimonials = async () => {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
};

// Admin: Get all testimonials
export const getAllTestimonials = async (filters = {}) => {
    let query = supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (filters.approved !== undefined) {
        query = query.eq('is_approved', filters.approved);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

// Create testimonial (public submission)
export const createTestimonial = async (testimonialData) => {
    const { data, error } = await supabase
        .from('testimonials')
        .insert([{
            ...testimonialData,
            is_approved: false, // Requires admin approval
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Create testimonial (auto-approved)
export const createTestimonialAdmin = async (testimonialData) => {
    const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonialData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Update testimonial
export const updateTestimonial = async (id, testimonialData) => {
    const { data, error } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Approve testimonial
export const approveTestimonial = async (id) => {
    const { data, error } = await supabase
        .from('testimonials')
        .update({ is_approved: true })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Reject testimonial
export const rejectTestimonial = async (id) => {
    const { data, error } = await supabase
        .from('testimonials')
        .update({ is_approved: false })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Delete testimonial
export const deleteTestimonial = async (id) => {
    const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// Admin: Reorder testimonials
export const reorderTestimonials = async (testimonials) => {
    const updates = testimonials.map((testimonial, index) => ({
        id: testimonial.id,
        display_order: index,
    }));

    const { error } = await supabase
        .from('testimonials')
        .upsert(updates);

    if (error) throw error;
};

// Get testimonials stats
export const getTestimonialsStats = async () => {
    const { data, error } = await supabase
        .from('testimonials')
        .select('is_approved');

    if (error) throw error;

    return {
        total: data.length,
        approved: data.filter(t => t.is_approved).length,
        pending: data.filter(t => !t.is_approved).length,
    };
};
