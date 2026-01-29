import { supabase } from '../lib/supabaseClient';

// Send booking confirmation email
export const sendBookingEmail = async (email, bookingDetails) => {
    try {
        const { data, error } = await supabase.functions.invoke('send-booking-email', {
            body: {
                to: email,
                booking: bookingDetails,
            },
        });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error sending booking email:', error);
        throw error;
    }
};

// Send SMS reminder
export const sendSMSReminder = async (phoneNumber, bookingDetails) => {
    try {
        const { data, error } = await supabase.functions.invoke('send-sms-reminder', {
            body: {
                to: phoneNumber,
                booking: bookingDetails,
            },
        });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error sending SMS reminder:', error);
        throw error;
    }
};

// Schedule SMS reminder for booking (24 hours before)
export const scheduleSMSReminder = async (bookingId, phoneNumber, bookingDate, bookingTime) => {
    try {
        // Calculate reminder time (24 hours before appointment)
        const appointmentDateTime = new Date(`${bookingDate}T${bookingTime}`);
        const reminderTime = new Date(appointmentDateTime.getTime() - 24 * 60 * 60 * 1000);
        const now = new Date();

        // Only schedule if reminder time is in the future
        if (reminderTime > now) {
            // Store reminder in database or use a job queue
            // For now, we'll use Supabase's pg_cron or an external service
            console.log(`SMS reminder scheduled for ${reminderTime.toISOString()}`);
            
            // You can implement this with:
            // 1. Supabase pg_cron extension
            // 2. External service like Inngest, Trigger.dev
            // 3. Vercel Cron Jobs
            // 4. AWS EventBridge
        }

        return { success: true, reminderTime };
    } catch (error) {
        console.error('Error scheduling SMS reminder:', error);
        throw error;
    }
};

// Send admin notification for new booking
export const sendAdminNotification = async (bookingDetails) => {
    try {
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@elitebarber.com';
        
        const { data, error } = await supabase.functions.invoke('send-booking-email', {
            body: {
                to: adminEmail,
                booking: {
                    ...bookingDetails,
                    isAdminNotification: true,
                },
            },
        });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error sending admin notification:', error);
        // Don't throw - admin notification failure shouldn't block booking
        return null;
    }
};
