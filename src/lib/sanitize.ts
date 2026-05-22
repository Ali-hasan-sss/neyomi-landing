/**
 * Strips the most dangerous HTML vectors: <script>, event handlers, javascript: URIs.
 * Content here originates from developer-controlled Firestore — this is a defense-in-depth
 * measure against a compromised Firebase account, not a substitute for proper input validation.
 */
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script\s*>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe\s*>/gi, '')
    .replace(/<(object|embed|link|meta|style)\b[^>]*>/gi, '')
    .replace(/\s(on\w+)\s*=\s*(['"])[^'"]*\2/gi, '')
    .replace(/\s(on\w+)\s*=\s*[^\s>]*/gi, '')
    .replace(/(href|src|action)\s*=\s*(['"])\s*javascript:[^'"]*\2/gi, '$1="#"')
}
