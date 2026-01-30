import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createBooking } from '../api/bookings';
import { supabase } from '../lib/supabaseClient';

describe('Booking Race Condition Protection', () => {
    const testBookingData = {
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        customer_phone: '555-0100',
        service_id: null, // Will be set in beforeAll
        booking_date: '2026-03-15',
        booking_time: '14:00:00',
        address: '123 Test Street',
        age_group: 'Adults (20-59)',
        notes: 'Race condition test booking'
    };

    let createdBookingIds = [];

    beforeAll(async () => {
        // Get a valid service ID for testing
        const { data: services } = await supabase
            .from('services')
            .select('id')
            .limit(1);

        if (services && services.length > 0) {
            testBookingData.service_id = services[0].id;
        }
    });

    afterAll(async () => {
        // Clean up test bookings
        if (createdBookingIds.length > 0) {
            await supabase
                .from('bookings')
                .delete()
                .in('id', createdBookingIds);
        }
    });

    it('should prevent double booking when simultaneous requests occur', async () => {
        // Simulate two simultaneous booking requests for the same time slot
        const results = await Promise.allSettled([
            createBooking(testBookingData),
            createBooking(testBookingData),
        ]);

        // One should succeed, one should fail
        const successful = results.filter(r => r.status === 'fulfilled');
        const failed = results.filter(r => r.status === 'rejected');

        expect(successful.length).toBe(1);
        expect(failed.length).toBe(1);

        // Store successful booking ID for cleanup
        if (successful[0].status === 'fulfilled') {
            createdBookingIds.push(successful[0].value.id);
        }

        // Verify the failed request has the correct error
        const failedResult = failed[0];
        expect(failedResult.status).toBe('rejected');
        expect(failedResult.reason.message).toBe('SLOT_UNAVAILABLE');
    });

    it('should allow booking the same slot after cancellation', async () => {
        const bookingData = {
            ...testBookingData,
            booking_time: '15:00:00' // Different time to avoid conflict
        };

        // Create first booking
        const firstBooking = await createBooking(bookingData);
        createdBookingIds.push(firstBooking.id);

        // Cancel the first booking
        await supabase
            .from('bookings')
            .update({ status: 'cancelled' })
            .eq('id', firstBooking.id);

        // Should be able to book the same slot again
        const secondBooking = await createBooking(bookingData);
        createdBookingIds.push(secondBooking.id);

        expect(secondBooking).toBeDefined();
        expect(secondBooking.id).not.toBe(firstBooking.id);
    });

    it('should allow multiple cancelled bookings for the same slot', async () => {
        const bookingData = {
            ...testBookingData,
            booking_time: '16:00:00'
        };

        // Create and cancel first booking
        const first = await createBooking(bookingData);
        createdBookingIds.push(first.id);
        await supabase
            .from('bookings')
            .update({ status: 'cancelled' })
            .eq('id', first.id);

        // Create and cancel second booking
        const second = await createBooking(bookingData);
        createdBookingIds.push(second.id);
        await supabase
            .from('bookings')
            .update({ status: 'cancelled' })
            .eq('id', second.id);

        // Verify both exist as cancelled
        const { data } = await supabase
            .from('bookings')
            .select('*')
            .in('id', [first.id, second.id]);

        expect(data.length).toBe(2);
        expect(data.every(b => b.status === 'cancelled')).toBe(true);
    });

    it('should prevent booking if slot is pending', async () => {
        const bookingData = {
            ...testBookingData,
            booking_time: '17:00:00'
        };

        // Create first booking (pending status)
        const firstBooking = await createBooking(bookingData);
        createdBookingIds.push(firstBooking.id);

        // Try to create second booking - should fail
        await expect(createBooking(bookingData)).rejects.toThrow('SLOT_UNAVAILABLE');
    });

    it('should prevent booking if slot is confirmed', async () => {
        const bookingData = {
            ...testBookingData,
            booking_time: '18:00:00'
        };

        // Create and confirm first booking
        const firstBooking = await createBooking(bookingData);
        createdBookingIds.push(firstBooking.id);

        await supabase
            .from('bookings')
            .update({ status: 'confirmed' })
            .eq('id', firstBooking.id);

        // Try to create second booking - should fail
        await expect(createBooking(bookingData)).rejects.toThrow('SLOT_UNAVAILABLE');
    });
});
