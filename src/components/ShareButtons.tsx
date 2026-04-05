import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import type { WorldColorConfig } from "@/data/worldColors";

interface Props {
  cardRef: React.RefObject<HTMLDivElement>;
  colors: WorldColorConfig;
}

type TooltipTarget = "tiktok" | "snapchat" | null;

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
);

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.77 1.52V6.84a4.84 4.84 0 0 1-1.01-.15z"/></svg>
);

const SnapchatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0"><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12.922-.214.12-.042.24-.082.36-.12.18-.06.27-.044.33-.014.18.06.27.18.3.33.03.12.06.42-.42.69-.18.084-.42.18-.69.252-.18.06-.39.12-.57.18-.36.12-.54.21-.66.39-.12.18-.06.39-.03.54.21.78.78 1.53 1.2 2.01.18.18.36.36.54.51.36.33.75.66 1.29.93.18.12.33.18.42.27.12.12.15.27.03.42l-.06.06c-.18.3-.6.51-1.29.69-.18.06-.39.09-.57.15l-.12.03c-.12.03-.18.12-.24.27-.06.12-.12.33-.3.54-.18.18-.42.27-.66.27-.12 0-.24-.03-.36-.06-.36-.12-.78-.18-1.2-.18-.18 0-.36 0-.54.03-.3.06-.54.18-.78.39-.54.42-1.02.87-2.01.87-.03 0-.09 0-.12-.003-.03.003-.06.003-.09.003-.99 0-1.47-.45-2.01-.87a2.37 2.37 0 0 0-.78-.39c-.18-.03-.36-.03-.54-.03-.42 0-.84.06-1.2.18-.12.03-.24.06-.36.06-.24 0-.48-.09-.66-.27-.18-.21-.24-.42-.3-.54-.06-.15-.12-.24-.24-.27l-.12-.03c-.18-.06-.39-.09-.57-.15-.69-.18-1.11-.39-1.29-.69l-.06-.06c-.12-.15-.09-.3.03-.42.09-.09.24-.15.42-.27.54-.27.93-.6 1.29-.93.18-.15.36-.33.54-.51.42-.48.99-1.23 1.2-2.01.03-.15.09-.36-.03-.54-.12-.18-.3-.27-.66-.39-.18-.06-.39-.12-.57-.18-.27-.06-.51-.15-.69-.252-.36-.27-.45-.57-.42-.69.03-.15.12-.27.3-.33.06-.03.15-.046.33.014.12.038.24.078.36.12.263.094.622.23.922.214.198 0 .326-.045.401-.09a8.86 8.86 0 0 1-.033-.57c-.1-1.628-.23-3.654.3-4.847C7.86 1.069 11.216.793 12.206.793z"/></svg>
);

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
