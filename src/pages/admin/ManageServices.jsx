import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { getServices, createService, updateService, deleteService } from '../../api/services';

const ManageServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editModal, setEditModal] = useState({ isOpen: false, service: null });
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, serviceId: null });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            setLoading(true);
            const data = await getServices();
            setServices(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching services:', err);
            setError('Failed to load services');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (serviceData) => {
        try {
            if (editModal.service) {
                await updateService(editModal.service.id, serviceData);
            } else {
                await createService(serviceData);
            }
            await fetchServices();
            setEditModal({ isOpen: false, service: null });
        } catch (err) {
            console.error('Error saving service:', err);
            setError('Failed to save service');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteService(deleteDialog.serviceId);
            await fetchServices();
        } catch (err) {
            console.error('Error deleting service:', err);
            setError('Failed to delete service');
        }
    };

    return (
        <AdminLayout title="Manage Services" breadcrumbs={[{ label: 'Services' }]}>
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">Manage your service offerings</p>
                <button
                    onClick={() => setEditModal({ isOpen: true, service: null })}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                >
                    <Icon icon="mdi:plus" width="20" />
                    Add Service
                </button>
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
            ) : services.length === 0 ? (
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-12 text-center">
                    <Icon icon="mdi:scissors-cutting" className="text-6xl text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No services found</p>
                    <button
                        onClick={() => setEditModal({ isOpen: true, service: null })}
                        className="text-primary hover:underline"
                    >
                        Create your first service
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-primary/50 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditModal({ isOpen: true, service })}
                                        className="p-2 text-blue-500 hover:bg-blue-500/10 rounded transition-colors"
                                        title="Edit service"
                                    >
                                        <Icon icon="mdi:pencil" width="18" />
                                    </button>
                                    <button
                                        onClick={() => setDeleteDialog({ isOpen: true, serviceId: service.id })}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                                        title="Delete service"
                                    >
                                        <Icon icon="mdi:delete" width="18" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{service.description}</p>
                            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                <span className="text-primary font-semibold text-lg">${service.price}</span>
                                <span className="text-muted-foreground text-sm">{service.duration} min</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Edit/Create Modal */}
            <ServiceModal
                isOpen={editModal.isOpen}
                service={editModal.service}
                onClose={() => setEditModal({ isOpen: false, service: null })}
                onSave={handleSave}
            />

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, serviceId: null })}
                onConfirm={handleDelete}
                title="Delete Service"
                message="Are you sure you want to delete this service? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
            />
        </AdminLayout>
    );
};

const ServiceModal = ({ isOpen, service, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        duration: ''
    });

    useEffect(() => {
        if (service) {
            setFormData({
                name: service.name || '',
                description: service.description || '',
                price: service.price || '',
                duration: service.duration || ''
            });
        } else {
            setFormData({
                name: '',
                description: '',
                price: '',
                duration: ''
            });
        }
    }, [service, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: parseFloat(formData.price),
            duration: parseInt(formData.duration)
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative bg-card border border-white/10 rounded-lg p-6 max-w-2xl w-full shadow-xl max-h-[90vh] overflow-y-auto"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-heading font-bold text-white">
                            {service ? 'Edit Service' : 'Add Service'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 text-muted-foreground hover:text-white transition-colors"
                        >
                            <Icon icon="mdi:close" width="24" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                                Service Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="e.g., Classic Haircut"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                                Description *
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                required
                                rows={4}
                                className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Describe the service..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Price ($) *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="0.00"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Duration (minutes) *
                                </label>
                                <input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="30"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                            >
                                {service ? 'Update' : 'Create'} Service
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ManageServices;
