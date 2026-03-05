import { UsersIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation';

export function CustomerEmptyState() {

  const router = useRouter()
  const handleRegister = () => router.push('/register');

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="bg-muted/50 p-4 rounded-full mb-4">
        <UsersIcon
          className="h-10 w-10 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">
        No customers registered yet.
      </h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">
        Get started by creating your first customer. They will appear here once
        registered.
      </p>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        onClick={handleRegister}
      >
        <PlusIcon className="mr-2 h-4 w-4" aria-hidden="true" />
        Create First Customer
      </button>
    </div>
  )
}
