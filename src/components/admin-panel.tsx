'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const isValidImageUrl = (url: string): boolean => {
    if (!url) return false;
    // Allow blob URLs from local file selections
    if (url.startsWith('blob:')) {
        return true;
    }
    // Check for http/https protocols and common image extensions.
    try {
        const parsedUrl = new URL(url);
        return ['http:', 'https:'].includes(parsedUrl.protocol) && /\.(jpeg|jpg|gif|png|webp)$/i.test(parsedUrl.pathname);
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
        const finalData = { ...formData };
        if (imageFile) {
            finalData.profileImage = '';
        } else {
            finalData.profileImage = formData.profileImage;
        }

        await updateSiteData(finalData, imageFile);
        setIsSaving(false);
        setAdminPanelOpen(false);
        setImageFile(null); 
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
                            <div className="relative w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                                {isValidImageUrl(previewImage || '') && (
                                    <Image src={previewImage!} alt="Profile preview" layout="fill" className="rounded-md object-cover" />
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
                             <label htmlFor="profileImage" className="text-sm font-medium">Or paste direct image URL</label>
                             <p className="text-xs text-muted-foreground">Use a direct image link ending in .jpg, .png, etc.</p>
                             <Input id="profileImage" name="profileImage" value={formData.profileImage} onChange={handleInputChange} placeholder="https://i.ibb.co/your-image.png"/>
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
