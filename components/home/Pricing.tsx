"use client";

import React, { useState } from "react";

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-secondary mr-2 mt-0.5 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

const PricingFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <CheckIcon />
    <span>{children}</span>
  </li>
);

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      description: "For individuals or small teams just getting started",
      price: { monthly: "$0", annual: "$0" },
      period: "/month",
      features: [
        "Up to 5 users",
        "Basic project boards",
        "1GB storage",
        "Community support",
      ],
      cta: "Get started",
      ctaStyle: "border",
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing teams that need more features",
      price: { monthly: "$12", annual: "$9" },
      period: "/user/month",
      features: [
        "Unlimited users",
        "Advanced board customization",
        "50GB storage",
        "Priority email support",
        "Advanced reporting",
      ],
      cta: "Start free trial",
      ctaStyle: "solid",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with specific needs",
      price: { monthly: "Custom", annual: "Custom" },
      period: "",
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "Dedicated account manager",
        "24/7 phone & email support",
        "Custom integrations",
      ],
      cta: "Contact sales",
      ctaStyle: "border",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-16 md:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-neutral-700 max-w-3xl mx-auto mb-8">
            Choose the plan that&apos;s right for your team. All plans include a
            14-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-neutral-200 p-1 rounded-lg">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-white text-primary shadow-sm"
                  : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isAnnual
                  ? "bg-white text-primary shadow-sm"
                  : "text-neutral-600 hover:text-neutral-800"
              }`}
            >
              Annual
              <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white p-8 rounded-xl border ${
                plan.popular
                  ? "border-2 border-primary shadow-lg transform hover:scale-105"
                  : "border-neutral-200 hover:border-primary hover:shadow-md"
              } flex flex-col transition-all duration-300 relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-8 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-neutral-700 mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">
                  {isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                {plan.period && (
                  <span className="text-neutral-700">{plan.period}</span>
                )}
                {isAnnual && plan.price.annual !== "Custom" && (
                  <div className="text-sm text-green-600 font-medium mt-1">
                    Billed annually
                  </div>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <PricingFeature key={i}>{feature}</PricingFeature>
                ))}
              </ul>
              <button
                className={`mt-auto py-3 px-6 rounded-md font-medium transition-colors ${
                  plan.ctaStyle === "solid"
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "border border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-neutral-600">
            Need something specific?{" "}
            <a
              href="#contact"
              className="text-primary font-medium hover:underline"
            >
              Contact us
            </a>{" "}
            for a custom quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
