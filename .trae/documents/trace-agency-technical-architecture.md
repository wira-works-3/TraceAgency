## 1.Architecture design
```mermaid
graph TD
  A["User Browser"] --> B["React (Next.js) Landing Page"]
  B --> C["UI Libraries (framer-motion, lucide-react)"]
  B --> D["Unsplash Image CDN (placeholder)"]

  subgraph "Frontend Layer"
    B
    C
  end

  subgraph "External Assets"
    D
  end
```

## 2.Technology Description
- Frontend: React@18 + Next.js + framer-motion + lucide-react
- Backend: None (konten statis/placeholder; form kontak bisa dummy/mailto untuk MVP)

## 3.Route definitions
| Route | Purpose |
|-------|---------|
| / | Landing page Trace Agency (Hero/About/Services/Gallery/Artikel/Kontak) |
