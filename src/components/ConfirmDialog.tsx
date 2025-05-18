
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
      localStorage.setItem('hideAnonymizationAlert', 'true');
    }
    onConfirm();
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-white border border-gray-200 shadow-xl rounded-xl max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-synapsce text-xl font-bold">
            Confirmation de transfert
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            Toutes les données transférées sur SYNAPSCE sont anonymisées, le patient a l'identifiant suivant : <span className="font-semibold">{patientId}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="doNotShow"
            checked={doNotShowAgain}
            onCheckedChange={(checked) => setDoNotShowAgain(checked as boolean)}
          />
          <Label htmlFor="doNotShow" className="text-sm text-gray-500 cursor-pointer">
            Ne plus afficher ce message
          </Label>
        </div>
        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel 
            className="bg-gray-100 hover:bg-gray-200 text-gray-700"
            onClick={onClose}
          >
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-gradient-to-r from-synapsce to-synapsceGreen/90 hover:from-synapsce/90 hover:to-synapsceGreen/80 text-white"
          >
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
