import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fechô — Serviços perto de você",
    short_name: "Fechô",
    description: "Encontre, converse e agende profissionais perto de você.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f8f3",
    theme_color: "#17372e",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
