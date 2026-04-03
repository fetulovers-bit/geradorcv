import { useState, useEffect } from 'react';
import { useResumeStore } from '../stores/useResumeStore';
import PersonalInfoForm from '../components/Editor/PersonalInfoForm';
import ExperienceForm from '../components/Editor/ExperienceForm';
import EducationForm from '../components/Editor/EducationForm';
import SkillsForm from '../components/Editor/SkillsForm';
import SummaryForm from '../components/Editor/SummaryForm';
import ThemeCustomizer from '../components/Customizer/ThemeCustomizer';
import ResumePreview from '../components/Preview/ResumePreview';
import { FileText, User, Briefcase, Palette, Eye, PenLine, Plus, Sparkles } from 'lucide-react';

type Tab = 'personal' | 'content' | 'customize';
type MobileView = 'edit' | 'preview';

const ResumeBuilder = () => {
  const { activeResume, createResume, loadSampleData } = useResumeStore();
  const resume = activeResume();
  const [tab, setTab] = useState<Tab>('personal');
  const [mobileView, setMobileView] = useState<MobileView>('edit');

  useEffect(() => {
    if (!resume) { createResume(); }
  }, [resume, createResume]);

  if (!resume) return null;

  const tabs: { id: Tab; label: string; icon: typeof User }[] = [
    { id: 'personal', label: 'Dados', icon: User },
    { id: 'content', label: 'Conteúdo', icon: Briefcase },
    { id: 'customize', label: 'Personalizar', icon: Palette },
  ];

  const EditorContent = () => (
    <div className="space-y-4 animate-fade-in">
      {tab === 'personal' && <PersonalInfoForm />}
      {tab === 'content' && (
        <>
          <SummaryForm />
          <ExperienceForm />
          <EducationForm />
          <SkillsForm />
        </>
      )}
      {tab === 'customize' && <ThemeCustomizer />}
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <FileText size={22} className="text-primary" />
          <h1 className="text-lg font-bold text-foreground">ResumeForge</h1>
        </div>
        <button onClick={loadSampleData} className="btn-ghost text-xs">
          <Sparkles size={14} /> Dados de exemplo
        </button>
      </header>

      {/* Mobile view toggle */}
      <div className="lg:hidden flex border-b border-border bg-card">
        <button onClick={() => setMobileView('edit')}
          className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${mobileView === 'edit' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}>
          <PenLine size={14} /> Editar
        </button>
        <button onClick={() => setMobileView('preview')}
          className={`flex-1 py-2.5 text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${mobileView === 'preview' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}>
          <Eye size={14} /> Visualizar
        </button>
      </div>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor panel */}
        <div className={`w-full lg:w-[420px] xl:w-[460px] flex flex-col border-r border-border bg-card ${mobileView === 'preview' ? 'hidden lg:flex' : 'flex'}`}>
          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex-1 py-2.5 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${tab === t.id ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                <t.icon size={14} /> {t.label}
              </button>
            ))}
          </div>
          {/* Scrollable form area */}
          <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
            <EditorContent />
          </div>
        </div>

        {/* Preview panel */}
        <div className={`flex-1 ${mobileView === 'edit' ? 'hidden lg:block' : 'block'}`}>
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
