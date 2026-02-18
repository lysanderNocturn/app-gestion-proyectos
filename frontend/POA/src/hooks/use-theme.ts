import { useEffect, useState } from "react";

export function useTheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
        const perfersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (saved) {
            setTheme(saved);
        } else if (perfersDark) {
            setTheme('dark');
        }
    }, []);
    
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);        
    return { theme, setTheme };
}
