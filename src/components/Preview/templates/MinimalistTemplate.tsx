import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface Props { data: ResumeData; theme: ThemeConfig; }
const LANG: Record<string, string> = { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado', fluente: 'Fluente', nativo: 'Nativo' };

const MinimalistTemplate = ({ data, theme }: Props) => {
  const { personalInfo: p } = data;
  const c = theme.primaryColor;
  const ff = theme.fontFamily;
  const fs = theme.fontSize === 'small' ? 0.88 : theme.fontSize === 'large' ? 1.08 : 1;
  const sp = theme.spacing === 'compact' ? '14px' : theme.spacing === 'relaxed' ? '28px' : '20px';

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="font-medium tracking-[0.15em] mb-2.5 uppercase" style={{ color: c, fontFamily: ff, fontSize: `${10.5 * fs}px`, letterSpacing: '0.15em' }}>{children}</h3>
  );

  return (
    <div className="w-full h-full bg-white px-10 py-8" style={{ fontFamily: ff, fontSize: `${11 * fs}px`, lineHeight: 1.55 }}>
      {/* Header */}
      <div className="text-center mb-6">
        {theme.showPhoto && p.photoUrl && (
          <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border border-gray-200">
            <img src={p.photoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="font-light tracking-[0.08em] text-gray-900" style={{ fontSize: `${24 * fs}px` }}>{p.fullName || 'Seu Nome'}</h1>
        <p className="mt-1 font-medium" style={{ color: c, fontSize: `${12 * fs}px` }}>{p.jobTitle || 'Seu Cargo'}</p>
        <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mt-3 text-gray-500" style={{ fontSize: `${9 * fs}px` }}>
          {[{ i: Mail, v: p.email }, { i: Phone, v: p.phone }, { i: MapPin, v: p.location }, { i: Linkedin, v: p.linkedin }, { i: Globe, v: p.website }]
            .filter(x => x.v).map(({ i: I, v }, idx) => (
              <span key={idx} className="flex items-center gap-1"><I size={9} />{v}</span>
          ))}
        </div>
        {p.customFields.filter((field) => field.label || field.value).length > 0 && (
          <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mt-2 text-gray-500" style={{ fontSize: `${9 * fs}px` }}>
            {p.customFields.filter((field) => field.label || field.value).map((field) => (
              <span key={field.id}><span className="font-medium">{field.label || 'Extra'}:</span> {field.value}</span>
            ))}
          </div>
        )}
      </div>
      <div className="h-px w-16 mx-auto mb-5" style={{ backgroundColor: c }} />

      <div style={{ gap: sp, display: 'flex', flexDirection: 'column' }}>
        {data.summary && <div><SectionTitle>Resumo</SectionTitle><p className="text-gray-600 leading-relaxed">{data.summary}</p></div>}
        {data.experience.length > 0 && (
          <div><SectionTitle>Experiência</SectionTitle>
            <div style={{ gap: sp, display: 'flex', flexDirection: 'column' }}>
              {data.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline"><span className="font-medium text-gray-900" style={{ fontSize: `${12 * fs}px` }}>{e.position}</span><span className="text-gray-400" style={{ fontSize: `${9 * fs}px` }}>{e.startDate} — {e.current ? 'Atual' : e.endDate}</span></div>
                  <p className="text-gray-500 italic" style={{ fontSize: `${10 * fs}px` }}>{e.company}</p>
                  {e.description && <p className="mt-1 text-gray-600 leading-relaxed">{e.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div><SectionTitle>Formação</SectionTitle>
            <div style={{ gap: sp, display: 'flex', flexDirection: 'column' }}>
              {data.education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline"><span className="font-medium text-gray-900" style={{ fontSize: `${12 * fs}px` }}>{e.degree} {e.field && `em ${e.field}`}</span><span className="text-gray-400" style={{ fontSize: `${9 * fs}px` }}>{e.startDate} — {e.current ? 'Atual' : e.endDate}</span></div>
                  <p className="text-gray-500 italic" style={{ fontSize: `${10 * fs}px` }}>{e.institution}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {(data.skills.length > 0 || data.languages.length > 0) && (
          <div className="grid grid-cols-2 gap-8">
            {data.skills.length > 0 && (
              <div><SectionTitle>Habilidades</SectionTitle>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((s) => <span key={s.id} className="px-2.5 py-1 rounded-full text-gray-700 border border-gray-200" style={{ fontSize: `${9 * fs}px` }}>{s.name}</span>)}
                </div>
              </div>
            )}
            {data.languages.length > 0 && (
              <div><SectionTitle>Idiomas</SectionTitle>
                <div className="space-y-1 text-gray-600" style={{ fontSize: `${10 * fs}px` }}>
                  {data.languages.map((l) => <div key={l.id}><span className="font-medium">{l.name}</span> — {LANG[l.level]}</div>)}
                </div>
              </div>
            )}
          </div>
        )}
        {data.additionalInfo && <div><SectionTitle>Informações</SectionTitle><p className="text-gray-600 leading-relaxed">{data.additionalInfo}</p></div>}
      </div>
    </div>
  );
};

export default MinimalistTemplate;
