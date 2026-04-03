import { useState, useEffect, useMemo } from 'react';
import { useActiveResume, useResumeStore } from '../stores/useResumeStore';
import PersonalInfoForm from '../components/Editor/PersonalInfoForm';
import ExperienceForm from '../components/Editor/ExperienceForm';
import EducationForm from '../components/Editor/EducationForm';
import SkillsForm from '../components/Editor/SkillsForm';
import SummaryForm from '../components/Editor/SummaryForm';
import ThemeCustomizer from '../components/Customizer/ThemeCustomizer';
import ResumePreview from '../components/Preview/ResumePreview';
import { FileText, User, Briefcase, Palette, Eye, PenLine, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';

type Tab = 'personal' | 'content' | 'customize';
type MobileView = 'edit' | 'preview';

const TAB_CONFIG = [
  { id: 'personal' as Tab, label: 'Dados Pessoais', shortLabel: 'Dados', icon: User, step: 1 },
  { id: 'content' as Tab, label: 'Conteúdo', shortLabel: 'Conteúdo', icon: Briefcase, step: 2 },
  { id: 'customize' as Tab, label: 'Personalizar', shortLabel: 'Estilo', icon: Palette, step: 3 },
];

const ResumeBuilder = () => {
  const { createResume, loadSampleData } = useResumeStore();
  const resume = useActiveResume();
  const [tab, setTab] = useState<Tab>('personal');
  const [mobileView, setMobileView] = useState<MobileView>('edit');

  useEffect(() => {
    if (!resume) createResume();
  }, [resume, createResume]);

  const completionStatus = useMemo(() => {
    if (!resume) return { personal: false, content: false };
    const p = resume.personalInfo;
    return {
      personal: !!(p.fullName && p.email),
      content: resume.experience.length > 0 || resume.education.length > 0,
    };
  }, [resume]);

  if (!resume) return null;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 lg:px-6 py-3 bg-card border-b border-border relative z-10"
        style={{ boxShadow: '0 1px 3px 0 hsl(220 13% 91% / 0.4)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
            <FileText size={16} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-bold text-foreground leading-none">ResumeForge</h1>
            <p className="text-[10px] text-muted-foreground mt-0.5 hidden sm:block">Criador de Currículos Profissional</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadSampleData} className="btn-ghost text-xs gap-1.5 py-1.5 px-3">
            <Sparkles size={13} /> <span className="hidden sm:inline">Exemplo</span>
          </button>
        </div>
      </header>

      {/* Mobile view toggle */}
      <div className="lg:hidden flex bg-card border-b border-border">
        {[
          { view: 'edit' as MobileView, icon: PenLine, label: 'Editar' },
          { view: 'preview' as MobileView, icon: Eye, label: 'Visualizar' },
        ].map(({ view, icon: Icon, label }) => (
          <button key={view} onClick={() => setMobileView(view)}
            className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-1.5 transition-all duration-200 ${mobileView === view ? 'tab-active' : 'tab-inactive'}`}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor panel */}
        <div className={`w-full lg:w-[440px] xl:w-[480px] flex flex-col bg-card border-r border-border ${mobileView === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          {/* Step tabs */}
          <div className="flex border-b border-border px-1">
            {TAB_CONFIG.map((t) => {
              const isActive = tab === t.id;
              const isDone = t.id === 'personal' ? completionStatus.personal : t.id === 'content' ? completionStatus.content : false;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex-1 py-3 text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 relative ${isActive ? 'tab-active' : 'tab-inactive'}`}>
                  {isDone && !isActive ? (
                    <CheckCircle2 size={14} className="text-resume-success" />
                  ) : (
                    <t.icon size={14} />
                  )}
                  <span className="hidden xs:inline sm:inline">{t.shortLabel}</span>
                  <span className="inline xs:hidden sm:hidden">{t.shortLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="px-4 py-2 flex items-center gap-1.5">
            {TAB_CONFIG.map((t, i) => (
              <div key={t.id} className="flex items-center gap-1.5 flex-1">
                <div className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                  tab === t.id ? 'gradient-primary' : 
                  (t.id === 'personal' && completionStatus.personal) || (t.id === 'content' && completionStatus.content) 
                    ? 'bg-primary/40' : 'bg-border'
                }`} />
                {i < TAB_CONFIG.length - 1 && <ChevronRight size={10} className="text-border flex-shrink-0" />}
              </div>
            ))}
          </div>

          {/* Form area */}
          <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
            <div className="animate-fade-in">
              {tab === 'personal' && <PersonalInfoForm />}
              {tab === 'content' && (
                <div className="space-y-4">
                  <SummaryForm />
                  <ExperienceForm />
                  <EducationForm />
                  <SkillsForm />
                </div>
              )}
              {tab === 'customize' && <ThemeCustomizer />}
            </div>

            {/* Navigation buttons */}
            <div className="flex gap-2 mt-6 pb-4">
              {tab !== 'personal' && (
                <button onClick={() => setTab(tab === 'customize' ? 'content' : 'personal')} className="btn-secondary flex-1 text-sm">
                  Anterior
                </button>
              )}
              {tab !== 'customize' && (
                <button onClick={() => setTab(tab === 'personal' ? 'content' : 'customize')} className="btn-primary flex-1 text-sm">
                  Próximo <ChevronRight size={14} />
                </button>
              )}
              {tab === 'customize' && (
                <button onClick={() => setMobileView('preview')} className="btn-primary flex-1 text-sm lg:hidden">
                  <Eye size={14} /> Ver Resultado
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Preview panel */}
        <div className={`flex-1 bg-muted/30 ${mobileView === 'edit' ? 'hidden lg:block' : 'block'}`}>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
