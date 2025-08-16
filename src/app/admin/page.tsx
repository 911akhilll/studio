'use client';
import React, { useState, useEffect } from 'react';
import { useSiteDataContext, SiteData, SiteDataProvider } from '@/contexts/site-data-context';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Star, Home } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const AdminPageComponent = () => {
    const { siteData, updateSiteData, addReview, loading } = useSiteDataContext();
    const [formData, setFormData] = useState<SiteData>(siteData);
    const [isSaving, setIsSaving] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [isAddingReview, setIsAddingReview] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            setFormData(siteData);
        }
    }, [siteData, loading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value as any }));
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        const { reviews, profileImage, ...dataToUpdate } = formData;
        await updateSiteData(dataToUpdate);
        setIsSaving(false);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '911') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Incorrect password. Please try again.');
        }
    };
    
    const handleAddReview = async () => {
      if (!reviewText || reviewRating < 1) return;
      setIsAddingReview(true);
      await addReview({
        text: reviewText,
        rating: reviewRating,
        createdAt: new Date(),
      });
      setReviewText('');
      setReviewRating(5);
      setIsAddingReview(false);
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
                <Card className="w-full max-w-md bg-card border-border shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold">Admin Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="bg-input text-foreground"
                            />
                            {error && <p className="text-destructive text-sm">{error}</p>}
                            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-black tracking-tighter">Admin Panel</h1>
                    <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
                        <Home className="h-6 w-6" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* General Settings */}
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label htmlFor="heroTitle" className="text-sm font-medium text-muted-foreground">Hero Title</label>
                                <Input id="heroTitle" name="heroTitle" value={formData.heroTitle} onChange={handleInputChange} className="bg-input text-foreground" />
                            </div>
                            <div>
                                <label htmlFor="heroSubtitle" className="text-sm font-medium text-muted-foreground">Hero Subtitle</label>
                                <Input id="heroSubtitle" name="heroSubtitle" value={formData.heroSubtitle} onChange={handleInputChange} className="bg-input text-foreground" />
                            </div>
                            <div>
                                <label htmlFor="aboutText" className="text-sm font-medium text-muted-foreground">About Text</label>
                                <Textarea id="aboutText" name="aboutText" value={formData.aboutText} onChange={handleInputChange} rows={5} className="bg-input text-foreground" />
                            </div>
                            <div>
                                <label htmlFor="contactEmail" className="text-sm font-medium text-muted-foreground">Contact Email</label>
                                <Input id="contactEmail" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} className="bg-input text-foreground" />
                            </div>
                            <div>
                                <label htmlFor="embeddedHtml" className="text-sm font-medium text-muted-foreground">Embedded HTML</label>
                                <Textarea id="embeddedHtml" name="embeddedHtml" value={formData.embeddedHtml} onChange={handleInputChange} rows={8} className="bg-input text-foreground font-mono text-sm" />
                            </div>
                            <Button onClick={handleSaveChanges} disabled={isSaving} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save General Settings
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Review Management */}
                    <div className="space-y-8">
                      <Card className="bg-card border-border">
                          <CardHeader>
                              <CardTitle>Add a New Review</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                              <div>
                                  <label className="text-sm font-medium text-muted-foreground">Rating</label>
                                  <div className="flex items-center gap-2 mt-2">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                              key={star}
                                              className={`cursor-pointer h-8 w-8 ${reviewRating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                                              onClick={() => setReviewRating(star)}
                                          />
                                      ))}
                                  </div>
                              </div>
                              <div>
                                  <label htmlFor="reviewText" className="text-sm font-medium text-muted-foreground">Review Text</label>
                                  <Textarea
                                      id="reviewText"
                                      value={reviewText}
                                      onChange={(e) => setReviewText(e.target.value)}
                                      placeholder="Write the review here..."
                                      rows={4}
                                      className="bg-input text-foreground"
                                  />
                              </div>
                              <Button onClick={handleAddReview} disabled={isAddingReview} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                  {isAddingReview ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                  Post Review
                              </Button>
                          </CardContent>
                      </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function AdminPage() {
    return (
        <SiteDataProvider>
            <AdminPageComponent />
        </SiteDataProvider>
    )
}
