import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, DollarSign, Heart, GraduationCap, Sprout, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: DollarSign,
    title: "Pocket Money Planner",
    description: "Plan your school pocket money wisely — canteen, events, savings, and more with AI guidance.",
    color: "text-mode-budget",
    bg: "bg-blue-50",
  },
  {
    icon: Heart,
    title: "Health Assistant",
    description: "Get wellness tips, nutrition suggestions, exercise plans, and general health guidance.",
    color: "text-mode-health",
    bg: "bg-rose-50",
  },
  {
    icon: GraduationCap,
    title: "School Helper",
    description: "Homework explanations, study planners, note summarization, and quiz generation.",
    color: "text-mode-school",
    bg: "bg-violet-50",
  },
  {
    icon: Sprout,
    title: "Agriculture Advisor",
    description: "Crop tips, soil care, pest control, and weather-based farming advice for better yields.",
    color: "text-mode-agriculture",
    bg: "bg-emerald-50",
  },
];

const highlights = [
  { icon: Sparkles, title: "AI-Powered", desc: "Intelligent responses tailored to your needs" },
  { icon: Shield, title: "Secure", desc: "Your conversations are private and protected" },
  { icon: Zap, title: "Instant", desc: "Real-time streaming responses" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Bot className="h-5 w-5" />
          </div>
          <span className="font-heading text-lg font-bold text-foreground">Martha Chatbot</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <Link to="/about">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">About</Button>
          </Link>
          <Link to="/pricing">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Pricing</Button>
          </Link>
          <Link to="/auth">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link to="/auth">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 md:px-12 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
              Your AI-powered life assistant
            </span>
            <h1 className="font-heading text-4xl font-bold leading-tight text-foreground md:text-6xl">
              One bot, <span className="text-gradient">four superpowers</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Budget planning, health advice, homework help, and farming tips — all in one smart, 
              friendly AI assistant.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="gap-2 rounded-xl px-8">
                  Start Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-y border-border bg-muted/50 px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-8 md:flex-row">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <h.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{h.title}</p>
                <p className="text-xs text-muted-foreground">{h.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground">
            Everything you need, in one place
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${f.bg}`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-card-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-2xl rounded-3xl gradient-hero p-10 text-center text-primary-foreground md:p-14">
          <h2 className="font-heading text-2xl font-bold md:text-3xl">Ready to get smarter?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm opacity-90">
            Join thousands of users making better decisions with AI-powered guidance.
          </p>
          <Link to="/auth">
            <Button
              size="lg"
              variant="secondary"
              className="mt-6 gap-2 rounded-xl"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-heading text-sm font-bold text-foreground">Martha Chatbot</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Martha Chatbot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
