import { Suspense } from 'react';
import PaymentSuccessClient from './PaymentSuccessClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="pt-24 text-center">در حال بارگذاری...</div>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}