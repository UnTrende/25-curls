import { describe, it, expect, vi, beforeEach } from 'vitest';
import { event, trackBooking, trackServiceView } from '../../utils/analytics';

describe('Analytics Utilities', () => {
  beforeEach(() => {
    // Mock window.gtag
    window.gtag = vi.fn();
  });

  it('tracks custom events', () => {
    event({
      action: 'test_action',
      category: 'Test',
      label: 'Test Label',
      value: 100,
    });

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'test_action',
      expect.objectContaining({
        event_category: 'Test',
        event_label: 'Test Label',
        value: 100,
      })
    );
  });

  it('tracks booking events', () => {
    trackBooking('service-123', 'Premium Haircut', 50);

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'booking_initiated',
      expect.objectContaining({
        event_category: 'Booking',
        event_label: 'Premium Haircut',
        value: 50,
      })
    );
  });

  it('tracks service view events', () => {
    trackServiceView('service-456', 'Beard Trim');

    expect(window.gtag).toHaveBeenCalledWith(
      'event',
      'service_viewed',
      expect.objectContaining({
        event_category: 'Services',
        event_label: 'Beard Trim',
      })
    );
  });
});
