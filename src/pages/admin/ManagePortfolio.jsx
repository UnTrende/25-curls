import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import ImageUpload from '../../components/admin/ImageUpload';
import { getPortfolioItems, createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../api/portfolio';

const ManagePortfolio = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, itemId: null });

    // Edit/Create Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // null = create mode
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image_url: '',
        category: 'haircuts' // default
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            const data = await getPortfolioItems();
            setItems(data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching portfolio:', err);
            setError('Failed to load portfolio items');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                description: item.description || '',
                image_url: item.image_url,
                category: item.category || 'haircuts'
            });
        } else {
            setEditingItem(null);
            setFormData({
                title: '',
                description: '',
                image_url: '',
                category: 'haircuts'
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            if (!formData.image_url) {
                alert("Please upload an image");
                setSaving(false);
                return;
            }

            if (editingItem) {
                await updatePortfolioItem(editingItem.id, formData);
            } else {
                await createPortfolioItem(formData);
            }

            setIsModalOpen(false);
            fetchPortfolio();
        } catch (err) {
            console.error('Error saving item:', err);
            setError('Failed to save portfolio item');
        } finally {
            setSaving(false);
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
                <div>
                    <h2 className="text-xl font-bold text-white">Gallery Items</h2>
                    <p className="text-muted-foreground">Showcase your best work</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors shadow-lg shadow-primary/20"
                >
                    <Icon icon="mdi:plus" width="20" />
                    Add Item
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:alert-circle" className="text-red-500 text-xl" />
                        <p className="text-sm text-red-500">{error}</p>
                    </div>
                    <button onClick={() => setError(null)} className="text-red-500 hover:text-red-400">
                        <Icon icon="mdi:close" />
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : items.length === 0 ? (
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-16 text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon icon="mdi:image-multiple" className="text-4xl text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No items yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Upload your first image to start building your portfolio gallery.</p>
                    <button
                        onClick={() => handleOpenModal()}
                        className="text-primary hover:underline font-medium"
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
                            className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 shadow-sm"
                        >
                            <div className="aspect-square relative overflow-hidden bg-black/50">
                                <img
                                    src={item.image_url}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-colors border border-white/10"
                                        title="Edit"
                                    >
                                        <Icon icon="mdi:pencil" width="20" />
                                    </button>
                                    <button
                                        onClick={() => setDeleteDialog({ isOpen: true, itemId: item.id })}
                                        className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-lg backdrop-blur-sm transition-colors border border-red-500/20 shadow-lg"
                                        title="Delete"
                                    >
                                        <Icon icon="mdi:delete" width="20" />
                                    </button>
                                </div>
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs text-white/80 font-medium uppercase tracking-wider border border-white/10">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-5">
                                <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                                <p className="text-muted-foreground text-sm line-clamp-2 min-h-[2.5em]">
                                    {item.description || 'No description provided'}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0A0A0A] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                        >
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="text-xl font-bold text-white">
                                    {editingItem ? 'Edit Item' : 'Add New Item'}
                                </h3>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-muted-foreground hover:text-white transition-colors"
                                >
                                    <Icon icon="mdi:close" width="24" />
                                </button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Image</label>
                                    <ImageUpload
                                        bucket="portfolio"
                                        currentImage={formData.image_url}
                                        onUpload={(url) => setFormData({ ...formData, image_url: url })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/30"
                                        placeholder="e.g. Modern Fade"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer"
                                    >
                                        <option value="haircuts">Haircuts</option>
                                        <option value="beards">Beards</option>
                                        <option value="styling">Styling</option>
                                        <option value="treatments">Treatments</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/30 resize-none"
                                        placeholder="Brief description of the style..."
                                    />
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 px-4 py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors font-medium shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {saving ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Item'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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
