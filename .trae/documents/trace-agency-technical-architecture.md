## 1.Architecture design
```mermaid
graph TD
  A["User Browser"] --> B["React (Next.js) Landing Page"]
  B --> C["UI Libraries (framer-motion, lucide-react)"]
  B --> D["Local Static Images (public/SPG, public/Usher, public/MC, public/Talent)"]

  subgraph "Frontend Layer"
    B
    C
  end

  subgraph "Static Assets"
    D
  end
```

## 2.Technology Description
- Frontend: React@18 + Next.js + framer-motion + lucide-react
- Backend: None (gambar carousel menggunakan aset lokal; form kontak bisa dummy/mailto untuk MVP)

## 3.Route definitions
| Route | Purpose |
|-------|---------|
| / | Landing page Trace Agency (Hero/About/Services/Gallery/Artikel/Kontak) |
