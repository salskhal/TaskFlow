import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AuthHeader from "./AuthHeader";

interface CardWrapperProps {
  label: string;
  title: string;
  children: React.ReactNode;
}

export default function CardWrapper({
  label,
  title,
  children,
}: CardWrapperProps) {
  return (
    <Card className=" shadow-md">
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
