
'use client';
import React, { useState, useEffect } from 'react';
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
import { listImages, uploadImage, deleteImage } from '@/ai/flows/image-management-flow';
import { Trash2 } from 'lucide-react';

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
  const [imageList, setImageList] = useState<string[]>([]);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const { toast } = useToast();

  const fetchImages = async () => {
    try {
      const { images } = await listImages();
      setImageList(images || []);
    } catch (error) {
      console.error('Failed to fetch images:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not load project images.' });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchImages();
    }
  }, [isAuthenticated]);

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessingImage(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const fileData = reader.result as string;
          const { success, error, filePath } = await uploadImage({ fileName: file.name, fileData });
          if (success) {
            toast({ title: "Success", description: "Image uploaded and will be added to the project files." });
            setProfileImage(filePath!);
            await fetchImages(); // Refresh the list
          } else {
            toast({ variant: "destructive", title: "Error", description: error });
          }
        } catch (err) {
          toast({ variant: "destructive", title: "Error", description: "Could not upload image." });
          console.error(err);
        } finally {
          setIsProcessingImage(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDeleteImage = async (imagePath: string) => {
    if (!confirm(`Are you sure you want to delete ${imagePath}? This cannot be undone.`)) return;

    setIsProcessingImage(true);
    try {
      const { success, error } = await deleteImage({ filePath: imagePath });
      if (success) {
        toast({ title: "Success", description: `${imagePath} deleted. The file will be removed from your project.` });
        if (profileImage === imagePath) {
          setProfileImage('https://placehold.co/450x300.png'); 
        }
        await fetchImages(); // Refresh the list
      } else {
        toast({ variant: "destructive", title: "Error", description: error });
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: `Could not delete ${imagePath}.` });
      console.error(err);
    } finally {
      setIsProcessingImage(false);
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
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Manage Profile Image</h3>
              <div className="space-y-2">
                <Label htmlFor="profileImageUpload">Upload New Image</Label>
                <Input id="profileImageUpload" type="file" accept="image/*" onChange={handleImageUpload} disabled={isProcessingImage} className="mt-1" />
                {isProcessingImage && <p className="text-xs text-muted-foreground">Processing image...</p>}
              </div>
              <div className="space-y-2 mt-4">
                <Label>Select From Project Images</Label>
                <div className="max-h-48 overflow-y-auto rounded-md border p-2 space-y-2">
                  {imageList.length > 0 ? (
                    imageList.map((img) => (
                      <div key={img} className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${profileImage === img ? 'bg-accent' : 'hover:bg-accent/50'}`} onClick={() => setProfileImage(img)}>
                        <span className="text-sm truncate">{img.split('/').pop()}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); handleDeleteImage(img); }}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground p-2">No images found in project.</p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    Current selection: {profileImage}
                </p>
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
              <Button onClick={handleSaveChanges} disabled={isSaving || isProcessingImage}>
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
