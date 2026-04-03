import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ThemeConfig, TemplateId } from '../types/resume';

interface ThemeStore {
  theme: ThemeConfig;
  setTemplate: (id: TemplateId) => void;
  setPrimaryColor: (color: string) => void;
  setFontFamily: (font: string) => void;
  setFontSize: (size: ThemeConfig['fontSize']) => void;
  setSpacing: (spacing: ThemeConfig['spacing']) => void;
  setShowPhoto: (show: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: {
        templateId: 'modern',
        primaryColor: '#2563eb',
        fontFamily: 'Inter',
        fontSize: 'medium',
        spacing: 'normal',
        showPhoto: false,
      },
      setTemplate: (templateId) => set((s) => ({ theme: { ...s.theme, templateId } })),
      setPrimaryColor: (primaryColor) => set((s) => ({ theme: { ...s.theme, primaryColor } })),
      setFontFamily: (fontFamily) => set((s) => ({ theme: { ...s.theme, fontFamily } })),
      setFontSize: (fontSize) => set((s) => ({ theme: { ...s.theme, fontSize } })),
      setSpacing: (spacing) => set((s) => ({ theme: { ...s.theme, spacing } })),
      setShowPhoto: (showPhoto) => set((s) => ({ theme: { ...s.theme, showPhoto } })),
    }),
    { name: 'resumeforge-theme' }
  )
);
