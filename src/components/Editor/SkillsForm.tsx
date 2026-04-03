import { useResumeStore } from '../../stores/useResumeStore';
import { Plus, Trash2, Star, Languages, Zap, X } from 'lucide-react';

const SkillsForm = () => {
  const resume = useResumeStore((s) => s.activeResume());
  const { addSkill, updateSkill, removeSkill, addLanguage, updateLanguage, removeLanguage } = useResumeStore();

  if (!resume) return null;

  const levelLabels: Record<string, string> = {
    basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado', fluente: 'Fluente', nativo: 'Nativo',
  };

  return (
    <div className="space-y-4">
      {/* Skills */}
      <div className="section-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl">
              <Star size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Habilidades</h3>
              <p className="text-xs text-muted-foreground">{resume.skills.length} habilidades</p>
            </div>
          </div>
          <button onClick={() => addSkill()} className="btn-primary text-xs py-2 px-3">
            <Plus size={13} /> Adicionar
          </button>
        </div>

        {resume.skills.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Zap size={20} /></div>
            <p className="text-sm font-medium text-foreground">Nenhuma habilidade</p>
            <p className="text-xs text-muted-foreground mt-0.5">Adicione suas competências técnicas</p>
          </div>
        ) : (
          <div className="space-y-2">
            {resume.skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-2 p-2 rounded-xl bg-secondary/30 border border-border/50 animate-scale-in group">
                <input className="input-field !py-1.5 !text-sm flex-1 !bg-card" placeholder="Habilidade" value={skill.name} onChange={(e) => updateSkill(skill.id, { name: e.target.value })} />
                <div className="flex gap-0.5 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => updateSkill(skill.id, { level: n })}
                      className={`w-5 h-5 rounded-md text-[9px] font-bold transition-all duration-200 ${n <= skill.level ? 'gradient-primary text-primary-foreground shadow-sm' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}>
                      {n}
                    </button>
                  ))}
                </div>
                <button onClick={() => removeSkill(skill.id)} className="btn-icon !w-7 !h-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Languages */}
      <div className="section-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl">
              <Languages size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Idiomas</h3>
              <p className="text-xs text-muted-foreground">{resume.languages.length} idiomas</p>
            </div>
          </div>
          <button onClick={() => addLanguage()} className="btn-primary text-xs py-2 px-3">
            <Plus size={13} /> Adicionar
          </button>
        </div>

        {resume.languages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon"><Languages size={20} /></div>
            <p className="text-sm font-medium text-foreground">Nenhum idioma</p>
            <p className="text-xs text-muted-foreground mt-0.5">Adicione os idiomas que você domina</p>
          </div>
        ) : (
          <div className="space-y-2">
            {resume.languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-2 p-2 rounded-xl bg-secondary/30 border border-border/50 animate-scale-in group">
                <input className="input-field !py-1.5 !text-sm flex-1 !bg-card" placeholder="Idioma" value={lang.name} onChange={(e) => updateLanguage(lang.id, { name: e.target.value })} />
                <select className="input-field !py-1.5 !text-sm !w-32 !bg-card flex-shrink-0" value={lang.level} onChange={(e) => updateLanguage(lang.id, { level: e.target.value as any })}>
                  {Object.entries(levelLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <button onClick={() => removeLanguage(lang.id)} className="btn-icon !w-7 !h-7 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;
