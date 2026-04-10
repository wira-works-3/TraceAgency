const fs = require('fs');
const file = 'c:/Universitas Brawijaya/Linkedin/wira/traceagency/app/admin/page.jsx';
let content = fs.readFileSync(file, 'utf8');

const CRLF = '\r\n';

// Lock UI template generator
function makeLockUI(key, label) {
  const spaces20 = '                    ';
  const spaces22 = '                      ';
  const spaces24 = '                        ';
  const spaces26 = '                          ';
  const spaces28 = '                            ';
  const spaces30 = '                              ';
  return `${spaces20}{isSectionLocked("${key}") ? (${CRLF}${spaces22}<div className="space-y-4">${CRLF}${spaces24}<div className="flex items-center gap-3 p-4 rounded-2xl bg-amber-950/30 border border-amber-800/50">${CRLF}${spaces26}<div className="text-2xl">🔒</div>${CRLF}${spaces26}<div>${CRLF}${spaces28}<div className="text-sm font-bold text-amber-300">Section Terkunci</div>${CRLF}${spaces28}<div className="text-xs text-amber-500/80 mt-0.5">Batas edit gratis ({MAX_FREE_EDITS}x) telah tercapai. Masukkan kode akses untuk membuka kembali.</div>${CRLF}${spaces26}</div>${CRLF}${spaces24}</div>${CRLF}${spaces24}<div>${CRLF}${spaces26}<label className="block text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">Kode Akses</label>${CRLF}${spaces26}<div className="flex gap-2">${CRLF}${spaces28}<input${CRLF}${spaces30}type="password"${CRLF}${spaces30}value={sectionUnlockInput.${key}}${CRLF}${spaces30}onChange={(e) => setSectionUnlockInput((p) => ({ ...p, ${key}: e.target.value }))}${CRLF}${spaces30}onKeyDown={(e) => { if (e.key === "Enter") handleUnlockSection("${key}"); }}${CRLF}${spaces30}placeholder="Masukkan kode rahasia..."${CRLF}${spaces30}className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-amber-500 transition-all"${CRLF}${spaces28}/>${CRLF}${spaces28}<button${CRLF}${spaces30}type="button"${CRLF}${spaces30}onClick={() => handleUnlockSection("${key}")}${CRLF}${spaces30}className="h-12 px-5 rounded-xl border border-amber-700 bg-amber-900/40 text-amber-300 text-sm font-bold hover:bg-amber-800/60 transition-colors shrink-0"${CRLF}${spaces28}>${CRLF}${spaces30}Buka${CRLF}${spaces28}</button>${CRLF}${spaces26}</div>${CRLF}${spaces26}{sectionUnlockError.${key} && (${CRLF}${spaces28}<div className="mt-2 text-xs text-red-400 font-semibold">❌ Kode salah. Coba lagi.</div>${CRLF}${spaces26})}${CRLF}${spaces24}</div>${CRLF}${spaces22}</div>${CRLF}${spaces20}) : (`;
}

// ============================================================
// 1. Fix ABOUT section: add closing )} after the else block
// About else block is: ) : (\n                    <div className="grid ...">
// It ends just before: </div>\n                 </details> (services)
// ============================================================

// Find About's else opening marker
const aboutElseStart = ') : (\n                    <div className="grid cols-1 gap-4">';
// That's likely what was inserted. Let's find the pattern from the lock
const aboutLockIdx = content.indexOf('isSectionLocked("about")');
console.log('About lock at:', aboutLockIdx);

// The about else part ends before the services <details>
// Let me find: </div>\n                 </details>\n\n                 <details\n  ...services
const servicesDetailsMarker = '<details\r\n                   className="group rounded-2xl border border-border bg-background overflow-hidden"\r\n                   open={openSection === "services"}\r\n                 >';
const servicesIdx = content.indexOf(servicesDetailsMarker);
console.log('Services details at:', servicesIdx);

if (servicesIdx > 0) {
  // Find the </div></details> pattern just before services
  // We need to find the About section end
  const aboutEnd1 = '                     </div>\r\n                   </div>\r\n                 </details>';
  const aboutEnd2 = '                     </div>\r\n                    )}\r\n                   </div>\r\n                 </details>';
  
  // Check what's 200 chars before servicesIdx
  const beforeServices = content.substring(servicesIdx - 200, servicesIdx);
  const encoded = [...beforeServices].map(c => {
    const code = c.charCodeAt(0);
    if (code < 32) return `[${code}]`;
    return c;
  }).join('');
  console.log('\nBefore services:', encoded);
}

// ============================================================
// Find Gallery's else closing (before videoShowcase details)
// ============================================================
const vsDetailsMarker = '<details\r\n                   className="group rounded-2xl border border-border bg-background overflow-hidden"\r\n                   open={openSection === "videoShowcase"}\r\n                 >';
const vsIdx = content.indexOf(vsDetailsMarker);
console.log('\nVideoShowcase details at:', vsIdx);

if (vsIdx > 0) {
  const beforeVS = content.substring(vsIdx - 200, vsIdx);
  const encoded = [...beforeVS].map(c => {
    const code = c.charCodeAt(0);
    if (code < 32) return `[${code}]`;
    return c;
  }).join('');
  console.log('Before VideoShowcase:', encoded);
}
