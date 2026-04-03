export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  website: string;
  photoUrl: string | null;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: 'basico' | 'intermediario' | 'avancado' | 'fluente' | 'nativo';
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  institution: string;
  date: string;
  url: string;
}

export interface ResumeData {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  projects: ProjectItem[];
  additionalInfo: string;
  sectionOrder: SectionKey[];
}

export type SectionKey =
  | 'summary'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'skills'
  | 'languages'
  | 'projects'
  | 'additionalInfo';

export const SECTION_LABELS: Record<SectionKey, string> = {
  summary: 'Resumo Profissional',
  experience: 'Experiência Profissional',
  education: 'Formação Acadêmica',
  certifications: 'Cursos e Certificações',
  skills: 'Habilidades',
  languages: 'Idiomas',
  projects: 'Projetos',
  additionalInfo: 'Informações Complementares',
};

export interface ThemeConfig {
  templateId: TemplateId;
  primaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'relaxed';
  showPhoto: boolean;
}

export type TemplateId = 'modern' | 'minimalist' | 'classic';

export type EditorStep = 'template' | 'personal' | 'content' | 'customize' | 'preview';
export type MobileTab = 'edit' | 'preview';
