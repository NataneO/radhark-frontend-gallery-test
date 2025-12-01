import { GalleryContainer } from '@/components/gallery/GalleryContainer';
import { Toaster } from "@/components/ui/sonner"

export default function Home() {

  return (
    <>
    <main className="container min-h-screen px-4 mx-auto">
        <GalleryContainer />
    </main>
      <Toaster />
      </>
    
  );
}