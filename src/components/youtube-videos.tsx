'use client';
import React from 'react';
import { useSiteDataContext } from '@/contexts/site-data-context';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function getYouTubeVideoId(url: string) {
    let videoId = '';
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    if (match) {
        videoId = match[1];
    }
    return videoId;
}

const YouTubeVideos = () => {
    const { siteData, loading } = useSiteDataContext();

    if (loading || !siteData.videos || siteData.videos.length === 0) {
        return null;
    }

    return (
        <section id="youtube-videos" className="py-24 sm:py-32 bg-secondary text-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-12">See My Latest Videos</h2>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-4xl mx-auto"
                >
                    <CarouselContent>
                        {siteData.videos.map((video) => {
                            const videoId = getYouTubeVideoId(video.url);
                            const thumbnailUrl = videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : 'https://placehold.co/480x360.png';

                            return (
                                <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden">
                                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                                                <CardContent className="p-0">
                                                    <img
                                                        src={thumbnailUrl}
                                                        alt={video.title}
                                                        className="w-full h-auto object-cover aspect-video"
                                                        data-ai-hint="youtube thumbnail"
                                                    />
                                                    <div className="p-4">
                                                        <h3 className="font-bold text-lg tracking-tight">{video.title}</h3>
                                                    </div>
                                                </CardContent>
                                            </a>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious className="text-black bg-white border-black hover:bg-gray-200" />
                    <CarouselNext className="text-black bg-white border-black hover:bg-gray-200" />
                </Carousel>
            </div>
        </section>
    );
};

export default YouTubeVideos;
