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
    className={`w-20 h-20 bg-gray-200 rounded-lg overflow-hidden border-2 cursor-pointer ${
      isActive ? "border-cyan-500 shadow-md" : "border-transparent hover:border-gray-400"
    }`}
  >
    <img src={url} alt="Thumbnail" className="w-full h-full object-cover" />
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
    <Card className="w-lg max-w-4xl mx-auto shadow-2xl ">
      <CardContent className="p-6 space-y-4">
        <div className="relative flex items-center">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 0}
            className="absolute left-0 p-2"
          >
            <ChevronLeft className="w-5 h-5" />
            </Button>
          <ScrollArea className="w-[86%] whitespace-nowrap pb-2 mx-8">
            <div className="flex space-x-3 items-center">
              <Button
                variant="outline"
                className="w-20 h-20 flex-shrink-0 border-dashed border-2 text-gray-500 hover:text-cyan-600 hover:border-cyan-600 transition-colors"
                onClick={handlePlusClick}
              >
                <Plus className="w-5 h-5" />
            </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
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

        <div className="w-full aspect-[4/3] bg-gray-300 rounded-lg overflow-hidden flex items-center justify-center">
          <img src={selectedItem.url} alt="Selected" className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Detalhes do Documento</h3>
            <p className="text-sm text-gray-700">
                **Data de criacao:** {selectedItem.created_at}
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
      </CardContent>
    </Card>
  );
}
