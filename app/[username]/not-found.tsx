import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserX } from "lucide-react";

export default function CreatorNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-purple-100">
          <UserX className="h-10 w-10 text-purple-600" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Creator Not Found</h1>
        <p className="mb-8 text-lg text-gray-600">
          This creator profile doesn&apos;t exist or has been removed.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Link href="/">Browse Prompts</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/dashboard/upload">Become a Creator</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
