import { create } from 'zustand';

const globalstates = create((set) => ({
  // 1. Initial State
  isLarge: typeof window !== 'undefined' ? window.innerWidth >= 1024 : false,

  // 2. Action to update the state
  setIsLarge: (width) => set({ isLarge: width >= 1024 }),
}));

// 3. One-time listener setup (Call this in your App.js or Root layout)
if (typeof window !== 'undefined') {
  window.addEventListener('resize', () => {
    globalstates.getState().setIsLarge(window.innerWidth);
  });
}

export default globalstates;