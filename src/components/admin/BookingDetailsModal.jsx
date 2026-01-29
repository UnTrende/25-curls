import React from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBadge from './StatusBadge';

const BookingDetailsModal = ({ isOpen, onClose, booking }) => {
    if (!booking) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (timeString) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Icon icon="mdi:calendar-check" className="text-primary text-xl" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Booking Details</h2>
                                        <p className="text-sm text-muted-foreground">Reference: #{booking.id.slice(0, 8)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <Icon icon="mdi:close" className="text-white text-2xl" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6">
                                {/* Status */}
                                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                    <span className="text-sm font-medium text-muted-foreground">Status</span>
                                    <StatusBadge status={booking.status} type="booking" />
                                </div>

                                {/* Customer Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Icon icon="mdi:account" className="text-primary" />
                                        Customer Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="mdi:account-circle" className="text-primary" />
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Full Name</span>
                                            </div>
                                            <p className="text-white font-medium">{booking.customer_name}</p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="mdi:email" className="text-primary" />
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Email</span>
                                            </div>
                                            <p className="text-white font-medium break-all">{booking.customer_email}</p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="mdi:phone" className="text-primary" />
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Phone</span>
                                            </div>
                                            <p className="text-white font-medium">{booking.customer_phone}</p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="mdi:account-group" className="text-primary" />
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Age Group</span>
                                            </div>
                                            <p className="text-white font-medium">{booking.age_group || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Service Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Icon icon="mdi:scissors-cutting" className="text-primary" />
                                        Service Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="mdi:briefcase" className="text-primary" />
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Service</span>
                                            </div>
                                            <p className="text-white font-medium">{booking.service?.name || 'N/A'}</p>
                                            {booking.service?.description && (
                                                <p className="text-sm text-muted-foreground mt-1">{booking.service.description}</p>
                                            )}
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="mdi:currency-usd" className="text-primary" />
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Price</span>
                                            </div>
                                            <p className="text-white font-bold text-2xl">${booking.service?.price || 'N/A'}</p>
                                            {booking.service?.duration && (
                                                <p className="text-sm text-muted-foreground mt-1">Duration: {booking.service.duration} mins</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Appointment Information */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Icon icon="mdi:calendar-clock" className="text-primary" />
                                        Appointment Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="mdi:calendar" className="text-primary" />
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Date</span>
                                            </div>
                                            <p className="text-white font-medium">{formatDate(booking.booking_date)}</p>
                                        </div>
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="mdi:clock" className="text-primary" />
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Time</span>
                                            </div>
                                            <p className="text-white font-medium">{formatTime(booking.booking_time)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Icon icon="mdi:map-marker" className="text-primary" />
                                        Service Location
                                    </h3>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                        <div className="flex items-start gap-3">
                                            <Icon icon="mdi:home" className="text-primary text-xl mt-1" />
                                            <div className="flex-1">
                                                <span className="text-xs font-medium text-muted-foreground uppercase block mb-1">Address</span>
                                                <p className="text-white">{booking.address || 'Not specified'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Notes */}
                                {booking.notes && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                            <Icon icon="mdi:note-text" className="text-primary" />
                                            Additional Notes
                                        </h3>
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <p className="text-white whitespace-pre-wrap">{booking.notes}</p>
                                        </div>
                                    </div>
                                )}

                                {/* Metadata */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <Icon icon="mdi:information" className="text-primary" />
                                        Booking Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon icon="mdi:clock-plus" className="text-primary" />
                                                <span className="text-xs font-medium text-muted-foreground uppercase">Created At</span>
                                            </div>
                                            <p className="text-white">{formatDateTime(booking.created_at)}</p>
                                        </div>
                                        {booking.updated_at && (
                                            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Icon icon="mdi:clock-edit" className="text-primary" />
                                                    <span className="text-xs font-medium text-muted-foreground uppercase">Last Updated</span>
                                                </div>
                                                <p className="text-white">{formatDateTime(booking.updated_at)}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="sticky bottom-0 bg-card/95 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex justify-end gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default BookingDetailsModal;
