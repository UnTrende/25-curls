import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import BookingDetailsModal from '../../components/admin/BookingDetailsModal';
import { getBookings, updateBookingStatus, deleteBooking } from '../../api/bookings';
import { motion } from 'framer-motion';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        search: '',
        startDate: '',
        endDate: ''
    });
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, bookingId: null });
    const [statusUpdateDialog, setStatusUpdateDialog] = useState({ isOpen: false, bookingId: null, newStatus: '' });
    const [detailsModal, setDetailsModal] = useState({ isOpen: false, booking: null });

    useEffect(() => {
        fetchBookings();
    }, [filters]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await getBookings(filters);
            setBookings(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            setError('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async () => {
        try {
            await updateBookingStatus(statusUpdateDialog.bookingId, statusUpdateDialog.newStatus);
            await fetchBookings();
        } catch (err) {
            console.error('Error updating booking status:', err);
            setError('Failed to update booking status');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteBooking(deleteDialog.bookingId);
            await fetchBookings();
        } catch (err) {
            console.error('Error deleting booking:', err);
            setError('Failed to delete booking');
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            status: '',
            search: '',
            startDate: '',
            endDate: ''
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
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

    return (
        <AdminLayout title="Manage Bookings" breadcrumbs={[{ label: 'Bookings' }]}>
            {/* Filters */}
            <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Status
                        </label>
                        <select
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Search
                        </label>
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            placeholder="Customer name or email..."
                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={filters.startDate}
                            onChange={(e) => handleFilterChange('startDate', e.target.value)}
                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={filters.endDate}
                            onChange={(e) => handleFilterChange('endDate', e.target.value)}
                            className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={clearFilters}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:alert-circle" className="text-red-500 text-xl" />
                        <p className="text-sm text-red-500">{error}</p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : bookings.length === 0 ? (
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-12 text-center">
                    <Icon icon="mdi:calendar-blank" className="text-6xl text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No bookings found</p>
                </div>
            ) : (
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Date & Time
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {bookings.map((booking) => (
                                    <motion.tr
                                        key={booking.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-white/5 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-white">{booking.customer_name}</div>
                                                <div className="text-sm text-muted-foreground">{booking.customer_email}</div>
                                                <div className="text-sm text-muted-foreground">{booking.customer_phone}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{booking.service?.name || 'N/A'}</div>
                                            <div className="text-sm text-muted-foreground">AED {booking.service?.price || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-white">{formatDate(booking.booking_date)}</div>
                                            <div className="text-sm text-muted-foreground">{formatTime(booking.booking_time)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={booking.status} type="booking" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {/* View Details Button */}
                                                <button
                                                    onClick={() => setDetailsModal({ isOpen: true, booking })}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                                                    title="View details"
                                                >
                                                    <Icon icon="mdi:eye" width="20" />
                                                </button>

                                                {/* Status Update Dropdown */}
                                                <select
                                                    value={booking.status}
                                                    onChange={(e) => {
                                                        setStatusUpdateDialog({
                                                            isOpen: true,
                                                            bookingId: booking.id,
                                                            newStatus: e.target.value
                                                        });
                                                    }}
                                                    className="px-3 py-1 bg-black border border-white/10 rounded text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => setDeleteDialog({ isOpen: true, bookingId: booking.id })}
                                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                                    title="Delete booking"
                                                >
                                                    <Icon icon="mdi:delete" width="20" />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Status Update Confirmation Dialog */}
            <ConfirmDialog
                isOpen={statusUpdateDialog.isOpen}
                onClose={() => setStatusUpdateDialog({ isOpen: false, bookingId: null, newStatus: '' })}
                onConfirm={handleStatusUpdate}
                title="Update Booking Status"
                message={`Are you sure you want to change this booking's status to "${statusUpdateDialog.newStatus}"?`}
                confirmText="Update"
                variant="info"
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, bookingId: null })}
                onConfirm={handleDelete}
                title="Delete Booking"
                message="Are you sure you want to delete this booking? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
            />

            {/* Booking Details Modal */}
            <BookingDetailsModal
                isOpen={detailsModal.isOpen}
                onClose={() => setDetailsModal({ isOpen: false, booking: null })}
                booking={detailsModal.booking}
            />
        </AdminLayout>
    );
};

export default ManageBookings;
