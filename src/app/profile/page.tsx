
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight">User Profile</h1>
      <Card className="liquid-glass">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person face" />
            <AvatarFallback>
              <UserCircle className="h-16 w-16 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-3xl">Flux User</CardTitle>
          <CardDescription>flux.user@example.com</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">Account Details</h3>
            <p className="text-foreground">Member since: January 1, 2024</p>
            <p className="text-foreground">Subscription: Premium Plan</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">Preferences</h3>
            <p className="text-foreground">Language: English</p>
            <p className="text-foreground">Timezone: (GMT-05:00) Eastern Time</p>
          </div>
           <p className="mt-6 text-sm text-center text-accent">
            Profile editing and more details coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
