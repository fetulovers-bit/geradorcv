import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface Props { data: ResumeData; theme: ThemeConfig; }
const LANG: Record<string, string> = { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado', fluente: 'Fluente', nativo: 'Nativo' };

const ClassicTemplate = ({ data, theme }: Props) => {
  const { personalInfo: p } = data;
  const c = theme.primaryColor;
  const ff = theme.fontFamily;
  const fs = theme.fontSize === 'small' ? 0.88 : theme.fontSize === 'large' ? 1.08 : 1;
  const sp = theme.spacing === 'compact' ? '14px' : theme.spacing === 'relaxed' ? '28px' : '18px';

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className="mb-2.5">
      <h3 className="font-bold uppercase text-gray-800" style={{ fontFamily: ff, fontSize: `${13 * fs}px` }}>{children}</h3>
      <div className="h-[2px] mt-1.5 rounded-full" style={{ background: `linear-gradient(90deg, ${c}, ${c}40)` }} />
    </div>
  );

  return (
    <div className="w-full h-full bg-white p-8" style={{ fontFamily: ff, fontSize: `${11 * fs}px`, lineHeight: 1.5 }}>
      {/* Header */}
      <div className="pb-4 mb-5 border-b-[3px]" style={{ borderColor: c }}>
        <div className="flex items-start gap-4">
          {theme.showPhoto && p.photoUrl && (
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <img src={p.photoUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="font-bold text-gray-900" style={{ fontSize: `${26 * fs}px`, lineHeight: 1.1 }}>{p.fullName || 'Seu Nome'}</h1>
            <p className="mt-1 font-medium" style={{ color: c, fontSize: `${13 * fs}px` }}>{p.jobTitle || 'Seu Cargo'}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-gray-600" style={{ fontSize: `${9.5 * fs}px` }}>
          {[{ i: Mail, v: p.email }, { i: Phone, v: p.phone }, { i: MapPin, v: p.location }, { i: Linkedin, v: p.linkedin }, { i: Globe, v: p.website }]
            .filter(x => x.v).map(({ i: I, v }, idx) => (
              <span key={idx} className="flex items-center gap-1"><I size={10} />{v}</span>
          ))}
        </div>
      </div>

      <div style={{ gap: sp, display: 'flex', flexDirection: 'column' }}>
        {data.summary && <div><SectionTitle>Resumo Profissional</SectionTitle><p className="text-gray-600 leading-relaxed">{data.summary}</p></div>}
        {data.experience.length > 0 && (
          <div><SectionTitle>Experiência Profissional</SectionTitle>
            <div style={{ gap: sp, display: 'flex', flexDirection: 'column' }}>
              {data.experience.map((e) => (
                <div key={e.id} className="pl-3 border-l-2" style={{ borderColor: c + '30' }}>
                  <p className="font-bold text-gray-900" style={{ fontSize: `${12 * fs}px` }}>{e.position}</p>
                  <div className="flex justify-between items-center"><p className="text-gray-500" style={{ fontSize: `${10 * fs}px` }}>{e.company}</p><span className="text-gray-400" style={{ fontSize: `${9 * fs}px` }}>{e.startDate} — {e.current ? 'Atual' : e.endDate}</span></div>
                  {e.description && <p className="mt-1 text-gray-600 leading-relaxed">{e.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div><SectionTitle>Formação Acadêmica</SectionTitle>
            <div style={{ gap: sp, display: 'flex', flexDirection: 'column' }}>
              {data.education.map((e) => (
                <div key={e.id} className="pl-3 border-l-2" style={{ borderColor: c + '30' }}>
                  <p className="font-bold text-gray-900" style={{ fontSize: `${12 * fs}px` }}>{e.degree} {e.field && `em ${e.field}`}</p>
                  <div className="flex justify-between items-center"><p className="text-gray-500" style={{ fontSize: `${10 * fs}px` }}>{e.institution}</p><span className="text-gray-400" style={{ fontSize: `${9 * fs}px` }}>{e.startDate} — {e.current ? 'Atual' : e.endDate}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 gap-8">
          {data.skills.length > 0 && (
            <div><SectionTitle>Habilidades</SectionTitle>
              <div className="space-y-1.5">
                {data.skills.map((s) => (
                  <div key={s.id} className="flex items-center gap-2">
                    <span className="text-gray-700 w-24 truncate" style={{ fontSize: `${10 * fs}px` }}>{s.name}</span>
                    <div className="flex gap-1">{[1,2,3,4,5].map((n) => <div key={n} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: n <= s.level ? c : '#e5e7eb' }} />)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {data.languages.length > 0 && (
            <div><SectionTitle>Idiomas</SectionTitle>
              <div className="space-y-1 text-gray-600" style={{ fontSize: `${10 * fs}px` }}>
                {data.languages.map((l) => <div key={l.id}><span className="font-semibold">{l.name}</span> — {LANG[l.level]}</div>)}
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
