
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSiteDataContext, SiteData, SiteDataProvider } from '@/contexts/site-data-context';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Star, Home, Trash2, Youtube, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const AdminPageComponent = () => {
    const { siteData, updateSiteData, addReview, deleteReview, addVideo, deleteVideo, loading } = useSiteDataContext();
    const [formData, setFormData] = useState<SiteData>(siteData);
    const [isSaving, setIsSaving] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const [reviewText, setReviewText] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [isAddingReview, setIsAddingReview] = useState(false);

    const [videoTitle, setVideoTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [isAddingVideo, setIsAddingVideo] = useState(false);
    
    const router = useRouter();
    const { toast } = useToast();

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
        const { reviews, videos, ...dataToUpdate } = formData;
        await updateSiteData(dataToUpdate);
        setIsSaving(false);
        toast({
          title: "Success!",
          description: "General settings have been saved.",
        });
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
      toast({
          title: "Success!",
          description: "New review has been posted.",
      });
    };

    const handleDeleteReview = async (reviewId: string) => {
      if (window.confirm('Are you sure you want to delete this review?')) {
        await deleteReview(reviewId);
        toast({
            title: "Deleted",
            description: "The review has been removed.",
            variant: "destructive"
        });
      }
    };

    const handleAddVideo = async () => {
        if (!videoTitle || !videoUrl) return;
        setIsAddingVideo(true);
        await addVideo({
            title: videoTitle,
            url: videoUrl,
        });
        setVideoTitle('');
        setVideoUrl('');
        setIsAddingVideo(false);
        toast({
            title: "Success!",
            description: "New video has been added.",
        });
    };

    const handleDeleteVideo = async (videoId: string) => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            await deleteVideo(videoId);
            toast({
                title: "Deleted",
                description: "The video has been removed.",
                variant: "destructive"
            });
        }
    };

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
                
                <Card className="mb-8 bg-card border-border">
                    <CardHeader>
                        <CardTitle>Site Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                           <MessageSquare className="h-8 w-8 text-primary" />
                           <div>
                               <p className="text-2xl font-bold">{siteData.reviews?.length || 0}</p>
                               <p className="text-muted-foreground">Total Reviews</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                           <Youtube className="h-8 w-8 text-primary" />
                           <div>
                               <p className="text-2xl font-bold">{siteData.videos?.length || 0}</p>
                               <p className="text-muted-foreground">Total YouTube Videos</p>
                           </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="bg-card border-border">
                        <CardHeader>
                            <CardTitle>General Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4">
                                <img src={siteData.profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-primary"/>
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Profile Picture</label>
                                    <p className="text-sm text-foreground/80 mt-1">This is permanently set.</p>
                                </div>
                            </div>

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
                            <Button onClick={handleSaveChanges} disabled={isSaving} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                Save General Settings
                            </Button>
                        </CardContent>
                    </Card>

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

                      <Card className="bg-card border-border">
                          <CardHeader>
                              <CardTitle>Add a YouTube Video</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                              <div>
                                  <label htmlFor="videoTitle" className="text-sm font-medium text-muted-foreground">Video Title</label>
                                  <Input id="videoTitle" value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} placeholder="e.g., My Latest Vlog" className="bg-input text-foreground" />
                              </div>
                              <div>
                                  <label htmlFor="videoUrl" className="text-sm font-medium text-muted-foreground">YouTube Video URL</label>
                                  <Input id="videoUrl" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="bg-input text-foreground" />
                              </div>
                              <Button onClick={handleAddVideo} disabled={isAddingVideo} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                  {isAddingVideo ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                  Add Video
                              </Button>
                          </CardContent>
                      </Card>
                    </div>
                </div>

                <Card className="mt-8 bg-card border-border">
                    <CardHeader>
                        <CardTitle>Reviews List</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {siteData.reviews && siteData.reviews.length > 0 ? (
                            siteData.reviews.map(review => (
                                <div key={review.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                    <div>
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                                            ))}
                                        </div>
                                        <p className="mt-1 text-foreground">{review.text}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteReview(review.id)}>
                                        <Trash2 className="h-5 w-5 text-destructive" />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground">No reviews posted yet.</p>
                        )}
                    </CardContent>
                </Card>

                <Card className="mt-8 bg-card border-border">
                    <CardHeader>
                        <CardTitle>Videos List</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {siteData.videos && siteData.videos.length > 0 ? (
                            siteData.videos.map(video => (
                                <div key={video.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                    <p className="text-foreground">{video.title}</p>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteVideo(video.id)}>
                                        <Trash2 className="h-5 w-5 text-destructive" />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground">No videos added yet.</p>
                        )}
                    </CardContent>
                </Card>
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
