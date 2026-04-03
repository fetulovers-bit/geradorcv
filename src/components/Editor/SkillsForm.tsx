import { useResumeStore } from '../../stores/useResumeStore';
import { Plus, Trash2, Star, Languages } from 'lucide-react';

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
      <div className="section-card animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Star size={18} className="text-primary" /> Habilidades
          </h3>
          <button onClick={() => addSkill()} className="btn-primary text-sm py-1.5 px-3">
            <Plus size={14} /> Adicionar
          </button>
        </div>
        <div className="space-y-2">
          {resume.skills.length === 0 && <p className="text-center text-muted-foreground py-4 text-sm">Nenhuma habilidade adicionada.</p>}
          {resume.skills.map((skill) => (
            <div key={skill.id} className="flex items-center gap-3 animate-scale-in">
              <input className="input-field flex-1" placeholder="Nome da habilidade" value={skill.name} onChange={(e) => updateSkill(skill.id, { name: e.target.value })} />
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => updateSkill(skill.id, { level: n })}
                    className={`w-6 h-6 rounded-full text-xs font-medium transition-colors ${n <= skill.level ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                    {n}
                  </button>
                ))}
              </div>
              <button onClick={() => removeSkill(skill.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="section-card animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Languages size={18} className="text-primary" /> Idiomas
          </h3>
          <button onClick={() => addLanguage()} className="btn-primary text-sm py-1.5 px-3">
            <Plus size={14} /> Adicionar
          </button>
        </div>
        <div className="space-y-2">
          {resume.languages.length === 0 && <p className="text-center text-muted-foreground py-4 text-sm">Nenhum idioma adicionado.</p>}
          {resume.languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-3 animate-scale-in">
              <input className="input-field flex-1" placeholder="Idioma" value={lang.name} onChange={(e) => updateLanguage(lang.id, { name: e.target.value })} />
              <select className="input-field w-40" value={lang.level} onChange={(e) => updateLanguage(lang.id, { level: e.target.value as any })}>
                {Object.entries(levelLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
              <button onClick={() => removeLanguage(lang.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;
