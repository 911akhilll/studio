
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
                  <Input id="profileImage" type="file" accept="image/*" onChange={handleImageUpload} />
                  <p className="text-xs text-muted-foreground mt-1">Or paste an image URL below:</p>
                  <Input value={profileImage} onChange={(e) => setProfileImage(e.target.value)} placeholder="Image URL" />
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
            
            <Button variant="outline" className="mt-4" onClick={() => setAuthenticated(false)}>Logout</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
