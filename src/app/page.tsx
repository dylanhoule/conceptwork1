import { HeroJourney } from "@/components/home/HeroJourney";
import { TrustStrip } from "@/components/home/TrustStrip";
import { ServiceArea } from "@/components/home/ServiceArea";

/**
 * Home, one long scroll: pinned 3D journey (hero → cooling → heating →
 * air quality → 24/7 → reassemble), then trust strip and service area.
 * Reduced-motion visitors get the static hero + stacked value props instead
 * (handled inside HeroJourney).
 */
export default function Home() {
  return (
    <>
      <HeroJourney />
      <TrustStrip />
      <ServiceArea />
    </>
  );
}
