import React from 'react';

const StatusBadge = ({ status, type = 'booking' }) => {
    const getStyles = () => {
        if (type === 'booking') {
            switch (status) {
                case 'pending':
                    return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
                case 'confirmed':
                    return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
                case 'completed':
                    return 'bg-green-500/10 text-green-500 border-green-500/20';
                case 'cancelled':
                    return 'bg-red-500/10 text-red-500 border-red-500/20';
                default:
                    return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            }
        } else if (type === 'testimonial') {
            switch (status) {
                case 'approved':
                    return 'bg-green-500/10 text-green-500 border-green-500/20';
                case 'pending':
                    return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
                case 'rejected':
                    return 'bg-red-500/10 text-red-500 border-red-500/20';
                default:
                    return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            }
        } else if (type === 'message') {
            switch (status) {
                case 'new':
                    return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
                case 'read':
                    return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
                case 'replied':
                    return 'bg-green-500/10 text-green-500 border-green-500/20';
                case 'archived':
                    return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
                default:
                    return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            }
        }
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStyles()} capitalize`}>
            {status}
        </span>
    );
};

export default StatusBadge;
