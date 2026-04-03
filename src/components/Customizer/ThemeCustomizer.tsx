import { useThemeStore } from '../../stores/useThemeStore';
import { Palette, Type, Maximize2 } from 'lucide-react';
import type { TemplateId } from '../../types/resume';

const COLORS = ['#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626', '#7c3aed', '#db2777', '#1e293b'];
const FONTS = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Merriweather', 'Playfair Display'];
const TEMPLATES: { id: TemplateId; name: string; desc: string }[] = [
  { id: 'modern', name: 'Moderno', desc: 'Limpo e profissional com sidebar colorida' },
  { id: 'minimalist', name: 'Minimalista', desc: 'Elegante e discreto com tipografia refinada' },
  { id: 'classic', name: 'Clássico', desc: 'Tradicional e formal para áreas corporativas' },
];

const ThemeCustomizer = () => {
  const { theme, setTemplate, setPrimaryColor, setFontFamily, setFontSize, setSpacing, setShowPhoto } = useThemeStore();

  return (
    <div className="space-y-4">
      {/* Templates */}
      <div className="section-card animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
          <Maximize2 size={18} className="text-primary" /> Template
        </h3>
        <div className="grid gap-2">
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => setTemplate(t.id)}
              className={`p-3 rounded-xl border-2 text-left transition-all ${theme.templateId === t.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`}>
              <p className="font-medium text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="section-card animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
          <Palette size={18} className="text-primary" /> Cor Principal
        </h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => (
            <button key={c} onClick={() => setPrimaryColor(c)}
              className={`w-9 h-9 rounded-full transition-all ${theme.primaryColor === c ? 'ring-2 ring-offset-2 ring-foreground scale-110' : 'hover:scale-105'}`}
              style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div className="section-card animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
          <Type size={18} className="text-primary" /> Fonte
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map((f) => (
            <button key={f} onClick={() => setFontFamily(f)}
              className={`p-2 rounded-xl border text-sm transition-all ${theme.fontFamily === f ? 'border-primary bg-primary/5 font-medium text-foreground' : 'border-border text-muted-foreground hover:border-primary/30'}`}
              style={{ fontFamily: f }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Size & Spacing */}
      <div className="section-card animate-fade-in">
        <h3 className="text-sm font-semibold text-foreground mb-3">Tamanho do Texto</h3>
        <div className="flex gap-2">
          {(['small', 'medium', 'large'] as const).map((s) => (
            <button key={s} onClick={() => setFontSize(s)}
              className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all ${theme.fontSize === s ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground'}`}>
              {s === 'small' ? 'Pequeno' : s === 'medium' ? 'Médio' : 'Grande'}
            </button>
          ))}
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-3 mt-4">Espaçamento</h3>
        <div className="flex gap-2">
          {(['compact', 'normal', 'relaxed'] as const).map((s) => (
            <button key={s} onClick={() => setSpacing(s)}
              className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all ${theme.spacing === s ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground'}`}>
              {s === 'compact' ? 'Compacto' : s === 'normal' ? 'Normal' : 'Amplo'}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
          <input type="checkbox" checked={theme.showPhoto} onChange={(e) => setShowPhoto(e.target.checked)} className="accent-primary" />
          Exibir foto no currículo
        </label>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
