import CTA from '@/components/CTA';
import GradientWrapper from '@/components/GradientWrapper';
import Hero from '@/components/Hero';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function Home() {
  return (
    <>
      <GoogleAnalytics />
      <Hero />
      <GradientWrapper></GradientWrapper>
      <CTA />
    </>
  );
}
