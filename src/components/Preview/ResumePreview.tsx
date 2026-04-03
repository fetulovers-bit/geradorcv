import { useRef, useState } from 'react';
import { useActiveResume, useResumeStore } from '../../stores/useResumeStore';
import { useThemeStore } from '../../stores/useThemeStore';
import ModernTemplate from './templates/ModernTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import { Download, Loader2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ResumePreview = () => {
  const resume = useActiveResume();
  const theme = useThemeStore((s) => s.theme);
  const previewRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [zoom, setZoom] = useState(0.55);

  if (!resume) return (
    <div className="flex items-center justify-center h-full text-muted-foreground">
      <p className="text-sm">Crie um currículo para visualizar.</p>
    </div>
  );

  const Template = theme.templateId === 'minimalist' ? MinimalistTemplate
    : theme.templateId === 'classic' ? ClassicTemplate : ModernTemplate;

  const handleExport = async () => {
    if (!previewRef.current) return;
    setExporting(true);
    try {
      const el = previewRef.current;
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff', width: el.scrollWidth, height: el.scrollHeight });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pdfHeight;
      }

      pdf.save(`${resume.personalInfo.fullName || 'curriculo'}.pdf`);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-card">
        <div className="flex items-center gap-1">
          <button onClick={() => setZoom(Math.max(0.3, zoom - 0.1))} className="btn-icon !w-8 !h-8"><ZoomOut size={14} /></button>
          <span className="text-xs font-medium text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(Math.min(1, zoom + 0.1))} className="btn-icon !w-8 !h-8"><ZoomIn size={14} /></button>
          <button onClick={() => setZoom(0.55)} className="btn-icon !w-8 !h-8"><RotateCcw size={13} /></button>
        </div>
        <button onClick={handleExport} disabled={exporting} className="btn-primary text-xs py-2 px-4">
          {exporting ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} />}
          {exporting ? 'Exportando...' : 'Baixar PDF'}
        </button>
      </div>

      {/* Preview area */}
      <div className="flex-1 overflow-auto p-6 flex justify-center items-start" style={{ background: 'hsl(var(--muted) / 0.3)' }}>
        <div
          className="bg-white shadow-2xl transition-transform duration-200 origin-top"
          style={{ width: '210mm', minHeight: '297mm', transform: `scale(${zoom})`, transformOrigin: 'top center' }}
        >
          <div ref={previewRef} className="w-full min-h-[297mm] pdf-render">
            <Template data={resume} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
