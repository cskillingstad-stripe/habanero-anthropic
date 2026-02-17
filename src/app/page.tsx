'use client';

import { useEffect, useState } from 'react';
import { loadStripe, Appearance } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import Habanero from '@/components/Habanero';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import { Loader } from '@mantine/core';
import { PlanSelector } from '@/components/PlanSelector';

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
  const [loading, setLoading] = useState(false);
  const [itemType, setItemType] = useState<'monthly' | 'yearly'>('yearly');

  useEffect(() => {
    const fetchClientSecret = async () => {
      setLoading(true);

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        body: JSON.stringify({
          returningUser: searchParams.get('returningUser') === 'true',
          itemType,
        }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setLoading(false);
    };

    fetchClientSecret();
  }, [itemType]);

  const appearance: Appearance = {
    theme: 'stripe',
    inputs: 'condensed',
    labels: 'floating',
    variables: {
      colorPrimary: '#222725',
    },
  };

  const renderContent = () => {
    if (!clientSecret || loading) {
      return (
        <div className="flex items-center justify-center mt-12">
          <Loader size="lg" color="#222725" />
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
        <Habanero />
      </CheckoutProvider>
    );
  };

  return (
    <div className="min-h-screen flex justify-center px-4 py-8 md:py-12 relative">
      <Link
        href="/"
        className="fixed top-6 left-6 flex items-center justify-center text-[#222725] hover:opacity-70 transition-opacity z-10"
        aria-label="Back"
      >
        <IconArrowLeft size={24} stroke={2} />
      </Link>
      <div
        id="habanero-container"
        className="w-full max-w-[600px] py-8 px-6 md:px-10"
      >
        <header className="mb-5">
          <h1 className="text-left text-xl font-semibold text-[#222725]">
            Pro plan
          </h1>
        </header>

        <div className="mb-6">
          <PlanSelector itemType={itemType} setItemType={setItemType} />
        </div>

        {renderContent()}
      </div>
    </div>
  );
}
