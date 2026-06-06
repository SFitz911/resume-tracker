export default function LoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
        <p className="mt-2 text-sm text-gray-500">
          Authentication is not yet configured. This is a placeholder.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="owner@example.com"
              disabled
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 bg-gray-50"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              disabled
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-500 bg-gray-50"
            />
          </div>
          <button
            type="button"
            disabled
            className="w-full rounded-lg bg-gray-300 px-4 py-2.5 text-sm font-medium text-gray-500 cursor-not-allowed"
          >
            Sign In (Coming Soon)
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-400 text-center">
          TODO: Implement authentication with NextAuth.js or Clerk
        </p>
      </div>
    </div>
  );
}