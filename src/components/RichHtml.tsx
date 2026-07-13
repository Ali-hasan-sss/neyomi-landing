'use client';

import 'quill/dist/quill.snow.css';
import { prepareQuillHtml } from '@/lib/quill-html';

type RichHtmlProps = {
  html: string;
  className?: string;
};

export default function RichHtml({ html, className = '' }: RichHtmlProps) {
  const safeHtml = prepareQuillHtml(html);

  if (!safeHtml) {
    return null;
  }

  return (
    <div className={`quill-content ql-snow ${className}`}>
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: safeHtml }} />
    </div>
  );
}
