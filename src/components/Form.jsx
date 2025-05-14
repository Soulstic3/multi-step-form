import React, { useState, useEffect } from "react";
import info from "../assets/images/bg-sidebar-desktop.svg";
import { formSteps } from "../constants";

const Form = () => {
  const [formIndice, setFormIndice] = useState(0);
  const currentStep = formSteps[formIndice];
  const handleNextStep = () => {
    setFormIndice((prev) => Math.min(prev + 1, formSteps.length - 1));
  };
  const handlePrevStep = () => {
    setFormIndice((prev) => Math.max(prev - 1, 0));
  };
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [monthly, setMonthly] = useState(true);
  const handleYearly = () => {
    setMonthly(!monthly);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [valorTotal, setValorTotal] = useState(0);
  const calcularTotal = () => {
    let total = 0;

    if (selectedPlan !== null) {
      const plano = formSteps[1].buttons[selectedPlan];
      total += monthly ? plano.valor : plano.valor * 10;
    }

    selectedAddOns.forEach((index) => {
      const addon = formSteps[2].checkboxes[index];
      total += monthly ? addon.valor : addon.valor * 10;
    });

    setValorTotal(total);
  };

  useEffect(() => {
    calcularTotal();
  }, [selectedPlan, selectedAddOns, monthly]);

  return (
    <div className="bg-white rounded-md w-200 p-3 flex justify-between">
      <div className="h-110 w-50 flex relative">
        <img src={info} alt="" className="h-full w-full" />
        <div className="absolute ml-7 my-10 flex flex-col space-y-4">
          {formSteps.map((item) => (
            <div key={item.id} className="flex items-center">
              <div
                className={`rounded-full h-8 w-8 flex items-center justify-center 
                ${
                  item.id === formIndice
                    ? "bg-sky-200"
                    : "border border-white text-white"
                }`}
              >
                {item.id + 1}
              </div>
              <div className="ml-3">
                <p className="text-xs font-thin text-indigo-400">{item.step}</p>
                <p className="font-medium text-xs text-white">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col grow space-y-7 mx-15">
        <div>
          <h1 className="text-2xl text-blue-900 font-bold pt-10">
            {currentStep.title}
          </h1>
          <p className="text-sm text-gray-400">{currentStep.description}</p>
        </div>

        <div className="flex flex-col space-y-4">
          {currentStep.inputs && (
            <>
              {currentStep.inputs.map((input, index) => (
                <div key={index} className="space-y-2">
                  <p className="text-blue-900 text-xs">{input.label}</p>
                  <input
                    type={input.type}
                    placeholder={input.placeholder}
                    className="border border-gray-400 rounded-md w-full py-2 px-3"
                    value={formData[input.name] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [input.name]: e.target.value,
                      })
                    }
                  />
                </div>
              ))}
            </>
          )}

          {currentStep.buttons && (
            <div>
              <div className="flex space-y-6 space-x-3">
                {currentStep.buttons.map((button, index) => (
                  <button
                    key={index}
                    className={`border border-gray-300 rounded-md p-4 flex flex-col justify-between hover:border-blue-500 w-30 h-35 cursor-pointer ${
                      selectedPlan === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedPlan(index)}
                  >
                    <img src={button.icon} alt="" className="h-8 w-8" />
                    <div className="text-left">
                      <p className="font-medium text-sm text-blue-900">
                        {button.title}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {(monthly && button.price) || button.anualPrice}
                      </p>
                      {!monthly && (
                        <p className="text-xs text-blue-900">
                          {button.monthsFree}
                        </p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-center p-3 rounded-sm bg-blue-50">
                <label className="relative inline-flex items-center space-x-3 cursor-pointer">
                  <span
                    className={`text-sm font-medium ${
                      monthly ? "text-blue-950" : "text-gray-400"
                    }`}
                  >
                    Monthly
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!monthly}
                    onChange={handleYearly}
                  />
                  <div className="w-11 h-6 bg-blue-950 rounded-full peer relative">
                    <div
                      className={`absolute top-0.5 bg-white border-gray-300 border rounded-full h-5 w-5 transition-all ${
                        monthly ? "left-[2px]" : "left-[24px]"
                      }`}
                    ></div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      !monthly ? "text-blue-950" : "text-gray-400"
                    }`}
                  >
                    Yearly
                  </span>
                </label>
              </div>
            </div>
          )}

          {currentStep.checkboxes && (
            <div className="space-y-3">
              {currentStep.checkboxes.map((checkbox, index) => (
                <label
                  key={index}
                  className="flex items-center border border-gray-300 rounded-md p-4 hover:border-blue-500"
                >
                  <input
                    type="checkbox"
                    className="mr-4"
                    checked={selectedAddOns.includes(index)}
                    onChange={() => {
                      setSelectedAddOns((prev) =>
                        prev.includes(index)
                          ? prev.filter((item) => item !== index)
                          : [...prev, index]
                      );
                    }}
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{checkbox.label}</p>
                    <p className="text-gray-500 text-sm">
                      {checkbox.description}
                    </p>
                  </div>
                  <p className="text-blue-500 text-sm">
                    {(monthly && checkbox.price) || checkbox.anualPrice}
                  </p>
                </label>
              ))}
            </div>
          )}

          {formIndice === 3 && (
            <div>
              <div className="bg-gray-100 rounded-sm flex flex-col">
                <div className="flex flex-row justify-between border-b border-gray-300 mx-6 mt-4 pb-4">
                  <div className="flex-col">
                    <p className="text-blue-950 font-medium">
                      {formSteps[1].buttons[selectedPlan]?.title}{" "}
                      {monthly ? " (monthly)" : "(yearly)"}
                    </p>
                    <a href="" className="text-gray-400 underline">
                      Change
                    </a>
                  </div>
                  <p className="text-blue-950 font-medium">
                    {monthly
                      ? formSteps[1].buttons[selectedPlan]?.price
                      : formSteps[1].buttons[selectedPlan]?.anualPrice}
                  </p>
                </div>
                <div>
                  {/* Exibir addons selecionados */}
                  {selectedAddOns.map((addonIndex) => {
                    const addon = formSteps[2]?.checkboxes?.[addonIndex];
                    if (!addon) return null;

                    return (
                      <div
                        key={addonIndex}
                        className="flex justify-between m-6 text-gray-400"
                      >
                        <p>{addon.label}</p>
                        <p className="text-blue-950 font-medium">
                          {monthly ? addon.price : addon.anualPrice}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-between m-6">
                <p className="text-gray-400">Total(per {monthly? "month" : "year"})</p>
                <p className="text-indigo-700 font-bold text-lg">{`$${valorTotal}/${monthly? "mo" : "yr"}`}</p>
              </div>
            </div>
          )}

          {/* Botões de navegação */}
          <div className="flex justify-between mt-10">
            {formIndice > 0 && (
              <button
                onClick={handlePrevStep}
                className="text-gray-500 hover:text-blue-900 cursor-pointer"
              >
                Go Back
              </button>
            )}
            <button
              onClick={handleNextStep}
              className={`rounded-md py-2 px-4 text-white ml-auto cursor-pointer ${
                formIndice === 3 ? "bg-indigo-700" : "bg-blue-950"
              }`}
            >
              {formIndice === formSteps.length - 1 ? "Confirm" : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
