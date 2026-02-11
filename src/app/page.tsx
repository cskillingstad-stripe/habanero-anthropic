'use client';

import { useEffect, useState } from 'react';
import { loadStripe, Appearance } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import Habanero from '@/components/Habanero';
import { useSearchParams } from 'next/navigation';
import { Loader } from '@mantine/core';

const stripePromise = loadStripe(
  'pk_test_51SxXw4LkR3ESQLj1YBCbqTMeq3OkwUqJLXaJMXn8fDq2aB2yhPgtaZnowwMyVzzLTdSSbvzamYcrU2tNTehcIUNQ00rTCtzESG',
  {
    betas: [
      // "custom_checkout_beta_6",
      // 'custom_checkout_adaptive_pricing_2',
      // "custom_checkout_tax_id_1",
      'custom_checkout_payment_form_1',
    ],
  }
);

export default function Home() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchClientSecret = async () => {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({
          returningUser: searchParams.get('returningUser') === 'true',
        }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    fetchClientSecret();
  }, []);

  const appearance: Appearance = {
    theme: 'stripe',

    // Make it look like Anthropic Figma
    inputs: 'condensed',
    variables: {
      colorPrimary: '#222725',
    },
  };

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        clientSecret,
        elementsOptions: {
          appearance,
          savedPaymentMethod: {
            // Default is 'auto' in clover
            enableSave: 'auto',
            // Default is 'auto' in clover
            enableRedisplay: 'auto',
          },
        },
      }}
    >
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 py-12 px-4">
        <div id="habanero-container" className="md:col-span-3">
          <Habanero />
        </div>
      </div>
    </CheckoutProvider>
  );
}
