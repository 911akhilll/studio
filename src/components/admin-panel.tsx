'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

// Helper to check for a valid URL format that next/image can handle
const isValidImageUrl = (url: string) => {
    if (url.startsWith('blob:')) {
        return true;
    }
    try {
        new URL(url);
        // Check for common image extensions
        return /\.(jpeg|jpg|gif|png|webp)$/.test(new URL(url).pathname);
    } catch (e) {
        return false;
    }
}

const AdminPanel = () => {
    const { siteData, updateSiteData, isAdminPanelOpen, setAdminPanelOpen, isUploading } = useSiteDataContext();
    const [formData, setFormData] = useState(siteData);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(siteData.profileImage);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setFormData(siteData);
        if (!isUploading) {
            setPreviewImage(siteData.profileImage);
        }
    }, [siteData, isUploading]);
    
    useEffect(() => {
        // When a new image file is chosen, clear the image URL input
        if (imageFile) {
            setFormData(prev => ({ ...prev, profileImage: '' }));
        }
    }, [imageFile]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // If user is typing in the profileImage field, update preview and clear file input
        if (name === 'profileImage') {
            setPreviewImage(value);
            setImageFile(null);
            if(fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        // Construct the final data to be saved, ensuring profileImage is correctly handled
        const finalData = { ...formData };
        if (imageFile) {
            // If there's a file, the profileImage URL will be set after upload
            // We can clear it from the form data to avoid saving a stale URL
             finalData.profileImage = '';
        } else {
            // If no new file, use the URL from the form (which might have been pasted)
            finalData.profileImage = formData.profileImage;
        }

        await updateSiteData(finalData, imageFile);
        setIsSaving(false);
        setAdminPanelOpen(false);
        setImageFile(null); // Reset file after upload
    };

    return (
        <Dialog open={isAdminPanelOpen} onOpenChange={setAdminPanelOpen}>
            <DialogContent className="bg-background text-foreground border-border max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Admin Panel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="heroTitle" className="text-sm font-medium">Hero Title</label>
                        <Input id="heroTitle" name="heroTitle" value={formData.heroTitle} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="heroSubtitle" className="text-sm font-medium">Hero Subtitle</label>
                        <Input id="heroSubtitle" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="aboutText" className="text-sm font-medium">About Text</label>
                        <Textarea id="aboutText" name="aboutText" value={formData.aboutText} onChange={handleInputChange} rows={5} />
                    </div>
                    <div>
                        <label className="text-sm font-medium">Profile Image</label>
                        <div className="mt-2 flex items-center gap-4">
                            <div className="relative w-20 h-20">
                                {previewImage && isValidImageUrl(previewImage) && (
                                    <Image src={previewImage} alt="Profile preview" layout="fill" className="rounded-md object-cover" />
                                )}
                                {(isUploading || isSaving) && (
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-md">
                                        <Loader2 className="h-6 w-6 animate-spin text-white" />
                                    </div>
                                )}
                            </div>
                            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                Upload File
                            </Button>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                         <div className="mt-4 space-y-2">
                             <label htmlFor="profileImage" className="text-sm font-medium">Or paste image URL</label>
                             <p className="text-xs text-muted-foreground">Note: Use direct image links (ending in .png, .jpg, etc.), not Google Drive share links.</p>
                             <Input id="profileImage" name="profileImage" value={formData.profileImage} onChange={handleInputChange} placeholder="https://example.com/image.png"/>
                         </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setAdminPanelOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveChanges} disabled={isSaving || isUploading}>
                        {(isSaving || isUploading) ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AdminPanel;
