import { notFound } from "next/navigation";
import { ModelLab } from "./ModelLab";

/** Dev-only route; 404s in production builds. */
export default function ModelLabPage() {
  if (process.env.NODE_ENV === "production") notFound();
  return <ModelLab />;
}
