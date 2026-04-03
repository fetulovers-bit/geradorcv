import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface Props { data: ResumeData; theme: ThemeConfig; }

const LANG: Record<string, string> = { basico: 'Básico', intermediario: 'Intermediário', avancado: 'Avançado', fluente: 'Fluente', nativo: 'Nativo' };

const ModernTemplate = ({ data, theme }: Props) => {
  const { personalInfo: p } = data;
  const c = theme.primaryColor;
  const ff = theme.fontFamily;
  const fs = theme.fontSize === 'small' ? 0.88 : theme.fontSize === 'large' ? 1.08 : 1;
  const sp = theme.spacing === 'compact' ? '12px' : theme.spacing === 'relaxed' ? '24px' : '16px';

  return (
    <div className="w-full h-full bg-white flex" style={{ fontFamily: ff, fontSize: `${11 * fs}px`, lineHeight: 1.5 }}>
      {/* Sidebar */}
      <div className="w-[35%] p-6 text-white flex flex-col relative overflow-hidden" style={{ backgroundColor: c }}>
        <div className="absolute inset-0 opacity-10" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)' }} />
        <div className="relative z-10">
          {theme.showPhoto && p.photoUrl && (
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/30 mb-4 mx-auto">
              <img src={p.photoUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="font-bold leading-tight" style={{ fontSize: `${20 * fs}px` }}>{p.fullName || 'Seu Nome'}</h1>
          <p className="opacity-85 mt-1 font-medium" style={{ fontSize: `${11 * fs}px` }}>{p.jobTitle || 'Seu Cargo'}</p>

          <div className="mt-5 space-y-2" style={{ fontSize: `${9.5 * fs}px` }}>
            {[
              { icon: Mail, val: p.email },
              { icon: Phone, val: p.phone },
              { icon: MapPin, val: p.location },
              { icon: Linkedin, val: p.linkedin },
              { icon: Globe, val: p.website },
            ].filter(x => x.val).map(({ icon: I, val }, i) => (
              <div key={i} className="flex items-start gap-2 opacity-90"><I size={10} className="mt-0.5 flex-shrink-0" /><span className="break-all leading-tight">{val}</span></div>
            ))}
          </div>

          {data.skills.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold uppercase tracking-widest mb-3 pb-1.5 border-b border-white/20" style={{ fontSize: `${10 * fs}px` }}>Habilidades</h3>
              <div className="space-y-2">
                {data.skills.map((s) => (
                  <div key={s.id}>
                    <p className="mb-0.5" style={{ fontSize: `${9.5 * fs}px` }}>{s.name}</p>
                    <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
                      <div className="h-full bg-white/70 rounded-full transition-all" style={{ width: `${s.level * 20}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.languages.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold uppercase tracking-widest mb-3 pb-1.5 border-b border-white/20" style={{ fontSize: `${10 * fs}px` }}>Idiomas</h3>
              <div className="space-y-1">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between" style={{ fontSize: `${9.5 * fs}px` }}>
                    <span>{l.name}</span><span className="opacity-70">{LANG[l.level]}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 text-gray-800" style={{ gap: sp, display: 'flex', flexDirection: 'column' }}>
        {data.summary && (
          <Section title="Resumo" color={c} ff={ff} fs={fs}>
            <p className="text-gray-600 leading-relaxed">{data.summary}</p>
          </Section>
        )}
        {data.experience.length > 0 && (
          <Section title="Experiência" color={c} ff={ff} fs={fs}>
            <div style={{ gap: sp, display: 'flex', flexDirection: 'column' }}>
              {data.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-gray-900" style={{ fontSize: `${12 * fs}px` }}>{e.position}</p>
                    <span className="text-gray-400 flex-shrink-0 ml-2" style={{ fontSize: `${9 * fs}px` }}>{e.startDate} — {e.current ? 'Atual' : e.endDate}</span>
                  </div>
                  <p className="text-gray-500 italic" style={{ fontSize: `${10 * fs}px` }}>{e.company}</p>
                  {e.description && <p className="mt-1 text-gray-600 leading-relaxed">{e.description}</p>}
                </div>
              ))}
            </div>
          </Section>
        )}
        {data.education.length > 0 && (
          <Section title="Formação" color={c} ff={ff} fs={fs}>
            <div style={{ gap: sp, display: 'flex', flexDirection: 'column' }}>
              {data.education.map((e) => (
                <div key={e.id}>
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-gray-900" style={{ fontSize: `${12 * fs}px` }}>{e.degree} {e.field && `em ${e.field}`}</p>
                    <span className="text-gray-400 flex-shrink-0 ml-2" style={{ fontSize: `${9 * fs}px` }}>{e.startDate} — {e.current ? 'Atual' : e.endDate}</span>
                  </div>
                  <p className="text-gray-500 italic" style={{ fontSize: `${10 * fs}px` }}>{e.institution}</p>
                </div>
              ))}
            </div>
          </Section>
        )}
        {data.additionalInfo && (
          <Section title="Informações" color={c} ff={ff} fs={fs}>
            <p className="text-gray-600 leading-relaxed">{data.additionalInfo}</p>
          </Section>
        )}
      </div>
    </div>
  );
};

const Section = ({ title, color, ff, fs, children }: { title: string; color: string; ff: string; fs: number; children: React.ReactNode }) => (
  <div>
    <h3 className="font-bold uppercase tracking-wider mb-2 pb-1 border-b-2" style={{ color, borderColor: color + '30', fontFamily: ff, fontSize: `${12 * fs}px` }}>{title}</h3>
    {children}
  </div>
);

export default ModernTemplate;
