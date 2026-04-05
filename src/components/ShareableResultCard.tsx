import { forwardRef } from "react";
import type { World } from "@/data/worlds";
import type { Cluster } from "@/data/clusters";
import { worldColors, type WorldColorConfig } from "@/data/worldColors";
import { ArrowRight } from "lucide-react";

interface Career {
  id: string;
  title: string;
  emoji: string;
}

interface Props {
  world: World;
  cluster: Cluster;
  careers: Career[];
}

const ShareableResultCard = forwardRef<HTMLDivElement, Props>(
  ({ world, cluster, careers }, ref) => {
    const colors: WorldColorConfig =
      worldColors[world.id] || worldColors["creating-expressing"];

    return (
      <div
        ref={ref}
        style={{
          width: 600,
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          overflow: "hidden",
          borderRadius: 0,
          background: colors.light,
        }}
      >
        {/* Section 1 — Hero */}
        <div
          style={{
            background: colors.bg,
            position: "relative",
            overflow: "hidden",
            padding: "32px 36px 36px",
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: "absolute",
              top: -40,
              right: -40,
              width: 180,
              height: 180,
              borderRadius: "50%",
              background: colors.mid,
              opacity: 0.15,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -50,
              left: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: colors.light,
              opacity: 0.35,
            }}
          />

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: 6, marginBottom: 24, position: "relative", zIndex: 1 }}>
            <div
              style={{
                width: 28,
                height: 8,
                borderRadius: 4,
                background: colors.mid,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: colors.dark,
                opacity: 0.25,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: colors.dark,
                opacity: 0.25,
              }}
            />
          </div>

          {/* Findr badge */}
          <div style={{ position: "relative", zIndex: 1, marginBottom: 24 }}>
            <span
              style={{
                display: "inline-block",
                background: colors.dark,
                color: colors.light,
                fontSize: 11,
                fontWeight: 600,
                padding: "5px 14px",
                borderRadius: 999,
                letterSpacing: 0.5,
              }}
            >
              ✦ Findr
            </span>
          </div>

          {/* My world is... */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: 2.5,
                color: colors.dark,
                opacity: 0.55,
                margin: "0 0 8px",
              }}
            >
              My world is
            </p>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 800,
                fontFamily: "'Syne', sans-serif",
                color: colors.dark,
                margin: "0 0 12px",
                lineHeight: 1.15,
              }}
            >
              {world.name}
            </h1>
            <p
              style={{
                fontSize: 12,
                lineHeight: 1.6,
                color: colors.dark,
                opacity: 0.75,
                margin: 0,
                maxWidth: 230,
              }}
            >
              {colors.desc}
            </p>
          </div>
        </div>

        {/* Section 2 — Divider */}
        <div style={{ height: 2, background: colors.dark }} />

        {/* Section 3 — Cluster and careers */}
        <div style={{ background: colors.light, padding: "28px 36px 20px" }}>
          {/* Cluster row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: colors.light,
                border: `2px solid ${colors.dark}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              {cluster.emoji}
            </div>
            <div>
              <p
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  fontFamily: "'Syne', sans-serif",
                  color: colors.dark,
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {cluster.name}
              </p>
              <p style={{ fontSize: 11, color: colors.dark, opacity: 0.5, margin: "2px 0 0" }}>
                Career Cluster
              </p>
            </div>
          </div>

          {/* Currently exploring label */}
          <p
            style={{
              fontSize: 9,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: 2,
              color: colors.dark,
              opacity: 0.4,
              margin: "0 0 12px",
            }}
          >
            currently exploring
          </p>

          {/* 3 career rows */}
          {careers.slice(0, 3).map((career, i) => (
            <div
              key={career.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 0",
                borderTop: i === 0 ? `1px solid ${colors.rowBorder}` : undefined,
                borderBottom: `1px solid ${colors.rowBorder}`,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: `1.5px solid ${colors.dark}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors.dark,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: colors.dark,
                  flex: 1,
                }}
              >
                {career.title}
              </span>
              <ArrowRight size={14} color={colors.dark} style={{ opacity: 0.4 }} />
            </div>
          ))}
        </div>

        {/* Section 4 — Vibe strip */}
        <div
          style={{
            background: colors.light,
            borderTop: `1px solid ${colors.rowBorder}`,
            padding: "14px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              fontFamily: "'Syne', sans-serif",
              color: colors.dark,
            }}
          >
            {colors.vibe}
          </span>
          <span style={{ fontSize: 22 }}>{world.emoji}</span>
        </div>

        {/* Section 5 — CTA strip */}
        <div
          style={{
            background: colors.dark,
            borderTop: `2px solid ${colors.dark}`,
            padding: "16px 36px",
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 800,
              fontFamily: "'Syne', sans-serif",
              color: colors.light,
              margin: "0 0 3px",
            }}
          >
            What's your world?
          </p>
          <p
            style={{
              fontSize: 11,
              color: colors.light,
              opacity: 0.6,
              margin: 0,
            }}
          >
            Find out at joinfindr.online
          </p>
        </div>

        {/* Section 6 — Footer */}
        <div
          style={{
            background: colors.dark,
            borderTop: `1.5px solid ${colors.mid}`,
            padding: "12px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 800,
              fontFamily: "'Syne', sans-serif",
              color: colors.light,
            }}
          >
            Findr
          </span>
          <span
            style={{
              fontSize: 10,
              color: colors.light,
              opacity: 0.55,
            }}
          >
            {colors.tag}
          </span>
        </div>
      </div>
    );
  }
);

ShareableResultCard.displayName = "ShareableResultCard";
export default ShareableResultCard;
