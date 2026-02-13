import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, User, Save } from "lucide-react";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }

      setEmail(session.user.email ?? "");

      const { data } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("user_id", session.user.id)
        .single();

      if (data?.display_name) setDisplayName(data.display_name);
      setFetching(false);
    };
    load();
  }, [navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/auth"); return; }

    const { error } = await supabase
      .from("profiles")
      .update({ display_name: displayName.trim().slice(0, 100) })
      .eq("user_id", session.user.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Profile updated successfully" });
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Button variant="ghost" size="sm" className="mb-6 gap-1" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="h-3 w-3" /> Back to chat
        </Button>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <User className="h-8 w-8" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Your Profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">{email}</p>
        </div>

        {fetching ? (
          <p className="text-center text-sm text-muted-foreground">Loading...</p>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your name"
                maxLength={100}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              <Save className="h-4 w-4" />
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
