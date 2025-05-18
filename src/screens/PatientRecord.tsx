import React from "react";
import { Patient } from "../data/synapsce_data";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MagicBorderButton } from "@/components/ui/MagicBorderButton";

interface PatientRecordProps {
  patient: Patient;
  onViewRecommendations: () => void;
}

const PatientRecord: React.FC<PatientRecordProps> = ({
  patient,
  onViewRecommendations,
}) => {
  // Format date of birth for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white font-chuv animate-fade-in text-gray-800">
      {/* Header */}
      <header className="bg-[#009933] p-4 flex justify-between items-center shadow-md">
        <img src="/chuv_logo.png" alt="CHUV Logo" className="h-10" />
        <div className="flex items-center gap-4 text-sm text-white">
          <span>Dr. Eva Martin</span>
          <span>|</span>
          <button className="hover:underline">Déconnexion</button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-semibold mb-6 text-[#00508C]">
          Dossier Patient Électronique - CHUV
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Info */}
          <div className="lg:col-span-1">
            <Card className="hover-card bg-white border-gray-200">
              <CardHeader className="bg-chuv/10">
                <CardTitle className="text-[#00508C]">
                  Informations Patient
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 text-gray-700">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700">Identifiant</h3>
                    <p>{patient.anonymousDisplayId}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Date de naissance
                    </h3>
                    <p>
                      {formatDate(patient.dateOfBirth)} ({patient.age} ans)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">Genre</h3>
                    <p>{patient.gender}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Diagnostic principal
                    </h3>
                    <p className="font-medium text-gray-800">
                      {patient.primaryDiagnosis}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Antécédents pertinents
                    </h3>
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
            <Card className="mb-6 hover-card bg-white border-gray-200">
              <CardHeader className="bg-chuv/10">
                <CardTitle className="text-[#00508C]">
                  Traitements actuels (Conventionnels)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 text-gray-700">
                <div className="space-y-4">
                  {patient.currentConventionalTreatments.map(
                    (treatment, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-800">
                          {treatment.drugName} - {treatment.dosage}
                        </h3>
                        <p className="text-gray-600">{treatment.notes}</p>
                        {index <
                          patient.currentConventionalTreatments.length - 1 && (
                          <Separator className="my-2 border-gray-200" />
                        )}
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6 hover-card bg-white border-gray-200">
              <CardHeader className="bg-chuv/10">
                <CardTitle className="text-[#00508C]">
                  Tentatives thérapeutiques précédentes
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 text-gray-700">
                <ul className="list-disc pl-5">
                  {patient.previousAttempts.map((attempt, index) => (
                    <li key={index}>{attempt}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-card bg-white border-gray-200">
              <CardHeader className="bg-chuv/10">
                <CardTitle className="text-[#00508C]">
                  Note du médecin
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 relative">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-gray-700">
                  <p className="italic">{patient.physicianNote}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <MagicBorderButton
          onClick={onViewRecommendations}
          spanClassName="text-white font-black bg-[linear-gradient(to_right,theme(colors.synapsceGreen/20),theme(colors.synapsce/20))] hover:bg-[linear-gradient(to_right,theme(colors.synapsceGreen/30),theme(colors.synapsce/30))]"
        >
          SYNAPSCE
          <ArrowRight className="ml-2 h-4 w-4" />
        </MagicBorderButton>
      </div>
    </div>
  );
};

export default PatientRecord;
