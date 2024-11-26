import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';

const languages = [
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

export default function LanguageSelector() {
  const router = useRouter();

  const handleLanguageChange = (languageCode) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: languageCode });
  };

  return (
    <Menu as="div" className="relative ml-8">
      <Menu.Button className="flex items-center text-secondary hover:text-white transition-colors p-2 rounded-full hover:bg-secondary/10">
        <GlobeAltIcon className="w-5 h-5" aria-label="Change language" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            {languages.map((language) => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <button
                    onClick={() => handleLanguageChange(language.code)}
                    className={`${
                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors whitespace-nowrap`}
                  >
                    <span className="mr-3 text-lg">{language.flag}</span>
                    <span>{language.name}</span>
                    {router.locale === language.code && (
                      <span className="ml-auto text-primary">✓</span>
                    )}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
