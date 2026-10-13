import {
  clerkMiddleware,
  createRouteMatcher
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/(.*)',
]);
const isPublicRoute = createRouteMatcher([
  '/(api|trpc)(.*)',
  '/api/:path*',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) return;
  // Clerk v7: auth is an object and protect() is async.
  if (isProtectedRoute(req)) await auth.protect();
});


// export default clerkMiddleware()

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

