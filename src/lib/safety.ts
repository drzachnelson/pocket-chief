export interface PhiAssessment { blocked: boolean; reasons: string[] }

const patterns: Array<[string, RegExp]> = [
  ["medical record number", /\b(?:mrn|medical record number)\s*[:#-]?\s*\d{5,}\b/i],
  ["date of birth", /\b(?:dob|date of birth)\s*[:#-]?\s*\d{1,2}[/-]\d{1,2}[/-](?:19|20)\d{2}\b/i],
  ["possible full name", /\b(?:patient\s+[A-Z][a-z'-]{1,30}\s+[A-Z][a-z'-]{1,30}|(?:John|Jane|James|Mary|Robert|Patricia|Michael|Jennifer|William|Linda|David|Elizabeth|Richard|Barbara|Joseph|Susan|Thomas|Jessica|Charles|Sarah|Daniel|Karen|Matthew|Lisa|Anthony|Nancy|Mark|Betty|Donald|Margaret|Steven|Sandra|Paul|Ashley|Andrew|Kimberly|Joshua|Emily|Kenneth|Donna|Kevin|Michelle|Brian|Carol|George|Amanda|Edward|Melissa|Ronald|Deborah|Timothy|Stephanie|Jason|Rebecca|Jeffrey|Sharon|Ryan|Laura|Jacob|Cynthia|Gary|Kathleen|Nicholas|Amy|Eric|Angela|Jonathan|Shirley|Stephen|Anna|Larry|Brenda|Justin|Pamela|Scott|Emma|Brandon|Nicole|Benjamin|Helen|Samuel|Samantha|Gregory|Katherine|Alexander|Christine|Patrick|Debra|Frank|Rachel|Raymond|Carolyn|Jack|Janet|Dennis|Catherine|Jerry|Maria|Tyler|Heather|Aaron|Diane|Jose|Julie|Adam|Joyce|Nathan|Victoria|Henry|Kelly|Zachary|Christina|Douglas|Joan|Peter|Evelyn|Kyle|Olivia|Noah|Sophia|Liam|Isabella|Mason|Mia|Ethan|Charlotte|Lucas|Amelia|Oliver|Harper|Ava|Eleanor)\s+[A-Z][a-z'-]{1,30})\b/i],
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
