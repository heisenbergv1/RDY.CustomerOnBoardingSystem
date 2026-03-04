import React from 'react'
import { CheckCircle2Icon, UserIcon, MailIcon } from 'lucide-react'

interface ConfirmationCardProps {
  customerName: string
  customerEmail: string
  onReset: () => void
}

export function ConfirmationCard({
  customerName,
  customerEmail,
  onReset,
}: ConfirmationCardProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
        <CheckCircle2Icon className="h-10 w-10 text-green-600 dark:text-green-500" />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Registration Complete
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for registering. Your information and signature have been
          successfully securely captured and saved.
        </p>
      </div>

      <div className="w-full max-w-sm bg-muted/50 rounded-lg p-6 border border-border text-left space-y-4">
        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
          Customer Details
        </h3>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <UserIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{customerName}</span>
          </div>
          <div className="flex items-center space-x-3">
            <MailIcon className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{customerEmail}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onReset}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-8 py-2 mt-4"
      >
        Register Another Customer
      </button>
    </div>
  )
}
