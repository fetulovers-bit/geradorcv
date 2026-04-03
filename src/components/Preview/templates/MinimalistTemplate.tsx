import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface Props { data: ResumeData; theme: ThemeConfig; }

const LANG_LABELS: Record<string, string> = {
  basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado', fluente: 'Fluente', nativo: 'Nativo',
};

const MinimalistTemplate = ({ data, theme }: Props) => {
  const { personalInfo: p } = data;
  const color = theme.primaryColor;
  const gap = theme.spacing === 'compact' ? 'gap-3' : theme.spacing === 'relaxed' ? 'gap-6' : 'gap-4';
  const textSize = theme.fontSize === 'small' ? 'text-[10px]' : theme.fontSize === 'large' ? 'text-[13px]' : 'text-[11.5px]';

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-[12px] font-semibold tracking-wide mb-2" style={{ color, fontFamily: theme.fontFamily }}>{children}</h3>
  );

  return (
    <div className={`w-full h-full bg-white p-8 ${textSize}`} style={{ fontFamily: theme.fontFamily }}>
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-[22px] font-light tracking-wide text-gray-900">{p.fullName || 'Seu Nome'}</h1>
        <p className="text-[12px] mt-1 font-medium" style={{ color }}>{p.jobTitle || 'Seu Cargo'}</p>
        <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1 mt-2 text-[9px] text-gray-500">
          {p.email && <span className="flex items-center gap-1"><Mail size={9} />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1"><Phone size={9} />{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1"><MapPin size={9} />{p.location}</span>}
          {p.linkedin && <span className="flex items-center gap-1"><Linkedin size={9} />{p.linkedin}</span>}
          {p.website && <span className="flex items-center gap-1"><Globe size={9} />{p.website}</span>}
        </div>
      </div>
      <div className="h-px w-full mb-4" style={{ backgroundColor: color + '30' }} />

      <div className={`flex flex-col ${gap}`}>
        {data.summary && <div><SectionTitle>RESUMO</SectionTitle><p className="text-gray-600 leading-relaxed">{data.summary}</p></div>}
        {data.experience.length > 0 && (
          <div><SectionTitle>EXPERIÊNCIA</SectionTitle>
            <div className={gap}>
              {data.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between"><span className="font-medium text-gray-900 text-[12px]">{e.position}</span><span className="text-[9px] text-gray-400">{e.startDate} — {e.current ? 'Atual' : e.endDate}</span></div>
                  <p className="text-gray-500 text-[10px] italic">{e.company}</p>
                  {e.description && <p className="mt-1 text-gray-600 leading-relaxed">{e.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div><SectionTitle>FORMAÇÃO</SectionTitle>
            <div className={gap}>
              {data.education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between"><span className="font-medium text-gray-900 text-[12px]">{e.degree} {e.field && `em ${e.field}`}</span><span className="text-[9px] text-gray-400">{e.startDate} — {e.current ? 'Atual' : e.endDate}</span></div>
                  <p className="text-gray-500 text-[10px] italic">{e.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {(data.skills.length > 0 || data.languages.length > 0) && (
          <div className="grid grid-cols-2 gap-6">
            {data.skills.length > 0 && (
              <div><SectionTitle>HABILIDADES</SectionTitle>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((s) => <span key={s.id} className="px-2 py-0.5 rounded-full text-[9px] border border-gray-200 text-gray-700">{s.name}</span>)}
                </div>
              </div>
            )}
            {data.languages.length > 0 && (
              <div><SectionTitle>IDIOMAS</SectionTitle>
                <div className="space-y-0.5 text-[10px] text-gray-600">
                  {data.languages.map((l) => <div key={l.id}><span className="font-medium">{l.name}</span> — {LANG_LABELS[l.level]}</div>)}
                </div>
              </div>
            )}
          </div>
        )}
        {data.additionalInfo && <div><SectionTitle>INFORMAÇÕES COMPLEMENTARES</SectionTitle><p className="text-gray-600 leading-relaxed">{data.additionalInfo}</p></div>}
      </div>
    </div>
  );
};

export default MinimalistTemplate;
