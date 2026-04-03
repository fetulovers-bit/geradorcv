import { useActiveResume, useResumeStore } from '../../stores/useResumeStore';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Camera, Plus, X } from 'lucide-react';
import { useRef } from 'react';

const PersonalInfoForm = () => {
  const resume = useActiveResume();
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);
  const updatePhoto = useResumeStore((s) => s.updatePhoto);
  const addCustomField = useResumeStore((s) => s.addCustomField);
  const updateCustomField = useResumeStore((s) => s.updateCustomField);
  const removeCustomField = useResumeStore((s) => s.removeCustomField);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!resume) return null;
  const { personalInfo: info } = resume;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updatePhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const Field = ({ icon: Icon, label, field, placeholder, type = 'text', half = false }: {
    icon: typeof User; label: string; field: keyof typeof info; placeholder: string; type?: string; half?: boolean;
  }) => (
    <div className={half ? '' : 'col-span-full'}>
      <label className="input-label">
        <Icon size={12} /> {label}
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
    <div className="section-card">
      <div className="flex items-center gap-3 mb-5">
        <div className="empty-state-icon !w-10 !h-10 !mb-0 !rounded-xl">
          <User size={18} />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Dados Pessoais</h3>
          <p className="text-xs text-muted-foreground">Informações de contato e identificação</p>
        </div>
      </div>

      {/* Photo upload */}
      <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-secondary/40 border border-border/50">
        <button onClick={() => fileRef.current?.click()}
          className="w-14 h-14 rounded-xl bg-secondary border-2 border-dashed border-border flex items-center justify-center overflow-hidden hover:border-primary/40 transition-colors flex-shrink-0">
          {info.photoUrl ? (
            <img src={info.photoUrl} alt="Foto" className="w-full h-full object-cover" />
          ) : (
            <Camera size={18} className="text-muted-foreground" />
          )}
        </button>
        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground">Foto (opcional)</p>
          <p className="text-[10px] text-muted-foreground">JPG ou PNG, máx. 2MB</p>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field icon={User} label="Nome Completo" field="fullName" placeholder="Seu nome completo" />
        <Field icon={User} label="Cargo / Título" field="jobTitle" placeholder="Ex: Desenvolvedor Full Stack" />
        <Field icon={Mail} label="Email" field="email" placeholder="seu@email.com" type="email" half />
        <Field icon={Phone} label="Telefone" field="phone" placeholder="(11) 99999-9999" half />
        <Field icon={MapPin} label="Localização" field="location" placeholder="São Paulo, SP" />
        <Field icon={Linkedin} label="LinkedIn" field="linkedin" placeholder="linkedin.com/in/seu-perfil" half />
        <Field icon={Globe} label="Website" field="website" placeholder="seusite.com" half />
      </div>

      <div className="mt-5 border-t border-border pt-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Campos extras</p>
            <p className="text-[11px] text-muted-foreground">Adicione links ou contatos adicionais</p>
          </div>
          <button onClick={addCustomField} className="btn-secondary text-xs py-1.5 px-2.5">
            <Plus size={12} /> Campo
          </button>
        </div>

        <div className="space-y-2">
          {info.customFields.map((field) => (
            <div key={field.id} className="grid grid-cols-[120px_1fr_auto] gap-2">
              <input
                className="input-field !py-2 !text-xs"
                placeholder="Rótulo"
                value={field.label}
                onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
              />
              <input
                className="input-field !py-2 !text-xs"
                placeholder="Valor"
                value={field.value}
                onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
              />
              <button onClick={() => removeCustomField(field.id)} className="btn-icon !w-8 !h-8 text-muted-foreground hover:text-destructive">
                <X size={13} />
              </button>
            </div>
          ))}

          {info.customFields.length === 0 && (
            <p className="text-xs text-muted-foreground">Nenhum campo extra adicionado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
