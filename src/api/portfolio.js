import { supabase } from '../lib/supabaseClient';

// Get all portfolio items
export const getPortfolioItems = async () => {
    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
};

// Get featured portfolio items
export const getFeaturedPortfolioItems = async () => {
    const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true });

    if (error) throw error;
    return data;
};

// Admin: Upload image to Supabase Storage
export const uploadPortfolioImage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    const { data, error } = await supabase.storage
        .from('portfolio')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false,
        });

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
        .from('portfolio')
        .getPublicUrl(filePath);

    return { path: filePath, url: publicUrl };
};

// Admin: Create portfolio item
export const createPortfolioItem = async (itemData) => {
    const { data, error } = await supabase
        .from('portfolio_items')
        .insert([itemData])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Update portfolio item
export const updatePortfolioItem = async (id, itemData) => {
    const { data, error } = await supabase
        .from('portfolio_items')
        .update(itemData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Delete portfolio item
export const deletePortfolioItem = async (id, imagePath) => {
    // Delete from storage if path provided
    if (imagePath) {
        await supabase.storage
            .from('portfolio')
            .remove([imagePath]);
    }

    // Delete from database
    const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// Admin: Reorder portfolio items
export const reorderPortfolioItems = async (items) => {
    const updates = items.map((item, index) => ({
        id: item.id,
        display_order: index,
    }));

    const { error } = await supabase
        .from('portfolio_items')
        .upsert(updates);

    if (error) throw error;
};
