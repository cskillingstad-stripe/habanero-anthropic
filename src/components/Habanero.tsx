import {
  useCheckout,
  PaymentFormElement,
} from '@stripe/react-stripe-js/checkout';
import { useSearchParams } from 'next/navigation';

export default function Habanero() {
  const checkoutState = useCheckout();
  const searchParams = useSearchParams();

  return (
    <div>
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
