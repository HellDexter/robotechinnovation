import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const products = [
  { href: '/products/robotic-welding', key: 'robotic-welding' },
  { href: '/products/welding-lasers', key: 'welding-lasers' },
  { href: '/products/cleaning-lasers', key: 'cleaning-lasers' },
  { href: '/products/robotic-grinding', key: 'robotic-grinding' },
  { href: '/products/carport', key: 'carport' },
];

export default function ProductsMenu() {
  const { t } = useTranslation('common');

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="text-secondary hover:text-white transition-colors inline-flex items-center whitespace-nowrap font-medium">
        {t('nav.products')}
        <ChevronDownIcon className="ml-1 h-5 w-5" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items className="absolute left-0 mt-2 w-64 origin-top-left bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
          <div className="py-1">
            {products.map((product) => (
              <Menu.Item key={product.href}>
                {({ active }) => (
                  <Link
                    href={product.href}
                    className={`${
                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    } group flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors whitespace-nowrap`}
                  >
                    {t(`products.${product.key}.title`)}
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
