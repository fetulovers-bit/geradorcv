import { useThemeStore } from '../../stores/useThemeStore';
import { Palette, Type, Maximize2, Layout, Check } from 'lucide-react';
import type { TemplateId } from '../../types/resume';

const COLORS = [
  { value: '#2563eb', label: 'Azul' },
  { value: '#0891b2', label: 'Ciano' },
  { value: '#059669', label: 'Verde' },
  { value: '#d97706', label: 'Âmbar' },
  { value: '#dc2626', label: 'Vermelho' },
  { value: '#7c3aed', label: 'Violeta' },
  { value: '#db2777', label: 'Rosa' },
  { value: '#1e293b', label: 'Escuro' },
];

const FONTS = [
  { value: 'Inter', style: 'Sans-serif moderna' },
  { value: 'Roboto', style: 'Sans-serif clássica' },
  { value: 'Open Sans', style: 'Amigável e limpa' },
  { value: 'Lato', style: 'Leve e elegante' },
  { value: 'Montserrat', style: 'Geométrica e forte' },
  { value: 'Merriweather', style: 'Serifada editorial' },
  { value: 'Playfair Display', style: 'Serifada sofisticada' },
];

const TEMPLATES: { id: TemplateId; name: string; desc: string; preview: string }[] = [
  { id: 'modern', name: 'Moderno', desc: 'Sidebar colorida com layout dividido', preview: '⬛🟦' },
  { id: 'minimalist', name: 'Minimalista', desc: 'Tipografia refinada e espaço generoso', preview: '📄✨' },
  { id: 'classic', name: 'Clássico', desc: 'Layout formal com bordas e hierarquia clara', preview: '📋📝' },
];

const ThemeCustomizer = () => {
  const { theme, setTemplate, setPrimaryColor, setFontFamily, setFontSize, setSpacing, setShowPhoto } = useThemeStore();

  return (
    <div className="space-y-4">
      {/* Templates */}
      <div className="section-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl"><Layout size={18} /></div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Template</h3>
            <p className="text-xs text-muted-foreground">Escolha o layout do currículo</p>
          </div>
        </div>
        <div className="grid gap-2">
          {TEMPLATES.map((t) => (
            <button key={t.id} onClick={() => setTemplate(t.id)}
              className={`p-3 rounded-xl border-2 text-left transition-all duration-200 flex items-center gap-3 ${theme.templateId === t.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-border hover:border-primary/30'}`}>
              <span className="text-xl">{t.preview}</span>
              <div>
                <p className="font-medium text-foreground text-sm">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.desc}</p>
              </div>
              {theme.templateId === t.id && <Check size={16} className="text-primary ml-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="section-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl"><Palette size={18} /></div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Cor Principal</h3>
            <p className="text-xs text-muted-foreground">Define o tom visual do currículo</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {COLORS.map((c) => (
            <button key={c.value} onClick={() => setPrimaryColor(c.value)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all ${theme.primaryColor === c.value ? 'border-foreground/20 bg-secondary shadow-sm scale-105' : 'border-transparent hover:bg-secondary/50'}`}>
              <div className="w-8 h-8 rounded-full shadow-sm" style={{ backgroundColor: c.value }}>
                {theme.primaryColor === c.value && <div className="w-full h-full rounded-full flex items-center justify-center"><Check size={14} className="text-white" /></div>}
              </div>
              <span className="text-[10px] text-muted-foreground">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div className="section-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl"><Type size={18} /></div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Tipografia</h3>
            <p className="text-xs text-muted-foreground">Escolha a fonte do currículo</p>
          </div>
        </div>
        <div className="space-y-1.5">
          {FONTS.map((f) => (
            <button key={f.value} onClick={() => setFontFamily(f.value)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${theme.fontFamily === f.value ? 'border-primary/30 bg-primary/5' : 'border-border/50 hover:border-border'}`}>
              <div>
                <p className="text-sm font-medium text-foreground" style={{ fontFamily: f.value }}>{f.value}</p>
                <p className="text-[10px] text-muted-foreground">{f.style}</p>
              </div>
              {theme.fontFamily === f.value && <Check size={14} className="text-primary flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Size & Spacing */}
      <div className="section-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl"><Maximize2 size={18} /></div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Ajustes Finos</h3>
            <p className="text-xs text-muted-foreground">Tamanho e espaçamento</p>
          </div>
        </div>

        <label className="input-label mb-2">Tamanho do Texto</label>
        <div className="flex gap-1.5 mb-4">
          {([['small', 'Pequeno'], ['medium', 'Médio'], ['large', 'Grande']] as const).map(([val, label]) => (
            <button key={val} onClick={() => setFontSize(val)}
              className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all ${theme.fontSize === val ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:border-primary/30'}`}>
              {label}
            </button>
          ))}
        </div>

        <label className="input-label mb-2">Espaçamento</label>
        <div className="flex gap-1.5 mb-4">
          {([['compact', 'Compacto'], ['normal', 'Normal'], ['relaxed', 'Amplo']] as const).map(([val, label]) => (
            <button key={val} onClick={() => setSpacing(val)}
              className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all ${theme.spacing === val ? 'border-primary bg-primary/5 text-foreground' : 'border-border text-muted-foreground hover:border-primary/30'}`}>
              {label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-3 p-3 rounded-xl bg-secondary/40 border border-border/50 cursor-pointer select-none">
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${theme.showPhoto ? 'bg-primary border-primary' : 'border-border'}`}>
            {theme.showPhoto && <Check size={12} className="text-primary-foreground" />}
          </div>
          <input type="checkbox" className="sr-only" checked={theme.showPhoto} onChange={(e) => setShowPhoto(e.target.checked)} />
          <div>
            <p className="text-sm font-medium text-foreground">Exibir foto</p>
            <p className="text-[10px] text-muted-foreground">Mostra a foto no currículo</p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
