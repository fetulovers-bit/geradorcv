import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface Props { data: ResumeData; theme: ThemeConfig; }

const LANG_LABELS: Record<string, string> = {
  basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado', fluente: 'Fluente', nativo: 'Nativo',
};

const ClassicTemplate = ({ data, theme }: Props) => {
  const { personalInfo: p } = data;
  const color = theme.primaryColor;
  const gap = theme.spacing === 'compact' ? 'gap-3' : theme.spacing === 'relaxed' ? 'gap-6' : 'gap-4';
  const textSize = theme.fontSize === 'small' ? 'text-[10px]' : theme.fontSize === 'large' ? 'text-[13px]' : 'text-[11.5px]';

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-2">
      <h3 className="text-[13px] font-bold uppercase text-gray-800" style={{ fontFamily: theme.fontFamily }}>{children}</h3>
      <div className="h-0.5 mt-1" style={{ backgroundColor: color }} />
    </div>
  );

  return (
    <div className={`w-full h-full bg-white p-7 ${textSize}`} style={{ fontFamily: theme.fontFamily }}>
      {/* Header */}
      <div className="border-b-2 pb-4 mb-4" style={{ borderColor: color }}>
        <h1 className="text-[24px] font-bold text-gray-900">{p.fullName || 'Seu Nome'}</h1>
        <p className="text-[13px] mt-0.5" style={{ color }}>{p.jobTitle || 'Seu Cargo'}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[10px] text-gray-600">
          {p.email && <span className="flex items-center gap-1"><Mail size={10} />{p.email}</span>}
          {p.phone && <span className="flex items-center gap-1"><Phone size={10} />{p.phone}</span>}
          {p.location && <span className="flex items-center gap-1"><MapPin size={10} />{p.location}</span>}
          {p.linkedin && <span className="flex items-center gap-1"><Linkedin size={10} />{p.linkedin}</span>}
          {p.website && <span className="flex items-center gap-1"><Globe size={10} />{p.website}</span>}
        </div>
      </div>

      <div className={`flex flex-col ${gap}`}>
        {data.summary && <div><SectionTitle>Resumo Profissional</SectionTitle><p className="text-gray-600 leading-relaxed">{data.summary}</p></div>}
        {data.experience.length > 0 && (
          <div><SectionTitle>Experiência Profissional</SectionTitle>
            <div className={gap}>
              {data.experience.map((e) => (
                <div key={e.id}>
                  <p className="font-bold text-gray-900 text-[12px]">{e.position}</p>
                  <div className="flex justify-between"><p className="text-gray-600 text-[10px]">{e.company}</p><span className="text-[9px] text-gray-400">{e.startDate} — {e.current ? 'Atual' : e.endDate}</span></div>
                  {e.description && <p className="mt-1 text-gray-600 leading-relaxed">{e.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div><SectionTitle>Formação Acadêmica</SectionTitle>
            <div className={gap}>
              {data.education.map((e) => (
                <div key={e.id}>
                  <p className="font-bold text-gray-900 text-[12px]">{e.degree} {e.field && `em ${e.field}`}</p>
                  <div className="flex justify-between"><p className="text-gray-600 text-[10px]">{e.institution}</p><span className="text-[9px] text-gray-400">{e.startDate} — {e.current ? 'Atual' : e.endDate}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-6">
          {data.skills.length > 0 && (
            <div><SectionTitle>Habilidades</SectionTitle>
              <div className="space-y-1">
                {data.skills.map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span className="text-gray-700 text-[10px] w-24">{s.name}</span>
                    <div className="flex gap-0.5">{[1,2,3,4,5].map((n) => <div key={n} className="w-2 h-2 rounded-full" style={{ backgroundColor: n <= s.level ? color : '#e5e7eb' }} />)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.languages.length > 0 && (
            <div><SectionTitle>Idiomas</SectionTitle>
              <div className="space-y-0.5 text-[10px] text-gray-600">
                {data.languages.map((l) => <div key={l.id}><span className="font-medium">{l.name}</span> — {LANG_LABELS[l.level]}</div>)}
              </div>
            </div>
          )}
        </div>
        {data.additionalInfo && <div><SectionTitle>Informações Complementares</SectionTitle><p className="text-gray-600 leading-relaxed">{data.additionalInfo}</p></div>}
      </div>
    </div>
  );
};

export default ClassicTemplate;
