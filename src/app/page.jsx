import Banner from '@/Components/Banner/Banner';
import Categories from '@/Components/categories/page';
import ListingSection from '@/Components/Listings/ListingSection';
import Newsletter from '@/Components/newsletter/page';
import QnaSection from '@/Components/QnaSection/QnaSection';
import Testimonials from '@/Components/testimonials/page';
import WhyAdopt from '@/Components/whyAdopt/page';

export default function Home() {
  return (
    <main className="space-y-20">
      {/* 1. Banner Section */}
      <section>
        <Banner />
      </section>

      {/* 2. Categories Section (নতুন) */}
      <section>
        <Categories />
      </section>

      {/* 3. Latest Listing Section */}
      <section>
        <ListingSection />
      </section>

      {/* 4. Why Adopt Section (নতুন বা আপডেট) */}
      <section>
        <WhyAdopt />
      </section>

      {/* 5. Testimonials Section (নতুন) */}
      <section>
        <Testimonials />
      </section>

      {/* 6. QnA / FAQ Section */}
      <section>
        <QnaSection />
      </section>

      {/* 7. Newsletter / Community Section (নতুন) */}
      <section>
        <Newsletter />
      </section>
    </main>
  );
}
