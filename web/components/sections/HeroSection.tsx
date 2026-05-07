"use client";

import { motion, Variants } from "motion/react";
import { HeartForm } from "@/components/HeartForm";
import { Shield, Activity, Zap } from "lucide-react";
import { MODEL_ACCURACY } from "@/constants/constants";

const stats = [
  { icon: Shield, label: "ML Accuracy", value: `${MODEL_ACCURACY}%` },
  { icon: Activity, label: "Vitals Checked", value: "8" },
  { icon: Zap, label: "Instant Result", value: "< 1s" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.13, delayChildren: 0.1 },
  },
};

const item : Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft radial gradient */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,var(--heart-bg-glow),transparent)]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Floating blobs */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 right-1/4 w-80 h-80 rounded-full bg-(--heart-primary)/8 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-24 left-1/4 w-64 h-64 rounded-full bg-orange-400/8 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Copy: parent owns variants + initial/animate, children inherit */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-8"
          >
            {/* Eyebrow */}
            <motion.div variants={item} className="inline-flex">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--heart-soft) text-(--heart-primary) text-xs font-bold uppercase tracking-widest border border-(--heart-primary)/20">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-(--heart-primary) inline-block"
                />
                AI-Powered Cardiac Analysis
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={item} className="space-y-3">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-foreground">
                Know Your{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-(--heart-primary)">Heart</span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12">
                    <motion.path
                      d="M2 8 Q50 2, 100 7 Q150 12, 198 6"
                      stroke="var(--heart-primary)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.9, duration: 0.65, ease: "easeOut" }}
                    />
                  </svg>
                </span>{" "}
                <br />
                Risk Today.
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md"
            >
              Our machine learning model analyses{" "}
              <span className="font-semibold text-foreground">8 clinical vitals</span>{" "}
              to predict your heart attack risk with{" "}
              <span className="font-semibold text-(--heart-primary)">
                {MODEL_ACCURACY}% accuracy
              </span>{" "}
              — in under a second.
            </motion.p>

            {/* Stats row */}
            <motion.div variants={item} className="flex flex-wrap gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.55 + i * 0.1, type: "spring", stiffness: 260 }}
                  whileHover={{ y: -2, scale: 1.03 }}
                  className="flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-card border border-border shadow-sm cursor-default"
                >
                  <div className="w-8 h-8 rounded-xl bg-(--heart-soft) flex items-center justify-center">
                    <stat.icon className="w-4 h-4 text-(--heart-primary)" />
                  </div>
                  <div>
                    <p className="text-lg font-bold font-heading text-foreground leading-none">
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* EKG line decoration */}
            <motion.div variants={item} className="hidden lg:block">
              <svg viewBox="0 0 360 40" className="w-80 h-10 opacity-25" fill="none">
                <motion.path
                  d="M0,20 L60,20 L75,5 L90,35 L105,20 L140,20 L155,8 L168,32 L181,20 L220,20 L235,5 L250,35 L265,20 L300,20 L315,8 L328,32 L341,20 L360,20"
                  stroke="var(--heart-primary)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1.1, duration: 2, ease: "easeInOut" }}
                />
              </svg>
              <p className="text-xs text-muted-foreground tracking-widest uppercase mt-2">
                Real-time cardiac signal analysis
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeartForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}