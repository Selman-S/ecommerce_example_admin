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

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;
  if (isProtectedRoute(req)) auth().protect();
});


// export default clerkMiddleware()

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

