import { ArrowRight, Gift, Star } from "lucide-react";
import Link from "next/link";
import { Hero } from "./hero";
import { cn } from "@unlogg/ui/lib/utils";
import { ValueSection } from "./value-section";

export default function Homepage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <Hero />
      {/* <ValueSection /> */}
    </div>
  );
}
