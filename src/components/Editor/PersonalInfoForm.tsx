import { useResumeStore } from '../../stores/useResumeStore';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const PersonalInfoForm = () => {
  const resume = useResumeStore((s) => s.activeResume());
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);

  if (!resume) return null;
  const { personalInfo: info } = resume;

  const Field = ({ icon: Icon, label, field, placeholder, type = 'text' }: {
    icon: typeof User; label: string; field: keyof typeof info; placeholder: string; type?: string;
  }) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-1.5">
        <Icon size={14} className="text-muted-foreground" /> {label}
      </label>
      <input
        type={type}
        className="input-field"
        placeholder={placeholder}
        value={(info[field] as string) ?? ''}
        onChange={(e) => updatePersonalInfo({ [field]: e.target.value })}
      />
    </div>
  );

  return (
    <div className="section-card animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4">Dados Pessoais</h3>
      <div className="grid gap-4">
        <Field icon={User} label="Nome Completo" field="fullName" placeholder="Seu nome completo" />
        <Field icon={User} label="Cargo / Título" field="jobTitle" placeholder="Ex: Desenvolvedor Full Stack" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field icon={Mail} label="Email" field="email" placeholder="seu@email.com" type="email" />
          <Field icon={Phone} label="Telefone" field="phone" placeholder="(11) 99999-9999" />
        </div>
        <Field icon={MapPin} label="Localização" field="location" placeholder="São Paulo, SP" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field icon={Linkedin} label="LinkedIn" field="linkedin" placeholder="linkedin.com/in/seu-perfil" />
          <Field icon={Globe} label="Website" field="website" placeholder="seusite.com" />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
