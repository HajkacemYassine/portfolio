// Brand logos for the skills marquee. Paths come from simple-icons (CC0).
// Imported only by server components, so the icon data never ships as a JS bundle.
import {
  siAngular,
  siC,
  siCss,
  siDart,
  siDjango,
  siDocker,
  siDotnet,
  siFastapi,
  siFlutter,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLangchain,
  siMeta,
  siMysql,
  siN8n,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siQdrant,
  siReact,
  siScikitlearn,
  siSymfony,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export type SkillLogo = { name: string; path: string; color: string };

// Some official brand colors are near-black and vanish on the dark background,
// so those get a lighter on-brand tint.
function logo(name: string, icon: SimpleIcon, color?: string): SkillLogo {
  return { name, path: icon.path, color: color ?? `#${icon.hex}` };
}

export const skillLogoRows: SkillLogo[][] = [
  [
    logo("Python", siPython, "#4B8BBE"),
    logo("TypeScript", siTypescript),
    logo("JavaScript", siJavascript),
    logo("React", siReact),
    logo("Angular", siAngular, "#DD0031"),
    logo("PHP", siPhp),
    logo("C", siC),
    logo("HTML5", siHtml5),
    logo("CSS", siCss, "#8E5CD9"),
    logo("Flutter", siFlutter, "#54C5F8"),
    logo("Dart", siDart, "#2BB7F6"),
    logo("Git", siGit),
    logo("GitHub", siGithub, "#E7E9EF"),
  ],
  [
    logo("FastAPI", siFastapi),
    logo("Django", siDjango, "#44B78B"),
    logo("Symfony", siSymfony, "#E7E9EF"),
    logo(".NET", siDotnet, "#7A5AF8"),
    logo("LangChain", siLangchain),
    logo("Llama", siMeta),
    logo("scikit-learn", siScikitlearn),
    logo("PostgreSQL", siPostgresql, "#5A8FE6"),
    logo("MySQL", siMysql, "#5D9BD1"),
    logo("Qdrant", siQdrant),
    logo("Docker", siDocker),
    logo("n8n", siN8n),
    logo("Postman", siPostman),
  ],
];
