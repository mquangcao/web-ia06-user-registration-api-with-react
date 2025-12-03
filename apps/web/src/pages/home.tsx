import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-12rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">
            Welcome to User Registration System
          </CardTitle>
          <CardDescription>
            A complete user registration system with NestJS and React
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            This application demonstrates a full-stack user registration system
            with:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>NestJS backend API with PostgreSQL</li>
            <li>React frontend with TypeScript</li>
            <li>Form validation with React Hook Form</li>
            <li>API state management with React Query</li>
            <li>Modern UI with shadcn/ui components</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <Link to="/signup" className="flex-1">
              <Button className="w-full">Sign Up</Button>
            </Link>
            <Link to="/login" className="flex-1">
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
