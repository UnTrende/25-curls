import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { getAllTestimonials, approveTestimonial, rejectTestimonial, deleteTestimonial } from '../../api/testimonials';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('pending');
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, testimonialId: null });

    useEffect(() => {
        fetchTestimonials();
    }, [activeTab]);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const approved = activeTab === 'approved';
            const data = await getAllTestimonials({ approved });
            setTestimonials(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching testimonials:', err);
            setError('Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await approveTestimonial(id);
            await fetchTestimonials();
        } catch (err) {
            console.error('Error approving testimonial:', err);
            setError('Failed to approve testimonial');
        }
    };

    const handleReject = async (id) => {
        try {
            await rejectTestimonial(id);
            await fetchTestimonials();
        } catch (err) {
            console.error('Error rejecting testimonial:', err);
            setError('Failed to reject testimonial');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTestimonial(deleteDialog.testimonialId);
            await fetchTestimonials();
        } catch (err) {
            console.error('Error deleting testimonial:', err);
            setError('Failed to delete testimonial');
        }
    };

    return (
        <AdminLayout title="Manage Testimonials" breadcrumbs={[{ label: 'Testimonials' }]}>
            {/* Tabs */}
            <div className="mb-6">
                <div className="flex gap-2">
                    {['pending', 'approved'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-lg transition-colors ${activeTab === tab
                                ? 'bg-primary text-white'
                                : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
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
            ) : testimonials.length === 0 ? (
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-12 text-center">
                    <Icon icon="mdi:star-outline" className="text-6xl text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No {activeTab} testimonials found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-6"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                        <Icon icon="mdi:account" className="text-primary text-2xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white">{testimonial.customer_name}</h4>
                                        <div className="flex gap-1 mt-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Icon key={i} icon="mdi:star" className="text-yellow-500 text-sm" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <StatusBadge status={testimonial.is_approved ? 'approved' : 'pending'} type="testimonial" />
                            </div>

                            <p className="text-muted-foreground text-sm mb-4 line-clamp-4">{testimonial.content}</p>

                            <div className="flex gap-2 pt-4 border-t border-white/10">
                                {!testimonial.is_approved && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(testimonial.id)}
                                            className="flex-1 px-3 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg transition-colors text-sm"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(testimonial.id)}
                                            className="flex-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors text-sm"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => setDeleteDialog({ isOpen: true, testimonialId: testimonial.id })}
                                    className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                    title="Delete testimonial"
                                >
                                    <Icon icon="mdi:delete" width="20" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, testimonialId: null })}
                onConfirm={handleDelete}
                title="Delete Testimonial"
                message="Are you sure you want to delete this testimonial? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
            />
        </AdminLayout>
    );
};

export default ManageTestimonials;
