import { useResumeStore } from '../../stores/useResumeStore';
import { Plus, Trash2, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { EducationItem } from '../../types/resume';

const EducationForm = () => {
  const resume = useResumeStore((s) => s.activeResume());
  const { addEducation, updateEducation, removeEducation } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!resume) return null;

  return (
    <div className="section-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <GraduationCap size={18} className="text-primary" /> Formação Acadêmica
        </h3>
        <button onClick={() => addEducation()} className="btn-primary text-sm py-1.5 px-3">
          <Plus size={14} /> Adicionar
        </button>
      </div>
      <div className="space-y-3">
        {resume.education.length === 0 && (
          <p className="text-center text-muted-foreground py-6 text-sm">Nenhuma formação adicionada.</p>
        )}
        {resume.education.map((edu) => (
          <EducationCard
            key={edu.id} item={edu}
            expanded={expandedId === edu.id}
            onToggle={() => setExpandedId(expandedId === edu.id ? null : edu.id)}
            onUpdate={(data) => updateEducation(edu.id, data)}
            onRemove={() => removeEducation(edu.id)}
          />
        ))}
      </div>
    </div>
  );
};

const EducationCard = ({ item, expanded, onToggle, onUpdate, onRemove }: {
  item: EducationItem; expanded: boolean;
  onToggle: () => void; onUpdate: (data: Partial<EducationItem>) => void; onRemove: () => void;
}) => (
  <div className="border border-border rounded-xl overflow-hidden animate-scale-in">
    <div className="flex items-center justify-between p-3 bg-secondary/30 cursor-pointer" onClick={onToggle}>
      <div className="min-w-0">
        <p className="font-medium text-foreground text-sm truncate">{item.degree || 'Nova Formação'} {item.field && `— ${item.field}`}</p>
        <p className="text-xs text-muted-foreground truncate">{item.institution || 'Instituição'}</p>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
          <Trash2 size={14} />
        </button>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </div>
    </div>
    {expanded && (
      <div className="p-4 grid gap-3 animate-slide-up">
        <input className="input-field" placeholder="Instituição" value={item.institution} onChange={(e) => onUpdate({ institution: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <input className="input-field" placeholder="Grau (Ex: Bacharelado)" value={item.degree} onChange={(e) => onUpdate({ degree: e.target.value })} />
          <input className="input-field" placeholder="Área" value={item.field} onChange={(e) => onUpdate({ field: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="input-field" placeholder="Início" value={item.startDate} onChange={(e) => onUpdate({ startDate: e.target.value })} />
          <input className="input-field" placeholder="Término" value={item.endDate} disabled={item.current} onChange={(e) => onUpdate({ endDate: e.target.value })} />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={item.current} onChange={(e) => onUpdate({ current: e.target.checked })} className="accent-primary" /> Cursando
        </label>
        <textarea className="input-field min-h-[60px] resize-none" placeholder="Descrição (opcional)" value={item.description} onChange={(e) => onUpdate({ description: e.target.value })} />
      </div>
    )}
  </div>
);

export default EducationForm;
