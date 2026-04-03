import { useActiveResume, useResumeStore } from '../../stores/useResumeStore';
import { Plus, Trash2, Briefcase, ChevronDown, ChevronUp, Building2, Calendar } from 'lucide-react';
import { useState } from 'react';
import type { ExperienceItem } from '../../types/resume';

const ExperienceForm = () => {
  const resume = useActiveResume();
  const { addExperience, updateExperience, removeExperience } = useResumeStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!resume) return null;

  return (
    <div className="section-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl">
            <Briefcase size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Experiência</h3>
            <p className="text-xs text-muted-foreground">{resume.experience.length} {resume.experience.length === 1 ? 'cargo' : 'cargos'}</p>
          </div>
        </div>
        <button onClick={() => { addExperience(); setTimeout(() => { const items = resume.experience; if (items.length > 0) setExpandedId(items[items.length - 1].id); }, 50); }} className="btn-primary text-xs py-2 px-3">
          <Plus size={13} /> Adicionar
        </button>
      </div>

      {resume.experience.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Building2 size={20} /></div>
          <p className="text-sm font-medium text-foreground">Nenhuma experiência</p>
          <p className="text-xs text-muted-foreground mt-0.5">Adicione suas experiências profissionais</p>
        </div>
      ) : (
        <div className="space-y-2">
          {resume.experience.map((exp, i) => (
            <ExperienceCard
              key={exp.id} item={exp} index={i}
              expanded={expandedId === exp.id}
              onToggle={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              onUpdate={(data) => updateExperience(exp.id, data)}
              onRemove={() => removeExperience(exp.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ExperienceCard = ({ item, index, expanded, onToggle, onUpdate, onRemove }: {
  item: ExperienceItem; index: number; expanded: boolean;
  onToggle: () => void; onUpdate: (data: Partial<ExperienceItem>) => void; onRemove: () => void;
}) => (
  <div className={`border rounded-xl overflow-hidden transition-all duration-200 animate-scale-in ${expanded ? 'border-primary/30 shadow-sm' : 'border-border'}`}>
    <div className="collapsible-header" onClick={onToggle}>
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
          {index + 1}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-foreground text-sm truncate">{item.position || 'Nova Experiência'}</p>
          <p className="text-[11px] text-muted-foreground truncate flex items-center gap-1">
            <Building2 size={10} /> {item.company || 'Empresa'}
            {item.current && <span className="badge-success ml-1">Atual</span>}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="btn-icon !w-7 !h-7 text-destructive hover:bg-destructive/10">
          <Trash2 size={13} />
        </button>
        <div className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
          <ChevronDown size={15} className="text-muted-foreground" />
        </div>
      </div>
    </div>
    {expanded && (
      <div className="px-4 pb-4 grid gap-3 animate-slide-up">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="input-label"><Briefcase size={11} /> Cargo</label>
            <input className="input-field" placeholder="Cargo" value={item.position} onChange={(e) => onUpdate({ position: e.target.value })} />
          </div>
          <div>
            <label className="input-label"><Building2 size={11} /> Empresa</label>
            <input className="input-field" placeholder="Empresa" value={item.company} onChange={(e) => onUpdate({ company: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="input-label"><Calendar size={11} /> Início</label>
            <input className="input-field" placeholder="2020-01" value={item.startDate} onChange={(e) => onUpdate({ startDate: e.target.value })} />
          </div>
          <div>
            <label className="input-label"><Calendar size={11} /> Término</label>
            <input className="input-field" placeholder="2023-12" value={item.endDate} disabled={item.current} onChange={(e) => onUpdate({ endDate: e.target.value })} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer select-none">
          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${item.current ? 'bg-primary border-primary' : 'border-border'}`}>
            {item.current && <div className="w-1.5 h-1.5 rounded-sm bg-primary-foreground" />}
          </div>
          <input type="checkbox" className="sr-only" checked={item.current} onChange={(e) => onUpdate({ current: e.target.checked, endDate: e.target.checked ? '' : item.endDate })} />
          Trabalho atual
        </label>
        <div>
          <label className="input-label">Descrição</label>
          <textarea className="input-field min-h-[80px] resize-none" placeholder="Descreva suas atividades e conquistas..." value={item.description} onChange={(e) => onUpdate({ description: e.target.value })} />
        </div>
      </div>
    )}
  </div>
);

export default ExperienceForm;
