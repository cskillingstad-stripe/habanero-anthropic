import {
  useCheckout,
  PaymentFormElement,
} from '@stripe/react-stripe-js/checkout';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Habanero() {
  const checkoutState = useCheckout();
  const searchParams = useSearchParams();
  const [showBorder, setShowBorder] = useState(false);

  // Show border around Habanero on Cmd + H
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'h') {
        e.preventDefault();
        setShowBorder((b) => !b);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      style={{
        boxShadow: showBorder ? '0 0 0 2px #2563eb' : undefined,
        borderRadius: showBorder ? '8px' : undefined,
      }}
    >
      <PaymentFormElement
        options={{
          contacts:
            searchParams.get('returningUser') === 'true'
              ? [
                  {
                    name: 'Jenny Rosen',
                    address: {
                      line1: '354 Oyster Point Blvd',
                      city: 'South San Francisco',
                      state: 'CA',
                      country: 'US',
                      postal_code: '94080',
                    },
                  },
                ]
              : undefined,
        }}
        onConfirm={(event) => {
          console.log('bblog confirm: ', event);

          if (checkoutState.type === 'success' && checkoutState.checkout) {
            const { checkout } = checkoutState;

            checkout.confirm({
              // @ts-expect-error - paymentFormConfirmEvent is not public yet
              paymentFormConfirmEvent: event,
            });
          }
        }}
      />
    </div>
  );
}
