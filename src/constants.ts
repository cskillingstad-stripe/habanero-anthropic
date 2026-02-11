export const ITEMS = {
  monthly: {
    name: 'fleece',
    title: 'Monthly',
    price: 2000,
    image: 'na',
    interval: 'month',
  },
  yearly: {
    name: 'puffer',
    title: 'Yearly',
    price: 20000,
    image: 'na',
    interval: 'year',
  },
};

export const SHIPPING_OPTIONS = [
  {
    name: 'Free standard shipping',
    price: 0,
    min: {
      unit: 'day',
      value: 10,
    },
    max: undefined,
  },
  {
    name: 'Express shipping',
    price: 1700,
    min: {
      unit: 'day',
      value: 2,
    },
    max: {
      unit: 'day',
      value: 5,
    },
  },
  {
    name: 'Overnight shipping',
    price: 4000,
    min: undefined,
    max: {
      unit: 'day',
      value: 1,
    },
  },
] as const;
