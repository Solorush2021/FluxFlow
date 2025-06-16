
export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-headline text-4xl font-bold tracking-tight">Settings</h1>
      <div className="bg-card p-6 rounded-lg shadow-sm liquid-glass">
        <p className="text-muted-foreground">
          This is the placeholder for the application settings. 
          You can configure various aspects of the application here, such as:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-foreground">
          <li>Theme preferences (though we're rocking dark mode by default!)</li>
          <li>Notification settings</li>
          <li>Account management (linking to profile)</li>
          <li>Data import/export options</li>
          <li>API key configurations</li>
        </ul>
        <p className="mt-4 text-sm text-accent">
          More detailed settings will be available soon.
        </p>
      </div>
    </div>
  );
}
