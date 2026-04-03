import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface Props { data: ResumeData; theme: ThemeConfig; }

const LANG_LABELS: Record<string, string> = {
  basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado', fluente: 'Fluente', nativo: 'Nativo',
};

const fontSize = (t: ThemeConfig) => t.fontSize === 'small' ? 'text-[10px]' : t.fontSize === 'large' ? 'text-[13px]' : 'text-[11.5px]';
const spacing = (t: ThemeConfig) => t.spacing === 'compact' ? 'gap-2' : t.spacing === 'relaxed' ? 'gap-5' : 'gap-3.5';

const ModernTemplate = ({ data, theme }: Props) => {
  const { personalInfo: p } = data;
  const fs = fontSize(theme);
  const sp = spacing(theme);
  const color = theme.primaryColor;

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[13px] font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ color, borderColor: color + '40', fontFamily: theme.fontFamily }}>{children}</h3>
  );

  return (
    <div className={`w-full h-full bg-white flex ${fs}`} style={{ fontFamily: theme.fontFamily }}>
      {/* Sidebar */}
      <div className="w-[34%] p-5 text-white flex flex-col" style={{ backgroundColor: color }}>
        <div className="mb-5">
          <h1 className="text-[18px] font-bold leading-tight">{p.fullName || 'Seu Nome'}</h1>
          <p className="text-[11px] opacity-90 mt-1 font-medium">{p.jobTitle || 'Seu Cargo'}</p>
        </div>
        <div className="space-y-1.5 text-[10px]">
          {p.email && <div className="flex items-center gap-1.5"><Mail size={10} /><span className="break-all">{p.email}</span></div>}
          {p.phone && <div className="flex items-center gap-1.5"><Phone size={10} /><span>{p.phone}</span></div>}
          {p.location && <div className="flex items-center gap-1.5"><MapPin size={10} /><span>{p.location}</span></div>}
          {p.linkedin && <div className="flex items-center gap-1.5"><Linkedin size={10} /><span className="break-all">{p.linkedin}</span></div>}
          {p.website && <div className="flex items-center gap-1.5"><Globe size={10} /><span className="break-all">{p.website}</span></div>}
        </div>

        {data.skills.length > 0 && (
          <div className="mt-5">
            <h3 className="text-[12px] font-bold uppercase tracking-wider mb-2 pb-1 border-b border-white/30">Habilidades</h3>
            <div className="space-y-1.5">
              {data.skills.map((s) => (
                <div key={s.id}>
                  <div className="flex justify-between text-[10px] mb-0.5"><span>{s.name}</span></div>
                  <div className="h-1 bg-white/20 rounded-full"><div className="h-full bg-white/80 rounded-full" style={{ width: `${s.level * 20}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div className="mt-5">
            <h3 className="text-[12px] font-bold uppercase tracking-wider mb-2 pb-1 border-b border-white/30">Idiomas</h3>
            <div className="space-y-1 text-[10px]">
              {data.languages.map((l) => (
                <div key={l.id} className="flex justify-between"><span>{l.name}</span><span className="opacity-80">{LANG_LABELS[l.level]}</span></div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className={`flex-1 p-5 flex flex-col ${sp} text-gray-800`}>
        {data.summary && (
          <div><SectionTitle>Resumo</SectionTitle><p className="leading-relaxed text-gray-600">{data.summary}</p></div>
        )}
        {data.experience.length > 0 && (
          <div>
            <SectionTitle>Experiência</SectionTitle>
            <div className={sp}>
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div><p className="font-semibold text-gray-900 text-[12px]">{exp.position}</p><p className="text-gray-500 text-[10px]">{exp.company}</p></div>
                    <span className="text-[9px] text-gray-400 whitespace-nowrap">{exp.startDate} — {exp.current ? 'Atual' : exp.endDate}</span>
                  </div>
                  {exp.description && <p className="mt-1 text-gray-600 leading-relaxed">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <SectionTitle>Formação</SectionTitle>
            <div className={sp}>
              {data.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div><p className="font-semibold text-gray-900 text-[12px]">{edu.degree} {edu.field && `em ${edu.field}`}</p><p className="text-gray-500 text-[10px]">{edu.institution}</p></div>
                    <span className="text-[9px] text-gray-400 whitespace-nowrap">{edu.startDate} — {edu.current ? 'Atual' : edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.additionalInfo && (
          <div><SectionTitle>Informações Complementares</SectionTitle><p className="leading-relaxed text-gray-600">{data.additionalInfo}</p></div>
        )}
      </div>
    </div>
  );
};

export default ModernTemplate;
