import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, X } from 'lucide-react';

type IconProps = { className?: string };

// Envelope/message glyph recreated to match the provided icon, as a crisp
// white SVG so it stays sharp on the button.
const ContactGlyph: React.FC<IconProps> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="3.5" />
    <path d="M3.6 8.5 12 13l8.4-4.5" />
  </svg>
);

const WhatsAppIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
  </svg>
);

type ContactLink = {
  id: string;
  label: string;
  href: string;
  Icon: React.FC<IconProps>;
  colorClass: string;
};

export const contactLinks: ContactLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/mikavisionnyc/',
    Icon: Instagram,
    colorClass: 'bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: "https://wa.me/14807847840?text=Hi%20Mika!%20I'm%20interested%20in%20your%20photography%20services.%20Could%20you%20tell%20me%20more%20about%20your%20packages?",
    Icon: WhatsAppIcon,
    colorClass: 'bg-green-500 hover:bg-green-600',
  },
  {
    id: 'phone',
    label: 'Call me',
    href: 'tel:+14807847840',
    Icon: Phone,
    colorClass: 'bg-sky-500 hover:bg-sky-600',
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:mikayerdaulet@gmail.com',
    Icon: Mail,
    colorClass: 'bg-red-500 hover:bg-red-600',
  },
  {
    id: 'location',
    label: 'Location',
    href: 'https://maps.google.com/?q=San+Francisco,+CA',
    Icon: MapPin,
    colorClass: 'bg-amber-500 hover:bg-amber-600',
  },
];

// Shared glossy 3D black styling for the toggle and header buttons.
const button3dStyle: React.CSSProperties = {
  background: 'radial-gradient(circle at 50% 28%, #4a4a4a 0%, #1a1a1a 55%, #050505 100%)',
};

const button3dShadowSm: React.CSSProperties = {
  boxShadow:
    '0 4px 10px rgba(0,0,0,0.45), inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.7)',
};

/** Inline row of contact icons — used in the desktop header (glossy 3D black). */
export const ContactIconRow: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center gap-2 ${className ?? ''}`}>
    {contactLinks.map(({ id, label, href, Icon }) => (
      <motion.a
        key={id}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative w-9 h-9 rounded-full flex items-center justify-center text-white transition-shadow duration-200"
        style={{ ...button3dStyle, ...button3dShadowSm }}
      >
        {/* glossy top highlight */}
        <span
          className="pointer-events-none absolute top-1 left-1/2 -translate-x-1/2 w-5 h-1.5 rounded-full bg-white/25 blur-[2px]"
          aria-hidden="true"
        />
        <Icon className="w-5 h-5 relative" />
      </motion.a>
    ))}
  </div>
);

/** Floating expandable contact button — used on mobile only. */
const ContactMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden fixed bottom-5 left-4 z-50 flex flex-col-reverse items-center gap-3">
      {/* Toggle button — glossy 3D black */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.06 }}
        className="relative w-16 h-16 rounded-full text-white flex items-center justify-center"
        style={{
          background:
            'radial-gradient(circle at 50% 28%, #4a4a4a 0%, #1a1a1a 55%, #050505 100%)',
          boxShadow:
            '0 12px 28px rgba(0,0,0,0.55), inset 0 2px 3px rgba(255,255,255,0.25), inset 0 -4px 8px rgba(0,0,0,0.7)',
        }}
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        aria-expanded={open}
      >
        {/* glossy top highlight */}
        <span
          className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 w-9 h-3.5 rounded-full bg-white/25 blur-[4px]"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <X className="w-7 h-7" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <ContactGlyph className="w-8 h-8" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring while collapsed */}
        {!open && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-white/30"
            initial={{ opacity: 0.6, scale: 1 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.button>

      {/* Contact links */}
      <AnimatePresence>
        {open &&
          contactLinks.map(({ id, label, href, Icon, colorClass }, i) => (
            <motion.a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              initial={{ opacity: 0, y: 16, scale: 0.4 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.4 }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 22,
                delay: (contactLinks.length - 1 - i) * 0.05,
              }}
              className={`w-12 h-12 rounded-full ${colorClass} shadow-lg flex items-center justify-center text-white transition-colors duration-200`}
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default ContactMenu;
