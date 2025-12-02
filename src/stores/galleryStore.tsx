import { GalleryItem } from "@/interfaces/image";
import { create } from "zustand";

interface GalleryState {
  optimisticItems: GalleryItem[];
  addOptimisticItem: (item: GalleryItem) => void;
  removeOptimisticItem: (tempId: string) => void;
  clearOptimisticItems: () => void;
}

const revokeUrl = (item: GalleryItem) => {
    if (item.isOptimistic && item.url.startsWith("blob:")) {
        URL.revokeObjectURL(item.url);
    }
};

export const useGalleryStore = create<GalleryState>((set) => ({
  optimisticItems: [],

  addOptimisticItem: (item) =>
    set((state) => ({ optimisticItems: [item, ...state.optimisticItems] })),

  removeOptimisticItem: (tempId) =>
    set((state) => {
        const itemToRemove = state.optimisticItems.find((item) => item.tempId === tempId);
        if (itemToRemove) {
            revokeUrl(itemToRemove);
        }
        return {
            optimisticItems: state.optimisticItems.filter(
                (item) => item.tempId !== tempId
            ),
        };
    }),

  clearOptimisticItems: () => set((state) => {
      state.optimisticItems.forEach(revokeUrl);
      return { optimisticItems: [] };
  }),
}));