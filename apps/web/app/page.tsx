"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-6">Welcome to LearnX</h1>

      <div className="mb-12 text-center">
        <p className="text-xl">
          An online learning platform to master new skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <Link
          href="/auth/login"
          className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all bg-white"
        >
          <h2 className="text-2xl font-bold mb-2">Login &rarr;</h2>
          <p className="text-gray-600">
            Access your account and start learning
          </p>
        </Link>

        <Link
          href="/auth/register"
          className="p-6 border rounded-lg shadow-md hover:shadow-lg transition-all bg-white"
        >
          <h2 className="text-2xl font-bold mb-2">Register &rarr;</h2>
          <p className="text-gray-600">
            Create a new account to join our platform
          </p>
        </Link>
      </div>
    </main>
  );
}
