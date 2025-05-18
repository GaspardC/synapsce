
import React, { useState } from 'react';
import { synapsceData } from '@/data/synapsce_data';
import PatientRecord from '@/screens/PatientRecord';
import SynapsceSearch from '@/screens/SynapsceSearch';
import SynapsceRecommendations from '@/screens/SynapsceRecommendations';
import { useToast } from '@/components/ui/use-toast';

type Screen = 'patient-record' | 'synapsce-search' | 'synapsce-recommendations';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('patient-record');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const { toast } = useToast();
  
  // We're using the first patient (fibromyalgia) for this demo
  const patient = synapsceData.patients[0];
  
  const handleViewRecommendations = () => {
    setCurrentScreen('synapsce-search');
    toast({
      title: "Navigation vers SYNAPSCE",
      description: "Création d'une requête SYNAPSCE anonymisée..."
    });
  };
  
  const handleSearchSubmit = (notes: string) => {
    setAdditionalNotes(notes);
    setCurrentScreen('synapsce-recommendations');
    toast({
      title: "Recherche effectuée",
      description: "Affichage des recommandations SYNAPSCE pertinentes...",
    });
  };
  
  const handleBack = () => {
    setCurrentScreen('synapsce-search');
  };
  
  return (
    <div className="relative">
      {currentScreen === 'patient-record' && (
        <PatientRecord 
          patient={patient} 
          onViewRecommendations={handleViewRecommendations} 
        />
      )}
      
      {currentScreen === 'synapsce-search' && (
        <SynapsceSearch 
          patient={patient} 
          onSearchSubmit={handleSearchSubmit} 
        />
      )}
      
      {currentScreen === 'synapsce-recommendations' && (
        <SynapsceRecommendations 
          patient={patient} 
          data={synapsceData} 
          additionalNotes={additionalNotes}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default Index;
