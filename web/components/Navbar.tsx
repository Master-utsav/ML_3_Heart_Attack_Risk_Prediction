"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Moon, Heart, Activity, Zap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useHealth } from "@/hooks/useHealth";
import { MODEL_ACCURACY } from "@/constants/constants";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [healthDialogOpen, setHealthDialogOpen] = useState(false);
  const { checkHealth, health, isLoading, error, reset } = useHealth();

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const handleHealthCheck = async () => {
    reset();
    setHealthDialogOpen(true);
    await checkHealth();
  };

  const isOnline = health?.status === "ok";

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-(--background)/80 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2.5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-8 h-8 rounded-xl bg-(--heart-primary) flex items-center justify-center shadow-lg shadow-(--heart-primary)/30"
                >
                  <Heart className="w-4 h-4 text-white fill-white" />
                </motion.div>
              </div>
              <div>
                <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                  CardioCheck
                </span>
                <span className="hidden sm:block text-[10px] tracking-widest uppercase text-muted-foreground -mt-0.5">
                  Risk Predictor
                </span>
              </div>
            </motion.div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Accuracy Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge
                  variant="secondary"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-(--heart-accent)/15 text-(--heart-accent) border border-(--heart-accent)/25 rounded-full"
                >
                  <Zap className="w-3 h-3 fill-current" />
                  {MODEL_ACCURACY}% Accuracy
                </Badge>
              </motion.div>

              {/* Health Check Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleHealthCheck}
                  disabled={isLoading}
                  className="flex items-center gap-2 text-xs font-semibold border-border hover:bg-(--heart-soft) hover:text-(--heart-primary) hover:border-(--heart-primary)/40 transition-all duration-200 rounded-xl"
                >
                  <motion.div
                    animate={isLoading ? { rotate: [-20, 0, 20] } : {}}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Activity className="w-3.5 h-3.5" />
                  </motion.div>
                  <span className="hidden sm:inline">Health Check</span>
                </Button>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-9 h-9 rounded-xl hover:bg-muted transition-colors"
                  aria-label="Toggle theme"
                >
                  <AnimatePresence mode="wait">
                    {mounted && theme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-4 h-4 text-amber-400" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-4 h-4 text-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Health Check Dialog */}
      <Dialog open={healthDialogOpen} onOpenChange={setHealthDialogOpen}>
        <DialogContent className="max-w-sm rounded-3xl border-border bg-card shadow-2xl p-0 overflow-hidden">
          <div
            className={`p-1.5 ${
              isOnline ? "bg-emerald-500" : error ? "bg-rose-500" : "bg-muted"
            }`}
          />
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="font-heading text-xl flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Service Health
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-sm mt-1">
                ML prediction service status
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 py-6"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-12 h-12 rounded-full border-4 border-border border-t-(--heart-primary)"
                    />
                    <p className="text-sm text-muted-foreground">
                      Pinging the service…
                    </p>
                  </motion.div>
                )}

                {!isLoading && health && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: 0.1,
                      }}
                      className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"
                    >
                      <CheckCircle className="text-3xl"></CheckCircle>
                    </motion.div>
                    <div className="text-center">
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-base capitalize">
                        {health.status}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {health.message}
                      </p>
                    </div>
                  </motion.div>
                )}

                {!isLoading && error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        delay: 0.1,
                      }}
                      className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center"
                    >
                      <span className="text-3xl">🔴</span>
                    </motion.div>
                    <div className="text-center">
                      <p className="font-semibold text-rose-600 dark:text-rose-400 text-base">
                        Service Offline
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
