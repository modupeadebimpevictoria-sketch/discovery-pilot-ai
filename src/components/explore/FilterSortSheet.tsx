import {
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export type SortOption = "match" | "growth" | "alpha";

interface FilterSortSheetProps {
  open: boolean;
  onClose: () => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
  salaryMin: number;
  onSalaryMinChange: (v: number) => void;
  growthFilter: string;
  onGrowthFilterChange: (v: string) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "match", label: "Best Match" },
  { value: "growth", label: "Highest Growth" },
  { value: "alpha", label: "Alphabetical A–Z" },
];

const growthOptions = [
  { value: "all", label: "All" },
  { value: "high", label: "📈 High demand" },
  { value: "emerging", label: "🚀 Emerging field" },
];

export default function FilterSortSheet({
  open, onClose, sortBy, onSortChange, salaryMin, onSalaryMinChange, growthFilter, onGrowthFilterChange
}: FilterSortSheetProps) {
  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter & Sort</DrawerTitle>
          <DrawerDescription>Refine your career search</DrawerDescription>
        </DrawerHeader>

        <div className="px-4 space-y-5 pb-4">
          {/* Sort */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-foreground uppercase tracking-wider">Sort by</p>
            <div className="flex gap-2">
              {sortOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onSortChange(opt.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    sortBy === opt.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Growth filter */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-foreground uppercase tracking-wider">Growth Outlook</p>
            <div className="flex gap-2">
              {growthOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onGrowthFilterChange(opt.value)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    growthFilter === opt.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
