import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ResumeData, PersonalInfo, ExperienceItem, EducationItem,
  CertificationItem, SkillItem, LanguageItem, ProjectItem, SectionKey,
} from '../types/resume';

const genId = () => Math.random().toString(36).substr(2, 9);

const DEFAULT_ORDER: SectionKey[] = [
  'summary', 'experience', 'education', 'skills', 'languages', 'certifications', 'projects', 'additionalInfo',
];

const createDefault = (): ResumeData => ({
  id: genId(), name: 'Meu Currículo', createdAt: Date.now(), updatedAt: Date.now(),
  personalInfo: { fullName: '', jobTitle: '', phone: '', email: '', location: '', linkedin: '', website: '', photoUrl: null },
  summary: '', experience: [], education: [], certifications: [], skills: [], languages: [], projects: [],
  additionalInfo: '', sectionOrder: [...DEFAULT_ORDER],
});

interface ResumeStore {
  resumes: ResumeData[];
  activeResumeId: string | null;
  activeResume: () => ResumeData | null;
  createResume: () => string;
  deleteResume: (id: string) => void;
  setActiveResume: (id: string) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateSummary: (s: string) => void;
  updateAdditionalInfo: (s: string) => void;
  updatePhoto: (url: string | null) => void;
  addExperience: (item?: Partial<ExperienceItem>) => void;
  updateExperience: (id: string, data: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addEducation: (item?: Partial<EducationItem>) => void;
  updateEducation: (id: string, data: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addCertification: (item?: Partial<CertificationItem>) => void;
  updateCertification: (id: string, data: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;
  addSkill: (item?: Partial<SkillItem>) => void;
  updateSkill: (id: string, data: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void;
  addLanguage: (item?: Partial<LanguageItem>) => void;
  updateLanguage: (id: string, data: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  addProject: (item?: Partial<ProjectItem>) => void;
  updateProject: (id: string, data: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  reorderSections: (order: SectionKey[]) => void;
  loadSampleData: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => {
      const updateActive = (updater: (r: ResumeData) => Partial<ResumeData>) => {
        set((s) => {
          const id = s.activeResumeId;
          if (!id) return s;
          return { resumes: s.resumes.map((r) => r.id === id ? { ...r, ...updater(r), updatedAt: Date.now() } : r) };
        });
      };

      return {
        resumes: [], activeResumeId: null,
        activeResume: () => { const s = get(); return s.resumes.find((r) => r.id === s.activeResumeId) ?? null; },
        createResume: () => { const n = createDefault(); set((s) => ({ resumes: [...s.resumes, n], activeResumeId: n.id })); return n.id; },
        deleteResume: (id) => set((s) => { const f = s.resumes.filter((r) => r.id !== id); return { resumes: f, activeResumeId: s.activeResumeId === id ? f[0]?.id ?? null : s.activeResumeId }; }),
        setActiveResume: (id) => set({ activeResumeId: id }),
        updatePersonalInfo: (info) => updateActive((r) => ({ personalInfo: { ...r.personalInfo, ...info } })),
        updateSummary: (summary) => updateActive(() => ({ summary })),
        updateAdditionalInfo: (additionalInfo) => updateActive(() => ({ additionalInfo })),
        updatePhoto: (url) => updateActive((r) => ({ personalInfo: { ...r.personalInfo, photoUrl: url } })),

        addExperience: (item) => updateActive((r) => ({ experience: [...r.experience, { id: genId(), company: '', position: '', startDate: '', endDate: '', current: false, description: '', highlights: [], ...item }] })),
        updateExperience: (id, data) => updateActive((r) => ({ experience: r.experience.map((e) => e.id === id ? { ...e, ...data } : e) })),
        removeExperience: (id) => updateActive((r) => ({ experience: r.experience.filter((e) => e.id !== id) })),

        addEducation: (item) => updateActive((r) => ({ education: [...r.education, { id: genId(), institution: '', degree: '', field: '', startDate: '', endDate: '', current: false, description: '', ...item }] })),
        updateEducation: (id, data) => updateActive((r) => ({ education: r.education.map((e) => e.id === id ? { ...e, ...data } : e) })),
        removeEducation: (id) => updateActive((r) => ({ education: r.education.filter((e) => e.id !== id) })),

        addCertification: (item) => updateActive((r) => ({ certifications: [...r.certifications, { id: genId(), name: '', institution: '', date: '', url: '', ...item }] })),
        updateCertification: (id, data) => updateActive((r) => ({ certifications: r.certifications.map((c) => c.id === id ? { ...c, ...data } : c) })),
        removeCertification: (id) => updateActive((r) => ({ certifications: r.certifications.filter((c) => c.id !== id) })),

        addSkill: (item) => updateActive((r) => ({ skills: [...r.skills, { id: genId(), name: '', level: 3, ...item }] })),
        updateSkill: (id, data) => updateActive((r) => ({ skills: r.skills.map((s) => s.id === id ? { ...s, ...data } : s) })),
        removeSkill: (id) => updateActive((r) => ({ skills: r.skills.filter((s) => s.id !== id) })),

        addLanguage: (item) => updateActive((r) => ({ languages: [...r.languages, { id: genId(), name: '', level: 'intermediario' as const, ...item }] })),
        updateLanguage: (id, data) => updateActive((r) => ({ languages: r.languages.map((l) => l.id === id ? { ...l, ...data } : l) })),
        removeLanguage: (id) => updateActive((r) => ({ languages: r.languages.filter((l) => l.id !== id) })),

        addProject: (item) => updateActive((r) => ({ projects: [...r.projects, { id: genId(), name: '', description: '', url: '', technologies: [], ...item }] })),
        updateProject: (id, data) => updateActive((r) => ({ projects: r.projects.map((p) => p.id === id ? { ...p, ...data } : p) })),
        removeProject: (id) => updateActive((r) => ({ projects: r.projects.filter((p) => p.id !== id) })),

        reorderSections: (order) => updateActive(() => ({ sectionOrder: order })),

        loadSampleData: () => {
          updateActive(() => ({
            personalInfo: {
              fullName: 'Ana Carolina Silva', jobTitle: 'Desenvolvedora Full Stack',
              phone: '(11) 99876-5432', email: 'ana.silva@email.com',
              location: 'São Paulo, SP', linkedin: 'linkedin.com/in/anasilva',
              website: 'anasilva.dev', photoUrl: null,
            },
            summary: 'Desenvolvedora Full Stack com 5 anos de experiência em React, Node.js e TypeScript. Apaixonada por criar interfaces intuitivas e sistemas escaláveis.',
            experience: [
              { id: genId(), company: 'TechCorp Brasil', position: 'Desenvolvedora Full Stack Senior', startDate: '2022-01', endDate: '', current: true, description: 'Liderança técnica de equipe de 5 desenvolvedores. Migração de sistema legado para arquitetura de microsserviços.', highlights: ['Redução de 40% no tempo de deploy', 'Implementação de CI/CD'] },
              { id: genId(), company: 'StartupXYZ', position: 'Desenvolvedora Frontend', startDate: '2019-06', endDate: '2021-12', current: false, description: 'Desenvolvimento de SPA com React e TypeScript. Implementação de design system corporativo.', highlights: ['Aumento de 30% na conversão'] },
            ],
            education: [
              { id: genId(), institution: 'USP', degree: 'Bacharelado', field: 'Ciência da Computação', startDate: '2015', endDate: '2019', current: false, description: '' },
            ],
            skills: [
              { id: genId(), name: 'React', level: 5 }, { id: genId(), name: 'TypeScript', level: 5 },
              { id: genId(), name: 'Node.js', level: 4 }, { id: genId(), name: 'Python', level: 3 },
              { id: genId(), name: 'PostgreSQL', level: 4 }, { id: genId(), name: 'Docker', level: 3 },
            ],
            languages: [
              { id: genId(), name: 'Português', level: 'nativo' as const },
              { id: genId(), name: 'Inglês', level: 'fluente' as const },
            ],
            certifications: [],
            projects: [],
            additionalInfo: '',
          }));
        },
      };
    },
    { name: 'resumeforge-data' }
  )
);
