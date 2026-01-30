import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getSettings, updateSetting } from '../../api/siteSettings';
import { getSocialLinks, updateSocialLink } from '../../api/socialLinks';
import ImageUpload from '../../components/admin/ImageUpload';

const ManageSettings = () => {
    const [activeTab, setActiveTab] = useState('site');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [siteSettings, setSiteSettings] = useState({});
    const [heroSettings, setHeroSettings] = useState({
        hero_image: '',
        hero_title: 'Premium Barber Services',
        hero_subtitle: 'Experience the art of grooming at your doorstep',
        cta_text: 'Book Appointment',
        cta_link: '/booking'
    });
    const [socialLinks, setSocialLinks] = useState([]);
    const [saving, setSaving] = useState(false);

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

            // Load hero settings if they exist
            if (settingsObj.hero_section) {
                setHeroSettings({ ...heroSettings, ...settingsObj.hero_section });
            }

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
        setSaving(true);
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
        } finally {
            setSaving(false);
        }
    };

    const handleSaveHeroSettings = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSetting('hero_section', heroSettings);
            setSuccess('Hero section updated successfully');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error updating hero settings:', err);
            setError('Failed to update hero settings');
        } finally {
            setSaving(false);
        }
    };

    const handleSaveSocialLinks = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await Promise.all(
                socialLinks.map(link => updateSocialLink(link.id, { url: link.url }))
            );
            setSuccess('Social links updated successfully');
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            console.error('Error updating social links:', err);
            setError('Failed to update social links');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout title="Settings" breadcrumbs={[{ label: 'Settings' }]}>
            {/* Tabs */}
            <div className="mb-6 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                    {[
                        { id: 'site', label: 'Site Info', icon: 'mdi:information' },
                        { id: 'hero', label: 'Hero Section', icon: 'mdi:view-dashboard-outline' },
                        { id: 'social', label: 'Social Links', icon: 'mdi:share-variant' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'
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
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:check-circle" className="text-green-500 text-xl" />
                        <p className="text-sm text-green-500 font-medium">{success}</p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3">
                        <Icon icon="mdi:alert-circle" className="text-red-500 text-xl" />
                        <p className="text-sm text-red-500 font-medium">{error}</p>
                    </div>
                </div>
            )}

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8">
                    {activeTab === 'site' && (
                        <form onSubmit={handleSaveSiteSettings} className="space-y-6 max-w-2xl">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-4">General Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                                            Business Name
                                        </label>
                                        <input
                                            type="text"
                                            value={siteSettings.business_name || ''}
                                            onChange={(e) => setSiteSettings({ ...siteSettings, business_name: e.target.value })}
                                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
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
                                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors font-medium shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Site Info'}
                            </button>
                        </form>
                    )}

                    {activeTab === 'hero' && (
                        <form onSubmit={handleSaveHeroSettings} className="space-y-8 max-w-3xl">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">Hero Image</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Main background image for your landing page. Must be <span className="text-primary font-bold">16:9 aspect ratio</span> to ensure layout integrity.
                                </p>
                                <div className="max-w-xl">
                                    <ImageUpload
                                        bucket="hero"
                                        currentImage={heroSettings.hero_image}
                                        onUpload={(url) => setHeroSettings({ ...heroSettings, hero_image: url })}
                                        aspectRatio={16 / 9}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                                        Main Title
                                    </label>
                                    <input
                                        type="text"
                                        value={heroSettings.hero_title}
                                        onChange={(e) => setHeroSettings({ ...heroSettings, hero_title: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="e.g. Premium Barber Services"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                                        Subtitle / Tagline
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={heroSettings.hero_subtitle}
                                        onChange={(e) => setHeroSettings({ ...heroSettings, hero_subtitle: e.target.value })}
                                        className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                        placeholder="e.g. Experience the art of grooming..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                                            Button Text
                                        </label>
                                        <input
                                            type="text"
                                            value={heroSettings.cta_text}
                                            onChange={(e) => setHeroSettings({ ...heroSettings, cta_text: e.target.value })}
                                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="e.g. Book Now"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                                            Button Link
                                        </label>
                                        <input
                                            type="text"
                                            value={heroSettings.cta_link}
                                            onChange={(e) => setHeroSettings({ ...heroSettings, cta_link: e.target.value })}
                                            className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="e.g. /booking"
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors font-medium shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Hero Section'}
                            </button>
                        </form>
                    )}

                    {activeTab === 'social' && (
                        <form onSubmit={handleSaveSocialLinks} className="space-y-6 max-w-2xl">
                            {socialLinks.map((link, index) => (
                                <div key={link.id}>
                                    <label className="block text-sm font-medium text-muted-foreground mb-2 capitalize flex items-center gap-2">
                                        <Icon icon={`mdi:${link.platform.toLowerCase()}`} />
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
                                        className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder:text-muted-foreground/30 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    />
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={saving}
                                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl transition-colors font-medium shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Social Links'}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </AdminLayout>
    );
};

export default ManageSettings;
