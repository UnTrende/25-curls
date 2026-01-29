import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { getPortfolioItems, createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../api/portfolio';

const ManagePortfolio = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, itemId: null });

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            const data = await getPortfolioItems();
            setItems(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching portfolio:', err);
            setError('Failed to load portfolio items');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePortfolioItem(deleteDialog.itemId);
            await fetchPortfolio();
        } catch (err) {
            console.error('Error deleting portfolio item:', err);
            setError('Failed to delete portfolio item');
        }
    };

    return (
        <AdminLayout title="Manage Portfolio" breadcrumbs={[{ label: 'Portfolio' }]}>
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">Manage your portfolio gallery</p>
                <button
                    onClick={() => alert('Upload functionality requires Supabase Storage integration')}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                >
                    <Icon icon="mdi:upload" width="20" />
                    Upload Image
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
            ) : items.length === 0 ? (
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-12 text-center">
                    <Icon icon="mdi:image-multiple" className="text-6xl text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No portfolio items found</p>
                    <button
                        onClick={() => alert('Upload functionality requires Supabase Storage integration')}
                        className="text-primary hover:underline"
                    >
                        Upload your first image
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden group"
                        >
                            <div className="aspect-square relative overflow-hidden">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => setDeleteDialog({ isOpen: true, itemId: item.id })}
                                        className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Icon icon="mdi:delete" width="20" />
                                    </button>
                                </div>
                            </div>
                            {item.title && (
                                <div className="p-4">
                                    <h4 className="text-white font-medium">{item.title}</h4>
                                    {item.description && (
                                        <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{item.description}</p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, itemId: null })}
                onConfirm={handleDelete}
                title="Delete Portfolio Item"
                message="Are you sure you want to delete this portfolio item? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
            />
        </AdminLayout>
    );
};

export default ManagePortfolio;
