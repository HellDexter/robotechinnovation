import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function MobileMenu({ isOpen, onClose, onSectionClick }) {
  const { t } = useTranslation('common');
  const router = useRouter();

  const products = [
    { href: '/products/robotic-welding', key: 'robotic-welding' },
    { href: '/products/welding-lasers', key: 'welding-lasers' },
    { href: '/products/cleaning-lasers', key: 'cleaning-lasers' },
    { href: '/products/robotic-grinding', key: 'robotic-grinding' },
    { href: '/products/carport', key: 'carport' },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute top-24 left-0 w-full bg-primary shadow-lg md:hidden">
      <div className="px-4 pt-2 pb-3 space-y-1">
        <Link
          href="/#about"
          className="block px-3 py-2 text-secondary hover:text-white transition-colors"
          onClick={(e) => onSectionClick(e, 'about')}
        >
          {t('nav.about')}
        </Link>

        <div className="space-y-1 pl-3">
          <div className="px-3 py-2 text-secondary">{t('nav.products')}</div>
          {products.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="block px-3 py-2 text-secondary hover:text-white transition-colors pl-6"
              onClick={onClose}
            >
              {t(`products.${product.key}.title`)}
            </Link>
          ))}
        </div>

        <Link
          href="/#services"
          className="block px-3 py-2 text-secondary hover:text-white transition-colors"
          onClick={(e) => onSectionClick(e, 'services')}
        >
          {t('nav.services')}
        </Link>

        <Link
          href="/#contact"
          className="block px-3 py-2 text-secondary hover:text-white transition-colors"
          onClick={(e) => onSectionClick(e, 'contact')}
        >
          {t('nav.contact')}
        </Link>
      </div>
    </div>
  );
}
