"use client";

import Link from "next/link";
import { useMemo } from "react";

import { useSession } from "next-auth/react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import { ROUTES } from "@/constants/routes";

const CTA = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const cardPositions = useMemo(
    () => [
      { left: "5.529222262434641%", top: "18.19187442176281%" },
      { left: "0.8340418525211724%", top: "47.332866495109016%" },
      { left: "77.43415600172142%", top: "83.09235808733415%" },
      { left: "87.02058251083872%", top: "79.09143031323613%" },
    ],
    []
  );

  const circlePositions = useMemo(
    () => [
      {
        width: 40,
        height: 40,
        left: "89.49636513746921%",
        top: "18.078344582884153%",
      },
      {
        width: 60,
        height: 60,
        left: "84.69270757819484%",
        top: "57.89599490508106%",
      },
      {
        width: 80,
        height: 80,
        left: "16.070188582542134%",
        top: "6.208384015472035%",
      },
      {
        width: 100,
        height: 100,
        left: "97.28730988005886%",
        top: "95.64973476487533%",
      },
    ],
    []
  );

  const getCardAnimation = useMemo(
    () => [
      { x: [0, 15], y: [0, -12], rotate: [0, 3] },
      { x: [0, -12], y: [0, 18], rotate: [0, -2] },
      { x: [0, 8], y: [0, 10], rotate: [0, 5] },
      { x: [0, -18], y: [0, -15], rotate: [0, -4] },
      { x: [0, 20], y: [0, 5], rotate: [0, 2] },
      { x: [0, -10], y: [0, -20], rotate: [0, -3] },
    ],
    []
  );

  const getCircleAnimation = useMemo(
    () => [
      { x: [0, 15], y: [0, -12], scale: [1, 1.1, 1] },
      { x: [0, -20], y: [0, 15], scale: [1, 1.1, 1] },
      { x: [0, 10], y: [0, -18], scale: [1, 1.1, 1] },
      { x: [0, -15], y: [0, 20], scale: [1, 1.1, 1] },
    ],
    []
  );

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          {/* Background Animation Elements */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            {/* Task cards */}
            {cardPositions.map((position, i) => (
              <motion.div
                key={`card-${i}`}
                className="absolute bg-white rounded-lg shadow-lg w-20 h-24 md:w-32 md:h-40"
                style={position}
                animate={getCardAnimation[i]}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 5 + (i % 3) * 2,
                }}
              >
                <div className="h-2 w-1/2 bg-primary/60 rounded-full absolute top-2 left-2"></div>
                <div className="h-2 w-3/4 bg-neutral-300/60 rounded-full absolute top-6 left-2"></div>
                <div className="h-2 w-2/3 bg-neutral-300/60 rounded-full absolute top-10 left-2"></div>
              </motion.div>
            ))}

            {/* Progress circles */}
            {circlePositions.map((position, i) => (
              <motion.div
                key={`circle-${i}`}
                className="absolute rounded-full border-4 border-white/30"
                style={position}
                animate={getCircleAnimation[i]}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 8 + i * 1.5,
                }}
              />
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of teams that use Boardino to deliver amazing
            projects on time, every time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={user ? ROUTES.boards : ROUTES.signup}
              className="px-6 py-3 border border-white rounded-md text-lg hover:bg-white/10 transition-colors flex items-center justify-center text-white font-semibold"
            >
              {user ? "View Boards" : "Start for free"}{" "}
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
