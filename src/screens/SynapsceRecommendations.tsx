import React from "react";
import { FileText, Video, Info, User, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Patient,
  Practitioner,
  ComplementaryApproach,
  Source,
  SynapsceData,
} from "@/data/synapsce_data";
import SynapsceLogoSmall from "@/components/SynapsceLogoSmall";
import { MagicBorderButton } from "@/components/ui/MagicBorderButton";

interface SynapsceRecommendationsProps {
  patient: Patient;
  data: SynapsceData;
  additionalNotes?: string;
  onBack: () => void;
}

const SynapsceRecommendations: React.FC<SynapsceRecommendationsProps> = ({
  patient,
  data,
  additionalNotes,
  onBack,
}) => {
  // Filter approaches relevant to fibromyalgia (cond_001)
  const relevantApproaches = data.complementaryApproaches.filter((approach) =>
    approach.relevantForConditions.includes("cond_001")
  );

  // Get custom pertinence texts for approaches
  const getPertinenceText = (approachId: string): string => {
    switch (approachId) {
      case "ca_001": // Acupuncture
        return "Plusieurs études suggèrent un bénéfice sur la douleur et la fatigue. Peut améliorer la qualité du sommeil.";
      case "ca_002": // MBSR
        return "Aide à réduire la perception de la douleur, l'anxiété, et à améliorer le sommeil et la qualité de vie globale.";
      case "ca_003": // Phytothérapie
        return "Valériane/Passiflore (sommeil, anxiété), Harpagophytum (douleurs inflammatoires - à évaluer avec précaution).";
      case "ca_005": // Yoga
        return "Améliore la souplesse, réduit la tension musculaire et contribue à une meilleure gestion du stress et de l'anxiété.";
      case "ca_008": // Micronutrition
        return "Certains micronutriments (magnésium, vitamines D et B, oméga-3) peuvent aider à réduire l'inflammation et améliorer la gestion de la douleur.";
      default:
        return "Peut contribuer à la gestion des symptômes dans certains cas.";
    }
  };

  // Get icon for source type
  const getSourceIcon = (type: string) => {
    if (type.toLowerCase().includes("vidéo")) {
      return <Video className="h-5 w-5" />;
    } else if (
      type.toLowerCase().includes("fiche") ||
      type.toLowerCase().includes("article")
    ) {
      return <FileText className="h-5 w-5" />;
    } else if (type.toLowerCase().includes("site")) {
      return <Search className="h-5 w-5" />;
    } else {
      return <Info className="h-5 w-5" />;
    }
  };

  // Filter sources for a specific approach
  const getSourcesForApproach = (approachId: string): Source[] => {
    return data.sources.filter((source) =>
      source.relatedApproaches?.includes(approachId)
    );
  };

  // Get general sources for fibromyalgia (sources relevant to the condition but not specific to an approach)
  const getGeneralSources = (): Source[] => {
    const approachSpecificSourceIds = new Set<string>();

    // Collect all approach-specific source IDs
    relevantApproaches.forEach((approach) => {
      const sources = getSourcesForApproach(approach.id);
      sources.forEach((source) => approachSpecificSourceIds.add(source.id));
    });

    // Filter sources that are relevant to fibromyalgia but not approach-specific
    return data.sources.filter(
      (source) =>
        source.relatedConditions?.includes("cond_001") &&
        !approachSpecificSourceIds.has(source.id)
    );
  };

  // Get practitioners from Lausanne or Pully who support relevant approaches
  const getRelevantPractitioners = (): Practitioner[] => {
    const relevantApproachIds = relevantApproaches.map(
      (approach) => approach.id
    );

    return data.practitioners.filter(
      (practitioner) =>
        (practitioner.locationCity === "Lausanne" ||
          practitioner.locationCity === "Pully") &&
        practitioner.supportedApproaches.some((approachId) =>
          relevantApproachIds.includes(approachId)
        )
    );
  };

  return (
    <div className="min-h-screen bg-white font-synapsce animate-slide-in">
      {/* Header */}
      <header className="synapsce-header p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <MagicBorderButton
            variant="outline"
            onClick={onBack}
            containerClassName="h-10 w-10"
            spanClassName="p-0"
          >
            <ArrowLeft className="h-4 w-4 text-white group-hover:text-synapsce" />
          </MagicBorderButton>
          <SynapsceLogoSmall />
        </div>
        <div></div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2 text-synapsce">
            Recommandations SYNAPSCE pour : {patient.primaryDiagnosis} (Douleur,
            Sommeil, Anxiété)
          </h1>

          {additionalNotes && (
            <div className="mt-2 p-3 bg-blue-50 border-l-4 border-synapsce rounded text-sm">
              <p className="font-medium mb-1">Basé sur vos précisions :</p>
              <p className="text-gray-700">"{additionalNotes}"</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="approaches" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="approaches" className="px-6">
              Approches Complémentaires
            </TabsTrigger>
            <TabsTrigger value="resources" className="px-6">
              Ressources
            </TabsTrigger>
            <TabsTrigger value="practitioners" className="px-6">
              Professionnels
            </TabsTrigger>
          </TabsList>

          {/* Approaches Tab */}
          <TabsContent value="approaches" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relevantApproaches.map((approach) => (
                <Card key={approach.id} className="synapsce-card h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-synapsce">
                        {approach.name}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-synapsce"
                      >
                        {approach.keywords.slice(0, 2).join(", ")}
                      </Badge>
                    </div>
                    <CardDescription>{approach.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-medium mb-1 text-gray-700">
                        Pertinence Fibromyalgie
                      </h4>
                      <p className="text-sm">
                        {getPertinenceText(approach.id)}
                      </p>
                    </div>

                    <Separator className="my-3" />

                    <div>
                      <h4 className="font-medium mb-2 text-gray-700">
                        En savoir plus
                      </h4>
                      <div className="space-y-2">
                        {getSourcesForApproach(approach.id).map((source) => (
                          <Button
                            key={source.id}
                            variant="outline"
                            className="w-full justify-start text-left"
                            asChild
                          >
                            <a href="#" className="flex items-center gap-2">
                              {getSourceIcon(source.type)}
                              <span className="truncate">
                                {source.title.length > 40
                                  ? source.title.substring(0, 40) + "..."
                                  : source.title}
                              </span>
                            </a>
                          </Button>
                        ))}

                        {getSourcesForApproach(approach.id).length === 0 && (
                          <p className="text-sm text-gray-500">
                            Pas de sources spécifiques disponibles
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle className="text-synapsce">
                  Ressources et informations de confiance
                </CardTitle>
                <CardDescription>
                  Sélection de sources pertinentes pour la fibromyalgie et les
                  approches complémentaires
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getGeneralSources().map((source) => (
                    <Card key={source.id} className="synapsce-card">
                      <CardHeader className="pb-2">
                        <div className="flex gap-3 items-center">
                          <div className="bg-blue-100 p-2 rounded-full">
                            {getSourceIcon(source.type)}
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {source.title}
                            </CardTitle>
                            <CardDescription>
                              {source.type} - {source.authorOrOrganization}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-3">{source.summary}</p>
                        <Button
                          variant="outline"
                          className="text-synapsce border-synapsce"
                          asChild
                        >
                          <a href="#" className="flex items-center gap-2">
                            {source.type.toLowerCase().includes("vidéo")
                              ? "Regarder la vidéo"
                              : "Consulter la ressource"}
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Extra video resources for variety */}
                  <Card className="synapsce-card">
                    <CardHeader className="pb-2">
                      <div className="flex gap-3 items-center">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Video className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">
                            {data.sources[7].title}
                          </CardTitle>
                          <CardDescription>
                            {data.sources[7].type} -{" "}
                            {data.sources[7].authorOrOrganization}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-3">{data.sources[7].summary}</p>
                      <Button
                        variant="outline"
                        className="text-synapsce border-synapsce"
                        asChild
                      >
                        <a href="#" className="flex items-center gap-2">
                          Regarder la vidéo ({data.sources[7].durationMinutes}{" "}
                          min)
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practitioners Tab */}
          <TabsContent value="practitioners">
            <Card>
              <CardHeader>
                <CardTitle className="text-synapsce">
                  Professionnels Recommandés (Région Lausanne)
                </CardTitle>
                <CardDescription>
                  Praticiens formés aux approches complémentaires pertinentes
                  pour la fibromyalgie
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getRelevantPractitioners().map((practitioner) => (
                    <Card key={practitioner.id} className="synapsce-card">
                      <CardHeader className="pb-2">
                        <div className="flex gap-3 items-start">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <User className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-base">
                              {practitioner.firstName} {practitioner.lastName}
                            </CardTitle>
                            <CardDescription>
                              {practitioner.title} - {practitioner.locationCity}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-3">
                          <h4 className="font-medium text-sm mb-1">
                            Spécialisations
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {practitioner.specializations
                              .slice(0, 3)
                              .map((spec, index) => (
                                <Badge key={index} variant="secondary">
                                  {spec}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        <div className="mb-3">
                          <h4 className="font-medium text-sm mb-1">
                            Note SYNAPSCE
                          </h4>
                          <p className="text-sm">{practitioner.synapsceNote}</p>
                        </div>

                        <Button
                          variant="outline"
                          className="text-synapsce border-synapsce"
                          asChild
                        >
                          <a href="#" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Voir profil et contact
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-gray-500 p-6 border-t">
        <p>SYNAPSCE : Connecter les savoirs, réinventer la santé.</p>
        <p className="mt-1">Une initiative soutenue par le Défi Source.</p>
      </footer>
    </div>
  );
};

export default SynapsceRecommendations;
