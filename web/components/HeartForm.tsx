/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CHEST_PAIN_OPTIONS,
  EXERCISE_ANGINA_OPTIONS,
  FORM_DEFAULTS,
  GENDER_OPTIONS,
  THALASSEMIA_OPTIONS,
  FIELD_RANGES,
} from "@/constants/constants";
import type { HeartFormData } from "@/constants/types";
import { usePredict } from "@/hooks/usePredict";
import { ResultDialog } from "./ResultDialog";
import { Scan } from "lucide-react";

const stagger = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 22 } },
  },
};

interface FieldWrapProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}

function FieldWrap({ label, hint, children }: FieldWrapProps) {
  return (
    <motion.div variants={stagger.item} className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </Label>
      {children}
      {hint && (
        <p className="text-[10px] text-muted-foreground">{hint}</p>
      )}
    </motion.div>
  );
}

export function HeartForm() {
  const [resultOpen, setResultOpen] = useState(false);
  const { predict, result, isLoading, error, reset } = usePredict();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HeartFormData>({ defaultValues: FORM_DEFAULTS });

  const onSubmit = async (data: HeartFormData) => {
    reset();
    setResultOpen(true);
    await predict(data);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Decorative glow behind card */}
        <div className="absolute -inset-4 rounded-4xl bg-(--heart-primary)/10 blur-3xl pointer-events-none" />

        <div className="relative rounded-3xl border border-border bg-card shadow-2xl shadow-black/5 dark:shadow-black/30 overflow-hidden">
          {/* Card header stripe */}
          <div className="h-1.5 bg-linear-to-r from-(--heart-primary) via-rose-400 to-orange-400" />

          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
                Your Health Profile
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                Fill in the fields below for an accurate assessment
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <motion.div
                variants={stagger.container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {/* Age */}
                <FieldWrap label="Age" hint={`Range: ${FIELD_RANGES.Age.min}–${FIELD_RANGES.Age.max}`}>
                  <Input
                    type="number"
                    min={FIELD_RANGES.Age.min}
                    max={FIELD_RANGES.Age.max}
                    className="rounded-xl border-border bg-background focus:ring-2 focus:ring-(--heart-primary)/30 h-11"
                    {...register("Age", {
                      required: "Age is required",
                      min: FIELD_RANGES.Age.min,
                      max: FIELD_RANGES.Age.max,
                      valueAsNumber: true,
                    })}
                  />
                  {errors.Age && (
                    <p className="text-[10px] text-rose-500 mt-0.5">{errors.Age.message}</p>
                  )}
                </FieldWrap>

                {/* Gender */}
                <FieldWrap label="Gender">
                  <Controller
                    name="Gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }: any) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="rounded-xl border-border bg-background h-11 focus:ring-2 focus:ring-(--heart-primary)/30">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border">
                          {GENDER_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldWrap>

                {/* Chest Pain Type — full width */}
                <FieldWrap label="Chest Pain Type" hint="Select the type that best matches">
                  <Controller
                    name="Chest_Pain_Type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }: any) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="rounded-xl border-border bg-background h-11 w-full focus:ring-2 focus:ring-(--heart-primary)/30">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border">
                          {CHEST_PAIN_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              <div className="flex flex-col">
                                <span>{o.label}</span>
                                <span className="text-[10px] text-muted-foreground">
                                  {o.description}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldWrap>

                {/* Resting Blood Pressure */}
                <FieldWrap
                  label="Resting Blood Pressure"
                  hint={`mmHg · ${FIELD_RANGES.Resting_Blood_Pressure.min}–${FIELD_RANGES.Resting_Blood_Pressure.max}`}
                >
                  <Input
                    type="number"
                    step="0.1"
                    min={FIELD_RANGES.Resting_Blood_Pressure.min}
                    max={FIELD_RANGES.Resting_Blood_Pressure.max}
                    className="rounded-xl border-border bg-background h-11 focus:ring-2 focus:ring-(--heart-primary)/30"
                    {...register("Resting_Blood_Pressure", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </FieldWrap>

                {/* Cholesterol Level */}
                <FieldWrap
                  label="Cholesterol Level"
                  hint={`mg/dL · ${FIELD_RANGES.Cholesterol_Level.min}–${FIELD_RANGES.Cholesterol_Level.max}`}
                >
                  <Input
                    type="number"
                    step="0.1"
                    min={FIELD_RANGES.Cholesterol_Level.min}
                    max={FIELD_RANGES.Cholesterol_Level.max}
                    className="rounded-xl border-border bg-background h-11 focus:ring-2 focus:ring-(--heart-primary)/30"
                    {...register("Cholesterol_Level", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </FieldWrap>

                {/* Max Heart Rate */}
                <FieldWrap
                  label="Max Heart Rate"
                  hint={`bpm · ${FIELD_RANGES.Maximum_Heart_Rate.min}–${FIELD_RANGES.Maximum_Heart_Rate.max}`}
                >
                  <Input
                    type="number"
                    step="0.1"
                    min={FIELD_RANGES.Maximum_Heart_Rate.min}
                    max={FIELD_RANGES.Maximum_Heart_Rate.max}
                    className="rounded-xl border-border bg-background h-11 focus:ring-2 focus:ring-(--heart-primary)/30"
                    {...register("Maximum_Heart_Rate", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                </FieldWrap>

                {/* Exercise Induced Angina */}
                <FieldWrap label="Exercise Induced Angina">
                  <Controller
                    name="Exercise_Induced_Angina"
                    control={control}
                    rules={{ required: true }}
                    render={({ field } : any) => (
                      <Select
                        value={String(field.value)}
                        onValueChange={(v: any) => field.onChange(Number(v) as 0 | 1)}
                      >
                        <SelectTrigger className="rounded-xl border-border bg-background h-11 focus:ring-2 focus:ring-(--heart-primary)/30">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border">
                          {EXERCISE_ANGINA_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={String(o.value)}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldWrap>

                {/* Thalassemia Type */}
                <FieldWrap label="Thalassemia Type">
                  <Controller
                    name="Thalassemia_Type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }: any) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="rounded-xl border-border bg-background h-11 focus:ring-2 focus:ring-(--heart-primary)/30">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-border">
                          {THALASSEMIA_OPTIONS.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                              {o.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldWrap>

                {/* Submit Button — full width */}
                <motion.div
                  variants={stagger.item}
                  className="sm:col-span-2 pt-2"
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full h-13 rounded-2xl bg-(--heart-primary) hover:bg-(--heart-primary)/90 text-white font-bold text-base tracking-wide shadow-lg shadow-(--heart-primary)/25 hover:shadow-(--heart-primary)/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <motion.span
                      className="flex items-center gap-2.5"
                      whileTap={{ scale: 0.97 }}
                    >
                      <Scan className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      Analyse My Heart Risk
                    </motion.span>
                  </Button>
                </motion.div>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>

      <ResultDialog
        open={resultOpen}
        onOpenChange={setResultOpen}
        result={result}
        error={error}
        isLoading={isLoading}
        onReset={() => {
          setResultOpen(false);
          reset();
        }}
      />
    </>
  );
}