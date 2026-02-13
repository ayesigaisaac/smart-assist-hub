import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, ArrowLeft, Users, Target, Lightbulb, Globe } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  { name: "Alex Mwangi", role: "Founder & Lead Developer", avatar: "AM", bio: "Full-stack engineer passionate about AI and community impact." },
  { name: "Grace Otieno", role: "AI & Data Specialist", avatar: "GO", bio: "Machine learning expert focused on accessible AI solutions." },
  { name: "Brian Kimani", role: "Product Designer", avatar: "BK", bio: "UX designer creating intuitive and beautiful digital experiences." },
  { name: "Faith Wanjiru", role: "Community Lead", avatar: "FW", bio: "Connecting SmartAssist with communities that need it most." },
];

const values = [
  { icon: Target, title: "Mission-Driven", desc: "We build tools that empower people to make smarter decisions in budgeting, health, education, and farming." },
  { icon: Lightbulb, title: "AI for Everyone", desc: "Advanced AI shouldn't be complicated. We make it friendly, approachable, and useful for daily life." },
  { icon: Globe, title: "Community First", desc: "Designed for real communities — students, farmers, families — not just tech enthusiasts." },
  { icon: Users, title: "Open & Transparent", desc: "We believe in honest AI that explains its reasoning and respects your privacy." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    {/* Nav */}
    <nav className="flex items-center justify-between px-6 py-4 md:px-12">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <span className="font-heading text-lg font-bold text-foreground">Martha Chatbot</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/"><Button variant="ghost" size="sm" className="gap-1"><ArrowLeft className="h-3 w-3" /> Home</Button></Link>
        <Link to="/auth"><Button size="sm">Get Started</Button></Link>
      </div>
    </nav>

    {/* Hero */}
    <section className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">About Us</span>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Building smarter tools for <span className="text-gradient">everyday life</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Martha Chatbot is an AI-powered assistant that helps you manage pocket money, stay healthy, excel in school, and grow better crops — all from one simple chat.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Values */}
    <section className="border-y border-border bg-muted/30 px-6 py-16 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center font-heading text-2xl font-bold text-foreground">What we stand for</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-sm font-semibold text-card-foreground">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="px-6 py-16 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-10 text-center font-heading text-2xl font-bold text-foreground">Meet the team</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.4 }} className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading text-lg font-bold">
                {t.avatar}
              </div>
              <h3 className="font-heading text-sm font-semibold text-card-foreground">{t.name}</h3>
              <p className="text-xs text-primary font-medium">{t.role}</p>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{t.bio}</p>
            </motion.div>
          ))}
        </div>
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

export default About;
