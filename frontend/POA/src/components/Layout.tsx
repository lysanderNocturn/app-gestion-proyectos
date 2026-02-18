import { Toaster } from "sonner";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <div className="min-h-screen bg-background text-foreground antialiased">
            <header className="border-b bg-card sticky top-0 z-10">
                <div className="container flex h-16 items-center justify-between">
                    <h1 className="text-lg font-bold">POA Dashboard</h1>
                    <Button variant="outline" size="icon" onClick={toggleTheme}>
                        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </Button>
                </div>
            </header>
            <main className="container py-6">{children}</main>
            <Toaster position="top-right" />
        </div>
    );
}
