import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import type { WorldColorConfig } from "@/data/worldColors";

interface Props {
  cardRef: React.RefObject<HTMLDivElement>;
  colors: WorldColorConfig;
}

type TooltipTarget = "tiktok" | "snapchat" | null;

export default function ShareButtons({ cardRef, colors }: Props) {
  const [activeTooltip, setActiveTooltip] = useState<TooltipTarget>(null);
  const [busy, setBusy] = useState(false);
  const tooltipTimer = useRef<ReturnType<typeof setTimeout>>();

  const captureCard = useCallback(async () => {
    if (!cardRef.current) return null;
    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    return new Promise<Blob | null>((res) => canvas.toBlob(res, "image/png"));
  }, [cardRef]);

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const showTooltip = (target: TooltipTarget) => {
    if (tooltipTimer.current) clearTimeout(tooltipTimer.current);
    setActiveTooltip(target);
    tooltipTimer.current = setTimeout(() => setActiveTooltip(null), 3000);
  };

  const shareViaWebShare = async (blob: Blob, text?: string) => {
    const file = new File([blob], "my-findr-world.png", { type: "image/png" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        ...(text ? { text } : {}),
        title: "My Findr Result",
      });
    } else {
      downloadBlob(blob, "my-findr-world.png");
    }
  };

  const handleInstagram = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const blob = await captureCard();
      if (blob) await shareViaWebShare(blob);
    } catch (e) {
      console.error("Instagram share failed", e);
    } finally {
      setBusy(false);
    }
  };

  const handleWhatsApp = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const blob = await captureCard();
      if (blob)
        await shareViaWebShare(
          blob,
          "I just found my career world on Findr. What's yours? joinfindr.online"
        );
    } catch (e) {
      console.error("WhatsApp share failed", e);
    } finally {
      setBusy(false);
    }
  };

  const handleTikTok = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const blob = await captureCard();
      if (blob) {
        downloadBlob(blob, "my-findr-world.png");
        showTooltip("tiktok");
      }
    } catch (e) {
      console.error("TikTok share failed", e);
    } finally {
      setBusy(false);
    }
  };

  const handleSnapchat = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const blob = await captureCard();
      if (blob) {
        downloadBlob(blob, "my-findr-world.png");
        showTooltip("snapchat");
      }
    } catch (e) {
      console.error("Snapchat share failed", e);
    } finally {
      setBusy(false);
    }
  };

  const buttons = [
    { label: "Instagram Stories", key: "instagram" as const, handler: handleInstagram },
    { label: "WhatsApp", key: "whatsapp" as const, handler: handleWhatsApp },
    { label: "TikTok", key: "tiktok" as const, handler: handleTikTok },
    { label: "Snapchat", key: "snapchat" as const, handler: handleSnapchat },
  ];

  const tooltipMessages: Record<string, string> = {
    tiktok: "Saved to your camera roll — upload it to TikTok",
    snapchat: "Saved to your camera roll — open Snapchat to share",
  };

  return (
    <div className="px-5 pb-4">
      <div className="grid grid-cols-2 gap-2">
        {buttons.map((btn) => (
          <div key={btn.key} className="relative">
            <button
              onClick={btn.handler}
              disabled={busy}
              className="w-full py-2.5 px-4 rounded-full text-xs font-semibold transition-opacity disabled:opacity-60"
              style={{ background: colors.dark, color: colors.light }}
            >
              {busy ? "…" : btn.label}
            </button>
            {activeTooltip === btn.key && tooltipMessages[btn.key] && (
              <div
                className="absolute left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-medium z-10 shadow-lg"
                style={{ background: colors.dark, color: colors.light }}
              >
                {tooltipMessages[btn.key]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
