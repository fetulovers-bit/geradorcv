import { useRef, useState } from 'react';
import { useResumeStore } from '../../stores/useResumeStore';
import { useThemeStore } from '../../stores/useThemeStore';
import ModernTemplate from './templates/ModernTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = () => {
  const resume = useResumeStore((s) => s.activeResume());
  const theme = useThemeStore((s) => s.theme);
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  if (!resume) return (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      <p>Selecione ou crie um currículo para visualizar.</p>
    </div>
  );

  const TemplateComponent = theme.templateId === 'minimalist' ? MinimalistTemplate
    : theme.templateId === 'classic' ? ClassicTemplate : ModernTemplate;

  const handleExport = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, useCORS: true, backgroundColor: '#ffffff',
        width: previewRef.current.scrollWidth,
        height: previewRef.current.scrollHeight,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`${resume.personalInfo.fullName || 'curriculo'}.pdf`);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">Pré-visualização</h3>
        <button onClick={handleExport} disabled={exporting} className="btn-primary text-xs py-1.5 px-3">
          {exporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
          {exporting ? 'Exportando...' : 'Baixar PDF'}
        </button>
      </div>
      <div className="flex-1 overflow-auto bg-muted/50 p-4 flex justify-center">
        <div className="w-[210mm] min-h-[297mm] shadow-2xl bg-card" style={{ aspectRatio: '210/297' }}>
          <div ref={previewRef} className="w-full h-full pdf-render">
            <TemplateComponent data={resume} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
