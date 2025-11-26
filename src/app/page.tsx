import { Gallery } from '@/components/gallery';

export default function Home() {

  return (
    <main className="min-h-screen pt-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <Gallery />
      </div>
    </main>
  );
}