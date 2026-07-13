import { sanitizeHtml } from './sanitize';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isHtmlContent(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}

function plainTextToHtml(text: string): string {
  return text
    .split(/\n{2,}/)
    .filter((p) => p.trim())
    .map((p) => `<p>${escapeHtml(p).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

/** Normalize API body (Quill HTML or legacy plain text) for safe rich display. */
export function prepareQuillHtml(body: string): string {
  const trimmed = body?.trim() ?? '';
  if (!trimmed) return '';
  const html = isHtmlContent(trimmed) ? trimmed : plainTextToHtml(trimmed);
  return sanitizeHtml(html);
}
