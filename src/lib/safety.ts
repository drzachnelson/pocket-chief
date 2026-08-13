export interface PhiAssessment { blocked: boolean; reasons: string[] }

const patterns: Array<[string, RegExp]> = [
  ["medical record number", /\b(?:mrn|medical record number)\s*[:#-]?\s*\d{5,}\b/i],
  ["date of birth", /\b(?:dob|date of birth)\s*[:#-]?\s*\d{1,2}[/-]\d{1,2}[/-](?:19|20)\d{2}\b/i],
  ["possible full name", /\b(?:patient\s+)?[A-Z][a-z]{1,24}\s+[A-Z][a-z]{1,24}\b/],
  ["phone number", /\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/],
  ["email address", /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i],
  ["street address", /\b\d{1,6}\s+[A-Za-z0-9.'-]+(?:\s+[A-Za-z0-9.'-]+){0,4}\s+(?:street|st|avenue|ave|road|rd|boulevard|blvd|lane|ln|drive|dr|court|ct|way)\b/i],
  ["social security number", /\b(?:ssn\s*[:#-]?\s*)?\d{3}-\d{2}-\d{4}\b/i],
  ["full date", /\b(?:0?[1-9]|1[0-2])[/-](?:0?[1-9]|[12]\d|3[01])[/-](?:19|20)\d{2}\b/],
  ["account identifier", /\b(?:account|acct|claim|case|record)\s*(?:number|no\.?|#|id)?\s*[:#-]?\s*[A-Z0-9-]{6,}\b/i],
  ["health plan identifier", /\b(?:member|policy|insurance|health\s*plan)\s*(?:number|no\.?|#|id)?\s*[:#-]?\s*[A-Z0-9-]{6,}\b/i],
  ["device identifier", /\b(?:device|implant|serial|udi)\s*(?:number|no\.?|#|id)?\s*[:#-]?\s*[A-Z0-9-]{6,}\b/i],
  ["IP address", /\b(?:\d{1,3}\.){3}\d{1,3}\b/],
  ["vehicle identifier", /\b(?:vin\s*[:#-]?\s*)[A-HJ-NPR-Z0-9]{17}\b/i],
  ["fax number", /\bfax\s*[:#-]?\s*(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b/i],
];

export function detectLikelyPHI(text: string): PhiAssessment {
  const reasons = patterns.filter(([, pattern]) => pattern.test(text)).map(([reason]) => reason);
  return { blocked: reasons.length > 0, reasons };
}
