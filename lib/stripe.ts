import Stripe from "stripe";

// Secret must stay server-only. NEXT_PUBLIC_ fallback keeps older deploys working.
const stripeSecret =
  process.env.STRIPE_SECRET_KEY || process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY;

let client: Stripe | null = null;

function getStripe() {
  if (!stripeSecret) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!client) {
    client = new Stripe(stripeSecret, {
      apiVersion: "2024-04-10",
      typescript: true,
    });
  }
  return client;
}

// Create the client on first use so a missing key does not fail the build.
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const instance = getStripe();
    const value = Reflect.get(instance, prop, receiver);
    return typeof value === "function" ? value.bind(instance) : value;
  },
});
