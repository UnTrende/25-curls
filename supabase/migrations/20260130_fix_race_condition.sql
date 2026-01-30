-- Fix Race Condition Vulnerability in Booking System
-- Created: 2026-01-30
-- Purpose: Prevent double bookings by adding database-level unique constraint

-- =====================================================
-- UNIQUE CONSTRAINT FOR BOOKING TIME SLOTS
-- =====================================================

-- Create a partial unique index that prevents multiple active bookings
-- for the same date/time combination. This constraint only applies to
-- bookings with status 'pending' or 'confirmed', allowing multiple
-- cancelled/completed bookings for the same slot (for historical records).

CREATE UNIQUE INDEX idx_bookings_unique_timeslot 
ON bookings (booking_date, booking_time) 
WHERE status IN ('pending', 'confirmed');

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON INDEX idx_bookings_unique_timeslot IS 
'Prevents race condition double bookings by ensuring only one active booking per time slot. Partial index allows historical records for cancelled/completed bookings.';

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================

-- Run this query to verify no existing double bookings:
-- SELECT 
--     booking_date, 
--     booking_time, 
--     COUNT(*) as booking_count,
--     STRING_AGG(id::text, ', ') as booking_ids
-- FROM bookings
-- WHERE status IN ('pending', 'confirmed')
-- GROUP BY booking_date, booking_time
-- HAVING COUNT(*) > 1;
