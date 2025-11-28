'use client'
import React, { useState, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Plus, Download, Share, ChevronLeft, ChevronRight } from "lucide-react";
import mockData from "../../data/mock.json";

const Thumbnail: React.FC<{ url: string; isActive?: boolean; onClick: () => void }> = ({ url, isActive, onClick }) => (
  <div
    onClick={onClick}
    className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border-2 ">
    <img src={url} alt="" className="w-full h-full object-cover" />
  </div>
);

export function Gallery() {
  const { items } = mockData;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = mockData.page_size;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startIndex = currentPage * pageSize;
  const paginatedItems = items.slice(startIndex, startIndex + pageSize);
  const selectedItem = paginatedItems[selectedIndex];

  const handleNextPage = () => {
    if ((currentPage + 1) * pageSize < items.length) {
      setCurrentPage(currentPage + 1);
      setSelectedIndex(0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setSelectedIndex(0);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file);
    }
  };

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-lg max-w-4xl mx-auto">
      <CardContent className="p-6 space-y-4">
        <div className="relative flex items-center">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="absolute left-0 p-2"
          >
            <ChevronLeft className="w-5 h-5" />
            </Button>
          <ScrollArea className="w-[86%] whitespace-nowrap mx-8">
            <div className="flex space-x-3 items-center">
              <Button
                variant="outline"
                className="w-20 h-20 flex-shrink-0  border-2"
                onClick={handlePlusClick}
              >
                <Plus className="w-5 h-5" />
            </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
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
            onClick={handleNextPage}
            disabled={(currentPage + 1) * pageSize >= items.length}
            className="absolute right-0 p-2"
          >
            <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

        <div className="w-full aspect-[4/3]  flex items-center justify-center">
          <img src="/" alt="Selected" className="w-full h-full" />
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold ">Detalhes do Documento</h3>
            <p className="text-sm text-gray-700">
                **Data de criacao:** {selectedItem.created_at}
            </p>
          </div>
          <div className="flex flex-col space-y-2 justify-center">
            <Button className="w-full h-12 bg-cyan-500 text-white ">
              <Download className="w-5 h-5 mr-2" />
              Baixar atestado
            </Button>

            <Button variant="outline" className="w-full h-12 text-gray-700 border-gray-300 hover:bg-gray-100">
              <Share className="w-5 h-5 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
