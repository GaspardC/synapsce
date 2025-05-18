
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Patient } from '@/data/synapsce_data';
import SynapsceLogoSmall from '@/components/SynapsceLogoSmall';
import ChuvLogo from '@/components/ChuvLogo';

interface SynapsceSearchProps {
  patient: Patient;
  onSearchSubmit: (additionalNotes: string) => void;
}

const SynapsceSearch: React.FC<SynapsceSearchProps> = ({ patient, onSearchSubmit }) => {
  const [additionalNotes, setAdditionalNotes] = useState("");

  const summarizePatientCase = (patient: Patient): string => {
    return `Contexte Patient : ${patient.gender}, ${patient.age} ans.
Problématique principale : ${patient.primaryDiagnosis}, ${patient.relevantHistory.join(', ')}.
Objectif thérapeutique actuel : Échec des traitements conventionnels. Recherche d'amélioration de la qualité de vie, gestion de la douleur, du sommeil et de l'anxiété.`;
  };

  const handleSubmit = () => {
    onSearchSubmit(additionalNotes);
  };

  return (
    <div className="min-h-screen bg-white font-synapsce animate-slide-in">
      {/* Header */}
      <header className="synapsce-header p-4 flex justify-between items-center shadow-md">
        <SynapsceLogoSmall />
        <div className="flex items-center gap-2 text-white text-sm">
          <div className="flex items-center gap-1">
            <span className="text-xs">Propulsé par</span>
            <ChuvLogo />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold mb-2 text-synapsce">
            Recherche d'approches complémentaires SYNAPSCE
          </h1>
          <p className="text-gray-500">
            SYNAPSCE vous aide à identifier des approches pertinentes pour votre patient
          </p>
        </div>

        <Card className="mb-6 shadow-md">
          <CardContent className="pt-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 text-synapsce">
                Récapitulatif du Cas (Anonymisé)
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700">
                <pre className="whitespace-pre-wrap font-synapsce text-sm">
                  {summarizePatientCase(patient)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardContent className="pt-6">
            <div className="mb-6">
              <Label htmlFor="notes" className="text-lg font-semibold text-synapsce mb-4 block">
                Quels aspects spécifiques souhaitez-vous explorer ou quelles sont les attentes/préférences de la patiente ? (optionnel)
              </Label>
              <Textarea
                id="notes"
                placeholder="Ex: Approches non médicamenteuses pour le sommeil, techniques de gestion du stress, intérêt pour la phytothérapie, recherche de praticiens dans la région lausannoise..."
                className="min-h-[150px] text-gray-700"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="bg-synapsce hover:bg-synapsce/90 text-white px-6"
                size="lg"
              >
                Rechercher dans SYNAPSCE
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="mt-8 text-center text-sm text-gray-500 p-4">
        SYNAPSCE - Une initiative du CHUV pour la médecine intégrative
      </footer>
    </div>
  );
};

export default SynapsceSearch;
