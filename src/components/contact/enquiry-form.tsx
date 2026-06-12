"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enquirySchema, EnquiryFormData } from "@/lib/validations";
import { EVENT_TYPES } from "@/lib/types";

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle size={48} className="text-primary mb-6" aria-hidden />
        <h3 className="font-serif text-2xl mb-3">Enquiry Received!</h3>
        <p className="font-sans text-sm text-muted-foreground max-w-sm leading-relaxed mb-8">
          Thank you for reaching out. We&apos;ve received your booking enquiry
          and will get back to you within 24 hours. Please check your email for
          a confirmation.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="font-sans text-xs font-medium tracking-widest uppercase text-primary hover:underline"
        >
          Submit Another Enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Event booking enquiry form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Your full name"
            aria-required="true"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" className="font-sans text-xs text-destructive" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 XXXXX XXXXX"
            aria-required="true"
            aria-describedby={errors.phone ? "phone-error" : undefined}
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && (
            <p id="phone-error" className="font-sans text-xs text-destructive" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            aria-required="true"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p id="email-error" className="font-sans text-xs text-destructive" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Event Type */}
        <div className="space-y-2">
          <Label htmlFor="event_type">Event Type *</Label>
          <Select onValueChange={(val) => setValue("event_type", val, { shouldValidate: true })}>
            <SelectTrigger
              id="event_type"
              aria-required="true"
              aria-describedby={errors.event_type ? "event-type-error" : undefined}
              aria-invalid={!!errors.event_type}
            >
              <SelectValue placeholder="Select event type" />
            </SelectTrigger>
            <SelectContent>
              {EVENT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.event_type && (
            <p id="event-type-error" className="font-sans text-xs text-destructive" role="alert">
              {errors.event_type.message}
            </p>
          )}
        </div>

        {/* Event Date */}
        <div className="space-y-2">
          <Label htmlFor="event_date">Event Date *</Label>
          <Input
            id="event_date"
            type="date"
            aria-required="true"
            aria-describedby={errors.event_date ? "date-error" : undefined}
            aria-invalid={!!errors.event_date}
            min={new Date().toISOString().split("T")[0]}
            {...register("event_date")}
          />
          {errors.event_date && (
            <p id="date-error" className="font-sans text-xs text-destructive" role="alert">
              {errors.event_date.message}
            </p>
          )}
        </div>

        {/* Guest Count */}
        <div className="space-y-2">
          <Label htmlFor="guest_count">Expected Guest Count *</Label>
          <Input
            id="guest_count"
            type="number"
            placeholder="e.g. 300"
            min="1"
            aria-required="true"
            aria-describedby={errors.guest_count ? "guests-error" : undefined}
            aria-invalid={!!errors.guest_count}
            {...register("guest_count")}
          />
          {errors.guest_count && (
            <p id="guests-error" className="font-sans text-xs text-destructive" role="alert">
              {errors.guest_count.message}
            </p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2 mb-8">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your event, special requirements, or any questions..."
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" className="font-sans text-xs text-destructive" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Server error */}
      <AnimatePresence>
        {serverError && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="font-sans text-sm text-destructive mb-4 p-3 bg-destructive/10 border border-destructive/20"
            role="alert"
            aria-live="assertive"
          >
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="luxury"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
        aria-label={isSubmitting ? "Sending your enquiry..." : "Send your booking enquiry"}
      >
        {isSubmitting ? (
          <>
            <Loader2 size={14} className="animate-spin" aria-hidden />
            Sending...
          </>
        ) : (
          <>
            <Send size={14} aria-hidden />
            Send Enquiry
          </>
        )}
      </Button>
    </form>
  );
}
