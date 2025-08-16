'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

const AdminPanel = () => {
    const { siteData, updateSiteData, isAdminPanelOpen, setAdminPanelOpen } = useSiteDataContext();
    const [formData, setFormData] = useState(siteData);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(siteData.profileImage);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setFormData(siteData);
        setPreviewImage(siteData.profileImage);
    }, [siteData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        const { profileImage, ...textData } = formData;
        await updateSiteData(textData, imageFile);
        setIsSaving(false);
        setAdminPanelOpen(false);
        setImageFile(null); // Reset file after upload
    };

    return (
        <Dialog open={isAdminPanelOpen} onOpenChange={setAdminPanelOpen}>
            <DialogContent className="bg-background text-foreground border-border">
                <DialogHeader>
                    <DialogTitle>Admin Panel</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="heroTitle">Hero Title</label>
                        <Input id="heroTitle" name="heroTitle" value={formData.heroTitle} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="heroSubtitle">Hero Subtitle</label>
                        <Input id="heroSubtitle" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="aboutText">About Text</label>
                        <Textarea id="aboutText" name="aboutText" value={formData.aboutText} onChange={handleInputChange} rows={5} />
                    </div>
                    <div>
                        <label>Profile Image</label>
                        <div className="mt-2 flex items-center gap-4">
                            {previewImage && (
                                <Image src={previewImage} alt="Profile preview" width={80} height={80} className="rounded-md object-cover" />
                            )}
                             <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                                Choose File
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setAdminPanelOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveChanges} disabled={isSaving}>
                        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Save Changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AdminPanel;
