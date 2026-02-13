import { DollarSign, Heart, GraduationCap, Sprout } from "lucide-react";

export type ChatMode = "budget" | "health" | "school" | "agriculture";

export const modes: Record<ChatMode, {
  label: string;
  icon: typeof DollarSign;
  description: string;
  color: string;
  greeting: string;
  suggestions: string[];
}> = {
  budget: {
    label: "Pocket Money Planner",
    icon: DollarSign,
    description: "Plan your school pocket money wisely",
    color: "text-mode-budget",
    greeting: "Hi! I'm Martha, your Pocket Money Planner 💰. Tell me how much pocket money you have and how long your term is, and I'll help you spend it wisely — canteen, events, savings, and more!",
    suggestions: ["Plan how to spend 200,000 UGX for a 2-month term", "How to save from my pocket money?", "Budget for canteen, events & birthdays", "Tips to make my pocket money last the whole term"],
  },
  health: {
    label: "Health Assistant",
    icon: Heart,
    description: "Wellness tips & nutrition",
    color: "text-mode-health",
    greeting: "Hello! I'm your Health Assistant. I can help with wellness tips, nutrition advice, and exercise plans. How can I help you today? 🏃‍♂️",
    suggestions: ["Create a 7-day meal plan", "Best exercises for beginners", "How much water should I drink daily?", "Tips for better sleep"],
  },
  school: {
    label: "School Helper",
    icon: GraduationCap,
    description: "Homework help & study plans",
    color: "text-mode-school",
    greeting: "Hey there! I'm your School Helper. Need help with homework, study planning, or understanding a concept? Let's learn together! 📚",
    suggestions: ["Explain photosynthesis simply", "Help me write an essay outline", "Create a study schedule for exams", "Solve this math problem step by step"],
  },
  agriculture: {
    label: "Agriculture Advisor",
    icon: Sprout,
    description: "Crop tips & farming advice",
    color: "text-mode-agriculture",
    greeting: "Welcome! I'm your Agriculture Advisor. I can help with crop selection, soil care, pest control, and more. What are you growing? 🌾",
    suggestions: ["Best crops for dry climate", "How to improve soil fertility?", "Organic pest control methods", "When to plant tomatoes?"],
  },
};
