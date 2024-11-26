import { appWithTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import ScrollToTop from '../components/ScrollToTop';
import '../../styles.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const dir = router.locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div dir={dir} className={`${dir === 'rtl' ? 'font-arabic' : ''}`}>
      <Component {...pageProps} />
      <ScrollToTop />
    </div>
  );
}

export default appWithTranslation(MyApp);
