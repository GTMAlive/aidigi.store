"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Upload, 
  DollarSign, 
  Users, 
  X,
  ChevronRight,
  CheckCircle
} from "lucide-react";

export function BeginnerGuide() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Sparkles,
      title: "Welcome to PromptMarket!",
      description: "Let's get you started in 4 simple steps. You'll be selling AI prompts in minutes!",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Upload,
      title: "Step 1: Upload Your First Prompt",
      description: "Go to Dashboard → Upload. Add your prompt title, description, and file. It's that easy!",
      action: { text: "Go to Upload", link: "/dashboard/upload" },
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Step 2: Set Up Your Profile",
      description: "Visit Dashboard → My Store to customize your creator store. Add bio, avatar, and social links.",
      action: { text: "Customize Store", link: "/dashboard/my-store" },
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: DollarSign,
      title: "Step 3: Start Earning!",
      description: "Share your store link (promptmarket.com/yourname) on social media. First ₹10,000 = 0% fees!",
      action: { text: "View Pricing", link: "/pricing" },
      color: "from-amber-500 to-orange-500"
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md">
      <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className={`bg-gradient-to-r ${steps[currentStep].color} p-6 text-white`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm`}>
                {(() => {
                  const Icon = steps[currentStep].icon;
                  return <Icon className="h-6 w-6" />;
                })()}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <h3 className="text-xl font-bold mb-2">{steps[currentStep].title}</h3>
            <p className="text-white/90 text-sm">{steps[currentStep].description}</p>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-xs font-medium text-gray-600">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${steps[currentStep].color} transition-all duration-300`}
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Steps Checklist */}
            <div className="space-y-2 mb-6">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-center gap-2 text-sm ${
                    index < currentStep ? 'text-green-600' : 
                    index === currentStep ? 'text-purple-600 font-medium' : 
                    'text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-4 w-4 fill-green-600" />
                  ) : (
                    <div className={`h-4 w-4 rounded-full border-2 ${
                      index === currentStep ? 'border-purple-600' : 'border-gray-300'
                    }`}></div>
                  )}
                  <span>{step.title.replace(/Step \d+: /, '')}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  className="rounded-full flex-1"
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
              )}
              
              {currentStep < steps.length - 1 ? (
                <Button
                  className={`rounded-full flex-1 bg-gradient-to-r ${steps[currentStep].color}`}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                steps[currentStep].action && (
                  <Button
                    className={`rounded-full flex-1 bg-gradient-to-r ${steps[currentStep].color}`}
                    asChild
                  >
                    <a href={steps[currentStep].action?.link}>
                      {steps[currentStep].action?.text}
                    </a>
                  </Button>
                )
              )}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full text-center text-xs text-gray-500 hover:text-gray-700"
            >
              Skip tutorial
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
