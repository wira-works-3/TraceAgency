const fs = require('fs');
const file = 'c:/Universitas Brawijaya/Linkedin/wira/traceagency/app/admin/page.jsx';
let content = fs.readFileSync(file, 'utf8');

// ============================================
// 1. FIX SERVICES: Close the else fragment </>)}
// The Services else block starts with: ) : (\n                    <><div className="flex flex-wrap items-center justify-between gap-3 mb-4">
// and should close right before </details> of Services
// ============================================
const servicesElseClose = `                       </div>\r\n                     </div>\r\n                   </div>\r\n                 </details>\r\n\r\n                 <details\r\n                   className="group rounded-2xl border border-border bg-background overflow-hidden"\r\n                   open={openSection === "gallery"}`;

const servicesElseCloseFixed = `                       </div>\r\n                     </div>\r\n                    </>)}\r\n                   </div>\r\n                 </details>\r\n\r\n                 <details\r\n                   className="group rounded-2xl border border-border bg-background overflow-hidden"\r\n                   open={openSection === "gallery"}`;

if (content.includes(servicesElseClose)) {
  content = content.replace(servicesElseClose, servicesElseCloseFixed);
  console.log('✅ Fixed Services closing fragment');
} else {
  console.log('❌ Services closing pattern NOT found');
  // Debug: show what's around gallery idx
  const gIdx = content.indexOf('open={openSection === "gallery"}');
  console.log('Gallery at char idx:', gIdx);
  if (gIdx > 0) {
    console.log('Before gallery (200 chars):');
    console.log(JSON.stringify(content.substring(gIdx - 200, gIdx)));
  }
}

// ============================================
// 2. FIX GALLERY: Close the else fragment + fix About else close
// ============================================

// About: The else block opens with ) : (\n                    <div className="grid grid-cols-1 gap-4">
// It closes with: </div>\n                   </div>\n                 </details>  (for about)
const aboutElseClose = `                       </div>\r\n                     </div>\r\n                    )}\r\n                   </div>\r\n                 </details>\r\n\r\n                 <details\r\n                   className="group rounded-2xl border border-border bg-background overflow-hidden"\r\n                   open={openSection === "services"}`;

const aboutElseCloseFixed = `                       </div>\r\n                     </div>\r\n                    )}\r\n                   </div>\r\n                 </details>\r\n\r\n                 <details\r\n                   className="group rounded-2xl border border-border bg-background overflow-hidden"\r\n                   open={openSection === "services"}`;

// About section should already have )} - check if it does
const aboutLock = 'isSectionLocked("about")';
const aboutIdx = content.indexOf(aboutLock);
if (aboutIdx > 0) {
  const aboutSnippet = content.substring(aboutIdx, aboutIdx + 50);
  console.log('About lock found at idx:', aboutIdx);
}

// Gallery: close the else block before </details>
const galleryElseClose = `                       </div>\r\n                     </div>\r\n                   </div>\r\n                   </div>\r\n                 </details>\r\n\r\n                 <details\r\n                   className="group rounded-2xl border border-border bg-background overflow-hidden"\r\n                   open={openSection === "videoShowcase"}`;

const galleryElseCloseFixed = `                       </div>\r\n                     </div>\r\n                    </>)}\r\n                   </div>\r\n                 </details>\r\n\r\n                 <details\r\n                   className="group rounded-2xl border border-border bg-background overflow-hidden"\r\n                   open={openSection === "videoShowcase"}`;

if (content.includes(galleryElseClose)) {
  content = content.replace(galleryElseClose, galleryElseCloseFixed);
  console.log('✅ Fixed Gallery closing fragment');
} else {
  console.log('❌ Gallery closing pattern NOT found');
  const vsIdx = content.indexOf('open={openSection === "videoShowcase"}');
  console.log('VideoShowcase at idx:', vsIdx);
  if (vsIdx > 0) {
    console.log('Before videoShowcase:');
    console.log(JSON.stringify(content.substring(vsIdx - 300, vsIdx)));
  }
}

fs.writeFileSync(file, content, 'utf8');
console.log('File written.');
