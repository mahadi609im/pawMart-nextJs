import Banner from '@/Components/Banner/Banner';
import ListingSection from '@/Components/Listings/ListingSection';
import QnaSection from '@/Components/QnaSection/QnaSection';

export default function Home() {
  return (
    <div>
      <section className="mb-20">
        <Banner></Banner>
      </section>
      <section>
        <ListingSection></ListingSection>
      </section>
      <section className="mb-20">
        <QnaSection></QnaSection>
      </section>
    </div>
  );
}
