import type { Metadata } from "next";
import "./panel.css";

// Panelin arama motorlarına GÖRÜNMEMESİ için — müşteri sitede panelin izini görmemeli
export const metadata: Metadata = {
  title: "Yönetim Paneli",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function UssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="panel-shell">{children}</div>;
}
