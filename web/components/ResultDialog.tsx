"use client";

import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { PredictResponse } from "@/constants/types";
import { RISK_MESSAGES } from "@/constants/constants";
import { AlertTriangle, CheckCircle2, RefreshCw } from "lucide-react";
import { useMemo } from "react";

interface ResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: PredictResponse | null;
  error: string | null;
  isLoading: boolean;
  onReset: () => void;
}

function getRiskMessage(risk: "High Risk" | "Low Risk") {
  const msgs = risk === "High Risk" ? RISK_MESSAGES.high : RISK_MESSAGES.low;
  return msgs[Math.floor(Math.random() * msgs.length)];
}

export function ResultDialog({
  open,
  onOpenChange,
  result,
  error,
  isLoading,
  onReset,
}: ResultDialogProps) {
  const riskMessage = useMemo(
    () => (result ? getRiskMessage(result.risk) : ""),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [result?.risk]
  );

  const isHighRisk = result?.risk === "High Risk";
  const prob =
    result?.probability != null ? result.probability.toFixed(1) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl border-border bg-card shadow-2xl p-0 overflow-hidden">
        {/* Top accent bar */}
        <motion.div
          className={`h-2 w-full ${
            isLoading
              ? "bg-muted"
              : error
              ? "bg-rose-400"
              : isHighRisk
              ? "bg-rose-500"
              : "bg-emerald-500"
          }`}
          layoutId="result-bar"
        />

        <div className="p-6 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl tracking-tight">
              {isLoading
                ? "Analysing…"
                : error
                ? "Something went wrong"
                : result
                ? result.risk
                : "Result"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {isLoading
                ? "Our model is reading your vitals"
                : error
                ? "We couldn't complete the prediction"
                : "Based on your provided health data"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {/* Loading State */}
              {isLoading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-6 py-8"
                >
                  {/* EKG animation */}
                  <div className="relative w-48 h-12">
                    <svg viewBox="0 0 200 50" className="w-full h-full">
                      <motion.path
                        d="M0,25 L40,25 L50,5 L60,45 L70,25 L90,25 L100,10 L110,40 L120,25 L160,25 L170,5 L180,45 L190,25 L200,25"
                        fill="none"
                        stroke="var(--heart-primary)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          },
                          opacity: { duration: 0.3 },
                        }}
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-muted-foreground animate-pulse">
                    Processing your data…
                  </p>
                </motion.div>
              )}

              {/* Error State */}
              {!isLoading && error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-rose-500" />
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    {error}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onReset}
                    className="mt-2 rounded-xl"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </motion.div>
              )}

              {/* Result State */}
              {!isLoading && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-6"
                >
                  {/* Risk Icon + Label */}
                  <div className="flex flex-col items-center gap-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                        delay: 0.1,
                      }}
                      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg ${
                        isHighRisk
                          ? "bg-rose-100 dark:bg-rose-900/30 shadow-rose-200 dark:shadow-rose-900/20"
                          : "bg-emerald-100 dark:bg-emerald-900/30 shadow-emerald-200 dark:shadow-emerald-900/20"
                      }`}
                    >
                      {isHighRisk ? (
                        <AlertTriangle className="w-10 h-10 text-rose-500" />
                      ) : (
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="text-center"
                    >
                      <p
                        className={`font-heading text-3xl font-bold ${
                          isHighRisk
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {result.risk}
                      </p>
                    </motion.div>
                  </div>

                  {/* Probability Bar */}
                  {prob !== null && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between text-xs font-medium text-muted-foreground">
                        <span>Risk Probability</span>
                        <span
                          className={
                            isHighRisk ? "text-rose-500" : "text-emerald-500"
                          }
                        >
                          {prob}%
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            isHighRisk
                              ? "bg-linear-to-r from-orange-400 to-rose-500"
                              : "bg-linear-to-r from-teal-400 to-emerald-500"
                          }`}
                          initial={{ width: "0%" }}
                          animate={{ width: `${prob}%` }}
                          transition={{
                            duration: 1,
                            delay: 0.4,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className={`rounded-2xl p-4 text-sm border italic ${
                      isHighRisk
                        ? "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300"
                        : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                     {riskMessage}
                  </motion.div>

                  {/* Disclaimer */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="text-[10px] text-center text-muted-foreground leading-relaxed"
                  >
                    This is an AI-generated estimate. Always consult a qualified
                    medical professional for diagnosis and treatment.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      onClick={() => onOpenChange(false)}
                      className="w-full rounded-xl bg-(--heart-primary) hover:bg-(--heart-primary)/90 text-white font-semibold py-5"
                    >
                      Close
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
