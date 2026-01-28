import { supabase } from '../lib/supabaseClient';

// Create a new booking
export const createBooking = async (bookingData) => {
    const { data, error } = await supabase
        .from('bookings')
        .insert([{
            ...bookingData,
            status: 'pending',
        }])
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Get booking by ID
export const getBookingById = async (id) => {
    const { data, error } = await supabase
        .from('bookings')
        .select(`
      *,
      service:services(*)
    `)
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
};

// Admin: Get all bookings with filters
export const getBookings = async (filters = {}) => {
    let query = supabase
        .from('bookings')
        .select(`
      *,
      service:services(name, price)
    `)
        .order('booking_date', { ascending: false })
        .order('booking_time', { ascending: false });

    // Apply filters
    if (filters.status) {
        query = query.eq('status', filters.status);
    }

    if (filters.startDate) {
        query = query.gte('booking_date', filters.startDate);
    }

    if (filters.endDate) {
        query = query.lte('booking_date', filters.endDate);
    }

    if (filters.search) {
        query = query.or(`customer_name.ilike.%${filters.search}%,customer_email.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
};

// Admin: Update booking status
export const updateBookingStatus = async (id, status, adminNotes = null) => {
    const updateData = { status };
    if (adminNotes !== null) {
        updateData.admin_notes = adminNotes;
    }

    const { data, error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Update booking
export const updateBooking = async (id, bookingData) => {
    const { data, error } = await supabase
        .from('bookings')
        .update(bookingData)
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Cancel booking
export const cancelBooking = async (id) => {
    const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .select()
        .single();

    if (error) throw error;
    return data;
};

// Admin: Delete booking
export const deleteBooking = async (id) => {
    const { error } = await supabase
        .from('bookings')
        .delete()
        .eq('id', id);

    if (error) throw error;
};

// Get bookings count by status
export const getBookingsStats = async () => {
    const { data, error } = await supabase
        .from('bookings')
        .select('status');

    if (error) throw error;

    const stats = {
        total: data.length,
        pending: data.filter(b => b.status === 'pending').length,
        confirmed: data.filter(b => b.status === 'confirmed').length,
        completed: data.filter(b => b.status === 'completed').length,
        cancelled: data.filter(b => b.status === 'cancelled').length,
    };

    return stats;
};

// Check available time slots for a date
export const getAvailableSlots = async (date) => {
    const { data, error } = await supabase
        .from('bookings')
        .select('booking_time')
        .eq('booking_date', date)
        .in('status', ['pending', 'confirmed']);

    if (error) throw error;

    const bookedSlots = data.map(b => b.booking_time);

    // All possible time slots
    const allSlots = [
        '09:00:00', '10:00:00', '11:00:00', '12:00:00',
        '13:00:00', '14:00:00', '15:00:00', '16:00:00',
        '17:00:00', '18:00:00'
    ];

    return allSlots.filter(slot => !bookedSlots.includes(slot));
};
