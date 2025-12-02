import { GalleryItem } from "@/interfaces/image";
import { create } from "zustand";

interface GalleryState {
  optimisticItems: GalleryItem[];
  addOptimisticItem: (item: GalleryItem) => void;
  removeOptimisticItem: (tempId: string) => void;
  clearOptimisticItems: () => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  optimisticItems: [],

  addOptimisticItem: (item) =>
    set((state) => ({ optimisticItems: [item, ...state.optimisticItems] })),

  removeOptimisticItem: (tempId) =>
    set((state) => ({
      optimisticItems: state.optimisticItems.filter(
        (item) => item.tempId !== tempId 
      ),
    })),

  clearOptimisticItems: () => set({ optimisticItems: [] }),
}));