import { Globe } from "lucide-react";
import {
    SiReact,
    SiNodedotjs,
    SiMongodb,
    SiExpress,
    SiJavascript,
    SiFramer,
    SiHtml5,
    SiCss,
    SiSass,
    SiGit,
    SiGithub,
    SiVite,
} from "react-icons/si";
import type { ComponentType } from "react";

export type Skill = {
    name: string;
    tag: string;
    color: string;
    icon: ComponentType<{ className?: string; style?: React.CSSProperties }>;
};

/**
 * The one place the skill list lives. The Skills section, the About
 * section's skills marquee, and the CV export all read from this
 * array, so updating a skill here updates it everywhere automatically.
 */
export const skills: Skill[] = [
    { icon: SiReact, name: "React", tag: "Frontend Library", color: "#61DAFB" },
    { icon: SiJavascript, name: "JavaScript", tag: "Core Language", color: "#F7DF1E" },
    { icon: SiNodedotjs, name: "Node.js", tag: "Backend Runtime", color: "#3C873A" },
    { icon: SiExpress, name: "Express.js", tag: "API Framework", color: "#ffffff" },
    { icon: SiMongodb, name: "MongoDB", tag: "Database", color: "#4DB33D" },
    { icon: SiHtml5, name: "HTML5", tag: "Semantic Markup", color: "#E44D26" },
    { icon: SiCss, name: "CSS3", tag: "Layout & Design", color: "#264DE4" },
    { icon: SiSass, name: "Sass", tag: "CSS Preprocessor", color: "#CC6699" },
    { icon: SiGit, name: "Git", tag: "Version Control", color: "#F05032" },
    { icon: SiGithub, name: "GitHub", tag: "Code Hosting", color: "#ffffff" },
    { icon: Globe, name: "REST APIs", tag: "Data Layer", color: "#a78bfa" },
    { icon: SiFramer, name: "Framer Motion", tag: "Animation", color: "#ffffff" },
    { icon: SiVite, name: "Vite", tag: "Build Tool", color: "#646CFF" },
];
