import { useActiveResume, useResumeStore } from '../../stores/useResumeStore';
import { FileText, MessageSquare, AlignLeft } from 'lucide-react';

const SummaryForm = () => {
  const resume = useActiveResume();
  const { updateSummary, updateAdditionalInfo } = useResumeStore();

  if (!resume) return null;

  return (
    <div className="space-y-4">
      <div className="section-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl">
            <AlignLeft size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Resumo Profissional</h3>
            <p className="text-xs text-muted-foreground">Um breve parágrafo sobre você</p>
          </div>
        </div>
        <textarea
          className="input-field min-h-[100px] resize-none leading-relaxed"
          placeholder="Escreva um breve resumo sobre você, suas principais competências e objetivos profissionais..."
          value={resume.summary}
          onChange={(e) => updateSummary(e.target.value)}
        />
        <p className="text-[10px] text-muted-foreground mt-1.5 text-right">{resume.summary.length}/500 caracteres</p>
      </div>

      <div className="section-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl">
            <MessageSquare size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Informações Extra</h3>
            <p className="text-xs text-muted-foreground">Hobbies, voluntariado, etc.</p>
          </div>
        </div>
        <textarea
          className="input-field min-h-[70px] resize-none leading-relaxed"
          placeholder="Hobbies, voluntariado, disponibilidade para viagens..."
          value={resume.additionalInfo}
          onChange={(e) => updateAdditionalInfo(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SummaryForm;
