import { Gallery } from '@/components/gallery';

export default function Home() {

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto ">
        <Gallery />
      </div>
    </main>
  );
}