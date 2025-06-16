
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, KeyRound, CalendarDays, Award } from "lucide-react";
import { Input } from "@/components/ui/input"; // Import Input
import { Label } from "@/components/ui/label"; // Import Label

export default function ProfilePage() {
  const username = "user";
  // For display purposes only, do not store or handle real passwords this way
  const maskedPassword = "••••••••"; 

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight">User Profile</h1>
      <Card className="liquid-glass max-w-2xl mx-auto">
        <CardHeader className="items-center text-center">
          <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
            <AvatarImage src="https://placehold.co/100x100.png" alt="User Avatar" data-ai-hint="person face" />
            <AvatarFallback>
              <UserCircle className="h-16 w-16 text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-3xl">{username}</CardTitle>
          <CardDescription>Welcome back, {username}!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="username-display" className="text-muted-foreground flex items-center gap-2">
              <UserCircle className="h-4 w-4" /> Username
            </Label>
            <Input id="username-display" type="text" value={username} readOnly className="cursor-default bg-secondary/50 border-secondary" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password-display" className="text-muted-foreground flex items-center gap-2">
              <KeyRound className="h-4 w-4" /> Password
            </Label>
            <Input id="password-display" type="text" value={maskedPassword} readOnly className="cursor-default bg-secondary/50 border-secondary font-mono tracking-wider" />
            <p className="text-xs text-muted-foreground">This is a masked representation for display.</p>
          </div>
          
          <div className="border-t border-border pt-6 mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-muted-foreground">Account Details</h3>
            <div className="flex items-center gap-2 text-foreground">
              <CalendarDays className="h-5 w-5 text-accent"/>
              <span>Member since: January 1, 2024</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Award className="h-5 w-5 text-accent"/>
              <span>Subscription: Premium Plan</span>
            </div>
          </div>
           
           <p className="mt-8 text-sm text-center text-accent">
            Account management features are coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
