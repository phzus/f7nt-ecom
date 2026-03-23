// Site navigation config
// Migrado de: Liquid linklist "main-menu"

export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: NavLink[] = [
  { label: "Privacy Policy", href: "/pages/privacy-policy" },
  { label: "Terms of Service", href: "/pages/terms-of-service" },
  { label: "Refund Policy", href: "/pages/refund-policy" },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/f7nt.co", icon: "instagram" },
  { label: "TikTok", href: "https://tiktok.com/@f7nt.co", icon: "tiktok" },
  { label: "YouTube", href: "https://youtube.com/@f7nt", icon: "youtube" },
];
