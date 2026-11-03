export interface NewsTemplateData {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  read_time: string;
}

export function getNewsTemplate(type: 'launching' | 'handover'): NewsTemplateData {
  if (type === 'handover') {
    return {
      title: 'Serah Terima Resmi Website & Sistem [Nama Klien] oleh TechSoe',
      category: 'Serah Terima Proyek',
      excerpt: 'TechSoe secara resmi menyelesaikan dan menyerahkan proyek pengembangan platform website baru kepada [Nama Klien], siap mendukung percepatan transformasi digital.',
      read_time: '3 Menit Baca',
      content: `## Resmi Diserahkan: Platform Digital [Nama Klien] Kini Siap Beroperasi

TechSoe (Teknologi Inovasi Soedirman) dengan bangga mengumumkan keberhasilan penyelesaian dan serah terima resmi (*project handover*) sistem website terbaru milik **[Nama Klien / Instansi / Bisnis]**. 

Seremoni penyerahan ini menandai fase *Go-Live* setelah melewati serangkaian tahapan perencanaan, perancangan antarmuka (UI/UX), *custom development*, pengujian keamanan, serta pelatihan operasional kepada tim internal klien.

---

### Profil Klien & Latar Belakang Kebutuhan
**[Nama Klien]** merupakan [deskripsikan profil singkat klien, misal: penyedia jasa terkemuka / perusahaan yang bergerak di bidang retail / instansi pelayanan publik]. Sebelum berkolaborasi bersama TechSoe, kebutuhan utama yang dihadapi meliputi:
- Kebutuhan akan identitas visual digital yang lebih kredibel, profesional, dan modern.
- Sistem navigasi informasi yang cepat diakses pelanggan melalui perangkat seluler (*mobile-first*).
- Integrasi kanal komunikasi langsung (seperti formulir WhatsApp dan sistem inquiry otomatis).

---

### Solusi & Spesifikasi Teknologi yang Dibangun
Guna menjamin kecepatan maksimal, skalabilitas jangka panjang, dan kemudahan pengelolaan, TechSoe mengimplementasikan arsitektur modern berstandar industri:
- **Framework Modern:** Dibangun menggunakan teknologi web performa tinggi untuk waktu muat (*load time*) super kilat.
- **Desain Responsif Adaptif:** Optimal di semua ukuran layar (smartphone, tablet, maupun desktop).
- **SEO Ready:** Konfigurasi metadata terindeks mesin pencari Google sejak hari pertama peluncuran.
- **Keamanan & SSL Terenkripsi:** Standar enkripsi data untuk melindungi privasi seluruh pengguna.

---

> *"Kerjasama bersama tim TechSoe sangat komunikatif dan responsif. Sistem website yang dihasilkan sangat sesuai ekspektasi kami, rapi, dan langsung bisa kami gunakan untuk menjangkau lebih banyak pelanggan secara online."*
> — **[Nama PIC / Pemilik Bisnis]**, *[Jabatan di Perusahaan Klien]*

---

### Kunjungi Website Klien
Website kini telah dapat diakses oleh publik luas secara langsung melalui tautan:
🔗 **[Kunjungi Website Resmi](https://example.com)**

TechSoe berkomitmen untuk terus mendampingi masa pasca-peluncuran melalui layanan pemeliharaan teknis (*maintenance & support*) guna memastikan sistem senantiasa beroperasi prima.

*Ingin bisnis atau organisasi Anda memiliki website berstandar tinggi seperti proyek ini? Diskusikan kebutuhan Anda bersama tim konsultan kami sekarang juga.*`,
    };
  }

  // Type: Launching
  return {
    title: 'TechSoe Resmi Meluncurkan [Nama Produk / Fitur / Inovasi Baru]',
    category: 'Berita & Rilis',
    excerpt: 'Langkah strategis baru dari TechSoe dalam menghadirkan solusi teknologi terkini yang lebih cepat, efisien, dan siap pakai untuk mendukung akselerasi bisnis Anda.',
    read_time: '3 Menit Baca',
    content: `## Inovasi Baru: Peluncuran Resmi [Nama Produk / Layanan / Sistem]

Sebagai wujud komitmen berkelanjutan dalam memberdayakan pelaku bisnis dan organisasi melalui inovasi teknologi, **TechSoe (Teknologi Inovasi Soedirman)** hari ini secara resmi meluncurkan platform terbaru: **[Nama Produk / Layanan]**.

Peluncuran ini dihadirkan sebagai jawaban atas tingginya kebutuhan pasar akan solusi digital yang tidak hanya canggih secara arsitektur, namun juga ramah pengguna (*user-friendly*) dan mampu mendorong efisiensi kerja secara nyata.

---

### Fitur Unggulan yang Dihadirkan
Melalui peluncuran perdana ini, pengguna dapat menikmati berbagai kapabilitas unggulan:
1. **Performa Tinggi & Tanpa Hambatan:** Dioptimalkan untuk kecepatan dan beban kerja tinggi tanpa kompromi.
2. **Antarmuka Intuitif (Modern UI):** Dirancang agar siapa saja dapat menggunakannya tanpa memerlukan kurva belajar yang rumit.
3. **Keamanan Data Terpadu:** Menerapkan protokol proteksi mutakhir untuk melindungi setiap transaksi dan informasi sensitif.
4. **Dukungan Integrasi Luas:** Terhubung dengan mudah ke berbagai kanal komunikasi dan sistem pendukung lainnya.

---

### Komitmen TechSoe ke Depan
Peluncuran ini hanyalah langkah awal dari serangkaian peta jalan (*roadmap*) pengembangan yang telah kami siapkan. Tim rekayasa perangkat lunak TechSoe akan terus merilis peningkatan performa secara berkala.

> *"Visi kami adalah menjadikan teknologi tingkat lanjut dapat diakses secara mudah, fleksibel, dan terukur oleh seluruh lapisan bisnis, dari skala UMKM hingga korporasi besar."*
> — **Tim Manajemen TechSoe**

---

### Coba Sekarang
Anda dapat langsung mengeksplorasi layanan baru ini melalui tautan resmi kami:
🔗 **[Akses Layanan Sekarang](https://techsoe.com)**

Untuk konsultasi mengenai implementasi sistem ini pada bisnis Anda, silakan hubungi tim kami melalui kontak resmi yang tersedia.`,
  };
}

