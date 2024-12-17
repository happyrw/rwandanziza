import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button"; // Ensure you have this component
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

const steps = [
  { id: 1, label: "Enter Title" },
  { id: 2, label: "Select Province" },
  { id: 3, label: "Select District" },
];

const provinces = ["Province 1", "Province 2"]; // Add more provinces as needed
const districts = ["District 1", "District 2"]; // Add more districts as needed

const OnboardingSteps = ({
  category,
  setShowOnboarding,
}: {
  category: string;
  setShowOnboarding: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    province: "",
    district: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem("onboardingData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const saveDataToLocalStorage = (data: any) => {
    localStorage.setItem("onboardingData", JSON.stringify(data));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    saveDataToLocalStorage(updatedData);
  };

  const handleOptionSelect = (name: string, value: string) => {
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    saveDataToLocalStorage(updatedData);
  };

  const leaveOnBoarding = () => {
    setLoading(true);
    setTimeout(() => {
      setShowOnboarding(false);
    }, 3000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="w-full md:w-[600px] h-[20rem] overflow-y-auto">
            <label htmlFor="title" className="block text-2xl font-bold">
              Title:
            </label>
            <p className="my-[2px] text-xl">
              You are creating {category} and you need to provide title for it{" "}
              <br /> Do your best to make it look stunning 👌
            </p>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border-blue-700 border-2 p-4 mt-2 rounded-md"
            />
          </div>
        );
      case 2:
        return (
          <div className="w-full md:w-[600px] h-[20rem] overflow-y-auto">
            <label className="block text-2xl font-bold">Select Province:</label>
            <p className="my-[2px] text-xl">
              Pick your desired province and let proceed to the next step 🚶🏼‍♂️‍➡️{" "}
              <br />
            </p>
            <div className="button-group">
              {provinces.map((province) => (
                <Button
                  key={province}
                  onClick={() => handleOptionSelect("province", province)}
                  className={`border-black bg-white hover:bg-white text-black border-2 ${
                    formData.province === province
                      ? "bg-[#007bff] text-white border-0 hover:bg-[#007bff]"
                      : ""
                  }`}
                >
                  {province}
                </Button>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="w-full md:w-[600px] h-[20rem] overflow-y-auto">
            <label className="block text-2xl font-bold">Select District:</label>
            <p className="my-[2px] text-xl">
              Almost there 🤸🏼 <br />
            </p>
            <p></p>
            <div className="button-group">
              {districts.map((district) => (
                <Button
                  key={district}
                  onClick={() => handleOptionSelect("district", district)}
                  className={`border-black bg-white hover:bg-white text-black border-2 ${
                    formData.district === district
                      ? "bg-[#007bff] text-white border-0 hover:bg-[#007bff]"
                      : ""
                  }`}
                >
                  {district}
                </Button>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="step-container"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
      <div className="button-container w-[600px] gap-3">
        {currentStep > 1 && (
          <Button onClick={handleBack} className="mt-5 w-full">
            <ArrowLeft /> Back
          </Button>
        )}
        {currentStep < steps.length ? (
          <Button onClick={handleNext} className="mt-5 w-full">
            Next <ArrowRight />
          </Button>
        ) : (
          <Button
            className="w-full mt-5"
            disabled={
              !formData.district || !formData.province || !formData.title
            }
            onClick={leaveOnBoarding}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Done"}{" "}
            <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingSteps;
