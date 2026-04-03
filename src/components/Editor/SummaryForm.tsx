import { useResumeStore } from '../../stores/useResumeStore';
import { FileText, MessageSquare } from 'lucide-react';

const SummaryForm = () => {
  const resume = useResumeStore((s) => s.activeResume());
  const { updateSummary, updateAdditionalInfo } = useResumeStore();

  if (!resume) return null;

  return (
    <div className="space-y-4">
      <div className="section-card animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
          <FileText size={18} className="text-primary" /> Resumo Profissional
        </h3>
        <textarea
          className="input-field min-h-[120px] resize-none"
          placeholder="Escreva um breve resumo sobre você, suas principais competências e objetivos profissionais..."
          value={resume.summary}
          onChange={(e) => updateSummary(e.target.value)}
        />
      </div>
      <div className="section-card animate-fade-in">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
          <MessageSquare size={18} className="text-primary" /> Informações Complementares
        </h3>
        <textarea
          className="input-field min-h-[80px] resize-none"
          placeholder="Hobbies, voluntariado, disponibilidade para viagens, etc."
          value={resume.additionalInfo}
          onChange={(e) => updateAdditionalInfo(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SummaryForm;
