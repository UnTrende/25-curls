import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getSettings, updateSetting } from '../../api/siteSettings';
import { getSocialLinks, updateSocialLink } from '../../api/socialLinks';

const ManageSettings = () => {
    const [activeTab, setActiveTab] = useState('site');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [siteSettings, setSiteSettings] = useState({});
    const [socialLinks, setSocialLinks] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [settings, links] = await Promise.all([
                getSettings(),
                getSocialLinks()
            ]);
            // Convert settings array to object
            const settingsObj = {};
            settings.forEach(s => {
                settingsObj[s.key] = s.value;
            });
            setSiteSettings(settingsObj);
            setSocialLinks(links);
            setError(null);
        } catch (err) {
            console.error('Error fetching settings:', err);
            setError('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSiteSettings = async (e) => {
        e.preventDefault();
        try {
            // Update each setting individually
            await Promise.all(
                Object.entries(siteSettings).map(([key, value]) =>
                    updateSetting(key, value)
                )
            );
            setSuccess('Site settings updated successfully');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error updating site settings:', err);
            setError('Failed to update site settings');
        }
    };

    const handleSaveSocialLinks = async (e) => {
        e.preventDefault();
        try {
            await Promise.all(
                socialLinks.map(link => updateSocialLink(link.id, { url: link.url }))
            );
            setSuccess('Social links updated successfully');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error updating social links:', err);
            setError('Failed to update social links');
        }
    };

    return (
        <AdminLayout title="Settings" breadcrumbs={[{ label: 'Settings' }]}>
            {/* Tabs */}
            <div className="mb-6">
                <div className="flex gap-2">
                    {[
                        { id: 'site', label: 'Site Info', icon: 'mdi:information' },
                        { id: 'social', label: 'Social Links', icon: 'mdi:share-variant' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${activeTab === tab.id
                                ? 'bg-primary text-white'
                                : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                                }`}
                        >
                            <Icon icon={tab.icon} width="20" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Success Message */}
            {success && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:check-circle" className="text-green-500 text-xl" />
                        <p className="text-sm text-green-500">{success}</p>
                    </div>
                </div>
            )}

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
            ) : (
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                    {activeTab === 'site' && (
                        <form onSubmit={handleSaveSiteSettings} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Business Name
                                </label>
                                <input
                                    type="text"
                                    value={siteSettings.business_name || ''}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, business_name: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    value={siteSettings.contact_email || ''}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, contact_email: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Contact Phone
                                </label>
                                <input
                                    type="tel"
                                    value={siteSettings.contact_phone || ''}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, contact_phone: e.target.value })}
                                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    Business Address
                                </label>
                                <textarea
                                    value={siteSettings.address || ''}
                                    onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                            >
                                Save Changes
                            </button>
                        </form>
                    )}

                    {activeTab === 'social' && (
                        <form onSubmit={handleSaveSocialLinks} className="space-y-6">
                            {socialLinks.map((link, index) => (
                                <div key={link.id}>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2 capitalize">
                                        {link.platform}
                                    </label>
                                    <input
                                        type="url"
                                        value={link.url}
                                        onChange={(e) => {
                                            const updated = [...socialLinks];
                                            updated[index].url = e.target.value;
                                            setSocialLinks(updated);
                                        }}
                                        placeholder={`https://${link.platform}.com/...`}
                                        className="w-full px-4 py-2 bg-black border border-white/10 rounded-lg text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors"
                            >
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            )}
        </AdminLayout>
    );
};

export default ManageSettings;
