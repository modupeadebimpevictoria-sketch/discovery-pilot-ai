import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRightLeft, Heart } from "lucide-react";

interface SetActivePathModalProps {
  open: boolean;
  onClose: () => void;
  onSetActive: () => void;
  careerTitle: string;
  careerEmoji: string;
}

export function SetActivePathModal({ open, onClose, onSetActive, careerTitle, careerEmoji }: SetActivePathModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <div className="mx-auto w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-2">
            <Lock size={24} className="text-primary-foreground" />
          </div>
          <DialogTitle className="text-center">Set as Active Path</DialogTitle>
          <DialogDescription className="text-center text-sm">
            You need to set <span className="font-semibold">{careerEmoji} {careerTitle}</span> as your Active Path before starting missions, quests, skill paths, or applying for opportunities.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={onSetActive} className="w-full">
            Set as Active Path
          </Button>
          <Button variant="outline" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface SwitchPathModalProps {
  open: boolean;
  onClose: () => void;
  onSwitch: () => void;
  onSaveAndContinue: () => void;
  currentCareerTitle: string;
  newCareerTitle: string;
  newCareerEmoji: string;
}

export function SwitchPathModal({ open, onClose, onSwitch, onSaveAndContinue, currentCareerTitle, newCareerTitle, newCareerEmoji }: SwitchPathModalProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <div className="mx-auto w-14 h-14 rounded-2xl gradient-bg-warm flex items-center justify-center mb-2">
            <ArrowRightLeft size={24} className="text-accent-foreground" />
          </div>
          <DialogTitle className="text-center">Switch Active Career Path?</DialogTitle>
          <DialogDescription className="text-center text-sm">
            You currently have <span className="font-semibold">{currentCareerTitle}</span> set as your Active Path.
            <br /><br />
            Switching to <span className="font-semibold">{newCareerEmoji} {newCareerTitle}</span> may pause or reset progress on your current missions, quests, and skill paths.
            <br /><br />
            If you're still exploring, you may want to save this career and return to it later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button variant="outline" onClick={onSaveAndContinue} className="w-full gap-2">
            <Heart size={16} /> Save Career & Continue Exploring
          </Button>
          <Button onClick={onSwitch} className="w-full">
            Switch Active Path
          </Button>
          <Button variant="ghost" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
