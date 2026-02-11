import {
  useCheckout,
  PaymentFormElement,
} from '@stripe/react-stripe-js/checkout';
import { useSearchParams } from 'next/navigation';

export default function Habanero() {
  const checkoutState = useCheckout();
  const searchParams = useSearchParams();

  return (
    <div className="pt-6 md:pt-20 px-10 md:pl-20 md:pr-0 min-h-screen">
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
