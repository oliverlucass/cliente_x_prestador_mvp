import { SearchSuggestionsRow } from "@/components/search/search-suggestions-row";
import { FadeInView } from "@/components/motion/fade-in-view";

export function SearchSection() {
  return (
    <section
      id="categories"
      aria-labelledby="search-heading"
      className="border-b bg-background px-4 py-10 md:py-14"
    >
      <div className="container flex flex-col items-center">
        <FadeInView className="mb-8 text-center">
          <h1
            id="search-heading"
            className="text-balance text-h1 text-foreground"
          >
            Find the right service
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-balance text-body text-muted-foreground">
            Search by category and discover trusted professionals near you.
          </p>
        </FadeInView>

        <FadeInView delay={0.08} className="w-full flex justify-center">
          <SearchSuggestionsRow />
        </FadeInView>
      </div>
    </section>
  );
}
