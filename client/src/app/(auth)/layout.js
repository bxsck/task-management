import ProviderWrapper from "../providers/ProviderWrapper";

export default function AuthLayout({ children }) {
  return <ProviderWrapper>{children}</ProviderWrapper>;
}
