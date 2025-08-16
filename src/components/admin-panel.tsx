'use client';
import React, { useState, useEffect } from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const AdminPanel = () => {
    const { siteData, updateSiteData, isAdminPanelOpen, setAdminPanelOpen } = useSiteDataContext();
    const [formData, setFormData] = useState(siteData);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setFormData(siteData);
    }, [siteData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        await updateSiteData(formData);
        setIsSaving(false);
        setAdminPanelOpen(false);
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
                        <label htmlFor="profileImage">Profile Image URL</label>
                        <Input id="profileImage" name="profileImage" value={formData.profileImage} onChange={handleInputChange} />
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
