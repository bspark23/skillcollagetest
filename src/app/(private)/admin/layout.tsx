import PrivateLayout from "@/components/layouts/private-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <PrivateLayout>{children}</PrivateLayout>;
}
