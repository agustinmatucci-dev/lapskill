

export const metadata = {
  title: "LapSkill — Entrenamiento en Cirugía Laparoscópica",
  description: "Videos cortos de alta precisión, telementoría en vivo y evaluación personalizada para cirujanos laparoscópicos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}