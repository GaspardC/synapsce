import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MagicBorderButton } from "@/components/ui/MagicBorderButton";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  patientId: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  patientId,
}) => {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const handleConfirm = () => {
    // In a real app, we would save this preference to localStorage or user preferences
    if (doNotShowAgain) {
      localStorage.setItem("hideAnonymizationAlert", "true");
    }
    onConfirm();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-white border border-gray-200 shadow-xl rounded-xl max-w-md mx-auto">
        <AlertDialogHeader>
          <div className="flex justify-center mb-4">
            <img
              src="/logo_synapsce_with_text.png"
              alt="SYNAPSCE Logo"
              className="h-60"
            />
          </div>
          <AlertDialogTitle className="text-synapsce text-xl font-bold">
            Confirmation de transfert
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Toutes les données transférées sur SYNAPSCE sont anonymisées, le
            patient a l'identifiant suivant :{" "}
            <span className="font-semibold">{patientId}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="doNotShow"
            checked={doNotShowAgain}
            onCheckedChange={(checked) => setDoNotShowAgain(checked as boolean)}
          />
          <Label
            htmlFor="doNotShow"
            className="text-sm text-gray-500 cursor-pointer"
          >
            Ne plus afficher ce message
          </Label>
        </div>
        <AlertDialogFooter className="mt-6 sm:items-center">
          <AlertDialogCancel
            className="text-sm text-gray-600 hover:text-gray-800 underline px-4 py-2"
            onClick={onClose}
          >
            Annuler
          </AlertDialogCancel>
          <MagicBorderButton
            onClick={handleConfirm}
            spanClassName="text-white font-black bg-[linear-gradient(to_right,theme(colors.synapsceGreen/20),theme(colors.synapsce/20))] hover:bg-[linear-gradient(to_right,theme(colors.synapsceGreen/30),theme(colors.synapsce/30))]"
          >
            Confirmer
          </MagicBorderButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
