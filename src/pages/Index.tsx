import React, { useState } from "react";
import { synapsceData } from "@/data/synapsce_data";
import PatientRecord from "@/screens/PatientRecord";
import SynapsceSearch from "@/screens/SynapsceSearch";
import SynapsceRecommendations from "@/screens/SynapsceRecommendations";
import ConfirmDialog from "@/components/ConfirmDialog";
import LoadingSpinner from "@/components/LoadingSpinner";

type Screen =
  | "patient-record"
  | "synapsce-search"
  | "synapsce-recommendations"
  | "loading"
  | "navigation-loading";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("patient-record");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

  // We're using the first patient (fibromyalgia) for this demo
  const patient = synapsceData.patients[0];

  const handleViewRecommendations = () => {
    // Check if we should show the confirmation dialog
    const hideAlert = localStorage.getItem("hideAnonymizationAlert");
    if (hideAlert === "true") {
      navigateToSynapsce();
    } else {
      setShowConfirmDialog(true);
    }
  };

  const navigateToSynapsce = () => {
    setCurrentScreen("navigation-loading");
    setTimeout(() => {
      setCurrentScreen("synapsce-search");
    }, 2000);
  };

  const handleSearchSubmit = (notes: string) => {
    setAdditionalNotes(notes);
    setCurrentScreen("loading");

    // Simulate loading time
    setTimeout(() => {
      setCurrentScreen("synapsce-recommendations");
    }, 2000); // Show loading for 2 seconds
  };

  const handleBack = () => {
    setCurrentScreen("synapsce-search");
  };

  return (
    <div className="relative">
      {currentScreen === "patient-record" && (
        <PatientRecord
          patient={patient}
          onViewRecommendations={handleViewRecommendations}
        />
      )}

      {currentScreen === "synapsce-search" && (
        <SynapsceSearch patient={patient} onSearchSubmit={handleSearchSubmit} />
      )}

      {currentScreen === "navigation-loading" && (
        <div className="min-h-screen bg-white font-synapsce flex flex-col items-center justify-center">
          <div className="synapsce-header w-full p-4 mb-12 flex justify-center">
            <h2 className="text-2xl font-bold">SYNAPSCE</h2>
          </div>
          <div className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border border-gray-100">
            <LoadingSpinner
              size="lg"
              message="Création d'une requête SYNAPSCE anonymisée..."
            />
            <p className="text-gray-500 text-sm mt-8 text-center max-w-md">
              Préparation de l'interface de recherche sécurisée...
            </p>
          </div>
        </div>
      )}

      {currentScreen === "loading" && (
        <div className="min-h-screen bg-white font-synapsce flex flex-col items-center justify-center">
          <div className="synapsce-header w-full p-4 mb-12 flex justify-center">
            <h2 className="text-2xl font-bold">SYNAPSCE</h2>
          </div>
          <div className="p-8 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-xl border border-gray-100">
            <LoadingSpinner
              size="lg"
              message="Analyse et recherche de recommandations en cours..."
            />
            <p className="text-gray-500 text-sm mt-8 text-center max-w-md">
              SYNAPSCE analyse les données anonymisées pour trouver les
              approches les plus pertinentes...
            </p>
          </div>
        </div>
      )}

      {currentScreen === "synapsce-recommendations" && (
        <SynapsceRecommendations
          patient={patient}
          data={synapsceData}
          additionalNotes={additionalNotes}
          onBack={handleBack}
        />
      )}

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={() => {
          setShowConfirmDialog(false);
          navigateToSynapsce();
        }}
        patientId={patient.anonymousDisplayId}
      />
    </div>
  );
};

export default Index;
