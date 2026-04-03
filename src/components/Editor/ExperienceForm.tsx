import { useResumeStore } from '../../stores/useResumeStore';
import { Plus, Trash2, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { ExperienceItem } from '../../types/resume';

const ExperienceForm = () => {
  const resume = useResumeStore((s) => s.activeResume());
  const { addExperience, updateExperience, removeExperience } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!resume) return null;

  return (
    <div className="section-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Briefcase size={18} className="text-primary" /> Experiência Profissional
        </h3>
        <button onClick={() => addExperience()} className="btn-primary text-sm py-1.5 px-3">
          <Plus size={14} /> Adicionar
        </button>
      </div>
      <div className="space-y-3">
        {resume.experience.length === 0 && (
          <p className="text-center text-muted-foreground py-6 text-sm">
            Nenhuma experiência adicionada. Clique em "Adicionar" para começar.
          </p>
        )}
        {resume.experience.map((exp) => (
          <ExperienceCard
            key={exp.id}
            item={exp}
            expanded={expandedId === exp.id}
            onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            onUpdate={(data) => updateExperience(exp.id, data)}
            onRemove={() => removeExperience(exp.id)}
          />
        ))}
      </div>
    </div>
  );
};

const ExperienceCard = ({ item, expanded, onToggle, onUpdate, onRemove }: {
  item: ExperienceItem; expanded: boolean;
  onToggle: () => void; onUpdate: (data: Partial<ExperienceItem>) => void; onRemove: () => void;
}) => (
  <div className="border border-border rounded-xl overflow-hidden animate-scale-in">
    <div className="flex items-center justify-between p-3 bg-secondary/30 cursor-pointer" onClick={onToggle}>
      <div className="min-w-0">
        <p className="font-medium text-foreground text-sm truncate">{item.position || 'Nova Experiência'}</p>
        <p className="text-xs text-muted-foreground truncate">{item.company || 'Empresa'}</p>
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
        <input className="input-field" placeholder="Cargo" value={item.position} onChange={(e) => onUpdate({ position: e.target.value })} />
        <input className="input-field" placeholder="Empresa" value={item.company} onChange={(e) => onUpdate({ company: e.target.value })} />
        <div className="grid grid-cols-2 gap-3">
          <input className="input-field" placeholder="Início (ex: 2020-01)" value={item.startDate} onChange={(e) => onUpdate({ startDate: e.target.value })} />
          <input className="input-field" placeholder="Término" value={item.endDate} disabled={item.current} onChange={(e) => onUpdate({ endDate: e.target.value })} />
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" checked={item.current} onChange={(e) => onUpdate({ current: e.target.checked, endDate: e.target.checked ? '' : item.endDate })} className="accent-primary" />
          Trabalho atual
        </label>
        <textarea className="input-field min-h-[80px] resize-none" placeholder="Descrição das atividades..." value={item.description} onChange={(e) => onUpdate({ description: e.target.value })} />
      </div>
    )}
  </div>
);

export default ExperienceForm;
