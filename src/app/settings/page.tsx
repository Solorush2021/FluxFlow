
"use client";

import { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Paintbrush, Bell, Languages, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [theme, setTheme] = useState("dark");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const [dataSync, setDataSync] = useState(true);

  const handleSaveChanges = () => {
    // Simulate saving settings
    console.log({
      theme,
      emailNotifications,
      pushNotifications,
      inAppNotifications,
      language,
      dataSync,
    });
    toast({
      title: "Settings Saved (Simulated)",
      description: "Your preferences have been updated.",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight">Application Settings</h1>
      
      <Card className="liquid-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Paintbrush className="h-6 w-6 text-primary" /> Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 rounded-md bg-secondary/30">
            <Label htmlFor="theme-select" className="font-semibold text-foreground">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="theme-select" className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark (Default)</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-xs text-muted-foreground px-4">Note: Currently, only Dark theme is fully implemented. Other options are placeholders.</p>
        </CardContent>
      </Card>

      <Card className="liquid-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Bell className="h-6 w-6 text-primary" /> Notifications
          </CardTitle>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 p-4 rounded-md bg-secondary/30">
            <Label htmlFor="email-notifications" className="text-foreground">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 rounded-md bg-secondary/30">
            <Label htmlFor="push-notifications" className="text-foreground">Push Notifications (Mobile)</Label>
            <Switch
              id="push-notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
          <div className="flex items-center justify-between space-x-2 p-4 rounded-md bg-secondary/30">
            <Label htmlFor="in-app-notifications" className="text-foreground">In-App Notifications</Label>
            <Switch
              id="in-app-notifications"
              checked={inAppNotifications}
              onCheckedChange={setInAppNotifications}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="liquid-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Languages className="h-6 w-6 text-primary" /> Language & Region
          </CardTitle>
          <CardDescription>Set your preferred language and regional settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2 p-4 rounded-md bg-secondary/30">
            <Label htmlFor="language-select" className="font-semibold text-foreground">Application Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language-select" className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (US)</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
       <Card className="liquid-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
             Data Settings
          </CardTitle>
          <CardDescription>Manage your data preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 p-4 rounded-md bg-secondary/30">
            <Label htmlFor="data-sync" className="text-foreground">Enable Cloud Data Sync</Label>
            <Switch
              id="data-sync"
              checked={dataSync}
              onCheckedChange={setDataSync}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button onClick={handleSaveChanges} className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>
    </div>
  );
}
