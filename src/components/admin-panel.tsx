
'use client';
import React, { useState } from 'react';
import { useAdmin } from '@/context/admin-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Label } from '@/components/ui/label';

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
  } = useAdmin();

  const [password, setPassword] = useState('');
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
                  <Label htmlFor="profileImage">Profile Image URL</Label>
                  <Input id="profileImage" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Edit Site Colors (HSL format)</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="primaryColor">Primary Color (e.g., 346.8 77.2% 49.8%)</Label>
                  <Input id="primaryColor" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color (e.g., 48 96.5% 53.1%)</Label>
                  <Input id="secondaryColor" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="backgroundColor">Background Color (e.g., 240 10% 3.9%)</Label>
                  <Input id="backgroundColor" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="mt-4" onClick={() => setAuthenticated(false)}>Logout</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
