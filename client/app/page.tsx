import CTA from '@/components/CTA';
import GradientWrapper from '@/components/GradientWrapper';
import Hero from '@/components/Hero';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function Home() {
  return (
    <>
      <GoogleAnalytics /> {/* Google Analytics 컴포넌트 추가 */}
      <Hero />
      <GradientWrapper></GradientWrapper>
      <CTA />
    </>
  );
}
