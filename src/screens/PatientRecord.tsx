
import React from 'react';
import { Patient } from '../data/synapsce_data';
import ChuvLogo from '../components/ChuvLogo';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PatientRecordProps {
  patient: Patient;
  onViewRecommendations: () => void;
}

const PatientRecord: React.FC<PatientRecordProps> = ({ patient, onViewRecommendations }) => {
  // Format date of birth for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-CH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white font-chuv animate-fade-in">
      {/* Header */}
      <header className="chuv-header p-4 flex justify-between items-center shadow-md">
        <ChuvLogo />
        <div className="flex items-center gap-4 text-sm">
          <span>Dr. Eva Martin</span>
          <span>|</span>
          <button className="hover:underline">Déconnexion</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-6 text-chuv">
          Dossier Patient Électronique - CHUV
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Info */}
          <div className="lg:col-span-1">
            <Card className="hover-card">
              <CardHeader className="bg-chuv bg-opacity-10">
                <CardTitle className="text-chuv">Informations Patient</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Identifiant</h3>
                    <p>{patient.anonymousDisplayId}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Date de naissance</h3>
                    <p>
                      {formatDate(patient.dateOfBirth)} ({patient.age} ans)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Genre</h3>
                    <p>{patient.gender}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Diagnostic principal</h3>
                    <p className="font-medium">{patient.primaryDiagnosis}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Antécédents pertinents</h3>
                    <ul className="list-disc pl-5 mt-1">
                      {patient.relevantHistory.map((history, index) => (
                        <li key={index}>{history}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Treatments & Notes */}
          <div className="lg:col-span-2">
            <Card className="mb-6 hover-card">
              <CardHeader className="bg-chuv bg-opacity-10">
                <CardTitle className="text-chuv">Traitements actuels (Conventionnels)</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {patient.currentConventionalTreatments.map((treatment, index) => (
                    <div key={index}>
                      <h3 className="font-semibold">{treatment.drugName} - {treatment.dosage}</h3>
                      <p className="text-gray-700">{treatment.notes}</p>
                      {index < patient.currentConventionalTreatments.length - 1 && (
                        <Separator className="my-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 hover-card">
              <CardHeader className="bg-chuv bg-opacity-10">
                <CardTitle className="text-chuv">Tentatives thérapeutiques précédentes</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="list-disc pl-5">
                  {patient.previousAttempts.map((attempt, index) => (
                    <li key={index}>{attempt}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader className="bg-chuv bg-opacity-10">
                <CardTitle className="text-chuv">Note du médecin</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 relative">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="italic">{patient.physicianNote}</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button 
                    className="bg-synapsce hover:bg-synapsce/90 text-white btn-shine"
                    onClick={onViewRecommendations}
                  >
                    Voir les recommandations SYNAPSCE
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientRecord;
