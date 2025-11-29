'use client'
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, Download, Share, ChevronLeft, ChevronRight } from "lucide-react";
import { useImages } from '@/hooks/useImages';
import { handleFileUpload, handlePlusClick } from '@/handlers/galleryHandlers';
import { BEARER_TOKEN, BASE_URL } from '@/utils/apiConfig';

const Thumbnail: React.FC<{ url: string; isActive?: boolean; onClick: () => void }> = ({ url, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border-2 cursor-pointer ${
      isActive ? "border-cyan-500" : "border-transparent hover:border-gray-400"
    }`}
  >
    <img src={url} alt="Thumbnail" className="w-full h-full object-cover" />
  </div>
);

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };
  return new Intl.DateTimeFormat('pt-BR', options).format(date);
}



export function Gallery() {
  const { items, loading, error, pageSize, nextPageToken, loadNextPage } = useImages(); 
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0); 
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleGoToNextPage = () => {
    const nextStartIndex = (currentPage + 1) * pageSize;
    
    if (nextStartIndex < items.length) {
      setCurrentPage(currentPage + 1);
      setSelectedIndex(0);
      console.log('go to next page (items already loaded)');
      return;
    }

    if (nextPageToken) {
      loadNextPage(); 
      console.log( 'trigger request to load more items');
      return;
    }

    console.log('pagination end');
  };

  const handleGoToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedIndex(0);
    }
  };

  async function uploadFileToSignedUrl(signedUrl: string, file: File) {
    console.log(signedUrl)
 
    try {
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }
    
      const saveResponse = await fetch(`${BASE_URL}/api/v1/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({ url: signedUrl.split("?")[0] }),
      });

      if (!saveResponse.ok) {
        throw new Error('Failed to save image');
      }

      console.log('Image saved successfully');
    } catch (error) {
      console.error('Error during upload or save:', error);
    }
  }

  //TODO: adjust pagination display logic
  console.log("@@@@@@@@@@@@@ currentpage", currentPage)
  console.log("@@@@@@@@@@@@@@ pagesize", pageSize)
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize -1;
  startIndex == 0 ? console.log('1'): console.log('2')
  const paginatedItems = items.slice(startIndex > 0 ? startIndex- 2  : startIndex, endIndex);
  const selectedItem = paginatedItems[selectedIndex];
  
  const isNextDisabled = !nextPageToken && (startIndex + pageSize) >= items.length;

  return (
    <Card className="w-lg max-w-4xl mx-auto shadow-2xl ">
      <CardContent className="p-6 space-y-4">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <>
            <div className="relative flex items-center">
<Button
                onClick={handleGoToPreviousPage}
                disabled={currentPage === 0}
  className="absolute left-0 flex items-center justify-center"
              >
                {
                //TODO:adjust chrevon size
                }
                <ChevronLeft className="w-8 h-8 md:w-10 lg:w-12 " />
            </Button>
              <ScrollArea className="w-[86%] whitespace-nowrap pb-2 mx-8">
                <div className="flex space-x-3 items-center">
                  <Button
                    variant="outline"
                    className="w-20 h-20 flex-shrink-0 border-dashed border-2 text-gray-500 hover:text-cyan-600 hover:border-cyan-600 transition-colors"
                    onClick={() => {
                      if (fileInputRef.current) {
                        handlePlusClick(fileInputRef);
                      }
                    }}
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      if (fileInputRef.current) {
                        handleFileUpload(event, fileInputRef, uploadFileToSignedUrl);
                      }
                    }}
                  />
                  {paginatedItems.map((item, index) => (
                    <Thumbnail
                      key={index}
                      url={item.url}
                      isActive={index === selectedIndex}
                      onClick={() => setSelectedIndex(index)}
                    />
                  ))}
        </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
              <Button
                onClick={handleGoToNextPage}
                disabled={isNextDisabled}
                className="absolute right-0 flex items-center justify-center"
              >
                <ChevronRight className="w-32 h-32 md:w-10 lg:w-12 " />
            </Button>
          </div>

            <div className="w-full aspect-[4/3] bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
              <img src={selectedItem?.url} alt="Selected" className="w-full h-full object-cover" />
        </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Detalhes do Documento</h3>
            <p className="text-sm text-gray-700">
              Data de criacao: {formatDate(selectedItem.created_at)}
            </p>
          </div>
          <div className="flex flex-col space-y-2 justify-center">
            <Button className="w-full h-12 bg-cyan-500 hover:bg-cyan-600 text-white shadow-md">
              <Download className="w-5 h-5 mr-2" />
              Baixar atestado
            </Button>

                <Button variant="outline" className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-100">
                  <Share className="w-5 h-5 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
