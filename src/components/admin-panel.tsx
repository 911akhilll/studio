
'use client';
import React, { useState } from 'react';
import { useAdmin } from '@/context/admin-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { saveSettings } from '@/ai/flows/save-settings-flow';
import type { SaveSettingsInput } from '@/ai/flows/save-settings-flow';

const AdminPanel = () => {
  const { 
    isOpen, setOpen, 
    isAuthenticated, setAuthenticated,
    heroTitle, setHeroTitle,
    heroSubtitle, setHeroSubtitle,
    aboutText, setAboutText,
    profileImage, setProfileImage,
    primaryColor, setPrimaryColor,
    secondaryColor, setSecondaryColor,
    backgroundColor, setBackgroundColor,
    textColor, setTextColor,
    useAnimation, setUseAnimation,
  } = useAdmin();

  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handlePasswordSubmit = () => {
    if (password === '911hyrex') {
      setAuthenticated(true);
      toast({ title: "Success", description: "Authenticated successfully." });
    } else {
      toast({ variant: "destructive", title: "Error", description: "Incorrect password." });
    }
    setPassword('');
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      const settings: SaveSettingsInput = {
        heroTitle,
        heroSubtitle,
        aboutText,
        profileImage,
        primaryColor,
        secondaryColor,
        backgroundColor,
        textColor,
        useAnimation,
      };
      await saveSettings(settings);
      toast({ title: "Success", description: "Your changes have been saved. The AI will now update the files." });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not save changes." });
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isAuthenticated ? 'Admin Panel' : 'Admin Access'}</DialogTitle>
          <DialogDescription>
            {isAuthenticated ? 'Welcome, Admin. Make changes to the site here.' : 'Please enter the password to access the admin panel.'}
          </DialogDescription>
        </DialogHeader>
        
        {!isAuthenticated ? (
          <div className="space-y-4 py-4">
            <Input 
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handlePasswordSubmit()}
            />
            <Button onClick={handlePasswordSubmit} className="w-full">Login</Button>
          </div>
        ) : (
          <div className="py-4 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Edit Site Content</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input id="heroTitle" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Input id="heroSubtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="aboutText">About Section Text</Label>
                  <Textarea id="aboutText" value={aboutText} onChange={(e) => setAboutText(e.target.value)} rows={5} />
                </div>
                <div>
                  <Label htmlFor="profileImage">Profile Image</Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload from your device for a live preview. To save permanently, paste an image URL below.
                  </p>
                  <Input id="profileImage" type="file" accept="image/*" onChange={handleImageUpload} className="mt-1" />
                  <Input value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder="Paste image URL to save permanently" className="mt-2" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Edit Site Styles</h3>
              <div className="space-y-4">
                 <div>
                  <Label htmlFor="primaryColor">Primary Color (HSL)</Label>
                  <Input id="primaryColor" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color (HSL)</Label>
                  <Input id="secondaryColor" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="backgroundColor">Background Color (HSL)</Label>
                  <Input id="backgroundColor" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                </div>
                 <div>
                  <Label htmlFor="textColor">Text Color (HSL)</Label>
                  <Input id="textColor" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="useAnimation">Enable Fade-in Animation</Label>
                  <Switch id="useAnimation" checked={useAnimation} onCheckedChange={setUseAnimation} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" onClick={() => setAuthenticated(false)}>Logout</Button>
              <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
