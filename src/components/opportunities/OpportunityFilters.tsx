interface OpportunityFiltersProps {
  filter: string;
  onFilterChange: (f: string) => void;
}

const filters = [
  { key: "all", label: "All" },
  { key: "internship", label: "💼 Internships" },
  { key: "scholarship", label: "🎓 Scholarships" },
  { key: "competition", label: "🏆 Competitions" },
  { key: "program", label: "🌍 Programs" },
  { key: "volunteering", label: "🤝 Volunteering" },
  { key: "workshop", label: "🛠️ Workshops" },
];

export default function OpportunityFilters({ filter, onFilterChange }: OpportunityFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
            filter === f.key
              ? "gradient-bg text-primary-foreground"
              : "glass-card text-muted-foreground"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
