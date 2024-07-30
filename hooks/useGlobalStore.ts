// src/hooks/useGlobalStore.ts
import { create } from 'zustand';

interface StoreState {
    tBoxes: number;
    tBoxesOutline: number;
    tBoxesStatusProcessed: number;
    tBoxesStatusOutline: number;
    tBoxesMissing: number;
    tHousesToOutline: number;
    tHousesInOutline: number;
    setTBoxes: (count: number) => void;
    setTBoxesOutline: (count: number) => void;
    setTBoxesStatusProcessed: (count: number) => void;
    setTBoxesStatusOutline: (count: number) => void;
    setTBoxesMissing: (count: number) => void;
    setTHousesToOutline: (count: number) => void;
    setTHousesInOutline: (count: number) => void;
}

const useStore = create<StoreState>((set) => ({
    tBoxes: 0,
    tBoxesOutline: 0,
    tBoxesStatusProcessed: 0,
    tBoxesStatusOutline: 0,
    tBoxesMissing: 0,
    tHousesToOutline: 0,
    tHousesInOutline: 0,
    setTBoxes: (count) => set({ tBoxes: count }),
    setTBoxesOutline: (count) => set({ tBoxesOutline: count }),
    setTBoxesStatusProcessed: (count) => set({ tBoxesStatusProcessed: count }),
    setTBoxesStatusOutline: (count) => set({ tBoxesStatusOutline: count }),
    setTBoxesMissing: (count) => set({ tBoxesMissing: count }),
    setTHousesToOutline: (count) => set({ tHousesToOutline: count }),
    setTHousesInOutline: (count) => set({ tHousesInOutline: count }),
}));

export default useStore;
