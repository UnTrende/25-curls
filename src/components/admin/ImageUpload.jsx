import React, { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import { supabase } from '../../lib/supabaseClient';

const ImageUpload = ({
    bucket = 'portfolio',
    onUpload,
    aspectRatio = null, // e.g., 16/9
    currentImage = null,
    className = ''
}) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const validateImage = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const ratio = img.width / img.height;
                // Allow small tolerance for floating point math
                const tolerance = 0.05;

                if (aspectRatio) {
                    if (Math.abs(ratio - aspectRatio) > tolerance) {
                        const expectedRatioString = aspectRatio === 16 / 9 ? "16:9" : aspectRatio;
                        reject(`Image aspect ratio must be ${expectedRatioString}. Your image is ${img.width}x${img.height} (${ratio.toFixed(2)}).`);
                        return;
                    }
                }
                resolve(true);
            };
            img.onerror = () => reject("Failed to load image for validation");
            img.src = URL.createObjectURL(file);
        });
    };

    const handleFiles = async (files) => {
        if (!files || files.length === 0) return;

        const file = files[0];
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            setError('File size must be less than 5MB');
            return;
        }

        setError(null);
        setUploading(true);

        try {
            // Validate Aspect Ratio if required
            if (aspectRatio) {
                await validateImage(file);
            }

            // Create unique file name
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload to Supabase
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            setPreview(publicUrl);
            if (onUpload) onUpload(publicUrl);

        } catch (err) {
            console.error('Upload failed:', err);
            setError(typeof err === 'string' ? err : err.message || 'Upload failed');
        } finally {
            setUploading(false);
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <div className={`w-full ${className}`}>
            <div
                className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${dragActive
                        ? 'border-primary bg-primary/10 scale-[1.02]'
                        : error
                            ? 'border-red-500/50 bg-red-500/5'
                            : 'border-white/10 hover:border-primary/50 hover:bg-white/5'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleChange}
                />

                {uploading ? (
                    <div className="py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground animate-pulse">Uploading and validating...</p>
                    </div>
                ) : preview ? (
                    <div className="relative group">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                            <button
                                type="button"
                                onClick={onButtonClick}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all transform hover:scale-105"
                            >
                                Change Image
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 cursor-pointer" onClick={onButtonClick}>
                        <div className="w-16 h-16 rounded-full bg-white/5 mx-auto mb-4 flex items-center justify-center">
                            <Icon icon="mdi:cloud-upload" className="text-3xl text-muted-foreground" />
                        </div>
                        <p className="text-lg font-medium text-white mb-2">
                            Drop your image here, or <span className="text-primary hover:underline">browse</span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {aspectRatio ? `Required aspect ratio: ${aspectRatio === 16 / 9 ? '16:9' : aspectRatio}` : 'Supports: JPG, PNG, WEBP (Max 5MB)'}
                        </p>
                    </div>
                )}

                {dragActive && (
                    <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm rounded-xl flex items-center justify-center pointer-events-none">
                        <p className="text-xl font-bold text-primary">Drop to upload!</p>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-3 flex items-start gap-2 text-red-400 text-sm">
                    <Icon icon="mdi:alert-circle" className="text-lg mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
