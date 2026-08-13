export interface PhiAssessment { blocked: boolean; reasons: string[] }

const patterns: Array<[string, RegExp]> = [
  ["medical record number", /\b(?:mrn|medical record number)\s*[:#-]?\s*\d{5,}\b/i],
  ["date of birth", /\b(?:dob|date of birth)\s*[:#-]?\s*\d{1,2}[/-]\d{1,2}[/-](?:19|20)\d{2}\b/i],
  ["patient name", /\bpatient\s+[A-Z][a-z]+\s+[A-Z][a-z]+\b/],
  ["phone number", /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/],
  ["email address", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
];

export function detectLikelyPHI(text: string): PhiAssessment {
  const reasons = patterns.filter(([, pattern]) => pattern.test(text)).map(([reason]) => reason);
  return { blocked: reasons.length > 0, reasons };
}
