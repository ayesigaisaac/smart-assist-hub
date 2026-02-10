import { DollarSign, Heart, GraduationCap, Sprout } from "lucide-react";

export type ChatMode = "budget" | "health" | "school" | "agriculture";

export const modes: Record<ChatMode, {
  label: string;
  icon: typeof DollarSign;
  description: string;
  color: string;
  greeting: string;
}> = {
  budget: {
    label: "Budget Planner",
    icon: DollarSign,
    description: "Track expenses & plan savings",
    color: "text-mode-budget",
    greeting: "Hi! I'm your Budget Planner. Tell me about your income and expenses, and I'll help you create a smart spending plan. 💰",
  },
  health: {
    label: "Health Assistant",
    icon: Heart,
    description: "Wellness tips & nutrition",
    color: "text-mode-health",
    greeting: "Hello! I'm your Health Assistant. I can help with wellness tips, nutrition advice, and exercise plans. How can I help you today? 🏃‍♂️",
  },
  school: {
    label: "School Helper",
    icon: GraduationCap,
    description: "Homework help & study plans",
    color: "text-mode-school",
    greeting: "Hey there! I'm your School Helper. Need help with homework, study planning, or understanding a concept? Let's learn together! 📚",
  },
  agriculture: {
    label: "Agriculture Advisor",
    icon: Sprout,
    description: "Crop tips & farming advice",
    color: "text-mode-agriculture",
    greeting: "Welcome! I'm your Agriculture Advisor. I can help with crop selection, soil care, pest control, and more. What are you growing? 🌾",
  },
};
