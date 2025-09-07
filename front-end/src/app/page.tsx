import { TeamSection, Testimonials } from "@/components";
import ApiTest from "@/components/ApiTest";

export default function Home() {
  return (
    <main>
      <div className="container mx-auto py-8">
        <ApiTest />
      </div>
      <TeamSection />
      <Testimonials />
    </main>
  );
}
