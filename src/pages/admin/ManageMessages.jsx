import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/admin/AdminLayout';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmDialog from '../../components/admin/ConfirmDialog';
import { getContactMessages, updateMessageStatus, deleteMessage } from '../../api/contact';

const ManageMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, messageId: null });

    useEffect(() => {
        fetchMessages();
    }, [filter]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const data = await getContactMessages({ status: filter });
            setMessages(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (messageId, newStatus) => {
        try {
            await updateMessageStatus(messageId, newStatus);
            await fetchMessages();
            if (selectedMessage?.id === messageId) {
                setSelectedMessage({ ...selectedMessage, status: newStatus });
            }
        } catch (err) {
            console.error('Error updating message status:', err);
            setError('Failed to update message status');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteMessage(deleteDialog.messageId);
            await fetchMessages();
            if (selectedMessage?.id === deleteDialog.messageId) {
                setSelectedMessage(null);
            }
        } catch (err) {
            console.error('Error deleting message:', err);
            setError('Failed to delete message');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        });
    };

    return (
        <AdminLayout title="Contact Messages" breadcrumbs={[{ label: 'Messages' }]}>
            {/* Filters */}
            <div className="mb-6">
                <div className="flex gap-2">
                    {['', 'new', 'read', 'replied', 'archived'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg transition-colors ${filter === status
                                ? 'bg-primary text-white'
                                : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                                }`}
                        >
                            {status === '' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
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

            {/* Messages Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Message List */}
                <div className="lg:col-span-1">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center">
                            <Icon icon="mdi:email-outline" className="text-4xl text-muted-foreground mx-auto mb-2" />
                            <p className="text-muted-foreground text-sm">No messages found</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    onClick={() => {
                                        setSelectedMessage(message);
                                        if (message.status === 'new') {
                                            handleStatusUpdate(message.id, 'read');
                                        }
                                    }}
                                    className={`bg-card/50 backdrop-blur-sm border rounded-lg p-4 cursor-pointer transition-all ${selectedMessage?.id === message.id
                                        ? 'border-primary'
                                        : 'border-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-semibold text-white text-sm">{message.name}</h4>
                                        <StatusBadge status={message.status} type="message" />
                                    </div>
                                    <p className="text-muted-foreground text-xs mb-1">{message.email}</p>
                                    <p className="text-muted-foreground text-xs">{formatDate(message.created_at)}</p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Message Detail */}
                <div className="lg:col-span-2">
                    {selectedMessage ? (
                        <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{selectedMessage.name}</h3>
                                    <p className="text-muted-foreground text-sm">{selectedMessage.email}</p>
                                    <p className="text-muted-foreground text-sm">{selectedMessage.phone}</p>
                                    <p className="text-muted-foreground text-xs mt-2">{formatDate(selectedMessage.created_at)}</p>
                                </div>
                                <StatusBadge status={selectedMessage.status} type="message" />
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-medium text-muted-foreground mb-2">Message</h4>
                                <p className="text-white whitespace-pre-wrap">{selectedMessage.message}</p>
                            </div>

                            <div className="flex gap-2 pt-4 border-t border-white/10">
                                <select
                                    value={selectedMessage.status}
                                    onChange={(e) => handleStatusUpdate(selectedMessage.id, e.target.value)}
                                    className="px-4 py-2 bg-black border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                                >
                                    <option value="new">New</option>
                                    <option value="read">Read</option>
                                    <option value="replied">Replied</option>
                                    <option value="archived">Archived</option>
                                </select>
                                <button
                                    onClick={() => setDeleteDialog({ isOpen: true, messageId: selectedMessage.id })}
                                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-12 text-center">
                            <Icon icon="mdi:message-text-outline" className="text-6xl text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">Select a message to view details</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                onClose={() => setDeleteDialog({ isOpen: false, messageId: null })}
                onConfirm={handleDelete}
                title="Delete Message"
                message="Are you sure you want to delete this message? This action cannot be undone."
                confirmText="Delete"
                variant="danger"
            />
        </AdminLayout>
    );
};

export default ManageMessages;
